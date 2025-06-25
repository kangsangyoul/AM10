import React, { useEffect, useState } from 'react';

export default function APICallStatsCard() {
  const [stats, setStats] = useState({ calls: 0, error: 0, latency: 0 });

  useEffect(() => {
    const gen = () =>
      setStats({
        calls: 5000 + Math.floor(Math.random() * 1000),
        error: (Math.random() * 5).toFixed(2),
        latency: (100 + Math.random() * 400).toFixed(0),
      });
    gen();
    const id = setInterval(gen, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 rounded p-4 shadow space-y-1 text-sm">
      <div>Calls: {stats.calls}</div>
      <div>Error Rate: {stats.error}%</div>
      <div>Avg Latency: {stats.latency}ms</div>
    </div>
  );
}
