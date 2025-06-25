import PromptInjectionTable from '../../components/PromptInjectionTable';

export default function PromptPage() {
  return (
    <div className="p-6 bg-slate-950 text-white space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold">Prompt Injection Monitor</h1>
      <PromptInjectionTable />
    </div>
  );
}
