from flask import Flask, request, Response, send_from_directory, jsonify
import requests
import json
import os
import logging
from config import init_config_loader

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='../static', static_url_path='/static')

# Disable Flask's default buffering for streaming
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Initialize S3 config loader
logger.info("Initializing S3 config loader...")
config_loader = init_config_loader()
logger.info("Config loader initialized successfully")


# Route to serve the React app
@app.route('/')
def index():
    return send_from_directory('../static/react-build', 'index.html')

# Route to serve React static files
@app.route('/<path:path>')
def serve_react_app(path):
    if path.startswith('health-check') or path.startswith('stream') or path.startswith('api'):
        # Let API routes be handled by their specific handlers
        return None

    if os.path.exists(os.path.join('../static/react-build', path)):
        return send_from_directory('../static/react-build', path)
    else:
        # For client-side routing, serve index.html
        return send_from_directory('../static/react-build', 'index.html')


# API: Get all available models from config
@app.route('/api/models', methods=['GET'])
def get_models():
    """
    Return all available models from the current configuration.

    Response format:
    {
        "status": "success",
        "models": [
            {
                "id": "gpt-oss-20b",
                "title": "OpenAI gpt-oss-20b",
                "description": "...",
                "provider": "OpenAI",
                "type": "instruct",
                "context_length": 131072,
                "baseline_id": "gpt-oss-base",
                "price": {...},
                "derivatives": [...]
            }
        ]
    }
    """
    try:
        models = config_loader.get_models()
        return jsonify({
            'status': 'success',
            'models': models
        }), 200
    except Exception as e:
        logger.error(f"Error fetching models: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


# API: Get a specific model by ID
@app.route('/api/models/<model_id>', methods=['GET'])
def get_model_by_id(model_id):
    """
    Return a specific model by its ID.

    Args:
        model_id: The model ID (e.g., "gpt-oss-20b")

    Response:
    {
        "status": "success",
        "model": {...}
    }
    """
    try:
        model = config_loader.get_model_by_id(model_id)
        if model:
            return jsonify({
                'status': 'success',
                'model': model
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': f'Model {model_id} not found'
            }), 404
    except Exception as e:
        logger.error(f"Error fetching model {model_id}: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


# API: Get a specific derivative
@app.route('/api/models/<model_id>/derivatives/<derivative_id>', methods=['GET'])
def get_derivative(model_id, derivative_id):
    """
    Return a specific derivative of a model.

    Args:
        model_id: The base model ID (e.g., "gpt-oss-20b")
        derivative_id: The derivative ID (e.g., "gpt-oss-20b-coding")

    Response:
    {
        "status": "success",
        "model": {...},
        "derivative": {...}
    }
    """
    try:
        model = config_loader.get_model_by_id(model_id)
        if not model:
            return jsonify({
                'status': 'error',
                'message': f'Model {model_id} not found'
            }), 404

        derivative = config_loader.get_derivative_by_id(model_id, derivative_id)
        if not derivative:
            return jsonify({
                'status': 'error',
                'message': f'Derivative {derivative_id} not found for model {model_id}'
            }), 404

        return jsonify({
            'status': 'success',
            'model': model,
            'derivative': derivative
        }), 200
    except Exception as e:
        logger.error(f"Error fetching derivative {derivative_id}: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


# API: Get all derivatives across all models
@app.route('/api/derivatives', methods=['GET'])
def get_all_derivatives():
    """
    Return all derivatives across all models.

    Response:
    {
        "status": "success",
        "derivatives": [
            {
                "model_id": "gpt-oss-20b",
                "model_title": "OpenAI gpt-oss-20b",
                "derivative": {...}
            }
        ]
    }
    """
    try:
        derivatives = config_loader.get_all_derivatives()
        return jsonify({
            'status': 'success',
            'derivatives': derivatives
        }), 200
    except Exception as e:
        logger.error(f"Error fetching derivatives: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


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
    max_tokens = int(request.args.get('max_tokens'))
    temperature = float(request.args.get('temperature'))
    model_fqdn = request.args.get('model', 'localhost:8000')  # Default to local FastAPI
    
    if not prompt:
        return Response('data: {"error": "No prompt provided"}\n\n', content_type='text/event-stream')
    
    response = Response(
        generate_stream(prompt, max_tokens, temperature, model_fqdn),
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

def generate_stream(prompt, max_tokens, temperature, model_fqdn):
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
            "prompt": prompt,
            "max_tokens": max_tokens,
            'temperature': temperature,
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
            # Use chunk_size=1 for immediate streaming
            token_counter = 0
            for line in response.iter_lines(decode_unicode=True, chunk_size=1):
                if not line:  # Skip empty lines
                    continue

                # Ensure line is a string (decode if bytes)
                if isinstance(line, bytes):
                    line = line.decode('utf-8', errors='ignore')

                line = line.strip()
                if not line:
                    continue

                # First try to parse as JSON
                try:
                    # Parse the JSON response from the model
                    model_data = json.loads(line)
                    print(f"Model response JSON: {model_data}", flush=True)  # Debug log

                    # Extract text content from the model response
                    text_content = model_data.get('text', '')
                    tokens_so_far = model_data.get('tokens_so_far', 0)
                    print(f"Extracted text: '{text_content}', tokens: {tokens_so_far}", flush=True)  # Debug log

                    # Send all chunks including empty ones (for token tracking)
                    data = {
                        'type': 'token',
                        'content': text_content,
                        'tokens_so_far': tokens_so_far
                    }
                    yield f"data: {json.dumps(data)}\n\n"

                except json.JSONDecodeError:
                    # If not JSON, treat as plain text line
                    # Some APIs send plain text lines mixed with JSON
                    print(f"Plain text line (not JSON): {line}", flush=True)

                    # Increment our own token counter
                    token_counter += 1

                    # Send plain text as a chunk
                    data = {
                        'type': 'token',
                        'content': line + '\n',  # Add newline since it's a line
                        'tokens_so_far': token_counter
                    }
                    yield f"data: {json.dumps(data)}\n\n"
        
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
    try:
        app.run(debug=True, host='0.0.0.0', port=8080, threaded=True)
    finally:
        # Gracefully shutdown the config loader
        if config_loader:
            config_loader.shutdown()