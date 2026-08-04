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

## Blocked — truncated audio (9 sections, skip and continue past)
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

## Current
Subtopic 1 (Kossel-Lewis/Ionic & Covalent/Dipole, secs 1-10). Sec 6 blocked
(see above). Next: Sec 8.
