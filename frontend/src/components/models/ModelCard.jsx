import React, { useState, useEffect, useRef, useCallback } from "react";
import ModelSelector from "./ModelSelector";
import ResponseDisplay from "../ResponseDisplay";
import MetricsPanel from "../ui/MetricsPanel";

const ModelCard = ({
  prompt,
  promptKey,
  settings,
  models = [],
  title = "Select Model",
}) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [endpoint, setEndpoint] = useState(null);
  const [metrics, setMetrics] = useState({
    tokens: 0,
    cost: 0,
    latency: 0,
  });
  const responseRef = useRef("");
  const eventSourceRef = useRef(null);

  // todo move from here
  const handlePrompt = useCallback(
    async (prompt) => {
      if (!endpoint) {
        console.log("No model selected! Please select a model first.");
        return;
      }

      try {
        // Close any existing EventSource connection
        if (eventSourceRef.current) {
          console.log("Closing existing EventSource connection");
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        setisLoading(true);
        setResponse("");
        responseRef.current = "";
        const startTime = Date.now();
        let tokenCount = 0;

        console.log(
          `prompt: ${prompt}  selected model: ${selectedModel}, endpoint: ${endpoint}`
        );

        // Create URL parameters with settings
        const params = new URLSearchParams({
          prompt: prompt,
          model: endpoint,
          ...(settings && {
            max_tokens: settings.maxTokens,
            temperature: settings.temperature,
          }),
        });

        // Use Flask's streaming endpoint with settings
        const eventSource = new EventSource(`/stream?${params.toString()}`);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Received stream data:", data); // Debug log

            if (data.type === "token") {
              // Update response immediately with setTimeout to bypass batching
              responseRef.current += data.content;
              setTimeout(() => {
                setResponse(responseRef.current);
              }, 0);

              // Use actual token count from model response
              tokenCount = data.tokens_so_far || tokenCount + 1;

              // Update metrics immediately
              const currentTime = Date.now();
              setMetrics({
                tokens: tokenCount,
                cost: (tokenCount * 0.0001).toFixed(4),
                latency: currentTime - startTime,
              });

              console.log(
                "Token received:",
                data.content,
                "Total chars:",
                responseRef.current.length
              ); // Debug log
            } else if (data.type === "end") {
              eventSource.close();
              eventSourceRef.current = null;
              setisLoading(false);
              console.log("Generation completed");
            } else if (data.type === "error") {
              console.error("Stream error:", data.message);
              setResponse((prev) => prev + `\n\nError: ${data.message}`);
              eventSource.close();
              eventSourceRef.current = null;
              setisLoading(false);
            }
          } catch (e) {
            console.error("Error parsing stream data:", e);
          }
        };

        eventSource.onerror = (error) => {
          console.error("EventSource error:", error);
          eventSource.close();
          eventSourceRef.current = null;
          setisLoading(false);
          setResponse(
            (prev) => prev + "\n\nError: Connection to model failed."
          );
        };

        // Close the connection after 5 minutes to prevent hanging connections
        setTimeout(() => {
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setisLoading(false);
          }
        }, 300000);
      } catch (error) {
        console.error(`Error submitting prompt:`, error);
        setResponse("Error: Failed to get response from the model.");
        setisLoading(false);
      }
    },
    [endpoint, selectedModel]
  );

  useEffect(() => {
    if (prompt) {
      handlePrompt(prompt);
    }
  }, [prompt, promptKey, handlePrompt]);

  // Cleanup EventSource on component unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        console.log("Component unmounting, closing EventSource");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        setEndpoint={setEndpoint}
        models={models}
        title={title}
      />

      <ResponseDisplay response={response} isLoading={isLoading} />

      <MetricsPanel metrics={metrics} />
    </div>
  );
};

export default ModelCard;
