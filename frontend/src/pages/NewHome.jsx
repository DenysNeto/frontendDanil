import React, { useState } from "react";
import ViewTitle from "../components/ui/ViewTitle.jsx";
import ViewContent from "../components/ui/ViewContent.jsx";
import AppFooter from "../components/ui/AppFooter.jsx"
import Template from "../components/ui/Template.jsx";
import LogoGallery from "../components/ui/LogoGallery.jsx";
import CardsBenchmark from "../components/ui/CardsBenchmark.jsx"
import ModelsView from "../components/Models/ModelsView.jsx";
import ScrollButton from "../components/ui/ScrollButton.jsx";
import {Button} from "../components/ui/Buttons.jsx"
import BlockCTA from "../components/ui/BlockCTA.jsx";
import {PageEnterAnimation} from "../components/Animation.jsx"
import { motion } from "framer-motion";

export default function NewPageTemplate() {
    const templateType = "action"

  return (
    <PageEnterAnimation>

<div className={`min-h-screen overflow-hidden mt-10 `}>
   

<motion.img
  src="/bg/variant5.svg"
  alt="Left decoration"
  initial={{ opacity: 0.3, y:-50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="absolute top-30 left-0 w-[25vw] h-auto z-[96] overflow-hidden animate-[floatY_6s_ease-in-out_infinite]"
     style={{
    animation: "floatY 6s ease-in-out infinite",
  }}
/>

<motion.img
  src="/bg/variant4.svg"
  alt="Right decoration"
  initial={{ opacity: 0.3, y:100}}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
   style={{
    animation: "floatY 6s ease-in-out infinite",
  }}
  className="absolute top-[-20%] right-0  w-[18vw] h-auto z-[96] overflow-hidden animate-[floatY_6s_ease-in-out_infinite]"
/>

  

<style>
{`
  @keyframes floatY {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(50px); }
  }
`}
</style>


<motion.div
  alt="Right decoration"
  initial={{ opacity: 0, y:100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, ease: "easeIn", delay: 0.1 }}
 >

    <Template type={templateType}> 
        
        <div className="py-30"> 
          
       <ViewTitle 
            uptitle="Build the future of AI"
            align={"center"}
            uptitleSize = "6"
            uptitleBold={false}
            titleCustom = {<p className="text-8xl font-semibold">
            
            From Spark To{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent">
                Scale.
            </span>
            </p>
            }
            desc={`Open-source AI models at blazing speed, optimized for your \n use case,scaled globally with our AI Cloud.`}
            actionText={'GET STARTED'}
       > 

            <ScrollButton/>
        </ViewTitle>
        </div>
 
    </Template>

</motion.div>




    <div className="w-full overflow-hidden ">
        <LogoGallery />

    </div>
    
    <div className=" pt-[250px] flex flex-col gap-[250px]">

    <Template type={templateType} bgActive={true}> 
       <ViewTitle
           uptitleSize = "2"
            uptitle="BENCHMARK TASKS"
            titleSize="7"
            uptitleBold={false}
            title='All capabilities needed'
            desc={`From experimentation to production, Fireworks provides the platform to build your \nGenerative AI capabilities - optimized and at scale`}
       />

        <CardsBenchmark cardsInRow={6}/>

    </Template>


    

    <Template  type={templateType} bgActive={true}>
<div className="flex flex-col gap-[250px]">
  <div>
  <ViewTitle  uptitle="MODEL LIBRARY"
            titleSize={6}
            uptitleBold={false}
            title='200+ generative AI models'
            desc={`Build with open-source and specialized multimodal models for chat, images,  code, and  more.\n  Migrate from closed models with OpenAI-compatible APIs.`}
      /> 
      
        <ModelsView cardsInRow={4} pagination={true}/>
  </div>


        <BlockCTA />
</div>

     
    </Template>

 
    </div>


</div>
    </PageEnterAnimation>

  );
}