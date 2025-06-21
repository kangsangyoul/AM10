import React, { useState, useEffect } from 'react';

const generateCells = () =>
  Array.from({ length: 25 }, () => Math.floor(Math.random() * 101));

const getColor = (value) => {
  if (value > 80) return 'bg-red-500';
  if (value > 50) return 'bg-yellow-500';
  return 'bg-blue-500';
};

const Heatmap = () => {
  const [cells, setCells] = useState(generateCells());

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(generateCells());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-1 w-40 h-40">
      {cells.map((v, i) => (
        <div
          key={i}
          className={`w-full h-full ${getColor(v)} transition-colors`}
          title={`${v}%`}
        />
      ))}
    </div>
  );
};

export default Heatmap;
