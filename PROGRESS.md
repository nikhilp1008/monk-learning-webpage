# Ch08 · Class 11 Chemistry — "General Organic Chemistry: Basic Principles & Techniques" — scene progress

Branch: premium-board-chem8 · port 3027 · chapter_id `15bf6c7a-ff09-5741-93b8-e48e8a915273`
52 sections total. Data source: Supabase `lesson_sections` (dumped to `scratch/ch08_sections.json`).
Naming: files `C11Ch08SecM.tsx`, component `C11Ch08SecM`, registered at END of `src/components/scenes/index.ts`
via `const C11CH08 = "15bf6c7a-ff09-5741-93b8-e48e8a915273"; REGISTRY[`${C11CH08}:M`] = C11Ch08SecM;`

Verify per section:
`PORT=3027 CHAPTER_ID=15bf6c7a-ff09-5741-93b8-e48e8a915273 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<M>`

This is ORGANIC chemistry — skeletal/condensed structures built bond-by-bond, hybridization,
IUPAC naming, isomer comparisons, and reaction mechanisms with curved electron-pushing arrows
(`curvedArrowD` from chem-kit.tsx), taught like a veteran 15-year chemistry lecturer per
SCENE_AUTHORING_CHEMISTRY.md.

## Subtopics
1. Foundations: Structure & Classification — secs 1–10
2. Hybridization & IUPAC Nomenclature — secs 11–20
3. Isomerism — secs 21–30
4. Reaction Mechanisms — Fundamental Concepts — secs 31–40
5. Purification, Qualitative & Quantitative Analysis — secs 41–50
6. Chapter Review & Cheat Sheet — secs 51–52

## Done
(updated as sections are verified PASS)

## Notes / gotchas
- No pre-existing chemistry scene files in this worktree — chem-kit.tsx primitives (bondD,
  doubleBondD, tripleBondD, wedgeD, hashD, ringD, curvedArrowD, ReactionArrow, LonePair,
  OrbitalBox, energyCurveD) are used here for the first time; following SCENE_AUTHORING_CHEMISTRY.md
  + SCENE_AUTHORING.md directly since there's no local exemplar to copy from.
- Ch08Sec*.tsx already exist in index.ts but belong to a DIFFERENT chapter_id
  (`39bfe6d1-bd93-5157-a29c-b8ee68c3676b`) — hence the `C11Ch08SecM` naming to avoid collision.
