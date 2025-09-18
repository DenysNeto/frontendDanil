import { useState, useMemo } from 'react';
import PromptInput from './PromptInput';
import ModelInterface from './ModelInterface';
import { useSettings } from '../contexts/SettingsContext';
import { parseModelsFromSettings } from '../utils/modelParser';

function SingleExampleWorkflow() {
  const { settings } = useSettings();

  // Parse models from settings for each type
  const baselineModels = useMemo(() => parseModelsFromSettings(settings, 'baseline'), [settings]);
  const twodeltaModels = useMemo(() => parseModelsFromSettings(settings, 'twodelta'), [settings]);
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
            <ModelInterface
              prompt={submittedPrompt}
              promptKey={promptKey}
              settings={settings}
              models={baselineModels}
              title="Baseline Model"
            />
        </div>
        <div className="flex-1">
            <ModelInterface
              prompt={submittedPrompt}
              promptKey={promptKey}
              settings={settings}
              models={twodeltaModels}
              title="Two Delta Model"
            />
        </div>
        </div>
    </main>
  );
}

export default SingleExampleWorkflow;