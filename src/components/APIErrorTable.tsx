import { useEffect, useState } from 'react';

interface Row {
  endpoint: string;
  code: number;
  count: number;
}

const endpoints = ['/v1/completions', '/v1/chat', '/v1/moderations', '/v1/images', '/v1/embeddings'];

export default function APIErrorTable() {
  const [rows, setRows] = useState<Row[]>([]);

  const refresh = () => {
    const n = 3 + Math.floor(Math.random() * 3); // 3 to 5 rows
    const data: Row[] = Array.from({ length: n }).map(() => ({
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      code: [500, 502, 404, 401, 429][Math.floor(Math.random() * 5)],
      count: Math.floor(Math.random() * 20) + 1,
    }));
    setRows(data);
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-left">
            <th className="py-2">Endpoint</th>
            <th>Status</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800">
              <td className="py-1 font-mono">{row.endpoint}</td>
              <td>{row.code}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
