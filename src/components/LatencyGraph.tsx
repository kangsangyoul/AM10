import { useEffect, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, TimeScale);

interface Point {
  t: string;
  v: number;
}

export default function LatencyGraph() {
  const [points, setPoints] = useState<Point[]>([]);

  const addPoint = () => {
    const now = new Date();
    const label = now.toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' });
    const value = 200 + Math.floor(Math.random() * 200);
    setPoints(p => {
      const arr = [...p, { t: label, v: value }];
      return arr.slice(-60); // keep last 5 min if every 5s
    });
  };

  useEffect(() => {
    addPoint();
    const id = setInterval(addPoint, 5000);
    return () => clearInterval(id);
  }, []);

  const data = {
    labels: points.map(p => p.t),
    datasets: [
      {
        label: 'Latency (ms)',
        data: points.map(p => p.v),
        borderColor: '#54a7f8',
        backgroundColor: 'rgba(84,167,248,0.3)',
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: '#334155' },
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: '#334155' },
      },
    },
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
  } as const;

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow">
      <Line data={data} options={options} />
    </div>
  );
}
