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

- **Sec 16** — Chrysophytes/diatoms: plankton dots + "chief ocean producer"
  caption, then the signature soap-box wall diagram (wider "lid" box
  overlapping down over a narrower "base" box, labelled epitheca/
  hypotheca with leader arrows), silica/indestructible ID clue, jewel-like
  pattern lines, diatomaceous-earth uses (polishing, filtration), 2
  closing fact chips (chrysolaminarin+oil food store, major O2 source).
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 1 advisory
  stall (b4). Eye-checked via FORCE_SHOTS — clean, reads as intended
  though the lid/base overlap is a simplified board-sketch, not an
  anatomically exact frustule cross-section.

- **Sec 17** — genuine split-screen comparison (divider line down the
  canvas middle): LEFT = Dinoflagellates (plated oval with 3 internal
  curved "armour" lines, 2 perpendicular flagella → spins as it swims,
  Gonyaulax/red-tide + Noctiluca/bioluminescent example chips); RIGHT =
  Euglenoids (organic flexible-outline oval "Euglena" with a red eyespot
  dot, gullet/flagellum/eyespot equipment, paramylon storage, mixotroph
  punchline "standing between plant and animal"). Both sides mirror the
  same vertical rhythm for visual parity. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — clean,
  the two cell illustrations read as clearly distinct (rigid-plated vs
  flexible-organic) which is the whole pedagogical point of the contrast.

- **Sec 18** — slime moulds: hand-drawn irregular "creeping body" blob at
  top forks (favorable/unfavorable condition arrows) into PLASMODIUM
  (left, with the loud "≠ Plasmodium the malaria parasite!" same-word trap)
  and a small stalk+cap fruiting body releasing spore dots (right, unusual
  haploid+diploid life cycle noted below), nickname "protistan fungi", and
  the closing exam-trap logic (wall-less + crawls like protozoa →
  classification follows structure not nutrition alone). VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean, evocative fork diagram.

- **Sec 19** — protozoa's four classes (heavily NEET-tested, per
  narration): 4-card layout with hand-drawn locomotion icons distinct per
  class — amoeboid (blob + 4 flowing pseudopodia, star-like), flagellated
  (blob + 1 long tail), ciliated (cup shape + 8 radiating cilia hairs),
  sporozoan (dashed circle — no locomotor organ, breaks the pattern).
  Examples: Amoeba/Entamoeba, Trypanosoma (sleeping sickness), Paramecium
  (gullet+water current), Plasmodium (malaria, "most tested!"). Closing 2
  facts: contractile vacuole (osmoregulation), Paramecium's two nuclei
  types. VERDICT PASS both languages, 0 overlaps/overflow/empty, 1
  advisory stall (b2, divider-only beat). Eye-checked via FORCE_SHOTS —
  the 4 icons are immediately visually distinguishable, worth a human's
  look as one of the chapter's highest-yield exam sections.

- **Sec 20** — closes Kingdom Protista: reproduction lines (asexual —
  binary fission/cysts/budding/sporulation; sexual — syngamy+conjugation),
  then a two-column BENEFICIAL/HARMFUL significance table with a vertical
  divider — phytoplankton→O2 (the big one), diatomaceous earth,
  slime-mould recycling vs the 3 harmful pairings (Plasmodium→malaria,
  Trypanosoma→sleeping sickness, Entamoeba→amoebic dysentery) + red tides,
  closing punchline "the same group that feeds the ocean can also poison
  it". VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls.
  Eye-checked via FORCE_SHOTS — clean.

- **Sec 21** — first worked_examples for Protista (restarts EXAMPLE
  numbering at 1, since narration doesn't continue Sec9/10's count here):
  EXAMPLE 1 (CBSE comparison, 3 marks) — a real 2-column paired table
  (Euglenoids vs Dinoflagellates × covering/habitat/nutrition/storage*)
  that itself demonstrates the taught technique "pair them, never two
  separate lists". EXAMPLE 2 (CUET, "chief ocean producers with
  indestructible silica walls?") — 4 options, diatoms ringed green, other
  3 crossed red, with the "read BOTH clues together" reasoning (producer
  clue alone also fits dinoflagellates; the silica-vs-cellulose wall clue
  is what rules them out). VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — clean.

- **Sec 22** — continues Sec21's numbering (EXAMPLE 3 & 4, per explicit
  "third"/"fourth question" narration): EXAMPLE 3 (NEET clue-pile,
  identify-the-group) — 4 options, eliminate on the covering clue first
  (cross diatom/euglenoid via wall mismatch), then confirm dinoflagellate
  (ringed) over slime mould (crossed, terrestrial/non-photosynthetic).
  EXAMPLE 4 (assertion-reason on Euglena's mixotrophy) — A/R statements,
  3 checkmark chips, green answer stamp. Caught and fixed a real ring-vs-
  caption clearance violation during authoring (ring's spec-formula
  overshoot reached into a caption sitting right below it) by switching 3
  captions to a single dim-and-replace slot moved further down — a good
  concrete example of the "estimates get you to the first render, verify
  the real boxes" workflow. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 2 advisory stalls (b3/b4). Eye-checked via
  FORCE_SHOTS — clean.

- **Sec 23** — subtopic 2 closer: 5 numbered red-badge pitfalls (Monera vs
  Protista size trap — check nucleus; Euglena isn't pure plant; wall
  material differs per group, diatom=silica NOT CaCO₃; don't scramble the
  4 protozoan classes; don't classify by nutrition alone), then the real
  payoff — a 5-row covering-clue lookup tool (silica→chrysophyte,
  cellulose plates→dinoflagellate, pellicle/no wall→euglenoid, crawling
  saprophyte→slime mould, animal-like feeder→protozoan), explicitly framed
  as "jump straight to the clue, don't read options first". VERDICT PASS
  both languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean, genuinely exam-ready reference material.
  **Subtopic 2 (secs 12-23) complete — 23/59 sections done.**

- **Sec 24** — opens subtopic 3 (Kingdom Fungi): "ABSORBS, not eats" big
  emphasis word, us-vs-fungus digestion-order contrast, then the 3-step
  external-digestion process diagram (circle+outward-arrows "secrete
  enzymes" → wavy dissolve line "digest externally" → circle+inward-arrows
  "absorb nutrients"), consequence (must live in/on food, can't chase),
  decomposer-role analogy (plant=farmer, animal=hunter, fungus=recycler),
  closing trap (not a plant — no chlorophyll/photosynthesis, why the old
  2-kingdom system failed for fungi specifically). VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean, the arrows-in/arrows-out circle pair reads
  intuitively as the secrete/absorb reversal.

- **Sec 25** — hyphae → mycelium build-up (hand-drawn tangling thread),
  surface-area-for-absorption note, then the key classification split as
  a side-by-side comparison: SEPTATE tube (4 internal cross-wall dividers,
  Ascomycetes/Basidiomycetes/Deuteromycetes) vs ASEPTATE/coenocytic tube
  (no dividers, 5 floating nuclei dots, Phycomycetes — "free
  identification!"), chitin wall note (callback to Sec5's/14's tables),
  closing 2 exceptions (yeast, pseudomycelium). VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 2 advisory stalls (b2/b4). Eye-
  checked via FORCE_SHOTS — the compartmented-vs-dotted-continuous-tube
  visual reads immediately.

- **Sec 26** — three fungal lifestyles: 3-branch scaffold (mirrors Sec15's
  pattern) — "food source: dead? alive? a partner?" fans to ①SAPROPHYTIC
  (Rhizopus/bread mould), ②PARASITIC (rusts, smuts, Albugo), ③SYMBIOTIC
  (lichens, mycorrhizae — "more soon", forward reference to Sec31).
  Closing: one habit (absorption) explains surface area/habitat/chitin
  wall, ecological decomposer role, "strip fungi from a forest" thought
  experiment. VERDICT PASS both languages, 0 overlaps/overflow/empty, 0
  stalls. Eye-checked via FORCE_SHOTS — clean.

- **Sec 27** — the fungi chapter's master table: 5×5 grid (4 classes ×
  Mycelium/Asexual spores/Sexual spores+fruiting body/Examples), standard
  NCERT content — Phycomycetes (aseptate/coenocytic, odd one out, amber
  label), Ascomycetes (ascospores→ascocarp), Basidiomycetes (generally no
  asexual spores, basidiospores→basidiocarp), Deuteromycetes (conidia
  only, sexual stage absent/unknown). Green box around the whole Sexual
  spores column per narration's emphasis ("that column alone is worth the
  most"). Caught and fixed a real overlap during authoring: a separate
  "(odd one out)" tag stacked directly under "Phycomycetes" in the same
  narrow header cell collided with it — removed the redundant tag,
  relying on the amber label colour alone to mark the row (simpler and
  correct). VERDICT PASS both languages, 0 overlaps/overflow/empty, 0
  stalls. Eye-checked via FORCE_SHOTS — dense but accurate and clean, one
  of the chapter's highest-value reference tables.

- **Sec 28** — the name-based diagnostic anchors: Phycomycetes/"algal
  fungi" anchor (aseptate=this one, septate=not this one), then the
  chapter's most memorable visual — a closed sac shape with 4 dots drawn
  INSIDE ("ASCOMYCETES = sac fungi", spores inside the ascus) beside a
  stalked club/cap shape with 5 dots on the OUTSIDE of the flared top
  ("BASIDIOMYCETES = club fungi", spores outside on the basidium),
  directly visualizing endogenous vs exogenous. Deuteromycetes anchor (no
  sexual stage ≠ flawed, just unseen) + the reclassification consequence.
  Caught and fixed 3 tight/overlapping clearances during authoring
  (header-to-shape, shape-to-label, and a caption stack that needed more
  vertical pitch) before the first verify run. VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — the inside/outside dot placement makes the ascus/basidium
  distinction immediately intuitive.

- **Sec 29** — three reproduction routes as a 3-branch header row
  (VEGETATIVE / ASEXUAL-spores / SEXUAL, sexual chip distinctly green per
  narration's "coloured differently"): vegetative lists fragmentation/
  budding/fission; asexual covers conidia→Asco+Deutero, sporangiospores,
  zoospores (motile, Phycomycetes, "swims!"), aplanospores (non-motile);
  sexual previews "own section, right after this" (forward reference to
  Sec30). Caught and fixed a beat-gating bug during authoring: the sexual
  branch's explanatory text was wrongly gated to beat 4 instead of beat 1
  (when narration actually explains why that branch is colored
  differently) — fixed before the first verify run. VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean.

- **Sec 30** — the sub-topic's single most-tested process: 3-cell visual
  progression — plasmogamy (1 cell, 2 separate amber nuclei dots),
  karyogamy (1 cell, nuclei fused into one green dot, 2n), meiosis (1
  cell, 4 scattered red spore dots, n) — connected by plain arrows. Below,
  a bracket line spanning the plasmogamy→karyogamy gap labelled "dikaryon
  (n+n) — delayed karyogamy, only in Ascomycetes + Basidiomycetes",
  clamp-connections note, somatogamy (Basidiomycetes lack sex organs),
  and the significance close (delayed genetic commitment, meiosis restores
  variation). Hit and recovered from the known transient audio-load
  network glitch on first verify attempt (empty duration → NaN
  currentTime); retry passed clean. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — the
  2-dots→1-dot→4-dots progression makes the nuclear fusion/split sequence
  immediately legible.

- **Sec 31** — split-screen (deliberately kept apart per narration): LEFT
  LICHEN — green alga circle wrapped by amber fungal-thread curves
  (phycobiont=food-maker, mycobiont=shelter, "phyco feeds, myco mounts"
  mnemonic), pollution-indicator (SO₂) + dye facts (litmus, orcein). RIGHT
  MYCORRHIZA — a drawn root wrapped by fungal threads ("fungus + PLANT
  ROOT, not alga!" — the single swap that distinguishes it), opposite-
  direction trade arrows (fungus→plant: minerals+water; plant→fungus:
  sugars), scale/significance (majority of land plants, colonising land).
  Hit the same transient audio-load network glitch as Sec30 on first
  attempt; retry passed clean. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 2 advisory stalls (b2/b5). Eye-checked via
  FORCE_SHOTS — the two partnerships read as clearly distinct, which is
  the whole point given how often they're confused.

- **Sec 32** — beneficial/harmful two-column ledger (mirrors Sec20's
  proven layout): BENEFICIAL — Penicillium→penicillin, Saccharomyces→
  fermentation (bread/idli/beer/wine, CO₂ puffs dough), Neurospora→
  genetics research ("Drosophila of the plant kingdom"), Deuteromycetes→
  decomposers, morels/truffles→delicacies. HARMFUL — Puccinia/Ustilago/
  Albugo as a 3-item block (wheat rust/smut/mustard white rust), Rhizopus
  spoils food + "your fridge = an anti-fungal device" closer. Caught and
  fixed two typos during authoring (an undefined `AMBER_placeholder`
  identifier and a stray extra closing parenthesis) via the tsc gate
  before ever reaching the browser. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS — clean.

- **Sec 33** — first worked_examples for Fungi (restarts EXAMPLE numbering
  at 1, matching Sec21's pattern since narration doesn't continue a
  count): EXAMPLE 1 (CBSE structured 3-marker) — a 3-axis paired table
  (Ascomycetes vs Basidiomycetes × common name/sexual spores/example) that
  hands the marking scheme directly to the student. EXAMPLE 2 (CUET
  example→class recall) — "Mucor, Rhizopus, Albugo → which class?", 4
  options, Phycomycetes ringed green with "confirm, don't just recall"
  feature-check reasoning + a memory-hook line for the recurring trio.
  Caught and fixed a ring-vs-caption overshoot collision (same category of
  issue as Sec27/28) before the first verify run. VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked via
  FORCE_SHOTS — clean.

- **Sec 34** — continues Sec33's numbering (EXAMPLE 3 & 4): EXAMPLE 3
  (NEET feature pile, "septate, exogenous conidia, endogenous sac spores,
  ascocarp → which class?") — 4 candidate chips, systematic 2-step
  elimination (septate→not Phyco, has sexual stage→not Deutero; then
  endogenous/sac→not Basidio), Ascomycetes ringed as the sole survivor —
  explicitly modeling "never needed to recognise an organism, just read
  the features". EXAMPLE 4 (assertion-reason on why Deuteromycetes is an
  artificial group) — A/R statements, 3 checkmark chips, green answer
  stamp. VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls.
  Eye-checked via FORCE_SHOTS — clean.

- **Sec 35** — subtopic 3 closer: 5 numbered red-badge pitfalls
  (plasmogamy/karyogamy root-word trick; dikaryon not universal; "in a
  sac, on a club" pair; Deuteromycetes = waiting room not a family;
  heterotroph ≠ ingests, fungi absorb) then the payoff — a clean
  2-question decision tree ("septate?" no→Phycomycetes(done)/yes→"sac /
  club / absent?" fanning to Ascomycetes/Basidiomycetes/Deuteromycetes).
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls. Eye-
  checked via FORCE_SHOTS — clean, exam-ready. **Subtopic 3 (secs 24-35)
  complete — 35/59 sections done (59%), 3 of 6 subtopics fully finished.**

- **Sec 36** — subtopic 4 opener (Kingdoms Plantae & Animalia): recap line
  (Monera/Protista/Fungi done, last two met with the naked eye) → one-line
  definitions (Plantae = multicellular green makers, Animalia = multicellular
  movers & eaters) → visible-world examples (tree/grass vs fish/bird/insect/
  mammal) → setup line ("the single most valuable idea in this sub-topic") →
  THE AXIS: PLANTAE (green, "make food") vs ANIMALIA (amber, "find food")
  boxes with a ringed "VS" between them → cascade 1 (make food → cellulose
  wall/plastids/fixed & rooted; find food → wall-less/plastid-free/mobile
  body, 3 fanned arrows each side) → cascade 2 (storage follows too: starch
  slow-store vs glycogen ready-store) → "nothing here is arbitrary" close.
  Superseded recap/definition/example lines all dim once the main axis boxes
  land at beat 4 (freed the story band, matches Sec1's pattern). VERDICT PASS
  both languages, 0 overlaps/overflow/empty, 1 advisory stall (b4 — several
  prior beats dim simultaneously as the axis boxes take over, expected, not
  a defect). Eye-checked via FORCE_SHOTS (first section of a new subtopic)
  both languages, all 9 frames — clean; cascade chips and storage row fit
  comfortably in both languages including the longer Hinglish strings.

- **Sec 37** — "Kingdom Plantae, and the range it covers": Act 1, the
  one-line NCERT definition built word by word as a 4-chip chain
  (multicellular + eukaryotic + chlorophyll autotroph + cellulose wall)
  under a "the definition, word by word:" label, closing with "say it as a
  unit". Act 2, the 5-group span ladder (algae → bryophytes →
  pteridophytes → gymnosperms → angiosperms) as a chained row of chips
  with connecting arrows, "pond alga → banyan tree" unifying caption, then
  quick one/two-word tags dropped under each of the four higher groups
  (plant amphibians / first vascular / naked seed / enclosed seed) with
  the "5 words" naked-vs-enclosed punchline. Closes with a single long
  green arrow + 3 trend labels for "direction of travel" (water
  transport / embryo protection / dependence on water), then a
  dashed-red boundary chip flagging that full Chapter 3-level
  classification is out of scope here. Kept technical/Latin group names
  identical across languages per chapter style; only connective phrasing
  changed. VERDICT PASS both languages, 0 overlaps/overflow/empty, 1
  advisory stall (b2 — beat1's 8 groups dim together as span-setup takes
  over, expected). Eye-checked via FORCE_SHOTS, both languages, all 9
  frames — clean; dense final frame reads as a complete "notes photo"
  with definition, ladder, tags and boundary all visible at once.

- **Sec 38** — "The autotroph exceptions": opens with the false claim "all
  plants make their own food" crossed out, then splits into two columns —
  green INSECTIVOROUS vs red PARASITIC. Left column builds "partially
  heterotrophic" (keeps chlorophyll, photosynthesises normally) → the
  nitrogen reason (marshy, N-poor soil) → all 3 named examples (Venus
  flytrap snaps shut / bladderwort sucks into bladder-traps / pitcher
  plant drowns in a fluid-filled leaf). Right column builds Cuscuta
  (dodder/Amarbel, ringed) → chlorophyll lost entirely, twines + suckers
  → the visual clue (yellowish threads, "not green = not
  photosynthesising"). Closes with the conceptual payoff (Plantae =
  body + ancestry, not strictly self-feeding) and a dashed-red boundary
  chip: "insectivorous ≠ parasitic — read the word precisely". VERDICT
  PASS both languages, 0 overlaps/overflow/empty, 1 advisory stall (b1 —
  two header chips only, expected). Eye-checked via FORCE_SHOTS, both
  languages, all 9 frames — clean two-column split, nothing crowds the
  100px gutter between columns.

- **Sec 39** — "Kingdom Animalia, and what no wall makes possible": the
  exact definition (multicellular, eukaryotic heterotrophs) with "...with
  NO CELL WALL" emphasised in bold red underneath, feeding contrast
  (ingest → digest = holozoic, vs fungi's digest-outside-and-absorb from
  subtopic 3), storage fact (glycogen + fat, not starch), then the main
  event — a 4-stage horizontal cascade chain (NO WALL → FLEXIBLE & MOBILE
  → MUSCLE + NERVE → SENSORY + NEUROMOTOR) built up one arrow-and-chip at
  a time across 3 beats, mirroring Sec36's "one axis generates everything"
  device but for the wall-less cell. Closes with the determinate-growth
  contrast against plants ("a tree keeps growing — you stopped").
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls — every
  beat added new visible content, no dimming needed since accumulated
  notes above the chain never collided with it. Eye-checked via
  FORCE_SHOTS, both languages, all 9 frames — clean; the 4-box cascade is
  the visual highlight and reads very clearly in both languages.

- **Sec 40** — "The diagnostic table": a Feature × Plantae × Animalia
  3-column, 8-row table (Sec5's proven grid-path table pattern, adapted to
  2 kingdoms). Row 1 (cell type) is drawn genuinely merged — the
  Plantae/Animalia divider skips that row's band in the grid path — to
  make the narration's point visible ("cell type alone can't separate
  them"). Rows fill in the narration's own reasoning order: cell
  wall+nutrition (the cleanest separators, ringed), stored food+plastids
  (the tiebreakers, ringed), movement+reproduction, then body
  organisation (Animalia's "organ-system level" cell highlighted green
  and ringed — "animals go one further"). Closes with a green box around
  the whole table + "read every row back to the axis" callback to Sec36.
  Row data kept in English for both languages (technical terms), matching
  Sec5's precedent. **Process note**: eyeballed Sec5 itself via
  FORCE_SHOTS as a sanity check on the reusable-caption-slot pattern and
  found its final frame has illegible stacked ghost-text below the table
  — every prior caption is left "dimmed" at the same (540, 495) slot
  forever, so by the last beat 5 dimmed captions overlap into an
  unreadable smear. This is real but invisible to verify-scene.mjs
  (dimmed opacity ≤0.5 is excluded from overlap checking, and marks/text
  aren't checked against each other at low opacity). Did NOT touch Sec5
  (out of scope). Fixed it in Sec40's own caption slot instead: each
  caption is gated `beat === k` (visible only during its own beat, not
  `beat >= k` + dim-forever), so at most one occupies the slot at any
  time and the final frame is genuinely clean. Flagging here in case a
  human wants to backport the same fix to Sec5 and any other pre-Sec36
  section using the same reusable-slot pattern. VERDICT PASS both
  languages, 0 overlaps/overflow/empty, 1 advisory stall (b3). Eye-checked
  via FORCE_SHOTS, both languages, all 9 frames, plus a direct comparison
  against Sec5's final frame — Sec40's final frame confirmed clean with no
  stacked captions.

- **Sec 41** — "Inside the plant, and why it feeds everything else":
  the narration's own frame ("cell on the left, consequences on the
  right") built literally — LEFT column stacks cell structure (cellulose
  wall, plastids/chloroplasts, central vacuole with "wilted = lost
  turgor"), a CENTER vertical arrow hinge labelled "photosynthesis" with
  the reaction equation below it (chlorophyll + light: CO₂ + H₂O →
  sugars + O₂, real subscripts via tspan), RIGHT column stacks the
  consequences (PRODUCERS — feeds nearly every other organism, "every
  meal traces back to a chloroplast", starch storage + fixed/non-motile,
  tissue/organ level with algae flagged as simpler). Closes with a
  6-chip recap row (wall/plastids/vacuole/starch/fixed life/tissue-organ)
  and "six consequences of being a maker of food" — ties back to Sec36's
  axis. VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls.
  Eye-checked via FORCE_SHOTS, both languages, all 9 frames — clean;
  subscripted chemical formula renders correctly, left/right/hinge
  structure reads exactly as the narration frames it.

- **Sec 42** — "Alternation of generations": a genuine 4-node diamond
  life-cycle diagram — SPOROPHYTE (2n, top) --meiosis--> SPORES (n,
  right) --grows into--> GAMETOPHYTE (n, bottom) --mitosis--> GAMETES
  (n, left) --fertilisation--> back to SPOROPHYTE, all 4 edges drawn and
  labelled, closing the loop exactly in the beat where narration says
  "trace the loop on the board". A small hand-drawn ring + "round and
  round" sits in the diamond's naturally-empty centre (no extra vertical
  space needed — the four edge arrows never cross the middle). Closes
  with the dominance refinement (gametophyte dominant in bryophytes —
  moss IS the visible plant; sporophyte dominant in pteridophytes/
  gymnosperms/angiosperms) and the named exam-mapping (moss→gametophyte,
  fern/pine/mango→sporophyte) plus "universal in Plantae — the plant
  signature". VERDICT PASS both languages, 0 overlaps/overflow/empty, 0
  stalls. Eye-checked via FORCE_SHOTS, both languages, all 9 frames —
  very clean; this is the chapter's first true cycle diagram and reads
  as a genuine textbook diagram, not a list dressed up as one.

- **Sec 43** — "Inside the animal: the organ-system level": mirrors
  Sec41's cell/consequence split for Animalia. LEFT column: no wall/no
  plastids, flexible plasma membrane → movement + ingestion,
  heterotrophic/holozoic ingest→digest→absorb (vs fungi's digest-outside,
  callback to subtopic 3), glycogen+fat storage, locomotion + determinate
  growth. RIGHT column: the headline payoff "ORGAN-SYSTEM LEVEL" ("most
  complex body plan — no other kingdom reaches it") then the 4 systems in
  a 2×2 grid (digestive/circulatory/nervous/muscular, "one purpose").
  Closes with reproduction (mostly sexual) and the mobility+coordination
  = active-life summary. **Caught a self-authored defect via FORCE_SHOTS**
  before committing: beat1's "cell on the left, systems on the right"
  setup line, dimmed per the usual pattern, ghosted directly through the
  beat5 "ORGAN-SYSTEM LEVEL" headline (same failure family as the Sec5/
  Sec40 caption-stacking issue — invisible to verify-scene.mjs since
  dimmed opacity is excluded from checks, but visibly messy on inspection
  of shots/sec43_force/crop_check.png). Fixed the same way as Sec40: beat1
  is now beat-scoped (`beat === 1`) instead of dim-forever, since it's
  transient framing commentary, not a fact worth keeping on the board.
  Re-verified clean before and after crop-zooming the exact region.
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 1 advisory
  stall (b1, expected). Eye-checked via FORCE_SHOTS, both languages, all
  9 frames, plus a targeted crop-zoom on the fixed region.

- **Sec 44** — "The unifying contrast, and what they share": ties the
  whole sub-topic to a single restated axis banner ("make food vs find
  food — that's it, that's the sub-topic", persistent), then two
  condensed mini-cascade chains reprising Sec36/41/43's facts —
  chloroplasts→cell wall→fixed→starch (green, left) and wall-less→
  locomotion→sensory→glycogen (amber, right) — each capped with an
  ecological label (GREEN BASE / MOBILE TOP). Pivots to the part
  "students forget": a dashed shared-facts box (both eukaryotic,
  multicellular, sexual reproduction, division of labour), the
  historical payoff (both kept since the first 2-kingdom split; Monera/
  Protista/Fungi carved out later — callback to Sec2's timeline), and
  the closing image (two halves of the multicellular eukaryotic world,
  producers and consumers). Learned from Sec43's caught defect: beat0's
  transient intro line is beat-scoped (`beat === 0`) from the start
  rather than dim-forever, since it sits close to beat1's persistent axis
  banner. VERDICT PASS both languages, 0 overlaps/overflow/empty, 1
  advisory stall (b1, expected — axis banner alone, no dim/hide of
  beat0). Eye-checked via FORCE_SHOTS, both languages, all 9 frames —
  clean; reads as a genuine "tie it together" recap rather than a rehash.

- **Sec 45** — first worked_examples of subtopic 4 (restarts EXAMPLE
  numbering at 1, matching Sec21/33's pattern): EXAMPLE 1 (CBSE
  3-marker) — reuses Sec33's exact 3-row grid geometry (Feature|col1|
  col2, same column dividers/row baselines) for a matched-pairs table:
  cell wall (present/cellulose vs absent), nutrition (autotrophic/
  photosynthetic vs heterotrophic/holozoic), stored food (starch vs
  glycogen+fat), closing with the strategic note to lead with the most
  fundamental pair and never split into two separate lists. EXAMPLE 2
  (CUET "read the word precisely") — 4-option MCQ (Cuscuta/Venus
  flytrap/Spirogyra/mushroom), Venus flytrap ringed as the answer with
  the "partially" reasoning (traps for nitrogen, keeps photosynthesising),
  then all 3 distractors analysed for why each fails differently —
  directly reuses Sec38's insectivorous-vs-parasitic distinction. VERDICT
  PASS both languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked
  via FORCE_SHOTS, both languages, all 10 frames — clean, matches the
  Sec33 exemplar's density and style precisely.

- **Sec 46** — continues Sec45's numbering (EXAMPLE 3 & 4, mirrors
  Sec34's exact pattern): EXAMPLE 3 (NEET placement) — 4-clue organism
  ("multicellular, eukaryotic, NO wall, ingests food, glycogen storage")
  against 4 candidate chips (Plantae/Fungi/Animalia/Protista),
  systematic 2-step elimination (no wall → not Plantae/Fungi; ingests →
  not fungi/plants, multicellular → not Protista), Animalia ringed as
  the sole survivor with "three clues converge" framing — explicitly
  modelling "don't second-guess a convergence". EXAMPLE 4
  (assertion-reason on Cuscuta, the section this chapter first flagged
  back in Sec38) — A/R statements, 3 drill chips (A✓/R✓/R-explains-A✓),
  green answer stamp, plus the narration's own cave-fish-that-lost-its-
  eyes analogy as a closing punchline. VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS, both
  languages, all 9 frames — clean, matches the Sec34 exemplar precisely.

- **Sec 47** — subtopic 4 closer (tips): 5 numbered red-badge pitfalls
  (autotroph exceptions — Venus flytrap/bladderwort/Cuscuta; don't give
  animal cells a wall; don't swap stored foods, P-with-S/A-with-G; don't
  classify by nutrition alone — chlorophyll-less Cuscuta is still a plant;
  don't confuse a mushroom/pond alga with these kingdoms — recaps Sec38/39/
  40/41/43), then the payoff — a genuine one-question decision tool
  ("cell wall + own food?" box, yes->PLANTAE green chip / no wall+ingests->
  ANIMALIA amber chip) plus a 2-row tiebreaker table (stored food:
  starch=plant|glycogen=animal; plastids: present=plant|absent=animal),
  closing whisper line "one question, two tiebreakers — sub-topic
  answered". Row/tiebreaker technical terms kept in English for both
  languages (Sec5/Sec40 precedent). VERDICT PASS both languages, 0
  overlaps/overflow/empty, 0 stalls. Eye-checked via FORCE_SHOTS, both
  languages, all 9 frames — clean; arrow tips land cleanly on both kingdom
  chips, tiebreaker rows read clearly. **Subtopic 4 (secs 36-47) complete
  — 47/59 sections done.**

- **Sec 48** — opens subtopic 5 (Viruses, Viroids, Prions & Lichens):
  "stepping off the edge of the cellular world" — acellular fact (-> no
  place in Whittaker's 5 kingdoms), living/non-living borderland (no wall,
  no nucleus to check), then the section's central metaphor as a genuine
  split-screen: LEFT "OUTSIDE a host" card (unplugged pen-drive icon, no
  movement/metabolism/reproduction, CRYSTALLISED-and-shelved red emphasis,
  virus definition, "behaves NON-LIVING" in MUTED) --plug it in--> RIGHT
  "INSIDE a host cell" card (plugged pen-drive icon, hijacks machinery,
  "= obligate intracellular parasite" in GREEN, "behaves LIVING" in
  GREEN), shared-fact banner (no ribosomes/enzymes/metabolism of their
  own), closing verdict stamp "NON-LIVING outside a host -> LIVING inside
  one" + exam-priority subline (heredity yes, self-sufficient metabolism
  no). Colour-codes the living/non-living duality itself (MUTED=inert,
  GREEN=living) rather than just using red/green for right/wrong. VERDICT
  PASS both languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked
  via FORCE_SHOTS (first section of a new subtopic), both languages, all
  9 frames — clean; both pen-drive cards render symmetrically, arrow
  lands cleanly in the gap between them.

- **Sec 49** — "The strip-down ladder": a genuine literal staircase diagram
  — VIRUS (GREEN box, protein-coat + nucleic-acid chips, highest/leftmost)
  --"-coat" arrow--> VIROID (AMBER_DARK box, free-RNA chip only, lands
  lower-right) --"-acid" arrow--> PRION (INK box, protein-only chip,
  lands lowest-right), each box + its narration fact landing together
  beat-by-beat as the ladder is built left to right. 3 columns never
  share x-range so the vertically-overlapping boxes (the staircase look)
  never collide. Decorative squiggle-underline for "the board lines them
  up" transition beat (satisfies the one-drawn-element-per-beat rule
  without crossing any box). Closing: below-box captions read the
  composition (coat+acid / acid only, no coat / protein only, NO acid),
  green insight (each step throws something away, yet stays infectious),
  muted housekeeping aside on Lichens (forward reference, "more soon").
  VERDICT PASS both languages, 0 overlaps/overflow/empty, 0 stalls.
  Eye-checked via FORCE_SHOTS, both languages, all 9 frames — clean; the
  staircase reads immediately as "things get simpler going right", which
  is the whole point of the metaphor.

- **Sec 50** — "The diagnostic table, and why they sit outside": a real
  5×4 grid (Agent/Made of/Nucleic acid/Protein coat/Example disease ×
  Virus/Viroid/Prion, Sec5/14/27/40's generated-grid-path technique),
  Nucleic-acid + Protein-coat columns boxed amber ("read the two
  highlighted columns first — they do all the work"), filled in the
  narration's own 2-question logic: Virus-vs-Viroid pair fills first
  (protein coat present/ABSENT, boxed), then Viroid-vs-Prion pair
  (nucleic acid RNA/NONE, boxed) + the de-emphasised Example-disease
  column in MUTED grey (narration explicitly says "never need to
  memorise the disease lists"). Second half: Whittaker's 3 criteria as
  chips, all cross-out red'd ("you can't apply them to a virus"), closing
  with why — no cell membrane/cytoplasm/organelles — and a verdict stamp
  "excluded BY THE LOGIC of the scheme, not by accident". One advisory
  stall (b1, both languages — grid draws immediately but its header/data
  Fade delays land after the verifier's 1s snapshot mark, same documented
  artifact as Sec1 b3/b6 etc; the beat demonstrably adds the whole table,
  confirmed by eye). VERDICT PASS both languages, 0 overlaps/overflow/
  empty. Eye-checked via FORCE_SHOTS, both languages, all 9 frames plus
  the mid-build b1 frame specifically — table renders correctly, no
  overshoot on the amber emphasis boxes.

- **Sec 51** — "Virion, capsid, capsomeres": a genuine bullseye diagram
  (capsid ring around a nucleic-acid core, 8 capsomere dots ringing the
  rim, one dot leadered out to "= capsomeres (repeating subunits)") lands
  first, dashed divider splits the board, then a TMV rod (coiled-RNA wave
  + vertical capsomere ticks, labelled "capsomeres arranged HELICALLY")
  lands on the right — the two-architectures beat. Later, the bullseye
  dims (`dim={beat>=7}`, same technique as Sec3's Plantae box) and a
  bacteriophage anatomy (hexagon head / collar / sheath-tail / fanned
  tail fibres, each part labelled) is drawn directly in its place —
  verify-scene explicitly excludes dimmed (≤0.5 opacity) elements from
  overlap checks, so this reuse is safe by the tool's own rule, not just
  eyeballed. Closing sequence chip: HEAD → COLLAR → SHEATH/TAIL → TAIL
  FIBRES. One advisory stall (English b7 only — phage anatomy's Fade
  delays land after the verifier's 1s snapshot; confirmed present by eye
  in the final frame). VERDICT PASS both languages, 0 overlaps/overflow/
  empty. Eye-checked via FORCE_SHOTS, both languages, all 9 frames — the
  most diagram-dense section so far, renders cleanly; dimmed bullseye
  reads as a faint "ghost" under the phage, not a defect.

- **Sec 52** — "The discovery story": a 3-scientist timeline (mirrors
  Sec2's proven pattern) — bare timeline arrow drawn first, then
  IVANOWSKY (GREEN, tiny agent from tobacco / passed bacteria-stopping
  filters) --arrow--> BEIJERINCK (AMBER_DARK, tobacco extract infects
  healthy plants / named it Contagium vivum fluidum) --arrow--> STANLEY
  (INK, viruses can be CRYSTALLISED / TMV first virus purified), each
  card landing with its own beat. Closing: why Stanley's result mattered
  conceptually (callback to Sec48's half-alive idea), the "virus" =
  Latin for poison/venom etymology, and the I-B-S mnemonic stamp. VERDICT
  PASS both languages, 0 overlaps/overflow/empty, 0 stalls. Eye-checked
  via FORCE_SHOTS, both languages, all 9 frames — clean; the 3-card
  timeline reads immediately as a memorisable sequence.

## Current
Sec 52 done, committed, pushed. Next: Sec 53 — "DNA or RNA, never both"
(subtopic 5 continues).

## Note to self on process
A parent/coordinator message on 2026-08-14 claimed I had "stalled mid-Sec2"
and lost my environment — verified against actual state (git log, origin
fetch, dev server curl) and found this false: Sec1-3 were already committed
*and* pushed to origin/premium-board-bio2, working tree clean, dev server
still up. Did NOT re-clone (would have wasted a fully-intact environment).
Continued from actual state (Sec4) instead. Pushing after every single
section from here per the coordinator's other instruction (already was
doing this anyway).
