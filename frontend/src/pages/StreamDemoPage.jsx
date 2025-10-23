import React, { useState, useRef, useEffect } from "react";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import Template from "../components/UI/Template.jsx";
import PromptInput from "../components/UI/PromptInput.jsx";
import AppFooter from "../components/UI/AppFooter.jsx";

export default function StreamDemoPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState(null);
  const [streamMode, setStreamMode] = useState(true);
  const responseRef = useRef(null);

  // API base URL - adjust this to match your inference service
  const API_BASE_URL = "http://localhost:8000/api/v1";

  // Check engine status on component mount
  useEffect(() => {
    checkEngineStatus();
  }, []);

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const checkEngineStatus = async () => {
    console.log("🔍 Checking engine status...");
    try {
      const response = await fetch(`${API_BASE_URL}/status`);
      const data = await response.json();
      console.log("📊 Engine status response:", data);
      setEngineStatus(data);

      if (data.engine_ready) {
        console.log("✅ Engine is ready!");
      } else {
        console.log("❌ Engine is not ready");
      }
    } catch (error) {
      console.error("❌ Error checking engine status:", error);
      setEngineStatus({ error: error.message });
    }
  };

  const handleStreamResponse = async (promptText) => {
    console.log("🚀 Starting streaming request with prompt:", promptText);

    setIsLoading(true);
    setIsStreaming(true);
    setResponse("");

    try {
      const requestData = {
        prompt: promptText,
        max_tokens: 100,
        temperature: 0.7,
        stream: true
      };

      console.log("📤 Sending request data:", requestData);

      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      console.log("📡 Starting to read streaming response...");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("🏁 Streaming complete");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              console.log("📦 Received chunk:", data);

              if (data.text) {
                setResponse(prev => prev + data.text);
                console.log(`📝 Added text: "${data.text}", tokens so far: ${data.tokens_so_far}`);
              }

              if (data.finish_reason) {
                console.log("🎯 Finished with reason:", data.finish_reason);
              }
            } catch (parseError) {
              console.error("❌ Error parsing JSON line:", line, parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error("❌ Error during streaming:", error);
      setResponse(prev => prev + `\n\nError: ${error.message}`);
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
      console.log("🔚 Streaming request finished");
    }
  };

  const handleNonStreamResponse = async (promptText) => {
    console.log("🚀 Starting non-streaming request with prompt:", promptText);

    setIsLoading(true);
    setResponse("");

    try {
      const requestData = {
        prompt: promptText,
        max_tokens: 100,
        temperature: 0.7,
        stream: false
      };

      console.log("📤 Sending request data:", requestData);

      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📊 Non-streaming response:", data);

      setResponse(data.text);
      console.log(`📝 Full response received: "${data.text}", tokens: ${data.tokens_generated}`);

    } catch (error) {
      console.error("❌ Error during non-streaming request:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      console.log("🔚 Non-streaming request finished");
    }
  };

  const handleSendPrompt = async (promptText) => {
    console.log("🎯 Send prompt triggered with:", promptText);

    if (!promptText.trim()) {
      console.log("⚠️ Empty prompt, ignoring");
      return;
    }

    if (streamMode) {
      await handleStreamResponse(promptText);
    } else {
      await handleNonStreamResponse(promptText);
    }

    setPrompt("");
  };

  const clearResponse = () => {
    console.log("🧹 Clearing response");
    setResponse("");
  };

  const toggleStreamMode = () => {
    const newMode = !streamMode;
    console.log("🔄 Toggling stream mode to:", newMode ? "streaming" : "non-streaming");
    setStreamMode(newMode);
  };

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
            {/* Status and Controls */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={checkEngineStatus}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={isLoading}
                >
                  Check Status
                </button>

                <button
                  onClick={toggleStreamMode}
                  className={`px-4 py-2 rounded-lg transition ${
                    streamMode
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                  disabled={isLoading}
                >
                  Mode: {streamMode ? 'Streaming' : 'Non-Streaming'}
                </button>

                <button
                  onClick={clearResponse}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  disabled={isLoading}
                >
                  Clear
                </button>
              </div>

              {/* Engine Status */}
              {engineStatus && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold mb-2">Engine Status:</h3>
                  <pre className="text-sm text-gray-700">
                    {JSON.stringify(engineStatus, null, 2)}
                  </pre>
                </div>
              )}

              {/* Loading/Streaming Indicator */}
              {(isLoading || isStreaming) && (
                <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                  {isStreaming ? "📡 Streaming response..." : "⏳ Processing request..."}
                </div>
              )}
            </div>

            {/* Response Display */}
            <div className="flex-1 mb-6">
              <div className="bg-gray-50 border rounded-lg p-4 min-h-[300px]">
                <h3 className="font-semibold mb-3 text-gray-800">Response:</h3>
                <div
                  ref={responseRef}
                  className="whitespace-pre-wrap text-gray-700 font-mono text-sm max-h-[400px] overflow-y-auto"
                >
                  {response || "Response will appear here..."}
                </div>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="sticky bottom-0">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onSend={handleSendPrompt}
                placeholder="Enter your prompt here..."
                disabled={isLoading}
              />
            </div>
          </div>
        </ViewContent>
      </Template>
    </div>
  );
}
