import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useBenchmarkStore } from '../../store/useBenchmarkStore.js';

export default function FileDrop({ accept = '.json,application/json', disabled = false, className = '', placeholder = 'Drop a JSON file here or click to select' }) {
  const setRawText = useBenchmarkStore((s) => s.setRawText);
  const parse = useBenchmarkStore((s) => s.parse);
  const {rawText, valid} = useBenchmarkStore()

  const inputRef = useRef(null);
  const dragCounterRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  // Prevent browser from opening files when dropped outside target
  useEffect(() => {
    const prevent = (e) => {
      e.preventDefault();
    };
    window.addEventListener('dragover', prevent);
    window.addEventListener('drop', prevent);
    return () => {
      window.removeEventListener('dragover', prevent);
      window.removeEventListener('drop', prevent);
    };
  }, []);

  const readFile = useCallback((file) => {
    if (!file) return;
    setError('');
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log('[FileDrop] reader.onload, file:', file.name);
      setRawText(text);
      parse(text);
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsText(file);
  }, [setRawText, parse]);

  const handleFiles = (files) => {
    const file = files && files[0];
    if (!file) return;
    readFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);
    if (disabled) return;
    console.log('[FileDrop] onDrop event');
    const dt = e.dataTransfer;
    // Support items (some browsers) and files
    if (dt && dt.files && dt.files.length) {
      handleFiles(dt.files);
    } else if (dt && dt.items && dt.items.length) {
      // convert DataTransferItemList to FileList where possible
      const items = Array.from(dt.items).filter(it => it.kind === 'file');
      if (items.length) {
        const file = items[0].getAsFile();
        file && readFile(file);
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounterRef.current += 1;
    setIsDragging(true);
    // debug
    console.log('[FileDrop] onDragEnter, counter=', dragCounterRef.current);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  };

  const onSelectFile = (e) => {
    if (disabled) return;
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const triggerFileDialog = () => {
    if (disabled) return;
    inputRef.current && inputRef.current.click();
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        {fileName && <button type="button" className='text-sm px-3 py-1 rounded bg-red-400 text-white' onClick={() => { setRawText(''); setFileName(''); setError(''); }}>Clear Input</button>}
        <button onClick={triggerFileDialog} className={`text-sm px-3 py-1 rounded bg-blue-400 text-white`} type="button">
         {/* TODO ... if text cleared so ?  */}
          {fileName ? `Selected: ${fileName}` : 'Select File'}
        </button>
      </div>
      <input ref={inputRef} type="file" accept={accept} onChange={onSelectFile} style={{ display: 'none' }} />
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onClick={triggerFileDialog}
        role="button"
        tabIndex={0}
        style={{ minHeight: '10rem' }}
        className={`w-full p-6 rounded-xl border border-dashed ${isDragging ? 'border-blue-400 ring-2 ring-dashed ring-blue-300' : 'border-gray-300'} bg-white dark:bg-gray-800 cursor-pointer flex flex-col justify-center items-start gap-3`}
      >
        <div className="text-sm text-gray-600 dark:text-gray-300">{placeholder}</div>
        <div className="text-xs text-gray-500">{fileName ? `Selected: ${fileName}` : 'No file selected'}</div>
        {error && <div className="text-xs text-red-600">{error}</div>}
      </div>
    </div>
  );
}
