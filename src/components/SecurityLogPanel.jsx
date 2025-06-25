import React, { useEffect, useState } from 'react';

export default function SecurityLogPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setLogs(l => [`Failed login ${Date.now()}`, ...l].slice(0, 5));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded space-y-1 text-sm">
      {logs.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}
