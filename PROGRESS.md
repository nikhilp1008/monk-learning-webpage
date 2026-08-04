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

## ⚠ KNOWN ISSUE: placeholder audio + reveal timing on 22/57 sections
Sections **4, 19–30, 34–36, 49–51, 55–57** (22 of 57) use an older audio path
(`.../c11_ch02_structure-of-atom/p1/...` vs the normal `.../c11_ch02/p1/...`),
carry suspiciously round `duration_sec_english`/`_hinglish` values (68 or 84),
and — the key finding — their **English `board_reveal_at_english` is a
placeholder**: uniform 8-second-apart values (`[0,8,16,24,32,40,48,56]`),
not real audio-derived timestamps. Hinglish reveals for most of these 22 are
real/varied (matching a real, full-length Hinglish audio file); Sec 4, 34, 55
have placeholder-looking data on **both** languages.

**Revised decision (user correction, 2026-08-04, supersedes the earlier one
below): STOP authoring sections on this list.** Placeholder reveals mean the
narration/segment breakdown behind them may not be final either — authoring
choreography now risks being rebuilt from scratch once real audio + real
reveals land, not just re-timed. Skip all 22 for now; author + verify only
the sections with real audio. Revisit the whole list together once the audio
pipeline is fixed.

**Already authored before this correction (Sec 4, 19, 20, 21, 22, 23) —
PROVISIONAL, not to be treated as finished:** each PASSed verification against
today's placeholder/short-audio data and the code is a reasonable beat-indexed
implementation (not hardcoded to specific seconds), but per the correction
above these must be re-checked against the real segments/reveals once audio is
regenerated — the beat count, content split, or pacing may need to change, not
just the timestamps. Treat their "Done" entries below as drafts.

**Untouched, deferred (do not start until audio is fixed): Sec 24, 25, 26, 27,
28, 29, 30, 34, 35, 36, 49, 50, 51, 55, 56, 57.**

<details><summary>Superseded original note (author-anyway decision) — kept for history</summary>

Decision (user, 2026-08-04, now superseded): author all 57 scenes against the
given `board_reveal_at_*` timestamps regardless, verify whatever the current
audio can actually reach, and flag each affected section — the scenes will
already be correct once fresh audio is uploaded. Do not "fix" by inventing
shorter beat schedules.

</details>

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

- **[PROVISIONAL — placeholder audio, see known-issue]** Sec 4: The
  iso-family: same or different? — the four confusing names → live-built
  3-column table (name/held constant/example) with proper isotope notation
  (¹H/²H/³H, ⁴⁰Ar/⁴⁰K/⁴⁰Ca, ¹⁴C&¹⁵N, Na⁺/Mg²⁺) filling in row by row →
  toP/Bar/toN mnemonic guardrail → land. Both English (14s) and Hinglish (26s)
  audio are short/placeholder against 56–68s of (also placeholder) reveals;
  code verified correct by inspection and tsc-clean, VERDICT PASS on what's
  reachable, but **do not treat as final** — re-author against real
  segments/reveals once audio is regenerated.

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

- Sec 17: Einstein's photons and the photoelectric puzzle — a photon (hν)
  drawn striking a metal plate, ejecting an electron (with impact arrow +
  dot) → guardrail on wave theory's 3 failed predictions (crossed, one
  line) → guardrail on the real threshold-frequency behavior → hν=W₀+KE
  boxed green → closing note (frequency not brightness, instant emission).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 18: Line spectra: the fingerprint that says quantised — three stacked
  strips built live: continuous (unbroken 5-color band), emission (bright
  lines on dark), absorption (dark lines on bright, at the SAME x-positions
  as emission — visually proving the mirror-image relationship) → guardrail
  (sharp fixed lines ⇒ energy is QUANTISED) → launch-pad for Bohr. PASS both
  languages, FORCE_SHOTS eyeballed clean.

- **[PROVISIONAL]** Sec 19: Method: turning a wavelength into a photon
  energy — 4 numbered steps (identify given quantity → pick matching form →
  guardrail on units → photons/sec from power) → why-the-shortcut-works
  caption → hc=1.986e-25 J·m⇒1240 eV·nm boxed green → guardrail (memorise
  1240/λ(nm)). English reveals are placeholder (uniform 8s); verified clean
  via Hinglish's real audio. Re-author once real English data lands.

- **[PROVISIONAL]** Sec 20: Method and meaning: photoelectric effect and its
  four laws — method caption → KEmax=hν−W₀ boxed green → guardrails for Law 1
  (threshold) and Law 2 (instantaneous) → Law 3+4 combined line → V₀-vs-ν
  graph built live (axes, line from threshold dot, slope=h/e label) →
  guardrail landing both graphs in eV₀=hν−W₀. English reveals placeholder;
  verified clean via Hinglish. Re-author once real English data lands.

- **[PROVISIONAL]** Sec 21: Wave and Planck relations (`formulas`) — stacked
  toolkit cards: c=νλ,ν̄=1/λ boxed green → wavenumber note → E=hν=hc/λ=hcν̄
  boxed green → Etotal=nhν → shortcut E(eV)=1240/λ(nm) boxed red (guardrail)
  → h's dimensions note → never-mix-units guardrail. English reveals
  placeholder; verified clean via Hinglish. Re-author once real English data
  lands.

- **[PROVISIONAL]** Sec 22: The photoelectric toolkit (`formulas`) —
  p=h/λ=E/c → guardrail (photon: zero rest mass, real momentum) →
  hν=W₀+KEmax⇒KEmax=h(ν−ν₀) boxed green → work-function note → eV₀=h(ν−ν₀) →
  guardrail (V₀ volts = KEmax eV numerically) → N=Pt/hν=Ptλ/hc. English
  reveals placeholder; verified clean via Hinglish. Re-author once real
  English data lands.

- **[PROVISIONAL]** Sec 23: Worked example (CBSE): FM radio photon — given
  (95.0 MHz FM) → λ=c/ν=3.16m → E=hν setup → E=6.29×10⁻²⁶J boxed green →
  answer stated → guardrail (tiny photon energy = why radio is harmless) →
  reusable template. English reveals placeholder; verified clean via
  Hinglish. Re-author once real English data lands.

## Skipped for now (placeholder audio/reveals — see known-issue)
Sec 24, 25, 26, 27, 28, 29, 30, 34, 35, 36, 49, 50, 51, 55, 56, 57 — not yet
started. Do not begin until the audio pipeline is confirmed fixed; then
revisit these together with Sec 4/19–23 above as one batch.

- Sec 31: Energy of the orbit: the KE and PE split — KE=½mv²=Ze²/8πε₀r and
  PE=−Ze²/4πε₀r chips → energy-well diagram (E=0 line, a drawn dip, electron
  dot sitting below it labelled "E<0") with the guardrail that PE is
  negative → Eₙ=KE+PE combines → Eₙ=−13.6Z²/n² eV boxed green → guardrail
  (memorise PE=−2KE, E=−KE) → staircase callback. PASS both languages,
  FORCE_SHOTS eyeballed clean. First section of subtopic 3 (Bohr Model &
  Wave-Particle Duality) actually authored (24–30 deferred, see known-issue).

## Current
Sec 32: "The hydrogen spectrum and the Rydberg equation" — starting.
