import React, { useState, useCallback } from "react";

export default function useInferenceAPI(apiBaseUrl) {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState(null);

  const checkEngineStatus = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/status`);
      const data = await res.json();
      setEngineStatus(data);
      return data;
    } catch (error) {
      setEngineStatus({ error: error.message });
      throw error;
    }
  }, [apiBaseUrl]);

  const sendPrompt = useCallback(async (promptText, stream = true) => {
    console.log("INSIDE PROMPT", promptText)
    if (!promptText.trim()) return;

    setIsLoading(true);
    setIsStreaming(stream);
    setResponse("");

    const requestData = {
      prompt: promptText,
      max_tokens: 100,
      temperature: 0.7,
      stream,
    };

    try {
      const res = await fetch(`${apiBaseUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      if (stream) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim()) {
              try {
                const data = JSON.parse(line);
                if (data.text) setResponse((prev) => prev + data.text);
              } catch (err) {
                console.error("Error parsing stream chunk:", err);
              }
            }
          }
        }
      } else {
        const data = await res.json();
        setResponse(data.text);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [apiBaseUrl]);

  // Memoize the return object to prevent re-renders
  return React.useMemo(() => ({
    response,
    isStreaming,
    isLoading,
    engineStatus,
    checkEngineStatus,
    sendPrompt,
    setResponse,
  }), [response, isStreaming, isLoading, engineStatus]);
}