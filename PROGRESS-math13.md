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
- **Sec 7** — concept (procedure): worked grouped-data table (classes
  0-10..40-50, f=5,8,12,6,4) builds a cumulative-frequency column live
  (5,13,25,31,35), rings the median class (20-30, first c.f. ≥ N/2=17.5),
  then the interpolation formula M = ℓ + Frac(N/2-C, f)×h — first real
  `<Frac>` use in this chapter, substituted to a hand-verified 20 +
  (4.5/12)×10 = 23.75. Definitions (ℓ, C, f, h) carry their actual numeric
  values inline, not just symbols. Closing line needed per-language JSX
  branches (not just `t()` swapping strings) since the x̄ glyph's position
  differs between the English and Hinglish sentence structures — computed
  each language's text width separately to place the `XBar` without
  overflowing the safe area. PASS both languages on first render,
  eye-checked (cumulative sums and the interpolation arithmetic confirmed).
- **Sec 8** — formulas: a restated reference card (not new teaching, per its
  own narration), so treated as a boxed 5-card grid rather than a live
  derivation — closer to the `formula_recap` house style than a literal
  `formulas` build. Green boxes for the three high-emphasis formulas (range
  + coefficient of range with `<Frac>`, M.D. ungrouped, M.D. frequency),
  amber boxes for the two normal-emphasis ones (coefficient of M.D.,
  grouped-median interpolation with `<Frac>`), red-margin close for the two
  memorise-this facts. PASS both languages on first render, eye-checked.
- **Sec 9** — worked_examples, first worked example of the chapter: marks
  32,28,36,24,30. Table builds x_i then |x_i-x̄| columns; the two extreme
  rows (36, 24) ring for the range calc. Mean formula uses `<Frac>` for its
  genuinely compound 5-term numerator (32+28+36+24+30)/5=150/5=30 — the
  simple 16/5 result stays flattened inline per the notation rule. Boxed
  green landing formula MD(x̄)=16/5=3.2 marks, closed with a red sanity-check
  line and a `checkD` stamp (per the kit's own guidance to prefer a drawn
  check over the fallback ✓ glyph). Hand-verified every number: deviations
  2,2,6,6,0 sum to 16, range 12, 3.2 ≤ 12. PASS both languages, eye-checked.
- **Sec 10** — worked_examples, JSON-flagged "speed trap": goals-per-match
  frequency table (x_i=0-4, f_i=4,6,8,5,2) builds as one 4-column worked
  table (x_i, f_i, f_i·x_i, f_i|x_i-1.8|) matching the source SVG's own
  layout, then rings each column's total (N=25, Σf_ix_i=45→x̄=1.8,
  Σf_i|x_i-x̄|=24.0) as its beat narrates it. The trap gets full staging per
  the maths spec's speed-trap rule: a red "24÷5=4.8 ✗" chip beside the
  correct green "24÷25=0.96 ✓" — the actual tempting wrong answer shown and
  crossed, not just described. All values hand-verified (f_i sum, f_i·x_i
  sum, each f_i|x_i-1.8| term, final 24/25=0.96). PASS both languages,
  eye-checked.
- **Sec 11** — worked_examples: two side-by-side before/after mini-demos
  using the same illustrative points (10,12,16, gaps 2,4) — LEFT shows the
  shift (-7) landing on 3,5,9 with gaps still 2,4 (arrows converge, since
  shift doesn't reorder), RIGHT shows the scale (×3) landing on 30,36,48
  with gaps 6,12 (arrows diverge, visibly stretching) — same starting data,
  two operations compared directly. Boxed green landings for both
  Range_new=|3|×40=120 and M.D._new=|3|×12=36. Kept the demo deliberately
  illustrative (not tied to unstated real bill amounts) since the section
  only gives range/M.D. summary stats, not raw data — verified the
  before/after gap arithmetic (2×3=6, 4×3=12) is correct regardless. PASS
  both languages on first render, eye-checked.
- **Sec 12** — worked_examples (JEE Advanced): the outside-in pairing proof
  that the median MINIMISES S(a)=Σ|x_i-a|, not just ties it. Real
  linear-scaled number line (7,11,13,16,20,24, true proportional spacing via
  `axisD`) with two nested Bezier pairing arcs (outer purple (7,24) gap 17,
  inner blue (11,20) gap 9) and the median interval [13,16] shaded amber
  directly on the axis — mirrors the source SVG's own diagram almost
  exactly, just rebuilt with real geometry instead of copied coordinates.
  Boxed green landing S(a)=17+9+3=29 (hand-verified: 24-7=17, 20-11=9,
  16-13=3). Closing red note lands the paper's actual payoff — the minimiser
  is an interval, not a point, so "how many a" is infinitely many. PASS both
  languages on first render, eye-checked (arc nesting and interval placement
  both confirmed correct, no crossing/overlap).
- **Sec 13** — worked_examples: daily-wages continuous distribution, same
  4-column worked-table pattern as Sec10 (x_i, f_i, f_i·x_i, f_i|x_i-x̄|),
  reused verbatim with new data — mid-points 150,250,350,450,550, f=6,10,14,
  8,2 (N=40), Σf_ix_i=13000→x̄=325, Σf_i|x_i-x̄|=3600→M.D.=90. All five
  f_i|x_i-x̄| terms hand-verified (1050,750,350,1000,450). Lighter-touch
  divisor note this time (plain red-margin line, no wrong/right chip pair)
  since the JSON doesn't flag this one as a speed trap the way Sec10 was —
  saves the dramatic staging for where the source actually calls for it.
  PASS both languages on first render, eye-checked.
- **Sec 14** — worked_examples: combines Sec7's interpolation pattern with
  Sec13's 4-column table pattern in one section. Text-only cumulative-
  frequency statement (matches the source's own choice — it's plain text in
  board_content, not a diagram, so no table built for that part), boxed
  interpolated median M=20+((20-15)/10)×10=25 via `<Frac>`, then the real
  table (mid-points 5,15,25,35,45; |x_i-25| and f_i|x_i-25| columns,
  Σ=430), boxed M.D.(M)=430/40=10.75 marks. Notably needs no `XBar`/
  `Overline` at all — the anchor here is the median M (a plain letter), not
  the mean x̄, so this section's formulas skip the drawn-overline machinery
  every worked example so far has needed. All five f_i|x_i-25| terms and
  the interpolation hand-verified. PASS both languages, eye-checked.
- **Sec 15** — tips, closes Subtopic 1: four boxed pitfall cards in a 2×2
  grid (card 1 red-bordered/red-text for the highest-severity slip —
  dropping the modulus — cards 2-4 amber for the normal-emphasis ones:
  wrong divisor, mean-vs-median for "least M.D.", shift-doesn't-change-
  spread), boxed green transformation rule, closing red sanity check with a
  `checkD` stamp. Caught a real box-overflow via eye-check the automated
  verifier couldn't see: card 2's third line baseline (163) sat past its
  own box's bottom edge (160) — the overlap/overflow gate only checks the
  canvas safe-area and text-vs-text collisions, not a text run spilling out
  of its own decorative rounded-rect, so this class of defect is eye-check-
  only. Fixed by merging to two lines and shrinking the aside to size 12.
  PASS both languages after the fix, re-eye-checked (all four boxes now
  clear their borders with margin).

## Subtopic 2 (Variance & Standard Deviation, secs 16-29)
- **Sec 16** — concept, opens Subtopic 2: mini before/after icon pair (hand-
  drawn V with a ringed sharp corner vs a smooth curveD-sampled U) sets up
  |deviation| vs (deviation)², a red-margin 3-item checklist for what
  squaring buys, boxed formula σ²=(1/n)Σ(x_i-x̄)². Main diagram: four squares
  sitting directly on a number line, side ∝ |deviation| so area ∝ deviation²
  (sides 10,10,20,100 px for deviations 1,1,2,10) — the far square is
  visibly ~100× the near ones' area, not just bigger, landing "one outlier
  blows up the average area" as a real geometric fact instead of an
  assertion. Labels "2²=4"/"10²=100" annotate the actual squares. PASS both
  languages on first render, eye-checked.
- **Sec 17** — concept: boxed σ=+√(σ²) (√ confirmed native to both fonts per
  the notation guide, no primitive needed), then reuses Sec1's two-row
  shared-mean dot-plot pattern almost verbatim for direct visual continuity
  — Batsman P (44,46,45,43,47, tight green cluster) vs Batsman Q
  (5,90,12,88,30, wild red spread), both genuinely averaging 45 (hand-
  verified: 225/5=45), one shared amber mean line through both rows. P's
  five dots sit close enough to visually merge into a cluster — a deliberate
  choice, not a defect, since that compression IS the "tight and dependable"
  point. PASS both languages, eye-checked.
- **Sec 18** — concept: "Height: σ=5cm ≠ Weight: σ=5kg" chip pair makes the
  units problem concrete before the fix. Boxed C.V.=(σ/x̄)×100 (simple
  single-term fraction, flattened inline per the notation rule despite high
  emphasis). Payoff diagram: two identically-sized outline bars, one with a
  chunky 20%-width red fill (±₹10 on a ₹50 item) and one with a hairline
  2px sliver (±₹10 on a ₹50,000 item, true proportional width would be
  0.04px — kept it a visible sliver rather than literally invisible so the
  contrast still reads, while the label carries "invisible") — the relative-
  spread point lands geometrically, not just asserted. PASS both languages,
  eye-checked.
- **Sec 19** — concept: chip-row contrast makes the structural fact visual —
  M.D. gets three green ticks (mean/median/mode all valid anchors),
  variance gets one green tick and two red crosses (only the mean is
  valid). Boxed σ²=0 ⟺ x_i=x̄ for every i. Closing pair of mini icons: a
  perfectly flat 4-point line (green, "flat → σ²=0") beside a genuinely
  jagged 4-point line (red, "wobble → σ²>0") — the zero-variance boundary
  case shown geometrically, not just stated. PASS both languages, eye-
  checked.
- **Sec 20** — concept, FLAGGED for extra scrutiny (shortcut-formula
  derivation): built as a genuine multi-line algebraic derivation, not a
  fade-in of the finished result — expand (x_i-x̄)² → split the sum into
  three pieces (with the "Σ distributes over +" justification stated) →
  substitute (1/n)Σx_i=x̄ and Σx̄²=nx̄² → combine -2x̄²+x̄²=-x̄² → land the
  boxed workhorse σ²=(1/n)Σx_i²-x̄². Hand-verified every algebraic step
  independently against the standard NCERT derivation before trusting the
  render — all correct, matches board_content's own LaTeX exactly. Continuation
  lines indent under the leading "=" the way a real board derivation does.
  PASS both languages; also checked the dedicated b6 frame directly (not
  just "final", which for English lands ~0.4s before beat 6 fires — an
  audio-duration artifact, not a scene defect, confirmed by the b6 frame
  itself rendering the closing note correctly).
- **Sec 21** — concept, a calculus proof built live: g(a)=(1/n)Σ(x_i-a)² →
  g'(a)=(1/n)Σ·2(x_i-a)(-1)=-(2/n)Σ(x_i-a) (chain rule) → set to zero →
  boxed green Σx_i=na ⇒ a=x̄. Independently re-derived and confirmed correct
  before trusting the render (Σ(x_i-a)=0 ⇒ Σx_i-na=0 ⇒ a=x̄). Closes with a
  two-chip "median → minimises Σ|x_i-a|" vs "mean → minimises Σ(x_i-a)²"
  parallel, connected by a plain "vs" — the same visual grammar as Sec19's
  anchor-comparison chips, reused for a genuinely different point (this
  time both are valid, just for different loss functions, not one right one
  wrong). PASS both languages, eye-checked via the dedicated b6 frame.
- **Sec 22** — concept: two `<Frac>` moments — the coding step d_i=(x_i-A)/h
  (compound numerator, textbook Frac case) and the boxed step-deviation
  formula σ²=h²[Σf_id_i²/N - (Σf_id_i/N)²], two side-by-side fractions
  inside brackets with the second one squared (the ² glyph is inherently a
  raised Unicode character, so it reads correctly as an exponent even
  placed as plain trailing text after the Frac, no manual y-offset needed).
  Red-margin note gives the h²-not-h guardrail real weight since the JSON
  flags it high-emphasis and the narration calls it "a classic error."
  PASS both languages, eye-checked (fraction layout and bracket/exponent
  placement both confirmed correct).
- **Sec 23** — formulas: 5-card recap grid (green for the three high-emphasis
  formulas — core variance+shortcut+SD, C.V.+transformation rule, and the
  red-margin close — amber for the two normal ones — frequency-distribution
  and grouped/coded variance), everything flattened inline (no `<Frac>`)
  since this is explicitly "restating for quick recall, not re-teaching"
  and the true stacked forms already had their moment in Sec7/8/22. Caught
  and fixed a real spacing defect via eye-check: chaining `σ = +√(σ²)` onto
  the end of a `FormulaRow` via the cursor-advance estimate left it visually
  butted against the preceding `x̄²` with no perceptible gap in both
  languages — the estimate wasn't wrong, just tight at that font size. Fixed
  by un-chaining it into its own independently-positioned `<T>` at a fixed
  x, which guarantees clearance regardless of estimate accuracy — the
  general lesson: don't chain unrelated formula fragments through one
  cursor when a fixed anchor is cheap and safer. PASS both languages after
  the fix, re-eye-checked.
- **Sec 24** — worked_examples: data 12,15,18,21,24 → x̄=(12+15+18+21+24)/5=
  90/5=18 (Frac, compound numerator). Table builds x_i/(x_i-x̄)/(x_i-x̄)²
  (deviations -6,-3,0,3,6 — total shown as 0, a free zero-sum check;
  squares 36,9,0,9,36 → Σ=90). Two green boxes side by side land σ²=90/5=18
  (units²) and σ=√18=3√2≈4.24 units. While authoring this one, a grep sweep
  turned up the raw-x̄-glyph bug fixed above (Sec13/15/20) — this section
  itself was written correctly from the start (XBar for the mean label,
  `x_bar` fallback in table headers). PASS both languages, eye-checked
  (every arithmetic value and the √18=3√2 simplification confirmed).
