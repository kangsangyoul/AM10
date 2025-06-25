import React from 'react';
import APIWatcher from '../../src/components/APIWatcher';
import AlertHub from '../../src/components/AlertHub';

const ApiRisk: React.FC = () => (
  <div className="space-y-4">
    <APIWatcher />
    <AlertHub />
  </div>
);

export default ApiRisk;
