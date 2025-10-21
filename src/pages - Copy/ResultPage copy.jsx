import React, { useState } from "react";
import NavSide from "../components/UI/NavSide.jsx";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import AppHeader from "../components/UI/AppHeader.jsx";
import Card from "../components/ui/Card.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI/Template.jsx";
import ModelsC from "../components/Models/ModelsView.jsx";
import ComparisonContainer from "../components/Compare/ComparisonContainer.jsx"
import PromptInput from "../components/UI/PromptInput.jsx";
import AppFooter from "../components/UI/AppFooter.jsx";


export default function NewPageTemplate() {
  const templateType = 'action';


  return (
    <div className={`min-h-screen bg-white text-black`}>
        <AppHeader />
         <NavSide side="horizontal" />
        <Template  type={templateType}>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
            <div className="pt-50">
            <ViewTitle 
                       align="left"
                    title={'Result Models !'} 
                    subtitle={'choose one of the following'} 
                    desc={"Choose a baseline model to benchmark. We'll compare it against."} >
            </ViewTitle>
            </div>
    <ViewContent>
  <div className="min-h-[70vh] flex flex-col justify-between p-10">
    <div className="min-h-[50vh] max-h-[50vh] overflow-y-auto ">
      <ComparisonContainer />
      <div className="mb-6"></div>
      <ComparisonContainer header={false} />
    </div>
    

    <div className="mb-6" />

    <div className="sticky bottom-0 min-h-[20vh] max-h-[20vh]">
      <PromptInput />
    </div>
  </div>
</ViewContent>

              </div>
        
        </Template>
     
    </div>


  );
}