import React, { useState } from 'react';
import './App.css';
import SingleExampleWorkflow from './components/SingleExampleWorkflow';
import BenchmarkWorkflow from './components/BenchmarkWorkflow';
import { Routes, Route } from "react-router-dom";
import SettingsPage from './components/SettingsPage';
import { SettingsProvider } from './contexts/SettingsContext';


function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Two Delta Demo
            </h1>
            <p className="text-gray-600">
              Select a model, enter your prompt, and get responses!!!
            </p>
          </header> */}

          <Routes>
            <Route path="/" element={<SingleExampleWorkflow/>} />
            <Route path="/benchmark" element={<BenchmarkWorkflow/>} />
            <Route path="/config" element={<SettingsPage/>} />
          </Routes>
          {/* <BenchmarkWorkflow/>   */}
          {/* <SingleExampleWorkflow/> */}
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;