document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const sendButton = document.getElementById('sendButton');
    const baselineModelSelect = document.getElementById('baselineModelSelect');
    const twoDeltaModelSelect = document.getElementById('twoDeltaModelSelect');
    
    // Baseline model elements
    const baselineStatusDiv = document.getElementById('baselineStatus');
    const baselineResponseDiv = document.getElementById('baselineResponse');
    
    // Two Delta model elements
    const twoDeltaStatusDiv = document.getElementById('twoDeltaStatus');
    const twoDeltaResponseDiv = document.getElementById('twoDeltaResponse');
    
    // EventSource objects for parallel streaming
    let baselineEventSource = null;
    let twoDeltaEventSource = null;
    let isStreaming = false;
    
    // Health check function
    function checkModelHealth(modelUrl, statusDiv) {
        statusDiv.textContent = 'Checking...';
        statusDiv.className = 'status streaming';
        
        fetch(`/health-check?model=${encodeURIComponent(modelUrl)}`)
            .then(response => response.json())
            .then(data => {
                switch(data.status) {
                    case 'connected':
                        statusDiv.textContent = data.message;
                        statusDiv.className = 'status complete';
                        break;
                    case 'offline':
                        statusDiv.textContent = data.message;
                        statusDiv.className = 'status error';
                        break;
                    case 'not_ready':
                        statusDiv.textContent = data.message;
                        statusDiv.className = 'status error';
                        break;
                    default:
                        statusDiv.textContent = data.message;
                        statusDiv.className = 'status error';
                        break;
                }
            })
            .catch(error => {
                console.error('Health check failed:', error);
                statusDiv.textContent = 'Health check failed';
                statusDiv.className = 'status error';
            });
    }
    
    // Add event listeners for dropdown changes
    baselineModelSelect.addEventListener('change', function() {
        if (!isStreaming) {
            checkModelHealth(this.value, baselineStatusDiv);
        }
    });
    
    twoDeltaModelSelect.addEventListener('change', function() {
        if (!isStreaming) {
            checkModelHealth(this.value, twoDeltaStatusDiv);
        }
    });
    
    // Check initial model health on page load
    checkModelHealth(baselineModelSelect.value, baselineStatusDiv);
    checkModelHealth(twoDeltaModelSelect.value, twoDeltaStatusDiv);

    // Handle send button click
    sendButton.addEventListener('click', function() {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        
        if (isStreaming) {
            stopAllStreaming();
            return;
        }
        
        startParallelStreaming(prompt);
    });
    
    // Handle Enter key in textarea (Ctrl+Enter to send)
    promptInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    function startParallelStreaming(prompt) {
        // Close any existing connections
        stopAllStreaming();
        
        // Get selected models
        const baselineModel = baselineModelSelect.value;
        const twoDeltaModel = twoDeltaModelSelect.value;
        
        // Reset UI for both models
        resetUI();
        
        // Update button
        sendButton.textContent = 'Stop';
        sendButton.style.background = '#dc3545';
        isStreaming = true;
        
        // Start both streams in parallel
        startModelStream(prompt, baselineModel, 'baseline');
        startModelStream(prompt, twoDeltaModel, 'twodelta');
    }
    
    function startModelStream(prompt, model, modelType) {
        const params = new URLSearchParams({
            prompt: prompt,
            model: model
        });
        
        const eventSource = new EventSource(`/stream?${params.toString()}`);
        
        // Store the event source
        if (modelType === 'baseline') {
            baselineEventSource = eventSource;
        } else {
            twoDeltaEventSource = eventSource;
        }
        
        // Get the appropriate DOM elements
        const statusDiv = modelType === 'baseline' ? baselineStatusDiv : twoDeltaStatusDiv;
        const responseDiv = modelType === 'baseline' ? baselineResponseDiv : twoDeltaResponseDiv;
        
        eventSource.onopen = function() {
            console.log(`${modelType} connection opened`);
            statusDiv.textContent = 'Connected - Streaming response...';
            statusDiv.className = 'status streaming';
        };
        
        eventSource.onmessage = function(event) {
            try {
                const data = JSON.parse(event.data);
                console.log(`${modelType} received:`, data);
                
                switch(data.type) {
                    case 'start':
                        statusDiv.textContent = data.message;
                        responseDiv.textContent = '';
                        responseDiv.classList.add('streaming');
                        break;
                        
                    case 'token':
                        // Add each token/character to the response
                        responseDiv.textContent += data.content;
                        // Auto-scroll to bottom
                        responseDiv.scrollTop = responseDiv.scrollHeight;
                        break;
                        
                    case 'end':
                        statusDiv.textContent = data.message;
                        statusDiv.className = 'status complete';
                        responseDiv.classList.remove('streaming');
                        eventSource.close();
                        checkAllComplete();
                        break;
                        
                    case 'error':
                        statusDiv.textContent = 'Error: ' + data.message;
                        statusDiv.className = 'status error';
                        responseDiv.classList.remove('streaming');
                        eventSource.close();
                        checkAllComplete();
                        break;
                        
                    default:
                        console.log('Unknown message type:', data.type);
                }
                
            } catch (error) {
                console.error(`Error parsing ${modelType} SSE data:`, error);
                statusDiv.textContent = 'Error parsing response';
                statusDiv.className = 'status error';
                responseDiv.classList.remove('streaming');
                eventSource.close();
                checkAllComplete();
            }
        };
        
        eventSource.onerror = function(error) {
            console.error(`${modelType} EventSource failed:`, error);
            statusDiv.textContent = 'Connection failed';
            statusDiv.className = 'status error';
            responseDiv.classList.remove('streaming');
            eventSource.close();
            checkAllComplete();
        };
    }
    
    function stopAllStreaming() {
        if (baselineEventSource) {
            baselineEventSource.close();
            baselineEventSource = null;
        }
        if (twoDeltaEventSource) {
            twoDeltaEventSource.close();
            twoDeltaEventSource = null;
        }
        
        baselineStatusDiv.textContent = 'Stopped by user';
        baselineStatusDiv.className = 'status error';
        twoDeltaStatusDiv.textContent = 'Stopped by user';
        twoDeltaStatusDiv.className = 'status error';
        
        finishAllStreaming();
    }
    
    function resetUI() {
        // Reset baseline model UI
        baselineResponseDiv.textContent = '';
        baselineResponseDiv.classList.remove('streaming');
        baselineStatusDiv.textContent = `Connecting to ${baselineModelSelect.value}...`;
        baselineStatusDiv.className = 'status streaming';
        
        // Reset Two Delta model UI
        twoDeltaResponseDiv.textContent = '';
        twoDeltaResponseDiv.classList.remove('streaming');
        twoDeltaStatusDiv.textContent = `Connecting to ${twoDeltaModelSelect.value}...`;
        twoDeltaStatusDiv.className = 'status streaming';
    }
    
    function checkAllComplete() {
        // Check if both streams are complete
        const baselineComplete = !baselineEventSource || baselineEventSource.readyState === EventSource.CLOSED;
        const twoDeltaComplete = !twoDeltaEventSource || twoDeltaEventSource.readyState === EventSource.CLOSED;
        
        if (baselineComplete && twoDeltaComplete) {
            finishAllStreaming();
        }
    }
    
    function finishAllStreaming() {
        // Reset button
        sendButton.textContent = 'Send';
        sendButton.style.background = '#667eea';
        isStreaming = false;
        
        // Clean up any remaining connections
        if (baselineEventSource) {
            baselineEventSource.close();
            baselineEventSource = null;
        }
        if (twoDeltaEventSource) {
            twoDeltaEventSource.close();
            twoDeltaEventSource = null;
        }
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        if (baselineEventSource) {
            baselineEventSource.close();
        }
        if (twoDeltaEventSource) {
            twoDeltaEventSource.close();
        }
    });
});