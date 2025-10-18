import React, { useState } from "react";
import NavSide from "../components/UI_new/NavSide.jsx";
import ViewTitle from "../components/UI_new/ViewTitle";
import ViewContent from "../components/UI_new/ViewContent";
import AppHeader from "../components/UI_new/AppHeader";
import Card from "../components/ui/Card.jsx";
import {llmModels} from "../mocks/modelsList.js";
import Template from "../components/UI_new/Template.jsx";
import CardsBenchmark from "../components/UI_new/CardsBenchmark.jsx";

export default function BenchmarkPage() {
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
                    align={"left"}
                    title={'Select a Benchmark'} 
                    desc={"Choose a baseline model to benchmark. We’ll compare it against our optimized varient to show preformance improvements."} >
            </ViewTitle>
            </div>
            <ViewContent>
                <CardsBenchmark />
            </ViewContent>

              </div>
        </Template>


    </div>
  );
}