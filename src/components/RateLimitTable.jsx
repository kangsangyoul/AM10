import React, { useEffect, useState } from 'react';

const initialRows = [
  { key: 'IP 10.0.0.1', remaining: 80 },
  { key: 'IP 10.0.0.2', remaining: 150 },
  { key: 'IP 10.0.0.3', remaining: 20 },
];

const RateLimitTable = () => {
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          remaining: Math.max(0, r.remaining - Math.floor(Math.random() * 5)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1f29] p-4 rounded-xl shadow-lg w-full mt-4">
      <h3 className="text-lg font-semibold mb-2">Rate Limit Status</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Key</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-gray-800">
              <td className="py-2">{r.key}</td>
              <td>{r.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RateLimitTable;
