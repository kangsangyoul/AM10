import React from 'react';
import ModelStatus from './ModelStatus';

const AIModels = () => {
  const [query, setQuery] = React.useState('');

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">AI Models</h2>
      <input
        className="w-full bg-[#171f2e] p-2 rounded text-sm mb-2"
        placeholder="Search models"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ModelStatus filter={query} />
    </div>
  );
};

export default AIModels;
