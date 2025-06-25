import { useEffect, useState } from 'react';

export default function TokenAbuseTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setRows([
        { token: 'abc123', count: Math.floor(Math.random()*100) },
        { token: 'def456', count: Math.floor(Math.random()*100) },
      ]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <table className="w-full bg-[#171f2e] rounded-lg p-4">
      <thead><tr><th>Token</th><th>Calls</th></tr></thead>
      <tbody>
        {rows.map(r=>(
          <tr key={r.token} className="text-center"><td>{r.token}</td><td>{r.count}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
