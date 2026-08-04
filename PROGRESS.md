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

## ⚠ KNOWN ISSUE: stale audio on 20/57 sections
Sections **4, 19–30, 34–36, 49–51, 55–57** (20 of 57) use an older audio path
(`.../c11_ch02_structure-of-atom/p1/...` vs the normal `.../c11_ch02/p1/...`)
and carry suspiciously round `duration_sec_english`/`_hinglish` values (68 or
84) in Supabase. Checked against real hosted files (`node scratch/check-audio-lang.mjs <sec>`):
the actual audio is much shorter than the `board_reveal_at_*` timestamps need
(e.g. Sec 4: English 14s / Hinglish 26s, but reveals run to 56–68s; Sec 20:
English 23s vs a real 94s Hinglish). For most of the 20, only **English** is
stale filler audio (Hinglish is real and matches); for **Sec 4, 34, 55** BOTH
languages are short/stale. This is a backend audio-pipeline problem, not a
scene bug — confirmed by re-checking scene logic against working sections.
Decision (user, 2026-08-04): author all 57 scenes against the given
`board_reveal_at_*` timestamps regardless, verify whatever the current audio
can actually reach, and flag each affected section below — the scenes will
already be correct once fresh audio is uploaded. Do not "fix" by inventing
shorter beat schedules.

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

- Sec 4: The iso-family: same or different? — the four confusing names →
  live-built 3-column table (name/held constant/example) with proper isotope
  notation (¹H/²H/³H, ⁴⁰Ar/⁴⁰K/⁴⁰Ca, ¹⁴C&¹⁵N, Na⁺/Mg²⁺) filling in row by row →
  toP/Bar/toN mnemonic guardrail → land. **STALE AUDIO** (see known-issue note
  above): English 14s / Hinglish 26s vs intended 56–68s of reveals, so only
  beats 0–1 (English) / 0–2ish (Hinglish) are actually reachable today; code
  verified correct by inspection (identical Fade/beat pattern as Sec 1–3) and
  tsc-clean. VERDICT PASS on what's reachable; re-verify fully once audio is
  reuploaded.

- Sec 5: How Thomson and Millikan cornered the electron — two-column build
  (Thomson | Millikan, divided by a vertical rule): Thomson's crossed E/B
  field tube built plate by plate with B-field marks, beam tuned straight →
  "e/m only" chip → guardrail (1 equation, 2 unknowns); Millikan's oil-drop
  apparatus with gravity/electric-pull arrows balancing the drop → guardrail
  (charge is quantised, q=n×1.602e-19 C) → lands "smallest unit = e"; final
  full-width chip combines both into the electron's mass. PASS both
  languages, FORCE_SHOTS eyeballed clean.

- Sec 6: Rutherford's gold foil: reading the ricochets — α source + gold foil
  built, then three trajectories fired live (green straight-through majority,
  amber slight deflection, red sharp bounce-back near the foil) each landing
  a conclusion chip (mostly empty space / concentrated + lump / guardrail:
  tiny dense nucleus) → scale comparison (nucleus vs atom, 5 orders of
  magnitude) → cricket-ball-at-the-pitch analogy. PASS both languages,
  FORCE_SHOTS eyeballed clean — the clearest diagram yet.

- Sec 7: Distance of closest approach: the energy argument — α approaches a
  fixed nucleus along a guide line, Coulomb repulsion converts KE→PE, a red
  dot marks the turning point r₀ (guardrail: momentarily at rest, all KE
  spent) → derivation built as real stacked fractions (numerator/bar/
  denominator) for KE = (2e)(Ze)/4πε₀r₀, then boxed-green landed result
  r₀ = 2Ze²/(4πε₀·KE) → guardrails (recoil ignored; energy not force) →
  final proportionality r₀∝1/KE. PASS both languages, FORCE_SHOTS eyeballed
  clean — first math-heavy derivation section, fractions read cleanly.

- Sec 8: Specific charge and the electron's mass (`section_type: formulas`) —
  single stacked reference-card column: e/m boxed (amber, high emphasis) →
  guardrail (universal ratio) → q=ne card → "combine them" → mₑ boxed GREEN
  (the landed result) → guardrail (1/1837 of hydrogen) → proton/neutron mass
  chips. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 9: Counting the atom: A, Z, N and closest approach (`formulas`) —
  A=Z+N card → hand-built ᴬZX isotope notation (proper superscript-A/
  subscript-Z to the left of X, each labelled) → guardrail on ion electron
  counting (subtract cation, add anion) → general r₀=z₁Ze²/4πε₀KE fraction →
  z₁=2 for α note → average atomic mass Ā=ΣaᵢAᵢ/100 fraction → abundance
  note. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 10: Worked example (CBSE): identify the ion — given (M³⁺, 23e⁻, 30n) →
  step 1 charge-adjustment (23+3=26 electrons) → Z=26 boxed → guardrail (the
  step-mark line examiners want) → step 2 identifies iron → A=56 → lands in
  a green box with the full ⁵⁶₂₆Fe³⁺ notation (superscript mass, subscript
  Z, charge). PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 11: Worked example (NEET): highest specific charge — 4-column
  comparison table (proton/deuteron/α/electron) built live: guardrail ring
  flags the electron column early ("don't forget it"), charge/mass/ratio
  rows fill in for the 3 ions (proton wins among them), then the electron's
  cells land (mass ≈1/1837, ratio ≈1837) with the (e/m)e≫(e/m)p formula,
  and the ring swaps red→green to crown the winner. PASS both languages,
  FORCE_SHOTS eyeballed clean.

- Sec 12: Worked example (JEE Main): combine Millikan and Thomson — 4
  droplet-charge chips divide down to whole-number multiples (3e/4e/5e/2e)
  landing on e=1.6×10⁻¹⁹C boxed green, then Thomson's e/m ratio chip joins
  in to produce mₑ=9.1×10⁻³¹kg boxed green, capped by the guardrail that
  neither experiment alone gives the mass. PASS both languages, FORCE_SHOTS
  eyeballed clean.

- Sec 13: Worked example (JEE Advanced): closest approach on gold — given
  (5.0 MeV α, gold Z=79) → KE→J conversion → general r₀ fraction → plug-in
  boxed green (r₀≈4.5×10⁻¹⁴m) → guardrail with a to-scale bar comparison
  (short red 7fm nucleus vs long amber 45fm r₀) making the "never touches"
  conclusion visually obvious → point-charge-approximation guardrail.
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 14: Pitfalls and pro-tips: early atomic models — 4 numbered red-circle
  pitfalls (iso-family scrambling, e⁻=Z for ions, swapping ray properties,
  matching the wrong observation), an MCQ sub-note, a green boxed pro-tip
  (compare charge/mass as fractions, never compute), closing on "electron
  almost always wins". PASS both languages, FORCE_SHOTS eyeballed clean.

**Subtopic 1 (Subatomic Particles & Early Atomic Models, Sec 1-14) complete.**

- Sec 15: Light as a wave: Maxwell and c = νλ — Maxwell's EM wave drawn as
  real sine curves (red E field, amber B field, drawn together along the
  propagation axis) with "no medium needed" note → c=νλ=3×10⁸m/s boxed green
  → the EM spectrum as 7 colored bands (radio→gamma) with an increasing-
  frequency arrow → guardrail teasing the two brick walls ahead. PASS both
  languages, FORCE_SHOTS eyeballed clean. First section of subtopic 2 (EM
  Radiation/Planck/Photoelectric Effect).

- Sec 16: Planck's coins: quanta and the ultraviolet catastrophe — rupee
  coins (₹10/₹20/₹30) vs a crossed-out fractional "₹10.47" makes the
  indivisible-energy analogy concrete → black-body graph with the wave
  theory's diverging (wrong, red) curve labelled "ultraviolet catastrophe!"
  contrasted against Planck's finite-peak (green) curve → E=hν boxed green
  → guardrail (whole coins of size hν, birth of quantum theory) → Nhν note.
  PASS both languages, FORCE_SHOTS eyeballed clean.

## Current
Sec 17: "Einstein's photons and the photoelectric puzzle" — starting.
