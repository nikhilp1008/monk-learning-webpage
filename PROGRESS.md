# Chapter 9 — Hydrocarbons (Class 11 Chemistry) — Progress

- chapter_id: `388fccf5-9390-50aa-b678-5800a9e4fffa`
- branch: `premium-board-chem9` · worktree: `~/Downloads/monk-scenes-chem9` · dev port: `3028`
- Naming: `C11Ch09SecM.tsx`, component `C11Ch09SecM`, registry key `` `${C11CH09}:M` ``
- Spec: `src/components/scenes/SCENE_AUTHORING_CHEMISTRY.md` (domain) over
  `SCENE_AUTHORING.md` (engine/precision contract) + `chem-kit.tsx` (bond/mechanism
  primitives) + `kit.tsx` (base primitives). This chapter is the **first** to use
  `chem-kit.tsx` — Sec 1, once verified, becomes the house exemplar for future
  chemistry chapters.
- 80 sections total. **77 to author** — Sec 11, 47, 53 are SKIPPED (see below).

## Subtopic map
- 1–5 Classification of Hydrocarbons
- 6–21 Alkanes
- 22–41 Alkenes
- 42–58 Alkynes
- 59–78 Aromatic Hydrocarbons
- 79–80 Chapter Recap

## SKIPPED (placeholder / uniform-timing audio — revisit once real audio lands)
- Sec 11 — "Preparing alkanes II: the Wurtz reaction"
- Sec 47 — "Physical properties of alkynes"
- Sec 53 — "Polymerisation of ethyne"

## ⚠ KNOWN ISSUE (resolved with a workaround): this chapter's audio CDN 404s
All `audio_url_english`/`audio_url_hinglish` for this chapter point to
`audio.monklearning.com/11/Chemistry/c11_ch09/...` which returns **404** for
every section checked (confirmed sec 1, 2, 40, 80 — and the sibling
`c11_ch05` chapter's audio 404s too, so this is a broader not-yet-generated-
audio pipeline gap, not specific to ch09). Same failure mode chem8's Ch02
hit before ("BLOCKED on broken audio CDN", see that worktree's git history).

Consequence: the app's board playback is driven entirely by the real
`<audio>` element's `loadedmetadata`/`timeupdate` events. With the file
404ing, `duration` stays `NaN` and `currentTime` never leaves 0 — every
beat-gated element stays hidden and `verify-scene.mjs` "passes" on a
permanently-blank (title-only) board. A false positive, not a real check.

**Workaround (this worktree only, does not touch the shared `verify-scene.mjs`):**
`scratch/verify-scene-mocked.mjs` — identical assertions/output, but
`page.route()`-intercepts requests to `audio.monklearning.com` and fulfills
them with a locally-synthesised silent WAV (`Accept-Ranges: bytes` header is
required or Chromium refuses to seek within it) sized to cover the section's
reveals. This makes `loadedmetadata`/seeking/`timeupdate` fire for real, so
it gives genuine beat-by-beat overlap/overflow/empty checks, not just a
screenshot eyeball. Confirmed working end-to-end on Sec 1 (FORCE_SHOTS
eyeballed clean in both languages, real per-beat progression, zero stalls).
**All sections in this chapter are verified with this script, not the
original.** Once the real CDN audio is live, a normal `verify-scene.mjs`
pass should need no rewrite (choreography is against the real reveals/content
already).

## Done
(append one line per finished section: `Sec N: <title> — <one-line what the scene shows> — PASS [mocked-audio]`)
- Sec 1: The hydrocarbon family tree — root "HYDROCARBONS" branches into ALIPHATIC/ALICYCLIC/AROMATIC, aliphatic splits saturated/unsaturated with CnH2n+2/CnH2n/CnH2n-2 chips, alicyclic vs aromatic rings (plain hexagon vs hexagon+circle), red theme banner — PASS [mocked-audio]
- Sec 2: Cycloalkanes and Baeyer's ring strain — chain→ring pictogram, CnH2n formula, red "same formula as alkenes, no double bond" trap, cyclo-+hexane=cyclohexane naming, 109.5° tetrahedral icon, 4-ring strain row (triangle 60°/square 90° red-strained, pentagon ~108° near-strain-free, chair-zigzag cyclohexane green-stable) — PASS [mocked-audio]
- Sec 3: How cycloalkanes react: strain decides — strained-ring lane (triangle + H2/catalyst → CH3CH2CH3, "mimics unsaturation") vs strain-free lane (pentagon + hν,X2 → R–X substitution), red rule banner — PASS [mocked-audio]
- Sec 4: Ordering cycloalkanes by stability (worked example) — 4-row table (icon/name/angle/deviation) for all four rings, green answer chain "cyclohexane > cyclopentane > cyclobutane > cyclopropane", red reactivity-is-reverse note — PASS [mocked-audio]
- Sec 5: Two classic cycloalkane traps (tips) — TRAP 1 (CnH2n chip shared with alkenes, red "≠ double bond", cyclopropane-adds-from-strain aside) and TRAP 2 (assuming flat, red "cyclohexane is puckered" + chair icon), amber pro-tip banner — PASS [mocked-audio]

## Current
Sec 1-5 done — Classification of Hydrocarbons subtopic complete. Moving to
Alkanes (Sec 6-21, skipping Sec 11).
