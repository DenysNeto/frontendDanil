import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import './App.css';
import ModelInterface from './components/ModelInterface';

function App() {
  const [submittedPrompt, setSubmittedPrompt] = useState(null);
  const [promptKey, setPromptKey] = useState(0);

  const handlePromptSubmit = async (prompt) => {
    console.log('Submitted prompt:', prompt);
    setSubmittedPrompt(prompt);
    setPromptKey(prev => prev + 1); // Force re-execution even with same prompt
    // Add a small delay to ensure the prompt state is updated before resolving
    await new Promise(resolve => setTimeout(resolve, 100));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Two Delta Demo
          </h1>
          <p className="text-gray-600">
            Select a model, enter your prompt, and get responses
          </p>
        </header>
        
        <main className="space-y-6">
          <PromptInput onSubmit={handlePromptSubmit}/>
          <div className="flex gap-8">
            <div className="flex-1">
              <ModelInterface prompt={submittedPrompt} modelType="baseline" promptKey={promptKey}/>
            </div>
            <div className="flex-1">
              <ModelInterface prompt={submittedPrompt} modelType="twodelta" promptKey={promptKey}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;