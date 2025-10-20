import React from "react";
import ModelCard from "./ModelCard";

const modelData = [
  {
    name: "Whisper V3 Large",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
  {
    name: "Llama 4 Maverick API",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
  {
    name: "Nous Hermes Llama2 13B",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
  {
    name: "Whisper V3 Large",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
  {
    name: "Llama 4 Maverick API",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
  {
    name: "Nous Hermes Llama2 13B",
    description: "Build with open-source and specialized multimodal models",
    pricing: "$0.2M / Tokens",
    content: "4092 Content",
  },
];

export default function ModelList({ cardsInRow = 3 }) {
  const gridColsClass = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[cardsInRow] || "lg:grid-cols-3";

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${gridColsClass} gap-6 p-6 w-full`}
    >
      {modelData.map((model, index) => (
        <ModelCard key={index} {...model} />
      ))}
    </div>
  );
}