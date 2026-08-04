# C11 Chemistry Ch03 "Classification of Elements" — scene progress

Branch: premium-board-chem3 · port 3022 · chapter_id `aac04619-0e94-5a09-99bb-abdc2b688290`
Total sections: 54. Data source: Supabase `lesson_sections` (fetched full dump to
`scratchpad/chem3_sections.json`; per-section dump via `scratchpad/sec.py <n>`).

Naming: files `C11Ch03Sec<N>.tsx`, component `C11Ch03Sec<N>`; registered at END of
`src/components/scenes/index.ts` under the `C11CH03` block.

Verify per section:
`PORT=3022 CHAPTER_ID=aac04619-0e94-5a09-99bb-abdc2b688290 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`

Read `SCENE_AUTHORING_CHEMISTRY.md` FIRST for every section (domain layer), then
base `SCENE_AUTHORING.md` (dim/overlap rule: never draw over dimmed content — use
free space or fully remove old content; no scrolling), then `chem-kit.tsx`.

## Subtopics
1. Development of the Periodic Table & the Modern Periodic Law — secs 1–14
2. Periodic Trends in Physical Properties — secs 15–29
3. Periodic Trends in Chemical Properties & Anomalous Behaviour — secs 30–41
4. Electronic Configuration & the s, p, d, f Blocks — secs 42–54

## Done
- Sec 1 — Why chemistry needed a shelving system: chaos of 8 element chips
  (memorised from scratch, fully vacates its box once shelved) → a real period
  drawn cell-by-cell (Li Be B C N O with atomic numbers) → red-margin "know
  WHERE ⇒ predict HOW" promise → known/?/known findability demo (ring + inward
  arrows) → green verdict stamp → new heading "one seat, many predictions" →
  three branch chips (size / reactivity / oxide formula).
- Sec 2 — Groups, periods, and the three big leaps: mini 4×3 grid with
  column/row ringed for GROUP/PERIOD, railway-platform metaphor ("same
  platform ⇒ same family"), red-margin promise, then a 3-card timeline
  (small clusters → Mendeleev → Moseley, green border on the fix that stuck).
- Sec 3 — Early clues: triads and octaves: Doebereiner triad (Li/Na/K masses,
  ringed average) → formula stamp + worked check (23≈(7+39)÷2) → 8-chip
  Newlands octave row with a curved "repeats" arc → calcium-collapse red flag
  → clues-not-laws verdict.
- Sec 4 — Mendeleev's law and the Moseley correction: two red-margin law
  statements (weight vs Z) → lock-the-pair mnemonic with a red never-swap X →
  three real anomaly pairs (Ar/K, Te/I, Co/Ni) shown wrong by weight (red) and
  healed by Z (green) in the SAME row (mutually-exclusive beat gating, no
  erase needed) → electrons-fixed-by-Z closer.
- Sec 5 — Reading the table: period, group, atomic number: three definition
  cards (PERIOD row-dots icon, GROUP column-dots icon, Z nucleus+electron
  icon) → period-capacity ladder (2,8,8,18,18,32,32 chips) → subshells behind
  each number (1s; 2s2p; …; 7s5f6d7p) → "not coincidence" red-margin closer.

All five verified PASS both languages, clean (no overlaps/overflow), and
spot-checked by eye (FORCE_SHOTS on final + a couple of mid-beats each).
Pushed to origin through Sec 5.

## Current
Sec 6 — next.

## Notes
- Kit changes: none needed so far. `curvedArrowD` from chem-kit works well for
  non-mechanism uses too (e.g. Sec 3's "repeats" arc under the octave row).
- Space-management pattern A (Sec 1): a beat's group gated `on={beat === k}`
  (not `beat >= k`) fully vacates its box once superseded, freeing that row
  band for a later beat — used for "chaos" chips before the period grid lands
  in the same band. This is the "erase" path the dim/overlap rule requires
  when the board is genuinely full.
- Space-management pattern B (Sec 4): when a value at ONE fixed position
  changes correctness across beats (e.g. "wrong by weight" → "right by Z"),
  render both variants at the identical (x,y) with mutually-exclusive gates
  (`beat === k` for the old value, `beat >= k+1` for the new) instead of
  stacking two rows — zero risk of overlap since they never coexist, and it
  reads as the teacher correcting the same line rather than adding a new one.
- Two-line cell gotcha (Sec 3): a symbol+subtext pair inside one cell needs
  ≥21px between baselines at size22/13 to clear Kalam/Anek ink-box math —
  first draft undershot and both b1 and b3 frames failed with text-vs-text
  overlaps; fixed by widening the cell and using baseline gap ~21px.
- tsc + verify-scene.mjs have passed clean (or after one fix) for every
  section so far — no lingering type errors, no kit changes required.
