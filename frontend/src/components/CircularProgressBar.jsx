import { useState, useEffect } from 'react';

export default function CircularProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Demo function to simulate progress
  const startProgress = () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic feel
      });
    }, 200);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsRunning(false);
  };

  // Calculate circle properties
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Progress Tracker
      </h2>
      
      <div className="space-y-8">
        {/* Circular Progress Bar */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progress === 100 ? "#10b981" : "#3b82f6"}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-3xl font-bold ${
                progress === 100 ? 'text-green-600' : 'text-blue-600'
              }`}>
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {isRunning ? 'Processing' : progress === 100 ? 'Complete' : 'Ready'}
              </div>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              progress === 100 
                ? 'bg-green-500' 
                : isRunning 
                ? 'bg-blue-500 animate-pulse' 
                : 'bg-gray-300'
            }`} />
            <span className="text-sm font-medium text-gray-700">
              {isRunning ? 'Processing...' : progress === 100 ? 'Task completed!' : 'Ready to start'}
            </span>
          </div>
        </div>

        {/* Status Message */}
        {progress > 0 && (
          <div className={`p-4 rounded-lg border ${
            progress === 100 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={progress === 100 ? 'text-green-600' : 'text-blue-600'}>
                {progress === 100 ? '✓' : '⏳'}
              </div>
              <div>
                <p className={`font-medium ${
                  progress === 100 ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {progress === 100 
                    ? 'Operation completed successfully!' 
                    : `Processing your request...`
                  }
                </p>
                <p className={`text-sm ${
                  progress === 100 ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {progress === 100 
                    ? 'All tasks finished without errors' 
                    : 'This may take a few moments'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={startProgress}
            disabled={isRunning}
            className={`px-8 py-3 font-medium rounded-lg transition-colors shadow-sm ${
              isRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isRunning ? 'Running...' : 'Start Progress'}
          </button>
          
          <button
            onClick={resetProgress}
            disabled={isRunning}
            className={`px-6 py-3 font-medium rounded-lg border transition-colors ${
              isRunning
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}