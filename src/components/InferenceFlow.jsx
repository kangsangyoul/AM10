import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaStar, FaExclamationTriangle, FaBook, FaEye, FaChartLine } from 'react-icons/fa';
import FlowCurve from './FlowCurve';
import ModelIconWithLabel from './ModelIconWithLabel';
import RiskBadgeCard from './RiskBadgeCard';
import RiskGauge from './RiskGauge';

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
  if (score >= 80) return 'url(#danger)';
  if (score >= 50) return 'url(#warning)';
  return 'url(#emerald)';
};

const InferenceFlow = () => {
  const [scores, setScores] = useState(models.map(() => 50));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      const next = models.map(() => Math.floor(Math.random() * 101));
      setScores(next);
      const max = next.reduce((p, c, i) => (c > next[p] ? i : p), 0);
      setHistory((h) => [...h.slice(-29), next[max]]);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const maxIndex = scores.reduce((p, c, i) => (c > scores[p] ? i : p), 0);

  const centerY = 150;
  const iconStartY = 70;
  const iconSpacing = 40;
  const positions = models.map((_, i) => iconStartY + i * iconSpacing);

  return (
    <div className="flex items-center justify-center font-[Pretendard,sans-serif] text-xs">
      <svg viewBox="0 0 800 300" width="100%" height="300" className="block">
        <defs>
          <linearGradient id="emerald" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#54e9f8" />
            <stop offset="100%" stopColor="#34b4ff" />
          </linearGradient>
          <linearGradient id="warning" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb534" />
            <stop offset="100%" stopColor="#ffde3e" />
          </linearGradient>
          <linearGradient id="danger" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb534" />
            <stop offset="100%" stopColor="#ff5a47" />
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
            .ring-pulse { transform-box: fill-box; transform-origin: center; animation: ringPulse 1.2s infinite; }
            @keyframes ringPulse { 0%{transform:scale(1);opacity:0.6;}50%{transform:scale(1.25);opacity:0;}100%{transform:scale(1);opacity:0.6;} }
          `}</style>
        </defs>
        {/* Input lines */}
        {models.map((m, i) => {
          const y = positions[i];
          const inputPath = `M 132 ${y} Q 238 ${(y + centerY) / 2 - (2 - i) * 8} 366 ${centerY}`;
          return <FlowCurve key={`in-${m.key}`} d={inputPath} />;
        })}
        {/* Output lines */}
        {models.map((m, i) => {
          const y = positions[i];
          const outputPath = `M 434 ${centerY} Q 562 ${(y + centerY) / 2 + (i - 2) * 8} 690 ${y}`;
          return (
            <FlowCurve
              key={`out-${m.key}`}
              d={outputPath}
              color={colorFor(scores[i])}
              width={scores[i] >= 80 ? 5 : 3}
            />
          );
        })}
        {/* Input icons */}
        {models.map((m, i) => (
          <ModelIconWithLabel
            key={`in-icon-${m.key}`}
            Icon={m.icon}
            label={m.label}
            x={110}
            y={positions[i]}
            align="left"
          />
        ))}
        {/* Output icons and badges */}
        {models.map((m, i) => (
          <g key={`out-icon-${m.key}`}>
            <ModelIconWithLabel
              Icon={m.icon}
              label={m.label}
              x={690}
              y={positions[i]}
              align="right"
            />
            <RiskBadgeCard
              score={scores[i]}
              state={getState(scores[i])}
              x={744}
              y={positions[i] - 16}
              highlight={i === maxIndex}
            />
          </g>
        ))}
        {/* Central network */}
        <g transform={`translate(400,${centerY})`}>
          <g className="ring-pulse">
            <circle r={29} stroke="#54e9f8" strokeWidth="2" fill="none" opacity="0.6" />
            <circle r={29} stroke="#54e9f8" strokeWidth="2" fill="none" />
          </g>
          <circle cx="0" cy="0" r="3" fill="#54e9f8" />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * 2 * Math.PI;
            const x = Math.cos(angle) * 24;
            const y = Math.sin(angle) * 24;
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="#54e9f8" strokeWidth="2" opacity="0.7" />
                <circle cx={x} cy={y} r={4} fill="#54e9f8" />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="ml-4 flex items-center space-x-4">
        <RiskGauge score={scores[maxIndex]} />
        <svg width="100" height="40" className="text-[#4dd9ff]">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points={history.map((v, i) => `${i * 3},${40 - (v / 100) * 40}`).join(' ')}
          />
        </svg>
      </div>
    </div>
  );
};

export default InferenceFlow;
