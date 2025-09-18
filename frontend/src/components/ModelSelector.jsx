import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ModelSelector = ({ selectedModel, onModelChange, isConnected, setIsConnected, setEndpoint, models = [], title = 'Select Model' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const dropdownRef = useRef(null);

  const selectedModelData = models.find(model => model.value === selectedModel);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (modelValue) => {
    if (selectedModel !== modelValue) {
      const newModelObject = models.find(model => model.value === modelValue);

      // Immediately select the model
      onModelChange(modelValue);
      setEndpoint(newModelObject.endpoint);
      setIsOpen(false);

      // Set connection status to checking while we verify
      setIsConnected(false);
      setIsConnecting(true);

      // Run health check in background (non-blocking)
      checkModelHealth(newModelObject.endpoint);
    } else {
      setIsOpen(false);
    }
  };

  const checkModelHealth = async (endpoint) => {
    try {
      console.log('Checking health for endpoint:', endpoint);

      const response = await axios.get(`/health-check?model=${encodeURIComponent(endpoint)}`, {
        timeout: 10000
      });

      console.log('Model status response:', response.data);

      if (response.data.status === 'connected') {
        setIsConnected(true);
        console.log('Model connected successfully');
      } else {
        console.log('Model not ready:', response.data);
        setIsConnected(false);
      }

    } catch (error) {
      console.error('Error checking model status:', error);
      setIsConnected(false);

      if (error.response?.data?.error) {
        console.log('Server error:', error.response.data.error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {title}
        </label>
        
        <div className="flex items-center space-x-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isConnecting
                ? 'bg-yellow-500 animate-pulse'
                : isConnected
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-red-500'
            }`}
          />
          <span
            className={`text-xs font-medium ${
              isConnecting
                ? 'text-yellow-600'
                : isConnected
                  ? 'text-green-700'
                  : 'text-red-700'
            }`}
          >
            {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between">
            <div className="min-h-[3rem] flex flex-col justify-center">
              <div className="font-medium text-gray-900">
                {selectedModelData?.label || 'Select a model'}
              </div>
              <div className="text-sm text-gray-500">
                {selectedModelData?.description || 'Choose from available models'}
              </div>
            </div>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {models.map((model) => (
              <button
                key={model.value}
                type="button"
                onClick={() => handleSelect(model.value)}
                className={`w-full text-left px-3 py-3 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 transition-colors ${
                  selectedModel === model.value
                    ? 'bg-blue-50 text-blue-800'
                    : 'bg-white text-gray-900'
                }`}
              >
                <div className="font-medium">
                  {model.label}
                </div>
                <div className="text-sm text-gray-500">
                  {model.description}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelector;