import React, { useState, useMemo } from "react";

import { useSettings } from "../contexts/SettingsContext";
import Header from "../components/ui/Header.jsx";
import {Button} from "../components/ui/Button.jsx";
import {ChevronRight ,  ChevronLeft} from "lucide-react";
import Divider from "../components/ui/Divider.jsx";

import Card from "../components/ui/Card.jsx";
import {useModelStore} from "../store/useModelStore.js";
import {useNavigate} from "react-router-dom";
import {useTaskStore} from "../store/useTaskStore.js";

function ComparisonTypeSelectPage() {
    const { settings } = useSettings();
    const navigate = useNavigate();
    const selectedModel = useModelStore((state) => state.selectedModel);
    const tasks = useTaskStore((state) => state.tasks);
    const selectedTask = useTaskStore((state) => state.selectedTask);
    const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
    const resetSelectedTask = useTaskStore((state) => state.resetSelectedTask);



    const handleNextClick = ()=>{
        // todo logic what selected
        navigate("/compare");
    }

    const handleBackClick = ()=>{
          if(!selectedTask)return;
           if(selectedTask.type="Benchmark")
           {
               navigate("/benchmark_test");
           }
        if(selectedTask.type="Prompt")
        {
            navigate("/prompt_test");
        }

    }

    const  handleCompTypeSelect = (taskId)=>{
        if(selectedTask == taskId)
        {
            resetSelectedTask();
            return
        }
        setSelectedTask(taskId)
    }

    const descrition = `Choose the type of test to compare baseline vs optimized performance`

    return (
        <>
            <div className="p-6">
                <div className="w-full flex justify-between">
                    <div className="flex-1/3 flex justify-start items-end h-30">
                        {  <div>
                            <Button variant="success"  onClick={handleBackClick} icon={<ChevronLeft />}>Back</Button>
                        </div>
                        }
                    </div>
                    <div className="flex-1/3">
                        <Header
                            className="pb-4"
                            title="Select Test"
                            description={descrition}
                        />
                    </div>
                    <div className="flex-1/3 flex justify-end items-end h-30">
                        { selectedTask &&  <div>
                            <Button variant="success"  onClick={handleNextClick} iconAfter={<ChevronRight />}>Next</Button>
                        </div>
                        }
                    </div>
                </div>

                <Divider/>
                <div className=" pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden pr-4 pl-2 pb-4">
                    {tasks.map((task) => (
                        <Card
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            imageUrl={task.imageUrl}
                            actionText="Action"
                            selected={selectedTask == task.id}
                            onSelect={handleCompTypeSelect}
                            onAction={() => alert("Button clicked!")}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default ComparisonTypeSelectPage;
