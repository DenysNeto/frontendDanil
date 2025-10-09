// src/components/PromptInput.tsx
import React from "react";

export default function PromptInput({
                                        value,
                                        onChange,
                                        placeholder = "Enter your prompt...",
                                        disabled = false,
                                        rows = 4,
                                        className = "",
                                    }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`
        w-full p-4 rounded-xl resize-none
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
        />
    );
}
