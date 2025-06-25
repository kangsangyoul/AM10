import React from 'react';
import TokenAbuseTable from '../../components/TokenAbuseTable';

export default function TokenAbusePage() {
  return (
    <div className="p-6 space-y-4 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Token Abuse</h1>
      <TokenAbuseTable />
    </div>
  );
}
