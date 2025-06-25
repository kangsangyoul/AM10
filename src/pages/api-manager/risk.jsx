import React from 'react';
import APICallStatsCard from '../../components/APICallStatsCard';
import APIErrorTable from '../../components/APIErrorTable';

export default function APIRiskPage() {
  return (
    <div className="p-6 space-y-4 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold">API Risk</h1>
      <APICallStatsCard />
      <APIErrorTable />
    </div>
  );
}
