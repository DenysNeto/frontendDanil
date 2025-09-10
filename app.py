from flask import Flask, render_template, request, Response
import requests
import json
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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
    
    return Response(
        generate_stream(prompt, model_fqdn),
        content_type='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        }
    )

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
        
        with requests.post(
            api_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            stream=True,
            timeout=60,
            verify=False  # For development with self-signed certs
        ) as response:
            
            if response.status_code != 200:
                error_msg = f"API returned status {response.status_code}"
                yield f"data: {json.dumps({'type': 'error', 'message': error_msg})}\n\n"
                return
            
            # Stream response character by character
            for chunk in response.iter_content(chunk_size=1, decode_unicode=True):
                if chunk:  # Send all characters including spaces
                    data = {
                        'type': 'token',
                        'content': chunk
                    }
                    yield f"data: {json.dumps(data)}\n\n"
                    # Small delay to make streaming visible
                    time.sleep(0.01)
        
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
    app.run(debug=True, port=5001, threaded=True)