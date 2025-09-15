import React, { useEffect, useRef } from 'react';

const ResponseDisplay = ({ response, isLoading }) => {
  const responseRef = useRef(null);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <label 
          htmlFor="response-display" 
          className="block text-sm font-medium text-gray-700"
        >
          Model Response
      </label>
      
      <div
        id="response-display"
        className="w-full min-h-50 max-h-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto overflow-x-hidden"
      >
        {response ? (
          <pre
            ref={responseRef}
            className="whitespace-pre-wrap break-words break-all font-sans text-gray-800 leading-relaxed max-w-full"
            key={response.length}
          >
            {response}
          </pre>
        ) : isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 text-sm">Connecting to model...</span>
          </div>
        ) : (
          <div className="text-gray-500 italic">
            No response yet. Submit a prompt to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;