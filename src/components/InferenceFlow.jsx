import React, { useState, useEffect } from 'react';
import RiskGauge from './RiskGauge';

const getColor = (score) => {
  if (score > 80) return 'stroke-red-500';
  if (score > 50) return 'stroke-yellow-400';
  return 'stroke-blue-400';
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
      <svg viewBox="0 0 600 80" className={`w-full h-20 flex-1 ${getColor(score)}`}>
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <style>{`#path1,#path2{stroke-dasharray:4;animation:dash 1s linear infinite;}@keyframes dash{to{stroke-dashoffset:-16;}}`}</style>
        <rect x="10" y="25" width="80" height="30" rx="6" fill="currentColor" />
        <text x="50" y="45" textAnchor="middle" fill="#0e1116" fontSize="12" fontWeight="bold">Input</text>
        <line id="path1" x1="90" y1="40" x2="250" y2="40" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <circle cx="300" cy="40" r="20" fill="currentColor" />
        <text x="300" y="45" textAnchor="middle" fill="#0e1116" fontSize="12" fontWeight="bold">AI</text>
        <line id="path2" x1="320" y1="40" x2="460" y2="40" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <rect x="460" y="25" width="80" height="30" rx="6" fill="currentColor" />
        <text x="500" y="45" textAnchor="middle" fill="#0e1116" fontSize="12" fontWeight="bold">Output</text>
      </svg>
      <div className="flex items-center gap-4">
        <RiskGauge score={score} />
        <Sparkline data={history} />
      </div>
    </div>
  );
};

export default InferenceFlow;
