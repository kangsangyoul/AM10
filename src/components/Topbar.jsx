import React, { useState, useEffect } from 'react';

const Topbar = ({ lastUpdate }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const update = () => {
      setElapsed(Math.floor((Date.now() - lastUpdate) / 1000));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 className="text-2xl font-semibold">AI Risk Management Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 ml-5">Updated {elapsed}s ago</span>
        <button
          className="text-white text-sm font-medium rounded-[10px] px-[18px] py-2 shadow"
          style={{ background: '#3350a5', boxShadow: '0 2px 12px #18316c44' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#517ee7')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#3350a5')}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Topbar;
