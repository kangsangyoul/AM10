import React from 'react';

const links = [
  { label: 'API Risk', path: '#/api-manager/risk' },
  { label: 'Traffic Guard', path: '#/api-manager/traffic' },
  { label: 'Token Watch', path: '#/api-manager/token' },
  { label: 'Prompt Filter', path: '#/api-manager/prompt' },
  { label: 'Security Log', path: '#/api-manager/security' },
];

export default function SummaryNavigationCard() {
  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
      <h2 className="text-sm text-gray-400 mb-2">바로가기</h2>
      <div className="flex flex-wrap gap-2">
        {links.map(link => (
          <a
            key={link.label}
            href={link.path}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
