import { useEffect, useState } from 'react';

interface Row {
  event: string;
  target: string;
  time: string;
  result: string;
}

const initialData: Row[] = [
  { event: '인증 실패', target: 'token-xyz', time: '13:24:01', result: '경고' },
  { event: 'API 우회 시도', target: 'IP 203.0.113.5', time: '13:24:05', result: '차단됨' },
];

export default function SecurityLogTable() {
  const [rows, setRows] = useState<Row[]>(initialData);

  useEffect(() => {
    const events = ['인증 실패', 'API 우회 시도', '의심스러운 요청'];
    const results = ['무시됨', '경고', '차단됨'];
    const id = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setRows(
        Array.from({ length: 2 }, () => ({
          event: events[Math.floor(Math.random() * events.length)],
          target: Math.random() > 0.5 ? `token-${Math.floor(Math.random() * 100)}` : `IP ${[192,168,1,Math.floor(Math.random()*255)].join('.')}`,
          time: now,
          result: results[Math.floor(Math.random() * results.length)],
        }))
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const resultColor = (r: string) => {
    if (r === '차단됨') return 'text-red-400';
    if (r === '경고') return 'text-yellow-400';
    return '';
  };

  return (
    <table className="table-auto w-full border border-slate-700 text-sm">
      <thead>
        <tr className="bg-slate-800">
          <th className="border px-2 py-1">이벤트 유형</th>
          <th className="border px-2 py-1">대상</th>
          <th className="border px-2 py-1">시간</th>
          <th className="border px-2 py-1">결과</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-slate-800 text-center">
            <td className="border px-2 py-1 text-left">{row.event}</td>
            <td className="border px-2 py-1">{row.target}</td>
            <td className="border px-2 py-1">{row.time}</td>
            <td className={`border px-2 py-1 ${resultColor(row.result)}`}>{row.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
