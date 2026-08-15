/* Draft legal copy — review before launch. Linked from the profile page. */

export const metadata = { title: "Privacy policy — monk learning" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ruled-body">
      <main className="max-w-[760px] mx-auto px-6 py-12 animate-ml-rise">
        <h1 className="text-[2rem] leading-tight tracking-[-0.02em] font-medium text-ink mb-2">
          Privacy policy
        </h1>
        <p className="text-[0.8rem] text-ink-muted font-semibold mb-8">Last updated: August 2026</p>

        <div className="space-y-6 text-[0.95rem] text-ink-light leading-relaxed">
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">What we collect</h2>
            <p>
              Your account details (name, email, class, target exam), your learning activity
              (questions attempted, sessions, doubts, notes), and the preferences you set
              (teacher, language). This is what makes your teaching and your progress tracking
              personal to you.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">Photos of doubts</h2>
            <p>
              When you snap a doubt, the photo is processed to extract the question and then
              discarded — we do not retain your photographs.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">What we never do</h2>
            <p>
              We do not sell your data. We do not show ads. Your learning record exists to teach
              you, not to profile you.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-ink text-[1.05rem] mb-1.5">Questions</h2>
            <p>
              Write to us any time and we&apos;ll answer plainly. You can request a copy or
              deletion of your data from your account page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
