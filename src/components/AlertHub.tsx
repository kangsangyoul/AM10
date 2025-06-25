import { useEffect, useState } from "react";

const mockAlerts = [
  "⚠️ /v1/completions 오류율 급등",
  "🚨 Token abuse 탐지됨 (token-abc)",
  "⏱ 응답 지연 500ms 초과",
  "🛑 인증 실패 다중 시도 발생",
  "⚠️ /v1/infer 호출 spike 감지",
];

export default function AlertHub() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = [...mockAlerts]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 + Math.floor(Math.random() * 3));
      setAlerts(random);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
      <h2 className="text-sm text-gray-400 mb-2">🚨 실시간 경고 이벤트</h2>
      <div className="overflow-hidden whitespace-nowrap text-sm">
        <div className="inline-block animate-[ticker_15s_linear_infinite] text-red-400">
          {alerts.join(' / ')}
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
