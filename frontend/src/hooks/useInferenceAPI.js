import React, { useState, useCallback } from "react";

export default function useInferenceAPI(apiBaseUrl) {
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState(null);
  const [allModels, setAllModels] = useState([])



  const getModels = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/models`);
      const data = await res.json();
      setAllModels(data.models);
      return allModels;
    } catch (error) {
      setAllModels({ error: error.message });
      throw error;
    }
  }, [apiBaseUrl]);

  const checkEngineStatus = useCallback(async () => {
    try {
        // model data - s3
        //model_fqdn
      const res = await fetch(`${apiBaseUrl}/status`);
      const data = await res.json();
      setEngineStatus(data);
      return data;
    } catch (error) {
      setEngineStatus({ error: error.message });
      throw error;
    }
  }, [apiBaseUrl]);

  const sendPrompt = useCallback(async (promptText,model_fqdn, stream = true) => {
    if (!promptText.trim()) return;

    setIsLoading(true);
    setIsStreaming(stream);
    setResponse("");

    try {
      // Use /stream endpoint with query parameters
      const params = new URLSearchParams({
        prompt: promptText,
        model: model_fqdn
      });

      const res = await fetch(`${apiBaseUrl}/stream?${params.toString()}`, {
        method: "GET"
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
                // Skip "data: " prefix if present
                const jsonStr = line.startsWith('data: ') ? line.slice(6) : line;
                const data = JSON.parse(jsonStr);

                // Handle different message types from backend
                if (data.type === 'token' && data.content) {
                  setResponse((prev) => prev + data.content);
                } else if (data.type === 'error') {
                  console.error("Stream error:", data.message);
                  setResponse((prev) => prev + `\n[Error: ${data.message}]`);
                }
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
    allModels,
    getModels,
    response,
    isStreaming,
    isLoading,
    engineStatus,
    checkEngineStatus,
    sendPrompt,
    setResponse,
  }), [response, isStreaming, isLoading, engineStatus]);
}