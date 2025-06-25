import React, { useEffect, useState } from 'react';

export default function TokenAbuseTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      const sample = Array.from({ length: 3 }, () => ({
        token: 'tok-' + Math.floor(Math.random() * 100),
        count: Math.floor(Math.random() * 20),
      }));
      setLogs(sample);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="w-full text-sm bg-slate-900 rounded">
      <thead>
        <tr className="text-left">
          <th className="px-2 py-1">Token</th>
          <th className="px-2 py-1">Abuse Count</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l, i) => (
          <tr key={i} className="border-t border-slate-800">
            <td className="px-2 py-1">{l.token}</td>
            <td className="px-2 py-1">{l.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
