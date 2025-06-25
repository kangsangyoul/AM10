import APICallStatsCard from '../../components/APICallStatsCard';
import AlertHub from '../../components/AlertHub';
import TrafficGuard from '../../components/TrafficGuard';

export default function APIMDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">🛡️ API Manager Dashboard</h1>
      <APICallStatsCard />
      <AlertHub />
      <TrafficGuard />
    </div>
  );
}
