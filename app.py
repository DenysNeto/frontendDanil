from flask import Flask, render_template, request, Response
import requests
import json
import time
import os
import sys
from pathlib import Path

app = Flask(__name__)

# Disable Flask's default buffering for streaming
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

def load_config():
    """Load model configuration from config file or environment variables"""
    config_path = Path(__file__).parent / 'config.json'
    
    # Try to load from config file first
    if config_path.exists():
        try:
            with open(config_path, 'r') as f:
                config = json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            print(f"Error loading config file: {e}")
            config = get_default_config()
    else:
        config = get_default_config()
    
    # Override with environment variables if they exist
    env_baseline = os.getenv('BASELINE_MODELS')
    env_twodelta = os.getenv('TWODELTA_MODELS')
    
    if env_baseline:
        try:
            config['baseline_models'] = json.loads(env_baseline)
        except json.JSONDecodeError:
            print("Error parsing BASELINE_MODELS environment variable")
    
    if env_twodelta:
        try:
            config['twodelta_models'] = json.loads(env_twodelta)
        except json.JSONDecodeError:
            print("Error parsing TWODELTA_MODELS environment variable")
    
    return config

def get_default_config():
    """Default configuration if no config file or env vars exist"""
    return {
        "baseline_models": [
            {"name": "Local FastAPI", "endpoint": "localhost:8000"}
        ],
        "twodelta_models": [
            {"name": "Local Two Delta", "endpoint": "localhost:8001"}
        ]
    }

# Load configuration on startup
MODEL_CONFIG = load_config()

@app.route('/')
def index():
    return render_template('index.html', config=MODEL_CONFIG)

@app.route('/api/config', methods=['GET'])
def get_config():
    """API endpoint to get current model configuration"""
    return MODEL_CONFIG

@app.route('/health-check', methods=['GET'])
def health_check():
    model_fqdn = request.args.get('model', '')
    
    if not model_fqdn:
        return {'error': 'No model specified'}, 400
    
    try:
        # Construct status URL based on model FQDN
        if model_fqdn.startswith('localhost'):
            # Local development
            status_url = f'http://{model_fqdn}/api/v1/status'
        else:
            # External APIs
            status_url = f'https://{model_fqdn}/api/v1/status'
        
        # Make request with timeout
        response = requests.get(
            status_url,
            timeout=5,
            verify=False  # For development with self-signed certs
        )
        
        if response.status_code == 200:
            try:
                data = response.json()
                # Check if engine_ready is true
                if data.get('engine_ready', False):
                    return {
                        'status': 'connected',
                        'message': 'Connected ✓',
                        'data': data
                    }
                else:
                    return {
                        'status': 'not_ready', 
                        'message': 'Service not ready',
                        'data': data
                    }
            except json.JSONDecodeError:
                return {
                    'status': 'error',
                    'message': 'Invalid response format'
                }
        else:
            return {
                'status': 'error',
                'message': f'HTTP {response.status_code}'
            }
            
    except requests.exceptions.ConnectionError:
        return {
            'status': 'offline',
            'message': 'Offline ✗'
        }
    except requests.exceptions.Timeout:
        return {
            'status': 'timeout',
            'message': 'Connection timeout'
        }
    except Exception as e:
        return {
            'status': 'error', 
            'message': f'Error: {str(e)}'
        }

@app.route('/stream', methods=['GET'])
def stream():
    prompt = request.args.get('prompt', '')
    model_fqdn = request.args.get('model', 'localhost:8000')  # Default to local FastAPI
    
    if not prompt:
        return Response('data: {"error": "No prompt provided"}\n\n', content_type='text/event-stream')
    
    response = Response(
        generate_stream(prompt, model_fqdn),
        content_type='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'X-Accel-Buffering': 'no',  # Disable nginx proxy buffering
            'X-Content-Type-Options': 'nosniff'  # Prevent content sniffing buffering
        }
    )
    
    # Disable implicit sequence conversion for true streaming
    response.implicit_sequence_conversion = False
    return response

def generate_stream(prompt, model_fqdn):
    """Generate streaming response by calling specified model backend"""
    try:
        # Send initial message
        yield f"data: {json.dumps({'type': 'start', 'message': 'Starting generation...'})}\n\n"
        
        # Construct API URL based on model FQDN
        if model_fqdn.startswith('localhost'):
            # Local development
            api_url = f'http://{model_fqdn}/api/v1/generate'
        else:
            # External APIs
            api_url = f'https://{model_fqdn}/api/v1/generate'
        payload = {
            'prompt': prompt,
            'stream': True
        }
        
        # Prepare headers with API key if available
        headers = {'Content-Type': 'application/json'}
        api_key = os.getenv('API_KEY')
        if api_key:
            headers['Authorization'] = f'Bearer {api_key}'
        
        with requests.post(
            api_url,
            json=payload,
            headers=headers,
            stream=True,
            timeout=60,
            verify=False  # For development with self-signed certs
        ) as response:
            
            if response.status_code != 200:
                error_msg = f"API returned status {response.status_code}"
                yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"
                return
            
            # Stream response line by line (each line is a JSON object)
            for line in response.iter_lines(decode_unicode=True):
                if line.strip():  # Skip empty lines
                    try:
                        # Parse the JSON response from the model
                        model_data = json.loads(line)
                        
                        # Extract text content from the model response
                        text_content = model_data.get('text', '')
                        tokens_so_far = model_data.get('tokens_so_far', 0)
                        
                        # Send each character individually for character-by-character streaming
                        for char in text_content:
                            if char:  # Send all characters including spaces
                                data = {
                                    'type': 'token',
                                    'content': char,
                                    'tokens_so_far': tokens_so_far
                                }
                                yield f"data: {json.dumps(data)}\n\n"
                                
                                # Force flush to prevent buffering
                                sys.stdout.flush()
                                sys.stderr.flush()
                                
                                # Small delay to make streaming visible
                                time.sleep(0.01)
                                
                    except json.JSONDecodeError:
                        # If line is not valid JSON, skip it
                        continue
        
        # Send completion message
        yield f"data: {json.dumps({'type': 'end', 'message': 'Generation complete'})}\n\n"
        
    except requests.exceptions.ConnectionError:
        error_msg = f"Cannot connect to model server at {model_fqdn}"
        yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"
    except requests.exceptions.RequestException as e:
        error_msg = f"Request failed: {str(e)}"
        yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080, threaded=True)