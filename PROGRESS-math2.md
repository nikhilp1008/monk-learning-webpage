# Class 11 Maths — Chapter 2 "Relations and Functions" — Progress

- Branch: `premium-board-math2` · Worktree: `~/Downloads/monk-scenes-math2` · Port: `3031`
- chapter_id: `e38cf062-e572-52f4-9099-eaf6ee0f7b27` (subject `mathematics`, class_level 11)
- Naming: `M11Ch02SecN.tsx` / component `M11Ch02SecN`; registered at END of `index.ts` as
  `const M11CH02 = "e38cf062-e572-52f4-9099-eaf6ee0f7b27"; REGISTRY[`${M11CH02}:N`] = M11Ch02SecN;`
- Data source: Supabase `lesson_sections` directly (JSON_LESSONS is a stale 10-section outline — ignored).
  Sections 27–28 have no `segments_*` (recap/cheat-sheet types) — use `board_content` text directly.
- 28 sections confirmed clean (real audio, real reveal timing, no placeholders).

## Subtopic map
- 1–9   Cartesian Product of Sets
- 10–16 Relations
- 17–26 Functions
- 27–28 Chapter Summary

## Model tiering
Sonnet for all — flag Sec 2, 5, 6 ("Proof" sections) and any section with real
graph-reading geometry (15, 18, 21, 22, 25) for an extra eye-check pass.

## Done
(append one line per finished section, in order)
- Sec 1 "Ordered pairs: position carries meaning" — chai-stall anchor (sizes×flavours,
  6 cups grid) / (a,b) definition with coordinate-slot arrows / swap-slots guardrail
  ringed red / cricket scoreline reinforcement / iff formula / a=b special case. PASS.

- Sec 2 "The Cartesian product A × B and the grid picture" — formula built term by
  term, hand-placed 3×2 grid (A up the side, B along the bottom, 6 green meeting
  points labelled), A×B vs B×A contrast, guardrail, R×R=plane. Eye-checked. PASS.

- Sec 3 "Boundary rules: empty sets, infinity, and when A×B=B×A" — A×B=∅ iff
  formula, shelf analogy (empty shelf → 0 pairs), mini R×R axes with scattered
  points (uncountable), duplicate-element strip-before-counting, A×B=B×A iff A=B,
  subset-not-enough guardrail. Eye-checked. PASS.

- Sec 4 "The counting toolkit" (formulas type) — growing formula sheet: n(A×B)=pq,
  membership test, n-fold product + n(A^m), n-tuples/R³ caption, boxed 2^pq subsets,
  bridge note (subset→relation), distributivity + boxed star identity. PASS.

- Sec 5 "Proof that n(A×B)=mn — the slicing argument" — vertical stack of "slice"
  bands (a₁×B, a₂×B muted, aᵢ×B highlighted with actual pair-list), two-step
  reasoning chips, disjointness formula, boxed mn conclusion, multiplication-
  principle insight. Eye-checked incl. mid-beat frame. PASS.

- Sec 6 "Proof of distributivity + recovering A,B from A×B" — biconditional-chain
  proof drawn as a branch-and-converge tree (duplicate x∈A onto both branches,
  visually forking then landing green), divider + second sub-heading, 3-step
  recovery procedure with boxed sanity-check formula. Eye-checked. PASS.

- Sec 7 "Worked: writing A×B, common-pairs speed trick" — Ex1 lists A×B/B×A with
  first pair color-highlighted (amber/green) to show the shape flip + witness-pair
  verification; Ex2 JEE speed trap stages "0?" crossed out before landing the star-
  identity boxed answer 4; guardrail on unequal-products-can-still-overlap. PASS.

- Sec 8 "Worked: recovering A from A×A, divisibility counting" — Ex3 deduces
  n(A)=4 then A={1,2,3,4} from two given pairs, boxed 2^15 subset-count with
  "always in" explanation; Ex4 floor-sum divisibility count (⌊6/x⌋ terms, native
  fallback glyphs) landing 14, then inclusion-exclusion to 22 with diagonal-
  overlap reasoning. PASS.

- Sec 9 "Pitfalls and speed moves — Cartesian product" — sum-vs-product trap
  (crossed), every-with-every green confirm, (a,b) vs (b,a) amber tip, subset-
  formula green box with the two common wrong forms noted, two-stage habit +
  empty-set shortcut, and the two red speed-move formulas. PASS.

**Subtopic 1 (Cartesian Product of Sets, Sec 1-9) — COMPLETE.**

- Sec 10 "A relation is a highlighted slice of A×B" — first Relations section,
  introduces the arrow-diagram representation (circleD sets + arrowD mapped
  pairs): A={Riya,Aman,Sara}→B={101,102,103}, 3 of 9 pairs chosen = R. PASS.

- Sec 11 "Domain, range, codomain" — arrow diagram A={1,2,3,4}→B={3,4,5,6,7} via
  y=x+2 (4 correct arrows, "7" ringed red as unreached codomain element),
  reached-vs-allowed guardrail, three-forms/extremes/relation-on-A recap lines.
  Eye-checked geometry against the math (range={3,4,5,6} exactly). PASS.

- Sec 12 "Relation formulas" (formulas type) — Dom(R)/Range(R) set-builder defs,
  codomain=B always, boxed headline count 2^pq, on-A/non-empty corollaries,
  power-of-two chant insight. PASS.

- Sec 13 "Procedures: rule↔roster, why 2^pq" — three divided procedure blocks:
  Rule→Roster (filter+guardrail+domain/range readout), Roster→Set-builder
  (pattern-spot+verify-both-ways), Why 2^pq (boxed 2×2×...×2, factors label
  substituting for underbrace per notation spec, independent-choice insight). PASS.

- Sec 14 "Worked: roster form y=x+2, counting relations" — Ex1 six filter chips
  (4 green kept, 2 red discarded for escaping A) building the boxed roster,
  domain/range/codomain, "in A but not domain" guardrail; Ex2 JEE speed trap
  boxed 2^12=4096/4095 with both wrong reflexes named. PASS.

- Sec 15 "Worked: lattice points on a circle, forced-pair counting" — Ex3 real
  CartesianAxes+circleD graph of x²+y²=25 with all 12 lattice points plotted
  exactly on the circle (verified geometry: (0,±5),(±5,0),(±3,±4),(±4,±3));
  Ex4 complement-counting to 448 with forced-pair guardrail. Eye-checked. PASS.

- Sec 16 "Pitfalls and speed moves — relations" — D-L/R-R swap guardrail,
  codomain-vs-range amber chip, pq-vs-2^pq + phantom-pairs line, boxed forced-
  pair formula, complement speed move, closing mantra. PASS.

**Subtopic 2 (Relations, Sec 10-16) — COMPLETE.**

- Sec 17 "A function is a relation with two promises" — first Functions section,
  three side-by-side arrow diagrams (valid / dead-button ringed / two-arrows-
  from-a ringed) making both promises visually falsifiable, boxed formal
  definition, dabbawala analogy, function⊂relation guardrail. Eye-checked. PASS.

- Sec 18 "y=f(x) and the vertical line test" — real dual-graph demo: parabola
  y=x² (green test line meets once → function) vs circle x²+y²=25 (red test
  line meets twice at correct symmetric points → not function), companions
  sharpened for functions, guardrail. Eye-checked geometry. PASS.

- Sec 19 "Fine print: single-valued roots, natural domain, equality" — √x
  non-negative-only with ± crossed out (fixed a spacing bug where the cross-out
  ran into the next word), many-to-one/one-to-many line, natural domain R−{0},
  boxed f=g equality formula, same-rule-different-domain guardrail,
  real-valued vs real-function distinction. PASS.

- Sec 20 "Counting functions (q^p) and algebra of real functions" — boxed q^p
  count with contrast-to-2^pq note, pointwise algebra (f±g, fg, αf), quotient
  with g(x)≠0 caveat, boxed domain-bookkeeping formula, base-exponent chant. PASS.

- Sec 21 "Standard functions I" — four real mini-graphs in one row (identity 45°
  line, constant horizontal line, modulus sharp V, polynomial rounded parabola),
  each with domain/range read off by inspection, projection-trick caption,
  rational-function domain caveat, fingerprint guardrail. Eye-checked all 4
  shapes distinct and correct. PASS.

- Sec 22 "Standard functions II: signum, greatest integer" — StepFunction-based
  signum (open/open at 0, closed dot at origin, verified 3-piece jump) and
  greatest-integer 5-step staircase (every step correctly closed-left/open-
  right, ascending bottom-left to top-right), rounding-toward-−∞ guardrail,
  general graph-reading skill, JEE fractional-part note. Eye-checked all dots. PASS.

- Sec 23 "Worked: is it a function? counting functions" — Ex1 two-chip promise
  checklist landing "R IS a function" verdict, Domain/Range readout, codomain-
  not-range guardrail (7); Ex2 boxed q^p=4^3=64 with all three named wrong
  reflexes (2^12, 3^4 swap, 3×4). PASS.

- Sec 24 "Worked: natural domain √(x-2)/(x-5), algebra of f,g" — Ex3 real number
  line (closed dot at 2, open dot at 5, verified correct) landing boxed
  [2,5)∪(5,∞), x=2-stays subtlety; Ex4 Dom(f)=R/Dom(g)=[-2,2] then boxed
  Dom(f/g)=(-2,2) both-endpoints-punched. PASS.

- Sec 25 "Worked: graph reading f(x)=|x-2|" — real shifted-V graph (vertex
  verified at (2,0)), f(5)=3 and x=-1 marked as green dots exactly where the
  red y=3 line crosses each arm — algebra and picture agree visually. PASS.

- Sec 26 "Pitfalls and speed moves — functions" — inputs-not-outputs guardrail,
  many-to-one/one-to-many reminder, counting-swap trap, strict/non-strict domain
  conditions, boxed quotient-domain formula, signum-vs-modulus range guardrail. PASS.

**Subtopic 3 (Functions, Sec 17-26) — COMPLETE.**

- Sec 27 "Formula recap: the complete chapter toolkit" (formula_recap type, no
  segments as expected) — 7-row dense ledger covering ordered pairs through
  standard-function ranges, boxed for the 3 "high emphasis" counting formulas. PASS.

- Sec 28 "Cheat sheet: rapid recall for the whole chapter" (cheat_sheet type, no
  segments as expected) — FINAL section. All the chapter's mnemonics compiled:
  order-is-sacred, boxed pairs/relations/functions counting trio, D-L R-R,
  function definition + VLT + strict/non-strict, margin note on recovering A
  and common-pairs formula, standard ranges, closing mantras. PASS.

**Subtopic 4 (Overview & Main Topics, Sec 27-28) — COMPLETE.**

## CHAPTER COMPLETE — all 28/28 sections authored, verified PASS, and committed.

Summary: 9 Cartesian Product sections, 7 Relations, 10 Functions, 2 chapter-summary
recaps. 6 sections used real function/circle/step graphs (CartesianAxes, circleD,
curveD, StepFunction) — all eye-checked for correct shape/geometry. 3 "Proof"
sections (2, 5, 6) rendered as visual proofs (grid-slicing diagram, branch-
and-converge tree) rather than plain formula walls. Every worked-example speed
trap staged the wrong answer crossed out before landing the correct one. No
blackboard-bold glyphs used anywhere; all notation followed the audited
fallback-glyph list. One bug found and fixed during authoring (Sec 19: a
cross-out overlapping the next word) — caught by eye-check, not the verifier.
