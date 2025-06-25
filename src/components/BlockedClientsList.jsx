import React, { useEffect, useState } from 'react';

export default function BlockedClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      const count = Math.floor(Math.random() * 3);
      setClients(Array.from({ length: count }, (_, i) => `client-${i + 1}`));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="bg-slate-900 p-4 rounded space-y-1 text-sm">
      {clients.map(c => (
        <li key={c}>{c}</li>
      ))}
      {clients.length === 0 && <li>No blocked clients</li>}
    </ul>
  );
}
