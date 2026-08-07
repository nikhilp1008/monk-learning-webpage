# Progress — M11 Chapter 13: Statistics

chapter_id: `be419d00-be96-52c5-9704-c4331213c6e9`
branch: `premium-board-math13` · port: 3036
44 sections confirmed directly from Supabase `lesson_sections` (JSON_LESSONS is stale — 10 sections vs 44 — ignored per task brief).

Subtopics: 1-15 Measures of Dispersion & Mean Deviation · 16-29 Variance & Standard
Deviation · 30-42 Analysis of Frequency Distributions & Advanced Problems ·
43-44 Recap/Cheat Sheet.

No new math-kit primitives needed (per task brief) — reuse Ch01's axisD/tickD/dots
for spread comparisons, `<Overline>` for x̄ (mean), `<Frac>` from Ch12 if a
variance formula's fraction gets compound enough (most flatten fine as `Σ/N`).
σ falls back (Greek, accept it) — safe to use directly.

Flagged for extra scrutiny (reverse-problem / derivation arithmetic): Sec 20
(shortcut formula derivation), Sec 35-36 (reverse problems: missing observations,
misrecorded observation).

## Log
- **Sec 1** — concept, opens the chapter: two empty vendor "stalls" (Ramesh /
  Suresh) drawn as cards, filled one at a time with their five prices + a
  green mean chip (both ₹29.6 — identical), red-margin guardrail calling out
  the identical mean. Central-tendency-vs-dispersion split gets its own tiny
  icon pair (target = WHERE, burst = HOW SPREAD OUT), erased before the main
  diagram to free the band (spec's "erase, don't overlay" rule). Payoff: two
  stacked real number lines (shared linear ₹10-50 scale, `axisD`/`tickD`),
  Ramesh's dots in a tight knot vs Suresh's flung wide, one shared red dashed
  mean line through both at ₹29.6 — Ramesh's duplicate 30 stacked as two dots
  rather than overlapping exactly. Closing question boxed in the verdict
  band. PASS both languages on first render, eye-checked via FORCE_SHOTS
  (dot positions verified against actual data values, not eyeballed).
