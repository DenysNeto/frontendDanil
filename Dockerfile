# Use Python 3.11 slim image as base
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Set environment variables for streaming
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies including gunicorn
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Run with Gunicorn for production streaming
CMD ["gunicorn", "--config", "gunicorn.conf.py", "app:app"]