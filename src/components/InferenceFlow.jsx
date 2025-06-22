import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaStar, FaExclamationTriangle, FaBook, FaEye, FaChartLine } from 'react-icons/fa';
import FlowCurve from './FlowCurve';
import ModelIconWithLabel from './ModelIconWithLabel';
import RiskBadgeCard from './RiskBadgeCard';
import DangerScoreCard from './DangerScoreCard';

const models = [
  { key: 'fraud', label: 'Fraud', icon: FaShieldAlt },
  { key: 'reco', label: 'Reco', icon: FaStar },
  { key: 'anomaly', label: 'Anomaly', icon: FaExclamationTriangle },
  { key: 'lang', label: 'Lang', icon: FaBook },
  { key: 'vision', label: 'Vision', icon: FaEye },
  { key: 'forecast', label: 'Forecast', icon: FaChartLine },
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
      setScores(models.map(() => Math.floor(Math.random() * 101)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const maxIndex = scores.reduce((p, c, i) => (c > scores[p] ? i : p), 0);

  const positions = [20, 40, 60, 80, 100, 120];

  return (
    <div className="flex items-center justify-center font-[Pretendard,sans-serif] text-xs">
      <svg viewBox="0 0 600 140" width="100%" height="140" className="block">
        <defs>
          <linearGradient id="emerald" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#54e9f8" />
            <stop offset="100%" stopColor="#34b4ff" />
          </linearGradient>
          <linearGradient id="iconGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#54e9f8" />
            <stop offset="100%" stopColor="#395cd6" />
          </linearGradient>
          <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            .flow-curve { animation: flowDash 1.2s linear infinite; filter: drop-shadow(0 0 10px #54e9f8cc); }
            @keyframes flowDash { to { stroke-dashoffset: -23; } }
            .ai { transform-origin: center; animation: aiPulse 1.2s infinite; }
            @keyframes aiPulse { 0%{transform:scale(1);filter:drop-shadow(0 0 10px #54e9f8);}50%{transform:scale(1.5);filter:drop-shadow(0 0 24px #54e9f8);}100%{transform:scale(1);filter:drop-shadow(0 0 10px #54e9f8);} }
          `}</style>
        </defs>
        {/* Input lines */}
        {models.map((m, i) => (
          <FlowCurve key={`in-${m.key}`} d={`M 70,${positions[i]} Q 220,30 300,70`} />
        ))}
        {/* Output lines */}
        {models.map((m, i) => (
          <FlowCurve
            key={`out-${m.key}`}
            d={`M 320,70 Q 480,30 550,${positions[i]}`}
            color={colorFor(scores[i])}
          />
        ))}
        {/* Input icons */}
        {models.map((m, i) => (
          <ModelIconWithLabel key={`in-icon-${m.key}`} Icon={m.icon} label={m.label} x={50} y={positions[i]} />
        ))}
        {/* Output icons and badges */}
        {models.map((m, i) => (
          <g key={`out-icon-${m.key}`}> 
            <ModelIconWithLabel Icon={m.icon} label={m.label} x={570} y={positions[i]} />
            <RiskBadgeCard score={scores[i]} state={getState(scores[i])} x={590} y={positions[i]-16} highlight={i===maxIndex} />
          </g>
        ))}
        {/* Central network */}
        <g transform="translate(320,70)" className="ai">
          <circle cx="0" cy="0" r="3" fill="#54e9f8" />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * 2 * Math.PI;
            const x = Math.cos(angle) * 24;
            const y = Math.sin(angle) * 24;
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="#54e9f8" strokeWidth="2" />
                <circle cx={x} cy={y} r="4" fill="#54e9f8" />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="ml-4">
        <DangerScoreCard score={scores[maxIndex]} state={getState(scores[maxIndex])} />
      </div>
    </div>
  );
};

export default InferenceFlow;
