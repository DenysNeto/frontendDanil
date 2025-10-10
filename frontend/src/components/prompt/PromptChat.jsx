import React, { useEffect } from 'react';
import PromptForm from './PromptForm.jsx';
import { useChatStore } from '../../store/useChatStore.js';

export default function Chat() {
  const { messages, addMessage, setMessages } = useChatStore();

  const scriptedResponses = [
    "Hello! How can I assist you today?",
    "That's an interesting question! Let me think...",
    "Here is some information that might help you."
  ];

  let responseIndex = 0;

  const handlePromptSend = (prompt) => {
//    console.log("Sending prompt", prompt);
    addMessage({ role: 'user', content: prompt });

    // Add scripted response to chat
    const response = scriptedResponses[responseIndex % scriptedResponses.length];
    responseIndex += 1;
    addMessage({ role: 'server', content: response });
  };

  useEffect(() => {
    // Simulate fetching chat history from a backend or local storage
    const fetchChatHistory = async () => {
    //   const history = [
    //     { role: 'user', content: 'Hi!' },
    //     { role: 'server', content: 'Hello! How can I assist you today?' },
    //   ];
    //   setMessages(history);
    };

    fetchChatHistory();
  }, [setMessages]);

  return (
    <div className="flex flex-col ml-3 mr-3 h-full max-w mx-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100 dark:bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
        <PromptForm promptSend={handlePromptSend} />
      </div>
    </div>
  );
}