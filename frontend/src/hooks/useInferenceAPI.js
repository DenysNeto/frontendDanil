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

  const sendPrompt = useCallback(async (promptText,model_fqdn, stream = true, timeout = 60000) => {
    if (!promptText.trim()) return;

    setIsLoading(true);
    setIsStreaming(stream);
    setResponse("");

    // Create an abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeout);

    try {
      // Use /stream endpoint with query parameters
      const params = new URLSearchParams({
        prompt: promptText,
        model: model_fqdn
      });

      const res = await fetch(`${apiBaseUrl}/stream?${params.toString()}`, {
        method: "GET",
        signal: abortController.signal
      });

      if (!res.ok) {
        // Custom error messages based on status code
        let errorMessage;
        switch (res.status) {
          case 404:
            errorMessage = `Model endpoint not found (${model_fqdn})`;
            break;
          case 500:
            errorMessage = `Server error on ${model_fqdn}`;
            break;
          case 503:
            errorMessage = `Service unavailable (${model_fqdn})`;
            break;
          default:
            errorMessage = `Connection failed (HTTP ${res.status})`;
        }
        throw new Error(errorMessage);
      }

      if (stream) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let hasReceivedData = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Clear the timeout once we start receiving data - connection is established
          if (!hasReceivedData) {
            clearTimeout(timeoutId);
          }

          hasReceivedData = true;
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
                  setResponse(`## ⚠️ Error\n\n${data.message}\n\nModel: \`${model_fqdn}\``);
                  break;
                }
              } catch (err) {
                console.error("Error parsing stream chunk:", err);
              }
            }
          }
        }

        // If stream ended without any data
        if (!hasReceivedData) {
          setResponse(`## ⚠️ No Response\n\nThe model did not return any data.\n\nModel: \`${model_fqdn}\``);
        }
      } else {
        const data = await res.json();
        setResponse(data.text);
      }
    } catch (error) {
      console.error("Fetch error:", error);

      // Custom error messages
      let errorMessage;
      if (error.name === 'AbortError') {
        errorMessage = `## ⏱️ Timeout\n\nThe request timed out after ${timeout/1000} seconds.\n\nModel: \`${model_fqdn}\`\n\nPlease try again or check if the model is responding.`;
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = `## 🔌 Connection Error\n\nCould not connect to the model endpoint.\n\nModel: \`${model_fqdn}\`\n\nPlease check:\n- Network connection\n- Model endpoint availability\n- CORS settings`;
      } else {
        errorMessage = `## ❌ Error\n\n${error.message}\n\nModel: \`${model_fqdn}\``;
      }

      setResponse(errorMessage);
    } finally {
      clearTimeout(timeoutId);
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