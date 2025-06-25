import { useEffect, useState } from 'react';

export default function APIErrorTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setRows([
        { code: 500, count: Math.floor(Math.random() * 10) },
        { code: 404, count: Math.floor(Math.random() * 10) },
        { code: 401, count: Math.floor(Math.random() * 10) },
      ]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <table className="w-full bg-[#171f2e] rounded-lg p-4">
      <thead><tr><th>Code</th><th>Count</th></tr></thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.code} className="text-center">
            <td>{r.code}</td><td>{r.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
