import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import routes from './routes';

const App = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  return (
    <Router>
      <div className="flex h-screen bg-[#0e1116] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar lastUpdate={lastUpdate} />
          <main className="p-6 overflow-y-auto">
            <Routes>
              {routes.map(({ path, element: Component, label }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    label === 'Dashboard' ? (
                      <Component onUpdate={() => setLastUpdate(Date.now())} />
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
