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
- **Sec 2** — concept: a 7-point number line (12,18,22,25,30,33,38) rings its
  real min/max, a double-headed arrow spans them, arithmetic "38 - 12 = 26"
  under the formula `Range = x_max - x_min`. Grouped-data tweak gets a small
  4-bar class-boundary illustration; the weather example (22°C→41°C) sits
  beside it as a real worked mini-case. Guardrail beat adds a genuine outlier
  (82) ringed in red with its own red double-arrow (old max/arrow dim via a
  plain `<g opacity>` wrapper, since `Draw` has no built-in `dim` prop like
  `Fade` does) — the arithmetic (82-12=70) folded into the guardrail sentence
  itself rather than a separate label, after the first pass caught 3 Hinglish
  text-overlaps from two competing labels sharing one row. First real use of
  `<Frac>` in this chapter for the coefficient-of-range formula (compound
  numerator/denominator). Fixed one bad import (`ringD` is kit.tsx, not
  math-kit.tsx) caught by tsc. PASS both languages after the overlap fix,
  eye-checked via FORCE_SHOTS.
- **Sec 3** — concept: mini symmetric ±5 diagram shows distance ignoring
  direction, guardrail on dropping signs, then the zero-sum identity
  `Σ(x_i - x̄) = 0` (first `<Overline>` use in this chapter, via a local
  `XBar` helper mirroring Ch04's `ZBar`) landing into THE diagram — a number
  line with 4 points and a chosen centre `a`, distance lines alternating
  above/below axis (same convention as the source SVG) to avoid crossing.
  Caught two real bugs via eye-check (not the automated verifier): (1) an
  overlap between the "distance ignores direction" caption and its ±5 labels
  from underestimating vertical clearance, fixed by re-spacing; (2) the
  `XBar` helper's plain "x" glyph wasn't wrapped in `<Fade on=.../>` like the
  reference `ZBar`, so it rendered on EVERY beat regardless of gating — a
  silent blank-board-contract violation the overlap/overflow checks can't
  catch since nothing else occupied that spot yet. Both fixed, PASS both
  languages, re-eye-checked.
- **Sec 4** — concept: two-column layout. LEFT = weakness 1, a real hand-drawn
  y=|x| V-graph (two `lineD` segments meeting at a vertex, not a canned icon)
  with the corner ringed in red. RIGHT = weakness 2, a genuine skewed data set
  {2,4,5,6,20} on a number line with BOTH mean (7.4) and median (5) anchors
  marked and their own mean-deviation values labeled (MD about mean = 5.04,
  about median = 4.0 — hand-verified arithmetic, confirms the theorem the
  formula states). Labels for the two close-together anchors diverge outward
  (median anchor's text right-anchored to its left, mean's left-anchored to
  its right) to avoid collision instead of stacking rows. PASS both
  languages on first render, eye-checked (arithmetic and corner ring both
  confirmed correct).
- **Sec 5** — concept (procedure): two-column step list. LEFT = about the
  mean (steps 1-4, boxed final formula MD(x̄) = (1/n)Σ|x_i - x̄|), RIGHT =
  about the median (red-margin note: same steps, Step 1 swaps) + boxed "why
  bother" payoff. Introduced a reusable local `FormulaRow` helper (parts
  array mixing plain text chunks and `"xbar"` tokens, auto-advances a cursor
  left-to-right by estimated width) since x̄ now appears inline inside
  formulas repeatedly — worth generalizing beyond Sec3's one-off `XBar`
  splicing. PASS both languages on first render, eye-checked.
- **Sec 6** — concept (procedure): a real 4-column worked table (Class, x_i,
  f_i, f_i·|x_i-x̄|) builds column by column across beats for classes
  0-10/10-20/20-30 with f=2,5,3 (N=10, x̄=16, Σf_i|x_i-x̄|=54, M.D.=5.4 — all
  hand-verified). Guardrail beat (flagged high-emphasis, "the single biggest
  trap") gets real teeth: a crossed-out "54÷3=18 ✗" chip beside the correct
  "54÷10=5.4 ✓" chip, since the wrong-divisor mistake is concrete enough here
  to show numerically rather than just state. Reused Sec5's `XBar`/
  `FormulaRow` helpers verbatim. PASS both languages on first render,
  eye-checked (every arithmetic value in the table and both divisions
  confirmed correct).
