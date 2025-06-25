import { useEffect, useState } from 'react';

export default function APICallStatsCard() {
  const [stats, setStats] = useState({ calls: 0, errors: 0, latency: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setStats({
        calls: Math.floor(Math.random() * 10000),
        errors: (Math.random() * 5).toFixed(2),
        latency: Math.floor(Math.random() * 300),
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#171f2e] p-4 rounded-lg shadow">
      <div className="text-xl font-semibold mb-2">API Calls</div>
      <div className="space-x-4">
        <span>Total: {stats.calls}</span>
        <span>Error Rate: {stats.errors}%</span>
        <span>Avg Latency: {stats.latency}ms</span>
      </div>
    </div>
  );
}
