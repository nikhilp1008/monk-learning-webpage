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

## Rule update: never dim-and-overlay (2026-08-04)
`verify-scene.mjs` now counts `dim`med elements as "present" and FAILs an
overlap onto them (`"new"(dimmed)`). SCENE_AUTHORING.md updated to match:
dimming lowers opacity, it does NOT free the space. New content must land in
free board space (below/beside); only when the board is genuinely full do you
fully REMOVE the old group (gate `on` off so it fades to opacity 0 and vacates
its box) — never dim-and-overlay. No scrolling.
Practical pattern for "two worked examples, second reuses the first's screen
space": replace `dim={beat >= K}` with `on={beat >= j && beat < K}` (drop the
`dim` prop) on every Fade belonging to the first example, so it's fully gone
(not just faint) before the second example's content lands in the same spot.
Retrofitted into Sec5, Sec6, Sec12 (Sec6 was the one caught failing); applied
from Sec13 onward as the default for this pattern.

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
  baking soda/sea water, one verdict row at a time) fully fades out to free
  the board for a NEET speed-trap example (air/gasoline/diamond/bronze →
  diamond), guardrail that appearance is the trap, count substance-types not
  looks. PASS both languages, eyeballed clean. (Retrofitted from dim to
  full-removal per the rule update below.)

- Sec 6: Worked examples: changes and the edge case — JEE Main 4-row
  classification (camphor/milk/sugar/digestion) fully fades out to free the
  board for the JEE Advanced CuSO₄-vs-NaCl edge case: NaCl crystal → ions
  disperse → fully recovered (physical ✓) alongside CuSO₄ white→"BLUE"
  (hydrated, + heat, chemically distinct — house palette has no blue so the
  colour fact is carried by the text label, not literal hue). Guardrail that
  colour change + heat are chemical-interaction warning signs. PASS both
  languages, eyeballed clean (verified the two verdict chips don't actually
  overlap despite sitting
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
  310.15 K → 98.6°F) fully fades out to free its given-slot for a NEET
  speed-trap (arrange nm/μm/pm/mm by increasing length): compare exponents
  lands the order pm<nm<μm<mm, guardrail that the trap is vocabulary not
  magnitude, bonus payoff that the prefix signals physical scale (molecular/
  atomic/visible). PASS both languages, eyeballed clean. (Retrofitted from
  dim to full-removal per the rule update above.)

- Sec 13: Worked examples: density conversion and -40 — JEE Main mercury
  density unit conversion (13.6 g/cm³ → 13,600 kg/m³, cube-factor trap) + mass
  shortcut (3.4 kg), fully faded out (not dimmed) to free the board for a JEE
  Advanced example (same-reading °C=°F ⇒ x=-40), verified. PASS both
  languages, eyeballed clean. First section written directly with the new
  never-dim-and-overlay pattern.

- Sec 14: Pitfalls and unit-tracking as an error detector — 4 pitfall rows
  (forgetting to cube/square, flipped factor, wrong offset/negative K,
  mass-vs-weight confusion), boxed pro-tip (unit tracking = free error
  detector), 3 memory aids, forward-looking close into Uncertainty &
  Significant Figures. PASS both languages, 0 stalls, eyeballed clean.
  **Subtopic 2 (Measurement & SI Units, Sec 8-14) complete.**

- Sec 15: Uncertainty and the meaning of a measured digit — ruler-reading
  anchor (≈2.5 cm, last digit is an estimate), scientific notation
  (0.000...166 g ⇒ 1.66×10⁻²⁴ g), sig-fig contrast (12.5 g meaningful vs
  12.50000 g false precision), last-digit-uncertain (12.5±0.1 cm), counts/
  defined relations are exact (∞ sig figs). PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 16: Counting significant figures; accuracy vs precision — counting
  rules with examples (345→3sf, 1.004→4sf, 0.0025→2sf, trailing-zero trap
  100→1sf vs 1.00×10²/2.50→3sf), why sci notation removes ambiguity, accuracy/
  precision definitions, three archer targets (precise-not-accurate /
  accurate-avg-not-precise / both) as concentric rings + dot clusters. PASS
  both languages, 0 stalls, eyeballed clean.

- Sec 17: Rounding and the round-to-even rule — easy rule (>5 up, <5 down),
  the tricky =5 case (round-to-even: odd climbs, even stays), worked pair
  (2.745→2.74, 2.735→2.74, same answer different routes), the bias-
  cancellation reason, guardrail that reflexive round-5-up is wrong half the
  time, discipline to carry guard digits and round only once at the end.
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 18: Scientific notation and the calculation rules — formula reference
  sheet: boxed N×10ⁿ notation, counting-rules one-liner, two-column
  calculation rules (+/− keeps fewest decimals, ×/÷ keeps fewest sig figs)
  with their reasons, boxed weakest-link principle, crisp accuracy/precision
  recap. PASS both languages, 0 stalls, eyeballed clean.

- Sec 19: Worked examples: counting and rounding — CBSE example counts sig
  figs in 5 numbers (0.00250→3, 1.004→4, 50000→1, 6.022×10²³→4, 100.0→4,
  with the 50000-vs-100.0 decimal-point contrast), fully fades to free the
  board for a NEET example rounding 3 numbers to 3 sig figs (2.745→2.74 even
  stays, 2.735→2.74 odd climbs, 0.023456→0.0235), guardrail on the reflexive
  round-up trap. PASS both languages, eyeballed clean.

## Current
Sec 20 next.
