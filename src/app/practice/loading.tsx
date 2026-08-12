// See src/app/dashboard/loading.tsx for why this file exists. PracticePage
// awaits getUser() + a profiles select before it can even decide whether to
// redirect -- without a loading.tsx that wait was invisible to the user.
export default function PracticeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-6">
        <div className="h-8 w-72 rounded-lg bg-ink/10 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[18px]">
          <div className="h-96 rounded-[22px] bg-white border border-border-subtle shadow-ref-card animate-pulse" />
          <div className="h-96 rounded-[22px] bg-white border border-border-subtle shadow-ref-card animate-pulse" />
        </div>
      </main>
    </div>
  );
}
