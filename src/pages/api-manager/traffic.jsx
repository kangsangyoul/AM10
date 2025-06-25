import TrafficGuard from '../../components/TrafficGuard';
import RateLimitConfigPanel from '../../components/RateLimitConfigPanel';
import RateLimitTable from '../../components/RateLimitTable';
import BlockedClientsList from '../../components/BlockedClientsList';

export default function TrafficPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Traffic Guard</h1>
      <TrafficGuard />
      <RateLimitConfigPanel />
      <RateLimitTable />
      <BlockedClientsList />
    </div>
  );
}
