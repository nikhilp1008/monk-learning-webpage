export const metadata = { title: "About us — monk learning" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ruled-body">
      <main className="max-w-[760px] mx-auto px-6 py-12 animate-ml-rise">
        <h1 className="text-[2rem] leading-tight tracking-[-0.02em] font-medium text-ink mb-8">
          A personal teacher who never sleeps.
        </h1>

        <div className="space-y-6 text-[0.95rem] text-ink-light leading-relaxed">
          <p>
            MonkLearning is built on one belief: every JEE and NEET aspirant deserves a teacher
            of their own — one who teaches out loud on a real board, stops the moment you raise
            your hand, and knows exactly where you stand.
          </p>
          <p>
            Drona and Veda teach every chapter of Class 11 and 12 in Hinglish or English. Practice
            never runs out. Doubts get solved from a photograph. And the Monk Score tells you the
            one thing every student actually wants to know:{" "}
            <b className="font-bold text-ink">how good have you become?</b>
          </p>
          <p className="font-script font-bold text-red-dark text-[1.05rem] -rotate-[0.5deg]">
            — the MonkLearning team
          </p>
        </div>
      </main>
    </div>
  );
}
