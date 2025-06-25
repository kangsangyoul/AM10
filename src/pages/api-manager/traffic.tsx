import RateLimitTable from '../../components/RateLimitTable';
import BlockedClientsList from '../../components/BlockedClientsList';

export default function TrafficPage() {
  return (
    <div className="p-6 bg-slate-950 text-white space-y-6">
      <RateLimitTable />
      <BlockedClientsList />
    </div>
  );
}

