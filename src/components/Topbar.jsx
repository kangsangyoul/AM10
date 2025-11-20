import React, { useState, useEffect } from 'react';

const Topbar = ({ lastUpdate }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - lastUpdate;
      setElapsed(Math.round(diff / 100) / 10);
    };
    update();
    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 className="text-2xl font-semibold">AI Risk Management Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Updated {elapsed.toFixed(1)}s ago</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Topbar;
