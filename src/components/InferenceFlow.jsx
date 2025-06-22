import React, { useState, useEffect } from 'react';

const nodeNames = [
  'Fraud Detector',
  'Recommendation',
  'Anomaly Watch',
  'Language Model',
  'Vision Classifier',
  'Forecast Engine',
];

const genNodes = () =>
  nodeNames.map((name) => {
    const value = Math.floor(Math.random() * 101);
    return {
      name,
      value,
      state: value > 80 ? 'High' : value > 50 ? 'Moderate' : 'Safe',
      updated: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
  });

const InferenceFlow = () => {
  const [score, setScore] = useState(50);
  const [nodes, setNodes] = useState(genNodes());
  const [inputFlow, setInputFlow] = useState(500);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.floor(Math.random() * 101));
      setInputFlow(Math.floor(Math.random() * 1000));
      setNodes(genNodes());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const center = { x: 320, y: 70 };
  const nodeRadius = 40;

  const coords = (i) => {
    const step = (2 * Math.PI) / nodeNames.length;
    const angle = i * step;
    return {
      x: center.x + Math.cos(angle) * nodeRadius,
      y: center.y + Math.sin(angle) * nodeRadius,
    };
  };

  return (
    <div className="flex flex-col items-center font-[Pretendard,sans-serif]">
      <svg viewBox="0 0 700 140" width="100%" height="140" style={{ display: 'block' }}>
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
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
        <style>{`#path1,#path2,#path3,#path4{stroke-dasharray:12 8;animation:dash 0.8s linear infinite;}@keyframes dash{to{stroke-dashoffset:-32;}}@keyframes pulse{0%{transform:scale(1);box-shadow:0 0 24px #34b4ff;}50%{transform:scale(1.1);box-shadow:0 0 48px #34b4ffcc;}100%{transform:scale(1);box-shadow:0 0 24px #34b4ff;}}.ai-core{animation:pulse 0.8s infinite;}@keyframes nodeBlink{0%{opacity:0.6;}50%{opacity:1;}100%{opacity:0.6;}}.node{animation:nodeBlink 1.2s infinite;}`}</style>
        <circle cx="40" cy="70" r="8" fill="#54a7f8" filter="url(#glow)" />
        <text
          x="40"
          y="30"
          textAnchor="middle"
          style={{ fontSize: '0.75rem', fill: '#a2acc9', fontFamily: 'Pretendard, sans-serif' }}
        >
          Flow: {inputFlow}r/s
        </text>
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
          d="M20 50 Q120 20 300 50"
          fill="none"
          stroke="#54a7f8"
          strokeWidth="4"
        />
        <path
          d="M20 50 Q120 20 300 50"
          fill="none"
          stroke="#54a7f8"
          strokeWidth="14"
          opacity="0.22"
          style={{ filter: 'blur(5px)' }}
        />
        <g style={{ filter: 'drop-shadow(0 0 32px rgba(52,180,255,0.4))' }}>
          <circle
            className="ai-core"
            cx="320"
            cy="70"
            r="50"
            fill="none"
            stroke="#34b4ff"
            strokeWidth="8"
            opacity="0.5"
          />
          <circle
            cx="320"
            cy="70"
            r="34"
            fill="#161c26"
            stroke="#34b4ff"
            strokeWidth="4"
          />
          {nodes.map((node, i) => {
            const { x, y } = coords(i);
            return (
              <g key={node.name}>
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={x}
                  y2={y}
                  stroke="#54a7f8"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
                <circle
                  className="node"
                  cx={x}
                  cy={y}
                  r="7"
                  fill="#54a7f8"
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.18)';
                    e.currentTarget.style.outline = '#54a7f8 solid 2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.outline = 'none';
                  }}
                  onClick={() => setSelected(node)}
                />
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
          y="100"
          textAnchor="middle"
          style={{ fontSize: '2rem', fontWeight: 'bold', fill: 'url(#riskGrad)', fontFamily: 'Pretendard, sans-serif', transition: '0.5s' }}
        >
          {score}%
        </text>
        <text
          x="320"
          y="118"
          textAnchor="middle"
          style={{ fontSize: '1rem', fill: '#fff', fontWeight: 600 }}
        >
          Risk Score
        </text>
        <path id="path2" d="M350 70 Q480 10 660 40" fill="none" stroke="#4dd9ff" strokeWidth="4" />
        <path d="M350 70 Q480 10 660 40" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <path id="path3" d="M350 70 Q480 70 660 70" fill="none" stroke="#4dd9ff" strokeWidth="4" />
        <path d="M350 70 Q480 70 660 70" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <path id="path4" d="M350 70 Q480 130 660 100" fill="none" stroke="#4dd9ff" strokeWidth="4" />
        <path d="M350 70 Q480 130 660 100" fill="none" stroke="#4dd9ff" strokeWidth="10" opacity="0.4" filter="url(#glow)" />
        <circle cx="660" cy="40" r="9" fill="#54a7f8" filter="url(#glow)" />
        <circle cx="660" cy="70" r="9" fill="#54a7f8" filter="url(#glow)" />
        <circle cx="660" cy="100" r="9" fill="#54a7f8" filter="url(#glow)" />
        <text
          x="660"
          y="124"
          textAnchor="middle"
          style={{ fontSize: '0.92rem', fontWeight: 'bold', fill: '#a2acc9', fontFamily: 'Pretendard, sans-serif' }}
        >
          Output
        </text>
      </svg>
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="bg-[#171f2e] rounded-xl p-6" style={{ minWidth: 220 }}>
            <h3 className="text-lg font-semibold mb-2">{selected.name}</h3>
            <p>Value: {selected.value}</p>
            <p>Status: {selected.state}</p>
            <p>Updated: {selected.updated}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InferenceFlow;
