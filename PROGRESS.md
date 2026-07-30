# Ch04 · Laws of Motion — scene progress

Branch: premium-board-ch4 · port 3004 · chapter_id 50ae6550-951b-599c-b352-1d6e5f84bc3b
Total sections: 92 (8 subtopics × ~11–12 + recap 91–92).
Data: narration JSON_LESSONS/Class11_Phy/p11_ch04_laws-of-motion_full.json; reveals cached at
scratchpad/ch4_reveals.json (refetch from Supabase lesson_sections if session restarts —
see secdata.py pattern: dump narration+reveals per section).

Verify per section:
`PORT=3004 CHAPTER_ID=50ae6550-951b-599c-b352-1d6e5f84bc3b node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<M>`
All audit lines must be []. Register scenes ONLY in the delimited Ch04 block at END of index.ts.
Gotcha: never put U+2044 '⁄' between digits (auto-fraction glyphs) — use '÷' or spaces.
Gotcha: if a final shot shows the KaTeX fallback board instead of the scene, the dev
server served a stale bundle — restart it (kill port 3004, npm run dev -- -p 3004) and re-verify.

## Subtopics
1. Newton's Laws and Impulse — secs 1–12
2. Momentum Conservation — secs 13–23
3. Concurrent Forces and Equilibrium — secs 24–35
4. Friction — secs 36–46
5. Circular Motion Dynamics (Banking) — secs 47–58
6. Common Forces in Mechanics and FBDs — secs 59–69
7. Connected Bodies, Pulleys and Constraints — secs 70–79
8. Vertical Circular Motion — secs 80–90
9. Recap + cheat sheet — secs 91–92

## Done
- [x] Sec 1 — Inertia: Mumbai local jerk demo (8 beats, verified both langs, audits clean)
- [x] Sec 2 — Momentum p=mv, truck vs bike, F=dp/dt, impulse intro
- [x] Sec 3 — Third Law: bat-ball pair, never cancels, F=ma limits
- [x] Sec 4 — Derivation ladder: F=dp/dt → assume m const → F=ma
- [x] Sec 5 — Impulse-momentum theorem, F-t area graph, same-area curves
- [x] Sec 6 — Momentum conservation from Third Law, isolated A/B system
- [x] Sec 7 — Formula set: four bands + N·s ≡ kg·m/s free-mark note
- [x] Sec 8 — WE1 cricket ball: sign convention, J=11.2 N·s, F=1120 N, 1.6 trap
- [x] Sec 9 — WE2 rifle recoil: before/after, conservation reflex, v=2 m/s
- [x] Sec 10 — WE3 floor bounce: heights→speeds, J = 8 N·s upward
- [x] Sec 11 — WE4 sand on belt: variable mass, 6 N / 6 W / 12 W, half to heat
- [x] Sec 12 — Tips: 4 pitfall rows + units sanity check. SUBTOPIC 1 DONE (12/92)
- [x] Sec 13 — Diwali rocket: before/after p=0, principle box, everyday chips
- [x] Sec 14 — Three families cards + elastic/inelastic spectrum lines
- [x] Sec 15 — 'No doors': sealed room, component-wise parabola, instant-only
- [x] Sec 16 — 1-D elastic derivation: divide trick, approach=separation, swap
- [x] Sec 17 — Rocket thrust: bookkeeping figure, thrust box, rocket equation
- [x] Sec 18 — Formula set: 5 bands (master, recoil, collisions, e, cm/thrust)
- [x] Sec 19 — WE1 coupling wagons: classification sentence, v=0.8, KE check
- [x] Sec 20 — WE2 carrom striker: exchange shortcut, 3 elastic special cases
- [x] Sec 21 — WE3 bullet-block-spring: two stages, v=1, x=5cm, slogan chip
- [x] Sec 22 — WE4 2D shell: per-axis accounts, 5√13, CM sails on
- [x] Sec 23 — Tips: 4 pitfalls, e=√(h/h), v_cm error-checker. SUBTOPIC 2 DONE (23/92)
- [x] Sec 24 — Equilibrium intro: signboard, ΣF=0, triangle law, torque caution
- [x] Sec 25 — Resolution: F cos/sin panels, tilted axes pro-tip, equilibrant
- [x] Sec 26 — Lami's theorem: P/Q/R figure, opposite-angle rule, fine print
- [x] Sec 27 — Lifts + pseudo-force: 4 panels, R=m(g±a), tilted bob, discipline
- [x] Sec 28 — Lami derivation: star→closed triangle, 180°−α flip, sine rule
- [x] Sec 29 — Smooth incline: tilted axes, T=mg sinθ, N=mg cosθ, sanity checks
- [x] Sec 30 — Formula set: 5 bands incl. horizontal-string switch, pseudo set
- [x] Sec 31 — WE1 lamp on two ropes: FBD, 2T sin30=W, T=100 N surprise
- [x] Sec 32 — WE2 five and twelve: Pythagoras 13 N, equilibrant opposite, triples
- [x] Sec 33 — WE3 horizontal string: N from vertical, N=57.7, T=28.9, pair banked
- [x] Sec 34 — WE4 bob in truck: both frames agree, T=25, a=7.5, g_eff route
- [x] Sec 35 — Tips: 4 pitfall rows, smart axes, Lami reflex, memory aids. SUBTOPIC 3 DONE (35/92)
- [x] Sec 36 — Friction graph: almirah, self-adjusting static, ceiling, kinetic drop
- [x] Sec 37 — Why friction exists: zoom panel welds, mu=f/N, empirical honesty
- [x] Sec 38 — Two angles: tan λ=μ, tan θr=μs, θr=λ, sand cone
- [x] Sec 39 — Repose derivation: verge, mg cancels, mass-independent

## Current
Subtopic 4 (Friction, secs 36-46). Next: Sec 40.
