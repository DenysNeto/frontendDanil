from flask import Flask, render_template, request, jsonify
import requests
import urllib3

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        print("Received request to /api/generate")
        data = request.get_json()
        print(f"Request data: {data}")
        
        prompt = data.get('prompt')
        model_url = data.get('model_url')
        
        print(f"Prompt: {prompt}")
        print(f"Model URL: {model_url}")
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
            
        if not model_url:
            return jsonify({'error': 'Model URL is required'}), 400
        
        # Make request to the specified model API
        api_url = f'{model_url}/api/v1/generate'
        payload = {'prompt': prompt}
        
        print(f"Making request to: {api_url}")
        print(f"Payload: {payload}")
        
        response = requests.post(
            api_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30,
            verify=False
        )
        
        print(f"Response status: {response.status_code}")
        print(f"Response content: {response.text}")
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': f'API request failed with status {response.status_code}'}), response.status_code
            
    except requests.exceptions.RequestException as e:
        print(f"Request exception: {str(e)}")
        return jsonify({'error': f'Request failed: {str(e)}'}), 500
    except Exception as e:
        print(f"General exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)