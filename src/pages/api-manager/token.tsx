import TokenAbuseTable from '../../components/TokenAbuseTable';

export default function TokenPage() {
  return (
    <div className="p-6 bg-slate-950 text-white space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold">Token Misuse Watch</h1>
      <TokenAbuseTable />
    </div>
  );
}
