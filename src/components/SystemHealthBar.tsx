import { useEffect, useState } from 'react';

export default function SystemHealthBar() {
  const [score, setScore] = useState(70);

  useEffect(() => {
    const id = setInterval(() => {
      setScore(Math.floor(Math.random() * 101));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const statusColor = score >= 80 ? 'green' : score >= 50 ? 'yellow' : 'red';
  const barColor =
    statusColor === 'green' ? 'bg-green-500' : statusColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
  const textColor =
    statusColor === 'green' ? 'text-green-400' : statusColor === 'yellow' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow">
      <h2 className="text-sm mb-2 text-white">System Health</h2>
      <div className="w-full bg-slate-800 h-4 rounded">
        <div
          className={`${barColor} h-4 rounded transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`text-right text-sm mt-1 ${textColor}`}>{score}%</p>
    </div>
  );
}
