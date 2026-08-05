# C11 Chemistry Ch04 "Chemical Bonding and Molecular Structure" — scene progress

Branch: premium-board-chem4 · port 3023 · chapter_id `862ab5f0-4fa8-5e6f-98d5-74fe5b10ab8e`
Total sections: 38. Data source: Supabase `lesson_sections`, full dump cached at
`scratchpad/chem4_sections.json`; per-section printout via `scratchpad/sec.py <n>`.

Naming: files `C11Ch04Sec<N>.tsx`, component `C11Ch04Sec<N>`; registered at END of
`src/components/scenes/index.ts` under the `C11CH04` block (import + `REGISTRY[...]`
lines appended together, mirroring the Ch03 chemistry pattern).

Read `SCENE_AUTHORING_CHEMISTRY.md` FIRST for every section (domain layer — draw
Lewis structures bond by bond, curved arrows for mechanism, wedge/hash for VSEPR,
orbital boxes for MOT), then base `SCENE_AUTHORING.md` (canvas, beats, layout-plan
math, the dim/overlap rule — never draw over dimmed content, use free space or
fully remove old content, no scrolling), then `chem-kit.tsx` for the primitives.
This is the first chapter to actually exercise `chem-kit.tsx`.

Verify per section:
`PORT=3023 CHAPTER_ID=862ab5f0-4fa8-5e6f-98d5-74fe5b10ab8e node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`

## Subtopics
1. Kossel-Lewis Approach, Ionic & Covalent Bonds, and Dipole Moment — secs 1–10
2. VSEPR Theory, Valence Bond Theory & Hybridization — secs 11–19
3. Molecular Orbital Theory (MOT) & Hydrogen Bonding — secs 20–28
4. Coordinate Bonding, Back Bonding & Advanced Bond-Angle Concepts — secs 29–36
5. Chapter Close — secs 37–38

## Done
- Sec 1 — The octet rule and the two routes: generic atom shell icon (5 filled +
  3 empty dots, dashed red) → octet-rule chip → TRANSFER/SHARE fork cards →
  red-margin ionic/covalent split → Kossel/Lewis attribution chip → real Na (1
  dot) + Cl (7 dots) Lewis structures with a curved transfer arrow → Na⁺/Cl⁻
  swap (mutually-exclusive beat gating, no erase needed) with Cl's 8th dot
  pairing up → dashed electrostatic-attraction line → green verdict chip
  (ionic = a sale · covalent = a joint venture).

- Sec 2 — Polar bonds and dipole moment: H–Cl bond with the shared pair drawn
  asymmetric (pulled toward Cl) → δ⁺/δ⁻ + crossed-tail dipole arrow + "polar
  bond · μ" chip → small vector icon ("pulls are vectors") → BF3 trigonal
  3-arrow cancellation (net μ = 0) → CO2 (linear, cancels) vs H2O (bent,
  doesn't) mini diagrams side by side → red-margin "octet rule is a guide not
  a law" → 3 empty boxes filled with the exception families (electron-
  deficient / expanded octet / odd-electron) → green closing chip (Lewis =
  connectivity map, not geometry).

- Sec 3 — Bond-parameter toolkit (formulas): formal-charge card (FC=V−L−B/2,
  definitions, red ΣFC=overall-charge check) → bond-order card (N₂/CO/NO⁺=3)
  with a trend block (BO↑ ⇒ enthalpy↑, length↓) between it and → bond-length
  card (d=r_A+r_B, 1Å=100pm) → bond-enthalpy card (kJ/mol, mean for identical
  bonds) → lattice-enthalpy card (charge↑/size↓ ⇒ lattice enthalpy↑).

- Sec 4 — Dipole moment and % ionic character (formulas): dipole-moment card
  (μ=q·d, vector + → −, SI unit C·m too large → debye, 1 D=3.336×10⁻³⁰ C·m
  conversion) → net-dipole card (Σ bond dipoles, ties back to symmetry) →
  red "no bond is 100% ionic or covalent" → %-ionic-character card (formula,
  μ_ionic=e·d, green speed-trick e×100pm≈4.8 D).

- Sec 5 — The 5-step Lewis-structure recipe: 5 step cards appear one per beat
  (count e⁻ / central atom / bonds+fill octets / multiple bonds / verify)
  while a LIVE CO₂ build runs underneath in lockstep — atoms placed, C ringed
  as central, single bonds + 3 lone pairs per O with a red "C is short" flag,
  then red curved arrows push a lone pair from each O into its bond (double
  bonds land), green "octets ✓" note, formal-charge arithmetic for C and O
  (both = 0), green verdict chip.

## Blocked — truncated audio (UPDATED, 14 sections, skip and continue past)
Re-audited more reliably after finding more casualties by comparing
`duration_sec_english` vs `duration_sec_hinglish` directly (ratio < 0.6 flags
it) plus a check for placeholder reveal arrays (3+ early beats spaced exactly
~1.0s apart, e.g. `[0,1,2,3,...]`) — the original byte-length-vs-own-metadata
check missed cases where the short recording's bytes matched ITS OWN (also
wrong) declared duration. Full corrected list, English audio only unless
noted:
- **Sec 6 — BOTH languages** truncated (~19.5s real vs 68s claimed).
- **Sec 20, 21, 22, 23, 24, 26, 27, 28** (subtopic 3) — English only.
- **Sec 29, 30, 33, 35, 36** (subtopic 4) — English only, newly found.
- Hinglish is clean everywhere except Sec 6. Sec 25, 31, 32, 34, 37, 38 and
  all of subtopics 1-2 are confirmed OK (EN/HI duration ratio 0.95-1.09).
14 of 38 sections blocked. Same policy as before: skip, render everything
else, come back once real English audio is uploaded for these.

## Blocked — original notes (superseded by the corrected list above)
Audited all 38 sections' hosted mp3s (Content-Length vs declared duration, using
the ~8025 B/s rate established from known-good files). Nine sections have a
placeholder `duration_sec = 68.0` in Supabase and a REAL audio file 30-70%
shorter than that — meaning `board_reveal_at` for these is synthetic/placeholder,
not derived from final audio. Confirmed via verify: Sec 6 silently seek-clamps
at ~19.7s (only 2 of 8 beats ever exercised) yet still printed `VERDICT: PASS`,
a false positive — the audio itself can't be seeked past its real (short) length.
- Sec 6 — BOTH languages truncated (~19.5s real vs 68s claimed).
- Sec 20, 21, 22, 23, 24, 26, 27, 28 — ENGLISH truncated (~23-38s real vs 68s
  claimed); Hinglish is fine for all of these.
- Sec 25 and all of 1-5, 7-19, 29-38 verified OK (real duration matches DB).
Per user decision: skip these 9 for now, render everything else in order, come
back to author+verify them once real audio is uploaded. `C11Ch04Sec6.tsx` is
already authored (Born-Haber cycle, 8-beat) but deliberately left UNREGISTERED
in index.ts (see comment there) since its timestamps are placeholder — re-verify
against real audio before registering, and expect the beat count/timing to
change once real reveals replace the synthetic evenly-spaced [0,8,16,...56].

- Sec 7 — Worked example: ozone (O₃) formal charges: task + electron count (18
  e⁻) → build the bent O=O-O structure (double bond one side, single the
  other, 1/2/3 lone pairs) → FC setup note (V=6 for all) → three calc lines
  (central +1, double-bonded terminal 0, single-bonded terminal −1) → red sum
  line (+1+0−1=0) → green verdict chip. Clean PASS, no stalls (real audio).

- Sec 8 — Two worked examples: Part A (NEET symmetry trap) 4 molecule chips
  (CCl₄/BF₃/CHCl₃/CO₂), green ✓ reasons under 3 that cancel by symmetry, red
  ring on CHCl₃ as the polar answer + trap line — then fully ERASES (opacity
  0, reclaiming the space, not dim-and-overlay) → Part B (JEE % ionic calc)
  builds fresh in the same region: setup, 3 calc steps, green sanity-check
  chip. Benign "stall" at the erase beat confirmed via screenshot (Part B
  genuinely renders, unlike Sec 6's real bug).

- Sec 9 — Worked example: azide ion resonance: electron count (16) → bracketed
  [N=N=N]⁻ structure built bond-by-bond (2 double bonds, lone pairs on
  terminals only, charge superscript) → central/terminal FC calc lines (+1,
  −1 each, sum −1 ✓) → resonance notation N≡N−N ↔ N=N=N ↔ N−N≡N → average
  bond order = 2 → closing insight (identical bond lengths, blended not
  flickering) + green chip.

- Sec 10 — Pitfalls and pro-tips (closes subtopic 1): 4 red-margin pitfall rows
  (FC≠oxidation number, don't drop the ½ on bonding term, many polar bonds ≠
  polar molecule, don't invert Fajans) → Fajans SHaPe mnemonic → polarity
  pro-tip (sketch for a centre of symmetry, never calculate) → green
  speed-trick chip (e×100pm≈4.8D). SUBTOPIC 1 DONE (9/10, sec 6 blocked).

- Sec 11 — VSEPR intro: anchor (Lewis is flat) → VSEPR name chip → 3 electron-
  pair arrangement icons (2→linear spokes, 3→trigonal spokes, 4→tetrahedral
  with wedge+hash) → lift-analogy caption → H2O built with oversized "suitcase"
  lone pairs + inward squeeze arrows → repulsion-order chips (LP-LP>LP-BP>
  BP-BP) → 104.5° stamp lands → closing (shape only, not why/strength) +
  green VBT-teaser chip.

- Sec 12 — VBT and the need for hybridisation: two circles overlapping (amber
  lens) → sigma (head-on ellipses) vs pi (sidewise ellipses) → mismatch text
  (raw VBT 90° vs CH₄ 109.5°) → hybridisation chip → OrbitalBox row: 1s+3p
  (single-electron boxes) → arrow → 4× sp³ boxes, tetrahedral CH₄ caption →
  red limitations chip (diborane, O₂ paramagnetism → MOT) → muted caution
  line (bookkeeping, not physical).

- Sec 13 — The geometry table (formulas): SN definition + H=½(V+M−C+A) formula
  → 4-column × 5-row table built column-by-column (SN|Hybridisation revealed
  first, then Geometry|Ideal angle in the same rows) covering SN 2-6 → %
  s-character line → σ/π bond-counting line. The master reference table for
  the rest of the subtopic.

- Sec 14 — Predicting shape step by step: 4 step cards (Lewis+SN / e-pair
  geometry / − lone pairs → shape / adjust angle) → NH₃ worked (1 LP,
  trigonal pyramidal, 107°) and H₂O worked (2 LP, bent, 104.5°) built
  side-by-side for direct comparison of how more lone pairs squeeze further.

- Sec 15 — Ethane-ethene-ethyne ladder: H₂ energy-well curve (74pm, 435.8
  kJ/mol) → carbon promotion line → 3-row ladder (H₃C–CH₃ sp³ single/154pm/
  free rotation, H₂C=CH₂ sp² double σ+π/134pm/locked, HC≡CH sp triple σ+2π/
  ~120pm/shortest) built with single/double/triple bond lines → trend
  (s-character↑, length↓, strength↑) + green chip.

- Sec 16 — Worked examples PCl₃ + XeF₂: Part A builds PCl₃ (P + 3 Cl trigonal-
  pyramidal, 1 lone pair, SN=4, shape trigonal pyramidal ~100°) → erases →
  Part B builds XeF₂ (H=½(8+2)=5→sp³d, linear F–Xe–F with 3 equatorial lone
  pairs) → red trap chip (2 bonds ≠ sp, lone pairs count too).

- Sec 17 — Worked example SF₄: H=½(6+4)=5→sp³d → e-pair geometry (TBP, 3
  equatorial+2 axial) → red reasoning line (LP→equatorial, fewer 90°
  neighbors) → see-saw structure built (2 axial F bent away from the LP, 2
  equatorial F, big LP) → asymmetric→POLAR (vs symmetric SF₆) → green answer
  chip (sp³d · see-saw · POLAR).

- Sec 18 — Worked example bond angle order H₂O/H₂S/H₂Se: 3 bent structures
  built side-by-side (O/S/Se, 2H, 2LP each) with color-coded angle stamps
  (104.5° green, 92° amber, 91° red) → "SN=4,sp³,bent yet angles differ" →
  electronegativity argument (2 lines) → s-character argument → green order
  chip (H₂O>H₂S>H₂Se, same hybridisation ≠ same angle).

- Sec 19 — Pitfalls and pro-tips (closes subtopic 2): 4 red-margin pitfall
  rows (e-pair geometry≠shape, never drop LPs from SN, same hybridisation≠
  same angle, don't muddle σ/π) → pro-tip (SN in one glance) → pro-tip (2
  shrinking forces: more LPs, less EN centre) + green chip. SUBTOPIC 2 DONE
  (9/9, all real audio, no blocks).

- Sec 25 — Worked example O₂ MO configuration: full 7-level MO energy diagram
  built bottom-to-top by Aufbau order (σ1s, σ*1s, σ2s, σ*2s, σ2pz, degenerate
  π2px/π2py, degenerate π*2px/π*2py with single red ↑'s for Hund's rule) on
  the left, with config text / bonding-antibonding count / BO=2 / PARAMAGNETIC
  / green answer chip on the right. The signature MOT worked example.

- Sec 31 — Bent's rule, Drago's rule, bond-angle framework: Bent's rule
  statement → NH₃ 107° vs NF₃ 102° → Drago's rule statement → PH₃/H₂S/AsH₃
  ~90° → 6-factor priority chain → fast diagnostic (same centre→Bent's, same
  substituent+heavier centre→Drago's) → 3c-2e bond intro + red chip
  (diborane, Al₂Cl₆).

- Sec 32 — Definitions to state precisely (formulas): 5 red-margin definition
  rows (coordinate/dative bond, back bonding, Bent's rule, Drago's rule,
  3c-2e bond) with 2 standalone fact lines between them (BX₃ Lewis acidity
  order, diborane electron-deficiency count).

- Sec 34 — Worked example Bent's vs Drago's diagnostic: side-by-side panels —
  LEFT (NH₃ 107° vs NF₃ 102°, substituent changed → BENT'S RULE, F pulls
  p-character) and RIGHT (NH₃ 107° vs PH₃ 93.5°, centre changed → DRAGO'S
  RULE, P resists hybridisation), each landing a colored answer chip, closed
  by a shared "spot what changed" insight line.

- Sec 37 — Chapter formula recap: 4-card row (formal charge, dipole moment, %
  ionic character, bond length+trend) → 2-card row (SN/H, MOT bond order) →
  MO ordering comparison line (≤N₂ vs >N₂) → anchor numbers (debye constant,
  H₂ well, ideal angles 180/120/109.5/90°).

- Sec 38 — Chapter cheat sheet (FINAL SECTION): row A 4 cards (octet, formal
  charge, dipole moment, VSEPR) → row B 6-column shapes-by-(bonds,LP) mini
  table (pyramidal/bent/see-saw/T-shaped/linear/sq.planar) → row C 3 cards
  (MOT with real bond orders, H-bond, refinements) → row D 5-line mnemonics
  roundup (SPSPDP, F-O-N, SHaPe, "bent eNegative gets P", "Drago down to
  90"). Clean PASS first try — the whole chapter distilled onto one card.

## Audio pipeline fixed — resuming the 14 blocked sections
Real audio + reveals are now in Supabase for all 14 previously-blocked
sections (6, 20-24, 26-30, 33, 35, 36) — confirmed via the same EN/HI
duration-ratio check (all now 0.9-1.1, no more placeholder `[0,1,2,3...]`
reveal patterns).

- Sec 6 re-verified — the original Born-Haber cycle scene (8 beats) needed
  ZERO code changes: real reveals are still 8 beats (same narration segments,
  same beat count), just with real decimal timestamps `[0,12.12,31.06,...]`
  instead of the synthetic `[0,8,16,...56]`. The `on={beat>=k}`/`dl(k,d)`
  gating is beat-index-based, not timestamp-value-based, so it carried over
  unchanged. Re-registered in index.ts, re-verified `VERDICT: PASS` with a
  FORCE_SHOTS check confirming the full 8-beat diagram (previously it only
  ever reached beat 2 due to the truncated audio clamping seeks). DONE.

- Sec 20 — When VBT meets oxygen: O₂ + field arrows ("sticks to magnet →
  paramagnetic") → red "Lewis/VBT pairs all e⁻, wrong magnetism" → MOT intro
  → 2 AOs fork into ANTIBONDING (2 circles + red node tick, higher energy)
  and BONDING (2 overlapping circles + green density lens, lower energy) →
  fill-consequence line → σ/π mini icons → O₂ 2 unpaired e⁻ + green chip.

- Sec 21 — The hydrogen bond intro: two H₂O molecules built bond-by-bond with
  δ⁺/δ⁻ labels, linked by a manually-dashed (tick-segment) H-bond from the
  δ⁺ H to the second O's lone pair → strength note (~1/10 covalent, >vdW) →
  linked-arms analogy → water liquid/ice floats → DNA base pairing → red
  guardrail (needs small+high-EN+lone pair, NOT Cl).

- Sec 22 — Bond order, MO orderings, H-bond defined (formulas): BO=½(Nb−Na)
  card → consequences line → ordering 1 (≤N₂: π<σ2pz) → ordering 2 (>N₂ O,F:
  σ2pz<π, red crossover emphasis) → magnetism line → LCAO conditions card →
  hydrogen-bond precise-definition card (strength 10−40 kJ/mol, 2 types).

## Current
Subtopic 1: 10/10 DONE (sec 6 fixed). Subtopic 2: 9/9 DONE. Subtopic 3: 4/9
done (25, 20, 21, 22) — authoring 23,24,26,27,28 now. Subtopic 4: 3/8 done
(31,32,34) — authoring 29,30,33,35,36 next. Subtopic 5: 2/2 DONE.
