import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import APIMDashboard from './pages/api-manager';
import APIRiskPage from './pages/api-manager/risk';
import TrafficPage from './pages/api-manager/traffic';
import TokenAbusePage from './pages/api-manager/token';
import PromptRiskPage from './pages/api-manager/prompt';
import SecurityWatchPage from './pages/api-manager/security';

const App = () => {
  const [active, setActive] = useState('Dashboard');
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const renderContent = () => {
    switch (active) {
      case 'Dashboard':
        return <Dashboard onUpdate={() => setLastUpdate(Date.now())} />;
      case 'api-overview':
        return <APIMDashboard />;
      case 'api-risk':
        return <APIRiskPage />;
      case 'traffic-guard':
        return <TrafficPage />;
      case 'token-abuse':
        return <TokenAbusePage />;
      case 'prompt-risk':
        return <PromptRiskPage />;
      case 'security-watch':
        return <SecurityWatchPage />;
      default:
        return (
          <div className="p-6 text-gray-400">{active} page coming soon...</div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#0e1116] text-white">
      <Sidebar activeItem={active} onSelect={setActive} />
      <div className="flex-1 flex flex-col">
        <Topbar lastUpdate={lastUpdate} />
        <main className="p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
