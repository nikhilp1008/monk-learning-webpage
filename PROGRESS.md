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
Sec 41 done. Starting Sec 42.

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
- Sec 14 — Pitfalls and pro-tips for expansion — numbered-badge closer
  (4 pitfalls: never add 32 to ΔT, use L₀ not final L, hole expands too,
  apparent expansion for liquids) + amber sanity-check box (1mm/m/100°C).
  Matches the Ch01Sec90 house motif. tsc clean, VERDICT PASS, stalls=6/6
  (audio gap, expected). SUBTOPIC 1 COMPLETE (14/14).
- Sec 15 — Specific heat: the stubbornness of water — ladle+mug/flame
  hook, scorch-vs-warm, water/steel ΔT bar comparison, c definition,
  boxed c_water=4186 J/(kg·K) value, real-world consequences, "thermal
  shock-absorber" verdict. tsc clean, VERDICT PASS, stalls=6/6 (audio
  gap). Opens Subtopic 2 (Calorimetry and Specific Heat).
- Sec 16 — The principle of calorimetry: a heat bank — insulated box
  hot/cold bodies + flow arrow, calorimeter icon, energy-conserved note,
  boxed principle (heat lost=heat gained), the calorimeter-participates
  catch, water equivalent w=mc, heat-bank money analogy. tsc clean,
  VERDICT PASS, stalls=7/7 (audio gap).
- Sec 17 — Latent heat: heat that hides during a phase change — classic
  temp-vs-heat-added plateau graph (rise-flat-rise), ringed plateau with
  "temp holds steady" callout, Q=mL, melt/boil cal-per-gram comparison
  box, steam-burn warning. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 18 — The reliable framework: never assume the final state — golden
  rule/leg-splitting notes, 5-segment ice→steam curve (extends Sec17's
  motif), ringed plateaus with the mcΔT-mistake warning, budget method,
  sanity-check note. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 19 — Heat: per degree, per body, per mole — Q=mcΔT workhorse,
  c definition, C=mc whole-body heat capacity, C-vs-c distinction,
  molar heat capacity Mc=Q/(nΔT), amber caveat box (c not fixed, can be
  negative). tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 20 — Latent heat, water equivalent, and the key numbers — w=mc,
  Q=mL with L_f/L_v, master balance Σlost=Σgained, memorize-table (cal
  units: c_water=1, c_ice=0.5, L_fusion=80, L_vap=540), SI-units box.
  tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 21 — Worked example: heating a vessel and its water — vessel+water
  icon (25°C→75°C), givens, Q=(m_w c_w+m_Al c_Al)ΔT formula, substitution,
  boxed 4.41×10⁵J answer, "container matters" takeaway. tsc clean,
  VERDICT PASS, stalls=6/6 (audio gap).
- Sec 22 — Worked example: ice into warm water, mind the melt — wrong
  "mix two waters" reflex (24°C, crossed out) vs budget method (water
  gives 600cal, melt needs 400cal, surplus 200cal warms all → T=8°C),
  "melt first" rule. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 23 — Worked example: a lead pellet just begins to melt — KE→heat
  setup, "just begins to melt" = reach mp + complete fusion, cΔT+L_f
  formula, substitution to 63400 J/kg, boxed v≈503.6 m/s, mass-cancels
  takeaway. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 24 — Worked example: ice and steam in one box — cold-side budget
  (2550cal needed) vs hot-side budget (3200cal available), the test
  (2700>2550 ⇒ both phases complete), boxed balance T≈18.6°C, sanity
  confirm. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 25 — Pitfalls and pro-tips for calorimetry — numbered-badge closer
  (4 pitfalls: skip latent step, assume final state, drop calorimeter,
  unit collisions) + amber running-heat-budget pro-tip box + 5-legs
  mnemonic. tsc clean, VERDICT PASS, stalls=6/6 (audio gap). SUBTOPIC 2
  COMPLETE (11/11).
- Sec 26 — Conduction: the particle relay — spoon-in-chai hook, rod with
  jostling-atom dots + vibration ticks, whispered-message analogy, free-
  electrons note, metal-vs-wood handle puzzle + resolution (you sense
  your skin). Opens Subtopic 3 (Heat Transfer). tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap). Caught/fixed one Devanagari-in-Hinglish typo
  before commit — double-check Hinglish strings stay pure Latin script.
- Sec 27 — Fourier's law by feel: four sensible factors — rod (T₁ hot,
  T₂ cold, L bracket), growing list of 4 factors (bigger A/ΔT ⇒ faster,
  bigger L ⇒ slower, K copper-vs-wool), wool-throttles-heat takeaway.
  tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 28 — The circuit analogy: thermal resistance — pipe-pressure/flow
  analogy, R=L/(KA) & H=ΔT/R formulas, Ohm's-law mapping, zigzag-resistor
  icon + "rod=resistor" note, circuit-arithmetic takeaway. en reveals all
  exactly 1s apart — every delay kept ≤0.2s. tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap).
- Sec 29 — Convection, and when the conduction law holds — pot with
  rising-warm/sinking-cool circulation arrows, everyday examples (sea
  breeze, room heater), needs-a-fluid note, natural-vs-forced, boxed
  caution on conduction law's steady-state assumptions. tsc clean,
  VERDICT PASS, stalls=6/6 (audio gap).
- Sec 30 — Fourier's law and thermal conductivity — hero formula
  H=KA(T₁−T₂)/L, H/gradient/K definitions with units, dimensional
  formula [MLT⁻³θ⁻¹], boxed K-values (Cu≈400, Al≈235 vs insulators),
  steady-state reminder. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 31 — Thermal resistance, series and parallel — series rod diagram
  (R_eq=R₁+R₂), parallel rod diagram with connectors (1/R_eq=1/R₁+1/R₂),
  equal-rods K_eff=(K₁+K₂)/2 special case. tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap).
- Sec 32 — Building the series and parallel rules — junction diagram
  (T₁→T₂→T₃) deriving R_eq=R₁+R₂ from steady-state H-continuity, parallel
  rods sharing ΔT deriving 1/R_eq=1/R₁+1/R₂, weighted-junction shortcut.
  tsc clean, VERDICT PASS, stalls=7/7 (audio gap).
- Sec 33 — Worked example: heat lost through a windowpane — pane icon
  (inside 22°C/outside 8°C), givens, H=KAΔT/L formula, substitution,
  boxed 4.2kW answer, double-glazing takeaway. tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap).
- Sec 34 — Worked example: halve the length, double the radius — wrong
  "double r ⇒ double A" reflex (crossed out) vs H∝A/L=r²/L fast way,
  boxed new-rate=8H answer, r²-reflex takeaway. tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap).
- Sec 35 — Worked example: copper and steel joined in series — Cu/steel
  rod-pair with junction dot (100°C→0°C), R_Cu/R_steel/R_eq values,
  boxed H≈3.56W, boxed T_junction≈88.9°C, "junction hugs hot end"
  takeaway. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 36 — Worked example: how ice thickens on a pond — text-flow through
  the integration (ρL_f A dx/dt=KAθ/x ⇒ x dx=(Kθ/ρL_f)dt, integrate 4→6cm),
  boxed t≈1.41×10⁴s≈3.9h, "time ∝ x²" insight. Hardest worked example in
  the subtopic. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 37 — Pitfalls and pro-tips for heat transfer — numbered-badge closer
  (4 pitfalls: A~r², series-vs-parallel, ΔT not equal in series, steady-
  state only) + amber DC-circuit pro-tip box + "solids conduct, fluids
  convect, vacuum radiates" mnemonic. tsc clean, VERDICT PASS, stalls=6/6
  (audio gap). SUBTOPIC 3 COMPLETE (12/12).
- Sec 38 — Radiation: heat across empty space, and Prevost's exchange —
  sun+rays hook (crosses vacuum), radiation=EM-waves note, "everyone
  radiates" note, Prevost body icon with in/out arrows (absorb/emit),
  net-balance note, equilibrium note. Opens Subtopic 4 (Radiation and
  Cooling Laws). tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 39 — The fierce T-to-the-fourth law and Wien's colour of glow —
  "double T ⇒ power ×16" reveal, P∝T⁴ explanation, iron-rod colour
  progression (dull red→orange→yellow→white circles), wavelength-shift
  note, Wien's law. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
- Sec 40 — Kirchhoff, the black body, and the thermos — shiny-vs-black
  can (black cools faster), "good absorbers=good emitters" insight,
  boxed e=α (Kirchhoff's law), black-body definition, cavity-hole
  approximation, thermos-defeats-all-3-modes takeaway. tsc clean,
  VERDICT PASS, stalls=6/6 (audio gap).
- Sec 41 — The fine print: emissivity, net exchange, Newton's
  approximation — E=σT⁴ pure form, P=eσAT⁴ real-surface, boxed
  P_net=eσA(T⁴−T₀⁴), Newton's-law-is-an-approximation note, Stefan's-T⁴-
  in-disguise closer. tsc clean, VERDICT PASS, stalls=6/6 (audio gap).
