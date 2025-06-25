import SecurityLogPanel from '../../components/SecurityLogPanel';

export default function SecurityPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Security Log</h1>
      <SecurityLogPanel />
    </div>
  );
}
