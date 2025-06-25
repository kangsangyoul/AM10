import React from 'react';
import APIWatcher from './APIWatcher';
import AlertHub from './AlertHub';
import APICallLatencyGraph from './APICallLatencyGraph';
import APIErrorTable from './APIErrorTable';

const ARMDashboard = () => {
  return (
    <div className="space-y-6">
      <APIWatcher />
      <AlertHub />
      <APICallLatencyGraph />
      <APIErrorTable />
    </div>
  );
};

export default ARMDashboard;
