import React from 'react';
import APIWatcher from '../../src/components/APIWatcher';
import AlertHub from '../../src/components/AlertHub';

const ApiRisk: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">\uD83D\uDCF1 API Risk Monitoring</h1>
    <APIWatcher />
    <AlertHub />
  </div>
);

export default ApiRisk;
