import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaStar, FaExclamationTriangle, FaBook, FaEye, FaChartLine } from 'react-icons/fa';

const models = [
  { key: 'fraud', name: 'Fraud', icon: FaShieldAlt },
  { key: 'recom', name: 'Reco', icon: FaStar },
  { key: 'anomaly', name: 'Anomaly', icon: FaExclamationTriangle },
  { key: 'lang', name: 'Lang', icon: FaBook },
  { key: 'vision', name: 'Vision', icon: FaEye },
  { key: 'forecast', name: 'Forecast', icon: FaChartLine },
];

const getState = (score) => {
  if (score >= 80) return 'DANGER';
  if (score >= 50) return 'SUSPECT';
  return 'NORMAL';
};

const colorFor = (score) => {
  if (score >= 80) return '#ff5a47';
  if (score >= 50) return '#ffb534';
  return '#54e9f8';
};

const InferenceFlow = () => {
  const [scores, setScores] = useState(models.map(() => 50));

  useEffect(() => {
    const id = setInterval(() => {
      setScores((prev) => prev.map(() => Math.floor(Math.random() * 101)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const highest = scores.reduce((p, c, i) => (c > scores[p] ? i : p), 0);

  const leftY = [20, 40, 60, 80, 100, 120];

  return (
    <div className="font-[Pretendard,sans-serif] text-xs flex justify-center">
      <svg viewBox="0 0 600 140" width="100%" height="140" className="block">
        <defs>
          <marker id="arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#54e9f8" />
          </marker>
          <linearGradient id="emerald" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#54e9f8" />
            <stop offset="100%" stopColor="#34b4ff" />
          </linearGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            .flow { stroke:url(#emerald); stroke-width:4; fill:none; stroke-dasharray:12 10; animation:flowDash 1.2s linear infinite; filter: drop-shadow(0 0 10px #54e9f8cc); }
            @keyframes flowDash { to { stroke-dashoffset: -22; } }
            @keyframes aiPulse { 0%{transform:scale(1);filter:drop-shadow(0 0 10px #54e9f8cc);}50%{transform:scale(1.5);filter:drop-shadow(0 0 24px #54e9f8);}100%{transform:scale(1);filter:drop-shadow(0 0 10px #54e9f8cc);} }
          `}</style>
        </defs>
        {/* Input lines */}
        {models.map((m, i) => {
          const y = leftY[i];
          return (
            <path key={`in-${m.key}`} d={`M 90,${y} Q 210,${y} 320,70`} className="flow" markerEnd="url(#arr)" />
          );
        })}
        {/* Output lines */}
        {models.map((m, i) => {
          const y = leftY[i];
          const color = colorFor(scores[i]);
          return (
            <path
              key={`out-${m.key}`}
              d={`M 320,70 Q 410,${y} 560,${y}`}
              className="flow"
              markerEnd="url(#arr)"
              stroke={color}
              style={{ filter: `drop-shadow(0 0 10px ${color})` }}
            />
          );
        })}
        {/* Input icons */}
        {models.map((m, i) => {
          const Icon = m.icon;
          const y = leftY[i];
          return (
            <g key={`in-icon-${m.key}`} transform={`translate(70,${y - 6})`} fill="#a2acc9">
              <circle cx="10" cy="6" r="10" fill="#54e9f8" filter="url(#glow)" />
              <Icon x="5" y="1" size={12} color="#131926" />
              <text x="10" y="24" textAnchor="middle">{m.name}</text>
            </g>
          );
        })}
        {/* Output icons and scores */}
        {models.map((m, i) => {
          const Icon = m.icon;
          const y = leftY[i];
          const score = scores[i];
          const state = getState(score);
          const color = colorFor(score);
          return (
            <g key={`out-icon-${m.key}`} transform={`translate(560,${y - 6})`} fill="#a2acc9">
              <circle cx="0" cy="6" r="10" fill="#54e9f8" filter="url(#glow)" />
              <Icon x="-5" y="1" size={12} color="#131926" />
              <text x="0" y="24" textAnchor="middle">{m.name}</text>
              <g transform="translate(20,-8)">
                <rect x="0" y="0" width="36" height="22" rx="7" fill="#232b3b" />
                <text x="18" y="10" textAnchor="middle" fill={color} fontWeight="bold" fontSize="0.8rem" dy="0.35em">
                  {score}
                </text>
                <text x="18" y="18" textAnchor="middle" fill="#a2acc9" fontSize="0.55rem">
                  {state}
                </text>
              </g>
            </g>
          );
        })}
        {/* Central AI network icon */}
        <g transform="translate(320,70)" className="aiPulse" style={{ transformOrigin: 'center' }}>
          {/* simple network icon */}
          <circle cx="0" cy="0" r="2" fill="#54e9f8" />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * 2 * Math.PI;
            const x = Math.cos(angle) * 14;
            const y = Math.sin(angle) * 14;
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="#54e9f8" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="3" fill="#54e9f8" />
              </g>
            );
          })}
        </g>
      </svg>
      {/* Danger card */}
      <div className="ml-4">
        <div className="bg-[#262e3e] rounded-lg p-2 text-center" style={{ width:72, height:48, boxShadow:'0 0 12px rgba(255,90,71,0.6)' }}>
          <div className="text-[2rem] font-bold" style={{ color: colorFor(scores[highest]) }}>
            {scores[highest]}
          </div>
          <div className="text-xs text-[#a2acc9] mt-[-4px]">{getState(scores[highest])}</div>
        </div>
      </div>
    </div>
  );
};

export default InferenceFlow;
