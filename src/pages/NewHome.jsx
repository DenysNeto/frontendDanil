import React, { useState } from "react";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import AppFooter from "../components/UI/AppFooter.jsx"
import Template from "../components/UI/Template.jsx";
import LogoGallery from "../components/UI/LogoGallery.jsx";
import CardsBenchmark from "../components/UI/CardsBenchmark.jsx"
import ModelsView from "../components/Models/ModelsView.jsx";
import ScrollButton from "../components/UI/ScrollButton.jsx";
import {Button} from "../components/UI/Buttons.jsx"
const tiles = [
  "Code Assistance",
  "Conversational AI",
  "Agentic Systems",
  "Search",
  "Multimedia",
  "Enterprise RAG",
];

export default function NewPageTemplate() {
    const templateType = "action"


    const Template1 = "main"
    const Template2 = "action"
  return (
<div className={`min-h-screen`}>
   

    <Template type={templateType}> 
        
        <div className="py-30"> 
       <ViewTitle 
            uptitle="Build the future with AI"
            uptitleSize = "3"
            titleCustom = {<h1 className="text-4xl font-bold">
            From Spark To{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent">
                Scale.
            </span>
            </h1>
            }
            desc={`Open-source AI models at blazing speed, optimized for your \n use case,scaled globally with our AI Cloud.`}
        > 
            <div className="flex  justify-center py-10">
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-dashed transition hover:bg-gray-800">
                    GET STARTED <span className="text-white text-lg">»</span>
                    </button>
                    
            </div>
            <ScrollButton/>
        </ViewTitle>
        </div>
 
    </Template>
    <div className="w-full bg-gradient-to-r from-blue-100 to-blue-200 ">
        <LogoGallery />

    </div>
    
    <div className="pb-48"></div>

    <Template type={templateType} bgActive={true}> 
             
   

       <ViewTitle 
            uptitle="BENCHMARK TASKS"
            uptitleSize = "2"
            titleSize="1"
            uptitleSmall = {true}
            title='All capabilities needed'
            desc={`From experimentation to production, Fireworks provides the platform to build your \nGenerative AI capabilities - optimized and at scale`}
       / > 

        
        <CardsBenchmark cardsInRow={6}/>

 
    </Template>


        <div className="pb-24"></div>

    <Template  type={templateType} bgActive={true}>


      <ViewTitle  uptitle="MODEL LIBRARY"
        uptitleSmall = {true}
            uptitleSize = "1"
            titleSize={1}
            title='200+ generative AI models'
            desc={`Build with open-source and specialized multimodal models for chat, images,  code, and  more. Migrate from closed models with OpenAI-compatible APIs.`}
      /> 
      
        <ModelsView cardsInRow={4} pagination={true}/>

    </Template>

</div>
  );
}