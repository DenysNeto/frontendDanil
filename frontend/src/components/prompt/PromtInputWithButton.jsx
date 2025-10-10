
import React from "react";
import PromptInput from "./PromptInput.jsx";
import { Send } from "lucide-react";


export default function PromptInputWithButton({
                                                  value,
                                                  onChange,
                                                  onSend,
                                                  placeholder = "Type your prompt...",
                                                  disabled = false,
                                              }) {
    return (
        <div className="flex gap-2 w-full items-center">
            <PromptInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="flex-1"
            />
            <div className="w-[50px] pl-4 ">
                <button
                    onClick={onSend}
                    disabled={disabled || !value.trim()}
                    className={`
          flex items-center gap-2 px-4 py-3 rounded-xl font-medium
          bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200
          shadow-md hover:shadow-lg hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
                >
                    <Send className="w-5 h-5" />

                </button>
            </div>

        </div>
    );
}
