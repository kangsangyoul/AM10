import { useEffect, useState } from 'react';

export default function TrafficGuard() {
  const [status, setStatus] = useState({ limit: 1000, current: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setStatus({ limit: 1000, current: Math.floor(Math.random() * 1000) });
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#171f2e] p-4 rounded-lg">
      <div className="font-semibold mb-2">Traffic Guard</div>
      <div>Limit: {status.limit} req/min</div>
      <div>Current: {status.current} req/min</div>
    </div>
  );
}
