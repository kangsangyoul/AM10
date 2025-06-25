import React, { useEffect, useState } from 'react';

export default function PromptGuard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setLogs(l => [`Injection attempt ${Date.now()}`, ...l].slice(0, 5));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded space-y-1 text-sm">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}
