import SecurityLogTable from '../../components/SecurityLogTable';

export default function SecurityPage() {
  return (
    <div className="p-6 bg-slate-950 text-white space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold">Security Watch</h1>
      <SecurityLogTable />
    </div>
  );
}
