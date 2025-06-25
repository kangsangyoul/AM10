import React, { useEffect, useState } from 'react';

const generateEntry = () => ({
  id: Date.now(),
  prompt: 'User input example',
  flagged: Math.random() > 0.7,
});

const PromptMonitor = () => {
  const [entries, setEntries] = useState([generateEntry()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => [generateEntry(), ...prev.slice(0, 4)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1f29] p-4 rounded-xl shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2">Prompt Injection Monitor</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Prompt</th>
            <th>Flagged</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="border-b border-gray-800">
              <td className="py-1">{e.prompt}</td>
              <td>{e.flagged ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromptMonitor;
