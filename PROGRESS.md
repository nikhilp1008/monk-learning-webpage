# Progress — B11 Chapter 4: Animal Kingdom

Branch: `premium-board-bio4` · Worktree: `~/Downloads/monk-scenes-bio4` · Dev port: **3021**
chapter_id: `f6bee128-d309-5443-b6f2-e9914769623d` (subject `biology`, class_level 11)

Lesson JSON: **`JSON_LESSONS/Class11_Bio/b11_ch04_animal-kingdom_full.json`** — confirmed the
correct file. It has 81 sections (`section_index` 1–81) whose titles match Supabase
`lesson_sections` positions 1–81 exactly (0 mismatches). Reveal-array lengths
(`board_reveal_at_english` / `board_reveal_at_hinglish` from Supabase) match the narration
segment counts in the JSON for all 81 sections (0 mismatches), confirmed before authoring
started.

`..._full_merged.json` is NOT a match — it only has 11 entries, each a merge of several
original sections (titles joined with " & "). Do not use it for this chapter.

Naming: files `B11Ch04SecN.tsx`, component `B11Ch04SecN`, registry const `B11CH04`,
registry key `` REGISTRY[`${B11CH04}:N`] = B11Ch04SecN; `` — appended at the end of
`src/components/scenes/index.ts`.

## Subtopic map (from Supabase, cross-checked against JSON)

**1–10 Master Map of the Animal Kingdom**
1. What makes an animal an animal: the cell-level signature
2. Movement, definite growth, and the animal control system
3. The master map: one chart holds the whole kingdom
4. Reading the left branch: the ten non-chordate phyla
5. Reading the right branch: chordates down to seven classes
6. Reproduction vocabulary: who makes the gametes
7. Development vocabulary: eggs, live young, larvae, metagenesis
8. The canonical larval forms
9. Worked example: reading a life-history fingerprint
10. Working the map, and the traps hidden in the vocabulary

**11–27 Basis of Classification**
11. The sorting office: why filters beat memorisation
12. Filter one: the four levels of organisation
13. Inside the organ-system grade: incomplete versus complete gut
14. Inside the organ-system grade: open versus closed circulation
15. Filter two: symmetry, and what it tells you about lifestyle
16. Filter three: germ layers, and the logical hinge of the chapter
17. Filter four: the coelom, and the three-tiffin test
18. The coelom by origin: schizocoelom versus enterocoelom
19. Filters five and six: segmentation, and the notochord
20. The decision sequence: running the six filters in order
21. Limiting conditions: where the filters bend
22. Worked example (CBSE): diploblastic versus triploblastic
23. Worked example (NEET speed trap): matching symmetry
24. Worked example (assertion and reason): coelom in a diploblast
25. Worked example (HOTS): the marine invertebrate with two symmetries
26. Common student pitfalls
27. Pro-tip: the fixed ladder, and lock the coelom first

**28–50 Non-Chordata**
28. Walking the gallery: ten phyla in rising complexity
29. Porifera: the entrance hall and its water current
30. Porifera: skeleton, regeneration, and the example bank
31. Cnidaria: nature's harpoon, one cavity, two body forms
32. Ctenophora: the sea walnut that rows and glows
33. Platyhelminthes: flat, solid, and often parasitic
34. Aschelminthes: the pseudocoelom and the one-way gut
35. Annelida: true segments, closed pipes, nephridia
36. Arthropoda: the largest phylum's toolkit
37. Arthropoda: respiration solved four ways
38. Mollusca: the opposite design route
39. Echinodermata: the water vascular system
40. Hemichordata: gill slits that fool you
41. The master matrix: ten fingerprints, no two alike
42. The dichotomous key: tissues, then symmetry and germ layers
43. The dichotomous key: cavity, origin, segments, notochord
44. Limiting conditions: every rule has a famous exception
45. Worked example (CBSE): why Arthropoda succeeded
46. Worked example (NEET speed trap): organ to phylum
47. Worked example (assertion and reason): Balanoglossus
48. Worked example (HOTS): four marine animals, four fingerprints
49. Common student pitfalls in the gallery
50. Pro-tip: fire the two-word fingerprint first

**51–72 Chordata**
51. Crossing the velvet rope: the chordate starter kit
52. The notochord's three fates: the master key to the phylum
53. Protochordata: the chordates that never become vertebrates
54. Vertebrata (Craniata): what actually decides membership
55. The chordate tree: three questions, seven classes
56. Cyclostomata: jawless, finless, and still a vertebrate
57. Chondrichthyes: cartilage, no operculum, no air bladder
58. Osteichthyes: bone, operculum, air bladder
59. Amphibia: moist skin, three chambers, two worlds
60. Reptilia: dry scales, shelled eggs, and one famous heart
61. Aves: feathers, hollow bones, and a warm four-chambered heart
62. Mammalia: hair, milk, a diaphragm, and the platypus
63. The class table: read down the columns
64. Placing a chordate: steps one to four
65. Placing a chordate: steps five to seven
66. Limiting conditions: at some stage, and the famous exceptions
67. Worked example (CBSE): the four fundamentals in adult humans
68. Worked example (NEET speed trap): matched WITHOUT exception
69. Worked example (assertion and reason): are cyclostomes vertebrates?
70. Worked example (HOTS): four vertebrates, and the platypus paradox
71. Common student pitfalls in Chordata
72. Pro-tip: one diagnostic feature per class, and recall the exception first

**73–81 Master Revision — Complete Reference**
73. The whole kingdom in one table: the non-chordates
74. The whole kingdom in one table: Chordata
75. The complete example bank: non-chordates
76. The complete example bank: Chordata
77. Every exception and superlative: the lines NEET is built on
78. The rest of the exception list, and the at-some-stage rule
79. High-yield rapid-fire: the sorting machinery
80. High-yield rapid-fire: signature organs and the chordate lines
81. Cheat sheet: Animal Kingdom on one page

## Done

(append one line per finished section, in order)

- [x] Sec 1 — Cell-level signature: cell-cluster diagram, animal vs plant/fungal/bacterial cell (wall-less vs rigid wall), consequence → movement, glycogen vs starch, SIGNATURE banner. Verified both langs, audits clean.
- [x] Sec 2 — Movement/growth/control/reproduction: footprint trail + sessile sponge/coral/larva exception, growth graph (animal plateaus vs plant keeps climbing) as Act 1, ERASED at beat 5 and replaced with Act 2 (control flow ENVIRONMENT→ANIMAL→MUSCLES, reproduction chip, asexual footnote, SIGNATURE banner). Verified both langs, audits clean; spot-checked frames by eye.
- [x] Sec 3 — The master map: full 3-level cascading decision tree (ANIMALIA → notochord? → NON-CHORDATA/CHORDATA → cranium? → PROTOCHORDATA/VERTEBRATA → jaws? → AGNATHA/GNATHOSTOMATA), accumulates across all 8 beats (nothing erased — this IS the chapter map), SIGNATURE banner. Verified both langs, audits clean; spot-checked frames by eye — reads as a clean, complete dichotomous key.

## Gotchas learned (for future sections in this file)
- Do NOT wrap a group in a manual `<g style={{opacity}}>` to "erase" superseded content — the verifier's visibility check only reads opacity from the nearest ancestor `g.sc-fade` (i.e. from `Fade`'s own `on` prop), so an outer inline-style wrapper is invisible to it (silent overlap bug, caught in Sec 2). To erase a whole beat-range's content, AND the erase condition directly into each element's own `on` prop (e.g. `on={act1 && beat >= k}` where `act1 = beat >= 1 && beat < 5`), not into a wrapping element.
- `Draw` has no `dashed` prop (only `Chip` does). For a dashed line, use a plain `<path strokeDasharray="…">` inside `Fade` (Sec1's dashed divider is the precedent) instead of passing `dashed` to `Draw`.
- `kit.tsx`'s `Draw` only animates `stroke-dashoffset` — a `fill` color on a Draw path renders immediately at t=0 regardless of the `on`/beat gate (`fill` is a plain SVG attribute, not part of the animated style). `verify-scene.mjs` does NOT catch this: it never inspects the literal t=0 frame (its first checked frame is `reveals[0]+1`s). Confirmed by eye on the dev server: Sec1's two nucleus circles and Sec2's sessile-coral icon (all `fill={CREAM}`) were visibly breaking the ruled-paper background before playback started — fixed in commit a626a3f8 by wrapping each in `<Fade on={...} delay={...}><Draw on={true} .../></Fade>` instead of gating fill+stroke via Draw's own `on`. Rule going forward: never pass a non-`"none"` `fill` to a bare `<Draw>` — always wrap it in a `Fade` with the real reveal condition, and set the inner `Draw`'s `on={true}`.

- [x] Sec 4 — The ten non-chordate phyla as a 4-column table (PHYLUM/GRADE/SIGNATURE/EXAMPLE), amber rung-tick per row, 2 rows drawn per beat across beats 2–6, closing line "not ONE ever develops a notochord" + SIGNATURE banner. Verified both langs, audits clean; spot-checked — clean readable table, good reusable pattern for future table sections.

- [x] Sec 5 — Reading the right branch: full Chordata tree — CHORDATA root → cranium? → PROTOCHORDATA (Urochordata/Ascidia, Cephalochordata/Branchiostoma) vs VERTEBRATA → jaws? → AGNATHA (Cyclostomata/Petromyzon) vs GNATHOSTOMATA → PISCES (Chondrichthyes, Osteichthyes) + TETRAPODA (Amphibia, Reptilia, Aves, Mammalia). 9 leaf taxa across the full canvas width, nothing erased. Verified both langs, audits clean; caught+fixed a title-overflow bug (Kalam ascender needs baseline y ≥ ~1.3×size + 30) before it passed. Spot-checked — clean complete tree.

- [x] Sec 6 — Reproduction vocabulary: ASEXUAL (left, budding + fragmentation cards) vs SEXUAL (right, dashed divider between), hermaphrodite/mono def+list vs dioecious/di def+list, closing mono/di house pictograms + SIGNATURE banner. Verified both langs, audits clean; spot-checked.

- [x] Sec 1/2 retro-fix — applied the sibling-chapter (Ch5) `fill`-on-bare-`Draw` gotcha to this file's own Sec1/Sec2: confirmed by eye on the dev server that Sec1's two `fill={CREAM}` nucleus circles and Sec2's `fill={CREAM}` sessile-coral icon were visibly present at t=0, before their beat fired. Fixed both by wrapping in `Fade` (see Gotchas above). tsc clean, verify-scene PASS both langs for sec 1 and 2, t=0 re-screenshotted clean. Commit a626a3f8.

- [x] Sec 7 — Development vocabulary: whole-board scaffold drawn at beat1 (3 row
  captions × 6 empty def boxes: eggs/live-young, internal/external fertilisation,
  direct/indirect; tall amber METAGENESIS box on the right, "the odd one"), then
  each box fills in on its own beat (oviparous, viviparous [cartilaginous-fish
  trap flagged amber], internal, external — one beat for both, direct [baby-circle
  → arrow → same-shape-bigger-circle icon], indirect [egg → tadpole → frog icon
  chain, shape changes color/size to sell metamorphosis], metagenesis [polyp ⇌
  medusa icons + cyclic double-arrow, Obelia]), closing metamorphosis-vs-metagenesis
  distinction line + SIGNATURE banner. All icons are stroke-only (no `fill`), by
  design, to sidestep the Draw-fill-gating gotcha entirely rather than wrapping
  each in Fade. tsc clean, verify-scene PASS both langs (frames=10, 0
  overlaps/overflow/empty; one advisory "stall" at b1 that's a false positive —
  manually confirmed by eye via dev-server screenshots at b1 that all 3 row
  captions + all 7 box outlines DO render distinctly at that beat, in both
  languages). FORCE-eyeballed all 9 beats end-to-end in both languages via
  screenshots (scaffold, each filled box, metagenesis, closing banner) — clean,
  no overlaps, reads well.

- [x] Sec 8 — The canonical larval forms: flashcard-drill scaffold (beat1 draws
  two "LARVA → GROUP" column headers + ruled underlines), then two columns of 3
  rows each fill in on their own beats — left: planula→Cnidaria, trochophore→
  Annelida & Mollusca, veliger→Mollusca ONLY; right: bipinnaria→Echinodermata
  (· Asterias), tadpole→Amphibia, ammocoete→Cyclostomata (· Petromyzon). Beat6
  rings the trochophore row (red) + a red trap callout ("shared by 2 phyla, need
  a 2nd clue"). Closing beat ties back to Sec7 (named larva = indirect
  development) + SIGNATURE banner. tsc clean, verify-scene PASS both langs
  (frames=9, 0 overlaps/overflow/empty, no stalls). Note: verify-scene.mjs's own
  Playwright browser timed out twice in a row on first attempts for this section
  (page itself loaded fine per curl/manual browser check both times — looked like
  local flakiness, not a scene defect); third attempt passed clean. Eyeballed the
  full list, the trap ring+callout, and the closing banner via dev-server
  screenshots in Hinglish (matches structurally in English — verify-scene
  exercises both languages independently and both passed with 0 overflow).

- [x] Sec 9 — Worked example: reading a life-history fingerprint. 4 given-clue
  chips (marine · sexes separate · fuse outside water · → bipinnaria larva) up
  top, then a narrowing FUNNEL of 4 stacked bars (ALL ANIMALS → filter1 dioecious
  [amber, deletes hermaphrodite groups] → filter2 external fertilisation [amber,
  narrows but doesn't decide] → bipinnaria→Echinodermata [GREEN, deciding]) drawn
  as empty dashed slots at the scaffold beat then filled/recolored one at a time.
  Bonus step (larva → indirect development), green ring on the deciding band +
  answer line, closing consistency check + SIGNATURE. tsc clean, verify-scene
  PASS both langs on the first attempt (frames=10, 0 overlaps/overflow/empty, no
  stalls). Eyeballed the funnel narrowing and the full closing stack via
  dev-server screenshots — reads very clearly, good reusable pattern for future
  worked-example sections.

- [x] Sec 10 — Working the map, and the traps hidden in the vocabulary (closes
  subtopic 1). ROADMAP row (beat1 draws Basis of Classification → Non-Chordata →
  Chordata with connecting arrows; beat2 adds a 4th amber box, Master Revision —
  Test Yourself). Then a 2×2 grid of 4 trap cards, each a ✗-misconception /
  ✓-correction pair, filled one per beat: hermaphrodite≠asexual; mono/di
  (bodies) ≠ internal/external (where gametes meet); ovi/vivi (where embryo
  develops) ≠ direct/indirect (larva or not), reptile=ovi+direct vs frog=
  ovi+indirect; metagenesis (Obelia) ≠ metamorphosis (tadpole). Closing pro-tip:
  4 term→example mnemonic chips (Budding–Hydra, Regeneration–Planaria,
  Metagenesis–Obelia, Bipinnaria–Asterias) + SIGNATURE banner. tsc clean,
  verify-scene PASS both langs (frames=9, 0 overlaps/overflow/empty). Same
  advisory "stall" at b1 as Sec7/Sec8 (bare Draw box outlines, not Fade-wrapped,
  don't register as new `g.sc-fade` groups in the stall heuristic) — confirmed
  by eye via dev-server screenshots that the roadmap row DOES render correctly
  at that beat. Eyeballed the full timeline (roadmap, all 4 trap cards, pro-tip
  + signature) — clean, no overlaps, reads well. **Subtopic 1 (Master Map of the
  Animal Kingdom, secs 1–10) is now fully done.**

## Current

Subtopic 1 (Master Map, secs 1–10) is complete. Next: Sec 11, subtopic 2
(Basis of Classification, secs 11–27) starts here.
