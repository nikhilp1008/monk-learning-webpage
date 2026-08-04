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
  three branch chips (size / reactivity / oxide formula). PASS both languages,
  clean (no overlaps/overflow), spot-checked by eye.

## Current
Sec 2 — next.

## Notes
- Kit changes: none needed so far.
- Space-management pattern established in Sec 1: a beat's group may be gated
  `on={beat === k}` (not `beat >= k`) to fully vacate its box once superseded,
  freeing that row band for a later beat — used for the "chaos" chips before
  the period-table grid lands in roughly the same band. This is the "erase"
  path the updated dim/overlap rule requires when the board is genuinely full.
