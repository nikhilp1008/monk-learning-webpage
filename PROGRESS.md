# Progress — Class 11 Chemistry, Chapter 2: Structure of Atom

- Branch: `premium-board-chem2`
- Dev port: `3021`
- chapter_id: `16bf043d-bc59-5ebb-93ad-7b0fddf484c9`
- Sections: 57 (Supabase `position` 1..57)
- Data source: Supabase `lesson_sections` (title, subtopic, segments_english/hinglish,
  board_reveal_at_english/hinglish) — authoritative.
- Naming: `C11Ch02SecM.tsx`, component `C11Ch02SecM`, registered as
  `REGISTRY[\`${C11CH02}:M\`]` at the END of `src/components/scenes/index.ts`.
- Fetch helper: `node scratch/get-sec.mjs <position>` prints the Supabase row
  (no arg lists all 57 titles).

## Subtopic map
- 1–14  Subatomic Particles & Early Atomic Models
- 15–27 EM Radiation / Planck / Photoelectric Effect
- 28–41 Bohr Model & Wave-Particle Duality
- 42–55 Quantum Model / Orbitals / Configurations
- 56–57 Recap

## Done
- Sec 1: Seeing the unseeable, how we probe the atom — tiffin-box anchor →
  "atom never seen directly" → Dalton's solid indivisible atom (persists) →
  cathode-ray tube built piece by piece (cathode/anode, straight beam) → beam
  bends toward the + deflecting plate (negative charge) → same bend for
  H₂/He/air (universal particle) → lands "the electron" (green) → guardrail:
  Dalton's circle crossed out in red, "atom has parts". PASS both languages,
  FORCE_SHOTS eyeballed clean (fixed one bug: a beat-5 evidence chip's opaque
  fill was painting over the tail of the beat-2 Dalton label — the automated
  text-vs-text checker doesn't catch text-vs-shape occlusion, so eyeball the
  final frame every time two groups share a row).

- Sec 2: From one negative particle to the whole cast — neutrality equation
  (atom = e⁻ + ?unknown) → perforated-cathode tube with anode/positive rays
  punching through the holes and glowing beyond the cathode → guardrail chip
  pair (cathode rays universal vs anode rays gas-dependent) → mass-accounting
  gap → lands the neutron (Chadwick 1932) → discovery timeline (electron →
  proton → neutron) → cast-complete summary. PASS both languages first try,
  FORCE_SHOTS eyeballed clean.

- Sec 3: Two rival blueprints: plum-pudding vs nuclear — recap of the 3 known
  parts scattered with a "?" → two empty dashed slots divided by "VS" → left
  slot fills with Thomson's smeared-charge plum-pudding (embedded electron
  seeds) → right slot fills with Rutherford's tiny nucleus + far orbit →
  ringed annotation "almost all mass+charge here" → guardrail (mostly empty
  space; explains scattering but fails stability/spectra) → teaser into Bohr.
  PASS both languages first try, FORCE_SHOTS eyeballed clean.

## Current
Sec 4: "The iso-family: same or different?" — starting.
