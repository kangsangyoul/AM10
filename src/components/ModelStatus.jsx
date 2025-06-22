import React, { useState, useEffect } from 'react';

const initialModels = [
  { name: 'Fraud Detector', percent: 92.1, status: 'Active' },
  { name: 'Recommendation', percent: 76.4, status: 'Drift' },
  { name: 'Anomaly Watch', percent: 61.3, status: 'Audit' },
  { name: 'Language Model', percent: 84.7, status: 'AI Risk' },
  { name: 'Vision Classifier', percent: 49.5, status: 'Active' },
  { name: 'Forecast Engine', percent: 73.2, status: 'High' },
];

const statusColor = (status) => {
  switch (status) {
    case 'Active':
      return '#34b4ff';
    case 'Drift':
      return '#ffb534';
    case 'AI Risk':
    case 'High':
      return '#ff5a47';
    case 'Audit':
      return '#54a7f8';
    default:
      return '#54a7f8';
  }
};

const ModelStatus = ({ filter = '' }) => {
  const [models, setModels] = useState(initialModels);

  useEffect(() => {
    const interval = setInterval(() => {
      setModels((prev) =>
        prev.map((m) => ({
          ...m,
          percent: Math.min(100, Math.max(0, m.percent + (Math.random() * 4 - 2))),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filtered = models.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {filtered.map((model, i) => (
        <div key={i} className="bg-[#192232] rounded-xl p-4 shadow">
          <div className="text-sm text-gray-400">{model.name}</div>
          <div className="text-2xl font-bold" style={{ color: statusColor(model.status) }}>
            {model.percent.toFixed(1)}%
          </div>
          <span
            className="inline-block text-xs font-bold mt-1 rounded"
            style={{ backgroundColor: statusColor(model.status), color: '#fff', padding: '2px 8px' }}
          >
            {model.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ModelStatus;
