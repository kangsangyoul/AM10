import React, { useState, useEffect } from 'react';

const initial = ['A','B','C','D','E','F'].map((name) => ({
  name: `Model ${name}`,
  value: Math.floor(Math.random()*100),
  status: 'Active'
}));

const ModelStatus = () => {
  const [models, setModels] = useState(initial);

  useEffect(() => {
    const i = setInterval(() => {
      setModels((prev) =>
        prev.map((m) => ({
          ...m,
          value: Math.max(0, Math.min(100, m.value + Math.round(Math.random()*4-2))),
        }))
      );
    }, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {models.map((m) => (
        <div key={m.name} className="bg-[#1a1f29] rounded-xl p-4 shadow">
          <div className="text-sm text-gray-400">{m.name}</div>
          <div className="text-2xl font-bold">{m.value}%</div>
          <div className="text-xs mt-1">{m.status}</div>
        </div>
      ))}
    </div>
  );
};

export default ModelStatus;
