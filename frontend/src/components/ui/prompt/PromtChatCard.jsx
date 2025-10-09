// src/components/GPTChatCard.tsx
import React from "react";
import Divider from "../Divider.jsx";




export default function GPTChatCard({
                                        prompt,
                                        response,
                                    }) {
    return (
        <div
            className={`
        relative max-w-2xl w-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md
        border rounded-xl shadow-xl overflow-hidden transform
        transition-all duration-300 ease-in-out
        hover:shadow-2xl
        border-gray-200 dark:border-gray-700
      `}
        >
            <div className="p-6 pt-2 flex flex-col gap-4">
                {/* User Prompt */}
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Your Prompt
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{prompt}</p>
                </div>

                <Divider spacing="sm" className="border-t border-gray-200 dark:border-gray-700/30" />

                {/* GPT Response */}
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Model Response
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm max-h-60 overflow-y-auto pr-2">{response}</p>
                </div>
            </div>
        </div>
    );
}
