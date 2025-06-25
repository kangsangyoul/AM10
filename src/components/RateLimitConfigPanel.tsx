import { useState } from "react";

export default function RateLimitConfigPanel() {
  const [limit, setLimit] = useState(100);
  const [tokenLimit, setTokenLimit] = useState(50);

  const save = () => {
    console.log({ limit, tokenLimit });
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow p-4 space-y-2">
      <label className="block text-sm font-semibold">전체 호출 제한</label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min={10}
          max={500}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="flex-1"
        />
        <input
          type="number"
          className="w-20 text-black rounded px-1 py-0.5"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
        <span className="text-sm">req/min</span>
      </div>
      <label className="block text-sm font-semibold">단일 토큰 제한</label>
      <input
        type="number"
        className="w-24 text-black rounded px-1 py-0.5"
        value={tokenLimit}
        onChange={(e) => setTokenLimit(Number(e.target.value))}
      />
      <button
        onClick={save}
        className="bg-blue-600 text-white text-sm px-4 py-1 rounded"
      >
        저장
      </button>
    </div>
  );
}
