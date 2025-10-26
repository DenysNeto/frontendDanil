# Two Delta LLM Comparison Tool

A Flask application that enables real-time comparison between baseline and Two Delta models with token-by-token streaming.

## Features

- **Parallel streaming**: Compare two models side-by-side in real-time
- **Health checking**: Automatic model availability checking
- **Dynamic configuration**: Configure models via JSON file, S3, or environment variables
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
   # From project root
   python -m backend.app
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
- `GET /api/models` - Get all available models
- `GET /api/models/<model_id>` - Get a specific model by ID

---

# S3 Dynamic Config Setup

## Overview

The Flask backend now loads configuration dynamically from S3 and refreshes it periodically without requiring redeployment.

## How It Works

1. **On Startup**: Flask loads `config.json` from S3 (or falls back to local file)
2. **Periodic Refresh**: Background job refreshes config every X minutes (configurable)
3. **Thread-Safe**: Multiple requests can access config simultaneously
4. **Graceful Fallback**: If S3 is unavailable, uses local `config.json`

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required for S3 config loading
S3_BUCKET=my-config-bucket
S3_CONFIG_KEY=config.json
REFRESH_INTERVAL_MINUTES=5
AWS_REGION=us-east-1

# Optional: API key for model endpoints
API_KEY=your-api-key-here
```

### AWS Credentials

**Production (Recommended)**: Use IAM roles
- Attach IAM role to ECS task or EC2 instance
- Role should have `s3:GetObject` permission on the config bucket

**Local Development**: Use AWS CLI credentials
```bash
aws configure
# Or set environment variables:
# AWS_ACCESS_KEY_ID=xxx
# AWS_SECRET_ACCESS_KEY=xxx
```

### IAM Policy Example

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-config-bucket/config.json"
    }
  ]
}
```

## Config JSON Format

Upload to S3 at `s3://your-bucket/config.json`:

```json
{
  "baseline_models": [
    {
      "name": "DeepSeek 1.5B",
      "endpoint": "bright-wildcat.tdops.net"
    },
    {
      "name": "DeepSeek NotWorking 1.5B",
      "endpoint": "not-working.tdops.net"
    }
  ],
  "twodelta_models": [
    {
      "name": "DeepSeek 7B",
      "endpoint": "semantic-kite.tdops.net"
    },
    {
      "name": "DeepSeek NotWorking 7B",
      "endpoint": "not-working.tdops.net"
    }
  ]
}
```

## API Endpoints

### Get All Models

```bash
GET /api/models
```

**Response:**
```json
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
```

### Get Specific Model

```bash
GET /api/models/<model_id>
```

**Response:**
```json
{
  "status": "success",
  "model": {
    "id": "gpt-oss-20b",
    "title": "OpenAI gpt-oss-20b",
    ...
  }
}
```

### Health Check
```bash
GET /health-check?model=bright-wildcat.tdops.net
```

### Stream
```bash
GET /stream?model=bright-wildcat.tdops.net&prompt=Hello&max_tokens=100&temperature=0.7
```

## Local Testing

### 1. Without S3 (Local Config Only)

Don't set S3 environment variables. Flask will use local `config.json`:

```bash
# Always run from project root
python -m backend.app
```

### 2. With S3

Set environment variables and run:

```bash
# From project root
export S3_BUCKET=my-config-bucket
export S3_CONFIG_KEY=config.json
export AWS_REGION=us-east-1

python -m backend.app
```

### 3. Upload Config to S3

```bash
aws s3 cp config.json s3://my-config-bucket/config.json
```

## Docker Deployment

The Dockerfile already supports this - just set environment variables in your deployment:

**ECS Task Definition:**
```json
{
  "environment": [
    {"name": "S3_BUCKET", "value": "my-config-bucket"},
    {"name": "S3_CONFIG_KEY", "value": "config.json"},
    {"name": "REFRESH_INTERVAL_MINUTES", "value": "5"},
    {"name": "AWS_REGION", "value": "us-east-1"}
  ]
}
```

**Docker Run:**
```bash
docker run -e S3_BUCKET=my-config-bucket \
           -e S3_CONFIG_KEY=config.json \
           -e AWS_REGION=us-east-1 \
           frontend-demo
```

## Monitoring

Logs will show config loading activity:

```
INFO - Initializing S3 config loader...
INFO - Fetching config from S3: s3://my-bucket/config.json
INFO - Successfully loaded config from S3
INFO - Config refresh scheduled every 5 minutes
INFO - Configuration updated successfully
```

## Troubleshooting

### Config not loading from S3

Check logs for errors:
- `AWS credentials not found` - Configure AWS credentials
- `S3 ClientError (403)` - Check IAM permissions
- `S3 ClientError (404)` - Verify bucket and key names

### Config not refreshing

- Check `REFRESH_INTERVAL_MINUTES` is set and > 0
- Look for scheduler logs in application output
- Verify S3 file was actually updated (check ETag/LastModified)

### Falls back to local config

This is expected behavior if:
- S3_BUCKET is not set
- AWS credentials are not available
- S3 bucket/key doesn't exist
- Network issues prevent S3 access

The app will still work using the local `config.json` file.

## Benefits

- **Update configs without redeployment**
- **Automatic refresh** - Changes take effect within minutes
- **Zero downtime** - Thread-safe config updates
- **Graceful fallback** - Works offline with local config
- **Multi-environment** - Different S3 buckets per environment
- **Audit trail** - S3 versioning tracks config changes
