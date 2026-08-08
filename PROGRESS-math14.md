# Ch14 (Math) · Probability — scene progress

**STATUS: COMPLETE — all 43/43 sections done, verified, committed, pushed.**
This is the LAST chapter of Class 11 Mathematics — the subject is closed.
File count = registry count = import count = 43, no gaps (checked 1-43).
Full-project `npx tsc --noEmit` clean (zero errors, including the file
that previously had pre-existing unrelated errors in other chapters' work).
13-section live smoke test across all 4 subtopics + every flagged section
passed (SVG renders, no page errors). All 5 flagged sections (13, 21, 22,
23, 27, 37) eye-checked with extra care; the addition-rule derivation
(Sec22) and the JEE Main three-event worked example (Sec37) were verified
algebraically by hand against every rendered number before trusting them.

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
- **Sec 13** — worked_examples, FLAGGED (JEE Advanced abstract counting,
  hardest derivation in the subtopic): parts (a)/(b) recap 2ⁿ events /
  2ⁿ−n−1 compound (callback to Sec5), erased for part (c)'s full-canvas
  derivation — a 3-bin sorting visual (1 outcome → only-A/only-B/neither,
  ×n → 3ⁿ) then a staggered single-beat derivation: 3ⁿ−2ⁿ(A=∅)−2ⁿ(B=∅)+1
  (both ∅) = 3ⁿ−2·2ⁿ+1 ordered, ÷2 unordered, boxed HIGH final
  (3ⁿ−2ⁿ⁺¹+1)/2, sanity-checked n=2→1. Verified the algebra by hand
  before trusting it (inclusion-exclusion on A=∅/B=∅, matches narration).
  Clean PASS both languages, eye-checked carefully given the flag.
- **Sec 14** — tips, closes Subtopic 1: numbered-badge pitfall ladder
  (1-4: outcome≠event with an inline {4}✓/4✗ color pair via tspan,
  ME⇏exhaustive, mis-built S poisons events, ME≠independent Class-12
  warning), boxed formula clarifying ME is about sets not probabilities,
  amber HIGH pro-tip card closing on the "search not calculation" habit.
  Clean PASS both languages, eye-checked. **Subtopic 1 (Sample Space and
  Events, secs 1-14) complete.**

### Subtopic 2 begins — Probability of Events and the Axiomatic Approach (secs 15-28)
- **Sec 15** — concept, opens Subtopic 2: die roster (reused from Sec1/2)
  with evens 2/4/6 highlighted green, "3 good faces out of 6" caption,
  P(even)=3/6=1/2, ringed HIGH formula P(E)=n(E)/n(S), guardrail chip
  flagging the classical definition only holds for fair dice/well-shuffled
  cards (sets up Sec16's cracks). Simple fractions flattened inline per
  notation rules (no Frac primitive needed). Clean PASS both languages.
- **Sec 16** — concept: 3 stacked "CRACK N —" rows (equally-likely
  assumption, infinite outcomes, circularity), each with a concrete
  counterexample — a hand-drawn unequal-size circle pair for the
  drawing-pin (point-up small circle ≠ point-down big circle, NOT
  equally likely), a trailing "1,2,3,4,5,…→∞" for the infinite-outcomes
  crack, plain text for the circularity crack (equally likely = equally
  probable). Ringed amber closer sets up next section's axiomatic fix.
  Clean PASS both languages.
- **Sec 17** — concept: Euclid-axioms analogy + the "1 kg of sand" picture
  compact on top (erased at beat7), then the payoff diagram gets the full
  canvas — fair die (6 equal amber blobs, r=20, each "1/6") vs loaded die
  (6 unequal blobs radius-scaled to weight 1/12,1/12,1/6,1/6,1/4,1/4,
  which sums to 1), closing "both valid — no negative sand, total=1kg".
  New motif: probability-as-weighted-blob-size, not used before in this
  chapter. Clean PASS both languages, eye-checked — blob sizes correctly
  track the stated fractions.
- **Sec 18** — concept: 3 stacked caveats (finite S, additivity needs
  mutually exclusive, and the big one: P(E)=n(E)/n(S) is a special case
  not an axiom), then a compact counterexample continuing Sec17's loaded-
  die thread — "naive: P(face)=1/6" crossed red vs "actual: sum the sand
  → 1/4" green — closing guardrail chip. Clean PASS both languages.
- **Sec 19** — formulas, the chapter's foundational reference card: one
  boxed card (drawn once) with the three Kolmogorov axioms building
  inside it line by line (non-negativity, normalization, additivity),
  then the sample-point companion formulas below (P(ωᵢ)≥0, ΣP(ωᵢ)=1,
  ringed P(E)=ΣP(ωᵢ)), closing guardrail on the [0,1] "unit check". Σ
  with domain condition flattened as a trailing parenthetical per
  notation rules (no stacked-sigma primitive exists). Clean PASS both
  languages, eye-checked given this section anchors everything after it.
- **Sec 20** — formulas, a PREVIEW toolkit (JSON's own heading: "all
  derived next" — Sec21-23 prove these): 7 formula rows build one at a
  time, HIGH ones (the "not" law, general addition rule) in larger green
  text, the addition rule ringed. Inline captions via tspan for each
  formula's condition. Caught the same SVG whitespace-collapse bug as
  Sec3 on row1's 3-clause line — fixed by splitting into 3 separately
  positioned T elements (anchor start/middle/end) instead of relying on
  multi-space gaps. Clean PASS both languages after fix, eye-checked.
- **Sec 21** — formulas, FLAGGED (axiom derivation): three real proofs
  (R1 P(∅)=0, R2 the complement law, R3 the [0,1] bounds), each built as
  a vertically-stacked equality chain (line1 → line2 → boxed/ringed
  conclusion) rather than pasted whole — reuses the safe stacked-chain
  pattern from Sec13 instead of risky same-line term x-positioning.
  Verified the algebra by hand (R1 cancels P(S), R2 chains Axiom 3 into
  Axiom 2, R3 chains R2 through Axiom 1) before trusting it — matches
  narration exactly. Clean PASS both languages, eye-checked carefully.
- **Sec 22** — formulas, FLAGGED, THE central derivation the task brief
  explicitly named: two-column layout, LEFT = the real VennShade
  carve-up (green = ALL of A via include:[A], amber = B−A via
  include:[B] exclude:[A] — genuinely disjoint regions, not
  hand-approximated), a red ring later marks the lens A∩B, RIGHT = the
  algebra chain (A∪B=A∪(B−A) → Axiom 3 → carve B → substitute), landing
  the HIGH boxed P(A∪B)=P(A)+P(B)−P(A∩B), closing caption+arrow
  explaining the double-count. Clean PASS both languages, eye-checked
  very carefully given both the flag and the brief's explicit callout —
  shading regions confirmed algebraically correct.
- **Sec 23** — formulas, FLAGGED, last of the three derivation sections:
  n(S)·p=1⇒p=1/n(S) then ringed HIGH P(A)=Σp=n(A)/n(S), sanity-checked
  with 6 uniform sand blobs (reusing Sec17's motif) — one ringed to show
  a single-point event gives p=1/n(S) (=1/6 for a die), closing guardrail
  that this is a THEOREM not a definition. Verified the algebra by hand
  (normalization ⇒ uniform p, summed over n(A) points) before trusting
  it. Clean PASS both languages, eye-checked. **Derivation trio (Sec21-23)
  and Subtopic 2's axiomatic core (Sec15-23) complete.**
- **Sec 24** — worked_examples: 12-marble grid (row1=4 red actual RED,
  row2=5 green actual GREEN, row3=3 blue — house palette has no blue, so
  per the notation rule blue uses INK fill + white "B" letter to
  disambiguate). Amber ring isolates red for P(red)=1/3, red crosses kill
  the 3 blue for P(not blue)=3/4, green ring wraps rows1+2 for P(red or
  green)=3/4, guardrail chip confirms both 3/4 answers describe the same
  9 marbles. Clean PASS both languages, eye-checked.
- **Sec 25** — worked_examples, JSON-flagged "Speed Trap" (second MCQ,
  reuses Sec11's cross-out+ring motif): 4 candidate probability
  assignments, guardrail states the 2-axiom test (≥0 and sum=1), (ii)
  crossed for a negative value, (i)/(iv) crossed for wrong sums, (iii)
  ringed green with a boxed HIGH conclusion. Clean PASS both languages.
- **Sec 26** — worked_examples: Venn diagram carries real numeric region
  values (lens 0.3, A-only 0.3, B-only 0.2, outside 0.2 — sums to 1.0 ✓),
  outside region fills in exactly when P(A′∩B′) is derived on the right
  column, syncing the visual to the algebra. Three linked questions
  (union, exactly-one with a cross-check, De Morgan neither) plus a
  guardrail naming the JEE Main "addition rule → complement" pattern.
  Fixed a same-color-on-same-background contrast issue (region labels
  were AMBER_DARK on an AMBER_DARK-tinted union) by switching to INK.
  Clean PASS both languages, eye-checked.

### Subtopic 2's worked examples (Sec24-27) complete — last flagged section done
- **Sec 27** — worked_examples, FLAGGED, the capstone the whole subtopic
  built toward: loaded die P(k)=k/21 (verified Σk=21 for k=1..6), ringed
  HIGH formula, guardrail that n(A)/n(S) is wrong here, P(prime)=10/21,
  addition-rule P(E∪G)=17/21 cross-checked by direct sand summation —
  all erased for the closing payoff: a real bar chart, 6 bars with
  height genuinely proportional to k (20px/unit, not just illustrative),
  each labeled k/21. Verified every fraction by hand before trusting it.
  Clean PASS both languages, eye-checked very carefully as the last
  flagged section. **All FLAG sections (13, 21, 22, 23, 27) done.**
- **Sec 28** — tips, closes Subtopic 2: numbered-badge pitfall ladder
  (1-4: n(A)/n(S) on unfair experiments, forgetting the overlap subtract,
  ME≠independent with both formulas contrasted, [0,1] range as a free
  check), amber HIGH pro-tip card previewing Sec30: P(at least one) =
  1−P(none). Same motif as Sec14. Clean PASS both languages. **Subtopic
  2 (Probability of Events and the Axiomatic Approach, secs 15-28)
  complete.**

### Subtopic 3 begins — Computing Probabilities: Combinatorial Methods, Multi-Event Addition and Odds (secs 29-39)
- **Sec 29** — concept, opens Subtopic 3: symbolic nPr/nCr (variables,
  not literal numbers) written as plain text per Ch6-7 convention — no
  attempt at superscript letter positioning. Two mirrored boxed columns
  (order matters → nPr=n!/(n−r)!, order doesn't matter →
  nCr=n!/(r!(n−r)!)), two guardrail chips (always ask "does order
  matter?" first; count n(E) and n(S) the same way). Clean PASS both
  languages.
- **Sec 30** — concept: ringed HIGH P(at least one)=1−P(none), worked on
  5 coin tosses (31/32), guardrail names the trigger phrase, closing
  payoff is a real probability bar (width=900px=1.0) — none's 1/32 slice
  is genuinely ~28px vs the ~872px "at least one" remainder, with a
  leader line to the thin slice's label since the slice itself is too
  narrow for inline text. Clean PASS both languages, eye-checked — the
  visual proportion lands the point without needing narration to explain
  it. **Subtopic 3 file/registry counts now match at 30.**
- **Sec 31** — concept: two-event recap + HIGH 3-event inclusion-exclusion
  formula + guardrail (alternating-sign pattern) + exactly-one callback,
  all erased for the payoff: a real 3-circle Venn (A/B/C in the classic
  triangular arrangement) with VennShade's clip-path composition shading
  the TRUE triple intersection (include:[A,B,C]) — not hand-approximated,
  the small center lens computed by the browser exactly where the three
  circles genuinely overlap. Color-coded formula recap beside it (ink
  singles, red pairs, green triple). No purple available in house
  palette (unlike the source SVG's 3-color scheme) — used circle
  outlines + one green shade instead. Clean PASS both languages,
  eye-checked — center region confirmed correctly positioned.
- **Sec 32** — concept: reuses Sec30's split-bar motif for odds — a real
  3:2 bar (green m-part wider than red n-part) landing P=m/(m+n)=3/5,
  guardrail on the m+n (not just n) denominator trap, then empirical
  probability with a concrete 37/50 example and a law-of-large-numbers
  guardrail. Clean PASS both languages.
- **Sec 33** — formulas, mid-chapter recap card (same stacked-row pattern
  as Sec20): 6 rows (counting P(E), ringed HIGH at-least-one, complement,
  2-event and 3-event addition, exactly-one), closing guardrail against
  mixing raw counts with probabilities. Clean PASS both languages.
- **Sec 34** — formulas, part 2 of the toolkit card: odds-to-probability
  both directions, ringed HIGH reverse conversion P(E)/(1−P(E))=m:n,
  empirical P_empirical(E)=f/N with law-of-large-numbers guardrail,
  closing HIGH guardrail on the two conversion directions. Used plain
  "P_empirical"/"P_classical" underscore text per the symbolic-subscript
  notation rule (fixed an initial draft that tried a dy-positioned pseudo
  subscript before catching it against the rule). Clean PASS both
  languages. **Subtopic 3's two toolkit cards (Sec33-34) complete.**
- **Sec 35** — worked_examples: 5 men (M) + 4 women (W) as circle icons,
  numeric nCr in real super/subscript digits (⁹C₃, ⁴C₂, ⁵C₁) per Ch6-7
  convention, green rings mark the selected 1 man + 2 women exactly when
  n(E) is computed, guardrail on combination-consistency. Clean PASS both
  languages, eye-checked.
- **Sec 36** — worked_examples: 12-bulb grid (2 rows × 6, 9 good green
  outlines + 3 defective red-filled), the 3 defective bulbs crossed out
  exactly at the "compute none defective" guardrail beat, numeric nCr
  (⁹C₄/¹²C₄) per convention, HIGH landing P(at least one)=41/55, closes
  contrasting the 3-term direct route against the 1-line complement
  trick. Clean PASS both languages.
- **Sec 37** — worked_examples, FLAGGED, the last flagged section: real
  numbers plugged into Sec31's 3-event formula (M/P/C subject
  probabilities), HIGH ringed landing =0.8, guardrail complement
  P(none)=0.2 — erased for the payoff: the same 3-circle Venn as Sec31,
  now with all 7 regions carrying real computed values (M-only=0.25,
  P-only=0.10, C-only=0.10, M∩P=0.15, M∩C=0.05, P∩C=0.10, triple=0.05).
  Verified every region by hand (inclusion-exclusion on each pairwise/
  single probability) before trusting the diagram — sum=0.80 matches
  P(M∪P∪C) exactly. Clean PASS both languages, eye-checked very
  carefully as the final flagged section — all 7 values confirmed
  landing in their geometrically correct regions. **All FLAG sections
  (13, 21, 22, 23, 27, 37) now complete.**
- **Sec 38** — worked_examples, closes Subtopic 3's worked examples:
  part (a) odds-against 4:3→P(win)=3/7, part (b) empirical 130/200=13/20
  and odds-in-favour 13:7, payoff bar reuses the split-bar motif but as
  7 individual equal segments (3 green win + 4 red not) matching the
  narration's "seven equal parts" framing, HIGH guardrail on the classic
  odds-against direction trap. Clean PASS both languages.
- **Sec 39** — tips, closes Subtopic 3: numbered-badge ladder (1-2 HIGH:
  mixing ordered/unordered counts, odds≠probability; 3-4: forgetting
  +triple, enumerating instead of complement), amber HIGH pro-tip card
  (order first, then the "at least" trigger — two reflexes), closing
  caption. Same motif as Sec14/28. Clean PASS both languages. **Subtopic
  3 (Computing Probabilities, secs 29-39) complete — all 4 formula/tips
  subtopics of the whole chapter now done (39/43).**

### Chapter closer begins — sections 40-43, a 4th sidebar unit "Overview & Main Topics"
- **Sec 40** — formula_recap (first of two, per task brief — this chapter
  has TWO recap + TWO cheat-sheet sections instead of the usual one
  pair): no segments_english/hinglish in Supabase (expected), all text
  from board_content directly. 2×3 boxed card grid (counting, 2ⁿ events,
  ME/exhaustive/partition, 3 axioms, ∅/bounds/complement, HIGH green-
  bordered classical formula), each card revealed on its own beat.
  Confirmed via the live sidebar that Sec40-43 form a genuine 4th
  subtopic unit ("Overview & Main Topics") distinct from the three
  numbered subtopics, which are now all marked complete. Clean PASS both
  languages, eye-checked.
- **Sec 41** — formula_recap (second of two): identical 2×3 card-grid
  geometry to Sec40, this time covering addition through odds (2-event
  and 3-event addition, exactly-one/neither, HIGH green at-least-one
  card, nPr/nCr counting, odds/empirical). Clean PASS both languages.
- **Sec 42** — cheat_sheet (first of two): noticed this section's own
  board_content is entirely type "note" style "red-margin" (unlike
  Sec40/41's type "formula"), so used a genuinely different visual
  register — a dense stacked list of 6 one-liners each with a drawn red
  margin-bar (literally matching the data's own "red-margin" style
  name) instead of forcing the boxed-card grid onto content that isn't
  actually multi-line formulas. HIGH lines (axioms, [0,1] sanity check)
  bolder and red. Clean PASS both languages, eye-checked.
- **Sec 43** — cheat_sheet (second of two), the LAST section of the
  chapter and of Class 11 Mathematics: same red-margin-bar list as
  Sec42, reframed as a decision cheat sheet (equally-likely YES/NO
  branch, order-matters YES/NO branch, "at least one" trigger, 2/3-event
  overlap rule, odds↔probability both directions, empirical→classical).
  Clean PASS both languages, eye-checked. **ALL 43 SECTIONS COMPLETE.**
