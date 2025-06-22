import React, { useState, useEffect } from 'react';

const generateCells = () =>
  Array.from({ length: 25 }, () => Math.floor(Math.random() * 101));

const getColor = (value) => {
  if (value > 80) return '#ff5a47';
  if (value > 50) return '#54a7f8';
  return '#233a56';
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
    <div
      className="grid grid-cols-5"
      style={{ width: 146, height: 146, gap: 4 }}
    >
      {cells.map((v, i) => (
        <div
          key={i}
          className="relative flex items-center justify-center text-[10px] text-white transition-colors"
          style={{
            width: 26,
            height: 26,
            backgroundColor: getColor(v),
            transitionDuration: '0.2s',
          }}
          title={`${v}%`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
