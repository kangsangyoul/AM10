import React from 'react';
import { useRouter } from 'next/router';

const links = [
  { label: '🧮 API Risk', path: '/api-manager/risk' },
  { label: '⚙️ Traffic Guard', path: '/api-manager/traffic' },
  { label: '🔐 Token Watch', path: '/api-manager/token' },
  { label: '💬 Prompt Filter', path: '/api-manager/prompt' },
  { label: '🚨 Security Log', path: '/api-manager/security' },
];

export default function SummaryNavigationCard() {
  const router = useRouter();

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <div
            key={link.label}
            onClick={() => router.push(link.path)}
            className="rounded-xl shadow px-4 py-3 text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
          >
            {link.label}
          </div>
        ))}
      </div>
    </div>
  );
}
