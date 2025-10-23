import React, { useState } from "react";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";

import Template from "../components/UI/Template.jsx";
import ModelsView from "../components/Models/ModelsView.jsx";


export default function ModelsPage() {
  const templateType = 'action';
  

  return (
    <div>
       
        <Template type={templateType} >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
            <div >
            <ViewTitle 
                    align={"left"}
                    alignV={"top"}
                    backButton={true}
                    title={'Select a Model'} 
                    desc={"Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements."} >
            </ViewTitle>
            </div>
            <ViewContent>
                <ModelsView cardsInRow={3}/>
            </ViewContent>

              </div>
        </Template>

    </div>
  );
}