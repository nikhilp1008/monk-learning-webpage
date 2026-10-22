import Link from "next/link";

// Ported from monk-learning-mobile lib/exam-scope.ts. Static on purpose: a
// syllabus changes about once a decade, so this is updated by hand when the
// annual review finds a diff -- keep the two copies in step.

const EXAM_SCOPE = {
  jee: {
    label: "JEE Main",
    authority: "NTA",
    subjects: [
      ["Physics", 28],
      ["Chemistry", 19],
      ["Maths", 25],
    ],
    totalChapters: 72,
    boardOnlyChapters: ["Linear Programming"],
  },
  neet: {
    label: "NEET UG",
    authority: "NMC",
    subjects: [
      ["Physics", 28],
      ["Chemistry", 19],
      ["Biology", 32],
    ],
    totalChapters: 79,
    boardOnlyChapters: [] as string[],
  },
} as const;

const TIMELINE = [
  { period: "till 2022", headline: "No structural change", detail: "Same unit sets year on year, but a wider syllabus than today’s.", state: "stable" },
  { period: "2023", headline: "NCERT rationalised the books", detail: "Whole chapters deleted from the textbooks. The exams hadn’t caught up yet.", state: "change" },
  { period: "2024", headline: "Both exams realigned", detail: "NTA and NMC cut to match the new books. The one real change in a decade.", state: "change" },
  { period: "2025", headline: "No change", detail: "Neither syllabus moved.", state: "stable" },
  { period: "2026", headline: "No change", detail: "NTA confirmed no change; NMC confirmed nothing removed.", state: "stable" },
  { period: "2027", headline: "Not published yet", detail: "JEE Main bulletin is expected around October, the NEET notice around December.", state: "unknown" },
] as const;

const DOT = { stable: "bg-green-badge", change: "bg-orange", unknown: "bg-ink-dim" } as const;

export default function ExamScopePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">What the exam covers</h1>
        <p className="text-sm text-ink-light mt-1">
          Chapter counts for JEE Main and NEET UG, and how the syllabus has moved.
        </p>
      </div>

      {Object.values(EXAM_SCOPE).map((e) => (
        <section key={e.label} className="bg-white rounded-2xl border border-border-subtle p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold text-ink">{e.label}</h2>
            <p className="text-xs text-ink-muted">Set by {e.authority}</p>
          </div>
          <ul className="mt-3 divide-y divide-border-subtle">
            {e.subjects.map(([name, chapters]) => (
              <li key={name} className="flex justify-between py-2 text-sm">
                <span className="font-bold text-ink">{name}</span>
                <span className="text-ink-light">{chapters} chapters</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-bold text-ink mt-3">{e.totalChapters} chapters in all</p>
          {e.boardOnlyChapters.length > 0 && (
            <p className="text-xs text-ink-muted mt-1">
              In the board syllabus but not in this exam: {e.boardOnlyChapters.join(", ")}.
            </p>
          )}
        </section>
      ))}

      <section className="bg-white rounded-2xl border border-border-subtle p-5">
        <h2 className="text-lg font-extrabold text-ink mb-3">Has the syllabus changed?</h2>
        <ol className="space-y-4">
          {TIMELINE.map((t) => (
            <li key={t.period} className="flex gap-3">
              <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-none ${DOT[t.state]}`} />
              <div>
                <p className="text-sm font-bold text-ink">
                  {t.period} · {t.headline}
                </p>
                <p className="text-sm text-ink-light">{t.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-xs text-ink-muted">
        Checked against the official NTA JEE Main 2026 syllabus and the NMC NEET UG 2026 notice · August 2026
      </p>
      <Link href="/mocks" className="inline-block text-sm underline text-ink">
        Sit a mock test →
      </Link>
    </main>
  );
}
