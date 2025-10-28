import React from 'react';

export default function Spinner({ text = 'Loading...', className = '' }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600" />
        <p className="text-white text-lg">{text}</p>
      </div>
    </div>
  );
}
