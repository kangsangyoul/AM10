import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import ArmOverview from '../pages/arm';
import ApiRisk from '../pages/arm/api';
import TrafficPage from '../pages/arm/traffic';
import PromptRisk from '../pages/arm/prompt';
import ModelRisk from '../pages/arm/model';
import SecurityPage from '../pages/arm/security';

const App = () => {
  const [page, setPage] = useState('ARM Overview');

  const renderPage = () => {
    switch (page) {
      case 'API Risk':
        return <ApiRisk />;
      case 'Traffic Guard':
        return <TrafficPage />;
      case 'Prompt Risk':
        return <PromptRisk />;
      case 'Model Risk':
        return <ModelRisk />;
      case 'Security Watch':
        return <SecurityPage />;
      case 'ARM Overview':
        return <ArmOverview />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0e1116] text-white">
      <Sidebar activeItem={page} onSelect={setPage} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

export default App;
