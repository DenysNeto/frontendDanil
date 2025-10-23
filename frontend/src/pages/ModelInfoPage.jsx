import React, { useState } from "react";


import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";


import Template from "../components/UI/Template.jsx";

import { useModelStore1 } from "../store/useModelStore1.ts";
import { useLocation, useNavigate } from "react-router-dom";
import CodeViewer from "../components/UI/CodeViewer.jsx";
import Accordion from "../components/UI/Accordion.jsx";
import ScrollButton from "../components/UI/ScrollButton.jsx"
import { FaServer, FaTools, FaMicrochip, FaRobot, FaBolt } from 'react-icons/fa';
import { LuCopy } from "react-icons/lu";
import Tabs from "../components/UI/Tabs.jsx";



let tabs = [
  {label:"CURL", value : "CURL"},
   {label:"PYTHON", value : "PYTHON"},
    {label:"TYPESCRIPT", value : "TYPESCRIPT"}
]
  const code_example = ` curl -X POST "https://api.together.xyz/v1/chat/completions" \ 
                        -H "Authorization: Bearer $TOGETHER_API_KEY" \ 
                        -H "Content-Type: application/jsxon" \ 
                        -d '{ 
                            "model": "Qwen/Qwen3-235B-A22B-Instruct-2507-tput", 
                            "messages": [ 
                                { 
                                    "role": "user", 
                                    "content": "What are some fun things to do in New York?" 
                                } 
                            ] 
                    }'`




export default function ModelInfoPage() {
  const navigate = useNavigate()

  const templateType = 'action';
  const models = useModelStore1((s) => s.models);
  const index = useModelStore1((s) => s.selectedIndex);
  const selectedModel =  useModelStore1((s) => s.selectedModel);
  const setSelectedIndex = useModelStore1((s) => s.setSelectedIndex);
  const setSelectedModel =  useModelStore1((s) => s.setSelectedModel);
  const model =  useModelStore1((s) => s.selectedModel);
  const location = useLocation();

   const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code_example);
    setCopied(true);
    setTimeout(() => setCopied(false), 500); // ⏱️ сброс через 2 секунды
  };


    let m_id = location.pathname.split('/')[2]
    let m_index =  models.findIndex(s=>s.id==m_id)
    if(index != m_index) setSelectedIndex(m_index)


  return (
    <>

      
    {model &&
          <div
            className="relative bg-repeat-y bg-center bg-[length:100%_300px] min-h-screen"

          >

            <div className="pt-20"></div>
          
            <Template type={templateType} bgActive={true}>
               
              <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 p-6 w-full">
                    
                      <div className=" rounded-xl  p-4">
                                         
                           
                        <ViewTitle title={model.title} desc={model.description} actionText= {"TRY DEMO"} onAction={()=>{navigate("/models/benchmark")}} align={"left"}/>
                
                                  
                      <div className="pb-20"></div>
                        <ViewTitle align={'center'} subtitleCustom={
                            <div className="flex items-center justify-between text-center w-full">
                            <h3>API USAGE</h3> 
                           
                            </div>

                          
                        } />

                        <div className="flex justify-between">
                            <Tabs data={tabs} align={"left"} />
                         
                            <button onClick={handleCopy} className={`p-3 rounded-full text-sm font-medium transition-colors duration-300
                                ${copied ? 'bg-green-300 text-black' : 'text-black hover:bg-gray-300'}
                              `}> <LuCopy/>
                            </button>
                        </div>
                        
                        <CodeViewer language={'js'} code={code_example}/>
    
                      <div className="pb-20 ">
                       
                      </div>
                      

                         <ViewTitle  subtitle={"FAQ"} align={'left'} />
                         
                        <Accordion data={selectedModel.faq} />
                        
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
            <strong>Provider</strong> <span className="ml-auto">{selectedModel.provider}</span>
          </li>
          <li className="flex items-center gap-2 py- border-b-2 border-gray-300  p-4">
            <FaMicrochip className="text-blue-500" />
            <strong>Type</strong> <span className="ml-auto">{selectedModel.type}</span>
          </li>
          <li className="flex items-center gap-2 py-4   p-4 border-b-2 border-gray-300">
            <FaBolt className="text-blue-500" />
            <strong>Context Length</strong> <span className="ml-auto">{selectedModel.context_length}</span>
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
    }

    </>
  );
}