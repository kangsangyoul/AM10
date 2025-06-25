import { useEffect, useState } from 'react';

interface Row {
  token: string;
  rpm: number;
  region: string;
  status: string;
}

const initialData: Row[] = [
  { token: 'abc-123', rpm: 120, region: 'KR', status: '정상' },
  { token: 'xzy-999', rpm: 500, region: 'RU', status: '의심됨' },
];

export default function TokenAbuseTable() {
  const [rows, setRows] = useState<Row[]>(initialData);

  useEffect(() => {
    const statuses = ['정상', '의심됨', '차단'];
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          rpm: Math.floor(Math.random() * 1000),
          status: statuses[Math.floor(Math.random() * statuses.length)],
        }))
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <table className="table-auto w-full border border-slate-700 text-sm">
      <thead>
        <tr className="bg-slate-800">
          <th className="border px-2 py-1">Token ID</th>
          <th className="border px-2 py-1">req/min</th>
          <th className="border px-2 py-1">Region</th>
          <th className="border px-2 py-1">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.token} className="text-center hover:bg-slate-800">
            <td className="border px-2 py-1">{r.token}</td>
            <td className="border px-2 py-1">{r.rpm}</td>
            <td className="border px-2 py-1">{r.region}</td>
            <td className={`border px-2 py-1 ${r.status === '정상' ? '' : 'text-red-400'}`}>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
