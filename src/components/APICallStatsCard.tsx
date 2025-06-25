import { useEffect, useState } from "react";

interface Stats {
  total: number;
  errorRate: number;
  latency: number;
}

interface Updated {
  total: boolean;
  errorRate: boolean;
  latency: boolean;
}

export default function APICallStatsCard() {
  const [stats, setStats] = useState<Stats>({
    total: 5471,
    errorRate: 2.4,
    latency: 241,
  });
  const [updated, setUpdated] = useState<Updated>({
    total: false,
    errorRate: false,
    latency: false,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setStats(prev => {
        const next = {
          total: prev.total + Math.floor(Math.random() * 20),
          errorRate: parseFloat((Math.random() * 5).toFixed(1)),
          latency: Math.floor(200 + Math.random() * 100),
        };
        setUpdated({
          total: next.total !== prev.total,
          errorRate: next.errorRate !== prev.errorRate,
          latency: next.latency !== prev.latency,
        });
        setTimeout(
          () =>
            setUpdated({ total: false, errorRate: false, latency: false }),
          500
        );
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">📊 총 호출 수</h2>
        <p
          className={`text-2xl font-bold transition duration-300 ${
            updated.total ? 'text-red-400 font-bold' : 'text-white'
          }`}
        >
          {stats.total}
        </p>
      </div>
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">⚠️ 오류율</h2>
        <p
          className={`text-2xl font-bold transition duration-300 ${
            updated.errorRate ? 'text-red-400 font-bold' : 'text-white'
          }`}
        >
          {stats.errorRate}%
        </p>
      </div>
      <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
        <h2 className="text-sm text-gray-400">⏱ 평균 응답시간</h2>
        <p
          className={`text-2xl font-bold transition duration-300 ${
            updated.latency ? 'text-red-400 font-bold' : 'text-white'
          }`}
        >
          {stats.latency}ms
        </p>
      </div>
    </div>
  );
}
