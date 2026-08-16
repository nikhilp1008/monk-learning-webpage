# B11 Ch03 — Plant Kingdom — Progress

- Branch: `premium-board-bio3` (off `origin/main`, worktree `~/Downloads/monk-scenes-bio3`)
- chapter_id: `1380c5e5-1556-5626-97fa-8237c6cb021b` (subject `biology`, class_level 11)
- Sections: 104 (Supabase `position` 1–104)
- Dev port: 3013
- Naming: `B11Ch03SecM.tsx` / `B11Ch03SecM` / registry const `B11CH03` / keys `` `${B11CH03}:M` ``

## Lesson JSON — verified match

Two candidate files exist in `JSON_LESSONS/Class11_Bio/`:
- `b11_ch03_plant-kingdom_full.json` — 104 sections, `section_index` 1..104.
- `b11_ch03_plant-kingdom_full_merged.json` — only 11 sections (coalesced/merged, NOT 1:1 with Supabase positions).

Verified 2026-08-15 by pulling all 104 `lesson_sections` rows for this
chapter_id from Supabase and diffing against both files: `_full.json`
matches **all 104 positions exactly** — `title` string-equal and
`len(board_events) == len(board_reveal_at_english) == len(board_reveal_at_hinglish)`
for every position, zero mismatches. `_full_merged.json` cannot match at all
(11 sections vs 104 positions).

**Use `b11_ch03_plant-kingdom_full.json`.**

## Subtopic map (from lesson JSON, `section_index` → Supabase `position`)

1–7   Classification Systems
  1 concept            Why classification needs a basis
  2 concept            The three classical systems, side by side
  3 concept            Locking proponent to system
  4 concept            Numerical, cyto- and chemotaxonomy
  5 worked_examples    Artificial vs natural, and the match-the-column
  6 worked_examples    Naming the approach, and the Linnaeus assertion–reason
  7 tips               Traps, fixes, and the keyword decoder

8–22  Algae
  8 concept            What an alga actually is
  9 concept            The size range: unicell to kelp
  10 concept           Three colours, one chlorophyll underneath
  11 concept           Chlorophyceae — the green algae
  12 concept           Phaeophyceae — the brown algae
  13 concept           Rhodophyceae — the red algae
  14 concept           Three routes to a new alga
  15 concept           Alternation of generations: the haplontic pattern
  16 concept           Diplontic and haplo-diplontic
  17 concept           What algae are worth
  18 worked_examples   Two features each, and the match-the-column
  19 worked_examples   NEET: making three clues agree
  20 worked_examples   The Spirogyra assertion–reason
  21 tips              Which clue to trust: the reliability ranking
  22 tips              The four slips that cost marks

23–44 Bryophytes & Pteridophytes
  23 concept           One long migration onto land
  24 concept           Bryophytes: the amphibians of the plant kingdom
  25 concept           Pteridophytes: the first to install the plumbing
  26 concept           The switch: who is 'the plant'?
  27 concept           The two groups at a glance
  28 concept           Sex organs: identical in both groups
  29 concept           Bryophytes: the liverworts
  30 concept           Bryophytes: the mosses
  31 concept           Pteridophytes: the four classes
  32 concept           The pteridophyte vocabulary
  33 concept           The bryophyte life cycle
  34 concept           The pteridophyte life cycle
  35 concept           Both haplo-diplontic — but mirror images
  36 concept           Heterospory and the dawn of the seed habit
  37 concept           The evolutionary sequence
  38 concept           What these plants are worth
  39 worked_examples   Three marks means three named axes
  40 worked_examples   Match the column: anchor, then eliminate
  41 worked_examples   NEET: which clue actually decides?
  42 worked_examples   The heterospory assertion–reason
  43 tips              The two biggest reversals
  44 tips              Two more slips, and the speed rule

45–66 Gymnosperms
  45 concept           The seed: a great packaging breakthrough
  46 concept           Gymnos + sperma: the name is the definition
  47 concept           Who they are: about nine hundred species
  48 concept           The takeover reaches near-completion
  49 concept           Three places where intuition misleads
  50 concept           The master contrast: gymnosperm vs angiosperm
  51 concept           The two genera that carry the marks
  52 concept           Three more genera, one fact each
  53 concept           Inside the wood: tracheids only
  54 concept           Three terms worth defining exactly
  55 concept           Life cycle, part one: two cones, two spores
  56 concept           Life cycle, part two: no water anywhere in it
  57 concept           The drawing to reproduce
  58 concept           The seed-habit milestone
  59 concept           Built for cold, dry, windy places
  60 concept           Five products, five sources
  61 worked_examples   Define the name, then pair the contrasts
  62 worked_examples   Match the column: three genera, no overlap
  63 worked_examples   NEET: three clues converge, two follow-ups
  64 worked_examples   The endosperm assertion–reason
  65 tips              The two inversions that cost the most
  66 tips              Two more slips, and the four-fact checklist

67–87 Angiosperms
  67 concept           Everywhere, and every size
  68 concept           The trend reaches its endpoint
  69 concept           Upgrade one: the flower
  70 concept           Upgrade two: double fertilization
  71 concept           Three caveats
  72 concept           The master split: dicots vs monocots
  73 concept           The two gametophytes
  74 concept           Five terms to define exactly
  75 concept           Seven cells, eight nuclei
  76 concept           The drawing to reproduce
  77 concept           Two fusions, two products
  78 concept           The contrast to over-learn
  79 concept           Diplontic — and the great arc completes
  80 concept           Why they are the most successful land plants
  81 concept           Economic importance
  82 worked_examples   Describe the sac, then show the arithmetic
  83 worked_examples   Match the column: anchor, then eliminate
  84 worked_examples   One event, four things asked
  85 worked_examples   When the reason IS the arithmetic
  86 tips              The count, and the two fusions
  87 tips              Two more slips, and the sketch that answers everything

88–103 Plant Life Cycles & Alternation of Generations
  88 concept           Every plant lives a double life
  89 concept           Two events flip the plant
  90 concept           A relay race run by a team of two
  91 concept           Three caveats
  92 concept           The three life-cycle patterns
  93 concept           Six terms, defined exactly
  94 concept           Read the pattern off where meiosis happens
  95 concept           The grand trend of the plant kingdom
  96 concept           The biological logic — why the sporophyte wins
  97 concept           The bridging forms
  98 worked_examples   Define it, then name the two events
  99 worked_examples   Pattern to examples — no overlap anywhere
  100 worked_examples  The two-step, worked live
  101 worked_examples  The assertion that sounds like a contradiction
  102 tips             The discriminator, and the over-claim
  103 tips             Two more slips, and the two-step that ends the topic

104   Chapter Close
  104 cheat_sheet       Plant Kingdom — one-screen recall

## Done log (append one line per finished, PASS + committed + pushed section)

- Sec 1 — Why classification needs a basis: music-library warm-up analogy (colour/features/lineage chips, erased once the diagram starts) → 3-step ascending staircase (gross form / anatomy→chemicals / evolutionary descent) + direction-of-travel arrow → ARTIFICIAL/NATURAL/PHYLOGENETIC chips mapped to steps → flower-colour caution cross-out → NATURAL∩PHYLOGENETIC overlap note → provisional-classification dashed chip closer.
- Sec 2 — The three classical systems, side by side: 4-column table (SYSTEM/BASIS/CHARACTERS/PROPONENT) built row by row — "read across, not down" sweep-arrow demo in the empty row-0 slot (erased once real data lands there) → ARTIFICIAL/NATURAL/PHYLOGENETIC rows fill in turn → synthesis arrow+rule under the table ("more characters + closer to descent = more natural") → green ring on Bentham & Hooker's proponent cell + India-herbaria fact → closing banner compressing all three rows into one least/broad/broadest line. Verified both langs, verify-scene.mjs clean (0 overlap/overflow/empty; one advisory beat-1 "stall" — spot-checked with FORCE_SHOTS, content is real and correct, just the verifier's group-diff heuristic under-counting a Draw+Fade pair vs a dimmed carry-over). Table-row pattern (row-Y pitch, tick+4 cells, one row per beat) is reusable for Sec 4 (numerical/cyto/chemotaxonomy) and other multi-row concept sections ahead.

- Sec 3 — Locking proponent to system: 3-column wiring diagram — Linnaeus/Bentham&Hooker/Engler&Prantl chips on top, ARTIFICIAL/NATURAL/PHYLOGENETIC chips below, framework revealed empty first then one straight vertical arrow wired per beat (no crossing, visually literal) with a trigger-word caption per column → weakness note under column 1 (veg=sex equal weight, veg is environment-plastic → unnatural) → concrete two-plant illustration (same stamen count, everything else different, Linnaeus still boxes them together) → closing correction banner (artificial ≠ bad/wrong). Verified both langs, verify-scene.mjs fully clean (0 overlap/overflow/empty, no stalls); spot-checked with FORCE_SHOTS — reads as a clean wiring diagram.

- Sec 4 — Numerical, cyto- and chemotaxonomy: 3 titled panels (NUMERICAL taxonomy / CYTOTAXONOMY / CHEMOTAXONOMY, same column x's as Sec3's wiring diagram) revealed empty first, then each panel's evidence-definition fills in its own beat → single compressed prefix-decoder line under all three → high-value "advantage: objectivity" line + underline inside the NUMERICAL panel → closing banner (modern layers feed objective data into the classical systems, don't replace them). Verified both langs, verify-scene.mjs fully clean (0 overlap/overflow/empty, no stalls); spot-checked with FORCE_SHOTS.

- Sec 5 — Artificial vs natural, and the match-the-column: first worked_examples section, two full questions with a hard erase between them (`q1On = beat<6` gated into every Q1 element's own `on` prop, per the Ch04 gotcha). Q1 (board 2-marker): question line → instruction-parse captions (distinguish=CONTRAST, one-proponent-each=name COMPULSORY) → shared row-axis table (CHARACTERS/PROPONENT/CONSEQUENCE × ARTIFICIAL/NATURAL) filled column by column, consequences colour-mirrored red/green → closing rule. Q2 (entrance-level match-the-column): two given-order lists (A/B/C vs 1/2/3, deliberately NOT row-aligned) → three curved crossing connectors drawn one at a time (A-3, B-1, C-2) → answer chip + anchor-and-eliminate technique note. Verified both langs, verify-scene.mjs clean (0 overlap/overflow/empty; one advisory beat-6 stall — spot-checked, Q1 genuinely vacates and Q2's ~8 fresh elements render correctly, same heuristic quirk as Sec2's beat-1 stall). The q1On erase-gate + crossing-connector patterns are reusable for every future worked_examples section with a match-the-column.

## Current

Sec 6 — Naming the approach, and the Linnaeus assertion–reason — next.
