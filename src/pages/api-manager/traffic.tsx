import RateLimitTable from '../../components/RateLimitTable';
import BlockedClientsList from '../../components/BlockedClientsList';
import RateLimitConfigPanel from '../../components/RateLimitConfigPanel';
      <RateLimitConfigPanel />
import RateLimitConfigPanel from '../../components/RateLimitConfigPanel';

export default function TrafficPage() {
  return (
    <div className="p-6 bg-slate-950 text-white space-y-6">
      <RateLimitTable />
      <BlockedClientsList />
      <RateLimitConfigPanel />
    </div>
  );
}

