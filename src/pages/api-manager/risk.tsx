import APIErrorTable from '@/components/APIErrorTable';
import LatencyGraph from '@/components/LatencyGraph';

export default function APIRiskPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">📉 API Risk Monitoring</h1>
      <APIErrorTable />
      <LatencyGraph />
    </div>
  );
}
