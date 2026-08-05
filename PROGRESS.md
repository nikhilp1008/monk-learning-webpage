# Ch07 "Redox Reactions" — Class 11 Chemistry — scene progress

Worktree: `~/Downloads/monk-scenes-chem7` · branch `premium-board-chem7` · dev port 3026.
chapter_id `c6da3467-e267-576e-9999-a2687ffe9200` (subject chemistry, class_level 11).
44 sections total. Naming: `C11Ch07SecM.tsx` / component `C11Ch07SecM`; registry const `C11CH07`
(distinct from the existing physics `CH07` = Gravitation already in index.ts).

Data source: `JSON_LESSONS/Class11_Chem/c11_ch07_redox-reactions_full.json` — NOTE the bundle's
`section_index` restarts at 1 for part 2 (duplicated 1–20); use `global_index` (unique 1–44,
matches Supabase `position`) instead. Merged per-section data (narration EN/HI, board_events,
reveals EN/HI) cached at scratchpad/ch7_merged.json — confirmed all 44 sections' beat counts
match across narration/board_events/reveals before starting.

## Subtopics
1. Classical & Electronic Concepts / Oxidation Numbers — secs 1–11
2. Balancing Redox Reactions — secs 12–20
3. Redox Titrations & Electrochemical Cells — secs 21–31
4. Types of Redox & Redox in Action — secs 32–42
5. Consolidation — secs 43–44

## Done
- Sec 1 — Redox as one inseparable transaction: kirana-shop hook (erases), classical lens
  (2Mg+O₂→2MgO, O₂ highlighted, oxidised✓ callout, guardrail), electronic lens (Zn+Cu²⁺→Zn²⁺+Cu
  with oxidation numbers above every atom + red curved 2e⁻ transfer arrow), OIL RIG stamp.

- Sec 2 — The oxidation-number lens: "electronic lens has a limit" hook, CO₂ Lewis structure
  (double bonds + 4 lone pairs, "who lost/gained?"), O.N. definition card, red-margin rule
  (ox=↑O.N./red=↓O.N.), three numbered cautions (≠charge/≠valency, S–S split-zero, fractional
  O.N. = average only).

- Sec 3 — Core definitions: OXIDATION/REDUCTION 4-way chip rows, "agent does the OPPOSITE to
  itself" rule, oxidising-agent & reducing-agent cards with examples, REDOX definition stamp,
  DISPROPORTIONATION caution. Full vocabulary ladder stays on screen — no erasing needed.

- Sec 4 — Six O.N. assignment rules as a numbered badge ladder (free element=0, monatomic ion,
  fluorine always −1, oxygen exceptions, hydrogen exceptions, master Σ(O.N.)=net charge in
  red-margin), green verdict stamp closes it.

- Sec 5 — Master 5-step O.N. procedure (erases), then the peroxo trap worked example: naive
  H₂SO₅ calc gives S=+8 (crossed out, impossible), correct 3×O(−2)+2×O(−1 peroxide) gives
  S=+6 (ringed green) — "the rule never failed, the assumption did."

- Sec 6 — Formula-sheet recap: Σ(O.N.)=net charge boxed hero, neutral/ion sub-note, reference
  value chips (Group1/2, Al, F), H and O exception lines, red-margin "O.N. is dimensionless" note.

- Sec 7 — CBSE worked example: 4Al+3MnO₂→2Al₂O₃+3Mn, O.N. derivations (x+2(−2)=0 etc.), ox
  numbers above every atom, Al 0→+3 oxidised, Mn +4→0 reduced, agent naming (Al=reductant,
  MnO₂=oxidant), green answer box.

- Sec 8 — NEET speed trap: 5 chlorine species chips, "Cl=−1 everywhere" trap crossed out,
  4 quick derivations (HCl/HClO/HClO₃/HClO₄), proportionally-spaced number line (−1→+7) with
  species ticks, final inequality chain.

- Sec 9 — JEE Main CrO₅ trap: naive x=+10 crossed out (Cr max +6), drawn butterfly structure
  (terminal oxo Cr=O + 2 peroxo O−O links highlighted amber), correct x=+6 recalculation, redox
  prediction (Cr at ceiling → only reduced), green answer box.

- Sec 10 — JEE Advanced tetrathionate: naive average x=+2.5 flagged as WARNING, drawn linear
  S–S–S–S structure (terminal S with 3×O each), equal-split rule, central S=0 / terminal S=+5
  annotated on structure, verify calc confirms average, green answer stamp.

- Sec 11 — Pitfalls & pro-tips closer: 4 numbered pitfalls (sign slips, O/H exceptions,
  fractional O.N. read as real, agent↔effect confusion), PRO-TIP derive-don't-memorise,
  3-second exception sweep, red-margin ceiling check. ✅ SUBTOPIC 1 (secs 1–11) COMPLETE.
  Fixed: beat-0 heading and pitfall-1 row initially sat only 10px apart (read as one run-on
  line despite passing the overlap check since anchors differed) — pushed row1 down 30px.

- Sec 12 — Two-account ledger (mass + charge) opens Subtopic 2: red-margin electron-conservation
  rule, drawn electron see-saw (level beam, 2 e⁻ each side), two bookkeeping systems preview
  (oxidation-number method vs half-reaction method).

- Sec 13 — Limiting conditions & definitions: 3 conditions (medium matters, assumes ionic,
  product changes with medium — MnO₄⁻ example) + 3 definitions (half-reaction, skeletal eqn/
  spectator ions, n=e⁻ transferred forward-ref to n-factor), 6-badge ladder.

- Sec 14 — Oxidation-number method, 5 steps: assign O.N./ID changes, find Δ per atom→molecule,
  make total ↑=↓ (red, core move + "electron-balance in disguise" insight), balance remaining
  atoms leaving H/O last, balance O/H via medium then verify charge (red closer).

- Sec 15 — Half-reaction method (6 steps as 4 rows, erases), basic-medium shortcut (balance
  acidic → add OH⁻ per H⁺ → H₂O), back-to-molecular rule, red-margin worked example
  H₂S+2Fe³⁺ ionic → H₂S+2FeCl₃ molecular (verified balanced).

- Sec 16 — CBSE worked example: Cr₂O₇²⁻+Sn²⁺ in acid via ion-electron method, reduction half
  (6e⁻) + oxidation half (2e⁻) equalised via LCM=6, combined boxed green, charge check
  −2+14+6=+18=+6+12 ✓.

- Sec 17 — NEET speed trap: MnO₄⁻+C₂O₄²⁻ coefficient-only strategy, e⁻ count (5 vs 2, LCM=10),
  full balanced eqn (verified mass+charge), O-counting shortcut to H⁺=16, traps called out
  (5→10 CO₂, 1e⁻ vs 2e⁻ donor), red-margin habit closer.

- Sec 18 — JEE Main worked example: MnO₄⁻+I⁻→MnO₂+I₂ in BASIC medium, reduction half (3e⁻,
  H₂O/OH⁻ not H⁺), oxidation half, LCM=6, combined boxed green (verified balanced), red-margin
  lesson: MnO₄⁻ took only 3e⁻ here (not 5) because medium set the product.

- Sec 19 — JEE Advanced disproportionation: P₄+OH⁻→PH₃+H₂PO₂⁻, classify (0→−3 reduced,
  0→+1 oxidised), electron bookkeeping (1P per 3P), drawn branching diagram (P₄ box → reduction/
  oxidation boxes), full balanced eqn (verified O/H/charge all match).

- Sec 20 — Pitfalls & pro-tips closer: 4 traps (charge forgotten, wrong medium ions, halves not
  equalised, fixed-product assumption), PRO-TIP coefficient shortcut, red-margin basic-via-acid
  habit. ✅ SUBTOPIC 2 (secs 12-20) COMPLETE.

## Current
Subtopic 3 (Redox Titrations & Electrochemical Cells, secs 21-31). Sec 21 — next.

## Notes
- GOTCHA (found sec2): `Draw`'s stroke-dash reveal trick only gates the STROKE — a filled
  `<Draw fill={CREAM} .../>` shows its fill immediately regardless of `on`/delay, since fill
  isn't affected by strokeDasharray. For any filled background box/card, use
  `<Fade on={...} delay={...}><rect fill=... stroke=.../></Fade>` instead (mirrors how Chip is
  always Fade-wrapped). Reserve bare `<Draw>` for stroke-only paths (fill="none", the default).
- Verify: `PORT=3026 CHAPTER_ID=c6da3467-e267-576e-9999-a2687ffe9200 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`
- Register ONLY in a dedicated C11CH07 block appended at END of index.ts (imports, then
  `const C11CH07 = "c6da3467-e267-576e-9999-a2687ffe9200";`, then `REGISTRY[...] = ...` lines).
- Chemistry layer: read SCENE_AUTHORING_CHEMISTRY.md — oxidation numbers annotated above atoms,
  half-reactions stacked with e⁻ transfer arrows, electrochemical cells (electrodes, salt bridge,
  e⁻ flow). Palette/engine rules identical to base SCENE_AUTHORING.md.
- This is the first chapter to actually use chem-kit.tsx (bonds, curved arrows, orbital boxes,
  energy curves) — no prior chemistry exemplar scenes exist; style absorbed from Ch01Sec1/Sec12
  (physics) + the chemistry spec.
