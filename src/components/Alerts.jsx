import React from 'react';

const alerts = [
  { time: '14:03', model: 'Model A', message: 'High Drift' },
  { time: '13:58', model: 'Model B', message: 'Anomalous Input' },
  { time: '19:58', model: 'Model D', message: 'Data Drift' },
];

const Alerts = () => (
  <table className="w-full text-sm bg-[#1a1f29] rounded-xl shadow-lg">
    <thead className="text-gray-400 border-b border-gray-700">
      <tr>
        <th className="py-2 text-left px-4">Time</th>
        <th className="py-2 text-left px-4">Model</th>
        <th className="py-2 text-left px-4">Alert</th>
      </tr>
    </thead>
    <tbody>
      {alerts.map((a, idx) => (
        <tr key={idx} className="border-b border-gray-800">
          <td className="py-2 px-4">{a.time}</td>
          <td className="py-2 px-4">{a.model}</td>
          <td className="py-2 px-4">{a.message}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Alerts;
