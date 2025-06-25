import { useEffect, useState } from 'react';

export default function SystemHealthBar() {
  const [score, setScore] = useState(70);

  useEffect(() => {
    const id = setInterval(() => {
      setScore(Math.floor(50 + Math.random() * 50));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const barColor = score > 80 ? 'bg-red-600' : score > 60 ? 'bg-yellow-400' : 'bg-green-600';

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
      <h2 className="text-sm text-gray-400 mb-2">시스템 위험도</h2>
      <div className="w-full bg-slate-700 h-4 rounded">
        <div className={`${barColor} h-4 rounded`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-right text-sm mt-1">{score}%</p>
    </div>
  );
}
