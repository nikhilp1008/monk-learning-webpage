# Ch09 — Mechanical Properties of Fluids — scene progress

Worktree: branch `premium-board-ch9` · port 3009 only · chapter_id `33795397-f8fe-5ef6-ba2d-64549905ecd3`.
86 sections total (Supabase positions 1–86 match JSON `section_index` — confirmed 1:1 by title, and
`board_reveal_at_english`/`_hinglish` arrays confirmed equal length for all 86 rows).

## Subtopics
1. Fluid Pressure and Pascal's Law — secs 1–11
2. Buoyancy and Floatation — secs 12–22
3. Fluids in Accelerated and Rotating Frames — secs 23–34
4. Fluid Dynamics and Bernoulli's Theorem — secs 35–47
5. Viscosity and Terminal Velocity — secs 48–57
6. Poiseuille's Law and Viscous Flow Resistance — secs 58–68
7. Surface Tension and Capillarity — secs 69–84
8. Mechanical Properties of Fluids: Recap — secs 85–86

## Done
Subtopic 1 (Fluid Pressure and Pascal's Law), Sec 1–11 — ALL PASS both languages, committed:
- Sec 1 — "Pressure: the all-directions squeeze": packed-train hook (dims) → tank+droplet demo with 4-arrow normal-push diagram → flat-surface mini-diagram (perpendicular survives, sideways crossed out) → formula P=F⊥/A (tank dims) → vector-vs-scalar note → closing insight. Eyeballed clean.
- Sec 2 — "Why pressure deepens with depth": tank + 3 depth-arrows growing → P=P0+ρgh, graph.
- Sec 3 — "The hydrostatic paradox": three vessels (narrow/wide/funnel), same water level, equal base-pressure arrows, cream volume fills. Eyeballed clean.
- Sec 4 — "Pascal's law and the hydraulic lift": sealed vessel, transmitted-pressure arrows, second piston appears, F2=F1(A2/A1).
- Sec 5 — "Deriving the depth law from a force balance": free-body diagram (P1A/P2A/weight) → P=P0+ρgh derivation. Eyeballed clean.
- Sec 6 — "Your pressure toolkit": 7-row colour-coded formula recap list. Eyeballed clean.
- Sec 7 — "Overhead tank worked example": tank+h-bracket, gauge→absolute→force calc. Eyeballed clean.
- Sec 8 — "Scuba depth for two atmospheres": depth-scale water column + diver marker, h=Pg/ρg≈19.4m.
- Sec 9 — "The hydraulic car lift": to-scale piston circles, F2=mg→area ratio→F1→h1, energy check.
- Sec 10 — "Mercury U-tube: the factor of two": U-tube diagram, water column, mercury drop/rise, 2x bracket, derivation to x=0.5cm. Eyeballed clean.
- Sec 11 — "Pitfalls and pro-tips": 6-row red/amber tips list.

## Current
Starting Sec 12 — subtopic 2, Buoyancy and Floatation

## Working notes
- Reveal arrays cached from Supabase REST at session start to scratchpad
  `ch9_reveals.json` (position, title, board_reveal_at_english/hinglish) — re-derivable via
  `lesson_sections?chapter_id=eq.33795397-f8fe-5ef6-ba2d-64549905ecd3&select=position,title,board_reveal_at_english,board_reveal_at_hinglish&order=position`.
- Narration + board_events per section: `JSON_LESSONS/Class11_Phy/p11_ch09_mechanical-properties-of-fluids_full.json`.
- Registration: ONE delimited Ch09 block appended at END of `src/components/scenes/index.ts`.
- Verify: `PORT=3009 CHAPTER_ID=33795397-f8fe-5ef6-ba2d-64549905ecd3 node verify-scene.mjs <sec> '<reveals_en>' '<reveals_hi>' ./shots/sec<N>` — done only on final `VERDICT sec=N: PASS`.
- Model: Sonnet, tiered by section type per kickoff (concept/example/pitfall/recap on Sonnet; multi-part
  derivations with real geometry get extra care).
