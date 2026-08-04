# Ch05 · Chemical Thermodynamics (Class 11 Chemistry) — scene progress

Branch: premium-board-chem5 · port 3024 · chapter_id a6961d73-9ca9-5716-8e0c-61c69c5e343f
Total sections: 35.
Data: JSON_LESSONS/Class11_Chem/c11_ch05_chemical-thermodynamics_full.json (board_events +
narration); real reveals come from Supabase lesson_sections (board_reveal_at_english/
_hinglish) — merged and cached at scratchpad/ch5_sections.json via scratch/get-ch5-sections.mjs
(re-run if session restarts).

Naming: C11Ch05SecM.tsx / component C11Ch05SecM (C11 prefix avoids clash with physics ChM).
Registered in a dedicated block at the END of index.ts:
  const C11CH05 = "a6961d73-9ca9-5716-8e0c-61c69c5e343f";
  REGISTRY[`${C11CH05}:M`] = C11Ch05SecM;

Verify per section:
`PORT=3024 CHAPTER_ID=a6961d73-9ca9-5716-8e0c-61c69c5e343f node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<M>`
Done only on VERDICT PASS (both languages, overlaps=0 overflow=0 empty=0).

## Subtopics
1. Thermodynamic Terms, First Law, Internal Energy & Enthalpy — secs 1–9
2. Thermochemistry, Enthalpy of Reactions & Hess's Law — secs 10–17
3. Entropy, Gibbs Free Energy, Spontaneity & the Second/Third Laws — secs 18–25
4. Calorimetry, Thermodynamic Processes & Additional Enthalpy Changes — secs 26–33
5. Recap + cheat sheet — secs 34–35

## Done
- [x] Sec 1 — System/surroundings: boundary circle (SYSTEM/SURROUNDINGS), real-vs-imaginary
      note, OPEN/CLOSED/ISOLATED boxes color-coded green/amber/red by what crosses, verdict chip.
- [x] Sec 2 — State vs path functions: hill-climb graph, winding road (state) vs steep steps
      (path), comment row erases/rewrites per beat, final stamp.
- [x] Sec 3 — First law + sign convention: system box, q/w arrows enter, ΔU lands, hero formula,
      sign-convention rows for q and w accumulate, caution stamp on process-vs-state.
- [x] Sec 4 — Reversible/irreversible work: P-V diagram, irreversible rectangle then reversible
      curve (bigger area), free-expansion side panel, cyclic row, formula q(cycle)=-w(cycle).
- [x] Sec 5 — Formula toolkit: accumulating formula board (master law, irreversible/reversible
      work formulas, R-value caution, free-expansion closer).
- [x] Sec 6 — Enthalpy H=U+PV, derive ΔH=ΔU+Δngas·RT, red Δngas-counting note, qV/qP pair, Cp-Cv=R.
- [x] Sec 7 — WE1 (CBSE flask ΔU=+170J) + WE2 (NEET Δngas bridge ΔH≈14.5kJ), red trap note.
- [x] Sec 8 — WE3 (JEE Main isothermal reversible, ΔU=ΔH=0, q=+6.92kJ) + WE4 (JEE Advanced
      w(rev) vs w(irr) same states, reversible extracts more work).
- [x] Sec 9 — Tips: four red trap chips (sign of work, wrong R, Δngas counting, q/w not state
      functions) + green isothermal-reflex pro-tip. SUBTOPIC 1 DONE (9/9).

- [x] Sec 10 — Enthalpy of reaction: side-by-side exo (green)/endo (red) enthalpy-level diagrams.
- [x] Sec 11 — Hess's law: A-D-B triangle cycle (direct = step1+step2), formation table datum.
- [x] Sec 12 — Family of enthalpy changes: 3x2 card grid (formation/combustion/neutralisation/
      phase transitions/bond/lattice enthalpy).
- [x] Sec 13 — Three engines: Hess algebra legal moves, bond-enthalpy method, Born-Haber loop
      order + sign discipline.
- [x] Sec 14 — Master formulas: ΔrH from formation/bond enthalpies (opposite direction red note),
      ΔsubH, full Born-Haber formula.

- [x] Sec 15 — WE1 (CBSE ethene hydrogenation, ΔrH°=-137.0kJ/mol) + WE2 (NEET Hess combo,
      ΔH=-110.5kJ, sign-flip trap on subtracting eq ii).
- [x] Sec 16 — WE3 (JEE Main methane combustion bond tally, ΔrH=-798kJ/mol) + WE4 (JEE Advanced
      KCl Born-Haber loop solved, lattice=-718kJ/mol).
- [x] Sec 17 — Tips: five red trap chips (reverse sign, extensive scaling, bond-enthalpy
      direction, elements ΔfH=0, Born-Haber sign chaos) + green pro-tip. SUBTOPIC 2 DONE (8/8).

## Current
Subtopic 2 (Thermochemistry/Hess's Law) complete, secs 10-17 pushed. Next: Sec 18
(Entropy/Gibbs/Spontaneity subtopic, secs 18-25).
