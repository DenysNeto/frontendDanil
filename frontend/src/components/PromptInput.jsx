import React, { useState } from 'react';

const PromptInput = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(prompt.trim());
      setPrompt(''); // Clear the input after successful submission
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your prompt
          </label>
          <div className="flex gap-3">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt here... (Ctrl+Enter to submit)"
              className="flex-1 h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-black bg-white"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isSubmitting}
              className="h-32 px-6 bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="flex justify-start">
          <span className="text-sm text-gray-500">
            {prompt.length} characters
          </span>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;