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

## Current
Sec 11 — next up
