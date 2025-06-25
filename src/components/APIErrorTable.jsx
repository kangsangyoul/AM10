import React, { useEffect, useState } from 'react';

const initialRows = [
  { endpoint: '/v1/chat', errors: 12, last: 'just now' },
  { endpoint: '/v1/search', errors: 5, last: '1m ago' },
  { endpoint: '/v1/completions', errors: 3, last: '2m ago' },
];

const APIErrorTable = () => {
  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          errors: r.errors + Math.floor(Math.random() * 3),
          last: 'just now',
        }))
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">API Error Table</h2>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2 text-left">Endpoint</th>
            <th>Errors</th>
            <th>Last Error</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.endpoint} className="border-b border-gray-800">
              <td className="py-2">{r.endpoint}</td>
              <td>{r.errors}</td>
              <td>{r.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default APIErrorTable;
