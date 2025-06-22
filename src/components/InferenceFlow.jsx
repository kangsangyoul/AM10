import React, { useState, useEffect } from 'react';
import RiskGauge from './RiskGauge';

const nodeNames = [
  'Fraud Detector',
  'Recommendation',
  'Anomaly Watch',
  'Language Model',
  'Vision Classifier',
  'Forecast Engine',
];

const genNodes = () =>
  nodeNames.map((name) => ({
    name,
    pulse: Math.random() * 0.5 + 0.8,
  }));

const InferenceFlow = () => {
  const [score, setScore] = useState(50);
  const [nodes, setNodes] = useState(genNodes());
  const [input, setInput] = useState(500);
  const [outputs, setOutputs] = useState({ alerts: 2, accuracy: 97 });

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.floor(Math.random() * 101));
      setNodes(genNodes());
      setInput(Math.floor(Math.random() * 1000));
      setOutputs({
        alerts: Math.floor(Math.random() * 5),
        accuracy: Math.floor(Math.random() * 21) + 80,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const center = { x: 320, y: 70 };
  const radius = 40;

  const coords = (i) => {
    const angle = (i / nodeNames.length) * 2 * Math.PI;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  };

  return (
    <div className="flex items-center font-[Pretendard,sans-serif]">
      <svg viewBox="0 0 700 140" width="100%" height="140" style={{ display: 'block' }}>
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#4dd9ff" />
          </marker>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb534" />
            <stop offset="100%" stopColor="#ff5a47" />
          </linearGradient>
          <style>{`
            .dash { stroke-dasharray: 8 8; animation: dash 1s linear infinite; }
            @keyframes dash { to { stroke-dashoffset: -16; } }
            @keyframes pulse {
              0% { transform: scale(1); filter: drop-shadow(0 0 24px #34b4ff); }
              50% { transform: scale(1.06); filter: drop-shadow(0 0 48px #34b4ffcc); }
              100% { transform: scale(1); filter: drop-shadow(0 0 24px #34b4ff); }
            }
            .node { animation: blink 1.2s infinite; }
            @keyframes blink { 0%{opacity:0.6;}50%{opacity:1;}100%{opacity:0.6;} }
          `}</style>
        </defs>
        <g className="text-[#a2acc9]" fontSize="0.75rem">
          <text x="40" y="30" textAnchor="middle">{input}r/s</text>
        </g>
        {/* Input icon */}
        <g filter="url(#glow)">
          <circle cx="40" cy="70" r="10" fill="#54a7f8" />
        </g>
        <text x="40" y="102" textAnchor="middle" style={{ fontSize: '0.92rem', fontWeight: 'bold', fill: '#a2acc9' }}>Input</text>
        {/* Input to AI path */}
        <path id="inPath" d="M55 70 Q160 40 320 70" fill="none" stroke="#54a7f8" strokeWidth="4" className="dash" markerEnd="url(#arrow)" />
        <path d="M55 70 Q160 40 320 70" fill="none" stroke="#54a7f8" strokeWidth="14" opacity="0.22" style={{ filter: 'blur(5px)' }} />
        {/* AI Core */}
        <g style={{ filter: 'drop-shadow(0 0 32px rgba(52,180,255,0.4))' }}>
          <circle cx={center.x} cy={center.y} r="34" fill="#161c26" stroke="#34b4ff" strokeWidth="4" />
          <circle className="ai" cx={center.x} cy={center.y} r="42" fill="none" stroke="#34b4ff" strokeWidth="8" opacity="0.5" style={{ animation: 'pulse 0.8s infinite' }} />
          {nodes.map((n, i) => {
            const { x, y } = coords(i);
            return (
              <g key={n.name}>
                <line x1={center.x} y1={center.y} x2={x} y2={y} stroke="#54a7f8" strokeWidth="2" strokeOpacity="0.7" />
                <circle className="node" cx={x} cy={y} r="6" fill="#54a7f8" style={{ transformOrigin: `${x}px ${y}px` }} />
              </g>
            );
          })}
          <text x={center.x} y={center.y + 4} textAnchor="middle" style={{ fontSize: '1rem', fontWeight: 'bold', fill: '#fff' }}>AI Model</text>
          <text x={center.x} y={center.y + 30} textAnchor="middle" style={{ fontSize: '2rem', fontWeight: 'bold', fill: 'url(#scoreGrad)', transition: '0.5s' }}>{score}%</text>
        </g>
        {/* AI to Output */}
        <path id="out1" d="M340 70 Q460 20 560 70" fill="none" stroke="#4dd9ff" strokeWidth="4" className="dash" markerEnd="url(#arrow)" />
        <path id="out2" d="M340 70 Q460 120 560 70" fill="none" stroke="#4dd9ff" strokeWidth="4" className="dash" markerEnd="url(#arrow)" />
        <path d="M340 70 Q460 20 560 70" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <path d="M340 70 Q460 120 560 70" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <g filter="url(#glow)">
          <circle cx="560" cy="70" r="10" fill="#54a7f8" />
        </g>
        <text x="560" y="102" textAnchor="middle" style={{ fontSize: '0.92rem', fontWeight: 'bold', fill: '#a2acc9' }}>Output</text>
      </svg>
      <div className="ml-4 flex flex-col items-center">
        <RiskGauge score={score} />
        <div className="text-sm mt-1 text-[#a2acc9]">
          Alerts: {outputs.alerts} | Accuracy: {outputs.accuracy}%
        </div>
      </div>
    </div>
  );
};

export default InferenceFlow;
