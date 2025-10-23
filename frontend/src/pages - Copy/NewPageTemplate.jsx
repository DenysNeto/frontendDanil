import React, { useState } from "react";
import NavSide from "../components/UI/NavSide.jsx";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import AppHeader from "../components/UI/AppHeader.jsx";
import Card from "../components/ui/Card.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI/Template.jsx";
import ModelsC from "../components/Models/ModelsView.jsx";


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
                    title={'Select a Benchmark !'} 
                    subtitle={'choose one of the following'} 
                    desc={"Choose a baseline model to benchmark. We'll compare it against."} >
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