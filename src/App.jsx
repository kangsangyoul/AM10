import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import AiModels from './pages/AiModels';
import RiskInsights from './pages/RiskInsights';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-[#0e1116] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ai-models" element={<AiModels />} />
              <Route path="/risk-insights" element={<RiskInsights />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
