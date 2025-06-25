import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import ArmOverview from '../pages/arm';
import ApiRisk from '../pages/arm/api';
import TrafficPage from '../pages/arm/traffic';
import PromptRisk from '../pages/arm/prompt';
import ModelRisk from '../pages/arm/model';
import SecurityPage from '../pages/arm/security';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className="flex h-screen bg-[#0e1116] text-white">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar />
      <main className="p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/arm" element={<ArmOverview />} />
          <Route path="/arm/api" element={<ApiRisk />} />
          <Route path="/arm/traffic" element={<TrafficPage />} />
          <Route path="/arm/prompt" element={<PromptRisk />} />
          <Route path="/arm/model" element={<ModelRisk />} />
          <Route path="/arm/security" element={<SecurityPage />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default App;
