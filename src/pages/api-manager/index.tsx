import APICallStatsCard from '../../components/APICallStatsCard';
import AlertHub from '../../components/AlertHub';
import TrafficGuard from '../../components/TrafficGuard';
import SummaryNavigationCard from '../../components/SummaryNavigationCard';
import SystemHealthBar from '../../components/SystemHealthBar';
import SystemHealthGauge from '../../components/SystemHealthGauge';
import EventHeatmapGrid from '../../components/EventHeatmapGrid';
import PulseRing from '../../components/PulseRing';
import CriticalEventPopup from '../../components/CriticalEventPopup';

export default function APIMDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold">🛡️ API Manager Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <SystemHealthBar />
        <SystemHealthGauge />
      </div>
      <APICallStatsCard />
      <AlertHub />
      <EventHeatmapGrid />
      <PulseRing />
      <TrafficGuard />
      <CriticalEventPopup />
      <SummaryNavigationCard />
    </div>
  );
}

