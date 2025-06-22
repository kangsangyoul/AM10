import React, { useState, useEffect } from 'react';

const AlertsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        const models = ['Fraud Detector', 'Recommendation', 'Language Model'];
        const events = ['Anomaly', 'Drift', 'Spike'];
        const diagnosers = ['System', 'Auto Audit', 'Analyst'];
        const newEvent = {
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          model: models[Math.floor(Math.random() * models.length)],
          event: events[Math.floor(Math.random() * events.length)],
          diagnosed: diagnosers[Math.floor(Math.random() * diagnosers.length)],
        };
        return [newEvent, ...prev.slice(0, 9)];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Alerts</h2>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2 text-left">Time</th>
            <th className="py-2 text-left">Model</th>
            <th className="py-2 text-left">Event</th>
            <th className="py-2 text-left">Diagnosed By</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i} className="border-b border-gray-800 hover:bg-[#1e2536]">
              <td className="py-2">{e.time}</td>
              <td className="py-2">{e.model}</td>
              <td className="py-2">{e.event}</td>
              <td className="py-2">{e.diagnosed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsPage;
