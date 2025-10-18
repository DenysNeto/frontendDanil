import React, { useState, useMemo } from "react";

import { useSettings } from "../contexts/SettingsContext";
import Header from "../components/ui/Header.jsx";
import {Button} from "../components/ui/Button.jsx";
import {ChevronRight ,  ChevronLeft} from "lucide-react";
import Divider from "../components/ui/Divider.jsx";

import Card from "../components/ui/Card.jsx";
import {useModelStore} from "../store/useModelStore.js";
import {useTaskStore} from "../store/useTaskStore.js";
import {llmOptTypes} from "../mocks/optimizationTypeList.js";
import {useNavigate} from "react-router-dom";

function OptimizationTypeSelectPage() {
  const { settings } = useSettings();
    const navigate = useNavigate();
    const selectedModel = useModelStore((state) => state.selectedModel);
    const getModelById = useModelStore((state) => state.getModelById);

    const optimizationTypes = useTaskStore(state=>state.optimizationTypes);
    const selectedOptimizationType = useTaskStore(state=>state.selectedOptimizationType);
    const setSelectedOptimizationType = useTaskStore(state=>state.setSelectedOptimizationType);
    const resetSelectedOptimizationType = useTaskStore(state=>state.resetSelectedOptimizationType);

    const  handleOptTypeSelect = (typeId)=>{
        if(selectedOptimizationType == typeId)
        {
            resetSelectedOptimizationType();
            return
        }
        setSelectedOptimizationType(typeId)
    }

    const handleNextClick = ()=>{
        navigate("/comparison_type");
    }

    const handleBackClick = ()=>{
        navigate("/");
    }

    const descrition = `Choose the type of task to compare baseline vs optimized performance`

  return (
    <>
        <div className="p-6">
            <div className="w-full flex justify-between">
                <div className="flex-1/3 flex justify-start items-end h-30">
                    <div>
                        <Button variant="success"  onClick={handleBackClick} icon={<ChevronLeft />}>Change Model</Button>
                    </div>
                </div>
                <div className="flex-1/3">
                    <Header
                        className="pb-4"
                        title="Select Optimization Type"
                        description={descrition}
                    />
                </div>
                <div className="flex-1/3 flex justify-end items-end h-30">
                    { selectedOptimizationType &&  <div>
                        <Button variant="success"  onClick={handleNextClick} iconAfter={<ChevronRight />}>Next</Button>

                    </div>
                    }
                </div>
            </div>

            <Divider/>
            <div className=" pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden pr-4 pl-2 pb-4">
                {optimizationTypes.map((type) => (
                    <Card
                        key={type.id}
                        id={type.id}
                        title={type.title}
                        description={type.description}
                        imageUrl={type.imageUrl}
                        actionText="Action"
                        selected={selectedOptimizationType == type.id}
                        onSelect={handleOptTypeSelect}
                        onAction={() => alert("Button clicked!")}
                    />
                ))}
            </div>
        </div>
    </>
  );
}
export default OptimizationTypeSelectPage;
