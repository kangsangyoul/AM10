import React from 'react';

const securityEvents = [
  { tokenId: 'token-213', location: 'KR', risk: 'High', event: 'Overuse/Key Leak' },
  { tokenId: 'token-882', location: 'US', risk: 'Medium', event: 'Invalid Signature' },
  { tokenId: 'token-921', location: 'IN', risk: 'Critical', event: 'Auth Flooding' },
];

const SecurityWatch = () => {
  return (
    <div className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-xl mt-6">
      <div className="text-2xl font-semibold pb-4">Security & Token Monitoring</div>
      <table className="w-full text-left border-t border-slate-700">
        <thead>
          <tr className="text-slate-300">
            <th className="py-2">Token ID</th>
            <th>Region</th>
            <th>Risk Level</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {securityEvents.map((entry) => (
            <tr key={entry.tokenId} className="border-t border-slate-700 hover:bg-slate-800">
              <td className="py-2">{entry.tokenId}</td>
              <td>{entry.location}</td>
              <td>{entry.risk}</td>
              <td>{entry.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityWatch;
