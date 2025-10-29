import React, { useState, useEffect } from "react";


import ViewTitle from "../components/ui/ViewTitle.jsx";
import ViewContent from "../components/ui/ViewContent.jsx";
import Icon from "../components/ui/Icon.jsx"

import Template from "../components/ui/Template.jsx";

import { useModelStore1 } from "../store/useModelStore1.ts";
import { useLocation, useNavigate } from "react-router-dom";
import CodeViewer from "../components/ui/CodeViewer.jsx";
import Accordion from "../components/ui/Accordion.jsx";
import ScrollButton from "../components/ui/ScrollButton.jsx"
import { FaServer, FaTools, FaMicrochip, FaRobot, FaBolt } from 'react-icons/fa';
import { LuCopy } from "react-icons/lu";
import Tabs from "../components/ui/Tabs.jsx";
import defaultModelImage from "../assets/modelsImage/Model.png";

// Dynamically import all images from the modelsImage folder using Vite's glob import
const imageModules = import.meta.glob('../assets/modelsImage/*.png', { eager: true });

// Helper function to get image based on provider
const getModelImage = (provider) => {
  if (provider && typeof provider === "string") {
    const lowerProvider = provider.toLowerCase();
    // Try to find the image in the glob imports
    const imagePath = `../assets/modelsImage/${lowerProvider}.png`;

    if (imageModules[imagePath]) {
      return imageModules[imagePath].default;
    }
    console.warn(`Provider image not found for: ${provider}, using default`);
  }
  return defaultModelImage;
};



let tabs = [
  {label:"CURL", value : "CURL"},
   {label:"PYTHON", value : "PYTHON"},
    {label:"TYPESCRIPT", value : "TYPESCRIPT"}
]




export default function ModelInfoPage() {
  const navigate = useNavigate()

  const templateType = 'action';
  const models = useModelStore1((s) => s.models);
  const index = useModelStore1((s) => s.selectedIndex);
  const selectedModel =  useModelStore1((s) => s.selectedModel);
  const setSelectedIndex = useModelStore1((s) => s.setSelectedIndex);
  const model =  useModelStore1((s) => s.selectedModel);
  const location = useLocation();

   const [copied, setCopied] = useState(false);

  // Generate dynamic code example based on selected model
  const code_example = selectedModel ? `curl -X POST "https://${selectedModel.baseline_model_fqdn}/v1/chat/completions" \\
    -H "Authorization: Bearer $TWODELTA_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d '{
        "model": "${selectedModel.provider}/${selectedModel.id}",
        "messages": [
            {
                "role": "user",
                "content": "Where can I find the best viewpoints in Tokyo?"
            }
        ]
}'` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(code_example);
    setCopied(true);
    setTimeout(() => setCopied(false), 500); // ⏱️ сброс через 2 секунды
  };

  // Redirect to main page if no model is selected
  useEffect(() => {
    if (!selectedModel) {
      navigate('/');
    }
  }, [selectedModel, navigate]);

  function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}




    let m_id = location.pathname.split('/')[2]
    let m_index =  models.findIndex(s=>s.id==m_id)
    if(index != m_index) setSelectedIndex(m_index)

  return (
    <>
    {model && (() => {
      const sideList = [
        {
          icon: "Cube",
          title :"Model Provider",
          value :selectedModel.provider || "",
      },
      {
        icon: "ThreeStripes" ,
        title:"Model Type",
        value : selectedModel.type
      },
      {
        icon: "CntxLength" ,
        title:" Context Length",
        value : selectedModel.context_length
      },
      {
        title:"Serverless",
        icon:"Cloud",
        value: "Available",
        tab:true
      },
      {
        title:"Fine-Tuning",
        icon:"FineTune",
        value: "Available",
        tab:true
      },
{
  title:"Pricing per audio minute",
  icon:"Price",
  value: "$0.3",
  largeFont: true
}
      ];

      return (
          <div className="relative ">
            <img
              src="/bg/variant3.svg"
              alt="Right decoration"
              className="absolute right-0 -translate-y-1/2 w-[20vw] h-auto animate-[fallUp_10s_ease-in-out_infinite] "
            />

            <style>
              {`
                @keyframes fallUp {
                  0%   { top: 0rem; }   /* top-40 */
                  50%  { top: 15rem; }   /* top-120 */
                  100% { top: 0rem; }   /* обратно к top-40 */
                }
              `}
            </style>



            <Template type={templateType} bgActive={true}>
               
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 p-6 w-full">
                    
                      <div className="">
                                         
                           
                        <ViewTitle backButton={true} titleCustom={<p className="text-6xl font-semibold">{model.title}</p>} title={model.title} desc={capitalize(model.description)} actionText= {"TRY DEMO"} onAction={()=>{navigate("/models/benchmark")}} align={"left"}/>
                
                                  
                      <div className="pb-20"></div>
                      

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
                      
                      {selectedModel?.faq && <>
                       <ViewTitle  subtitle={"FAQ"} align={'left'} />
                         
                        <Accordion data={selectedModel.faq} />
                      </>}
                        
                        
                      <div className="pb-20"></div>
                        <ScrollButton toTop={true}/>
                        
                      </div>

                      <div className="flex flex-col">

                        <div className=" bg-white shadow-[0_0_50px_#C3E6FF99] rounded-full h-50 w-50 p-10 mb-30 ml-auto">
                             <img
                              src={model.imageUrl || getModelImage(model.provider)}
                              className={`mx-auto ${!model.imageUrl && ""} `}
                              alt="Model preview"
                            />
                        </div>
                            




                        <ul className="space-y-3 text-gray-700 sticky top-28 bg-[#297A971A] rounded-2xl p-6">
                            {sideList.map((item, index) => {
                              return (
                                <li key={index} className={`py-4 ${index+1!=sideList.length  && "border-b-2 border-gray-300"} ${item.largeFont ? 'flex flex-col' : 'flex items-center'}`}>
                                  <div className={`${item.largeFont ? 'flex items-center mb-2' : 'flex flex-row items-center justify-center'}`}>
                                    <div className="p-3 bg-white rounded-full flex flex-row items-center justify-center">
                                    <Icon size="small" name={item.icon}/>
                                    </div>
                                    <span className={` text-md px-4 ${item.largeFont ? 'py-0' : 'py-2'}`}>
                                      {item.title}
                                    </span>
                                  </div>
                                  <span className={`${item.largeFont ? 'self-end font-bold text-[32px]' : 'ml-auto font-bold'} ${item.tab && "rounded-full bg-[#297A971A] font-semibold px-4 py-2"}`} >
                                    {item.largeFont ? (
                                      <>
                                        <span className="text-[18px]">$</span>
                                        <span>{selectedModel.price.input_per_million_tokens}</span>
                                      </>
                                    ) : (
                                      item.value
                                    )}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                          
                    
                      </div>

                    </div>


       
            </Template>


        </div>
      );
    })()}

    </>
  );
}