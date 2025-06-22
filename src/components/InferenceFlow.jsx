import React, { useState, useEffect } from 'react';
import RiskGauge from './RiskGauge';

const lineColor = (score) => {
  if (score > 80) return '#ff5a47';
  if (score > 50) return '#ffb534';
  return '#54a7f8';
};

const Sparkline = ({ data }) => {
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-16">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};

const InferenceFlow = () => {
  const [history, setHistory] = useState([50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((h) => {
        const next = Math.floor(Math.random() * 101);
        return [...h.slice(-19), next];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const score = history[history.length - 1];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <svg viewBox="0 0 600 140" className="w-full h-36 flex-1" style={{ color: lineColor(score) }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
          <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb534" />
            <stop offset="100%" stopColor="#ff5a47" />
          </linearGradient>
        </defs>
        <style>{`#path1,#path2,#path3{stroke-dasharray:8 8;animation:dash 1s linear infinite;}@keyframes dash{to{stroke-dashoffset:-16;}}`}</style>
        <circle cx="40" cy="70" r="13" fill="#54a7f8" filter="url(#glow)" />
        <text x="40" y="92" textAnchor="middle" fontSize="12" fill="#a2acc9">Input Data</text>
        <path id="path1" d="M53 70 Q150 30 300 70" fill="none" stroke="currentColor" strokeWidth="4" markerEnd="url(#arrow)" />
        <g filter="url(#glow)">
          <circle cx="320" cy="70" r="34" fill="#161c26" stroke="#34b4ff" strokeWidth="4" />
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
        <text x="320" y="66" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">AI Model</text>
        <text x="320" y="88" textAnchor="middle" fontSize="20" fontWeight="bold" fill="url(#riskGrad)" style={{transition:'0.5s'}}>{score}</text>
        <path id="path2" d="M354 70 Q450 10 560 70" fill="none" stroke="currentColor" strokeWidth="4" markerEnd="url(#arrow)" />
        <path id="path3" d="M354 70 Q450 130 560 70" fill="none" stroke="currentColor" strokeWidth="4" markerEnd="url(#arrow)" />
        <circle cx="575" cy="60" r="11" fill="#54a7f8" filter="url(#glow)" />
        <circle cx="575" cy="80" r="11" fill="#54a7f8" filter="url(#glow)" />
        <text x="575" y="105" textAnchor="middle" fontSize="12" fill="#a2acc9">Output</text>
      </svg>
      <div className="flex items-center gap-4">
        <RiskGauge score={score} />
        <Sparkline data={history} />
      </div>
    </div>
  );
};

export default InferenceFlow;
