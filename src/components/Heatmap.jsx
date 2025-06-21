import React, { useState, useEffect } from 'react';

const SIZE = 5;

const randomMatrix = () =>
  Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => Math.random())
  );

const Heatmap = () => {
  const [matrix, setMatrix] = useState(randomMatrix());

  useEffect(() => {
    const i = setInterval(() => {
      setMatrix(randomMatrix());
    }, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="space-y-1">
      {matrix.map((row, rIdx) => (
        <div key={rIdx} className="flex space-x-1">
          {row.map((val, cIdx) => (
            <div
              key={cIdx}
              className="w-6 h-6 rounded"
              style={{ backgroundColor: `rgba(34,197,94,${val})` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
