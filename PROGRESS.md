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

- Sec 6 — Mendeleev's crystal ball (eka-elements): real Al/Si cells with
  dashed eka-Al/eka-Si gap cells below → prediction card (EO₂, ECl₄) →
  red-margin germanium-matches-exactly moment → gaps fill into Ga/Ge with
  green rings → closing known-predicted-known smooth-trend curve.
- Sec 7 — Naming elements beyond Z=100: number-line anchor → 10 IUPAC roots
  (2×5 chips) → 4-step procedure → symbol rule → worked Z=124 build (digit
  boxes → root boxes → green "unbiquadium (Ubq)" stamp) → red-margin sanity
  check → JEE Main closer.
- Sec 8 — Reasoning chain, weight to number: 4-step card chain (anomalies →
  deeper variable → Moseley's evidence → order by Z) → K/Ar nucleus-size
  comparison (neutron-rich explanation) → takeaway stamp. (Fixed the Kalam
  "Z"→"2" bug here — see Notes.)
- Sec 9 — Building and reading the long form: 3 rule lines (row=period,
  subshell=block, valence=group) → THE textbook s/p/d/f block-shape
  schematic (proportional regions, d starting at period 4, f pulled out
  below) with red group-range labels and a staircase through the p-block.
- Sec 10 — Worked example: strontium's mass by the triad rule (CBSE): given
  Ca/Sr(?)/Ba cells → formula → substitution → green 88.7u answer → red-
  margin compare to accepted value (87.6u) → verdict → exam-lesson closer.
- Sec 11 — Worked example: spotting false universals (NEET): 3 numbered
  statement rows → eliminate-don't-compute strategy → strike-throughs +
  FALSE/FALSE/TRUE tags with reasons → green "exactly 1 correct" stamp.
- Sec 12 — Worked example: name and block for Z=124 (JEE Main): compact
  digit→root→name flow for Part (a) → Part (b) anchors on Og(118)'s full
  configuration → red-margin predicts the g-block → JEE-favourite closer.
- Sec 13 — Worked example: argon before potassium (JEE Advanced): given/
  Part(a) weight-order problem/red-margin Z-resolves-it/Part(b) neutron-rich
  nucleus comparison/weight-vs-Z fundamentality closer — the JEE Advanced
  capstone tying the whole subtopic together.
- Sec 14 — Common pitfalls and pro-tips (subtopic 1 CLOSER): 4 numbered
  red-ring pitfalls (law-basis swap emphasized) → 5-node chronology chain
  (Doebereiner→Newlands→Chancourtois/Meyer→Mendeleev→Moseley) with one
  keyword per link → nomenclature sanity-check closer.
  ✅ SUBTOPIC 1 (secs 1–14, Development of the Periodic Table) COMPLETE.

All 14 verified PASS both languages, clean (no overlaps/overflow after
fixes), spot-checked by eye (FORCE_SHOTS on final + a couple of mid-beats
each). Pushed to origin through Sec 14.

## Current
Sec 15 — next (subtopic 2: Periodic Trends in Physical Properties, secs 15–29).

## Notes
- **CRITICAL FONT BUG (found in Sec 8, fixed in Sec 4 + 8): capital "Z" in the
  Kalam script font renders visually as "2".** Verified by injecting raw SVG
  text at both fonts and screenshotting — Anek Latin (sans) "Z" is fine; Kalam
  (`script`/`script={true}`, incl. `Chip`'s default `script=true`) renders "Z"
  indistinguishable from "2". This chapter uses bare "Z" for atomic number
  constantly (and will explode in secs 42-54, electron configuration). RULE:
  any text containing "Z" MUST be `script={false}` (or plain `<T>` with no
  `script` prop, which already defaults false) — never bare `script`/
  `script={true}`, never an unqualified `<Chip>` (defaults script=true).
  Same font test also showed weaker collisions worth avoiding in script text:
  digit "1"/lowercase "l"/capital "I" all render as a bare vertical stroke,
  and "0"/"O" look near-identical — prefer non-script for anything mixing
  letters and digits (quantum numbers n/l/m/s, Zeff, orbital counts). Kalam
  script should stay reserved for prose captions/quotes/verdicts with no
  bare single-letter symbols or digits in them. ALWAYS eyeball-check any new
  script text containing Z, 1, l, I, 0, O, S, or 5 in a screenshot before
  moving on — the geometry verifier cannot catch this class of bug at all.
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
- **`Draw` with a non-"none" `fill` shows that fill at t=0 regardless of `on`**
  (found + fixed in Sec 8's nucleus circles): `Draw`'s `on` prop only animates
  `strokeDashoffset` — the `fill` attribute is static and renders immediately
  since the `<path>` is always mounted. A filled `Draw` (e.g. a nucleus
  circle, any chem-kit `wedgeD`) MUST be wrapped in its own `<Fade on={beat>=k}>`
  so opacity actually gates visibility; `Draw`'s own `on` only makes the
  outline stroke progressively — never rely on it alone to hide a fill.
- Two-line cell gotcha (Sec 3): a symbol+subtext pair inside one cell needs
  ≥21px between baselines at size22/13 to clear Kalam/Anek ink-box math —
  first draft undershot and both b1 and b3 frames failed with text-vs-text
  overlaps; fixed by widening the cell and using baseline gap ~21px.
- tsc + verify-scene.mjs have passed clean (or after one fix) for every
  section so far — no lingering type errors, no kit changes required.
