import React, { useState ,useEffect } from "react";
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
import useInferenceAPI from "../hooks/useInferenceAPI.js";
import { useModelStore1 } from "../store/useModelStore1.js";
import {Spinner} from "../components/loading/Spinner.jsx"





export default function NewPageTemplate() {
  const backendAPI = useInferenceAPI("/api/models")
  const updateModels = useModelStore1((s)=>s.updateModels)
  const models = useModelStore1(s=>s.models)


useEffect(() => {
  updateModels(("http://localhost:8000/api/models"))

  }, [] ); // ✅ пустой массив — вызов только один раз
  console.log("MODELSHOME", models);
    const templateType = "action"

  return (
<div className={` relative min-h-screen overflow-hidden `}>

    { models.length==0 ? <Spinner  withText={true} className="flex class  justify-center w-full mt-[10%] "/> :
   (<PageEnterAnimation>

<div >



<motion.img
  src="/bg/variant4.svg"
  alt="Right decoration"
  initial={{ opacity: 0.3, y:200}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.8, ease: "easeOut" }}
   style={{
    animation: "floatY 8s ease-in-out infinite",
    margin:0
  }}
  className="absolute top-[-10%]  right-[-100px]   w-[400px] h-[800px] z-[96] overflow-hidden"
/>

  
  
<motion.div
  initial={{ opacity: 0.3, y: 0 }}
   animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.8, ease: "easeOut" }}
   style={{
    animation: "floatYL  13s ease-in-out infinite",
    margin:0
  }}
  className="absolute top-0 left-0 w-[400px] h-[800px] z-[96] overflow-hidden animate-left-clip"
>
  <img
    src="/bg/variant5.svg"
    alt="Left decoration"
    className="w-full h-full object-cover"
    style={{ margin: 0 }}
  />
</motion.div>


<style>
{`

@keyframes floatYL {
  0%, 100% {
    transform: translateY(0) scale(1);
    left: 0;
  }
  50% {
    transform: translateY(150px) scale(1.3);
    left: -5%;
  }
}



  @keyframes floatY {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(150px); }
  }
`}
</style>


<motion.div
  alt="Content "
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
                Scale
            </span>.
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
            uptitle="BENCHMARK TASKS"
            titleSize={6}
            uptitleBold={false}
            title='All capabilities needed'
            desc={`From experimentation to production, Fireworks provides the platform to build your \nGenerative AI capabilities - optimized and at scale`}
       />

        <CardsBenchmark cardsInRow={6}/>

    </Template>


    

    <Template  type={templateType} bgActive={true}>
<div className="flex flex-col gap-[250px]">
  <div className="flex flex-col gap-10">
  <ViewTitle  uptitle="MODEL LIBRARY"
            titleSize={6}
            uptitleBold={false}
            title='200+ generative AI models'
            desc={`Build with open-source and specialized multimodal models for chat, images,  code, and  more.\n  Migrate from closed models with OpenAI-compatible APIs.`}
      /> 
      
        <ModelsView cardsInRow={4} pagination={true} gap={'4'}/>
  </div>


        <BlockCTA />
</div>

     
    </Template>

 
    </div>


</div>
    </PageEnterAnimation>
  )}

  </div>
  );

}