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

## UPDATE (2026-08-03): audio pipeline gap is RESOLVED — old docs below are stale
Resumed and found the machine's memory pressure had eased. While re-
verifying Sec44, the FINAL frame rendered fully (not blank+title), which
contradicted the "audio missing" diagnosis. Investigated with a real
Playwright check (`document.querySelector('audio').currentSrc`) instead
of a manual curl guess, and found the app now constructs audio URLs
under a DIFFERENT path: `.../11/Physics/p11_ch10/p1/<lang>_sec_<n>.mp3`
— not the full-slug path (`p11_ch10_thermal-properties-of-matter/...`)
used for sections 1-11 and assumed (via stale manual curl checks against
that old pattern) for the rest. Checked the new pattern directly:
sections 12, 20, 30, 40, 44, 50, 60, 70, 74 all return 200. **Audio is
now available for effectively the whole chapter** — the "audio gap" was
real on 2026-07-31 (confirmed then with a live Playwright check on the
old pattern) but the backend has since caught up and/or changed its URL
scheme. Re-verifying Sec12-43 now that this is meaningful again; do not
trust the "stalls=N/N, audio gap" notes below without a fresh check —
they reflect state as of 2026-07-31, not now.

## Current
Sec 69 done — Subtopic 6 (Phase Transitions, 62-72) in progress
(8/11). Working through Sec 70-74 (Subtopic 6 remainder + Wrap-Up).
Audio works chapter-wide — normal verify-scene.mjs + spot-eyeball
workflow per section. Spot-eyeballed Sec64/66 with FORCE_SHOTS —
clean, advisory stalls confirmed harmless (final-frame content always
complete).

## Stale pause note (2026-07-31, kept for history only)
Sec 43 is the last VERIFIED-and-committed section (tsc clean, verify
PASS). Sec 44 and Sec 45 are AUTHORED and registered in index.ts but
**NOT YET VERIFIED** — the machine hit severe memory pressure (13.5GB/
14.3GB swap in use, ~850MB free) almost certainly from several
concurrent chapter-authoring sessions each running their own Next dev
server + tsserver (ch9/ch11/ch12 dev servers visible alongside ch10's).
A single `npx tsc --noEmit` ran ~50 minutes and made almost no progress
(CPU-starved/swap-thrashing, not a code bug — confirmed via `ps`/
`vm_stat`/`sysctl vm.swapusage`). User chose to pause chapter work here
rather than keep retrying or skip verification, so other sessions/apps
can be closed to free memory first.

Committing Sec44/45 as WIP (not the normal "Ch10 SecN: ..." pattern) so
the authored work isn't lost per the Ch7 lesson (38 sections nearly lost
by staying uncommitted) — but they are NOT done until re-verified.

**To resume**: 
1. Check machine load is sane again: `uptime` (want load avg well under
   core count) and `sysctl vm.swapusage` (want meaningful free swap).
2. Confirm the ch10 dev server on port 3010 is still up:
   `curl -s -o /dev/null -w '%{http_code}' http://localhost:3010` — if
   `000`, restart it: kill the stale `next dev -p 3010` PID, then
   `cd ~/Desktop/monk-scenes-ch10 && nohup npm run dev -- -p 3010 >
   /tmp/dev-ch10.log 2>&1 & disown`.
3. Run `npx tsc --noEmit` — must be clean.
4. Verify Sec44:
   `PORT=3010 CHAPTER_ID=087ea53b-681c-51a2-92ef-5ea77f6bdf8b node
   verify-scene.mjs 44 '[0,1,2,3,13.58,25.95,38.67]'
   '[0,7.25,18.18,26.88,35.07,36.07,37.07]' ./shots/sec44`
5. Verify Sec45:
   `PORT=3010 CHAPTER_ID=087ea53b-681c-51a2-92ef-5ea77f6bdf8b node
   verify-scene.mjs 45 '[0,1,2,14.12,29.39,38.69,48.25]'
   '[0,3.67,14.59,25.6,39.94,40.94,41.94]' ./shots/sec45`
6. Fix anything flagged, then amend the WIP commit message (or create a
   normal `Ch10 Sec44: ...` / `Ch10 Sec45: ...` follow-up commit) and
   resume the per-section loop at Sec 46.

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
- Sec 42 — Stefan-Boltzmann and Wien — P=eσAT⁴ & P_net=eσA(T⁴−T₀⁴),
  e/σ constants, black-body σT⁴, Wien's λ_mT=b with b's value, boxed
  RED "always absolute kelvin" golden rule. tsc clean, VERDICT PASS,
  stalls=6/6 (audio gap).
- Sec 43 — Kirchhoff, Newton's cooling, and the black body — formal
  Kirchhoff statement, e=α practical reading, Newton's law −dT/dt=k(T−T₀),
  boxed practical average form (T₁−T₂)/t=k(T̄−T₀), black-body α=1 recap.
  tsc clean, VERDICT PASS, stalls=6/6 (audio gap).

## Note (2026-07-31, ~9:35pm): dev server wedge
Port 3010's Next dev server died silently mid-session (port unbound,
curl got connection refused) under heavy system-wide load — NOT caused
by leaked Playwright/chrome-headless-shell processes (checked, none
found; the earlier high process count was the user's normal Chrome/
VSCode/Adobe usage, unrelated). Fix: killed the stale wrapper PID,
relaunched with the same `nohup npm run dev -- -p 3010 > /tmp/dev-ch10.log
2>&1 &` command, confirmed ready via curl. If `verify-scene.mjs` or
`npx tsc` hangs past ~2min again, check `curl -s -o /dev/null -w '%{http_code}'
http://localhost:3010` first — a `000` means the server needs restarting,
not that the scene code is broken.

## RE-VERIFICATION COMPLETE (2026-08-03): Sec12-49 all confirmed PASS with real audio
Re-ran verify-scene.mjs for every section 12-43 (32 sections) now that
audio genuinely works (see UPDATE note above) — ALL PASS with ZERO
overlap/overflow/empty across every one. Sec44-49 (authored during the
pause) also confirmed PASS the same way. Spot-eyeballed Sec18 (5-segment
ice→steam curve) and Sec32 (series/parallel junction derivation) final
frames — both render exactly as designed, no defects. The manual layout-
plan box math used throughout Sec12-49 (while verify-scene.mjs could
only confirm the blank-board-at-t=0 state due to the then-real audio
gap) held up perfectly under full real-audio playback. Chapter quality
bar for sections 1-49 is now genuinely confirmed, not just tsc-clean.
- Sec 50 — Reading temperature through a property — thermometric-property
  intro, mercury-in-glass icon, gas/platinum/thermocouple icon row,
  radiation pyrometer (no-contact), bimetallic strip (geyser), "hotness
  to number" takeaway. Opens Subtopic 5 (Thermometry/Ideal-Gas). VERDICT
  PASS (real audio), eyeballed clean.
- Sec 51 — Calibration and the universal gas thermometer — ice/steam
  fixed points, 100-division Celsius note, mercury-vs-alcohol two-
  thermometer divergence-at-50° visual, dilute-gas universality, ideal-
  gas-standard takeaway. VERDICT PASS (real audio).
- Sec 52 — The three gas laws — three-column icons (Boyle's piston,
  Charles's balloon, Gay-Lussac's sealed gauge-container) each with its
  formula, "different variable fixed" discipline note, road-to-absolute-
  temperature takeaway. VERDICT PASS (real audio), eyeballed clean.
- Sec 53 — Extrapolating to absolute zero and the Kelvin scale — P-vs-T
  graph with real (solid) + extrapolated (muted) segments meeting at a
  red dot at -273.15°C, absolute-zero declaration, Kelvin-scale note,
  boxed PV=nRT with cautions. VERDICT PASS (real audio), eyeballed clean.
- Sec 54 — Thermometric relation, gas thermometer, absolute zero — boxed
  linear relation t=[(X_t-X₀)/(X₁₀₀-X₀)]×100°C, X-definition note,
  T=273.16×(P/P_tr) gas-thermometer formula, single-fixed-point note,
  0K=-273.15°C, extrapolated-limit reminder. VERDICT PASS (real audio).
- Sec 55 — The gas laws combined and the ideal-gas equation — 3-laws
  recap line, boxed P₁V₁/T₁=P₂V₂/T₂ combined identity, PV=nRT=Nk_BT,
  R/k_B constants, expansion-coefficient note, triple-point-of-water
  definition. VERDICT PASS (real audio).
- Sec 56 — Deriving absolute zero from a gas thermometer — full board
  derivation: P(t)=P₀(1+γt), boxed 0=P₀(1+t/273.15)⇒t=-273.15°C (red),
  same-intercept note, origin shift, boxed T=273.16×(P/P_tr) (green).
  Key derivation of the subtopic. VERDICT PASS (real audio), eyeballed.
- Sec 57 — Worked example: reading a gas thermometer — 80mmHg/100mmHg
  setup, P∝T ratio idea, boxed T=273.16×(100/80)=341.45K, Celsius
  conversion, single-fixed-point takeaway. VERDICT PASS (real audio).
- Sec 58 — Worked example: volume doubles at constant pressure — wrong
  "double 27→54°C" reflex (crossed out) vs Kelvin conversion, boxed
  T₂=2×300=600K=327°C, "convert to Kelvin first" rule, doubling-Celsius
  #1-error takeaway. VERDICT PASS (real audio).
- Sec 59 — Worked example: pressure in a sealed rigid vessel — rigid-
  vessel/Gay-Lussac setup, Kelvin conversion (300K/400K), boxed
  P₂=1×400/300≈1.33atm, "100° sounds big but only 33%" insight, reason-
  in-Kelvin takeaway. VERDICT PASS (real audio).
- Sec 60 — Worked example: absolute zero from two readings — P=a+bt
  linear model from 2 pressure readings, a/b computation, boxed
  t₀=-a/b≈-273.2°C, historical-method insight, 1.366=373.15/273.15
  fingerprint. VERDICT PASS (real audio).
- Sec 61 — Pitfalls and pro-tips for thermometry — 5-badge closer
  (Celsius-in-gas-law, absolute-zero-unattainable, 3-laws confusion,
  triple-point-vs-ice-point, thermometer-range) + amber pro-tip box
  (P₁V₁/T₁=P₂V₂/T₂). VERDICT PASS (real audio), eyeballed clean.
  SUBTOPIC 5 COMPLETE (12/12).
- Sec 62 — Three states, three transitions — solid/liquid/gas triangle
  diagram with 3 colored edges (melting/freezing, vaporization/
  condensation, sublimation), fixed-T-for-given-P note, same-Q=mL +
  new-question closer. Opens Subtopic 6 (Phase Transitions). VERDICT
  PASS (real audio), eyeballed clean.
- Sec 63 — Melting and boiling points shift with pressure — most-
  substances-rises vs water-rebel-falls notes, regelation wire-through-
  ice icon, refreeze note, SVP=external-P boiling condition, pressure-
  cooker vs mountain icons. VERDICT PASS (real audio).
- Sec 64 — The phase diagram: triple point and critical point — P-T
  axes with fusion/vaporization/sublimation curves meeting at a red
  triple-point dot (solid/liquid/gas region labels), water's triple-
  point values (273.16K, 611.7 Pa), amber critical-point dot ending
  the vaporization curve (647K, 22.1 MPa), no-liquid-gas-distinction
  closer. VERDICT PASS (real audio, 2 advisory stalls each lang from
  1s-tight beats — expected, non-blocking).
- Sec 65 — Evaporation versus boiling — two-column BOILING (bulk, at
  BP) vs EVAPORATION (surface, any T) comparison, fastest-molecules-
  escape note, sweat/matka cooling chips, desert-cooler note, 4-chip
  row of speed-up factors (T, area, dry air, wind), red caution note
  on impurities shifting transition temps. VERDICT PASS (real audio;
  en beats 1-6 are exactly 1s apart so several advisory stalls are
  expected/non-blocking).
- Sec 66 — The change-of-state facts and constants — formula-card
  recap: Q=mL chip (Lf=80, Lv=540 cal/g), melting-pt-vs-P (water
  decreases, most rise), boiling-pt-vs-P (cooker rises, mountain
  falls), water's triple point (273.16K/611.7Pa) and critical point
  (647K/22.1MPa), sublimation rule (ambient P < triple-point P).
  VERDICT PASS (real audio; hi beats 3-6 are exactly 1s apart so a
  few advisory stalls are expected/non-blocking).
- Sec 67 — Clausius-Clapeyron: the sign that explains everything —
  dP/dT = L/(TΔV) formula chip, "the sign is the whole insight" note,
  paired mini P-T slope diagrams (water ΔV<0/negative-slope in red vs
  normal-substance ΔV>0/positive-slope in green), closing "read the
  sign" note. VERDICT PASS (real audio; en beats 3-6 and hi beats 0-1
  are exactly 1s apart so a few advisory stalls are expected).
- Sec 68 — Worked example: cooker fast, mountain slow — explain-with-
  reason question, SVP=surrounding-P principle, amber cooker box
  (trapped steam → BP>100°C → faster) vs green hill-station box
  (lower P → BP<100°C → slower), controlling-variable note, green
  chain-answer box (higher P → higher BP → faster cooking). VERDICT
  PASS (real audio; en beats 2-6 exactly 1s apart, advisory stalls
  expected).
- Sec 69 — Worked example: the wire that passes through ice — NEET
  hook + setup, "not cut — melted and refroze" trap, ice-block-and-
  wire diagram (P under wire lowers MP → sinks), refreeze-above note
  (releases latent heat), outcome note, REGELATION name badge +
  closing (only because ice's MP falls with P). VERDICT PASS (real
  audio; hi beats 2-6 exactly 1s apart, advisory stalls expected).
