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

## Current
Subtopic 1 (Thermo Terms/First Law, secs 1-9). Sections 1-5 pushed. Next: Sec 6.
