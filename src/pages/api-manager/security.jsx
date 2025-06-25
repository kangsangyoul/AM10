import React from 'react';
import SecurityLogPanel from '../../components/SecurityLogPanel';

export default function SecurityWatchPage() {
  return (
    <div className="p-6 space-y-4 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Security Watch</h1>
      <SecurityLogPanel />
    </div>
  );
}
