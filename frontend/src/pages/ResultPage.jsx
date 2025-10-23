import React, { useState } from "react";
import NavSide from "../components/ui/NavSide.jsx";
import ViewTitle from "../components/ui/ViewTitle.jsx";
import ViewContent from "../components/ui/ViewContent.jsx";
import AppHeader from "../components/ui/AppHeader.jsx";

import Template from "../components/ui/Template.jsx";
;
import ComparisonContainer from "../components/Compare/ComparisonContainer.jsx"
import PromptInput from "../components/ui/PromptInput.jsx";
import AppFooter from "../components/ui/AppFooter.jsx";


const comparisonData2 = [
  {
    id: 1,
    type: "LIVE TEST",
    values: ["Qwen1-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.", "Qwen2-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors."],
  },

];


export default function NewPageTemplate() {
  const templateType = 'action';
  const [responsePrompt, setResponsePrompt] = useState(false);
  const [valuePrompt, setValuePrompt] = useState("")
  function sendPrompt(val){
     setResponsePrompt(true) 

  }

  return (
    <div className={`min-h-screen bg-white text-black`}>
        <AppHeader />
         <NavSide typeNav="horizontal" />
        <Template  type={templateType}>
           
        <ViewTitle title={"Model Demo"} align="left" />
 
        <ViewContent>
      
        <div className="min-h-[70vh] flex flex-col justify-between ">
          <div className="min-h-[50vh] max-h-[50vh] overflow-y-auto ">
            <ComparisonContainer />
     
            <div className="mb-18"></div>
            {responsePrompt && <ComparisonContainer header={false} data={comparisonData2} />
            }
            
          
          </div>
          

          <div className="mb-4" />

          <div className="sticky bottom-0 min-h-[20vh] max-h-[20vh] w-4/5 ml-auto ">
            <PromptInput onSend={sendPrompt} />
          </div>
        </div>
    </ViewContent>
          
        </Template>
     
    </div>


  );
}