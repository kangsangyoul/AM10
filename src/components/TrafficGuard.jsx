import React, { useEffect, useState } from 'react';

const initialData = [
  { path: '/v1/completions', count: 1200, blocked: 12 },
  { path: '/v1/search', count: 860, blocked: 3 },
  { path: '/v1/chat', count: 450, blocked: 0 },
];

const TrafficGuard = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          count: d.count + Math.floor(Math.random() * 10),
          blocked: d.blocked + (Math.random() > 0.8 ? 1 : 0),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1f29] p-4 rounded-xl shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2">Traffic Guard</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Endpoint</th>
            <th>Requests</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.path} className="border-b border-gray-800">
              <td className="py-2">{d.path}</td>
              <td>{d.count}</td>
              <td>{d.blocked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficGuard;
