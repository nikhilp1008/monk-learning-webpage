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
- Sec 1 — why carbon owns a branch (Wohler urea synthesis drawn, tetravalent-C icon
  erasing into chain/branch/ring gaining a double bond + heteroatom tags, 3 skills,
  inorganic-exception caveat)
- Sec 2 — four pillars (tetravalence/catenation/π-bonds/isomerism 4-column cards + icons)
- Sec 3 — one molecule, four drawings (propan-1-ol: Lewis/condensed/bond-line/wedge-dash)
- Sec 4 — classify by skeleton then group (acyclic/cyclic decision tree, 4 anchors)
- Sec 5 — functional groups (7 group cards) & homologous series (alkane/ene/yne cards)
- Sec 6 — worked example: draw 2-methylbutane (CBSE) — condensed + bond-line + check
- Sec 7 — worked example: classify three rings (NEET) — pyridine/cyclohexane/naphthalene
- Sec 8 — worked example: ketone family (JEE Main) — propanone→butanone→pentan-2-one
- Sec 9 — worked example: read a bond-line ring (JEE Advanced) — cyclohexenol, C6H10O
- Sec 10 — pitfalls & pro-tips (Foundations) — 2x2 trap grid + speed pro-tip
- **Subtopic 1 (Foundations: Structure & Classification, Sec 1-10) COMPLETE**
- Sec 11 — hybridization why-not-on-paper — sabziwala bags analogy + 3-col progressive table
- Sec 12 — three hybridizations, three geometries — tetrahedral/trigonal/linear icons + stats
- Sec 13 — assign hybridization: count sigma bonds — SN lookup + propyne mini-example
- Sec 14 — nomenclature PIN-code — "3-hydroxybutanal" split into 5 colored slots
- Sec 15 — building a name: lock suffix first — seniority ladder + 5-step procedure
- Sec 16 — worked ex: name & hybridize (CBSE) — builds 3-hydroxybutanal from Sec 14
- Sec 17 — worked ex: count sp2 carbons (NEET) — but-3-en-2-one, forgotten-carbonyl trap
- Sec 18 — worked ex: name + property (JEE Main) — 2-methylbut-3-enoic acid, C2=sp3
- Sec 19 — worked ex: alkyne trap (JEE Advanced) — collinear H-C≡C drawn, wrong-end trap
- Sec 20 — pitfalls & pro-tips (Hybridization & Naming) — 5-card grid + 2 pro-tip banners
- **Subtopic 2 (Hybridization & IUPAC Nomenclature, Sec 11-20) COMPLETE**

## Notes / gotchas
- No pre-existing chemistry scene files in this worktree — chem-kit.tsx primitives (bondD,
  doubleBondD, tripleBondD, wedgeD, hashD, ringD, curvedArrowD, ReactionArrow, LonePair,
  OrbitalBox, energyCurveD) are used here for the first time; following SCENE_AUTHORING_CHEMISTRY.md
  + SCENE_AUTHORING.md directly since there's no local exemplar to copy from.
- Ch08Sec*.tsx already exist in index.ts but belong to a DIFFERENT chapter_id
  (`39bfe6d1-bd93-5157-a29c-b8ee68c3676b`) — hence the `C11Ch08SecM` naming to avoid collision.
- Never nest a `<Draw>` inside a `<Fade>` with a shorter delay than the Draw's own —
  the stroke pops in fully-drawn instead of animating. Give `Draw` its own delay
  directly; only wrap it in `Fade` when the Fade's delay ≤ the Draw's delay.
- For an "aromatic ring" inscribed circle, do NOT fake a circle with a single SVG
  arc path (`M cx cy+r A r r 0 1 1 cx-0.1 cy+r`) fed to `Draw` — the two-points
  solution is ambiguous and rendered off-center in practice (Sec 7 caught this).
  Use a plain `<circle>` wrapped in `<Fade>` instead (no draw-on animation needed
  for a decorative ring).
- Both `kit.tsx` and `chem-kit.tsx` export a function named `ringD` (ellipse-circle
  vs. hexagon-skeleton) — import chem-kit's as `{ ringD as hexRingD }` to avoid
  a collision/shadowing bug.
- Chapter's Hinglish convention: write ROMANIZED Hinglish (Latin script, teacher's
  paraphrase) for board captions, not the verbatim Devanagari `segments_hinglish`
  text (that's TTS narration script, not meant to be pasted onto the board).
