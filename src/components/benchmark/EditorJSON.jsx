import React, { useEffect } from 'react';
import { useBenchmarkStore } from '../../store/useBenchmarkStore.js';

export default function JSONEditor({ rows = 12, className = '' }) {
  const rawText = useBenchmarkStore((s) => s.rawText);
  const setRawText = useBenchmarkStore((s) => s.setRawText);
  const validate = useBenchmarkStore((s) => s.validate);
  const format = useBenchmarkStore((s) => s.format);
  const error = useBenchmarkStore((s) => s.error);
  const valid = useBenchmarkStore((s) => s.valid);

  useEffect(() => {
    setRawText('');
  }, [setRawText]);

  return (
    <div className={className}>
      <div className="flex justify-between items-center gap-2 mb-2">
        <div>
          <button
            type="button"
            onClick={() => setRawText('')}
            className={`text-sm px-3 py-1 rounded bg-red-400 text-white`}
          >
            Clear
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* <button
            type="button"
            onClick={() => validate()}
            disabled={!rawText || !rawText.trim()}
            className={`text-sm px-3 py-1 rounded ${!rawText || !rawText.trim() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200'}`}
          >
            Validate
          </button> */}
          <button
            type="button"
            onClick={() => format()}
            disabled={!rawText || !rawText.trim()}
            className={`text-sm px-3 py-1 rounded ${!rawText || !rawText.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-400 text-white'}`}
          >
            Format
          </button>
        </div>
      </div>
      <textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        rows={rows}
        className="w-full p-3 rounded-md border border-gray-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
    </div>
  );
}
