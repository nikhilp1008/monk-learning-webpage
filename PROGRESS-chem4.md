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

## Current
Subtopic 1 (Kossel-Lewis/Ionic & Covalent/Dipole, secs 1-10). Next: Sec 5.
