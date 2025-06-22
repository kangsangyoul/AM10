
import React, { useState, useEffect } from 'react';
import InferenceFlow from './InferenceFlow';
import ModelStatus from './ModelStatus';
import Heatmap from './Heatmap';

const initialStats = [
  { label: 'AI Models', value: 52 },
  { label: 'At Risk Models', value: 9 },
  { label: 'Data Drift Detected', value: 21 },
];


const initialEvents = [
  { time: '2:03 PM', model: 'Fraud Detector', event: 'High Drift', diagnosed: 'System Monitor', status: '82%' },
  { time: '1:58 PM', model: 'Recommendation', event: 'Anomalous Input', diagnosed: 'Human Review', status: '83%' },
  { time: '9:58 AM', model: 'Language Model', event: 'Data Drift', diagnosed: 'System Monitor', status: '84%' },
];

const Dashboard = ({ onUpdate }) => {
  const [stats, setStats] = useState(initialStats);
  const [events, setEvents] = useState(initialEvents);
  const [rowPulse, setRowPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => ({
          ...s,
          value:
            typeof s.value === 'number'
              ? s.value + Math.round(Math.random() * 2 - 1)
              : s.value,
        }))
      );

      setEvents((prev) => {
        const newEvent = {
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          model: 'Fraud Detector',
          event: 'Automated Check',
          diagnosed: 'System',
          status: `${Math.floor(Math.random() * 10 + 90)}%`,
        };
        return [newEvent, ...prev.slice(0, 4)];
      });

      setRowPulse(true);
      setTimeout(() => setRowPulse(false), 500);
      onUpdate && onUpdate();
    }, 1000);
    return () => clearInterval(interval);
  }, [onUpdate]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#171f2e] rounded-xl p-6 shadow-lg"
          >
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
          </div>
        ))}
        <div className="bg-[#171f2e] rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold mb-2">Risk Heatmap</h2>
          <Heatmap />
        </div>
      </div>

      <div className="bg-[#171f2e] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">AI Inference Flow</h2>
        <InferenceFlow />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Model Status</h2>
        <ModelStatus />
      </div>

      <div className="bg-[#171f2e] rounded-xl p-6 shadow-lg">
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
              <tr
                key={index}
                className={`border-b border-gray-800 ${index === 0 && rowPulse ? 'bg-[#1e2536]' : ''}`}
              >
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
