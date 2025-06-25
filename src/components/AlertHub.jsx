import React, { useEffect, useState } from 'react';

const samples = ['Spike detected', 'High latency', 'Unauthorized call'];

export default function AlertHub() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setAlerts(a => [samples[Math.floor(Math.random()*samples.length)], ...a].slice(0,3));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-3 rounded space-y-1 text-sm">
      {alerts.map((a,i) => <div key={i}>{a}</div>)}
    </div>
  );
}
