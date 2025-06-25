import { useEffect, useState } from 'react';

export default function RateLimitTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setRows([
        { client: 'token1', count: Math.floor(Math.random()*50) },
        { client: 'token2', count: Math.floor(Math.random()*50) },
      ]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <table className="w-full bg-[#171f2e] rounded-lg p-4">
      <thead><tr><th>Client</th><th>Req/min</th></tr></thead>
      <tbody>
        {rows.map(r=>(
          <tr key={r.client} className="text-center"><td>{r.client}</td><td>{r.count}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
