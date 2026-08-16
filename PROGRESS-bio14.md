# B11 Ch14 — Breathing and Exchange of Gases — Progress

- Branch: `premium-board-bio14` (off `origin/main`, NOT the stale `premium-board` base)
- chapter_id: `14d01ba4-58de-5ce7-afe1-48af70c88711` (subject `biology`, class_level 11)
- Sections: 59 (Supabase `position` 1–59)
- Dev port: 3014
- Lesson JSON: **`JSON_LESSONS/Class11_Bio/b11_ch14_breathing-and-exchange-of-gases_full.json`**
  confirmed correct — 59 sections, `section_index`/`title`/`subtopic` match Supabase
  `lesson_sections` 1:1 for all 59 positions (scripted diff, zero mismatches).
  The sibling `..._full_merged.json` has only **11** sections (subtopic-merged) and
  is NOT used here.
- Naming: `B11Ch14SecM.tsx` / `B11Ch14SecM` / registry const `B11CH14` / keys
  `` `${B11CH14}:M` ``, appended at the very end of `src/components/scenes/index.ts`
  (last block in the file was `B11Ch01`, ending `/* end B11Ch01 */` at line 5328).
- Note on this filename: repo convention on `main` (see `PROGRESS-ch3.md`,
  `PROGRESS-chem1.md`, etc.) is one progress file per in-flight chapter, renamed
  at merge time — using `PROGRESS-bio14.md` here rather than a bare `PROGRESS.md`
  so this branch doesn't shadow/clobber `premium-board-bio1`'s still-unrenamed
  `PROGRESS.md` inherited from `main`.

## Subtopic map (from lesson JSON + Supabase, cross-checked)

1–4   Chapter Overview: Why and How We Breathe
  1  concept   Why we breathe: the body's two-way logistics problem
  2  concept   Breathing is not cellular respiration
  3  concept   The five steps of respiration — the master framework
  4  concept   The thoracic chamber: the sealed box breathing depends on

5–20  Respiratory Organs & The Breathing Mechanism
  5  concept          Your lungs have no muscles: the syringe trick
  6  concept          Bulk flow to the doorstep, diffusion across the threshold
  7  concept          The conducting airway: nostril to trachea
  8  concept          Bronchi to alveoli, and the pleura around the lungs
  9  concept          Respiratory organs across the animal kingdom
  10 concept          The four primary respiratory volumes
  11 concept          Inspiration: the active stroke, step by step
  12 concept          Expiration: passive at rest, active when forced
  13 concept          Why the conducting zone matters mechanically
  14 formulas         The four capacities as sums of volumes
  15 worked_examples  [CBSE] Tracing the path of a breath
  16 worked_examples  [CUET] FRC, and why a spirometer cannot measure it
  17 worked_examples  [NEET Speed Trap] Active versus passive
  18 worked_examples  [NEET A–R] Why the tracheal rings are C-shaped
  19 tips             Common student pitfalls
  20 tips             Pro-Tip: one picture, not five formulas

21–39 Exchange & Transport of Gases
  21 concept          Exchange versus transport: the truck at the warehouse gate
  22 concept          Partial pressure, and the one rule that governs everything
  23 concept          The partial-pressure table around the body
  24 concept          The diffusion (respiratory) membrane
  25 concept          What sets the rate of diffusion — and the CO2 paradox
  26 concept          Oxygen transport: haemoglobin does nearly all of it
  27 concept          Carbon dioxide transport: three modes
  28 concept          Loading at the lungs, unloading at the tissues
  29 concept          The oxygen–haemoglobin dissociation curve
  30 concept          The built-in oxygen reserve
  31 concept          What shifts the curve — the Bohr effect
  32 concept          The bicarbonate machinery: carbonic anhydrase
  33 concept          Two enrichment terms: Haldane effect and the chloride shift
  34 worked_examples  [CBSE] Direction of diffusion from the table
  35 worked_examples  [CUET] The three modes of CO2 transport
  36 worked_examples  [NEET Speed Trap] The solubility paradox
  37 worked_examples  [NEET A–R] Why tissues get oxygen more readily
  38 tips             Common student pitfalls in exchange and transport
  39 tips             Pro-Tip: memorise two pairs, derive the rest

40–58 Regulation of Respiration & Respiratory Disorders
  40 concept          The control room in the brainstem
  41 concept          The surprise: the body watches CO2, not oxygen
  42 concept          The four control structures: name them and place them
  43 concept          How CO2 tunes your breathing, step by step
  44 concept          Why the venous oxygen reserve matters here
  45 concept          Limiting conditions: override, hyperventilation, altitude
  46 concept          Asthma — the airway disease
  47 concept          Emphysema — the exchange-surface disease
  48 concept          Occupational disorders — the membrane-thickness disease
  49 concept          Three diseases, three sabotage points
  50 concept          Coping with thin air: the high-altitude response
  51 concept          When transport is poisoned: carbon monoxide
  52 concept          NEET enrichment: bronchitis and pneumonia
  53 worked_examples  [CBSE] Naming the centres
  54 worked_examples  [CUET] Disorder identification
  55 worked_examples  [NEET Speed Trap] What drives the urge to breathe?
  56 worked_examples  [NEET A–R] The occupational–fibrosis link
  57 tips             Common student pitfalls
  58 tips             Pro-Tip: two hooks for the whole subtopic

59    Master Revision: Chapter 14 at a Glance
  59 cheat_sheet      Master Revision: Chapter 14 at a Glance — one-screen recall

## Done

(none yet — starting section 1)

## Current

Sec 1 — in progress.
