import React from 'react';

const models = [
  { name: 'Model A', percent: '52.5%', status: 'Active', color: 'text-cyan-400' },
  { name: 'Model B', percent: '68%', status: 'AI Risk', color: 'text-yellow-400' },
  { name: 'Model C', percent: '74%', status: 'Drift', color: 'text-orange-400' },
  { name: 'Model D', percent: '58%', status: 'Aclotty', color: 'text-blue-400' },
  { name: 'Model E', percent: '55%', status: 'AI Atleutt', color: 'text-red-400' },
  { name: 'Model F', percent: '54%', status: 'High', color: 'text-red-500' },
];

const Models = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {models.map((model, index) => (
      <div key={index} className="bg-[#1a1f29] rounded-xl p-4 shadow">
        <div className="text-sm text-gray-400">{model.name}</div>
        <div className={`text-2xl font-bold ${model.color}`}>{model.percent}</div>
        <div className="text-xs mt-1">{model.status}</div>
      </div>
    ))}
  </div>
);

export default Models;
