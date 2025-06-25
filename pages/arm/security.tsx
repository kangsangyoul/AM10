import React from 'react';
import SecurityWatcher from '../../src/components/SecurityWatcher';

const SecurityPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">\uD83D\uDD12 Security Watch</h1>
    <SecurityWatcher />
  </div>
);

export default SecurityPage;
