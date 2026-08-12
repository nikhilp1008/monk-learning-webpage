// Next.js wraps page.tsx in a Suspense boundary keyed off this file (see
// node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md
// "Dynamic routes without loading.tsx"). Without it, clicking into /dashboard
// left the PREVIOUS page frozen on screen for the full duration of the
// page's Supabase calls -- the click looked like it did nothing. With it,
// this skeleton paints immediately and the real content swaps in when ready.
export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-6">
        <div className="h-8 w-64 rounded-lg bg-ink/10 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-[18px] bg-white border border-border-subtle shadow-ref-stat animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 rounded-[22px] bg-white border border-border-subtle shadow-ref-card animate-pulse" />
      </main>
    </div>
  );
}
