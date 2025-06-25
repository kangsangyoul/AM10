import { useEffect, useState } from "react";

interface BlockedClient {
  id: string;
  reason: string;
  time: string;
}

export default function BlockedClientsList() {
  const [clients, setClients] = useState<BlockedClient[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const count = Math.floor(Math.random() * 3);
      const list: BlockedClient[] = Array.from({ length: count }, (_, i) => ({
        id: Math.random() > 0.5 ? `token-${i + 1}` : `10.0.0.${i + 1}`,
        reason: "Too many requests",
        time: now,
      }));
      setClients(list);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2 text-sm">차단된 클라이언트</h2>
      {clients.length === 0 ? (
        <p className="text-sm text-gray-400">현재 차단된 클라이언트 없음</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {clients.map((c, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div>
                <div>{c.id}</div>
                <div className="text-xs text-gray-400">
                  {c.reason} · {c.time}
                </div>
              </div>
              <button className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                해제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
