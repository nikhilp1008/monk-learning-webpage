# Progress — Class 11 Chemistry, Chapter 1: Some Basic Concepts of Chemistry

- Branch: `premium-board-chem1`
- Dev port: `3020`
- chapter_id: `fa37da68-46a0-562f-9c75-2967215b8893`
- Sections: 59 (Supabase `position` 1..59)
- Data source: Supabase `lesson_sections` (title, subtopic, segments_english/hinglish,
  board_reveal_at_english/hinglish) — authoritative. JSON_LESSONS file is stale/unused.
- Naming: `C11Ch01SecM.tsx`, component `C11Ch01SecM`, registered as
  `REGISTRY[\`${C11CH01}:M\`]` at the END of `src/components/scenes/index.ts`.
- Fetch helper: `node scratch/get-sec.mjs <position>` prints the Supabase row.

## Subtopic map
- 1–7   Nature of Matter
- 8–14  Measurement & SI Units
- 15–21 Uncertainty & Significant Figures
- 22–29 Laws of Chemical Combination & Atomic Theory
- 30–36 Atomic/Molecular Masses & Mole Concept
- 37–43 Percentage Composition / Empirical & Molecular Formula
- 44–50 Stoichiometry & Limiting Reagent
- 51–57 Concentration Terms
- 58–59 Master Revision

## Engine fix (applies to whole chapter, already committed)
`src/app/lessons/[chapterId]/page.tsx`: `revealTimestamps` was clamped/padded to
legacy `board_content`'s event count before being passed to a registered Scene.
This chapter's Supabase rows have `board_content: []` (scene-only chapter), so
every scene's `reveals` prop was silently `[]` and nothing beat-gated ever
rendered (only the always-on title showed). Fixed: when `getScene(...)` returns
a component, `revealTimestamps` now uses the raw `board_reveal_at_*` array
directly instead of clamping to `boardEvents.length`. Verified no regression on
an existing physics section (fallback board_content path unchanged).

## Done
- Sec 1: Matter and the three states — 3 particle-diagram boxes (solid grid /
  liquid cluster / gas scatter) built inside dashed bins, tug-of-war verdict
  chips (attraction wins/comparable/thermal wins), shape/volume property chips,
  heat arrows between boxes (ice→water→steam), green guardrail line (steam is
  still water). PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 2: Pure substances versus mixtures — classification tree built live
  (matter → pure substance/mixture → element/compound, homogeneous/
  heterogeneous), law-of-definite-proportions callout, solute/solvent +
  gas/solid-solution note, thali analogy (dal vs chana+puri), guardrail that
  salt is a compound not a mixture. PASS both languages, 0 stalls, eyeballed clean.

- Sec 3: Properties, and physical versus chemical change — two-column
  physical(green)/chemical(red) comparison (properties then changes), THE TEST
  central callout (was a new substance formed?), salt-dissolve-then-evaporate
  worked mini-case via ReactionArrow (= physical change), fine print on "pure"
  and scale-dependent homogeneous/heterogeneous (milk = colloid). PASS both
  languages, eyeballed clean.

## Current
Sec 4 next.
