import { useEffect, useState } from "react";

interface Stats {
  total: number;
  errorRate: number;
  latency: number;
}

export default function APICallStatsCard() {
  const [stats, setStats] = useState<Stats>({
    total: 5471,
    errorRate: 2.4,
    latency: 241,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setStats(prev => ({
        total: prev.total + Math.floor(Math.random() * 20),
        errorRate: parseFloat((Math.random() * 5).toFixed(1)),
        latency: Math.floor(200 + Math.random() * 100),
      }));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">📊 총 호출 수</h2>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">⚠️ 오류율</h2>
        <p className="text-2xl font-bold">{stats.errorRate}%</p>
      </div>
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">⏱ 평균 응답시간</h2>
        <p className="text-2xl font-bold">{stats.latency}ms</p>
      </div>
    </div>
  );
}
