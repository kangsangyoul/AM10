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
      <svg viewBox="0 0 600 120" className="w-full h-32 flex-1" style={{ color: lineColor(score) }}>
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
        </defs>
        <style>{`#path1,#path2{stroke-dasharray:6;animation:dash 1s linear infinite;}@keyframes dash{to{stroke-dashoffset:-12;}}`}</style>
        <circle cx="20" cy="60" r="8" fill="#54a7f8" filter="url(#glow)" />
        <path id="path1" d="M20 60 Q120 20 300 60" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
        <g filter="url(#glow)">
          <circle cx="300" cy="60" r="40" fill="#161c26" stroke="#34b4ff" strokeWidth="3" />
          {[...Array(6)].map((_,i)=>{
            const angle = (i/6)*Math.PI*2;
            const x = 300 + Math.cos(angle)*28;
            const y = 60 + Math.sin(angle)*28;
            return <circle key={i} cx={x} cy={y} r="4" fill="#34b4ff" />;
          })}
        </g>
        <path id="path2" d="M340 60 Q460 20 580 60" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
        <path id="path3" d="M340 60 Q460 100 580 60" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="580" y="55" textAnchor="end" fontSize="12" fill="#ffffffaa">Output</text>
      </svg>
      <div className="flex items-center gap-4">
        <RiskGauge score={score} />
        <Sparkline data={history} />
      </div>
    </div>
  );
};

export default InferenceFlow;
