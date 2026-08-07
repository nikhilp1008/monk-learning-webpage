# Ch06 (Math) · Permutations and Combinations — scene progress

Branch: premium-board-math6 · port 3035 · chapter_id e8c7f4cb-b1a3-5c5e-99d7-4341c4618bb8
Total sections: 45 (confirmed 45=45 against Supabase `lesson_sections`; JSON_LESSONS is stale
at 10 sections — ignore it per task brief). Full Supabase dump cached at
scratch/ch06_math_sections.json (board_content, segments_english/hinglish,
board_reveal_at_english/hinglish, durations — refetch with scratch/get-ch06-math-sections.mjs
if session restarts).

THIS IS MATHS — read SCENE_AUTHORING_MATHS.md (esp. Notation §: nCr/nPr digit-placement rules,
numeric vs symbolic cases) before base SCENE_AUTHORING.md before math-kit.tsx. Reference
exemplar: M11Ch05Sec1.tsx in the sibling ~/Downloads/monk-scenes-math5 worktree (same repo,
Chapter 5 branch) — same naming/registration/PROGRESS pattern, copy the shape from there.
No new math-kit primitives needed for Ch06 (confirmed by spec) — circular permutations reuse
`pointOnCircle` at `2π/n` spacing; counting-principle boxes, stars-and-bars rows, and casework
are plain Draw/T/Chip layout.

NAMING: files M11Ch06SecN.tsx, component M11Ch06SecN; registered at END of index.ts:
  const M11CH06 = "e8c7f4cb-b1a3-5c5e-99d7-4341c4618bb8";
  REGISTRY[`${M11CH06}:N`] = M11Ch06SecN;

Verify per section:
`PORT=3035 CHAPTER_ID=e8c7f4cb-b1a3-5c5e-99d7-4341c4618bb8 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`
Done only on `VERDICT sec=<N>: PASS`. Eye-check every nCr/nPr rendering (digit placement) and
every counting diagram against the actual combinatorics — verifier catches collisions/overflow,
not wrong maths.

## Subtopics
1. Fundamental Principle of Counting & Factorial — secs 1–9
2. Permutations — secs 10–18
3. Combinations — secs 19–26
4. Total Selections / Stars & Bars — secs 27–34
5. Counting Applications & Advanced Tools — secs 35–43
6. Formula Recap (44) + Cheat Sheet (45)

Flagged for extra scrutiny (derivation sections): 13, 14, 21, 30, 31, 39, 40.

## Known pre-existing issue (not mine)
`npx tsc --noEmit` shows ~4 pre-existing errors in `src/app/learn/page.tsx` — unrelated
in-progress work from another team on this shared repo. Only my M11Ch06Sec*.tsx files must be
clean.

## Workflow notes
- **Erase-group bug found on Sec 1**: a custom outer `<g style={{opacity: cond?1:0}}>` wrapper to
  "erase" a whole earlier group is INVISIBLE to verify-scene.mjs's overlap check — it walks up via
  `el.closest("g.sc-fade")`, i.e. only the nearest `Fade` component's own opacity, not an arbitrary
  ancestor. Fix: bound each element's own `on` prop to its beat window instead (e.g.
  `on={beat >= 0 && beat < 4}` rather than `on={beat >= 0}` inside an opacity-wrapped div) — erasure
  then reads correctly to the verifier AND correctly restores on seek-back. Use this pattern for
  every "erase old group, reuse the space" beat in this chapter.

## Done
- Sec 1 — Multiplication Principle (thali counter 4×3×2=24, branching tree with abbreviated
  branches, "AND → multiply" guardrail, 6-char password 2bn+ punchline). VERDICT PASS both langs.
- Sec 2 — Addition Principle: AND vs OR (separate-piles 4+2=6, AND/OR comparison table with
  fan-icon vs separate-dots icon, VennShade double-counting warning). VERDICT PASS both langs.
- Sec 3 — Factorial notation n! (5 trophies filling slots 5×4×3×2×1=120, 5!=120, n! general
  formula, 0!=0 crossed out for 0!=1, valid-domain number line). VERDICT PASS both langs.
- Sec 4 — Core formulas toolkit + repetition fork (AND/OR/factorial/recursion recap, new nʳ
  repetition-allowed idea contrasted with Sec3's shrinking slots, 3-way decision card, factorial
  growth sanity check). VERDICT PASS both langs.
- Sec 5 — Proof of Multiplication Principle + why 0!=1 (box-filling/independence fan-line proof,
  independence guardrail, generalization to n!, full 0!=1 algebra). VERDICT PASS both langs.
  (Delegated secs 3-5 to subagents per the reusable prompt pattern below — main session verifies
  independently with tsc+verify-scene.mjs and eyeballs screenshots before committing.)

- Sec 6 — When independence breaks (3-digit numbers from {0,1,2,3}, no leading zero: reflex
  4×3×2=24 crossed out, correct 3×(3×2)=18, rule: reorder or split into cases). PASS both langs.
- Sec 7 — Worked examples: ID codes (26×10×10×10=26,000, repetition-allowed slots) + breakfast
  AND/OR mix (3+(4×5)=23, bracket AND-groups before adding). PASS both langs.
- Sec 8 — Worked examples: even 4-digit numbers (9×10×10×5=4500) + complementary counting for
  "at least one 9" (nested universe-box diagram, 90,000−52,488=37,512). PASS both langs.
- Sec 9 — Pitfalls & pro-tips, closes Subtopic 1 (6-card notes-page recap: AND/OR confusion,
  repetition-by-default, leading-digit double exclusion, 0!=0→0!=1, overlapping OR, "at least
  one"→Total−none). PASS both langs.

**SUBTOPIC 1 COMPLETE (secs 1-9).** Pushed through Sec9 (2026-08-06).

Delegation pattern that's working well: for each section, dispatch one `general-purpose` Agent
with (1) required-reading pointers, (2) the erase-group gotcha verbatim, (3) the section's full
board_content/reveals data with LaTeX pre-translated to plain-text guidance, (4) explicit math
verification of every formula so the agent isn't inventing numbers, (5) instruction to iterate
verify-scene.mjs to PASS and NOT commit. Main session then independently re-runs tsc + verify
(trust but verify), reads the file and 2-3 FORCE_SHOTS screenshots, then commits.

- Sec 10 — Order matters, starts Subtopic 2 (staggered podium vs flat study-group card, enumerates
  all 6 orderings of ABC, lands 3!=6, closes with "permutation=positions, combination=committee").
  PASS both langs.
- Sec 11 — Four flavours of permutation (2×2 reference grid: nPr/nʳ/divide-out/(n-1)!, SAMOSA's
  repeated letters flagged, curved-bolted-chairs-is-still-linear trap). PASS both langs.
- Sec 12 — The permutation formulas (nPr both forms + 3 boundary cases, nʳ recap, alike-objects
  formula with live SAMOSA check =180, circular (n-1)! vs flippable (n-1)!/2, bridge-to-
  combinations preview, sanity tip). All nPr/nCr correctly symbolic plain-text (variables, not
  numbers). PASS both langs.
- Sec 13 [FLAGGED] — Derive nPr=n!/(n-r)! (box-fill setup, honest falling-product milestone,
  "multiply/divide by missing tail (n-r)!" shown as real algebra, bracket merges numerator to n!,
  genuine 2-line stacked fraction landing via T+Draw+T). PASS both langs.
- Sec 14 [FLAGGED] — Derive alike-objects (n!/p!, tagged-rows-collapse visual) and circular
  ((n-1)!, pointOnCircle X/Y/Z concrete n=3 check tied to general n!/n algebra) formulas, plus
  flippable/2 guardrail. PASS both langs.
- Sec 15 — Restricted permutations + bridge to combinations (TOGETHER glue-block 4!×2!=48, NOT
  TOGETHER fill-gaps 3!×⁴P₂=72, FIXED-position rule, unmissable 48+72=120=5! consistency check,
  nPr=r!·nCr bridge preview). Numeric ⁴P₂ correctly super/subscripted. PASS both langs.

- Sec 16 — Worked examples: committee posts (⁸P₃=8!/5!=336, falling-count slots) + SAMOSA trap
  (6!/(2!·2!)=180, reflex 6!=720 crossed out beside the correct answer). PASS both langs.
- Sec 17 — Worked examples: even-number parity (2×⁴P₃=48, units-first) + circular gap method
  (5 boys circle=(5-1)!=24, exactly 5 gaps via pointOnCircle, 3 girls ⁵P₃=60, 24×60=1440).
  PASS both langs.
- Sec 18 — Pitfalls & pro-tips, closes Subtopic 2 (6-card recap: order-confusion swap-test,
  alike-objects division missed, circular slips, repetition fork missed, restriction reflex
  missed, "fix one object" pro-tip). PASS both langs.

**SUBTOPIC 2 COMPLETE (secs 10-18).** Both flagged derivations (Sec13 nPr, Sec14 alike/circular)
handled with full rigor — every algebraic step shown, math independently verified. Pushed through
Sec18 (2026-08-06).

- Sec 19 — Order doesn't matter, combination intro (Subtopic 3 starts). Mirrors Sec10: cricket
  team anchor, "ORDER DOESN'T MATTER" guardrail, 4-point/6-edge complete-graph diagram (⁴C₂=6),
  ⁹P₂=72 vs ⁹C₂=36 contrast, nCr=nPr/r! intuitive preview. PASS both langs.
- Sec 20 — The combination formula and its properties (nCr both forms, 4 boundary cases,
  symmetry property with same-pool choose/reject dot diagram, Pascal's rule stated-not-proved,
  r=s-or-r+s=n corollary, ¹²C₁₀=¹²C₂=66 shortcut). PASS both langs.
- Sec 21 [FLAGGED] — Derive nCr and symmetry (SELECT→ORDER bridge → real algebra → n!/(r!(n-r)!);
  bijective symmetry proof: one row of 7 dots, 5 turn green + 2 turn red simultaneously — same
  act, two names — closes with verified ⁷C₅=⁷C₂=21). PASS both langs.

Pushed through Sec21 (2026-08-06).

- Sec 22 — Pascal's rule + selection under constraints (bijective IN/OUT proof: n+1 objects, one
  starred, forks into IN (nC(r-1)) vs OUT (nCr) — mutually exclusive & exhaustive callback to
  Sec2 → add; must-include-k / must-exclude-k toolkit). PASS both langs.
- Sec 23 — Dividing objects into equal unlabelled groups (labelled telescoping product → n!/(m!)^g,
  relabelling-collapse over-counting insight → ÷g!, verified 12 books/3 groups of 4 = 5,775,
  unlabelled-piles-vs-named-recipients guardrail). PASS both langs.
- Sec 24 — Worked examples: sub-committee (¹¹C₄=330) + team-vs-posts trap (⁶C₃=20 vs ⁶P₃=120,
  explicit ×3! arrow bridging them). PASS both langs.
- Sec 25 — Worked examples: two independent categories (⁷C₂×⁵C₂=210) + "at least 3 women"
  3-case sum (560+120+6=686), closing "3 cases either way" complement-isn't-always-shorter
  lesson. PASS both langs.
- Sec 26 — Pitfalls & pro-tips, closes Subtopic 3 (order confusion, forgetting ÷r!, at-least
  case-slips, forgetting ÷(equal groups)!, ⁵⁰C₄₈=⁵⁰C₂=1225 symmetry shortcut, "in or out?"
  heuristic). PASS both langs.

**SUBTOPIC 3 COMPLETE (secs 19-26).** Flagged derivation Sec21 (nCr + bijective symmetry proof)
handled with full rigor. Pushed through Sec26 (2026-08-06). 26/45 sections done.

- Sec 27 — Tool 1: total selections, starts Subtopic 4 (binary take-or-leave string, subsets=2ⁿ,
  at-least-one=2ⁿ−1, distinct-vs-identical guardrail sets up stars & bars). PASS both langs.
- Sec 28 — Tool 2 (stars & bars model, concrete r=5/n=3 fruit example ★★|★|★★, deliberately no
  formula yet) + Tool 3 (grouping vs distribution, bundles-vs-children). PASS both langs. Caught
  a real bug: `Draw fill={COLOR}` is NOT gated by `on` (only strokeDashoffset animates) — wrap
  filled shapes in `<Fade>` instead.
- Sec 29 — Selections/stars&bars/distribution formula reference board (8 formulas, 3 erase
  groups: 2ⁿ+alike-mixed; (n+r-1)C(r) stars&bars + integer-solution counts; grouping n!/(m1!m2!..)
  + kⁿ distinct-into-boxes + "give one to each first" guardrail). PASS both langs.

Pushed through Sec29 (2026-08-07). 29/45 sections done.

- Sec 30 [FLAGGED] — Full bijection proof of stars & bars (concrete r=6,n=4 example with the
  empty-block subtlety ringed and verified; two-directional bijection; symmetry-connected
  (n+r-1)C(n-1)=(n+r-1)C(r); twin reading chain; give-one algebra x1+..+xn=r -> y1+..+yn=r-n).
  PASS both langs.
- Sec 31 [FLAGGED] — Justify 2ⁿ (real chain of "2" boxes multiplying, FPC) and the grouping vs
  distribution rule (fresh 6-books/Asha-Ravi example, distinct from Sec23's, both /2!-present and
  /2!-crossed-out computations shown: 10 vs 20). PASS both langs.

Both flagged derivations in Subtopic 4 complete. Pushed through Sec31 (2026-08-07). 31/45 done.

- Sec 32 — Worked examples: 5 distinct keychains (2⁵−1=31) + fruit trap (3 red+2 green identical
  +1 orange distinct, 4×3×2−1=23, wrong "all distinct" reflex 2⁶−1=63 crossed out). PASS both langs.
- Sec 33 — Worked examples: non-neg a+b+c+d=12 (¹⁵C₃=455) + lower-bound chocolates (4 smiley
  children each visibly get 2, running tally 2/4/6/8, 15−8=7 remain → ¹⁰C₃=120). PASS both langs.
- Sec 34 — Pitfalls & pro-tips, closes Subtopic 4 (distinct-vs-alike mixups, wrong repetition
  model, "identical into distinct boxes" recognition cue, division-vs-distribution, forgetting
  the empty case, pre-give-the-minimum pro-tip). PASS both langs.

**SUBTOPIC 4 COMPLETE (secs 27-34).** Both flagged derivations (Sec30 stars&bars bijection proof,
Sec31 justify 2ⁿ + grouping rule) handled with full rigor. Pushed through Sec34 (2026-08-07).
34/45 sections done — Subtopics 1-4 all complete, only Subtopic 5 (Counting Applications &
Advanced Tools, secs 35-43) and the closing Formula Recap/Cheat Sheet (44-45) remain.
