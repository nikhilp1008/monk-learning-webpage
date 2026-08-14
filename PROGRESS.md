# B11 Ch02 — Biological Classification — scene progress

Worktree: `/private/tmp/claude-501/-Users-nikhi-Documents-monk-learning-app/3fdb9468-6013-4bc4-ad6b-afadb5c39725/scratchpad/monk-learning-webpage`
Branch: `premium-board-bio2` (branched from `origin/premium-board`) · dev port 3000 · chapter_id `8c9c091c-052a-51a1-841e-8304c7fe90ca` (subject `biology`, class_level 11).

59 sections total (Supabase `lesson_sections`, positions 1–59). **Lesson JSON used:
`JSON_LESSONS/Class11_Bio/b11_ch02_biological-classification_full.json`** (the
NON-`_merged` file) — confirmed by diffing all 59 titles against Supabase
`lesson_sections.title` in position order: 0 mismatches, exact 1:1 match. The
`_merged` file only contains **11** sections, each a mash-up of two unrelated
subtopics' titles joined with "&" (e.g. "Why classification exists at all & The
single most useful table in the chapter") and does NOT correspond to Supabase's
59-position structure at all — the brief's guess that `_merged` supersedes the
plain file was wrong for this chapter; use `_full.json`.

All 59 sections' `board_reveal_at_english`/`_hinglish` lengths match their
narration segment counts exactly (checked programmatically before authoring
started). Full per-section working cache (narration both languages + reveal
arrays + board_events, for offline lookup without re-querying):
`/private/tmp/claude-501/-Users-nikhi-Documents-monk-learning-app/3fdb9468-6013-4bc4-ad6b-afadb5c39725/scratchpad/bio2_all_sections.json`

No prior Biology work exists anywhere in this repo (`git log --all` has zero
`B11Ch*` commits) — Biology Chapter 1 has NOT landed, on `premium-board` or any
branch. Exemplars used instead: physics `Ch01Sec1.tsx`/`Ch01Sec3.tsx` (base
style) plus `C11Ch01Sec1.tsx` (chemistry, branch `premium-board-chem1`) and
`M11Ch01Sec1.tsx` (math, branch `premium-board-math1`) as the most recent
subject-prefixed examples of the naming/registration pattern this chapter must
follow.

## Subtopics (from lesson JSON `subtopic` field, positions 1–59)
1. Classification Systems & The Five Kingdoms — secs 1–11 (8 concept, 2 worked, 1 tips)
2. Kingdom Protista — secs 12–23 (9 concept, 2 worked, 1 tips)
3. Kingdom Fungi — secs 24–35 (9 concept, 2 worked, 1 tips)
4. Kingdoms Plantae & Animalia — secs 36–47 (9 concept, 2 worked, 1 tips)
5. Viruses, Viroids, Prions & Lichens — secs 48–58 (8 concept, 2 worked, 1 tips)
6. Chapter Close — sec 59 (cheat_sheet)

## Chapter-wide style decisions
- Component/file naming per brief: `B11Ch02SecM.tsx`, export `B11Ch02SecM`,
  registry constant `const B11CH02 = "8c9c091c-052a-51a1-841e-8304c7fe90ca";`,
  one `` REGISTRY[`${B11CH02}:M`] = B11Ch02SecM; `` line per finished section,
  appended at the end of `index.ts` (mirrors the Ch07 direct-assignment style,
  not the chem/math `Object.assign` style — brief is explicit about this).
- Hinglish board text is hand-written Latin script (house style), NOT the
  Devanagari found in the source narration JSON — same as every other chapter.
- House palette only: INK `#1C1A16`, AMBER `#EEA31F`, AMBER_DARK `#9A6A12`,
  GREEN `#1C9B57`, RED `#DD4433`, CREAM `#FCF4E0`, MUTED `#9C988C`.
- Vector-arrow glyph U+20D7 unused (biology has little need for it anyway);
  standard Unicode sub/superscripts (₁₂, ², ³) fine where useful.
- Biology-specific: kingdom/class/phylum names, Latin binomials etc. are never
  split across languages — they're the same string in English and Hinglish
  (only the connective/explanatory words change), matching how the narration
  itself keeps technical nouns in English inside Hinglish sentences.

## Done
- **Sec 1** — why classification exists at all: chaos box (18 multi-coloured
  dots = "millions, unsorted") → arrow → sorted into 3 colour-grouped columns
  (dims once superseded), then the payoff diagram (FUNGI box fanning into 3
  fact slots: eukaryote / heterotrophic / chitin cell wall), green ring +
  "predictive power" caption, Indian Railways analogy (crossed-out train →
  zone/class/route chips) reusing the freed story band, closing 5-kingdom
  chip strip (Monera…Animalia). Reference exemplar for the rest of the
  chapter — establishes the dim-via-Fade pattern for superseded diagrams
  (raw `Draw` marks aren't overlap-checked so only text needs `dim=`).
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 2 advisory stalls
  (b3/b6 — expected: new content that beat is delayed past the 1s snapshot
  or delivered via un-Fade'd `Draw` marks, not a real defect). Eye-checked
  via FORCE_SHOTS, both languages, all 9 frames — clean.

- **Sec 2** — from morphology to five kingdoms: historical timeline (arrow +
  5 empty kingdom slots at fixed x-positions matching Sec1's closing row) →
  Aristotle prelude (no kingdom, just the sorting instinct) → Linnaeus fills
  Plantae+Animalia (Two-Kingdom) → Haeckel 1866 fills+rings Protista (3) →
  later workers fill+ring Monera (4) → Whittaker 1969 fills+rings Fungi (5),
  full row boxed green + "backbone of the whole chapter" → closing
  "subdivided, not discarded". Reuses Sec1's exact 5-slot x-positions for
  chapter-wide continuity. Only stated dates used (1866, 1969); Linnaeus/
  Aristotle/"later workers" left undated since narration doesn't give one —
  don't invent facts not in source. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 1 advisory stall (b1 — all-Draw beat, no Fade
  groups, expected). Eye-checked via FORCE_SHOTS — clean; rings between
  adjacent newly-added kingdoms intentionally overlap slightly, reads as a
  "growth chain", not a defect.

## Current
Sec 2 done, committed, pushed. Next: Sec 3 — "Three failures of the
two-kingdom split".
