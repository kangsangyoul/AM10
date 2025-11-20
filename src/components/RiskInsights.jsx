import React from 'react';

const insights = [
  { label: 'Data Drift Detected', value: 21, color: 'text-red-400' },
  { label: 'Model Accuracy', value: '92%', color: 'text-green-400' },
  { label: 'Open Alerts', value: 7, color: 'text-yellow-400' },
];

const RiskInsights = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {insights.map((ins, index) => (
      <div key={index} className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
        <div className={`text-3xl font-bold ${ins.color}`}>{ins.value}</div>
        <div className="text-sm text-gray-400 mt-1">{ins.label}</div>
      </div>
    ))}
  </div>
);

export default RiskInsights;
