import { useEffect, useState } from 'react';

export default function EventHeatmapGrid() {
  const [cells, setCells] = useState<boolean[]>(Array(100).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      const active = Array(100).fill(false);
      for (let i = 0; i < 20; i++) {
        active[Math.floor(Math.random() * 100)] = true;
      }
      setCells(active);
      setTimeout(() => setCells(Array(100).fill(false)), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow">
      <h2 className="text-sm text-gray-400 mb-2">실시간 호출 히트맵</h2>
      <div className="grid grid-cols-10 gap-1">
        {cells.map((active, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded ${active ? 'bg-green-500' : 'bg-slate-800'}`}
          />
        ))}
      </div>
    </div>
  );
}
