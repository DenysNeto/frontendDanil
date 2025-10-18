import React, {useEffect, useState} from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
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
import NotFound from "./pages/NotFound.jsx";
import NewHome from "./pages/NewHome.jsx";
import RouteSync from "./components/UI_new/RouteSync.jsx";
import ModelsPage from "./pages/ModelsPage.jsx"
import BenchmarkPage from "./pages/BenchmarkPage.jsx"
import ModelInfoPage from "./pages/ModelInfoPage.jsx"
import { useModelStore1 } from "./store/useModelStore1.ts";
import { useBenchmarkStore1 } from "./store/useBenchmarkStore1.js";
import ResultPage from "./pages/ResultPage.jsx"

function App() {

    useEffect(() => {
    (async () => {
        await useModelStore1.getState().updateModels();
        await useBenchmarkStore1.getState().loadFromUrl()
        console.log("MODELS", useModelStore1.getState().models);
        console.log("MODELS", useBenchmarkStore1.getState().benchmarks);
    })();
    }, []);



  return (
      <SettingsProvider>

              <main className="w-full">
                  <div>
                        <RouteSync />
                        <Routes>
                            <Route path="*" element={<NotFound />} />

                            <Route path="/" element={<NewHome />} />
                            <Route path="/optimization_type" element={<OptimizationTypeSelectPage />} />
                            <Route path="/comparison_type" element={<ComparisonTypeSelectPage />} />
                            <Route path="/benchmark_test" element={<ComparisonTypeSelectPage />} />
                            <Route path="/prompt_test" element={<ComparisonTypeSelectPage />} />
  
                            <Route path="/new_page" element={<NewPageTemplate />} /> 
                            
                            <Route path="/models" element={<ModelsPage />} /> 
                            <Route path="/models/*" element={<ModelInfoPage />} />

                            <Route path='/result/' element={<ResultPage/>} />

                            <Route path="/benchmark" element={<BenchmarkPage />} />

                            <Route path="/prompt_input" element={<PromptResults />} />  
                            <Route path="/benchmark_input" element={<BenchmarkInputPage />} />
                            {/* <Route path="/prompt_input" element={<ChatInputPage />} /> */}
                        </Routes>
                  </div>
              </main>

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
