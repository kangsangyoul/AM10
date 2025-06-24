
import React, { useState, useEffect } from 'react';
import RiskGauge from './RiskGauge';
import ModelStatus from './ModelStatus';
import Heatmap from './Heatmap';
import APIWatcher from './APIWatcher';
import ModelRisk from './ModelRisk';
import SecurityWatch from './SecurityWatch';
import CostMonitor from './CostMonitor';
import AlertHub from './AlertHub';

const initialStats = [
  { label: 'AI Models', value: 52 },
  { label: 'At Risk Models', value: 9, color: 'text-red-400' },
  { label: 'AI-Flagged Issues', value: 5478 },
  { label: 'Data Drift Detected', value: 21 },
];


const initialEvents = [
  { time: '14:03', model: 'Model A', event: 'High Drift', diagnosed: 'AI', status: '82%' },
  { time: '13:58', model: 'Model B', event: 'Anomalous Input', diagnosed: 'AI Autaltide', status: '83%' },
  { time: '19:58', model: 'Model D', event: 'Data Drift', diagnosed: 'AI Automatb', status: '84%' },
];

const Dashboard = ({ onUpdate }) => {
  const [stats, setStats] = useState(initialStats);
  const [events, setEvents] = useState(initialEvents);
  const [highlight, setHighlight] = useState(false);

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
          time: new Date().toLocaleTimeString().slice(0, 5),
          model: 'Model X',
          event: 'Automated Check',
          diagnosed: 'System',
          status: `${Math.floor(Math.random() * 10 + 90)}%`,
        };
        return [newEvent, ...prev.slice(0, 4)];
      });

      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);
      onUpdate && onUpdate();
    }, 1000);
    return () => clearInterval(interval);
  }, [onUpdate]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
            <div className={`text-3xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f29] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">AI Inference Flow</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <svg viewBox="0 0 600 100" className="w-full h-24 flex-1">
            <circle cx="50" cy="50" r="10" fill="#14ffe9" />
            <line x1="60" y1="50" x2="200" y2="50" stroke="#14ffe9" strokeWidth="2" />
            <circle
              cx="210"
              cy="50"
              r="20"
              fill="#14ffe9"
              className={highlight ? 'animate-ping' : ''}
            />
            <line x1="230" y1="50" x2="400" y2="30" stroke="#14ffe9" strokeWidth="2" />
            <line x1="230" y1="50" x2="400" y2="70" stroke="#14ffe9" strokeWidth="2" />
            <circle cx="400" cy="30" r="10" fill="#14ffe9" />
            <circle cx="400" cy="70" r="10" fill="#14ffe9" />
          </svg>
          <RiskGauge />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1f29] rounded-xl p-6 shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Risk Heatmap</h2>
          <Heatmap />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Model Status</h2>
          <ModelStatus />
        </div>
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

      <APIWatcher />
      <ModelRisk />
      <AlertHub />
      <SecurityWatch />
      <CostMonitor />
    </div>
  );
};

export default Dashboard;
