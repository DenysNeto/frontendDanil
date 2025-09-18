import { useState } from 'react';
// import PromptInput from './PromptInput';
import BenchmarkInterface from './BenchmarkInterface';
import JsonDragDrop from './JsonDragDrop';
import { useSettings } from '../contexts/SettingsContext';

function BenchmarkWorkflow() {
  const { settings } = useSettings();
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
        {/* <PromptInput onSubmit={handlePromptSubmit}/> */}
        <JsonDragDrop/>
        <div className="flex gap-8">
        <div className="flex-1">
            <BenchmarkInterface
              prompt={submittedPrompt}
              modelType="baseline"
              promptKey={promptKey}
              settings={settings}
            />
        </div>
        <div className="flex-1">
            <BenchmarkInterface
              prompt={submittedPrompt}
              modelType="twodelta"
              promptKey={promptKey}
              settings={settings}
            />
        </div>
        </div>
    </main>
  );
}
export default BenchmarkWorkflow;
