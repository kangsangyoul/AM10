import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import AIModels from './components/AIModels';
import RiskInsights from './components/RiskInsights';
import AlertsPage from './components/AlertsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';

const App = () => {
  const [active, setActive] = useState('Dashboard');

  const renderPage = () => {
    switch (active) {
      case 'AI Models':
        return <AIModels />;
      case 'Risk Insights':
        return <RiskInsights />;
      case 'Alerts':
        return <AlertsPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#131926] text-white">
      <Sidebar activeItem={active} onSelect={setActive} />
      <div className="flex-1 flex flex-col items-center">
        <Topbar />
        <main className="p-6 overflow-y-auto w-full max-w-[1320px] mx-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
