import React, { useState, useEffect } from 'react';

const initialModels = [
  { name: 'Fraud Detector', percent: 92.1, status: 'Active' },
  { name: 'Recommendation', percent: 76.4, status: 'Monitoring' },
  { name: 'Anomaly Watch', percent: 61.3, status: 'Drift' },
  { name: 'Language Model', percent: 84.7, status: 'Risk' },
  { name: 'Vision Classifier', percent: 49.5, status: 'Active' },
  { name: 'Forecast Engine', percent: 73.2, status: 'Audit' },
];

const getColor = (p) => {
  if (p > 80) return '#ff5a47';
  if (p > 60) return '#ffb534';
  return '#54a7f8';
};

const ModelStatus = () => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model, i) => (
        <div key={i} className="bg-[#171f2e] rounded-xl p-4 shadow">
          <div className="text-sm text-gray-400">{model.name}</div>
          <div className="text-2xl font-bold" style={{ color: getColor(model.percent) }}>
            {model.percent.toFixed(1)}%
          </div>
          <div className="text-xs mt-1 text-[#a2acc9]">{model.status}</div>
        </div>
      ))}
    </div>
  );
};

export default ModelStatus;
