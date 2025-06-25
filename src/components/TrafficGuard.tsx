import { useEffect, useState } from "react";

interface TrafficState {
  limit: number;
  current: number;
  blocked: number;
}

export default function TrafficGuard() {
  const [traffic, setTraffic] = useState<TrafficState>({
    limit: 100,
    current: 72,
    blocked: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic({
        limit: 100,
        current: Math.floor(Math.random() * 130),
        blocked: Math.floor(Math.random() * 5),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow">
      <h2 className="text-sm text-gray-400 mb-2">⚙️ Traffic Guard 상태</h2>
      <ul className="space-y-1 text-sm">
        <li>🌐 전체 호출 제한: {traffic.limit} req/min</li>
        <li className={traffic.current > traffic.limit ? "text-red-400" : ""}>
          📈 현재 요청 속도: {traffic.current} req/min
        </li>
        <li>⛔ 제한 중인 토큰 수: {traffic.blocked}건</li>
      </ul>
    </div>
  );
}
