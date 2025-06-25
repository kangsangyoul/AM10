import { useEffect, useState } from "react";

interface Row {
  token: string;
  ip: string;
  req: number;
  blocked: boolean;
}

export default function RateLimitTable() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const data: Row[] = Array.from({ length: 5 }, (_, i) => ({
        token: `token-${i + 1}`,
        ip: `192.168.0.${i + 1}`,
        req: Math.floor(Math.random() * 120),
        blocked: Math.random() > 0.7,
      }));
      setRows(data);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2 text-sm">요율 제한 현황</h2>
      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left p-2">Token</th>
            <th className="text-left p-2">IP</th>
            <th className="text-right p-2">현재 요청 수(req/min)</th>
            <th className="text-center p-2">제한 여부</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-slate-700">
              <td className="p-2">{row.token}</td>
              <td className="p-2">{row.ip}</td>
              <td className="p-2 text-right">{row.req}</td>
              <td className="p-2 text-center">{row.blocked ? "⛔" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
