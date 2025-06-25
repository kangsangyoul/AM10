import { useEffect, useState } from 'react';

export default function PromptGuard() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const id = setInterval(() => {
      setLogs((l) => [
        ...l.slice(-4),
        { text: 'Potential injection detected', time: new Date().toLocaleTimeString() },
      ]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#171f2e] p-4 rounded-lg">
      <div className="font-semibold mb-2">Prompt Guard</div>
      <ul className="text-sm space-y-1">
        {logs.map((log, i) => (
          <li key={i}>[{log.time}] {log.text}</li>
        ))}
      </ul>
    </div>
  );
}
