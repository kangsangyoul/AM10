import React, { useEffect, useState } from 'react';
import APIWatcher from './APIWatcher';

export default function ARMPage() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRefresh((r) => r + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white space-y-6">
      <h1 className="text-3xl font-bold">🛡️ API Risk Manager</h1>
      <APIWatcher key={`api-${refresh}`} />
    </div>
  );
}
