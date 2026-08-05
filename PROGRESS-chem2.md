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

## ✅ RESOLVED: placeholder audio + reveal timing (was: 22/57 sections)
As of 2026-08-05 the audio pipeline was fixed for the sections that were
previously skipped/provisional: **4, 19–30, 34–36, 49–51, 55** all now carry
real per-audio `board_reveal_at_*` timestamps on the normal
`audio.monklearning.com/.../c02/p<N>/...` host. Sec 4 and 19–23 (authored
earlier on placeholder timing) were diffed against the new Supabase rows —
board_content/segments are unchanged in structure and count, so no
choreography rewrite was needed, just re-verification against the new
timestamps (all PASS, see entries below). Sec 24–30, 34–36, 49–51, 55 were
authored fresh against the real data. **This chapter's 22-section backlog
from the old issue is now fully cleared** except Sec 56–57, which hit a new,
different problem — see below.

## ⚠ NEW KNOWN ISSUE: Sec 56–57 audio hosted on a broken CDN bucket
Sec 56 ("Complete formula toolkit") and Sec 57 ("Chapter cheat sheet: quick
recall") — the two "Chapter Close: Formula Recap & Cheat Sheet" sections —
have real, sensible `board_reveal_at_*` arrays (10 entries each, not 8) and
real segment scripts, but their `audio_url_english`/`_hinglish` point to
`https://pub-bada3b1295adc1752795143056d59921.r2.dev/chemistry/class_11/
ch_02/sec_5{6,7}_{english,hinglish}.mp3` — a **different CDN** (Cloudflare R2
public bucket) than every other section's `audio.monklearning.com` host.
That bucket returns **401 Unauthorized** on all four files (confirmed via
curl with headers, and re-checked a few seconds later — not transient/rate
limiting, a real access-control misconfiguration on the bucket).

Consequence: the app's board playback is driven entirely by the real
`<audio>` element's `timeupdate` events. With the file failing to load
(`readyState` stays `0`, `duration` stays `null`), the player can never
advance past `currentTime=0` — confirmed by seeking the DOM audio element
directly in a standalone Playwright script (`a.currentTime = 20` "succeeds"
per the attribute, but the app's own currentTime state never follows, since
it never gets a `timeupdate`). So `verify-scene.mjs` "PASSes" on these two
sections, but it's a **false positive**: the board never leaves its blank
t=0 state, so there's trivially nothing to overlap/overflow.

Both scenes were authored anyway (real reveals, real content, tsc-clean) and
manually confirmed correct via a direct DOM inspection that bypasses the
broken player (checked the SVG's actual text content and each card's
position — everything present and positioned as designed). They're
committed but **not** claimed as VERDICT PASS. Once the r2.dev bucket's
public access is fixed, these just need a normal `verify-scene.mjs` run —
no rewrite expected.

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

- Sec 32: The hydrogen spectrum and the Rydberg equation — ΔE=hν=hc/λ setup
  → hc/λ formula → ν̄=R_H(1/n₁²−1/n₂²) boxed green → guardrail (R_H from
  fundamentals) → full 4-level energy diagram (n=1..4) with color-coded
  Lyman (red, UV), Balmer (green, visible), Paschen (amber, IR) transition
  arrows → named-series explanation → Bohr's climax closer. PASS both
  languages, FORCE_SHOTS eyeballed clean — best diagram yet.

- Sec 33: de Broglie derives Bohr's quantisation — standing-wave analogy
  caption → guardrail (whole number of wavelengths) → 2πr=nλ chip →
  λ=h/mv⇒mvr=nh/2π boxed green → a real parametrically-generated wavy closed
  loop (8 humps) wrapped around a reference circle with the nucleus at
  center, visually proving "a whole number of wavelengths fits the orbit" →
  guardrail (Bohr assumed it, de Broglie DERIVED it) → n-count closer.
  PASS both languages, FORCE_SHOTS eyeballed clean — striking diagram.

- Sec 37: Worked example (CBSE): radius and energy of He+ (n=3) — given
  (Z=2, n=3, a₀=0.529Å) → r₃=2.38Å boxed green → E₃=−6.04eV boxed green →
  guardrail (scaling forms directly, no rebuild) → bound-electron note →
  answer stated → guardrail (entire method = plug n,Z into the two ratios).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 38: Worked example (NEET): same transition, different ion — given (H
  Lyman 1216Å) → guardrail (the trap: relaunching full Rydberg calc) →
  Z²-scaling explain → ratio 1/4 boxed green → 304Å boxed green → fast
  answer → guardrail (Z² scaling, never recompute from scratch). PASS both
  languages, FORCE_SHOTS eyeballed clean.

- Sec 39: Worked example (JEE Main): standing wave in the n=2 orbit — given
  (n=2, v₁=2.18×10⁶m/s) → v₂ chip → λ=h/mv₂ chip → r₂,2πr₂ chip → ratio
  2πr₂/λ≈2=n boxed green → a real 2-hump standing wave drawn wrapped around
  a reference circle (reused/fixed the Sec33 arc-drawing technique) →
  guardrail (exactly TWO wavelengths fit) → direct-confirmation closer.
  PASS both languages, FORCE_SHOTS eyeballed clean. Also fixed a latent bug
  found while building this: Sec33's beat-5 reference circle used a
  degenerate single-arc SVG path (start/end ~1px apart, undefined per spec);
  split into two proper semicircle arcs — re-verified Sec33 PASS clean.

- Sec 40: Worked example (JEE Advanced): line count to shortest wavelength —
  given (6 lines from ground state) → n(n−1)/2=6⇒n=4 boxed green →
  E₁,E₄ (He⁺,Z=2) chip → ΔE=51.0eV boxed green + a two-level energy ladder
  diagram (n=4/n=1 lines, red absorption arrow up, green emission arrow
  down — same gap, opposite direction) → explain (shortest λ = largest
  emission gap = same 51.0eV) → λmin=24.3nm boxed green → guardrail chain
  chip (line count → n → energy levels → photon wavelength). PASS both
  languages, FORCE_SHOTS eyeballed clean.

- Sec 41: Pitfalls and pro-tips: Bohr and duality — 4 numbered red-circle
  pitfalls (wrong scaling power, miscounting lines n(n−1)/2, Bohr only for
  one-electron species, dropping the negative sign on Eₙ), a sign-convention
  sub-note, a red-bordered pro-tip (same transition/different ion ⇒
  λ∝1/Z², E∝Z²), closing on the series-order + n₁ rule recap. PASS both
  languages, FORCE_SHOTS eyeballed clean.

**Subtopic 3 (Bohr's Model & Wave-Particle Duality, Sec 28-41; 24-30
deferred, see known-issue) complete.**

- Sec 42: From orbit to orbital: Schrödinger's probability cloud — anchor
  (Bohr in ruins) → explain (sharp orbit needs a definite path, now
  fiction) → Schrödinger (1926) wave-equation chip → ψ²=probability chip
  (red, high-emphasis per source's red-margin/high note) → "an ORBITAL"
  land (green) → a real 4-ring concentric probability-cloud diagram (denser
  near a red nucleus dot, amber rings of increasing opacity toward center)
  → spinning-fan-blade analogy → guardrail (region of likely presence,
  NEVER a path). PASS both languages, FORCE_SHOTS eyeballed clean. First
  section of subtopic 4 (Quantum Model, Orbitals & Electron Configurations).

- Sec 43: The electron's postal address: quantum numbers and orbital shapes
  — fan-disc anchor → explain (numbers fall out of Schrödinger's equation)
  → 4-chip postal-address row (n=city/l=street/mₗ=house/mₛ=seat, written
  plain "ml"/"ms" — no subscript-letter glyphs risked) → Pauli guardrail
  chip (no two electrons share the same full address) → shape-fixed-by-l
  explain → three real hand-drawn orbital shapes (s sphere, p 2-lobe
  dumbbell, d 4-lobe cloverleaf, each in a distinct warm tone) → 2l+1
  pattern explain → closing (house numbers mₗ is allowed to take). PASS
  both languages, FORCE_SHOTS eyeballed clean.

- Sec 44: Seating the electrons: Aufbau, Pauli, Hund — wedding-guests
  anchor → 3 numbered rules (Aufbau=cheapest seats first, Pauli=no
  identical address, Hund=own seat before doubling up — Hund's row in
  green per its high-emphasis source note) → explain (rules generate every
  configuration) → explain (and the periodic table's structure) → red
  teaser closer (seat order comes from the (n+l) rule, next). PASS both
  languages, FORCE_SHOTS eyeballed clean.

- Sec 45: Assigning quantum numbers and counting nodes — explain (work
  outward: l=0..(n−1), mₗ=−l..+l, then spin, written plain "ml"/"ms") →
  guardrail (order matters, house number before street) → radial=n−l−1,
  angular=l, total=n−1 boxed green → wiggle-room explain → 3p worked check
  (angular=1, radial=1, total=2=n−1) → self-check guardrail (radial+angular
  =n−1) → node definition + a real hand-built radial-probability curve
  (two humps meeting the r-axis at exactly one point, red node dot+label).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 46: Ordering energies: the (n+l) rule and shielding — explain
  ((n+l), ties by lower n) → 4s(n+l=4)<3d(n+l=5) boxed green → a two-level
  diagram (3d drawn above 4s, 4s in green) with the famous-ordering
  guardrail → why-physically explain (higher l, poorly shielded) → a
  penetration row (nucleus dot + s/p/d/f dots at increasing distance,
  "penetration & tightness decrease →") → guardrail (Zeff decreases as l
  increases) → one-electron-species caveat closer. PASS both languages,
  FORCE_SHOTS eyeballed clean.

- Sec 47: Writing configurations: anomalies and ions — fill-order chip →
  capacities chip (s=2,p=6,d=10,f=14) → Cr/Cu guardrail + a real
  OrbitalBox diagram (5 singly-occupied 3d boxes + 1 singly-occupied 4s
  box, chem-kit's ↑/↓ component, visually proving the half-filled-d⁵
  stability) → Cr/Cu formula line (green) → ion rule explain (remove
  highest n first) → Fe:[Ar]3d⁶4s²⇒Fe²⁺=[Ar]3d⁶ boxed green → "last in,
  not last out" explain → guardrail (never [Ar]3d⁴4s² — classic error).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 48: Orbital shapes and the meaning of nodes — s/p node explain →
  a real two-panel diagram (left: p-orbital dumbbell with a dashed RED
  nodal PLANE through the waist; right: s-orbital sphere with a dashed
  RED nodal circle = radial shell, nucleus dot at center) labelled
  "angular node: a plane" / "radial node: a spherical shell" → d-orbital
  explain (5 members, cloverleaf+dz²) → guardrail (angular=l carves
  shape, radial=n−l−1 are shells) → L=√(l(l+1))·h/2π formula chip →
  closer (nodes total n−1, higher shells = larger structured cloud).
  PASS both languages, FORCE_SHOTS eyeballed clean.

**Subtopic 4 core concepts (Sec 42-48) complete — Sec 49-51 skipped,
placeholder audio, see known-issue.**

- Sec 52: Worked example (NEET): nodes of a 4d orbital — given (n=4,l=2)
  → trap guardrail (n−1 is NOT the radial count) → radial=n−l−1=1 boxed
  green → angular=l=2, total=n−1=3 boxed green → self-check guardrail
  (1+2=3=n−1 ✓) → a 1+2=3 dot tally (amber/red/green dot groups labelled
  radial/angular/total) → closing guardrail (recheck if they don't sum).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 53: Worked example (JEE Main): 3d subshell and Fe2+ — L=√6·h/2π
  (l=2) boxed green → orbitals=2l+1=5, max electrons=4l+2=10 chip →
  radial nodes of 3d=n−l−1=0 chip → neutral Fe=[Ar]3d⁶4s² chip →
  guardrail (highest-n first, the 4s pair) → Fe²⁺=[Ar]3d⁶ boxed green →
  closer (4s leaves before 3d, even though filled first). PASS both
  languages, FORCE_SHOTS eyeballed clean.

- Sec 54: Worked example (JEE Advanced): a universe with three spin
  values — given (spin=−½,0,+½; find n=3 capacity & Z=10 config) →
  guardrail (orbital count comes from n,l NOT spin) → n=3:n²=9 orbitals
  chip → max electrons=3×9=27 boxed green → new capacities (s=3,p=9,
  d=15) chip → Z=10:1s³2s³2p⁴ boxed green → guardrail (capacity=orbital
  count×spin values — the whole trick). PASS both languages, FORCE_SHOTS
  eyeballed clean.

## Session 2026-08-05 — audio fixed, cleared the deferred backlog

**Re-verified against real audio (no code changes needed — reveals are
runtime props, and board_content/segments matched the earlier placeholder-
timed authoring in structure and count):**
- Sec 4: The iso-family — PASS.
- Sec 19: Method — turning a wavelength into a photon energy — PASS.
- Sec 20: Method and meaning — the photoelectric effect and its four laws
  — PASS.
- Sec 21: Wave and Planck relations — PASS.
- Sec 22: The photoelectric toolkit — PASS.
- Sec 23: Worked example (CBSE): FM radio photon — PASS.
(Stale "NOTE: stale audio" header comments removed from all six files.)

**Newly authored against real audio:**

- Sec 24: Worked example (NEET): will it eject electrons? — threshold
  check, E=1240/700=1.77eV boxed green, compare vs W₀=2.0eV, guardrail
  (single photon can't pay the exit fee, regardless of intensity). PASS
  both languages, FORCE_SHOTS eyeballed clean.

- Sec 25: Worked example (JEE Main): photons per second from a laser —
  He-Ne laser given → E=1.96eV chip → N=P/E setup → N=1.59×10¹⁶ photons/s
  boxed green → guardrail template (wavelength→energy, then power/energy).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 26: Worked example (JEE Advanced): two stopping potentials — the
  "subtract to kill W₀" signature move, four formula chips chaining to
  1.03eV boxed green then W₀=2.28eV boxed green. PASS both languages,
  FORCE_SHOTS eyeballed clean.

- Sec 27: Pitfalls and pro-tips: radiation and the photoelectric effect —
  4 numbered pitfalls (intensity-vs-frequency, threshold, unit slips,
  wavenumber-vs-frequency), pro-tip chip (1240/λ shortcut), closing note.
  PASS both languages, FORCE_SHOTS eyeballed clean.
  **Closes subtopic 2 (Electromagnetic Radiation, Sec 15-27) — fully done.**

- Sec 28: The crisis and the staircase clue — opens subtopic 3. A real
  hand-drawn ramp-vs-staircase diagram (continuous diagonal line with one
  red dot vs a 4-step green staircase with a red dot on each tread)
  visually proving "sharp lines ⇒ a staircase of allowed energies." PASS
  both languages, FORCE_SHOTS eyeballed clean — striking diagram.

- Sec 29: Bohr's bold rules and a preview of what breaks them — stationary
  orbits explain, mvr=nh/2π chip, "spectacular success" green line, the
  de Broglie/Heisenberg patch explain, one-electron-species guardrail,
  cricket-ball closer. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 30: Deriving the Bohr radius — the derivation hub: force-balance
  chip → electrostatic explain → rearranged chip → Bohr's rule (RED) →
  rₙ=0.529n²/Z Å boxed green → scaling guardrail (r∝n²/Z, n=1,Z=1⇒0.529Å)
  → derivation-summary closer. PASS both languages, FORCE_SHOTS eyeballed
  clean.

- Sec 34: Why Bohr's model still fails — 4 numbered cracks (one-electron
  only, can't predict helium, can't explain Zeeman/Stark, can't explain
  bonding) → guardrail on the deepest failure (definite orbit violates
  Heisenberg) → wave-nature explain → green teaser to the quantum model
  next. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 35: The four scaling laws — reference-card stack: mvr=nh/2π →
  rₙ boxed green → Eₙ boxed green → vₙ chip → proportionality guardrail
  (r∝n²/Z, E∝Z²/n², v∝Z/n, ν̄∝Z²) → time-saver explain → Bohr-radius
  landmark note. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 36: Rydberg, series, de Broglie, and Heisenberg — toolkit part 2:
  Rydberg equation boxed green → R_H+series explain → line-count chip →
  de Broglie λ boxed green → "light, fast particles only" guardrail →
  uncertainty principle boxed green → RED closer ("the death blow to
  Bohr's sharp path"). PASS both languages, FORCE_SHOTS eyeballed clean.
  **Closes subtopic 3 (Bohr's Model & Wave-Particle Duality, Sec 28-41)
  — fully done** (Sec 31-33, 37-38 were already done in an earlier
  session).

- Sec 49: Quantum numbers and counting relations — reference card 1:
  the 4 QN ranges chip → L=√(l(l+1))·h/2π boxed green → orbital-count
  and electron-capacity formulas boxed green → s-electron zero-L explain
  → familiar capacities (s2p6d10f14) → guardrail (backbone of every
  configuration question). PASS both languages, FORCE_SHOTS eyeballed
  clean.

- Sec 50: Nodes, the (n+l) rule, and the three principles — reference
  card 2: node-count formula boxed green → (n+l) rule guardrail → Aufbau
  order chip → three-principles explain → one-electron-degenerate
  guardrail → Cr/Cu anomalies → guardrail (ions strip highest n first).
  PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 51: Worked example (CBSE): scandium configuration and quantum
  numbers — opens subtopic-4 worked examples. Fill-order given →
  Sc=[Ar]3d¹4s² boxed green → differentiating-electron explain → n,l
  explain → mₗ/mₛ chip → guardrail ((n,l,mₗ,mₛ)=(3,2,−2,+½)) → assignment
  routine closer. PASS both languages, FORCE_SHOTS eyeballed clean.

- Sec 55: Pitfalls and pro-tips: the quantum model — 4 numbered pitfalls
  (node types, lower-n≠lower-energy, 3d-before-4s error, Cr/Cu forgotten)
  → allowed-QN-set subnote → pro-tip chip (neutral atom first, then
  strip highest n) → closing (anchor on total=n−1). PASS both languages,
  FORCE_SHOTS eyeballed clean. **Closes subtopic 4 (Quantum Model,
  Orbitals & Electron Configurations, Sec 42-55) — fully done.**

- Sec 56, 57: authored but **BLOCKED**, not VERDICT PASS — see the new
  known-issue above. Both are 10-beat dense card-grid layouts (4×2 + a
  closing strip for 56; 3×3 for 57) built from the real board content;
  tsc-clean; content/positions manually confirmed correct via direct DOM
  inspection since the broken audio CDN prevents driving the real player.

## Current
All sections assigned this session are done: re-verified 4/19-23 (6),
newly authored 24-30/34-36/49-51/55 (16) — 22 sections total, all VERDICT
PASS except Sec 56-57 which are authored+committed but blocked on the
r2.dev audio CDN's 401s (see known-issue). Every real-audio section in the
chapter is now authored except 56-57. Nothing else is deferred for
placeholder-timing reasons anymore — that issue is fully resolved.
Next up: fix the r2.dev bucket's public access, then run verify-scene.mjs
on 56 and 57 to close out the chapter.
