import React, { useState } from "react";
import ViewTitle from "../components/ui/ViewTitle.jsx";
import ViewContent from "../components/ui/ViewContent.jsx";

import Template from "../components/ui/Template.jsx";
import ModelsView from "../components/Models/ModelsView.jsx";


export default function ModelsPage() {
  const templateType = 'action';
  

  return (
    <div>
       
        <Template type={templateType} >
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
          <div className="pt-30">
            <ViewTitle 
                              align={"left"}
                              alignV={"top"}
                              backButton={false}
                              title={'Select a Model'} 
                              titleSize={
                                7
                              }
            >

                    <span className="text-xl mr-1000">
                            Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements.

                    </span>

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