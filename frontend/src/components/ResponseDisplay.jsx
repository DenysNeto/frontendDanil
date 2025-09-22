import React, { useRef, useEffect } from 'react';

const ResponseDisplay = ({ response, isLoading }) => {
  const responseRef = useRef(null);

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    if (responseRef.current && isLoading) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response, isLoading]);

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 py-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-blue-600 text-sm font-medium ml-2">Thinking...</span>
    </div>
  );

  const BlinkingCursor = () => (
    <span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-1"></span>
  );

  return (
    <div className="relative group">
      {/* Modern container with subtle styling */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 hover:border-gray-200/80 transition-all duration-300 overflow-hidden">


        {/* Response content area */}
        <div
          ref={responseRef}
          className="h-[350px] p-6 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#e5e7eb #f9fafb'
          }}
        >
          {response ? (
            <div className="animate-fade-in">
              <pre
                className="whitespace-pre-wrap break-words text-gray-900 leading-relaxed font-system text-[15px] selection:bg-blue-100/80"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                {response}
                {isLoading && <BlinkingCursor />}
              </pre>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <TypingIndicator />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Ready for your prompt</p>
                <p className="text-gray-400 text-xs mt-1">The AI response will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }

        /* Smooth font rendering */
        .font-system {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      `}</style>
    </div>
  );
};

export default ResponseDisplay;