import React, { useState, Nav } from "react";
import { useNavigate } from "react-router-dom";
import ViewTitle from "../components/ui/ViewTitle.jsx";
import ViewContent from "../components/ui/ViewContent.jsx";
import ModelsSelectReminder from "../components/Models/ModelSelectReminder.jsx";
import Template from "../components/ui/Template.jsx";
import CardsBenchmark from "../components/ui/CardsBenchmark.jsx";
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

  const benchmarks = selectedModel && selectedModel['derivatives'] ? selectedModel['derivatives'].map((e)=>{
    return {
      title:e.title,
      img: pickRandom(images)
    }
  }) : []

  function onSelectBenchmark(val){

    let subModelData = selectedModel['derivatives'].filter(m=>m.title.toLowerCase()===val.toLowerCase())[0]

    // Add baseline_model_fqdn from parent model and rename model_fqdn to optimized_model_fqdn
    // Also add baseline_price and optimized_price for proper display
    const enhancedData = {
      ...subModelData,
      baseline_model_fqdn: selectedModel.baseline_model_fqdn || selectedModel.model_fqdn,
      optimized_model_fqdn: subModelData.model_fqdn,
      baseline_price: selectedModel.price,
      optimized_price: subModelData.price
    }

    setSelectedModelBenchmark(enhancedData)
    navigate(`/models/${selectedModel.id}/prompt`)
  }


  return (
  
  <>
    <div className={` flex justify-center items-center`}>

        <Template type={templateType}>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
          <div>
                        <ViewTitle
                    align={"left"}
                    alignV={"top"}
                    titleSize={5}
                    backButton={true}
                    uptitle={<div className="mt-24"></div>}
                    title={'Select a Task'}
   >

                    <span className="text-xl">

Choose a target task for optimization. We'll benchmark the optimized model against the baseline to demonstrate performance gains.

                    </span>


            </ViewTitle>
          </div>

           <Template>
             {hasSelectedModel ? <ViewContent>
                <CardsBenchmark onSelect={onSelectBenchmark} benchmarks={benchmarks} cardsInRow={benchmarks.length>3? 3 : benchmarks.length}/>
            </ViewContent> : <ModelsSelectReminder/>}
           </Template>

              </div>
        </Template>


    </div>

  </>

  );
}