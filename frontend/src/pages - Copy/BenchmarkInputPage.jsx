import React, {useState, useMemo, useEffect} from "react";

import { useSettings } from "../contexts/SettingsContext.jsx";
import Header from "../components/ui/Header.jsx";
import {Button} from "../components/ui/Button.jsx";
import {ChevronRight,ChevronLeft } from "lucide-react";
import Divider, {DividerGradient} from "../components/ui/Divider.jsx";
import {useNavigate} from "react-router-dom";


import {mockDataResponse} from "../mocks/mockDataResponse.js";
import {BenchmarkComparison} from "../components/benchmark/BenchmarkComparison.jsx";
import LoadingBenchmark from "../components/loading/LoadingBenchmark.jsx";

import {useBenchmarkStore} from "../store/useBenchmarkStore.js";

import InputJSON from "../components/benchmark/InputJSON.jsx";


function BenchmarkInputPage() {
    const { settings } = useSettings();
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();

    const handleBackClick = ()=>{
        navigate("/comparison_type")
    }
    const handleNextClick = ()=>{
        // todo logic what selected

        navigate("/compare");
    }


    const { valid, rawText} = useBenchmarkStore()

    const [response , setResponse] = useState("");
    const [loading , setLoading] = useState(false);

    const handleTabChange = (tab)=> {
        setActiveTab(tab);
    }

    const handlePromptSend = ()=>{
        setLoading(true);
        setTimeout(()=>{    setResponse(mockDataResponse);setLoading(false)}, 3000)

    }



    const descrition = `Enter JSON`

    return (
        <>
            {rawText}
    
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
                            title="Benchmark"
                            description={descrition}
                        />
                    </div>
              

                    <div className="flex-1/3 flex justify-end items-end h-30">

                        { valid && !response &&  <div>
                            <Button variant="success" onClick={handlePromptSend} iconAfter={<ChevronRight />}>Next</Button>

                        </div>
                        }
                        
                    </div>
                </div>
                <Divider/>





                {loading && <LoadingBenchmark showCard={true} />}

                { response && !loading && <BenchmarkComparison/> }

                {!loading && !response &&   (
                                            <div className="p-12">
                                                <InputJSON />
                                            </div>
                                            )
                }





            </div>
        </>
    );
}
export default BenchmarkInputPage;
