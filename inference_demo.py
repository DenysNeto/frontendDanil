"""
Mock Inference API Demo
Implements the /api/v1/status, /api/v1/generate, and /api/models endpoints
that the Flask app expects, returning sample data in the correct format.
"""
from flask import Flask, request, Response, jsonify
import json
import time
import os

# CORS headers for allowing cross-origin requests
CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

app = Flask(__name__)

# Sample responses for demo purposes
SAMPLE_RESPONSES = [
    "This is a demo response. ",
    "The inference service is returning ",
    "simulated text generation ",
    "that matches the expected format. ",
    "Each chunk contains a 'text' field ",
    "and a 'tokens_so_far' counter. ",
    "This demonstrates the streaming behavior ",
    "without requiring a real model."
]


@app.route('/api/models', methods=['GET'])
def get_models():
    """
    Returns the models configuration from config.json.
    This endpoint matches the backend Flask app's /api/models endpoint.
    """
    try:
        # Try to load config.json from the same directory
        config_path = os.path.join(os.path.dirname(__file__), 'config.json')

        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                models = json.load(f)

            return jsonify({
                'status': 'success',
                'models': models
            }), 200, CORS_HEADERS
        else:
            # Return empty models if config.json doesn't exist
            return jsonify({
                'status': 'success',
                'models': []
            }), 200, CORS_HEADERS

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500, CORS_HEADERS


@app.route('/api/v1/status', methods=['GET'])
def status():
    """
    Status endpoint that returns engine readiness.
    The Flask app checks for 'engine_ready': True to determine connection status.
    """
    response = {
        'engine_ready': True,
        'model_name': 'demo-model-v1',
        'version': '1.0.0',
        'status': 'ready',
        'timestamp': time.time()
    }
    return response, 200, CORS_HEADERS


@app.route('/api/v1/generate', methods=['POST', 'OPTIONS'])
def generate():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200, CORS_HEADERS
    """
    Generate endpoint that accepts a prompt and returns streaming or non-streaming responses.

    Expected request format:
    {
        "prompt": "Your prompt here",
        "max_tokens": 100,
        "temperature": 0.7,
        "stream": true/false
    }

    Response format (streaming):
    Each line is a JSON object: {"text": "token content", "tokens_so_far": 5}
    """
    data = request.get_json()

    if not data or 'prompt' not in data:
        return {'error': 'No prompt provided'}, 400

    prompt = data.get('prompt', '')
    max_tokens = data.get('max_tokens', 100)
    temperature = data.get('temperature', 0.7)
    stream = data.get('stream', False)

    if stream:
        # Return streaming response
        response = Response(
            generate_stream(prompt, max_tokens, temperature),
            content_type='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no',
                **CORS_HEADERS
            }
        )
        return response
    else:
        # Return complete response
        full_text = ''.join(SAMPLE_RESPONSES[:min(len(SAMPLE_RESPONSES), max_tokens // 10)])
        response = {
            'text': full_text,
            'tokens_generated': len(full_text.split()),
            'prompt': prompt,
            'finish_reason': 'length'
        }
        return response, 200, CORS_HEADERS


def generate_stream(prompt, max_tokens, temperature, model_fqdn):
    """
    Generator function that yields JSON objects line by line.
    Each line contains: {"text": "content", "tokens_so_far": N}
    """
    tokens_so_far = 0

    # Simulate token-by-token generation
    for chunk in SAMPLE_RESPONSES:
        # Split chunk into words to simulate more granular streaming
        words = chunk.split()

        for word in words:
            if tokens_so_far >= max_tokens:
                break

            tokens_so_far += 1

            # Create response object matching expected format
            response_obj = {
                'text': word + ' ',
                'tokens_so_far': tokens_so_far
            }

            # Yield as JSON line (no SSE "data:" prefix, just JSON)
            yield json.dumps(response_obj) + '\n'

            # Simulate delay for realistic streaming
            time.sleep(0.05)

        if tokens_so_far >= max_tokens:
            break

    # Send final empty chunk to signal completion
    response_obj = {
        'text': '',
        'tokens_so_far': tokens_so_far,
        'finish_reason': 'length'
    }
    yield json.dumps(response_obj) + '\n'


if __name__ == '__main__':
    print("🚀 Starting Mock Inference API Demo")
    print("📍 Endpoints:")
    print("   GET  http://localhost:8000/api/models")
    print("   GET  http://localhost:8000/api/v1/status")
    print("   POST http://localhost:8000/api/v1/generate")
    print("\n✨ Ready to receive requests from Flask app!")
    print("   Configure model FQDN as: localhost:8000")

    app.run(
        debug=True,
        host='0.0.0.0',
        port=8000,
        threaded=True
    )
