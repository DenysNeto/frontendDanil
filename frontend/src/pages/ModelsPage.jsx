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
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full max-w-full">
          <div className="pt-30">
            <ViewTitle
                              align={"left"}
                              alignV={"top"}
                              backButton={false}
                              title={'Select a Model'}
                              titleSize={
                                5
                              }
            >

                    <span className="text-xl">
                            Choose a baseline model for evaluation. Our optimized variant will be benchmarked against it to highlight performance gains.

                    </span>

            </ViewTitle>
          </div>
          


            <ViewContent className="overflow-x-auto overflow-y-visible max-w-full">
                <ModelsView cardsInRow={3} compact={true}/>
            </ViewContent>

              </div>
        </Template>

    </div>
  );
}