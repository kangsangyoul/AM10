import TokenAbuseTable from '../../components/TokenAbuseTable';

export default function TokenPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Token Watch</h1>
      <TokenAbuseTable />
    </div>
  );
}
