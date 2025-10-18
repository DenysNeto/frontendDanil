

import React, {useState, useMemo, useEffect} from "react";

import { useSettings } from "../contexts/SettingsContext";
import Header from "../components/ui/Header.jsx";
import {Button} from "../components/ui/Button.jsx";
import {ChevronLeft} from "lucide-react";
import Divider, {DividerGradient} from "../components/ui/Divider.jsx";

import Card from "../components/ui/Card.jsx";
import {useModelStore} from "../store/useModelStore.js";
import {useTaskStore} from "../store/useTaskStore.js";

import PromptForm from "../components/prompt/PromptForm.jsx";
import {usePromptStore} from "../store/usePromptStore.js";
import GPTChatCard from "../components/prompt/PromtChatCard";
//import GPTChatCard from "../components/prompt/PromtChatCard.js";
import {mockDataResponse} from "../mocks/mockDataResponse.js";
import {BenchmarkComparison} from "../components/benchmark/BenchmarkComparison.jsx";
import LoadingBenchmark from "../components/loading/LoadingBenchmark.jsx";
import {useNavigate} from "react-router-dom";


function BenchmarkResults() {
    const { settings } = useSettings();
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();
    const selectedPrompt = usePromptStore(state=>state.selectedPrompt);
    const selectedModel = useModelStore((state) => state.selectedModel);
    const getModelById = useModelStore((state) => state.getModelById);
    const selectedTask = useTaskStore(state=>state.selectedTask);
    const setSelectedTask = useTaskStore(state=>state.setSelectedTask);
    const resetSelectedTask = useTaskStore(state=>state.resetSelectedTask);

    const [response , setResponse] = useState("");
    const [loading , setLoading] = useState(false);

    const handleTabChange = (tab)=> {
        setActiveTab(tab);
    }

    const handlePromptSend = ()=>{
        setLoading(true);
        setTimeout(()=>{    setResponse(mockDataResponse);setLoading(false)}, 3000)

    }
    const handleBackClick = ()=>{
        navigate("/comparison_type")
    }

    const descrition = `........`

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
                    <div className="flex-2/3">
                        <Header
                            className="pb-4"
                            title="Prompt Result"
                            description={descrition}
                        />
                    </div>
       
                </div>
                <Divider/>


{/* 
                {response && (   <> <div className="flex flex-row gap-12 ">
                    <div className="flex-1 flex justify-start">
                        <Button disabled={activeTab == 1}  onClick={()=>handleTabChange(1)}>Show Prompt Result</Button>
                    </div>
                    <div className="flex-1 flex justify-start">
                        <Button disabled={activeTab == 2}  variant="success" onClick={()=>handleTabChange(2)}>Show Benchmark Result</Button>
                    </div>
                </div>

                    <Divider/></>
                ) } */}





                {activeTab == 1 && response &&      (  <> <div className="flex flex-row gap-4">
                    <GPTChatCard prompt={selectedPrompt} response={mockDataResponse} />
                    <GPTChatCard prompt={selectedPrompt} response={mockDataResponse}/>
                    <Divider/>

                </div>

                    </>
                )}

                {activeTab == 2 && response &&      <BenchmarkComparison/> }


                {loading &&           <LoadingBenchmark showCard={true} />}




                {!loading && !response &&  (   <div className="p-12">
                    <PromptForm promptSend = {handlePromptSend}/>
                </div>)  }





            </div>
        </>
    );
}
export default BenchmarkResults;
