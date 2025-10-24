import React, { useState, useRef, useEffect } from "react";
import useInferenceAPI from "../hooks/useInferenceAPI";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import Template from "../components/ui/Template.jsx";
import PromptInput from "../components/UI/PromptInput.jsx";

export default function StreamDemoPage() {
  const [prompt, setPrompt] = useState("");
  const [streamMode, setStreamMode] = useState(true);
  const responseRef = useRef(null);


  const {
    response,
    isStreaming,
    isLoading,
    engineStatus,
    checkEngineStatus,
    sendPrompt,
    setResponse,
  } = useInferenceAPI("http://localhost:8000/api/v2");

  useEffect(() => {
    checkEngineStatus();
  }, []);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSendPrompt = async (text) => {
    await sendPrompt(text, streamMode);
    setPrompt("");
  };

  const clearResponse = () => setResponse("");
  const toggleStreamMode = () => setStreamMode((prev) => !prev);

  return (
    <div className="bg-white text-black">
      <Template type="action">
        <ViewTitle
          title="Stream Demo"
          align="left"
          desc="Test the inference API with streaming and non-streaming responses"
        />
        <ViewContent>
          <div className="min-h-[70vh] flex flex-col justify-between">
            {/* Controls */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={checkEngineStatus} disabled={isLoading}>Check Status</button>
                <button onClick={toggleStreamMode} disabled={isLoading}>
                  Mode: {streamMode ? "Streaming" : "Non-Streaming"}
                </button>
                <button onClick={clearResponse} disabled={isLoading}>Clear</button>
              </div>

              {engineStatus && (
                <pre>{JSON.stringify(engineStatus, null, 2)}</pre>
              )}

              {(isLoading || isStreaming) && (
                <div>{isStreaming ? "📡 Streaming..." : "⏳ Loading..."}</div>
              )}
            </div>

            {/* Response */}
            <div className="flex-1 mb-6">
              <div ref={responseRef} className="overflow-y-auto">
                {response || "Response will appear here..."}
              </div>
            </div>

            {/* Input */}
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSend={handleSendPrompt}
              placeholder="Enter your prompt here..."
              disabled={isLoading}
            />
          </div>
        </ViewContent>
      </Template>
    </div>
  );
}