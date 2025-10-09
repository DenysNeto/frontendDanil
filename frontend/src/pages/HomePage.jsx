import React, {useState, useMemo, useEffect} from "react";
import { useSettings } from "../contexts/SettingsContext";
import Header from "../components/ui/Header.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Card from "../components/ui/Card.jsx";
import Divider from "../components/ui/Divider.jsx";
import {useModelStore} from "../store/useModelStore.js";
import {useTaskStore} from "../store/useTaskStore.js";
import {Plus , ChevronRight} from "lucide-react";
import {Button} from "../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import {llmOptTypes} from "../mocks/optimizationTypeList.js";
import LoadingBenchmark from "../components/ui/loading/LoadingBenchmark.jsx";
import {comparisonTypeList} from "../mocks/comparisonTypeList.js";

function HomePage() {
  const { settings } = useSettings();
    const navigate = useNavigate();

    const selectedModel = useModelStore((state) => state.selectedModel);
    const models = useModelStore((state) => state.models);

    const setModels = useModelStore((state) => state.setModels);
    const setSelectedModel = useModelStore((state) => state.setSelectedModel);
    const resetSelectedModel = useModelStore((state) => state.resetSelectedModel);

    const setTasks = useTaskStore((state) => state.setTasks);

    const optTypes = useTaskStore((state) => state.optimizationTypes);



    const setSelectedOptimizationTypes = useTaskStore((state) => state.setSelectedOptimizationTypes);

    const description = "Choose a baseline model to benchmark. We'll compare it against our optimized variant to show performance improvements."

    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const isStateInit = models.length>0 && optTypes.length > 0
        if (isStateInit) {  setLoading(false); return}

        setTimeout(()=>{
            setModels(llmModels);
            setSelectedOptimizationTypes(llmOptTypes);
            setTasks(comparisonTypeList)

           // comparisonTypeList


            setLoading(false);
        }, 300)
    }, [])

   const  handleModelSelect = (modelId)=>{
        if(selectedModel == modelId)
        {
            resetSelectedModel();
            return
        }
       setSelectedModel(modelId)
    }

    const handleNextClick = ()=>{
       navigate("/optimization_type");
    }

  return (
    <>
        {loading &&  <LoadingBenchmark title="Loading Models..." subtitle="" showCard={true} />}
        {!loading && <div className="p-6">
            <div className="w-full flex justify-between">
                <div className="flex-2/3">
                    <Header
                        className="pb-4"
                        title="Select Model"
                        description={description}
                    />
                </div>
                <div className="flex-1/3 flex justify-end items-end h-30">
                    { selectedModel &&  <div>
                        <Button variant="success" onClick={handleNextClick} iconAfter={<ChevronRight />}>Next</Button>
                    </div>
                    }
                </div>
            </div>

            <Divider/>
            <div className="grid grid-cols-3 gap-10 pt-8">
                {models.map((model) => (
                    <Card
                        key={model.id}
                        id={model.id}
                        comingSoon={model.comingSoon}
                        title="Glass Card"
                        description={model.description}
                        imageUrl={model.imageUrl}
                        actionText="Action"
                        selected={selectedModel == model.id}
                        onSelect={handleModelSelect}
                        onAction={() => alert("Button clicked!")}
                    />
                ))}
            </div>
        </div> }

    </>
  );
}

export default HomePage;
