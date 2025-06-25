import React from 'react';
import TrafficGuard from '../../src/components/TrafficGuard';
import RateLimitTable from '../../src/components/RateLimitTable';

const TrafficPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">\uD83D\uDEE1\uFE0F Traffic Guard</h1>
    <TrafficGuard />
    <RateLimitTable />
  </div>
);

export default TrafficPage;
