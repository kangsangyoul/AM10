import React, { useState, useEffect } from 'react';
import { FiShield, FiStar, FiAlertTriangle, FiBook, FiEye, FiBarChart2 } from 'react-icons/fi';
import FlowCurve from './FlowCurve';
import ModelIconWithLabel from './ModelIconWithLabel';
import RiskBadgeCard from './RiskBadgeCard';
import RiskGauge from './RiskGauge';
import Toast from './Toast';

// Model list with full descriptive names
const models = [
  { key: 'fraud', label: 'Fraud Detector', icon: FiShield },
  { key: 'recommendation', label: 'Recommendation', icon: FiStar },
  { key: 'anomaly', label: 'Anomaly Watch', icon: FiAlertTriangle },
  { key: 'language', label: 'Language Model', icon: FiBook },
  { key: 'vision', label: 'Vision Classifier', icon: FiEye },
  { key: 'forecast', label: 'Forecast Engine', icon: FiBarChart2 },
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

const InferenceFlow = ({ onAlert }) => {
  const [scores, setScores] = useState(models.map(() => 50));
  const [toast, setToast] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      const next = models.map(() => Math.floor(Math.random() * 101));
      setScores(next);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setHistory((h) => [...h.slice(-19), Math.max(...scores)]);

    const maxScore = Math.max(...scores);
    if (!processing && maxScore >= 80) {
      setProcessing(true);
      setToast({ message: 'AI 자동 처리 중...', type: 'info' });
      setTimeout(() => {
        const success = Math.random() < 0.5;
        if (success) {
          setToast({ message: '경보 해결 완료', type: 'success' });
          onAlert &&
            onAlert({
              time: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }),
              model: models[scores.indexOf(maxScore)].label,
              event: 'Risk Mitigated',
              diagnosed: 'AI Agent',
              status: `${maxScore}%`,
            });
          setScores((prev) =>
            prev.map((s, i) => (i === scores.indexOf(maxScore) ? Math.max(0, s - 20) : s))
          );
        } else {
          setToast({ message: '조치 실패', type: 'error' });
        }
        setTimeout(() => {
          setToast(null);
          setProcessing(false);
        }, 2000);
      }, 2000);
    }
  }, [scores, processing, onAlert]);

  const maxIndex = scores.reduce((p, c, i) => (c > scores[p] ? i : p), 0);

  // Shift the entire flow upwards by roughly 1cm (~38px)
  const offsetY = -38;
  const centerY = 150 + offsetY;
  const iconStartY = 70 + offsetY;
  // spacing between each model row to ensure labels fit
  const iconSpacing = 46;
  const positions = models.map((_, i) => iconStartY + i * iconSpacing);
  const shiftX = -30; // move entire flow 30px to the left
  const centerX = 370 + shiftX; // central network position after shift

  return (
    <div
      className="flex items-center justify-center font-[Pretendard,sans-serif] text-xs"
      style={{ marginTop: `${offsetY}px` }}
    >
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
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0 0 L6 3 L0 6 Z" fill="#4dd9ff" />
          </marker>
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
          const inputPath = `M ${132 + shiftX} ${y} Q ${238 + shiftX} ${(y + centerY) / 2 - (2 - i) * 8}  ${326} ${centerY}`;
          return <FlowCurve key={`in-${m.key}`} d={inputPath} />;
        })}
        {/* Output lines */}
        {models.map((m, i) => {
          const y = positions[i];
          const outputPath = `M ${380 + shiftX} ${centerY} Q ${508 + shiftX} ${(y + centerY) / 2 + (i - 2) * 8} ${636 + shiftX} ${y}`;
          return (
            <FlowCurve
              key={`out-${m.key}`}
              d={outputPath}
              color={colorFor(scores[i])}
              width={scores[i] >= 80 ? 5 : 3}
              marker="url(#arrow)"
            />
          );
        })}
        {/* Input icons */}
        {models.map((m, i) => (
          <ModelIconWithLabel
            key={`in-icon-${m.key}`}
            Icon={m.icon}
            label={m.label}
            x={110 + shiftX}
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
              x={660 + shiftX}
              y={positions[i]}
              align="right"
            />
            <RiskBadgeCard
              score={scores[i]}
              state={getState(scores[i])}
              x={802 + shiftX}
              y={positions[i] - 16}
              highlight={i === maxIndex}
            />
          </g>
        ))}
        {/* Central network */}
        <g transform={`translate(${centerX},${centerY})`}>
          <g className="ring-pulse" style={{ transformOrigin: 'center' }}>
            <circle r={33} stroke="#54e9f8" strokeWidth="2" fill="none" opacity="0.6" />
            <circle r={33} stroke="#54e9f8" strokeWidth="2" fill="none" />
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
      <div className="ml-[-40px] scale-[1.15] flex flex-col items-center">
        <span className="text-[1.1rem] font-bold text-[#a2acc9] mb-1">Risk Score</span>
        <RiskGauge score={scores[maxIndex]} />
        <svg viewBox="0 0 100 30" className="w-24 h-8 mt-1" fill="none" stroke="#54a7f8" strokeWidth="2">
          <polyline points={history.map((v,i)=>`${i*5},${30 - v*0.3}`).join(' ')} />
        </svg>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default InferenceFlow;
