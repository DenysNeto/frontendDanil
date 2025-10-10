import React, { useState } from "react";
import PromptInputWithButton from "./PromtInputWithButton.jsx";
import {usePromptStore} from "../../store/usePromptStore.js";


export default function PromptForm({promptSend}) {
    const [prompt, setPrompt] = useState("");
    const addPrompt = usePromptStore(state=>state.addPrompt);
    const setSelectedPrompt = usePromptStore(state=>state.setSelectedPrompt);



    const handleSend = () => {
        if (prompt.trim() === "") return; // Prevent sending empty prompts
        addPrompt(prompt);
        setSelectedPrompt(prompt);
        promptSend(prompt); // Pass the prompt value to the parent
        setPrompt(""); // Clear input after sending
    };

    return (
        <div className=" p-4 mr-4 ml-4">
            <PromptInputWithButton
                value={prompt}
                onChange={setPrompt}
                onSend={handleSend}
                placeholder="Type your prompt..."
            />
        </div>
    );
}
