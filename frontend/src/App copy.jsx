import React, {useEffect, useState} from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import BenchmarkPage from "./pages/OptimizationTypeSelectPage.jsx";
import { Routes, Route } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import { SettingsProvider } from "./contexts/SettingsContext";
import Card from "./components/ui/Card.jsx";
import {llmModels} from "./mocks/modelsList.js";
import Sidebar from "./components/ui/Sidebar.jsx";
import Header from "./components/ui/Header.jsx";
import BenchmarkResults from "./pages/BenchmarkResults.jsx";
import AppHeader from "./components/ui/AppHeader.jsx";
import OptimizationTypeSelectPage from "./pages/OptimizationTypeSelectPage.jsx";
import ComparisonTypeSelectPage from "./pages/ComparisonTypeSelectPage.jsx";
import BenchmarkInputPage from "./pages/BenchmarkInputPage.jsx";
import ChatInputPage from "./pages/ChatInputPage.jsx";
import PromptResults from "./pages/PromptResults.jsx";
import NewPageTemplate from "./pages/NewPageTemplate.jsx";

function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [darkMode]);


  return (
      <SettingsProvider>
          <div className=" bg-gray-100 overflow-y-hidden dark:bg-gray-900 flex flex-col   justify-start gap-6 h-[100vh] ">
              <AppHeader isDarkMode={darkMode} onThemeToggle={()=>setDarkMode(val=>!val)}/>
              <main className="w-full">
                  <div className="flex flex-col h-[100vh] overflow-y-auto ">
                            <Routes>
                              <Route path="/" element={<HomePage />} />
                                <Route path="/optimization_type" element={<OptimizationTypeSelectPage />} />
                                <Route path="/comparison_type" element={<ComparisonTypeSelectPage />} />
                                <Route path="/benchmark_test" element={<ComparisonTypeSelectPage />} />
                                <Route path="/prompt_test" element={<ComparisonTypeSelectPage />} />
                                <Route path="/benchmark" element={<OptimizationTypeSelectPage />} />
                                
                                <Route path="/new_page" element={<NewPageTemplate />} /> 

                                <Route path="/prompt_input" element={<PromptResults />} />  
                                <Route path="/benchmark_input" element={<BenchmarkInputPage />} />
                                {/* <Route path="/prompt_input" element={<ChatInputPage />} /> */}
                            </Routes>
                  </div>
              </main>
          </div>

          {/*<div className="min-h-screen bg-gray-50 py-8">*/}
          {/*  <div className="max-w-7xl mx-auto px-4">*/}
          {/*    <main className="space-y-6">*/}
          {/*      xxx sss*/}
          {/*      <Routes>*/}
          {/*        <Route path="/" element={<HomePage />} />*/}
          {/*        <Route path="/benchmark" element={<BenchmarkPage />} />*/}
          {/*        <Route path="/config" element={<SettingsPage />} />*/}
          {/*      </Routes>*/}
          {/*    </main>*/}
          {/*  </div>*/}
          {/*</div>*/}
      </SettingsProvider>
  );
}

export default App;
