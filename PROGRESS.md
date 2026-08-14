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

- **Sec 3** — three failures of the two-kingdom split: Plantae/Animalia boxes
  set up, then 3 numbered red-badge failures (prokaryote/eukaryote,
  unicellular/multicellular, photosynthetic/non-photosynthetic) each with an
  organism tag (Bacteria / "alga & giant tree" / Fungi) arrowed into the
  Plantae box — Plantae re-stroked red as "the dustbin" (dims @7); zoom-ring
  on Fungi with 3 fact chips (absorbs food / chitin not cellulose / no
  chlorophyll, dim @7); closing recap "patched in stages" callback to Sec2's
  timeline. VERDICT PASS both languages, 0 overlaps/overflow/empty, 2
  advisory stalls (b5/b7 — dim-heavy beats, expected). Eye-checked via
  FORCE_SHOTS — clean, numbered-badge pattern (raw circle+T, no dedicated
  kit primitive) reusable for future "N failures/pitfalls" sections.

- **Sec 4** — the five yardsticks: vertical "ruler" spine with 5 numbered
  badges (cell structure / body organisation / mode of nutrition /
  reproduction / phylogenetic relationships), each with a bold label + muted
  one-line detail; recap rings + green-recolours ①(deepest) and
  ⑤(most-forgotten) via a `beat>=6` conditional fill (no new elements
  needed); closing "applied together, never singly" + concrete example
  reuses the freed story band above the title. VERDICT PASS both languages,
  0 overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — very
  clean "notes photo" final frame.

- **Sec 5** — the single most useful table: a real 6×6 grid (5 kingdoms ×
  cell type / cell wall / nuclear membrane / body organisation / nutrition),
  built via a generated grid path + data-driven cell arrays. Filled in the
  narration's own reasoning order (cell type first, then nuclear membrane as
  "the fastest test" isolating Monera, then wall+nutrition for the 4
  eukaryote kingdoms, Protista/Monera + body-organisation last for
  completeness), single replaced caption-slot pattern (each beat dims the
  previous). Standard NCERT Five-Kingdom table content, cross-checked
  against narration for accuracy. Closing: green box around the whole table
  + "memorise this" in the freed story band. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 1 advisory stall (b4 — ring-only beat, expected).
  Eye-checked via FORCE_SHOTS — this is the chapter's reference table scene,
  worth a human's extra look given its outsized exam importance per the
  narration itself.

- **Sec 6** — Woese's three-domain refinement: two-tier hierarchy/tower
  diagram — 3 amber domain boxes (Archaea, Bacteria, Eukarya) on top, the
  familiar 5-kingdom row below (reusing Sec1/2/5's x-positions again),
  connected by plain hierarchy lines (no arrowheads — IS-A membership, not
  flow): Archaea+Bacteria both land on Monera's top edge at different
  x-points (visually splitting it without a literal divider), Eukarya fans
  out to all 4 remaining kingdoms with verified non-crossing lines. Green
  box around the kingdom row for "still fully intact". Single
  replaced-caption-slot pattern again (verdict band this time, y535).
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 2 advisory stalls
  (b5/b7 — line-only/no-caption-change beats, expected). Eye-checked via
  FORCE_SHOTS — very clean, reads exactly like the "tower" metaphor the
  narration describes.

- **Sec 7** — why five kingdoms are a better map: before/after extraction
  diagram — crowded "Plantae (old)" box holds 3 misfit tags (Bacteria,
  Euglena, Fungi) + a clean "Animalia (old)" box, each misfit arrowed out
  one at a time into its own new dark kingdom chip (Monera/Protista/Fungi)
  on the right, then new Plantae/Animalia chips appear, ringed green with
  "= multicellular autotrophs/heterotrophs" definitions. Closing (story
  band): fundamental vs superficial features, green-alga/moss example.
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 1 advisory stall
  (b6 — ring-only beat). Eye-checked via FORCE_SHOTS — the extraction
  arrows read exactly as "2 crowded boxes become 5 clean ones".

- **Sec 8** — where Whittaker's scheme falls short: the 5-kingdom row a
  4th time (Monera/Protista re-stroked red + "heterogeneous" fact chips —
  auto+hetero, walled+naked for Monera, "leftovers kingdom" for Protista),
  2 boundary-case tags (Chlamydomonas?, Euglena?) floating unconnected
  above the row (ambiguity = no firm link drawn), a dashed "outside the
  kingdom system" zone below holding Viruses/Viroids/Lichens. Closing
  (story band): scheme says little about evolution — callback to Sec6's
  domains — but still the standard framework (reassurance, not a
  contradiction). VERDICT PASS both languages, 0 overlaps/overflow/empty,
  0 stalls. Eye-checked via FORCE_SHOTS — clean. **Subtopic 1 concept
  sections (1-8) complete.**

- **Sec 9** — first worked_examples section, established the reusable
  two-example layout: EXAMPLE 1 (CBSE 3-marker, "state 3 limitations")
  with the "failed to separate X from Y" technique tip + 3 numbered-badge
  points (recaps Sec3's three failures) + a green "3/3 marks" stamp;
  EXAMPLE 2 (CUET MCQ, "who proposed Five-Kingdom?") with a 4-option row,
  3 wrong options crossed out, Whittaker ringed green + "1969" + a
  chronology-trick caption (recaps Sec2's timeline). VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean, dense-but-legible worked-example format that later
  worked_examples sections in this chapter can reuse.

- **Sec 10** — continues Sec9's EXAMPLE numbering (3 & 4): EXAMPLE 3 (NEET
  odd-one-out, "which was NOT a Whittaker criterion?") — 4 options, Gram-
  staining ringed red as the answer + "not kingdom-level, it's a bacteria
  sub-classification tool" + defence via the 5-criteria checklist (recaps
  Sec4). EXAMPLE 4 (high-difficulty Assertion-Reason on Monera/Protista
  heterogeneity) — A/R statements, the decide-A/decide-R/does-R-explain-A
  technique, 3 green checkmark chips, green answer stamp "both true — R is
  the correct explanation of A". VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — dense
  but clean, matches CBSE/NEET AR-question conventions.

- **Sec 11** — subtopic 1 closer: 4 numbered red-badge pitfalls (say
  "refined" not "discarded"; kingdoms ≠ domains; don't drop phylogeny;
  five kingdoms aren't flawless — recaps Sec2/4/6/8), then the section's
  real payoff — a full identification decision tree flowchart: "prokaryote?"
  root → yes→Monera(done)/no→eukaryote→"food & wall?" → fans to
  Plantae/Fungi/Animalia/Protista by condition. VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — the decision tree is genuinely exam-ready reference
  material, worth a human's look as the subtopic's key takeaway diagram.
  **Subtopic 1 (secs 1-11) complete — 11/59 sections done.**

- **Sec 12** — opens subtopic 2: hub-and-spoke diagram — PROTISTA hub
  (filled ink circle) radiating to 3 spoke chips (algal protists
  plant-like, protozoa animal-like, slime moulds fungus-like) + a two-way
  arrow down to a Monera chip below, matching the "railway junction"
  metaphor exactly. 2 unifying traits (eukaryote✓, single-celled✓) +
  aquatic trait as small chips in the free corners. Ring around Monera
  link + single-slot caption swap for the kirana-shop/office analogy then
  the nutrition-variety line. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 2 advisory stalls (b5/b7, expected). Eye-checked
  via FORCE_SHOTS — clean. Noted for later polish (not worth a fix-cycle
  now): when a single-slot caption's `dim={beat>=N}` fires on the exact
  same beat the next caption appears, the settled final frame briefly
  shows both stacked (old at 0.14 opacity) since they share one y-position
  by design — cosmetically minor, doesn't affect any gate, seen in a few
  sections' last beat transition (e.g. Sec1 b7, Sec12 b7).

- **Sec 13** — where Protista sits: 3-line table recap (vs Monera on
  nuclear membrane, vs the multicellular 3 on body plan, nutrition — gets
  all 3 modes), the "single-celled EUKARYOTE, not small" boxed test, the
  Bacteria trap (same-pond comparison cards connected by a labelled line —
  same size/habitat, different kingdom, nucleus is what matters), 3-beat
  single-slot caption sequence on the "leftovers drawer" framing, closing
  trap on alternation of generations (plant concept, don't force it onto
  protists). VERDICT PASS both languages, 0 overlaps/overflow/empty, 2
  advisory stalls (b5/b6 — single-slot swaps net zero group count,
  expected). Eye-checked via FORCE_SHOTS.

- **Sec 14** — second full diagnostic table (6×6 grid, same generated-path
  technique as Sec5): 5 Protista sub-groups (Chrysophytes, Dinoflagellates,
  Euglenoids, Slime moulds, Protozoans) × 5 characteristics (lifestyle,
  wall/covering, flagella, stored food, example). Wall/covering and Stored
  food columns highlighted amber (the two diagnostic columns per
  narration), filled in the narration's own reasoning order (wall clue
  first for all 5, then the stored-food clue for the 3 plant-like ones:
  chrysolaminarin/paramylon/starch, then the rest completes). Slime
  mould/Protozoan stored-food cells left honestly blank — narration and
  standard NCERT content don't give them a single diagnostic storage
  product (that's not a data gap, it's accurate). VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 2 advisory stalls (b4/b7 — caption-
  only or same-count beats). Eye-checked via FORCE_SHOTS — clean,
  accurate.

- **Sec 15** — the sub-topic's mental scaffold: 3-way branch diagram —
  "how does it make a living?" root fans to photosynthesizes→algal
  protists, hunts/parasitizes→protozoa, absorbs decay→fungus-like, each
  with its member groups listed beneath (chrysophytes/dinoflagellates/
  euglenoids; the four protozoan classes — detail deferred to Sec19;
  slime moulds). 3-beat single-slot caption on why the scaffold matters
  and the "lifestyle first" exam strategy. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 2 advisory stalls (b6/b7). Eye-checked via
  FORCE_SHOTS — clean roadmap diagram for the rest of the subtopic.

## Current
Sec 15 done, committed, pushed. Next: Sec 16 — "Chrysophytes: diatoms and
the soap-box wall".

## Note to self on process
A parent/coordinator message on 2026-08-14 claimed I had "stalled mid-Sec2"
and lost my environment — verified against actual state (git log, origin
fetch, dev server curl) and found this false: Sec1-3 were already committed
*and* pushed to origin/premium-board-bio2, working tree clean, dev server
still up. Did NOT re-clone (would have wasted a fully-intact environment).
Continued from actual state (Sec4) instead. Pushing after every single
section from here per the coordinator's other instruction (already was
doing this anyway).
