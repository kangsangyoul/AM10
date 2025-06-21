import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';

const App = () => {
  const [active, setActive] = useState('Dashboard');
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  return (
    <div className="flex h-screen bg-[#0e1116] text-white">
      <Sidebar activeItem={active} onSelect={setActive} />
      <div className="flex-1 flex flex-col">
        <Topbar lastUpdate={lastUpdate} />
        <main className="p-6 overflow-y-auto">
          {active === 'Dashboard' ? (
            <Dashboard onUpdate={() => setLastUpdate(Date.now())} />
          ) : (
            <div className="p-6 text-gray-400">{active} page coming soon...</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
