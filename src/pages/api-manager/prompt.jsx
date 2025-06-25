import PromptGuard from '../../components/PromptGuard';

export default function PromptPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Prompt Filter</h1>
      <PromptGuard />
    </div>
  );
}
