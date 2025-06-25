import { useEffect, useState } from 'react';

export default function BlockedClientsList() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setClients(['192.168.0.1', '10.0.0.2'].slice(0, Math.floor(Math.random()*2)+1));
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#171f2e] p-4 rounded-lg">
      <div className="font-semibold mb-2">Blocked Clients</div>
      <ul className="list-disc list-inside text-sm">
        {clients.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}
