import React, { useState, useEffect } from 'react';

const InferenceFlow = () => {
  const [score, setScore] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.floor(Math.random() * 101));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 600 140" width="100%" height="140" style={{ display: 'block' }}>
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb534" />
            <stop offset="100%" stopColor="#ff5a47" />
          </linearGradient>
        </defs>
        <style>{`#path1,#path2,#path3{stroke-dasharray:8 8;animation:dash 1s linear infinite;}@keyframes dash{to{stroke-dashoffset:-16;}}@keyframes pulse{0%{transform:scale(1);box-shadow:0 0 24px #34b4ff;}50%{transform:scale(1.05);box-shadow:0 0 48px #34b4ffcc;}100%{transform:scale(1);box-shadow:0 0 24px #34b4ff;}}.ai-core{animation:pulse 0.8s infinite;}`}</style>
        <circle cx="40" cy="70" r="13" fill="#54a7f8" filter="url(#glow)" />
        <text
          x="40"
          y="102"
          textAnchor="middle"
          style={{ fontSize: '0.92rem', fontWeight: 'bold', fill: '#a2acc9', fontFamily: 'Pretendard, sans-serif' }}
        >
          Input Data
        </text>
        <path
          id="path1"
          d="M53 70 Q150 30 300 70"
          fill="none"
          stroke="#54a7f8"
          strokeWidth="4"
        />
        <path
          d="M53 70 Q150 30 300 70"
          fill="none"
          stroke="#54a7f8"
          strokeWidth="14"
          opacity="0.22"
          style={{ filter: 'blur(5px)' }}
        />
        <g style={{ filter: 'drop-shadow(0 0 24px rgba(52,180,255,0.4))' }}>
          <circle
            className="ai-core"
            cx="320"
            cy="70"
            r="34"
            fill="#161c26"
            stroke="#34b4ff"
            strokeWidth="4"
          />
          {[...Array(6)].map((_,i)=>{
            const angle = (i/6)*Math.PI*2;
            const x = 320 + Math.cos(angle)*45;
            const y = 70 + Math.sin(angle)*45;
            return (
              <g key={i}>
                <line x1="320" y1="70" x2={x} y2={y} stroke="#54a7f8" strokeWidth="2" strokeOpacity="0.7" />
                <circle cx={x} cy={y} r="7" fill="#54a7f8" />
              </g>
            );
          })}
        </g>
        <text
          x="320"
          y="70"
          textAnchor="middle"
          style={{ fontSize: '1.02rem', fontWeight: 'bold', fill: '#fff', fontFamily: 'Pretendard, sans-serif' }}
        >
          AI Model
        </text>
        <text
          x="320"
          y="108"
          textAnchor="middle"
          style={{ fontSize: '2rem', fontWeight: 'bold', fill: 'url(#riskGrad)', fontFamily: 'Pretendard, sans-serif', transition: '0.5s' }}
        >
          {score}
        </text>
        <path id="path2" d="M354 70 Q450 10 560 70" fill="none" stroke="#4dd9ff" strokeWidth="4" />
        <path d="M354 70 Q450 10 560 70" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <path id="path3" d="M354 70 Q450 130 560 70" fill="none" stroke="#4dd9ff" strokeWidth="4" />
        <path d="M354 70 Q450 130 560 70" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <circle cx="575" cy="60" r="11" fill="#54a7f8" filter="url(#glow)" />
        <circle cx="575" cy="80" r="11" fill="#54a7f8" filter="url(#glow)" />
        <text
          x="575"
          y="102"
          textAnchor="middle"
          style={{ fontSize: '0.92rem', fontWeight: 'bold', fill: '#a2acc9', fontFamily: 'Pretendard, sans-serif' }}
        >
          Output
        </text>
      </svg>
    </div>
  );
};

export default InferenceFlow;
