import React, { useState, useEffect } from 'react';

const names = Array.from({ length: 25 }, (_, i) => `Model${i + 1}`);

const generateCells = () =>
  names.map((name) => ({
    name,
    value: Math.floor(Math.random() * 101),
    updated: new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  }));

const getColor = (value) => {
  if (value >= 81) return '#ff5a47';
  if (value >= 51) return '#54a7f8';
  return '#233a56';
};

const Heatmap = () => {
  const [cells, setCells] = useState(generateCells());
  const [selected, setSelected] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(() =>
    new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(generateCells());
      setLastUpdate(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openDetail = (cell) => {
    setSelected(cell);
  };

  const closeDetail = () => setSelected(null);

  return (
    <div className="text-white font-[Pretendard,sans-serif]">
      <div className="flex justify-between items-center mb-2 text-sm font-bold">
        <span>실시간 AI 리스크 히트맵</span>
        <span className="text-[#a2acc9] text-[0.85rem]">Updated: {lastUpdate}</span>
      </div>
      <div
        className="grid grid-cols-5"
        style={{ width: 140, height: 140, gap: 4 }}
      >
        {cells.map((cell, i) => (
          <div
            key={cell.name}
            onClick={() => openDetail(cell)}
            className="relative flex items-center justify-center text-[10px] font-medium transition-colors"
            style={{
              width: 26,
              height: 26,
              backgroundColor: getColor(cell.value),
              transitionProperty: 'background',
              transitionDuration: '0.2s',
              outline: 'none',
              cursor: 'pointer',
              borderRadius: 6,
            }}
            title={`${cell.name} ${cell.value} @${cell.updated}`}
            onMouseEnter={(e) => (e.currentTarget.style.outline = '#54a7f8 2px solid')}
            onMouseLeave={(e) => (e.currentTarget.style.outline = 'none')}
          >
            {cell.value}
            {selected?.name === cell.name && (
              <div
                className="absolute inset-0 bg-white/20 rounded pointer-events-none"
                style={{ backdropFilter: 'blur(2px)' }}
              />
            )}
          </div>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={closeDetail}
        >
          <div className="bg-[#171f2e] rounded-xl p-6" style={{ minWidth: 200 }}>
            <h3 className="text-lg font-semibold mb-2">{selected.name}</h3>
            <p>Value: {selected.value}</p>
            <p>Updated: {selected.updated}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
