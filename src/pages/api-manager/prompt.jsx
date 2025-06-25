import React from 'react';
import PromptGuard from '../../components/PromptGuard';

export default function PromptRiskPage() {
  return (
    <div className="p-6 space-y-4 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Prompt Risk</h1>
      <PromptGuard />
    </div>
  );
}
