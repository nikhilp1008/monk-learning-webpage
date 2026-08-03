# Ch13 — Oscillations — scene progress

Worktree: branch `premium-board-ch13` · port 3013 only · chapter_id `c1bc937e-5ff5-5ecb-a67b-89053c386c23`.
58 sections total (Supabase positions 1–58 match JSON section_index; beat counts match across languages for all 58 — verified).

## Subtopics
1. SHM Concepts and Kinematics — secs 1–11
2. SHM Energy — secs 12–21
3. Pendulums and Mass-Spring Systems — secs 22–33
4. Damped and Forced Oscillations — secs 34–44
5. Reference Circle, Superposition and More SHM Systems — secs 45–56
6. Chapter Review — secs 57–58

## Done
- Sec 1 — what makes motion SHM (jhula, periodic vs oscillation, -A/O/+A line, F=-kx, fastest/frozen, verdict)
- Sec 2 — the ID card of SHM (F=-kx→F=ma, ID card a=-ω²x, a-x graph, pitfalls: Hooke/small-angle, damping/frequency)

- Sec 3 — kinematics toolkit (x(t)/v(t)/a(t)/ω bridge, vmax/amax hero box, phase-diagram waves, 2 shortcuts)

- Sec 4 — derivation v,a from x(t) (differentiate twice, x/v phase waves, consistency check, verdict)

- Sec 5 — derivation v(x) ellipse (divide by A/Aω, sin²+cos²=1, v=±ω√(A²-x²), v-x ellipse w/ 4 landmarks, ± note)

- Sec 6 — derivation ω from force law (spring-block, ma=-kx, ω=√(k/m), intuition, 3-step recipe, closing verdict)

- Sec 7 — worked example CBSE (given x=0.05sin(20πt), A/T graph, read off A/ω/φ, T/f/vmax/amax, method verdict)

- Sec 8 — worked example NEET ratio shortcut (stopwatch, crossed-out trap, ω=amax/vmax, T, A=4cm, lock-in)

- Sec 9 — worked example JEE Main two speeds (v-x curve w/ 2 points, square+subtract, ω=4, A=5cm T=π/2s)

- Sec 10 — worked example JEE Advanced (reference circle, rotating radius+shadow, 2 green safe-arcs, Δθ=2π/3, fraction=1/3) — 9 beats (this section has 9 board_events, not 8)

- Sec 11 — pitfalls & pro-tips (4 red traps, 2 green pro-tips, "MAX at MEAN" memory-hook stamp)

- Sec 12 — energy changes costume (marble-in-bowl, K/U labels, E=K+U=½kA², endpoints, savings analogy)

- Sec 13 — two consequences (K/U/E vs x graph, E∝A², double-frequency blink, caveat, U-reference convention)

- Sec 14 — energy formulas toolkit (K/U/E formulas, 4-bar K/U split chart, ratios, K=U at A/√2, 2f note)

## Current
Subtopic 2 (SHM Energy) in progress. Next: Sec 15.

## Workflow notes
- Reveal data cached: scratchpad/ch13_reveals.json (Supabase REST, cols `board_reveal_at_english/_hinglish`, all 58 rows fetched at once).
- Section dump helper: scratchpad/dump_sec.py (`python3 scratchpad/dump_sec.py <N>` → title/subtopic/board_events/narration EN+HI).
- Registration: single Ch13 block appended at END of src/components/scenes/index.ts.
- Verify: `PORT=3013 CHAPTER_ID=c1bc937e-5ff5-5ecb-a67b-89053c386c23 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — VERDICT line must read PASS.
- Hinglish board text written in Latin script (house style), even though JSON narration is Devanagari.
- Combining vector arrow U+20D7 renders as tofu — write vectors as plain letters w/ tspan subscripts. Subscript digits, ᵢ, Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺ are fine.
- Palette: INK #1C1A16, AMBER #EEA31F, AMBER_DARK #9A6A12, GREEN #1C9B57, RED #DD4433, CREAM #FCF4E0, MUTED #9C988C.
