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

- Sec 15 — derivation E=½kA² (K=cos² U=sin² formulas, complementary hump waves+flat E, Pythagorean identity, hero)

- Sec 16 — derivation double-frequency (power-reduction, K/U=E/2±E/2cos2ωt, x(t) 1-cycle vs K(t) 2-cycle diagram)

- Sec 17 — worked example CBSE (m=0.5kg,k=200N/m,A=4cm; E=0.16J, Kmax=Umax=E, vmax=0.8m/s)

- Sec 18 — worked example NEET K=U (A/2 trap crossed out, K/U crossing diagram at x=A/√2 height E/2, cousins)

- Sec 19 — worked example JEE Main (m=0.1kg,A=10cm,ω=10; E=0.05J, U=0.018J, K=0.032J, ratio cross-check)

- Sec 20 — worked example JEE Advanced (⟨K⟩_t=E/2 vs ⟨K⟩_x=2E/3, K(x) parabola w/ 2 reference levels)

- Sec 21 — pitfalls & pro-tips (4 red traps, 1 green pro-tip, "Lock in: K=U at A/√2, E∝A²" memory-hook stamp)

- Sec 22 — two workhorses (pendulum+spring side-by-side, mgsinθ, T=2π√(L/g), isochronism/Galileo)

- Sec 23 — why mass cancels for pendulum but not spring (Moon comparison, T=2π√(m/k), small-angle caution)

- Sec 24 — formula board pt1 (pendulum/spring/shortcut formulas, series vs parallel spring diagram, cut-n-pieces hero)

- Sec 25 — formula board pt2 (g_eff lift up/down/car, physical pendulum, torsional pendulum, free-fall limit)

- Sec 26 — derivation pendulum T (gravity vector triangle: mg, mgcosθ, mgsinθ; small-angle; ω²=g/L; mass cancels)

- Sec 27 — derivation vertical spring (natural length/x₀/y diagram, Fnet=-ky, T=2π√(m/k) vertical=horizontal)

- Sec 28 — derivation series/parallel k (parallel=same x icon, series=same F icon, keff formulas, resistor-opposite warning)

- Sec 29 — worked example CBSE seconds pendulum (L=1m,g=π²⇒T=2s; L→4L⇒T'=4s; T∝√L)

- Sec 30 — worked example NEET descending lift (g_eff decreases trap, g_eff=g/4, T'=4s, free-fall sanity check)

- Sec 31 — worked example JEE Main (m=2kg,k1=6,k2=3; Tseries=2π≈6.28s, Tparallel≈2.96s, never-average note)

- Sec 32 — worked example JEE Advanced (rod pendulum, I=ML²/3, d=L/2, T=2π√(2L/3g), Leq=2L/3<L)

- Sec 33 — pitfalls & pro-tips (5 red traps, 1 green pro-tip, "pendulum feels g_eff; spring feels only k" stamp)

- Sec 34 — three storylines (tabla/jhula examples, free/damped/forced 3-row wave diagram w/ envelope+transient)

- Sec 35 — resonance & damping force (F=-bv, growing-swing diagram w/ 3 amplitudes+push arrow, RESONANCE hero, infinite-amplitude caveat)

- Sec 36 — formula board damped motion (x(t)/ω'/A(t)/E(t), 3-regime return-to-eq diagram, bc=2√(mk))

## Current
Subtopic 4 (Damped & Forced Oscillations) in progress. Next: Sec 37.

## Fixed bug (2026-08-03)
Found & fixed a systematic geometry bug: filled-circle Draw paths of the form
`M {x} {y} A {r} {r} 0 1 1 {x-0.1} {y}` render with the START point as the
circle's TOP (extending downward by 2r), not the bottom as I'd assumed. Any
such path must use `y = cy - r`, not `cy + r`. Fixed in Sec1 (bob), Sec2
(photo circle), Sec22 (bob), Sec23 (bob) — Sec1:114 (clock), Sec8:77
(stopwatch), Sec10:81 (reference circle) already happened to use the correct
convention. Re-verified all four fixes mechanically + visually; all clean.

## Workflow notes
- Reveal data cached: scratchpad/ch13_reveals.json (Supabase REST, cols `board_reveal_at_english/_hinglish`, all 58 rows fetched at once).
- Section dump helper: scratchpad/dump_sec.py (`python3 scratchpad/dump_sec.py <N>` → title/subtopic/board_events/narration EN+HI).
- Registration: single Ch13 block appended at END of src/components/scenes/index.ts.
- Verify: `PORT=3013 CHAPTER_ID=c1bc937e-5ff5-5ecb-a67b-89053c386c23 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — VERDICT line must read PASS.
- Hinglish board text written in Latin script (house style), even though JSON narration is Devanagari.
- Combining vector arrow U+20D7 renders as tofu — write vectors as plain letters w/ tspan subscripts. Subscript digits, ᵢ, Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺ are fine.
- Palette: INK #1C1A16, AMBER #EEA31F, AMBER_DARK #9A6A12, GREEN #1C9B57, RED #DD4433, CREAM #FCF4E0, MUTED #9C988C.
