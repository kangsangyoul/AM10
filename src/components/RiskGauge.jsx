import React, { useState, useEffect } from 'react';

const getColor = (score) => {
  if (score > 80) return 'text-red-500';
  if (score > 50) return 'text-yellow-400';
  return 'text-blue-400';
};

const RiskGauge = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.floor(Math.random() * 101));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#2d3748"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getColor(score)}`}
        >
          {score}%
        </div>
      </div>
      <span className={`mt-2 font-medium ${getColor(score)}`}>Risk Score</span>
    </div>
  );
};

export default RiskGauge;
