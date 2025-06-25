import React, { useEffect, useState } from 'react';

const levels = [
  { label: 'info', className: 'text-green-400' },
  { label: 'warning', className: 'text-yellow-400' },
  { label: 'critical', className: 'text-red-400' },
];

const createAlert = () => {
  const level = levels[Math.floor(Math.random() * levels.length)];
  return {
    id: Date.now() + Math.random(),
    time: new Date().toLocaleTimeString(),
    level: level.label,
    className: level.className,
    message: `Mock alert ${Math.floor(Math.random() * 1000)}`,
  };
};

const AlertHub = () => {
  const [alerts, setAlerts] = useState(() => Array.from({ length: 3 }, createAlert));

  useEffect(() => {
    const id = setInterval(() => {
      setAlerts((prev) => [createAlert(), ...prev.slice(0, 9)]);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Alert Hub</h2>
      <ul className="space-y-1 text-sm">
        {alerts.map((a) => (
          <li key={a.id} className="flex justify-between border-b border-slate-700 py-1">
            <span>{a.time}</span>
            <span className={a.className}>{a.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertHub;
