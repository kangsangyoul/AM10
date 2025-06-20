
import React from 'react';

const stats = [
  { label: 'AI Models', value: 52 },
  { label: 'At Risk Models', value: 9, color: 'text-red-400' },
  { label: 'AI-Flagged Issues', value: 5478 },
  { label: 'Data Drift Detected', value: 21 },
];

const models = [
  { name: 'Model A', percent: '52.5%', status: 'Active', color: 'text-cyan-400' },
  { name: 'Model B', percent: '68%', status: 'AI Risk', color: 'text-yellow-400' },
  { name: 'Model C', percent: '74%', status: 'Drift', color: 'text-orange-400' },
  { name: 'Model D', percent: '58%', status: 'Aclotty', color: 'text-blue-400' },
  { name: 'Model E', percent: '55%', status: 'AI Atleutt', color: 'text-red-400' },
  { name: 'Model F', percent: '54%', status: 'High', color: 'text-red-500' },
];

const events = [
  { time: '14:03', model: 'Model A', event: 'High Drift', diagnosed: 'AI', status: '82%' },
  { time: '13:58', model: 'Model B', event: 'Anomalous Input', diagnosed: 'AI Autaltide', status: '83%' },
  { time: '19:58', model: 'Model D', event: 'Data Drift', diagnosed: 'AI Automatb', status: '84%' },
];

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
            <div className={`text-3xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
            <div className="text-sm text-gray-400 mt-2 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">AI Inference Flow</h2>
        <svg viewBox="0 0 600 100" className="w-full h-24">
          <circle cx="50" cy="50" r="10" fill="#14ffe9" />
          <line x1="60" y1="50" x2="200" y2="50" stroke="#14ffe9" strokeWidth="2" />
          <circle cx="210" cy="50" r="20" fill="#14ffe9" />
          <line x1="230" y1="50" x2="400" y2="30" stroke="#14ffe9" strokeWidth="2" />
          <line x1="230" y1="50" x2="400" y2="70" stroke="#14ffe9" strokeWidth="2" />
          <circle cx="400" cy="30" r="10" fill="#14ffe9" />
          <circle cx="400" cy="70" r="10" fill="#14ffe9" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((model, index) => (
          <div key={index} className="bg-[#1a1f29] rounded-xl p-4 shadow">
            <div className="text-sm text-gray-400 mt-2">{model.name}</div>
            <div className={`text-2xl font-bold ${model.color}`}>{model.percent}</div>
            <div className="text-xs mt-1">{model.status}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Event Log</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2 text-left">Time</th>
              <th className="py-2 text-left">Model</th>
              <th className="py-2 text-left">Event</th>
              <th className="py-2 text-left">Diagnosed By</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2">{e.time}</td>
                <td className="py-2">{e.model}</td>
                <td className="py-2">{e.event}</td>
                <td className="py-2">{e.diagnosed}</td>
                <td className="py-2">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
