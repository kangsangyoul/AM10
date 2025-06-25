import React, { useEffect, useState } from 'react';

const severities = ['low', 'medium', 'high'];

const generateAlert = () => ({
  id: Date.now(),
  time: new Date().toLocaleTimeString(),
  message: 'Mock alert message',
  severity: severities[Math.floor(Math.random() * severities.length)],
});

const getColor = (sev) => {
  if (sev === 'high') return 'text-red-400';
  if (sev === 'medium') return 'text-yellow-400';
  return 'text-blue-400';
};

const AlertHub = () => {
  const [alerts, setAlerts] = useState([generateAlert()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => [generateAlert(), ...prev.slice(0, 4)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1f29] p-4 rounded-xl shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2">Alert Hub</h3>
      <ul className="space-y-1 text-sm">
        {alerts.map((a) => (
          <li key={a.id} className={getColor(a.severity)}>
            [{a.time}] {a.message} ({a.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertHub;
