import React, { useState, Nav } from "react";
import { useNavigate } from "react-router-dom";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import ModelsSelectReminder from "../components/Models/ModelSelectReminder.jsx";
import Template from "../components/UI/Template.jsx";
import CardsBenchmark from "../components/UI/CardsBenchmark.jsx";
import { useModelStore1 } from "../store/useModelStore1.js";

const images = ["/cards/card1.png","/cards/card2.png","/cards/card3.png","/cards/card4.png","/cards/card5.png","/cards/card6.png"];
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}



export default function ModelBenchmarkPage() {
  const navigate = useNavigate()
  const templateType = 'action';
  const selectedModel = useModelStore1((s)=>s.selectedModel)
  const setSelectedModelBenchmark = useModelStore1(s=>s.setSelectedModelBenchmark)

  const hasSelectedModel = selectedModel ? true:false

  const benchmarks = selectedModel && selectedModel['sub-models'] ? selectedModel['sub-models'].map((e)=>{
    return {
      title:e.title,
      img: pickRandom(images)
    }
  }) : []

  function onSelectBenchmark(val){

    let subModelData = selectedModel['sub-models'].filter(m=>m.title.toLowerCase()===val.toLowerCase())[0]
    
    setSelectedModelBenchmark(subModelData)
    navigate('/models/prompt')
    console.log("subModelData",subModelData)
  }


  return (
  
  <>
    <div className={` flex justify-center items-center`}>

        <Template type={templateType}>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">

                        <ViewTitle 
                    align={"left"}

                    backButton={true}
                    title={'Select a Benchmark'}
                    titleSize={
                      7
                    }
   >

                    <span className="text-xl">
                    
Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements.
        
                    </span>


            </ViewTitle>
  
           <Template>
             {hasSelectedModel ? <ViewContent>
                <CardsBenchmark onSelect={onSelectBenchmark} benchmarks={benchmarks} cardsInRow={3}/>
            </ViewContent> : <ModelsSelectReminder/>}
           </Template>

              </div>
        </Template>


    </div>

  </>

  );
}