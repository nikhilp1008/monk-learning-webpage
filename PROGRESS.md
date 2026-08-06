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
