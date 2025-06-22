import React from 'react';

const reports = [
  { name: 'Weekly Risk Summary', date: '2025-06-18' },
  { name: 'Monthly Performance', date: '2025-06-01' },
  { name: 'Anomaly Log', date: '2025-05-28' },
];

const ReportsPage = () => (
  <div className="p-6 space-y-4">
    <h2 className="text-xl font-semibold mb-4">Reports</h2>
    <ul className="space-y-2">
      {reports.map((r) => (
        <li key={r.name} className="flex justify-between items-center bg-[#171f2e] p-3 rounded">
          <span>{r.name} ({r.date})</span>
          <button className="text-sm px-3 py-1 rounded bg-[#34b4ff] text-white">Download</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ReportsPage;
