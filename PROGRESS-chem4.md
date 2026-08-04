# C11 Chemistry Ch04 "Chemical Bonding and Molecular Structure" — scene progress

Branch: premium-board-chem4 · port 3023 · chapter_id `862ab5f0-4fa8-5e6f-98d5-74fe5b10ab8e`
Total sections: 38. Data source: Supabase `lesson_sections`, full dump cached at
`scratchpad/chem4_sections.json`; per-section printout via `scratchpad/sec.py <n>`.

Naming: files `C11Ch04Sec<N>.tsx`, component `C11Ch04Sec<N>`; registered at END of
`src/components/scenes/index.ts` under the `C11CH04` block (import + `REGISTRY[...]`
lines appended together, mirroring the Ch03 chemistry pattern).

Read `SCENE_AUTHORING_CHEMISTRY.md` FIRST for every section (domain layer — draw
Lewis structures bond by bond, curved arrows for mechanism, wedge/hash for VSEPR,
orbital boxes for MOT), then base `SCENE_AUTHORING.md` (canvas, beats, layout-plan
math, the dim/overlap rule — never draw over dimmed content, use free space or
fully remove old content, no scrolling), then `chem-kit.tsx` for the primitives.
This is the first chapter to actually exercise `chem-kit.tsx`.

Verify per section:
`PORT=3023 CHAPTER_ID=862ab5f0-4fa8-5e6f-98d5-74fe5b10ab8e node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`

## Subtopics
1. Kossel-Lewis Approach, Ionic & Covalent Bonds, and Dipole Moment — secs 1–10
2. VSEPR Theory, Valence Bond Theory & Hybridization — secs 11–19
3. Molecular Orbital Theory (MOT) & Hydrogen Bonding — secs 20–28
4. Coordinate Bonding, Back Bonding & Advanced Bond-Angle Concepts — secs 29–36
5. Chapter Close — secs 37–38

## Done
- Sec 1 — The octet rule and the two routes: generic atom shell icon (5 filled +
  3 empty dots, dashed red) → octet-rule chip → TRANSFER/SHARE fork cards →
  red-margin ionic/covalent split → Kossel/Lewis attribution chip → real Na (1
  dot) + Cl (7 dots) Lewis structures with a curved transfer arrow → Na⁺/Cl⁻
  swap (mutually-exclusive beat gating, no erase needed) with Cl's 8th dot
  pairing up → dashed electrostatic-attraction line → green verdict chip
  (ionic = a sale · covalent = a joint venture).

## Current
Subtopic 1 (Kossel-Lewis/Ionic & Covalent/Dipole, secs 1-10). Next: Sec 2.
