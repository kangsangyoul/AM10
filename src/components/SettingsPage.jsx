import React, { useState } from 'react';

const SettingsPage = () => {
  const [dark, setDark] = useState(true);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        Dark Theme
      </label>
      <p className="text-sm text-gray-400">Theme toggle demo only.</p>
    </div>
  );
};

export default SettingsPage;
