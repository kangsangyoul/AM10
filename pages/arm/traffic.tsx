import React from 'react';
import TrafficGuard from '../../src/components/TrafficGuard';
import RateLimitTable from '../../src/components/RateLimitTable';

const TrafficPage: React.FC = () => (
  <div className="space-y-4">
    <TrafficGuard />
    <RateLimitTable />
  </div>
);

export default TrafficPage;
