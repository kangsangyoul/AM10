import { useState } from "react";

export default function RateLimitConfigPanel() {
  const [limit, setLimit] = useState(100);

  const save = () => {
    alert("저장되었습니다 (mock)");
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow p-4 space-y-4">
      <h2 className="font-semibold text-sm">전체 호출 제한</h2>
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
      <button
        onClick={save}
        className="bg-blue-600 text-white text-sm px-4 py-1 rounded"
      >
        저장
      </button>
    </div>
  );
}
