# Two Delta LLM Comparison Tool

A Flask application that enables real-time comparison between baseline and Two Delta models with token-by-token streaming.

## Features

- **Parallel streaming**: Compare two models side-by-side in real-time
- **Health checking**: Automatic model availability checking
- **Dynamic configuration**: Configure models via JSON file or environment variables
- **Real-time streaming**: Watch responses appear character by character
- **Clean UI**: Responsive design with visual streaming indicators
- **Error handling**: Graceful handling of connection issues
- **Stop functionality**: Cancel streaming mid-response
- **Keyboard shortcuts**: Ctrl+Enter to send

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start your FastAPI backend** on `localhost:8000` with streaming support

3. **Run the Flask app:**
   ```bash
   python app.py
   ```

4. **Open your browser** to `http://localhost:8080`

## Usage

1. Enter a prompt in the text area
2. Click "Send" or press Ctrl+Enter
3. Watch the response stream in real-time
4. Click "Stop" to cancel streaming

## How it works

- **Frontend**: Uses EventSource (Server-Sent Events) for real-time streaming
- **Backend**: Flask proxies requests to FastAPI and streams responses
- **Streaming**: Each character/token is sent immediately as it's received
- **Visual feedback**: Blinking cursor during streaming, status updates

## Model Configuration

Configure available models through multiple methods:

### Config File (`config.json`)
```json
{
  "baseline_models": [
    {
      "name": "DeepSeek 1.5B",
      "endpoint": "vivid-coyote.tdops.net"
    },
    {
      "name": "Local FastAPI", 
      "endpoint": "localhost:8000"
    }
  ],
  "twodelta_models": [
    {
      "name": "DeepSeek 7B",
      "endpoint": "conservative-mastodon.tdops.net"
    },
    {
      "name": "Local Two Delta",
      "endpoint": "localhost:8001"
    }
  ]
}
```

### Environment Variables
```bash
export BASELINE_MODELS='[{"name": "Custom Model", "endpoint": "custom.example.com"}]'
export TWODELTA_MODELS='[{"name": "Custom TD", "endpoint": "custom-td.example.com"}]'
python app.py
```

**Priority**: Environment Variables > Config File > Defaults

## API Endpoints

- `GET /` - Main application page
- `GET /stream?prompt=<text>&model=<endpoint>` - Streaming endpoint (Server-Sent Events)
- `GET /health-check?model=<endpoint>` - Model health check
- `GET /api/config` - Current model configuration