# Ch08 — Mechanical Properties of Solids — scene progress

Worktree: branch `premium-board-ch8` · port 3008 only · chapter_id `39bfe6d1-bd93-5157-a29c-b8ee68c3676b`.
64 sections total (Supabase positions 1–64 match JSON section_index).

## Subtopics
1. Elasticity, Stress and Strain — secs 1–14
2. Elastic Moduli — secs 15–26
3. Poisson's Ratio and Elastic Energy — secs 27–38
4. Ductility, Malleability and Yielding — secs 39–50
5. Applications of Elastic Behaviour — secs 51–62
6. Chapter 8 Review — secs 63–64

## Done
- Sec 1 — elasticity intro (spring "springs back" vs clay "stays bent", steel-vs-rubber same-load demo, TRAP note)
- Sec 2 — atoms as tiny springs (lattice mesh + zigzag bonds, pull/push-back demo, F_net=0 ring)
- Sec 3 — stress = F/A (rod under tension, cable-vs-wire, boxed hero formula, 3 stress-type icons, SI unit)
- Sec 4 — strain = ΔL/L (10m vs 10cm wire same-stretch trap, boxed hero formula, 3 strain-type icons, dimensionless note)
- Sec 5 — Hooke's law (stress-strain graph built beat-by-beat: line, slope=E, elastic limit, bend + fracture)
- Sec 6 — deriving Young's modulus [Opus tier, derivation] (hanging wire diagram: L, r, ΔL, M, F=Mg → Y=MgL/(πr²ΔL))
- Sec 7 — elongation under self-weight [Opus tier, integral] (tapering tension triangle, dx slice, ∫→ΔL=MgL/2AY, L/2 average-tension)
- Sec 8 — reading the stress-strain curve (P/E/Yield/Ultimate/Fracture landmarks, elastic/plastic bands, ductile-vs-brittle, area=energy/vol)
- Sec 9 — four elastic constants toolkit (2x2 card grid: Y, B+k, η, ν with one-line "answers what question" tags)
- Sec 10 — CBSE worked example: steel wire Y (GIVEN box + 3-step cascade → boxed hero Y=2.0e11 Pa)
- Sec 11 — NEET trap: two wires A/B (thin vs thick+long, ΔL∝L/r² → ratio=2, same material=equally elastic sting)
- Sec 12 — JEE Main series composite (steel+copper joined, same F, ΔL_s+ΔL_c=1.0mm total, coincidence note)
- Sec 13 — JEE Advanced spinning rod [Opus tier, integral] (top-view T(x) centripetal, tension parabola, ΔL=Mω²L²/3AY, 1/2-vs-1/3 callback to Sec7)
- Sec 14 — subtopic 1 wrap-up: 4 pitfall cards (radius/diameter, stretch≠elastic, strain units, the ½) + same-material pro-tip

## SUBTOPIC 1 COMPLETE (secs 1-14/14)

- Sec 15 — a loaded wire is a spring (Y=FL/AΔL rearranged, wire≡spring diagram, k=YA/L, short&fat=stiff)
- Sec 16 — series vs parallel wires (two-panel diagram, 1/k=1/k1+1/k2, k=k1+k2, bullock-cart ropes analogy)
- Sec 17 — equivalent modulus of series rods (two rods→one, Yeq=2Y1Y2/(Y1+Y2), not-the-mean trap)
- Sec 18 — gas bulk modulus (slow B=P vs sudden B=γP piston cylinders, sound-speed payoff)
- Sec 19 — four constants are really two (Y/B/η/ν network-square diagram, Y=2η(1+ν)=3B(1-2ν), 9/Y=1/B+3/η)

## Gotcha found & fixed (2026-07-31)
`Draw`'s `fill` prop paints immediately regardless of its own `on` — only the
stroke reveal is dashoffset-animated. Any physical-object shape drawn with a
solid fill (rod/wire/blob/cylinder/node-circle) via bare `<Draw fill={...}/>`
was therefore visible at t=0 before play, violating the blank-board contract.
Fixed across Sec1-4,6,8,12-13,16-19 by wrapping each in `<Fade on={beat>=k}
delay={0}>...</Fade>`. **Going forward: never pass a non-"none" `fill` to
`Draw` without wrapping it in a `Fade` with the same `on` condition** — or
just use `fill="none"` (outline only) when a solid fill isn't essential.

## Current
Starting Sec 20
