import React, { useState } from "react";
import PromptInputWithButton from "./PromtInputWithButton.jsx";
import {usePromptStore} from "../../../store/usePromptStore.js";


export default function PromptForm({promptSend}) {
    const [prompt, setPrompt] = useState("");
    const addPrompt = usePromptStore(state=>state.addPrompt);
    const setSelectedPrompt = usePromptStore(state=>state.setSelectedPrompt);



    const handleSend = () => {
        addPrompt(prompt);
        setSelectedPrompt(prompt);
        promptSend()
        setPrompt(""); // clear input after sending
    };

    return (
        <div className=" w-full  ">
            <PromptInputWithButton
                value={prompt}
                onChange={setPrompt}
                onSend={handleSend}
                placeholder="Type your prompt..."
            />
        </div>
    );
}
