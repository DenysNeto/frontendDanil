import React, { useState } from "react";
import NavSide from "../components/UI/NavSide.js";
import ViewTitle from "../components/UI/ViewTitle.js";
import ViewContent from "../components/UI/ViewContent.js";
import AppHeader from "../components/UI/AppHeader.js";
import Card from "../components/ui/Card.jsxx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI/Template.js";
import ModelsC from "../components/Models/ModelsView.jsxx";


export default function ModelsPage() {
  const templateType = 'action';
  
  const [darkMode, setDarkMode] = useState(false);
  const [models, setModels] = useState(llmModels);


  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-blue-950 to-indigo-900 text-white" : "bg-white text-black"}`}>
        <AppHeader isDarkMode={darkMode} onThemeToggle={() => setDarkMode(val => !val)} />
         <NavSide typeNav={"horizontal"} />
        <Template type={templateType}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[30%_70%] gap-6 lg:gap-8 w-full">
            <div className="pt-50">
            <ViewTitle 
                    align={"left"}
                    title={'Select a Model'} 
                    desc={"Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements."} >
            </ViewTitle>
            </div>
            <ViewContent>
                <ModelsC cardsInRow={3}/>
            </ViewContent>

              </div>
        </Template>


    </div>
  );
}