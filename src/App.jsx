import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="flex h-screen bg-[#131926] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default App;
