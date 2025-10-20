import React, { useState, Nav } from "react";
import { useNavigate } from "react-router-dom";


import NavSide from "../components/UI/NavSide.jsx";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import AppHeader from "../components/UI/AppHeader.jsx";
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
    <div className={`min-h-screen`}>
        <AppHeader/>
         <NavSide />
        <Template type={templateType}>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
            <div className="pt-50">
            <ViewTitle 
                    align={"left"}
                    title={'Select a Benchmark'} 
                    desc={"Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements."} >
            </ViewTitle>
            </div>
            <ViewContent>
                <CardsBenchmark onSelect={onSelectBenchmark} benchmarks={benchmarks} cardsInRow={benchmarks.length>=3?3:2}/>
            </ViewContent>

              </div>
        </Template>


    </div>
  );
}