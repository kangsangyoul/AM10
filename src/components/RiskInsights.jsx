import React, { useEffect, useState } from 'react';
import Heatmap from './Heatmap';

const generateData = () =>
  Array.from({ length: 20 }, () => 50 + Math.random() * 50);

const RiskInsights = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => [...d.slice(1), 50 + Math.random() * 50]);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const points = data.map((v, i) => `${i * 10},${100 - v}`).join(' ');

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Risk Insights</h2>
      <svg viewBox="0 0 200 100" className="w-full h-24" fill="none">
        <polyline
          points={points}
          stroke="#54a7f8"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <Heatmap />
    </div>
  );
};

export default RiskInsights;
