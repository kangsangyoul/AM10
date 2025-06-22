
import React, { useState, useEffect } from 'react';
import InferenceFlow from './InferenceFlow';
import ModelStatus from './ModelStatus';
import Heatmap from './Heatmap';

const initialStats = [
  { label: 'AI Models', value: 52, color: '#ffffff' },
  { label: 'At Risk Models', value: 9, color: '#ff5a47' },
  { label: 'AI-Flagged Issues', value: 5478, color: '#ffffff' },
];


const initialEvents = [
  { time: '10:12 AM', model: 'Fraud Detector', event: 'Drift Detected', diagnosed: 'System Monitor', status: '91%' },
  { time: '9:05 AM', model: 'Recommendation', event: 'Spike in Traffic', diagnosed: 'Auto Audit', status: '87%' },
  { time: '8:43 AM', model: 'Language Model', event: 'High Risk', diagnosed: 'Human Analyst', status: '89%' },
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
        const models = ['Fraud Detector', 'Recommendation', 'Language Model'];
        const events = ['Automated Check', 'Data Drift', 'Spike'];
        const diagnosers = ['System Monitor', 'Auto Audit', 'Human Analyst'];
        const newEvent = {
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          model: models[Math.floor(Math.random() * models.length)],
          event: events[Math.floor(Math.random() * events.length)],
          diagnosed: diagnosers[Math.floor(Math.random() * diagnosers.length)],
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
            className="bg-[#171f2e] rounded-xl p-6 flex flex-col justify-between"
            style={{ width: 210, height: 90, boxShadow: '0 2px 16px rgba(22,28,38,0.4)' }}
          >
            <div className="text-[2.4rem] font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: '#a2acc9' }}>
              {stat.label}
            </div>
          </div>
        ))}
        <div
          className="bg-[#171f2e] rounded-xl p-4 flex flex-col items-center justify-center"
          style={{ width: 210, boxShadow: '0 2px 16px rgba(22,28,38,0.4)' }}
        >
          <h2 className="text-sm font-semibold mb-2">Risk Heatmap</h2>
          <Heatmap />
        </div>
      </div>

      <div className="bg-[#171f2e] rounded-xl p-6" style={{ boxShadow: '0 2px 16px rgba(22,28,38,0.4)' }}>
        <h2 className="text-xl font-semibold mb-4">AI Inference Flow</h2>
        <InferenceFlow />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Model Status</h2>
        <ModelStatus />
      </div>

      <div className="bg-[#171f2e] rounded-xl p-6" style={{ boxShadow: '0 2px 16px rgba(22,28,38,0.4)' }}>
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
                className={`border-b border-gray-800 transition-colors hover:bg-[#1e2536] ${index === 0 && rowPulse ? 'bg-[#1e2536]' : ''}`}
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
