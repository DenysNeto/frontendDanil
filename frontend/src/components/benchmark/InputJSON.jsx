import React from 'react';
import FileDrop from './FileInputJSON.jsx';
import JSONEditor from './EditorJSON.jsx';
import { useBenchmarkStore } from '../../store/useBenchmarkStore.js';



export default function InputJSON({ className = '' }) {
    const rawText = useBenchmarkStore((s) => s.rawText);
    const setRawText = useBenchmarkStore((s) => s.setRawText);
    const parse = useBenchmarkStore((s) => s.parse);
    const format = useBenchmarkStore((s) => s.format);
    const validate = useBenchmarkStore((s) => s.validate);
    const valid = useBenchmarkStore((s) => s.valid);
    const error = useBenchmarkStore((s) => s.error);

    
    return (
        <>

      
        <div className={className}>
       

            <div className="text-sm text-gray-600 mb-4">Drop JSON file with prompts or paste JSON here</div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <FileDrop
                        onFileRead={({ text }) => {
                            setRawText(text);
                            parse(text);
                        }}
                    />
                </div>
                <div>
                    <JSONEditor
                        value={rawText}
                        onChange={(v) => {
                            setRawText(v);
                        }}
                    />

                </div>
            </div>
        </div>
      </>
    );
    
}
