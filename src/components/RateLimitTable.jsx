import React, { useEffect, useState } from 'react';

const tokens = ['tokenA', 'tokenB', 'tokenC'];

export default function RateLimitTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const gen = () => {
      setData(tokens.map(t => ({
        name: t,
        count: Math.floor(Math.random()*100),
        blocked: Math.random() < 0.1,
      })));
    };
    gen();
    const id = setInterval(gen, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="w-full text-sm bg-slate-900 rounded">
      <thead>
        <tr className="text-left">
          <th className="px-2 py-1">Token</th>
          <th className="px-2 py-1">Requests</th>
          <th className="px-2 py-1">Blocked</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r => (
          <tr key={r.name} className="border-t border-slate-800">
            <td className="px-2 py-1">{r.name}</td>
            <td className="px-2 py-1">{r.count}</td>
            <td className="px-2 py-1">{r.blocked ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
