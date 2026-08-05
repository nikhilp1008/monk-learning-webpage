# Chem6 Progress — Class 11 Chemistry, Chapter 6 "Equilibrium"

- Branch: `premium-board-chem6`
- Dev port: `3025`
- chapter_id: `f111ba16-c07d-5237-b2dd-eab22645f161`
- Naming: files `C11Ch06SecM.tsx`, component `C11Ch06SecM`, registered at END of
  `src/components/scenes/index.ts` as `` REGISTRY[`${C11CH06}:M`] = C11Ch06SecM ``
- Spec: `src/components/scenes/SCENE_AUTHORING_CHEMISTRY.md` (chemistry layer) +
  `SCENE_AUTHORING.md` (base contract) + `chem-kit.tsx` / `kit.tsx` (primitives)
- Data: cached locally at
  `/private/tmp/claude-501/-Users-nikhi-Downloads-monk-scenes-chem6/c7cb3573-7518-4908-bca9-28859a564137/scratchpad/chem6_sections.json`
  (all 72 rows, fetched from Supabase `lesson_sections`)

## Subtopic map
- 1–14  Physical & Chemical Equilibrium / Kc–Kp
- 15–25 Equilibrium Constant / Q / Gibbs
- 26–39 Le Chatelier & Factors
- 40–55 Ionic Equilibrium / Acid–Base / pH / Common-Ion
- 56–70 Buffers / Ksp / Salt Hydrolysis
- 71–72 Recap

## Workflow per section
1. Read cached JSON row (narration `segments_english/hinglish`, both
   `board_reveal_at_*` arrays, title, subtopic).
2. Author `src/components/scenes/C11Ch06SecM.tsx` — layout-plan header comment
   first, chem-kit primitives, both languages, blank board at t=0, title always-on.
3. Register in `index.ts` (this chapter's own import + REGISTRY line).
4. `npx tsc --noEmit`.
5. `PORT=3025 CHAPTER_ID=f111ba16-c07d-5237-b2dd-eab22645f161 node verify-scene.mjs
   <sec> '<reveals_en>' '<reveals_hi>' ./shots/sec<N>` — fix until `VERDICT: PASS`.
6. Commit. Push every ~5 sections.

## Done
1. Dynamic equilibrium: still outside, busy inside — Rajdhani coach metaphor + rate-vs-time graph. PASS.
2. Physical equilibria all around us — bottle/ice/sugar/Thums-Up four-panel board. PASS.
3. Reversible reactions reach one destination — H2+I2⇌2HI vessel + converging-curve graph. PASS.
4. The conditions equilibrium needs — numbered checklist + activities caveat. PASS.
5. Heterogeneous equilibria: the pure-phase rule — lump demo + crossed-out Kc fraction. PASS.
6. Sizing up a reaction: K for extent, Q for direction — number-line + Q vs K rows. PASS.
7. Law of mass action: writing Kc and Kp — fractions with tspan exponents. PASS.
8. The Kp–Kc bridge, and the units of K — derivation + unit chips. PASS.
9. The four-rule toolkit for combining equilibria — reference cards. PASS.
10. Worked example — Kc from an equilibrium mixture (CBSE) — full worked example. PASS.
11. Worked example — the Δn = 0 shortcut (NEET speed trap) — crossed-out panic path. PASS.
12. Worked example — PCl5 dissociation, Kp in α and P (JEE Main) — built ICE table. PASS.
13. Worked example — stacking equilibria with the toolkit (JEE Advanced). PASS.
14. Pitfalls and pro-tips for Kc and Kp — closes subtopic 1. PASS.

**Subtopic 1 (Sec 1-14, Physical & Chemical Equilibrium / Kc-Kp) — COMPLETE.**

15. Why equilibrium stops where it does: the Gibbs valley — ball rolls downhill. PASS.
16. ΔG versus ΔG°: the slope now vs the fixed landscape — two-column comparison. PASS.
17. One story in two languages: Q-vs-K and the sign of ΔG — derivation. PASS.
18. Conditions behind ΔG° = −RT ln K — numbered checklist. PASS.
19. From ΔG=ΔG°+RTlnQ to ΔG°=−RTlnK — master derivation, sign map. PASS.

20. Temperature dependence: van't Hoff and the ΔH°, ΔS° split — derivation. PASS.
21. Worked example — from ΔG° to K (CBSE). PASS.
22. Worked example — ranking K by the sign of ΔG° (NEET). PASS.
23. Worked example — from K to ΔG° (JEE Main). PASS.
24. Worked example — van't Hoff, finding ΔH° (JEE Advanced). PASS.
25. Pitfalls and pro-tips for Gibbs energy and K — closes subtopic 2. PASS.

**Subtopic 2 (Sec 15-25, Equilibrium Constant/Q/Gibbs Energy) — COMPLETE.**

26. Le Chatelier: the system fights the change — vegetable mandi metaphor. PASS.
27. The five levers, and the only one that changes K — lever roadmap. PASS.
28. Concentration: consume, replenish, drive to completion. PASS.

29. Pressure and volume: the side with fewer gas moles wins — compression demo. PASS.
30. The inert-gas trap: constant volume vs constant pressure — the chapter's key trap. PASS.
31. Temperature: treat heat as a participant — heat in the equation. PASS.
32. Catalyst: speed, not yield — energy-profile diagram. PASS.

## Current
Sec 33 — next up (subtopic 3: Le Chatelier's Principle & Factors, Sec 26-39, 14 sections)
