# Chapter 11 — Thermodynamics — Progress

- Branch: `premium-board-ch11` · Worktree: `~/Desktop/monk-scenes-ch11` · Dev port: **3011**
- chapter_id: `58c19132-676f-5dfb-b84e-e3a34b34a48e`
- Lesson JSON: `JSON_LESSONS/Class11_Phy/p11_ch11_thermodynamics_full.json`
- Sections: 61 (Supabase `position` 1–61 = JSON `section_index`)
- Registry const: `CH11` (appended at end of `src/components/scenes/index.ts`)

## Subtopic map
1. 1–8   State / Zeroth Law
2. 9–15  First Law
3. 16–24 Processes
4. 25–32 Specific Heats & Mayer
5. 33–38 Heat Engines / Refrigerators
6. 39–45 Second Law / Reversibility
7. 46–53 Carnot
8. 54–59 Entropy
9. 60–61 Recap

## Data notes
- `board_reveal_at_english`/`_hinglish` arrays fetched once for all 61 sections
  (cached locally during authoring) — beat counts (narration segments ==
  reveal array lengths, both languages) verified to match for all 61 sections
  before starting.
- Many sections have a run of consecutive beats exactly 1.0s apart (an
  alignment-fallback artifact also present in already-shipped chapters, e.g.
  Ch07) — sometimes at the *start* of the reveal array for one language and
  the *end* for the other (the two languages' slow/fast beats don't line up).
  This is expected: `delayFor`'s settle rule means a beat's elements always
  end up fully visible once the beat has passed, regardless of how much real
  time that beat got in a given language — so choreography is authored for
  generous pacing and simply settles faster where a language's beat is short.

## Done
1. State/system/surroundings/wall — molecule box crossed out (macroscopic), 5 state-variable chips → STATE, system-in-surroundings diagram with wall ringed, twin-gas diathermic→adiabatic wall demo, WALL verdict.
2. Thermal equilibrium and the zeroth law — two-friends-settle hook, A/B/C triangle diagram (equilibrium ticks, insulated→removed), zeroth law equation, shared T-tags, same-T≠same-energy guardrail.
3. How the zeroth law creates temperature — 5-link numbered chain (observation→experiment→partition→label→thermometer), thermometer-touch mini demo, empirical-logic verdict.
4. Equation of state and classifications — PV=nRT, 5 variable chips, PV=NkT, constants row, zeroth law recap, intensive/extensive box-cut demo, state-vs-path two columns.
5. Gas-law numerical + equilibrium trap — two side-by-side worked examples (n≈2.0mol plug-in; P~Q~R flask trap, (i)/(ii) correct, (iii) equal-U trap).
6. Two gas samples, fixed conducting partition — L/R box diagram, conservation reasoning, U=3/2nRT derivation, T_f=340K, separate P_L/P_R computed, T-equalises-P-doesn't verdict.
7. Predicting a thermometer before the arithmetic — two-bath diagram, T conversions, "thermometer=system 3 reads same" insight, mass-weighted mean, P_final, qualitative-first verdict.
8. Common pitfalls and pro-tips — 2×2 red pitfall-card grid (equal-T≠U, P/V/T not free, heat not state var, Celsius≠K), two green speed-habit boxes.

**Subtopic 1 (State/Zeroth Law, Sec 1-8) complete.**

9. The two doors: heat, work, and the first law — piston-cylinder diagram, Q from below (stove), W pushing piston, ΔQ=ΔU+ΔW ringed, bank-account analogy, blind-spot teaser.
10. Why internal energy is a state function — bank analogy recap, 3-path i→f diagram (classic path-independence figure), closed-cycle loop, ΔU=0 corollary.
11. Master equation, signs, four shortcuts — ΔQ=ΔU+ΔW both forms, sign-convention chips, W=∫PdV with shaded P-V curve icon, ΔU=nCvΔT, chemistry sign-flip warning, 4-process preview row, dimension check.

## BLOCKED at Section 12 (2026-08-01)
Audio files for Sec 12–61 all 404 on `https://audio.monklearning.com/11/Physics/p11_ch11_thermodynamics/{lang}_sec_{N}.mp3`
(spot-checked 12,13,...,61 — all missing; Sec 1–11 audio all present and working).
`verify-scene.mjs` blocks on `document.querySelector("audio").readyState >= 1` before it will
inspect any frame, so the verdict gate cannot run at all for these sections yet — not a
choreography bug, a missing-asset issue upstream. board_reveal_at_english/hinglish timestamps
ARE already fetched for all 61 sections (cached during this session) and section/beat counts
were confirmed to match narration segment counts for all 61 — that data is fine and ready to
use once audio exists.
Paused authoring past Sec 11 rather than ship un-verified scenes. User is checking on the
audio pipeline. Resume with Sec 12 once `english_sec_12.mp3` (etc.) returns 200.

## Sec 12-24 — AUTHORED BUT UNVERIFIED (audio still missing as of last check)
12. Unit-care numerical + sign trap — two-column (250cal→1045J→+545J; compressed/released signs→+50J).
13. Two-path state-function trick — i/f 2-path diagram, ΔU=80J reused across paths, Q₂=+140J.
14. Latent heat of boiling — liquid→vapour box diagram (huge V jump), Q=4000J, W≈310J, ΔU≈3690J (92%).
15. First Law pitfalls — EXACT reuse of Sec8's 2×2 grid layout, new content.
16. Four ways to move the same gas — the anchor P-V diagram: 4 curves (isochoric/isobaric/isothermal/adiabatic) from one common point.
17. Work = area under P-V curve — shaded single-curve icon, 2nd path (path-dependence), closed-loop icon (cycle work), free-expansion exception.
18. Formula sheet: 4-process table + 3 adiabatic forms + polytropic master + slopes-at-a-point diagram.
19. Board derivation: isothermal work (step-by-step, boxed result W=nRT·ln(Vf/Vi)).
20. Board derivation: adiabatic law (5-step derivation ⇒ PV^γ=const, boxed) + work-comparison mini-diagram.
21. Isothermal triple + adiabatic squeeze — two-column worked examples (mirrors Sec5/12 layout).
22. Isobaric diatomic gas — GIVEN + 3-stamp row (W/ΔU/Q) + first-law verify + Cp:Cv ratio.
23. Isothermal vs adiabatic work — single-column math derivation, ratio≈1.25, ranking verdict.
24. Processes pitfalls — EXACT reuse of Sec8/15's 2×2 grid layout, new content.

**All of Sec 12-24 (First Law tail + all of Processes subtopic) typecheck clean** (`npx tsc --noEmit`
passes with 0 errors as of each incremental addition) but have **NOT** been run through
`verify-scene.mjs` — audio still 404 for sec 12+ as of last check. Geometry was designed
conservatively, reusing patterns from already-PASS-verified sections (Sec1-11) wherever
possible (esp. Sec8's 2×2 pitfall grid, reused verbatim in Sec15 and Sec24; Sec5/12's
two-column worked-example divider layout, reused in Sec21). **MUST re-run verify-scene.mjs
on every one of Sec 12-24 once audio exists, and fix any reported overlap/overflow before
considering them done.**

Node note: `npx tsc --noEmit` intermittently takes 1-3+ minutes (sometimes appearing to hang
with near-zero CPU usage for 5-10+ min) under load from the other parallel chapter worktrees'
dev servers/tsc runs — this resolved on its own each time without needing the node_modules.nosync
symlink workaround; deleting a stale `tsconfig.tsbuildinfo` did not change the pattern either.
Just re-run and wait it out (use a background+monitor pattern, don't block synchronously).

## Sec 25-32 — AUTHORED BUT UNVERIFIED (Subtopic 4: Specific Heats & Mayer, complete)
25. Heat capacity, why a gas needs two — twin cylinders (sealed rigid vs free piston), leaky-bucket analogy (Cv=plugged, Cp=leaky).
26. Degrees of freedom and equipartition — dot (monoatomic, 3 DOF) vs dumbbell (diatomic, +2 rotation=5 DOF) icons, Cv=(f/2)R.
27. Formula sheet: Q=msΔT/nCΔT, Mayer boxed, Cv/Cp/γ from f, reflex identities, polytropic C, benchmarks.
28. Board derivation: Mayer's relation — const-V vs const-P heating compared, Cp−Cv=R (boxed).
29. Identify the gas (Cv=20.8⇒diatomic,γ=1.40) + work-fraction trap (monoatomic wins, 40%) — two-column.
30. Constant V vs constant P — Q_V/Q_P stamps, difference=nRΔT≈work, ties back to Mayer's R.
31. Gamma of a gas mixture — mole-weighted Cv/Cp, γ_mix=19/13≈1.46, general recipe.
32. Specific-heats pitfalls — EXACT reuse of Sec8/15/24's 2×2 grid layout, new content.

**All of Sec 12-32 typecheck clean, still unverified** (audio 404 through sec 32 as of
last check). Same reuse-proven-patterns discipline as Sec 12-24 applied throughout:
Sec29 mirrors Sec5/12/21's two-column divider; Sec32 is an exact copy of Sec8/15/24's grid.

## Current
Authoring paused at end of Subtopic 4 (Specific Heats & Mayer, Sec 25-32) pending audio.
Sec 1-11 fully verified (VERDICT PASS). Sec 12-32 drafted, typecheck-clean, unverified.
Next: Sec 33 (Subtopic 5: Heat Engines/Refrigerators) once resumed, OR re-verify Sec 12-32
first if audio becomes available before more sections are drafted.
