# Gunicorn configuration for streaming applications
# This ensures proper streaming behavior on production servers

# Server socket
bind = "0.0.0.0:8080"
backlog = 2048

# Worker processes
workers = 1  # Single worker to avoid streaming issues across processes
worker_class = "gevent"  # Async worker for better streaming performance
worker_connections = 1000
timeout = 120  # Longer timeout for streaming requests
keepalive = 2

# Disable buffering for streaming
sendfile = False  # Disable sendfile for streaming responses
preload_app = False  # Don't preload to avoid streaming issues

# Logging
accesslog = "-"  # Log to stdout
errorlog = "-"   # Log to stderr
loglevel = "info"

# Performance
max_requests = 1000
max_requests_jitter = 50

# Disable worker recycling during streaming
graceful_timeout = 120

# Environment
raw_env = [
    "PYTHONUNBUFFERED=1",  # Disable Python output buffering
]