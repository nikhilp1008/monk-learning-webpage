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

- [x] Sec 18 — Spontaneity: 3 examples, hypothesis "spontaneous=exothermic?" crossed out red,
      two counter-examples (ice melting, NH4Cl), green disorder conclusion.
- [x] Sec 19 — Entropy: microstates, ranking note, second law ΔSuniv>0/=0, solid/liquid/gas
      particle-box diagram (the visual proof).
- [x] Sec 20 — Gibbs G=H-TS, ΔG<0 spontaneous, max useful work; third law perfect crystal S=0,
      absolute entropies note.
- [x] Sec 21 — Derivation of ΔG<0, four ΔH/ΔS cases with T as referee, ΔG-to-K link, classic 2x2
      sign-case grid (spontaneous-all-T/low-T/high-T/never).
- [x] Sec 22 — Entropy/Gibbs/equilibrium formula toolkit (accumulating board).

- [x] Sec 23 — WE1 (CBSE ΔG at 298K=-33.3kJ/mol, spontaneous) + WE2 (NEET crossover T=300K).
- [x] Sec 24 — WE3 (JEE Main total entropy=+338.6J/K, spontaneous) + WE4 (JEE Advanced K≈0.32,
      T where K=1 => 314K).
- [x] Sec 25 — Tips: 4 red traps (kJ/J clash, surroundings sign, spontaneity≠rate, third-law
      pure-crystals) + diamond/graphite example + green pro-tip. SUBTOPIC 3 DONE (8/8).

- [x] Sec 26 — Calorimetry opens subtopic 4: sealed bomb icon (const V, ΔU) vs open coffee-cup
      icon (const P, ΔH), red recall note, ΔH=ΔU+Δngas.RT conversion.
- [x] Sec 27 — Four idealised processes: single P-V diagram, four paths (isothermal/adiabatic/
      isobaric/isochoric) fanning from one common state.
- [x] Sec 28 — Enthalpy of solution: lattice(+,red,up)/hydration(-,green,down) Hess cycle,
      cold-pack vs hand-warmer outcome chips.
- [x] Sec 29 — Three derivations: adiabatic work (q=0=>ΔU=w=nCvΔT), bomb-calorimeter procedure,
      Trouton/Kirchhoff enrichments.
- [x] Sec 30 — Calorimetry/processes/Poisson formula toolkit (accumulating board).

- [x] Sec 31 — WE1 (CBSE bomb calorimeter => -19.7 kJ/g) + WE2 (NEET NaCl ΔsolH=+4kJ/mol,
      mildly endothermic).
- [x] Sec 32 — WE3 (JEE Main adiabatic cooling, ΔU=-2494J, ΔH=-4157J) + WE4 (JEE Advanced
      Poisson relation, T2=172.3K).
- [x] Sec 33 — Tips: 5 rows (bomb/cup conversion, adiabatic!=isothermal, sign-swap, lattice sign,
      free expansion) + green freeze-the-variable pro-tip. SUBTOPIC 4 DONE (8/8).

- [x] Sec 34 — Chapter formula recap: four-quadrant board, one per subtopic, every major
      formula in the chapter in one reference.
- [x] Sec 35 — Quick-recall cheat sheet: seven mnemonic rows spanning the whole chapter
      (signs, state-vs-path, R/Δngas, formation-vs-bond direction, Gibbs four cases,
      surroundings sign + rate, bomb/cup + adiabatic/isothermal). FINAL SECTION.

## CHAPTER COMPLETE — 35/35 sections done, verified (both languages), committed, pushed.

All 4 subtopics + formula recap + cheat sheet done:
1. Thermodynamic Terms, First Law, Internal Energy & Enthalpy (1-9)
2. Thermochemistry, Enthalpy of Reactions & Hess's Law (10-17)
3. Entropy, Gibbs Free Energy, Spontaneity & the Second/Third Laws (18-25)
4. Calorimetry, Thermodynamic Processes & Additional Enthalpy Changes (26-33)
5. Recap (34) + Cheat Sheet (35)
