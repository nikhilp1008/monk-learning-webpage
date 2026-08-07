# Ch14 (Math) · Probability — scene progress

Branch: premium-board-math14 · port 3037 · chapter_id 35830227-5b8e-5d97-a032-a5f775c28b07
Total sections: 43 (confirmed 43=43 against Supabase `lesson_sections`; JSON_LESSONS is stale
at 10 sections — ignore it per task brief). Full Supabase dump cached at
scratch/ch14/all_sections.json; scratch/ch14/dump.py <N> prints one section's board_content +
english narration for quick review.

THIS IS MATHS — read SCENE_AUTHORING_MATHS.md before base SCENE_AUTHORING.md before
math-kit.tsx. Chapter needs ZERO new math-kit primitives (already documented ahead of this run,
commit cbf5391): event algebra / addition-rule derivation = VennShade carve-ups like Ch1 Sec20/
Sec28; multi-outcome sample spaces (two dice, 36 pairs) = hand-placed T/Chip grid like Ch6's
counting-principle work; combinatorics reuses Ch6-7's nCr numeric/symbolic conventions.

NAMING: files M11Ch14SecN.tsx, component M11Ch14SecN; registered at END of index.ts:
  const M11CH14 = "35830227-5b8e-5d97-a032-a5f775c28b07";
  REGISTRY[`${M11CH14}:N`] = M11Ch14SecN;

Verify per section:
`PORT=3037 CHAPTER_ID=35830227-5b8e-5d97-a032-a5f775c28b07 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`
Done only on `VERDICT sec=<N>: PASS`. Eye-check every Venn shading against the actual event
algebra and every sample-space count against the real combinatorics.

## Subtopics
1. Sample Space & Events — secs 1–14
2. Probability of Events & the Axiomatic Approach — secs 15–28
3. Computing Probabilities (Combinatorial Methods, Multi-Event Addition, Odds) — secs 29–39
4. Formula Recap, two parts — secs 40–41
5. Cheat Sheet, two parts — secs 42–43

Sections 40-43 have NO segments_english/hinglish in Supabase (expected — TWO formula_recap +
TWO cheat_sheet sections, one pair per unit). Use board_content directly for all four; reveal
timestamps still come from board_reveal_at_english/hinglish.

Flagged for extra scrutiny (axiom-derivation / JEE Advanced): 13, 21, 22, 23, 27, 37.

## Log
- **Sec 1** — concept, opens the chapter: anchor contrast (cannot-predict ✗ /
  can-list ✓ chips) + 3 everyday-experiment chips, guardrail crosses out
  "2+3=5" (not random, no uncertainty) — erased once vocabulary starts.
  OUTCOME defined via a single "4" die-card, then the full die roster
  S={1..6} builds card by card (n(S)=6 chip), coin roster H/T below
  (n(S)=2), closing tagline ringed. PASS both languages, eye-checked via
  FORCE_SHOTS — die roster and ring both confirmed correct.
- **Sec 2** — concept: die roster reused from Sec1, cards 2/4/6 highlighted
  green (event A's scoop), formula A={2,4,6}⊆S / B={5,6}⊆S, guardrail chip
  "EVENT = SUBSET", roll-4-vs-roll-3 occurs/doesn't scenarios — all erased
  once the final payoff lands (beat 7): a real VennShade Venn (S box, circle
  A shaded, 2/4/6 inside, 1/3/5 outside). PASS both languages, eye-checked.
  Noted: Draw-erased rounded-rect highlights can leave a sub-2px residual
  dot at the path start (strokeLinecap round + dasharray-hide interaction)
  — invisible at normal scale, not verifier-flagged, same erase pattern as
  Ch6Sec1; not worth restructuring the erase mechanism for.
- **Sec 3** — concept: two-column mirror layout, LEFT = impossible event
  (empty circle "∅", die example "shows a 7" crossed red), RIGHT = sure
  event (circle "S (all 6)", die example "1-6" checked green), boxed
  formula "Impossible = ∅ / Sure = S" (split into two anchored T calls to
  dodge the SVG double-space-collapse bug), guardrail closes on outcome
  (1 dot) vs event (ringed dot-cluster). Clean PASS both languages, zero
  stalls, eye-checked.
- **Sec 4** — concept, single-canvas top/bottom split (no erasing needed):
  Assumption 1 (S complete) + guardrail chip + die roster missing "6"
  (dashed red "?" slot); divider; Assumption 2 (ordered pairs) + coin→die
  arrow building "(H, 4)" + guardrail "(H,4) ≠ (4,H)". Clean PASS both
  languages, zero stalls, eye-checked.
- **Sec 5** — concept: vocab (sample point ω, n(S)) + SIMPLE/COMPOUND
  contrast chips, ringed HIGH-emphasis "total events = 2ⁿ" (power-set
  callback to Ch1), "compound = 2ⁿ−n−1" formula, then a concrete coin
  (n=2) check: 4 event chips {∅,{H},{T},{H,T}}, cross the n+1 non-compound
  ones, ring the 1 survivor, landing "4−2−1=1 ✓". Clean PASS both
  languages, zero stalls.
- **Sec 6** — concept: direct reuse of Ch1Sec20's VennShade recipe-icon
  row — 4 columns (complement/union/intersection/difference), each a real
  shaded mini-Venn built on its own beat, captioned with the English-word
  translation ("A or B" = at least one, "A and B" = both, "A but not B").
  Guardrail chip closes on the or→∪/and→∩ translation habit. Clean PASS
  both languages, eye-checked — all 4 shadings confirmed correct.
- **Sec 7** — concept: definitions ladder (mutually exclusive / exhaustive
  / partition formulas stacked with plain-English captions), partition
  statement ringed amber, guardrail chip "needs BOTH conditions" — all
  erased once the payoff diagram lands (beat 7): two Venn panels side by
  side, left overlapping circles shaded (NOT mutually exclusive, red
  caption), right disjoint circles each shaded their own color (mutually
  exclusive, green caption). Clean PASS both languages, eye-checked.
- **Sec 8** — concept: 4-step procedure ladder (STEP 1-4 prefixed lines),
  ringed HIGH formula n(S)=m₁×m₂×⋯×mₖ, guardrail chip "list ≠ product" —
  erased for the payoff diagram (beat 7): coin→die tree, root splits to
  H/T, each fans via an arrow into a 6-card roster (H1-H6, T1-T6), closing
  "2×6=12 → n(S)=12" chip. One caught bug: heading wasn't gated to the
  erase group, collided with the tree's caption — fixed by adding it to
  `aOn`. Clean PASS both languages after fix, eye-checked.
- **Sec 9** — concept, closes the "concept" run of Subtopic 1 (worked
  examples start at Sec10): B1/B2 procedure lines, quantifier-trap
  guardrail with a real 2-coin roster (HH/HT/TH/TT) and three concrete
  subsets for "at least one"/"exactly one"/"at most one H", divider, then
  the relationship-testing checklist (mutually exclusive / exhaustive,
  each with a drawn checkmark) and a final guardrail chip that partition
  needs both tests together. Clean PASS both languages, eye-checked.

### Subtopic 2 begins — worked examples (secs 10-13)
- **Sec 10** — worked_examples, opens the worked-example run: NEW visual —
  a real 8-sector spinner (circleD + 8 pointOnCircle spokes + numbers 1-8
  placed clockwise from top, reusing Ch6's circular-permutation angle
  pattern). A={3,6} marked amber, B={6,7,8} green, sector 6 gets both
  (amber disc + green ring) — no pie-slice fill needed, just colored
  discs behind each number. Boxed A∩B={6}≠∅, guardrail "NOT mutually
  exclusive". Clean PASS both languages, eye-checked — spinner numbering
  and both A/B markings confirmed correct.
- **Sec 11** — worked_examples, JSON-flagged "Speed Trap": MCQ options
  row (i)-(iv), guardrail chip states the elimination method (hunt one
  counterexample, don't enumerate), options (i)/(iii)/(iv) crossed red
  with their overlap reasoning appended inline, survivor (ii) ringed
  green, final "Answer: (ii)" chip. Reused the MCQ cross-out+ring motif.
  Clean PASS both languages, eye-checked.
- **Sec 12** — worked_examples, THE section the task brief specifically
  called out: two-column layout, LEFT = full algebra ladder (n(S)=36,
  A={(1,6)...(6,1)} n(A)=6, C={(5,6),(6,5),(6,6)}, A∩C=∅, guardrail
  "event+complement always a partition"), RIGHT = the real 36-cell 6×6
  grid (columns=blue die, rows=red die, drawn as 7+7 gridlines not 36
  individual rects) with the sum=7 anti-diagonal shaded amber and the
  sum≥11 corner cluster shaded green — verified by hand that both
  shaded regions land on the algebraically correct cells (r+c=5 for A,
  r+c≥9 for C, 0-indexed) before trusting it. No erasing needed — algebra
  and grid coexist as the final notes photo. Clean PASS both languages,
  eye-checked, diagonal/corner placement confirmed correct.
