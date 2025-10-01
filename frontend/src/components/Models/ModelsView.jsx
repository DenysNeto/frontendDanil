// components/ModelTabs.jsx
import React, { useState } from "react";
import ModelList from "./ModelsList";
import Tabs from "../UI/Tabs";
import { useModelStore1 } from "../../store/useModelStore1";
import { useNavigate } from "react-router-dom";

const modelTabs = [
  { label: "ALL MODELS", value: "all" },
  { label: "TRANSCRIBE", value: "transcribe" },
  { label: "AUDIO", value: "audio" },
  { label: "VISION", value: "vision" },
  { label: "RERANK", value: "rerank" },
  { label: "EMBEDDINGS", value: "embeddings" },
];



export default function ModelsView({ activeTab, cardsInRow=null , pagination=false,onTabClick }) {
  const navigate = useNavigate()

    const models = useModelStore1((s) => s.models);
  const selectedIndex = useModelStore1((s) => s.selectedIndex);
  const selectedModel = useModelStore1((s) => s.selectedModel);

  const setSelectedIndex = useModelStore1((s) => s.setSelectedIndex);

  const handleSelect = (modelId) => {
    let model = models.filter(m=>m.id == modelId)[0]
    if(selectedIndex && selectedIndex == model.id) return 
  
    setSelectedIndex(modelId); // обновляем стор
    navigate(`/models/${modelId}`); // переходим
  };


  return (
    <>
    <div className="flex flex-col w-full">
        <Tabs data={modelTabs} />

        <ModelList cardsInRow={cardsInRow} models={models} pagination={pagination} onSelect={handleSelect}/>
    </div>
  
    </>
  );
}