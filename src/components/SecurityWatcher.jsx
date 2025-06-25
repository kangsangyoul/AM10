import React, { useEffect, useState } from 'react';

const initial = [
  { id: 1, type: 'auth fail', detail: 'User A failed login' },
  { id: 2, type: 'token misuse', detail: 'Token XYZ used from new IP' },
];

const SecurityWatcher = () => {
  const [logs, setLogs] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const type = Math.random() > 0.5 ? 'auth fail' : 'token misuse';
      setLogs((p) => [
        { id, type, detail: `Event ${id.toString().slice(-4)}` },
        ...p.slice(0, 4),
      ]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1f29] p-4 rounded-xl shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2">Security Watch</h3>
      <ul className="text-sm space-y-1">
        {logs.map((l) => (
          <li key={l.id}>
            [{l.type}] {l.detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecurityWatcher;
