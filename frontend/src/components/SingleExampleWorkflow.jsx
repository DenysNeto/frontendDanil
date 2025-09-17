import { useState } from 'react';
import PromptInput from './PromptInput';
import ModelInterface from './ModelInterface';

function SingleExampleWorkflow() {
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
  );
}

export default SingleExampleWorkflow;