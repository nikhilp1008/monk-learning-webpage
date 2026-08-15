/* Draft legal copy — review before launch. Linked from the profile page. */

export const metadata = { title: "Terms & conditions — monk learning" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ruled-body">
      <main className="max-w-[760px] mx-auto px-6 py-12 animate-ml-rise">
        <h1 className="text-[2rem] leading-tight tracking-[-0.02em] font-medium text-ink mb-2">
          Terms &amp; conditions
        </h1>
        <p className="text-[0.8rem] text-ink-muted font-semibold mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-[0.95rem] text-ink-light leading-relaxed">
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">Your account</h2>
            <p>
              One account per student. Your subscription is tied to the exam you chose at
              sign-up (JEE Main, NEET, or both) and unlocks that exam&apos;s syllabus, practice
              and progress tracking.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">Fair use</h2>
            <p>
              MonkLearning is for your own preparation. Sharing accounts, scraping content, or
              attempting to extract the question bank isn&apos;t permitted.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">The Monk Score</h2>
            <p>
              Your score is a good-faith estimate of exam readiness built from your own answers.
              It is guidance, not a guarantee of any exam outcome.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">Changes</h2>
            <p>
              We&apos;ll notify you of material changes to these terms. Continued use after a
              change means you accept it.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
