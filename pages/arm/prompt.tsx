import React from 'react';
import PromptMonitor from '../../src/components/PromptMonitor';

const PromptRisk: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">\uD83D\uDCDD Prompt Risk</h1>
    <PromptMonitor />
  </div>
);

export default PromptRisk;
