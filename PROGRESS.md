# Chapter 10 — Thermal Properties of Matter — Progress

- Branch: `premium-board-ch10` · Worktree: `~/Desktop/monk-scenes-ch10` · Port: **3010**
- chapter_id: `087ea53b-681c-51a2-92ef-5ea77f6bdf8b`
- Lesson JSON: `JSON_LESSONS/Class11_Phy/p11_ch10_thermal-properties-of-matter_full.json`
- Sections: 74 (all reveals confirmed matching narration segment counts — see
  scratchpad `ch10-merged.json` fetched via Supabase `lesson_sections`)

## Subtopic map
- 1–14  Temperature, Heat and Expansion
- 15–25 Calorimetry
- 26–37 Conduction/Convection
- 38–49 Radiation/Cooling
- 50–61 Thermometry/Ideal-Gas
- 62–72 Phase Transitions
- 73–74 Wrap-Up

## Current
Sec 13 done. Starting Sec 14 (last of Subtopic 1).

## IMPORTANT: audio pipeline gap from Sec 12 onward
Confirmed via curl: audio.monklearning.com has generated mp3s (200) for
Ch10 sections 1-11 only; sections 12+ all return 404 (checked up to 74,
plus a full 12-25 sweep — clean boundary at 11, not random gaps). This is
an external pipeline issue, not a scene bug: verify-scene.mjs's seek()
sets `audio.currentTime` directly, but the page's `currentTime` React
state only updates via the `<audio>` element's native `timeupdate` event
(src: src/app/lessons/[chapterId]/page.tsx `handleTimeUpdate`, no rAF
fallback) — with no audio source the element errors
(networkState=NO_SOURCE, MEDIA_ERR_SRC_NOT_SUPPORTED) and never fires
`timeupdate`, so `currentTime` stays 0 and `beat` stays -1 forever. Every
probed frame beyond t=0 then just shows the blank board + title, which
still trivially satisfies the overlap/overflow/empty gates (title text
never overlaps/overflows anything) — so verify-scene.mjs prints VERDICT
PASS even though it could not actually exercise per-beat geometry.

**Diagnostic signal**: this shows up as a stall on EVERY beat (e.g.
Sec12: stalls=6 out of 6 beats checked). Contrast with a real pacing bug,
which stalls only SOME beats while others still show progress (as fixed
in Sec3/Sec4/Sec5's isolated 1-stall cases). Full-stall = audio missing,
not a code problem — confirmed by inspecting Sec12 directly with a
Playwright script that reads the `<audio>` element's `networkState`/
`error` and by checking that all 13 expected `g.sc-fade`/`Draw` elements
exist in the DOM with correct beat-gated opacity logic.

**What this means going forward**: for Sec12+, `npx tsc --noEmit` and
`verify-scene.mjs`'s blank-board-at-t=0 check remain meaningful, but the
per-beat overlap/overflow/empty checks are NOT exercised until audio
exists. Compensating by leaning harder on manual layout-plan box math
(SCENE_AUTHORING.md Step 3) before writing JSX, and keeping the same
short-delay discipline. Re-run `verify-scene.mjs` (or FORCE_SHOTS eyeball)
on Sec12+ once their audio files appear — do not treat "stalls = beat
count" PASS as a substitute for that re-check.

## Note
Ch10's reveal timestamps often have 1s-tight middle beats. Keep any beat's
Fade delay ≤ ~1.3s (verifier's per-beat settle check is a discrete seek +
1.8s real-time wait, not proportional to the beat's narration length) —
longer delays risk an advisory "stall" (no new visible group). Fix by
tightening delays, not by ignoring the warning.

## Done
- Sec 1 — Temperature versus heat: level and flow — chai-tumbler hook,
  cup/pot same-temperature diagram, hot/cold heat-flow blocks, "contains
  heat" wrong/right line, Mumbai-local crowd analogy. VERDICT PASS.
- Sec 2 — Thermal equilibrium and the Zeroth Law — A/B flow-then-settle
  blocks, A≡C/B≡C triangle diagram, C-as-thermometer icon, two-patients
  37°C analogy, verdict line. VERDICT PASS.
- Sec 3 — Thermal expansion: why heated things grow — cold/hot lattice
  boxes, railway-gap diagram, bridge rollers + sagging wire, uniform-
  scaling square, verdict. VERDICT PASS (eyeballed, clean).
- Sec 4 — When the formulas hold, and water's rebellion — 3 numbered
  assumption chips, water density-vs-temperature graph peaking at 4°C,
  fish-under-ice + mnemonic. VERDICT PASS (eyeballed, clean).
- Sec 5 — Temperature scales: one conversion identity — master-identity
  formula card, F/K derived formulas, Kelvin SI note, ice/steam fixed-
  point table, exam-secret delta box. VERDICT PASS (eyeballed, clean).
- Sec 6 — Heat, specific heat, and the calorie — hero equation Q=mcΔT,
  recipe metaphor, variable legend, calorie chip, precise cal definition,
  mechanical-equivalent J box. VERDICT PASS (eyeballed, clean).
- Sec 7 — Linear, areal, volumetric expansion: the 1-2-3 rule — three-
  column line/square/cube diagrams with their ΔL/ΔA/ΔV formulas, the
  β=2α,γ=3α payoff, powers-of-length note. VERDICT PASS (eyeballed, clean).
- Sec 8 — Density change and thermal stress — two-column split: density
  formula + growing-container/same-dots visual (left), clamped-rod
  σ=YαΔT with hatched walls + short/long-rod-same-stress (right).
  VERDICT PASS (eyeballed, clean).
- Sec 9 — Deriving the 1-2-3: why gamma = 3 alpha — isometric cube (left)
  building L₀→V₀→L(1+αΔT)→V(1+αΔT)³, binomial expansion with negligible
  terms crossed out, γ=3α reveal, β=2α bonus (right). The key derivation
  of the subtopic — extra care taken. VERDICT PASS (eyeballed, clean).
- Sec 10 — Worked example: a railway rail in the afternoon sun — sun +
  rail-bar setup (18°C→48°C), givens, ΔL=αL₀ΔT formula, substitution,
  boxed answer 4.32mm, Indian Railways takeaway. VERDICT PASS (eyeballed).
- Sec 11 — Speed trap: a fever on the Fahrenheit scale — wrong-reflex box
  (37.4°F, crossed out) vs correct ΔF=9/5ΔC=5.4°F (green box+check),
  remember-box (ΔK=ΔC, never add 32). VERDICT PASS (all beats 0-4 exactly
  1s apart — every delay kept ≤0.2s to stay within the verifier's settle
  window; still passed clean).
- Sec 12 — Worked example: thermal stress in a clamped copper rod —
  hatched-wall clamped-rod setup, given Y/α, logic note, strain calc,
  boxed σ=9.35×10⁷Pa answer, length-independence takeaway. tsc clean,
  VERDICT PASS but stalls=6/6 — first section hitting the missing-audio
  gap (see note above); geometry not independently re-verified by eye,
  code inspected and matches the working Sec8/Sec10 pattern.
- Sec 13 — Worked example: a pendulum clock in a Rajasthan summer —
  pendulum icon, T=2π√(L/g) formula, log-differential ΔT/T=½αΔθ, the
  "runs SLOW" conceptual core (red), substitution, boxed ≈13s/day answer.
  tsc clean, VERDICT PASS, stalls=6/6 (audio gap, expected).
