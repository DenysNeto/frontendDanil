// components/ModelTabs.jsx
import React, { useState, useEffect } from "react";
import ModelList from "./ModelsList";
import Tabs from "../ui/Tabs";
import Icon from "../ui/Icon"
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

  const updateModels = useModelStore1(s=>s.updateModels)
    const models = useModelStore1((s) => s.models);
    const selectedIndex = useModelStore1(s=>s.selectedIndex)
  const setSelectedIndex = useModelStore1((s) => s.setSelectedIndex);

  useEffect(() => {
    if (models.length === 0) {
      updateModels("http://localhost:8000/api/models");
      setSelectedIndex(0)
    }
  }, []);


  const handleSelect = (modelId) => {
    let model = models.filter(m=>m.id == modelId)[0]
    if(selectedIndex && selectedIndex == model.id) return 
  
    setSelectedIndex(modelId); // обновляем стор
    navigate(`/models/${modelId}`); // переходим
  };


  return (
    <>
    <div className="flex flex-col w-full relative">
        <Tabs data={modelTabs} />
        <div className="mt-4"> </div>
    <ModelList cardsInRow={cardsInRow} models={models} pagination={pagination} onSelect={handleSelect}/>

         </div>
  
    </>
  );
}