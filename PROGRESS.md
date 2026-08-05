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

## Current
Sec 5 — next.

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
