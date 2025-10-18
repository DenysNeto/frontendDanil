import React, { useState } from "react";
import NavSide from "../components/UI_new/NavSide.jsx";
import ViewTitle from "../components/UI_new/ViewTitle";
import ViewContent from "../components/UI_new/ViewContent";
import AppHeader from "../components/UI_new/AppHeader";
import Card from "../components/ui/Card.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI_new/Template.jsx";
import ModelsC from "../components/UI_new/Models/ModelsView.jsx";
import ComparisonContainer from "../components/UI_new/Compare/ComparisonContainer.jsx"

const tiles = [
  "Code Assistance",
  "Conversational AI",
  "Agentic Systems",
  "Search",
  "Multimedia",
  "Enterprise RAG",
];

export default function NewPageTemplate() {
  const templateType = 'action';
  
  const [darkMode, setDarkMode] = useState(false);
  const [models, setModels] = useState(llmModels);


  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-blue-950 to-indigo-900 text-white" : "bg-white text-black"}`}>
        <AppHeader isDarkMode={darkMode} onThemeToggle={() => setDarkMode(val => !val)} />
         <NavSide />
        <Template type={templateType}>
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
                <ComparisonContainer/>
            </ViewContent>

              </div>
        </Template>


    </div>
  );
}