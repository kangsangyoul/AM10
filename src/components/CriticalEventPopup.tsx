import { useEffect, useState } from 'react';

const events = [
  'Token abuse detected: token-xzy',
  'Error spike in /v1/query',
  'Multiple auth failures',
];

export default function CriticalEventPopup() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const next = events[Math.floor(Math.random() * events.length)];
      setMessage(next);
      setTimeout(() => setMessage(null), 5000);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 transform transition-opacity duration-300 bg-red-600 text-white px-4 py-2 rounded-xl shadow animate-slideIn">
      {`🚨 ${message}`}
      <style jsx>{`
        .animate-slideIn {
          animation: slide 0.3s ease-out;
        }
        @keyframes slide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
