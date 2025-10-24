import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";

export default function PromptInput({
  onChange = ()=>{},
  onSend = ()=>{},
  placeholder = "Type a prompt to compare...",
  disabled = false,
  rows = 4,
  className = "",
}) {
   const [value, setValue] = useState();

 
  return (
    <div className="relative w-full bg-transparent">
      <textarea
        value={value}
        onChange={(e) => {onChange(e.target.value);setValue(e.target.value)}}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
        bg-[rgba(41,122,151,0.1)]
          w-full px-4 py-3 pr-12 rounded-2xl resize-none
          text-gray-800
          shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          ${className}
        `}
      />

      {/* Отправка / иконка */}
      <button
        className="absolute right-4 bottom-4  rounded-3xl  bg-black p-2 text-white hover:text-blue-300 transition"
        disabled={disabled}
        onClick={() => onSend(value)}
      >
       <VscSend/>
      </button>
    </div>
  );
}