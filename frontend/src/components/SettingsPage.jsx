import { useState } from 'react';

export default function SettingsPage() {
  const [maxTokens, setMaxTokens] = useState(1000);
  const [temperature, setTemperature] = useState(0.7);
  const [baselineModelJson, setBaselineModelJson] = useState('');
  const [twoDeltaModelJson, setTwoDeltaModelJson] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved:', {
      maxTokens,
      temperature,
      baselineModelJson,
      twoDeltaModelJson
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3 seconds
  };

  const handleReset = () => {
    setMaxTokens(1000);
    setTemperature(0.7);
    setBaselineModelJson('');
    setTwoDeltaModelJson('');
    setIsSaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Settings Configuration
      </h2>
      
      <div className="space-y-8">
        {/* Model Parameters Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Model Parameters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Tokens */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Tokens
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>100</span>
                  <span className="font-medium text-blue-600">{maxTokens}</span>
                  <span>4000</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Controls the maximum length of the model's response
              </p>
            </div>

            {/* Temperature */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Temperature
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.0</span>
                  <span className="font-medium text-blue-600">{temperature}</span>
                  <span>2.0</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Controls randomness: lower values for focused responses, higher for creativity
              </p>
            </div>
          </div>
        </div>

        {/* Model Configuration Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Model Configuration</h3>
          
          <div className="space-y-6">
            {/* Baseline Model JSON */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Baseline Model JSON Configuration
              </label>
              <textarea
                value={baselineModelJson}
                onChange={(e) => setBaselineModelJson(e.target.value)}
                placeholder='Enter JSON configuration for baseline models (e.g., {"model": "DeepSeek 1.5B", "endpoint": "...", "parameters": {...}})'
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm font-mono"
              />
              <p className="text-xs text-gray-500">
                JSON configuration for baseline model settings and endpoints
              </p>
            </div>

            {/* Two Delta Model JSON */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Two Delta Model JSON Configuration
              </label>
              <textarea
                value={twoDeltaModelJson}
                onChange={(e) => setTwoDeltaModelJson(e.target.value)}
                placeholder='Enter JSON configuration for Two Delta models (e.g., {"model": "DeepSeek 7B", "endpoint": "...", "parameters": {...}})'
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm font-mono"
              />
              <p className="text-xs text-gray-500">
                JSON configuration for Two Delta model settings and endpoints
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {isSaved && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-green-600">✓</div>
              <div>
                <p className="font-medium text-green-800">Settings saved successfully!</p>
                <p className="text-sm text-green-600">Your configuration has been updated</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
          >
            Save Settings
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-webkit-slider-track {
          background: #e5e7eb;
          border-radius: 4px;
        }
        
        .slider::-moz-range-track {
          background: #e5e7eb;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
}