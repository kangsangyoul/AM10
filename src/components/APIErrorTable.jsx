import React, { useEffect, useState } from 'react';

const codes = [400, 401, 403, 404, 500, 502, 503];

export default function APIErrorTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const gen = () => setRows(codes.map(c => ({ code: c, count: Math.floor(Math.random()*20) })));
    gen();
    const id = setInterval(gen, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="w-full text-sm bg-slate-900 rounded">
      <thead>
        <tr className="text-left">
          <th className="px-2 py-1">Status</th>
          <th className="px-2 py-1">Count</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.code} className="border-t border-slate-800">
            <td className="px-2 py-1">{r.code}</td>
            <td className="px-2 py-1">{r.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
