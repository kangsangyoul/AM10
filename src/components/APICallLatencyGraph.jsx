import React, { useEffect, useState } from 'react';

const generatePoint = () => 200 + Math.round(Math.random() * 200);

const APICallLatencyGraph = () => {
  const [points, setPoints] = useState(() => Array.from({ length: 10 }, generatePoint));

  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => [...prev.slice(1), generatePoint()]);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const height = 100;
  const max = Math.max(...points, 400);
  const barWidth = 30;

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">API Latency (ms)</h2>
      <svg viewBox={`0 0 ${points.length * barWidth} ${height}`} className="w-full h-24">
        {points.map((p, i) => (
          <rect
            key={i}
            x={i * barWidth}
            y={height - (p / max) * height}
            width={barWidth - 2}
            height={(p / max) * height}
            fill="#14ffe9"
          />
        ))}
      </svg>
    </div>
  );
};

export default APICallLatencyGraph;
