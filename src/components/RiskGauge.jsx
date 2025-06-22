import React, { useState, useEffect } from 'react';

const colorHex = (score) => {
  if (score > 80) return '#ff5a47';
  if (score > 50) return '#ffb534';
  return '#54a7f8';
};

const RiskGauge = ({ score: external }) => {
  const [score, setScore] = useState(external ?? 0);

  useEffect(() => {
    if (external === undefined) {
      const interval = setInterval(() => {
        setScore(Math.floor(Math.random() * 101));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [external]);

  useEffect(() => {
    if (external !== undefined) setScore(external);
  }, [external]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]" style={{ color: colorHex(score) }}>
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffb534" />
              <stop offset="100%" stopColor="#ff5a47" />
            </linearGradient>
          </defs>
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
            stroke={score > 80 ? 'url(#riskGrad)' : 'currentColor'}
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-xl font-bold"
          style={{ color: colorHex(score) }}
        >
          {score}%
        </div>
      </div>
      <span className="mt-2 font-medium" style={{ color: colorHex(score) }}>
        Risk Score
      </span>
    </div>
  );
};

export default RiskGauge;
