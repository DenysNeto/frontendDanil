import React, {useEffect, useState} from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import NewPageTemplate from "./pages/NewHome.jsx"
import RouteSync from "./components/ui/RouteSync.jsx"
import ModelsPage from "./pages/ModelsPage.jsx"
import BenchmarkPage from "./pages/BenchmarkPage.jsx"
import ModelInfoPage from "./pages/ModelInfoPage.jsx"
import { useModelStore1 } from "./store/useModelStore1.ts";
import { useBenchmarkStore1 } from "./store/useBenchmarkStore1.js";
import ResultPage from "./pages/ResultPage.jsx"
import ModelBenchmarkPage from "./pages/ModelBenchmarkPage.jsx"
import ModelPromptPage from "./pages/ModelPromptPage.jsx"
import StreamDemoPage from "./pages/StreamDemoPage.jsx"
import NotFoundPage from "./pages/NotFound.jsx"
import AppFooter from "./components/ui/AppFooter.jsx";
import AppHeader from "./components/ui/AppHeader.jsx";
function App() {

    useEffect(() => {
    (async () => {
        await useModelStore1.getState().updateModels();
        await useBenchmarkStore1.getState().loadFromUrl()
        console.log("MODELS", useModelStore1.getState().models);
        console.log("MODELS", useBenchmarkStore1.getState().benchmarks);
    })();
    }, []);


 const { pathname } = useLocation();

  return (
      <SettingsProvider>
    <AppHeader/>
              <main className="w-full">
                  <div>
                        <RouteSync />
                        <Routes>
                            <Route path="/" element={<NewPageTemplate/>}/>  
                            <Route path="*" element={<NotFoundPage/>}/>

                            <Route path="/models" element={<ModelsPage />} /> 
                            <Route path="/models/*" element={<ModelInfoPage />} />
                            <Route path="/models/benchmark" element={<ModelBenchmarkPage />} />
                            <Route path="/models/prompt" element={<ModelPromptPage />} />
                            <Route path="/stream-demo" element={<StreamDemoPage />} />

                            {/* <Route path='/result/' element={<ResultPage/>} */}
                            <Route path="/benchmark" element={<BenchmarkPage />} />




                        </Routes>
                  </div>
              </main>
            <AppFooter isFull={pathname==="/" ? true : false}/>
      </SettingsProvider>
  );
}

export default App;
