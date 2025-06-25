import APICallStatsCard from '../../components/APICallStatsCard';
import AlertHub from '../../components/AlertHub';
import TrafficGuard from '../../components/TrafficGuard';
import SummaryNavigationCard from '../../components/SummaryNavigationCard';
import SystemHealthBar from '../../components/SystemHealthBar';

export default function APIMDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold">🛡️ API Manager Dashboard</h1>
      <SystemHealthBar />
      <APICallStatsCard />
      <AlertHub />
      <TrafficGuard />
      <SummaryNavigationCard />
    </div>
  );
}

