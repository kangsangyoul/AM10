import APIErrorTable from '../../components/APIErrorTable';

export default function APIRiskPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">API Risk</h1>
      <APIErrorTable />
    </div>
  );
}
