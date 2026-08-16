# Progress — B11 Chapter 5: Morphology of Flowering Plants

Branch: `premium-board-bio5` · Worktree: `~/Downloads/monk-scenes-bio5` · Dev port: **3022**
chapter_id: `ca9c37dd-ac72-50d6-96bf-fb3da5aba16e` (subject `biology`, class_level 11)

Lesson JSON: verified `JSON_LESSONS/Class11_Bio/b11_ch05_morphology-of-flowering-plants_full.json`
against Supabase `lesson_sections` for chapter_id `ca9c37dd-ac72-50d6-96bf-fb3da5aba16e` — all 76
positions match 1:1 by `section_index`/`position`, and title + subtopic are identical for every
row (0 mismatches). The sibling file `..._full_merged.json` has only **11** sections (pre-merged
multi-topic sections) and does NOT match Supabase 1:1 — do not use it for authoring.

Naming: files `B11Ch05SecN.tsx`, component `B11Ch05SecN`, registry const `B11CH05`, registry key
`` REGISTRY[`${B11CH05}:N`] = B11Ch05SecN; `` — subject-prefixed per the Biology/Chemistry/Math
convention, deliberately NOT bare `Ch05SecN` (that name is Physics Ch5). Appended at the END of
`index.ts`; `B11Ch01Sec*.tsx` used as the only available same-subject exemplar (no `B11Ch02Sec*`
exists on `main` yet, despite the kickoff prompt mentioning it — noted, not blocking).

## Subtopic map (from Supabase `subtopic`, grouped)

- **1–20** — The Root, the Stem, and the Leaf
  - 1–14 concept (root/shoot systems; root vs stem checklist; nodes/internodes; leaf; root
    systems tap/fibrous/adventitious; root tip zones; root & stem modifications; leaf parts,
    venation, simple/compound; bud test; phyllotaxy)
  - 15 field routine (stem-or-root diagnostic)
  - 16–19 worked examples
  - 20 pitfalls & pro-tips
- **21–39** — Inflorescence and the Flower
  - 21–34 concept (flower as modified shoot; inflorescence; racemose/cymose; whorls; symmetry;
    aestivation; cohesion/adhesion; androecium; gynoecium; ovary position; placentation; floral
    diagram/formula)
  - 35–38 worked examples
  - 39 pitfalls & pro-tips
- **40–58** — Fruit, Seed and Family Solanaceae
  - 40–53 concept (ovule→seed/ovary→fruit; seed structure; fruit terms; ovule parts; post-
    fertilisation fates; dicot/monocot seed; seed types; pericarp; true/false/parthenocarpic
    fruit; Solanaceae habit→corolla, androecium→economic importance, floral formula)
  - 54–57 worked examples
  - 58 pitfalls & pro-tips
- **59–75** — Semi-technical Description and Plant Families
  - 59–70 concept (capstone description; fixed field sequence; floral-formula symbol key; three
    families at a glance; Fabaceae habit→corolla, androecium→economic importance; Liliaceae; pea
    description worked; floral diagram orientation; locule/two-question filters; stem-mod &
    descriptive-term completeness notes)
  - 71–74 worked examples
  - 75 pitfalls & pro-tips
- **76** — `__chapter_close__` — chapter cheat sheet

## Setup log

- Worktree created off `origin/main` (526d454d) per updated instructions (NOT the stale
  `premium-board` branch referenced by the old `CHAPTER_KICKOFF.md` template).
- `.env.local` copied from canonical repo. `npm ci` succeeded (registry reachable, ~4s, 375
  packages). Dev server on port 3022, `Ready in 167ms`.
- Read `SCENE_AUTHORING.md` (current, verdict-mode verify rig) and `CHAPTER_KICKOFF.md` (gotchas:
  U+20D7 tofu → subscript form; Hinglish board text is Latin script).
- Studied `B11Ch01Sec1.tsx`, `B11Ch01Sec3.tsx`, `B11Ch01Sec10.tsx`, and `kit.tsx`.

## Done

(append one line per finished section, in order)

- Sec 1 — "Two departments: the root system and the shoot system" — plant body
  as a 2-box diagram (underground/above-ground), root+shoot facts, job chips,
  converge to "plant body axis", closing teaser (thorn/tendril/potato). PASS.
- Sec 2 — "Root versus stem: the defining checklist" — two-column checklist
  (ROOT | STEM) built row by row: direction, colour, decisive 0/4 vs 4/4
  nodes/internodes/leaves/buds, root hairs/origin; whisper verdict crosses out
  a depth-ruler icon ("features decide, not depth"). PASS.
- Sec 3 — "Nodes, internodes and buds: the railway analogy" — stem as a
  railway line with 3 station dots, a leaf boarding at a node (ringed),
  internode track highlighted, terminal/axillary bud icons, glossary lines
  accumulate left while a root (no stations, crossed) grows on the right;
  verdict chip; closing potato (eyes=buds→stem) vs sweet potato (no buds→
  root). PASS both languages; spot-checked with FORCE_SHOTS — clean, legible.

- Sec 4 — "The leaf: flat by design, the plant's kitchen" — leaf outline +
  sun → PHOTOSYNTHESIS chip ("the plant's kitchen"), node/axil-bud markers,
  "why flat?" teaser into a thin-sheet-vs-stacked-block sunlight demo,
  shopkeeper analogy, verdict trio (ROOT+STEM+LEAF chips). PASS both
  languages; spot-checked with FORCE_SHOTS.

## Bugfix (applies to Sec 2–4, landed before Sec 5)

`kit.tsx`'s `Draw` only animates `stroke-dashoffset` — a `fill` color on a
Draw path renders immediately and is NOT gated by `on`. Any filled icon (node
dots, bud/sun/leaf blobs, potato blobs, colour swatches, the sheet/block
rects) used as a bare `<Draw fill=... />` was visible from t=0, before its
beat and even before play — a blank-board-contract violation the verdict
checks don't catch (they only gate opacity via `g.sc-fade`, and Draw fills
aren't fade-wrapped by default). Caught by eye on a Sec4 FORCE_SHOTS spot
check (pale rectangles showing at beat 3 that belonged to beat 5). Fixed by
wrapping every filled Draw in `<Fade on={beat>=k} delay={...}><Draw on={true}
.../></Fade>` (same pattern Sec1's taproot icon already used correctly).
Re-verified Sec2/3/4 — all still PASS — and re-confirmed by eye that t=0 and
early-beat frames are now clean. **Going forward: any Draw with a non-"none"
fill MUST be Fade-wrapped.**

## Current

Starting Section 5.
