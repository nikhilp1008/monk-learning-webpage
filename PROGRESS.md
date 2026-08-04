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

- Sec 4: The classification routine and separations — decision flowchart
  (fixed composition? → mixture/pure substance → uniform?/splits further? →
  hetero/homo, element/compound), parallel change-type checklist → CHEMICAL
  change verdict, separation-technique↔property table, guardrail that the
  logic runs backward too. Caught + fixed a chip-vs-chip visual overlap the
  verifier's text-only overlap check didn't flag (eyeball needed). PASS both
  languages, eyeballed clean.

- Sec 5: Worked examples: classifying matter — CBSE example (brass/ozone/
  baking soda/sea water, one verdict row at a time) dims to free the board for
  a NEET speed-trap example (air/gasoline/diamond/bronze → diamond), guardrail
  that appearance is the trap, count substance-types not looks. PASS both
  languages, eyeballed clean.

- Sec 6: Worked examples: changes and the edge case — JEE Main 4-row
  classification (camphor/milk/sugar/digestion) dims to free the board for the
  JEE Advanced CuSO₄-vs-NaCl edge case: NaCl crystal → ions disperse → fully
  recovered (physical ✓) alongside CuSO₄ white→"BLUE" (hydrated, + heat,
  chemically distinct — house palette has no blue so the colour fact is
  carried by the text label, not literal hue). Guardrail that colour change +
  heat are chemical-interaction warning signs. PASS both languages, eyeballed
  clean (verified the two verdict chips don't actually overlap despite sitting
  close together).

- Sec 7: Pitfalls and the two-question filter — 4 pitfall rows (mistake ✗ red
  vs correct rule ✓ green): homogeneous-mixture-vs-compound, classify-by-looks,
  dissolving-isn't-always-physical exceptions, dramatic-isn't-chemical. Boxed
  pro-tip (the two-question filter: fixed/variable? one substance or many?),
  two memory aids, forward-looking close into Measurement & SI Units. PASS
  both languages, 0 stalls, eyeballed clean. **Subtopic 1 (Nature of Matter,
  Sec 1-7) complete.**

- Sec 8: Quantity, unit, and the seven SI base units — shopkeeper anchor
  ("five sugar — five WHAT?"), quantity=number×unit landing, 7-card grid built
  together (length/mass/time/current/temp/amount/luminous → metre/kg/s/A/K/
  mol/cd), mole ringed as "the engine of this chapter", derived units (area,
  volume, speed, density, pressure, energy) as closing recognise-only notes.
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 9: Prefixes and the factor-label method — prefix ladder as a number
  line ordered by exponent (pico→nano→micro→milli→centi→base→kilo), guardrail
  to rank by exponent not name, currency analogy, factor-label worked mini-eq
  (5g→kg), why it can't fail (factor=1), the cubic trap (1m³=10⁶cm³ not 100),
  practical cancel-check + flip rule. PASS both languages, 0 stalls, eyeballed
  clean.

- Sec 10: Mass versus weight, and temperature scales — mass(green,constant)
  vs weight(amber,variable) columns, chemistry-uses-mass landing, three
  temperature scales (Celsius/Kelvin/Fahrenheit), same-step-different-offset
  explanation, two guardrails (offset EXACTLY 273.15; kelvin never negative =
  cheapest error detector), fine print that density depends on temperature
  (foreshadows Concentration Terms). PASS both languages, 0 stalls, eyeballed
  clean (fixed a stray non-Latin typo in Hinglish text before verifying).

- Sec 11: Density, volume and temperature relations — formula reference
  sheet: boxed master relation (quantity=value×unit), 2-column grid (ρ=m/V ·
  volume chain 1L=1000mL=1000cm³=10⁻³m³ · 1g/cm³=1000kg/m³ · W=mg · K=°C+273.15
  · °F→°C→K), factor-label discipline banner. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 12: Worked examples: temperature and prefixes — CBSE example (37°C →
  310.15 K → 98.6°F) dims to free its given-slot for a NEET speed-trap
  (arrange nm/μm/pm/mm by increasing length): compare exponents lands the
  order pm<nm<μm<mm, guardrail that the trap is vocabulary not magnitude,
  bonus payoff that the prefix signals physical scale (molecular/atomic/
  visible). PASS both languages, eyeballed clean.

## Current
Sec 13 next.
