import React from 'react';

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div 
            className={`w-3 h-3 rounded-full ${
              isConnected 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-red-500'
            }`}
          />
          <span 
            className={`font-medium ${
              isConnected 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {isConnected 
            ? 'Model API is ready' 
            : 'Unable to connect to model API'
          }
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;