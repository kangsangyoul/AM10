import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Models from './components/Models';
import RiskInsights from './components/RiskInsights';
import Alerts from './components/Alerts';
import Reports from './components/Reports';
import Settings from './components/Settings';

const App = () => {
  const [active, setActive] = useState('Dashboard');
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const renderContent = () => {
    switch (active) {
      case 'Dashboard':
        return <Dashboard onUpdate={() => setLastUpdate(Date.now())} />;
      case 'AI Models':
        return <Models />;
      case 'Risk Insights':
        return <RiskInsights />;
      case 'Alerts':
        return <Alerts />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      default:
        return <div className="p-6 text-gray-400">{active}</div>;
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
