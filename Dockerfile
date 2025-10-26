# Multi-stage Dockerfile for React + Flask application
# Stage 1: Build React frontend
FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Flask backend with built frontend
FROM python:3.11-slim

WORKDIR /app

# Set environment variables for streaming
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

# Copy and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy Flask application code
COPY backend/ ./backend/
COPY config.json ./

# Copy built React frontend from previous stage
COPY --from=frontend-builder /app/static ./static

# Expose port 8080
EXPOSE 8080

# Run with Gunicorn for production streaming
CMD ["gunicorn", "--config", "backend/gunicorn.conf.py", "backend.app:app"]