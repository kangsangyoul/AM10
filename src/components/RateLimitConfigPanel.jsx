import React, { useState } from 'react';

export default function RateLimitConfigPanel() {
  const [limit, setLimit] = useState(1000);

  return (
    <div className="bg-slate-900 p-4 rounded space-y-2 text-sm">
      <label>Rate Limit {limit} rpm</label>
      <input
        type="range"
        min="100"
        max="2000"
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
