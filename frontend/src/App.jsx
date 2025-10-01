import React, { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import BenchmarkPage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <main className="space-y-6">
            xxx
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/benchmark" element={<BenchmarkPage />} />
              <Route path="/config" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
