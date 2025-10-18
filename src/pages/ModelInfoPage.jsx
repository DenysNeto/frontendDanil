import React, { useState } from "react";
import NavSide from "../components/UI_new/NavSide.jsx";
import ViewTitle from "../components/UI_new/ViewTitle.jsx";
import ViewContent from "../components/UI_new/ViewContent.jsx";
import AppHeader from "../components/UI_new/AppHeader.jsx";
import Card from "../components/ui/Card.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI_new/Template.jsx";
import ModelsC from "../components/UI_new/Models/ModelsView.jsx";
import { useModelStore1 } from "../store/useModelStore1.ts";
import { useLocation } from "react-router-dom";
import ComparisonContainer from "../components/UI_new/Compare/ComparisonContainer.jsx";
import CodeViewer from "../components/UI_new/CodeViewer.jsx";
import Accordion from "../components/UI_new/Accordion.jsx";
import ScrollButton from "../components/UI_new/ScrollButton.jsx"
import ellipse from "../assets/bg/ellipse.png"
import { FaServer, FaTools, FaMicrochip, FaRobot, FaBolt } from 'react-icons/fa';
import { LuCopy } from "react-icons/lu";
import BgImgPaste from "../components/UI_new/BgImgPaste.jsx"
import Tabs from "../components/UI_new/Tabs.jsx";

let tabs = [
  {label:"CURL", value : "CURL"},
   {label:"PYTHON", value : "PYTHON"},
    {label:"TYPESCRIPT", value : "TYPESCRIPT"}
]

 let FAQ = [
    {
      title: "Applications & Use Cases",
      text:'Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.'
    },
        {
      title: "Applications & Use Cases",
      text:'Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.'
    },
        {
      title: "Applications & Use Cases",
      text:'Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.'
    },
        {
      title: "Applications & Use Cases",
      text:'Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.'
    },
        {
      title: "Applications & Use Cases",
      text:'Qwen3-Next Thinking features the same highly sparse MoE architecture but specialized for complex reasoning tasks. Supports only thinking mode  with automatic  tag inclusion, delivering exceptional analytical  performance while maintaining extreme efficiency with 10x+ higher  throughput on long contexts and may generate longer thinking content  than predecessors.'
    }
  ]


  const code_example = ` curl -X POST "https://api.together.xyz/v1/chat/completions" \ 
                        -H "Authorization: Bearer $TOGETHER_API_KEY" \ 
                        -H "Content-Type: application/json" \ 
                        -d '{ 
                            "model": "Qwen/Qwen3-235B-A22B-Instruct-2507-tput", 
                            "messages": [ 
                                { 
                                    "role": "user", 
                                    "content": "What are some fun things to do in New York?" 
                                } 
                            ] 
                    }'`

export default function ModelsPage() {
  const templateType = 'action';
  const models = useModelStore1((s) => s.models);
  const index = useModelStore1((s) => s.selectedIndex);
  const setSelectedIndex = useModelStore1((s) => s.setSelectedIndex);
  const setSelectedModel =  useModelStore1((s) => s.setSelectedModel);
  const model =  useModelStore1((s) => s.selectedModel);
  const location = useLocation();

    let m_id = location.pathname.split('/')[2]
    let m_index =  models.findIndex(s=>s.id==m_id)
    if(index != m_index) setSelectedIndex(m_index)


  return (
    <>

      
    {model &&
        <div className={` w-full "}`}>
            <AppHeader />
            <NavSide typeNav={"horizontal"} />
      
          <div
            className="relative bg-repeat-y bg-center bg-[length:100%_300px] min-h-screen"

          >

            <div className="pt-20"></div>
          
            <Template type={templateType}>
               
              <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 p-6 w-full">
                    
                      <div className=" rounded-xl  p-4">
                                         
                           
                        <ViewTitle title={model.title} desc={model.description} actionText= {"TRY DEMO"}  align={"left"}/>
                      <div className="pb-20"></div>
                                <div className="bg-black/0">
                                  <ComparisonContainer/>
                                </div>
                    
        
                         
                                  
                      <div className="pb-20"></div>
                        <ViewTitle align={'center'} subtitleCustom={
                            <div className="flex items-center justify-between text-center w-full">
                            <h3>API USAGE</h3> 
                            <button onClick={()=>{navigator.clipboard.writeText(code_example)}} className={"hover:bg-gray-200 rounded-3xl p-3"}> <LuCopy/></button>
                            </div>

                          
                        } />
                        <Tabs data={tabs} align={"left"} />
                        <CodeViewer language={'js'} code={code_example}/>
                      <div className="pb-20 ">
                       
                      </div>
                      

                         <ViewTitle  subtitle={"FAQ"} align={'left'} />
                         
                        <Accordion data={FAQ} />
                        
                      <div className="pb-20"></div>
                        <ScrollButton toTop={true}/>
                        
                      </div>

    <div className="max-w-sm flex flex-col">
        {model?.imageUrl && (

           <img
            src={model.imageUrl}
            className="mb-30 ml-auto bg-white shadow-[0_0_50px_#C3E6FF99] rounded-full p-4 h-48 w-48 object-cover "
            alt="Model preview"
          />
      
         
        )}
        
        <ul className="space-y-3 text-gray-700 sticky top-28 bg-[#297A971A] rounded-2xl p-6 text-lg">
          <li className="flex items-center gap-2 py-4 border-b-2 border-gray-300  p-4">
            <FaRobot className="text-blue-500" />
            <strong>Model Provider</strong> <span className="ml-auto">OpenAI</span>
          </li>
          <li className="flex items-center gap-2 py- border-b-2 border-gray-300  p-4">
            <FaMicrochip className="text-blue-500" />
            <strong>Model Type</strong> <span className="ml-auto">LLM</span>
          </li>
          <li className="flex items-center gap-2 py-4   p-4 border-b-2 border-gray-300">
            <FaBolt className="text-blue-500" />
            <strong>Context Length:</strong> <span className="ml-auto">131072</span>
          </li>
          <li className="flex items-center gap-2 py-4 p-4  border-b-2 border-gray-300">
            <FaServer className="text-blue-500" />
            <strong>Serverless:</strong> <span className="ml-auto">Available</span>
          </li>
          <li className="flex items-center gap-2  p-4 py-4">
            <FaTools className="text-blue-500" />
            <strong>Fine-Tuning:</strong> <span className="ml-auto">Available</span>
          </li>
        </ul>
    </div>

                    </div>


       
            </Template>

        </div>
      

    </div>
    }

    {!model && <div>NO</div>}
    </>
  );
}