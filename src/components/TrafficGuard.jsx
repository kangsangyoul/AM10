import React, { useEffect, useState } from 'react';

export default function TrafficGuard() {
  const [limit] = useState(1000);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setUsage(Math.floor(Math.random() * limit));
    }, 5000);
    return () => clearInterval(id);
  }, [limit]);

  return (
    <div className="bg-slate-900 p-4 rounded space-y-1 text-sm">
      <div>Rate Limit: {limit} rpm</div>
      <div>Current Usage: {usage}</div>
    </div>
  );
}
