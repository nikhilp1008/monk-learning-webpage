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
