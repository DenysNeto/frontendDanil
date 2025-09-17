import { useState, useCallback } from 'react';

export default function JsonDragDrop() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const processFile = useCallback((file) => {
    // Reset previous state
    setError('');
    setJsonData(null);
    setFileName('');

    // Check if file is JSON
    if (!file.name.toLowerCase().endsWith('.json')) {
      setError('Please upload a JSON file');
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setJsonData(parsed);
        setFileName(file.name);
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const clearFile = useCallback(() => {
    setJsonData(null);
    setFileName('');
    setError('');
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        JSON File Upload
      </h2> */}
      
      {!jsonData ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="space-y-4">
            <div className="text-4xl">📄</div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your JSON file here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Supports .json files up to 10MB
            </p>
          </div>
          
          <input
            id="fileInput"
            type="file"
            accept=".json"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-green-600">✓</div>
              <div>
                <p className="font-medium text-green-800">File uploaded successfully</p>
                <p className="text-sm text-green-600">{fileName}</p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                // Handle submit action here
                console.log('Submitting JSON data:', jsonData);
                alert('JSON file submitted successfully!');
              }}
              // className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              className="px-8 py-3 bg-blue-400 text-white hover:bg-blue-500 font-semibold rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="text-red-600">⚠️</div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}