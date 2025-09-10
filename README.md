# Streaming Demo App

A simple Flask application that demonstrates real-time streaming of text responses token by token.

## Features

- **Real-time streaming**: Watch responses appear character by character
- **Clean UI**: Simple, responsive design with visual streaming indicator
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

4. **Open your browser** to `http://localhost:5001`

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

## API Endpoints

- `GET /` - Main application page
- `GET /stream?prompt=<text>` - Streaming endpoint (Server-Sent Events)