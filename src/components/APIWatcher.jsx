import React from 'react';

export default function APIWatcher() {
  const stats = {
    totalCalls: 5481,
    errorRate: '2.4%',
    avgLatency: '243ms',
  };

  return (
    <div className="bg-slate-900 text-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">API 호출 리스크 요약</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>📊 총 호출 수: {stats.totalCalls}</div>
        <div>⚠️ 오류율: {stats.errorRate}</div>
        <div>⏱ 평균 응답시간: {stats.avgLatency}</div>
      </div>
    </div>
  );
}
