import { useEffect, useState } from 'react';

interface Props {
  score?: number;
}

export default function SystemHealthGauge({ score: external }: Props) {
  const [score, setScore] = useState(external ?? 0);

  useEffect(() => {
    if (external === undefined) {
      const id = setInterval(() => {
        setScore(Math.floor(Math.random() * 101));
      }, 5000);
      return () => clearInterval(id);
    }
  }, [external]);

  useEffect(() => {
    if (external !== undefined) setScore(external);
  }, [external]);

  const colorClass =
    score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';
  const angle = (score / 100) * 180 - 90;

  return (
    <div className="bg-slate-900 rounded-full w-40 h-40 relative flex items-center justify-center shadow">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="10" fill="none" />
      </svg>
      <div
        className={`absolute left-1/2 bottom-1/2 origin-bottom ${colorClass}`}
        style={{
          width: '2px',
          height: '40%',
          backgroundColor: 'currentColor',
          transform: `translateX(-50%) rotate(${angle}deg)`,
          transition: 'transform 0.5s',
        }}
      />
      <span className={`absolute text-xl font-bold ${colorClass}`}>{score}</span>
    </div>
  );
}
