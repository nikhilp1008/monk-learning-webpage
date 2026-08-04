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

- Sec 20: Worked examples: both rules in one problem — JEE Main sheet
  (2.1×3.46 cm) shows addition rule governing the perimeter sum (5.6, exact
  ×2 → 11.2 cm) vs multiplication rule governing area (7.3 cm², from 2.1's
  2 sf), landing that decimals govern sums while sig figs govern products;
  fully fades to free the board for a JEE Advanced sci-notation addition
  (4.5×10⁴+2.3×10³, align exponents first → 4.7×10⁴). PASS both languages,
  eyeballed clean.

- Sec 21: Pitfalls and the weakest-link habit — 4 pitfall rows (mishandling
  zeros, always-round-5-up, mixing calc rules, manufacturing precision),
  boxed pro-tip (round only once at the end, carry guard digits, ask which
  input is weakest), 3 memory aids, forward-looking close into Laws of
  Chemical Combination & Atomic Theory. PASS both languages, 0 stalls,
  eyeballed clean. **Subtopic 3 (Uncertainty & Sig Figs, Sec 15-21) complete.**

- Sec 22: The five laws and Dalton's atomic theory — masala-ratio anchor,
  the five laws listed then fully faded to make room for a LEGO-brick analogy
  (wall A at 2:1 ratio = definite proportions, wall B at 1:1 = multiple
  proportions + mass conservation), Dalton's 4 postulates, guardrail on where
  the theory breaks (isotopes/divisibility/isobars-allotropes) vs what
  survives (conservation of atoms). PASS both languages, 0 stalls, eyeballed
  clean. (House palette has no blue — LEGO bricks rendered as A=red/B=amber,
  captioned "A:B" rather than "red:blue".)

- Sec 23: Conservation of mass and definite proportions — Lavoisier's
  conservation of mass (mass(reactants)=mass(products)) with the closed-system
  guardrail (candle-in-open-air trap) and the E=mc² deeper note; Proust's
  definite proportions (Ganga water = lab water) with the callback that this
  IS the compound definition from Subtopic 1, exceptions (non-stoichiometric,
  isotopes), and the exam reading-skill contrast (one reaction vs one compound
  from multiple sources). PASS both languages, 0 stalls, eyeballed clean.

- Sec 24: Multiple and reciprocal proportions — Dalton's multiple proportions
  (normalize shared element first, then reduce to lowest terms) and Richter's
  reciprocal proportions (build a bridge through common element C), landing on
  the 5-second classification skill: count compounds/elements before touching
  numbers (1 compound multi-source=definite, 2 compounds same 2 elements=
  multiple, 3 elements via 1 common=reciprocal, gases+volumes=combining
  volumes). PASS both languages, 0 stalls, eyeballed clean.

- Sec 25: Gay-Lussac, Avogadro and the diatomic gases — Gay-Lussac's combining
  volumes law conflicts with Dalton's indivisible-atom bricks; HCl evidence
  drawn bond-by-bond (H₂+Cl₂ → 2 HCl via ReactionArrow, atoms as bonded
  circles) proves molecules split, landing diatomicity. Avogadro's resolution,
  atom/molecule/atomicity definitions, backwards deduction (O,N diatomic;
  noble gases monoatomic; ozone triatomic), guardrail that combining volumes
  is gases-only. First use of chem-kit's bondD/ReactionArrow in this chapter.
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 26: The laws written as relations — all 5 laws compactly as relations
  (conservation, definite proportions, multiple proportions, reciprocal
  proportions, Avogadro's V∝n), why gas problems work in litres without
  moles, boxed relative-atomic-mass definition (mass(atom)÷[(1/12)mass(¹²C)],
  foundation of the mole concept), dimensional note that these are
  dimensionless ratios. PASS both languages, 0 stalls, eyeballed clean.

- Sec 27: Worked examples: identifying the law — CBSE sealed-container Fe+S
  example (mass=sum=8.8g → conservation of mass) fully fades to free the board
  for a NEET sulphur-oxides example (16g S fixed both sides, O ratio 16:24=2:3
  → multiple proportions), guardrail on two traps (adding masses tells
  nothing; hunting for an already-equalized element). PASS both languages,
  eyeballed clean.

- Sec 28: Worked examples: combining volumes and reciprocal — JEE Main
  hydrocarbon combustion (1vol CxHy+5vol O₂→3vol CO₂+4vol H₂O) deduces C₃H₈
  via Gay-Lussac+Avogadro volume-as-molecule-ratio, with an O-balance sanity
  check; fully fades to free the board for a JEE Advanced reciprocal-
  proportions verification (H as bridge element between CH₄ and H₂O,
  predicted C:O=3.00:8.01 matches direct CO₂ test). PASS both languages,
  eyeballed clean.

- Sec 29: Pitfalls and the five-second classification — 4 pitfall rows (open
  system mistaken for broken law, wrong quantities in multiple proportions,
  gas volumes treated as masses, over-applying Dalton), boxed pro-tip (the
  5-second classification: count compounds/elements first), 3 memory aids
  (discoverer date order, same-recipe=definite, volumes-are-votes=Avogadro),
  forward-looking close into the Mole Concept. PASS both languages, 0 stalls,
  eyeballed clean. **Subtopic 4 (Laws of Chemical Combination & Atomic
  Theory, Sec 22-29) complete.**

- Sec 30: The mole: chemistry's counting unit — dozen/quintal counting-unit
  anchor, atoms-to-extreme grain-of-sand scale, boxed Nₐ=6.022×10²³, same-count
  wildly-different-scale contrast (marbles vs water molecules), the genius
  that mass of 1 mole (g) = relative atomic mass numerically, the bridge
  (invisible atoms ↔ visible balance), mustard-seed shopkeeper analogy (weigh,
  don't count). PASS both languages, 0 stalls, eyeballed clean.

- Sec 31: The carbon-12 standard and average atomic mass — boxed definition
  (1 amu = (1/12)mass(¹²C) = 1/Nₐ gram, not coincidence — Nₐ chosen to make it
  true), why chlorine's atomic mass is 35.5 (Cl-35:Cl-37≈3:1 weighted average,
  batting-average analogy), limiting condition (natural abundance assumed),
  guardrail that average atomic mass describes a population not an individual
  atom. PASS both languages, 0 stalls, eyeballed clean (fixed a stray
  zero-width-space typo in Hinglish text before verifying).

- Sec 32: The mole as a universal hub — hub-and-spokes diagram (MASS/NUMBER/
  VOLUME each connect to a central MOLES node via ÷M, ÷Nₐ, ÷22.4-STP spokes),
  guardrail never to jump mass→number directly, the atoms-of-an-element trap
  (H₂O: 1mol→3mol atoms total), forgotten-formula-count step, molar volume
  limits (gas+STP only), old-vs-IUPAC STP caution, vapour density (M=2×VD).
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 33: The mole triangle and related relations — boxed master mole
  triangle (n=mass/M=N/Nₐ=V/Vm), molecular vs formula mass, elemental gas
  M=atomicity×atomic mass, average atomic mass formula, gas mixture weighted
  average, vapour density M=2×VD, units/dimensions, boxed procedural rule
  (identify→moles→target). PASS both languages, 0 stalls, eyeballed clean.

- Sec 34: Worked examples: moles, atoms and atomicity — CBSE Al example
  (13.5g/27=0.5mol → 3.011×10²³ atoms) fully fades to free the board for a
  NEET "max atoms" comparison (4g H₂→4mol atoms wins vs 16g O₂→1mol, 23g Na→
  1mol, 4g He→1mol), guardrail on forgetting diatomicity, speed tip to compare
  fractions instead of full values since Nₐ cancels. PASS both languages,
  eyeballed clean.

- Sec 35: Worked examples: isotopes and gas mixtures — JEE Main isotope-X
  problem (62.93/64.93u avg 63.55 → x=0.69 → 69%/31% abundance → 4.16×10²²
  lighter atoms in 6.355g) fully fades to free the board for a JEE Advanced
  CH₄/C₂H₆ mixture problem (avg M=20.0 → mole fraction 5/7 → split moles →
  1.143mol H atoms → 6.88×10²³ atoms). PASS both languages, eyeballed clean.

- Sec 36: Pitfalls and the particle-comparison shortcut — 4 pitfall rows
  (confusing molecules/atoms, skipping the mole hub, average-mass-as-single-
  atom, misapplying molar volume), boxed pro-tip (compare fractions, Nₐ
  cancels), 4 memory aids. Caught + fixed a real Hinglish text-overflow bug
  (pitfall-3 rule ran past the safe area) before verifying clean. PASS both
  languages, eyeballed clean. **Subtopic 5 (Atomic/Molecular Masses & Mole
  Concept, Sec 30-36) complete.**

- Sec 37: Percentage composition and the two formula layers — kaju katli
  %composition anchor, chai-recipe layer-1 analogy → empirical formula
  (glucose=CH₂O), layer-2 → molecular formula (glucose=C₆H₁₂O₆=6×CH₂O),
  cricket-squad analogy for the multiplier n, n=molar mass/empirical formula
  mass, callback that atoms combining in whole-number ratios = definite
  proportions at atomic scale. PASS both languages, 0 stalls, eyeballed clean.

- Sec 38: Why the molar mass is indispensable — formaldehyde-vs-glucose
  contrast (same empirical CH₂O, M=30 vs M=180), the limitation (need molar
  mass beyond %composition), n=1 cases (water/CO₂/NH₃), ionic compounds have
  ONLY a formula unit (lattice explanation, never molecular), pure-compound
  assumption, boxed slogan (empirical=recipe, molecular=batch, n=batch size).
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 39: The empirical routine and combustion analysis — the 5-step
  algorithm (assume 100g→%=grams, ÷atomic mass→moles, ÷smallest, clear
  fractions, write as subscripts) with step② flagged as the whole game
  (number ratios not mass ratios), fraction-clearing rules, genuine-fraction-
  vs-rounding-noise guardrail, combustion variant (C→CO₂, H→H₂O), oxygen by
  difference (+why), shortcut when M is known. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 40: Composition, EFM and the multiplier n — mass% formula, EFM
  definition (CH₂O=30), boxed n=molecular mass/EFM, M-from-VD guardrail
  (forgetting ×2), combustion relations recap, boxed direct method
  (atoms of X=(%/100)×M/atomic mass), why it saves time + whole-number check.
  PASS both languages, 0 stalls, eyeballed clean.

- Sec 41: Worked examples: composition and fertilisers — CBSE urea
  %composition (M=60→C20.0%/O26.7%/N46.7%/H6.7%, sums to ~100%, high-N%
  fertiliser insight) fully fades to free the board for a NEET fertiliser
  comparison (urea/NH₄NO₃/(NH₄)₂SO₄/Ca(NO₃)₂, all with numerator 28, urea's
  smallest M wins at 46.7% N), guardrail that the trap is time not concept.
  PASS both languages, eyeballed clean.

- Sec 42: Worked examples: combustion and hydrates — JEE Main combustion
  analysis (0.60g organic → CO₂/H₂O masses → C:H:O=1:2:1 → empirical CH₂O →
  n=2 → molecular C₂H₄O₂ acetic acid) fully fades to free the board for a
  JEE Advanced hydrate problem (MgSO₄·xH₂O loses 51.2% mass as water →
  18x/(120+18x)=0.512 → x≈7 → Epsom salt, verified). PASS both languages,
  eyeballed clean.

- Sec 43: Pitfalls and the 100 gram trick — 4 pitfall rows (mass ratios
  instead of moles, rounding away genuine fractions, stopping at empirical
  formula, measuring combustion O directly), boxed pro-tip (100g sample
  trick + sanity check that masses sum to total), 4 memory aids,
  forward-looking close into Part 4 (Stoichiometry & Concentration Terms).
  Fixed a stray apostrophe typo before verifying. PASS both languages, 0
  stalls, eyeballed clean. **Subtopic 6 (Percentage Composition, Empirical &
  Molecular Formula, Sec 37-43) complete.**

- Sec 44: The balanced equation as a recipe in moles — opens Subtopic 7.
  Anchors 2H₂+O₂→2H₂O against a flour+sugar→cakes recipe analogy, defines
  stoichiometry as reading the coefficient ratio, stresses the recipe
  speaks in MOLES not grams, the conversion channel (given→moles→ratio→
  moles wanted→convert back), the balanced-first guardrail, a boxed master
  relation (mol/coefficient same for every species), and the closing rule
  to convert to moles before ratioing. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 45: The limiting reagent and percentage yield — dhaba analogy (10 roti
  outline circles + 3 dal filled dots, recipe 2 roti:1 dal→1 thali, only 3
  thalis possible, 4 roti left over shown in red) names dal=LIMITING REAGENT
  / roti=EXCESS, then the whole analogy zone fades to free the board for
  the procedure (moles→÷coefficient→smallest=limiting reagent, never
  compare raw moles), why dividing works, excess-reactant subtraction rule,
  a boxed theoretical-vs-actual-yield + %yield formula, and the
  order-is-fixed closing rule. PASS both languages, eyeballed clean
  (advisory stall at the erase-and-rewrite beat, expected/harmless).

- Sec 46: Four routes into a stoichiometry problem — a 2×2 grid of dashed
  amber boxes (Route A general mole method's 4-step spine; Route B POAC
  atom-conservation with the KClO₃ example plus why it's faster for messy
  equations; Route C gas volumes at same T,P via Gay-Lussac/Avogadro with
  the N₂+3H₂→2NH₃ litres example; Route D solutions via molarity×volume)
  closing with the unifying insight that all four are the ordinary mole
  method with a quicker first conversion. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 47: The mole ratio bridge and yield relations — formulas reference
  sheet. Boxed master relation (mol(A)/coeff(A)=mol(B)/coeff(B)), limiting
  reagent rule, excess-remaining formula, boxed-style %yield formula, the
  two on-ramp conversions (STP gas V/22.4, solute M×V), the POAC relation
  with the KClO₃ example, and the closing spine recap (balance→moles→
  ratio→convert back, name your step). PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 48: Worked examples: mass-to-mass and limiting reagent — CBSE
  CaCO₃→CO₂ mass-to-mass (M=100→0.50mol→1:1 ratio→22g CO₂) fully fades to
  free the board for a NEET limiting-reagent speed trap (2mol H₂+1.5mol
  O₂→2H₂O: ÷coefficient gives H₂=1<O₂=1.5 so H₂ limiting, water fixed at
  2mol by the 2:2 ratio), closing on the classic trap of comparing raw
  moles instead of dividing by the coefficient first. PASS both languages,
  1 advisory stall (expected at the erase-and-rewrite beat), eyeballed
  clean.

- Sec 49: Worked examples: excess reactant and yield — JEE Main N₂+H₂→NH₃
  (28g N₂ + 9g H₂: N₂ is limiting despite being less by mass, NH₃=34g,
  3g H₂ left unreacted) fully fades to free the board for a JEE Advanced
  variant of the SAME reaction with different amounts (50g N₂ + 10g H₂,
  actual yield 40g) where H₂ turns out limiting instead — the deliberate
  reversal driving home "recompute, don't remember" — ending in the
  theoretical yield (56.7g) and %yield (70.6%) calculation with the
  LR-before-yield rigor. PASS both languages, 1 advisory stall (expected
  at the erase-and-rewrite beat), eyeballed clean.

- Sec 50: Pitfalls and the coefficient-division habit — 4 pitfall rows
  (skipping balancing, ratios of grams instead of moles, comparing raw
  moles for the limiting reagent, anchoring product on the wrong
  reactant), boxed speed trick (write moles above each coefficient, read
  the ratio in one glance), 3 memory aids (the four-step spine, ÷ by
  coefficient, anchor on the limiter). Shortened two rule lines that
  initially overflowed past the safe boundary. PASS both languages, 0
  stalls, eyeballed clean. **Subtopic 7 (Stoichiometry & Limiting Reagent,
  Sec 44-50) complete.**

- Sec 51: What concentration measures, and the denominators — opens
  Subtopic 8. Nimbu paani analogy (2 spoons vs 6 sugar, same drink,
  different strength) anchors concentration as "how crowded" the solute
  is, then a hub-and-spoke diagram (moles of solute fanning out to 4
  denominators: ÷volume=Molarity, ÷solvent mass=Molality, ÷total
  moles=Mole fraction, ÷total mass×100=Mass%) makes the denominator-is-
  identity insight concrete, followed by the molality-vs-mass%
  solvent/solution mass mixup warning, the ppm/dilute-solutions note, and
  each measure's real-world moment (molarity for reactions, molality for
  temperature work, mole fraction for particle proportions). PASS both
  languages, 0 stalls, eyeballed clean.

- Sec 52: Temperature dependence and interconversion — Mumbai local train
  analogy (passengers per coach/volume=molarity vs per tonne/mass=
  molality; heat expands the coach, per-volume drifts, per-tonne never
  does) sets up a two-column rule (VOLUME-based: molarity/normality/
  formality → drifts; MASS/MOLES-based: molality/mole fraction/mass% →
  steady), the physical reason (liquids expand, molarity falls with
  nothing added/removed), a boxed speed tip (scan the denominator), the
  molarity≠molality caution, and the absolute closing rule that
  interconversion requires density. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 53: Parts per million, mole fraction and normality — ppm formula and
  why it beats tiny percentages, the water-quality real-world context
  (fluoride/hardness/sulphate/nitrate), mole fraction with the
  forgetting-the-solute trap (1/10 vs 1/9), normality=molarity×n-factor
  with the H₂SO₄ basicity=2 worked instance, a boxed dilution/mixing
  relation (M₁V₁=M₂V₂, moles add & volume adds), and the closing warning
  that water added ≠ final volume. PASS both languages, 0 stalls,
  eyeballed clean.

- Sec 54: Every concentration relation in one place — the master formulas
  sheet: molarity/molality one-liners with their temp-dependence tags,
  mole fraction, mass%/ppm/ppb as the same fraction with different
  multipliers, normality=n-factor×molarity and strength=molarity×molar
  mass, the dilution/mixing relation, then two boxed hard-interconversion
  formulas (mass%→molarity via density; the exact molarity→molality
  relation) each with a one-line "why" underneath. PASS both languages, 0
  stalls, eyeballed clean.

- Sec 55: Worked examples: molarity and temperature terms — CBSE NaCl
  molarity calculation (5.85g/58.5g/mol=0.100mol, 500mL→0.200 mol/L)
  fully fades to free the board for a NEET speed trap (which of molarity/
  molality/normality/formality is temperature-independent), applying the
  volume-vs-mass rule to answer molality, noting mole fraction/mass%
  would also qualify, and closing with the whisper that the trap is
  phonetic (molarity/molality sound like twins) — scan the denominator,
  never the name. PASS both languages, 1 advisory stall (expected at the
  erase-and-rewrite beat), eyeballed clean.

- Sec 56: Worked examples: density, mixing and dilution — JEE Main
  molality→density→molarity chain (2.0 molal, M=50g/mol, d=1.05g/mL:
  mass solute=100g, mass solution=1100g, volume=1.0476L, M=1.91mol/L)
  fully fades to free the board for a JEE Advanced mixing+dilution
  problem (two H₂SO₄ solutions mixed then diluted to 500mL: moles
  conserved at 0.080mol total, M=0.16mol/L catching the trap that
  dilution uses the FINAL volume not the mixed-volume sum, then
  N=0.32N via basicity=2) chaining mixing, dilution, and M→N conversion
  in one pass. PASS both languages, 1 advisory stall (expected at the
  erase-and-rewrite beat), eyeballed clean.

- Sec 57: Pitfalls and the anchoring trick — 4 pitfall rows (confusing
  solvent/solution mass, assuming molarity=molality, the dilution volume
  trap, forgetting the n-factor), boxed anchoring trick (fix 1000g
  solvent for molality problems or 100g solution for mass% problems,
  everything else follows by one multiplication/division), 4 memory
  aids (volume drifts/mass sticks, watch the denominator, no density no
  interconversion, added=final−initial). PASS both languages, 0 stalls,
  eyeballed clean. **Subtopic 8 (Concentration Terms, Sec 51-57)
  complete.**

- Sec 58: Formula recap: every relation of the chapter — the whole-chapter
  cheat sheet (section_type: formula_recap, new type this session), 14
  tightly-packed lines covering all four parts: measurement conversions,
  uncertainty/sig-fig rules, the conservation laws, the mole triangle
  (highlighted as the spine) with Avogadro's number and the STP-only
  caveat on 22.4L, average atomic mass and M=2×VD, empirical/molecular
  formula relations, the stoichiometry mole-ratio-bridge/%yield/limiting-
  reagent trio, and the concentration terms with the dilution/normality/
  density-always-needed closer. PASS both languages, 0 stalls, eyeballed
  clean despite the density.

## Current
Sec 59 next (final section — closes the chapter).
