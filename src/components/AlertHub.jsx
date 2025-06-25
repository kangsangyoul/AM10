import { useEffect, useState } from 'react';

export default function AlertHub() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setAlerts((a) => [
        ...a.slice(-4),
        { msg: 'Error rate high', time: new Date().toLocaleTimeString() },
      ]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#171f2e] p-4 rounded-lg">
      <div className="font-semibold mb-2">Alerts</div>
      <ul className="space-y-1">
        {alerts.map((al, i) => (
          <li key={i} className="text-sm">[{al.time}] {al.msg}</li>
        ))}
      </ul>
    </div>
  );
}
