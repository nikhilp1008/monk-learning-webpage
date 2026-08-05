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
- Sec 21 — isomers same formula — ethanol vs dimethyl ether, master-split Q1/Q2 tree
- Sec 22 — structural isomerism six types — 3x2 card grid (chain..tautomerism)
- Sec 23 — geometrical isomerism — cis/trans but-2-ene drawn, E/Z CIP rule
- Sec 24 — optical isomerism — true mirror-image chiral-C pair, racemic vs meso
- Sec 25 — counting tools — DoU formula + 2^n formula, boxed, two-column
- Sec 26 — worked ex: chain isomers of C5H12 (CBSE) — DoU=0, 3 skeletons drawn
- Sec 27 — worked ex: which shows geometrical isomerism? (NEET) — 3 X2C=CY2 schematics
- Sec 28 — worked ex: assign E/Z (JEE Main) — Br-CH=CH-Cl, CIP priorities
- Sec 29 — worked ex: count stereoisomers (JEE Advanced) — (R,R)/(S,S)/(R,S) meso
- Sec 30 — pitfalls & pro-tips (Isomerism) — 2x2 grid + 2 pro-tip banners
- **Subtopic 3 (Isomerism, Sec 21-30) COMPLETE**
- Sec 31 — who keeps the electrons — auto-rickshaw analogy, fishhook vs double-barb arrows
- Sec 32 — two ways a bond breaks — Cl-Cl homolytic vs CH3-Br heterolytic, arrow grammar
- Sec 33 — reactive intermediates — cation/anion/radical/carbene icons + stat stacks
- Sec 34 — reagents & electronic effects — nuc/electrophile lists, I/M/E 3-col table
- Sec 35 — stability orders & 4 reaction types — cation/radical/carbanion orders, 4 cards
- Sec 36 — worked ex: fission of CH3-Br (CBSE) — both paths with curved arrows
- Sec 37 — worked ex: most stable carbocation (NEET) — benzyl ring wins via resonance
- Sec 38 — worked ex: nucleophile or electrophile? (JEE Main) — CN-/BF3/H2O/NO2+
- Sec 39 — worked ex: rank benzylic cations (JEE Advanced) — 3 rings, para substituents
- Sec 40 — pitfalls & pro-tips (Reaction Mechanisms) — 5-card grid + checklist banner
- **Subtopic 4 (Reaction Mechanisms — Fundamental Concepts, Sec 31-40) COMPLETE**
- Sec 41 — three steps: purify, detect, measure — flow diagram + mixed-grains analogy
- Sec 42 — one method per property difference — property/method reference table
- Sec 43 — qualitative analysis — C&H test, Lassaigne's, N/S/halogen color table
- Sec 44 — quantitative analysis — Liebig/Dumas/Kjeldahl/Carius method table
- Sec 45 — core estimation formulae — %C, %H, %N, %X, Rf, oxygen-by-difference
- Sec 46 — worked ex: purify aniline (CBSE) — steam-distillation apparatus sketch
- Sec 47 — worked ex: read a Lassaigne colour (NEET) — blood-red → N&S
- Sec 48 — worked ex: Liebig C&H estimation (JEE Main) — boxed calc steps
- Sec 49 — worked ex: Dumas N estimation (JEE Advanced) — 5-step calc chain
- Sec 50 — pitfalls & pro-tips (Purification & Analysis) — 5-card grid + pro-tip
- **Subtopic 5 (Purification, Qualitative & Quantitative Analysis, Sec 41-50) COMPLETE**

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
