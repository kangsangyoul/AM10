import React, { useState, useEffect } from 'react';

const Topbar = ({ lastUpdate = Date.now() }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - lastUpdate) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 className="text-2xl font-semibold">AI Risk Management Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Updated {elapsed}s ago</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Topbar;
