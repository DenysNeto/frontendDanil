document.addEventListener('DOMContentLoaded', function() {
    const leftDropdown = document.getElementById('leftDropdown');
    const rightDropdown = document.getElementById('rightDropdown');
    const textarea = document.querySelector('.floating-textarea');
    const submitButton = document.querySelector('.submit-button');
    const leftOutputDiv = document.querySelector('.left-section .output-div');
    const rightOutputDiv = document.querySelector('.right-section .output-div');
    
    // Store selected model URLs
    let baseModelUrl = '';
    let twoDeltaModelUrl = '';
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle dropdown changes with transitions
    leftDropdown.addEventListener('change', function() {
        baseModelUrl = this.value;
        console.log('Baseline Model selected:', baseModelUrl);
        
        // Add visual transition effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        updateSubmitButtonState();
    });
    
    rightDropdown.addEventListener('change', function() {
        twoDeltaModelUrl = this.value;
        console.log('Two Delta Model selected:', twoDeltaModelUrl);
        
        // Add visual transition effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        updateSubmitButtonState();
    });
    
    // Update submit button state based on selections
    function updateSubmitButtonState() {
        if (baseModelUrl && twoDeltaModelUrl) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
        }
    }
    
    // Initialize submit button state
    updateSubmitButtonState();
    
    // Handle form submission
    submitButton.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const prompt = textarea.value.trim();
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        
        if (!baseModelUrl || !twoDeltaModelUrl) {
            alert('Please select both models');
            return;
        }
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        
        // Show loading states in output divs
        leftOutputDiv.innerHTML = '<div class="loading">Generating baseline response...</div>';
        rightOutputDiv.innerHTML = '<div class="loading">Generating Two Delta response...</div>';
        
        try {
            // Send both requests simultaneously
            const [baseResponse, twoDeltaResponse] = await Promise.all([
                sendRequest(baseModelUrl, prompt, 'baseline'),
                sendRequest(twoDeltaModelUrl, prompt, 'twodelta')
            ]);
            
            // Display results
            displayResponse(leftOutputDiv, baseResponse, 'baseline');
            displayResponse(rightOutputDiv, twoDeltaResponse, 'twodelta');
            
        } catch (error) {
            console.error('Error:', error);
            leftOutputDiv.innerHTML = '<div class="error">Error generating baseline response</div>';
            rightOutputDiv.innerHTML = '<div class="error">Error generating Two Delta response</div>';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            updateSubmitButtonState();
        }
    });
    
    // Send API request through Flask backend
    async function sendRequest(url, prompt, type) {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                model_url: url
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    // Display response in output div
    function displayResponse(outputDiv, response, type) {
        if (response.error) {
            outputDiv.innerHTML = `<div class="error">Error: ${response.error}</div>`;
            return;
        }
        
        // Assume the response has a 'text' or 'response' field
        const responseText = response.text || response.response || response.generated_text || JSON.stringify(response);
        
        outputDiv.innerHTML = `
            <div class="response-container">
                <div class="response-text">${responseText}</div>
                <div class="response-meta">
                    <small>Generated by ${type === 'baseline' ? 'Baseline Model' : 'Two Delta Model'}</small>
                </div>
            </div>
        `;
    }
    
    // Add header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.sticky-header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add subtle transparency effect when scrolling
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.opacity = '0.95';
        } else {
            // Scrolling up
            header.style.opacity = '1';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});