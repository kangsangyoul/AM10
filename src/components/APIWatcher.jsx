import React, { useEffect, useState } from 'react';

const mockApiStats = {
  totalCalls: 5481,
  errorRate: 2.4,
  avgLatencyMs: 245,
  highRiskEndpoints: [
    { endpoint: '/v1/completions', errorRate: 7.8, avgLatency: 623 },
    { endpoint: '/v1/search', errorRate: 5.1, avgLatency: 440 },
  ],
};

const APIWatcher = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // simulate async load
    const timer = setTimeout(() => setStats(mockApiStats), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center p-6 bg-slate-900 rounded-2xl shadow-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
      <div className="text-2xl font-semibold pb-4">API Risk Overview</div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-lg">✅ Total Calls: {stats.totalCalls}</div>
        <div className="text-lg">⚠️ Error Rate: {stats.errorRate}%</div>
        <div className="text-lg">📉 Avg Latency: {stats.avgLatencyMs}ms</div>
      </div>
      <div className="pt-2">
        <h3 className="text-xl font-semibold mb-2">🔍 High Risk Endpoints</h3>
        <table className="w-full text-left border-t border-slate-700">
          <thead>
            <tr className="text-slate-300">
              <th className="py-2">Endpoint</th>
              <th>Error Rate (%)</th>
              <th>Avg Latency (ms)</th>
            </tr>
          </thead>
          <tbody>
            {stats.highRiskEndpoints.map((api) => (
              <tr key={api.endpoint} className="border-t border-slate-700 hover:bg-slate-800">
                <td className="py-2">{api.endpoint}</td>
                <td>{api.errorRate}</td>
                <td>{api.avgLatency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default APIWatcher;
