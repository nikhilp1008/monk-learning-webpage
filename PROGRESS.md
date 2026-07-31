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

- Sec 20 — which modulus? decision guide (4 icons: length→Y, shape→η, volume→B, fluid→B only, gas caveat)

- Sec 21 — elastic-moduli toolkit recap (two-column formula list: k=YA/L, series/parallel, Yeq, compressibility, gas B, 4-constant relations)

- Sec 22 — CBSE worked example: copper cube (squeezed-cube icon, ΔV=-ΔP·V/B → -0.50 cm³, incompressible note)

- Sec 23 — NEET trap: gas bulk modulus (no fixed B, slow=isothermal B=P vs sudden=adiabatic B=γP, exam radar)

- Sec 24 — JEE Main series wires + energy (thin R / thick 2R wire, ΔL_total=0.80mm, thin wire stores 4x energy, weakest-link note)

- Sec 25 — JEE Advanced verification (Y,ν→B=8.0e10,η=4.8e10 Pa; verify 9/Y=1/B+3/η, two routes match ✓)

- Sec 26 — subtopic 2 wrap-up: 4 pitfall cards (avg series Y, gas B, 2-of-4, k≠Y) + spring-picture pro-tip

## SUBTOPIC 2 COMPLETE (secs 15-26/12)

- Sec 27 — Poisson's ratio intro (dashed-original vs stretched/necked rod, ν=-(Δr/r)/(ΔL/L), rubber/cork/metals values)

- Sec 28 — why ν≤0.5 (number line ν=0..0.5, ΔV/V=(1-2ν)(ΔL/L), forbidden zone extension + ✗ past 0.5)

- Sec 29 — deriving the volume relation [Opus tier, log-diff] (cylinder V=πr²L, ln-differentiation, Poisson sub → ΔV/V=(1-2ν)(ΔL/L), callback to Sec28)

- Sec 30 — elastic energy intro (F-vs-extension triangle graph, shaded area, U=½FΔL, "force not constant" note)

- Sec 31 — deriving elastic energy [Opus tier, integral] (stress-strain triangle, W=∫F(l)dl proves U=½FΔL, energy density u=½σε=½Yε²=σ²/2Y)

- Sec 32 — reading energy off the curve (shaded area under σ-ε curve = density not total, F-ext vs σ-ε distinction, resilience/toughness preview)

- Sec 33 — Poisson+energy toolkit recap (two-column formula list: ν, ΔV/V, U 3-forms, u, loading contrast)

- Sec 34 — CBSE worked example: steel wire energy (F=100N, U=0.05J, u=2.5e4 J/m³, cross-check via ½σε ✓)

- Sec 35 — NEET trap: area is density (U=u×V=0.4J, 8e4 J option is the trap, unit J/m³ tell)

- Sec 36 — JEE Main chained example (rod under σ, ε=σ/Y, lateral strain=-νε, ΔV/V=4.0e-4, volume grows note)

- Sec 37 — sudden loading, factor of two (wire+block diagram, energy balance mgx=½(YA/L)x² → x_max=2x_static=0.40mm)

- Sec 38 — subtopic 3 wrap-up: 4 pitfall cards (½, area=density, ν=0.5, ν≤0.5) + sudden-loading pro-tip (x_max=2x_static)

## SUBTOPIC 3 COMPLETE (secs 27-38/12)

- Sec 39 — subtopic 4 kickoff: past yield (elastic/plastic bands, unload point, dashed return line ∥ elastic, permanent-set bracket)

- Sec 40 — three material families (ductile plateau, brittle snap, elastomer curve overlaid; tension=ductile/wires vs compression=malleable/sheets)

- Sec 41 — rubber hysteresis (loading/unloading loop shaded, steel-wins-by-modulus, loop=heat, tyres/shock-absorbers application)

- Sec 42 — what shifts behaviour (heat/sudden-load/many-cycles icons, fatigue note, aircraft/railway retirement schedules)

- Sec 43 — journey along the curve (P/E, yield, plastic/permanent-set, ultimate+necking, fracture=breaking stress)

- Sec 44 — resilience vs toughness (nested green wedge=resilience inside amber wash=toughness, springs vs crash barriers)

- Sec 45 — the anchoring quantities (yield strength σy, u_resilience=½σyεy=σy²/2Y boxed hero, toughness=total area, ductility-graphical, permanent set)

- Sec 46 — CBSE worked example: modulus of resilience (σy=3.0e8, Y=2.0e11 Pa → boxed hero u=2.25e5 J/m³, safe elastic budget note, size-independent note)

- Sec 47 — NEET trap: stiffness vs ductility (P=steep/snaps-early vs Q=gentler/long-reach curves, slope→Y vs reach→ductility, eliminate-bundling rule, independent properties)

- Sec 48 — JEE Main worked example: lift cable diameter (ceiling+cable+2000kg load diagram, F=mg=2.0e4N, σ_work=σy/5=5.0e7Pa, A=4.0e-4m², boxed hero d≈2.3cm, safety-factor note)

- Sec 49 — JEE Advanced: strong/stiff/tough are independent (A=steep/high/brittle vs B=gentler/long-plateau curves, slope→Y, height→strength, reach→ductility, area→toughness, glass-vs-steel takeaway)

- Sec 50 — subtopic 4 wrap-up: 4 pitfall cards (ductility≠malleability≠elasticity, rubber>steel loose talk, slope=Y/areas=energies, yielding≠breaking) + read-in-order pro-tip (slope→stiff, height→strong, reach→ductile, area→tough)

## SUBTOPIC 4 COMPLETE (secs 39-50/12)

- Sec 51 — atomic origin of Hooke's law (U(r) potential well, r₀ minimum, local-parabola overlay, U≈U(r₀)+½κ(r-r₀)² ⇒ F≈-κ(r-r₀), summed bonds → σ=Yε, Y large/small by bond stiffness, small-strain limit)

- Sec 52 — beams, neutral layer, I-girder (bent-beam diagram: top compress/bottom stretch/neutral layer, δ=WL³/3YIg cantilever vs /48YIg supported, I-section flanges-far-from-axis diagram, scoop-the-middle insight, Ig=bd³/12 depth-beats-breadth)

- Sec 53 — why mountains have a maximum height (mountain-triangle diagram with height h, σ_base=ρgh, base-limited-by-breaking-stress note, boxed hero h_max=σ_max/ρg, rock≈10km→Everest-sized note)

- Sec 54 — thermal stress in a clamped rod (walls+rod+outward-push diagram, ΔL=LαΔT free-rod strain, clamped→walls supply equal&opposite αΔT, boxed hero σ=YαΔT/F=YAαΔT, no-L-term note, rail-gaps/roller-bridges/expansion-loops payoff)

- Sec 55 — torsion of a solid cylinder [Opus tier, integral derivation] (clamped-cylinder diagram: wall, R/L dims, generator tilt φ, twist arc θ, φ=xθ/L → dC=τ(2πx dx)x → boxed hero C=(2πηθ/L)∫x³dx=πηR⁴θ/2L, R⁴ punchline, torsional rigidity)

- Sec 56 — Searle's experiment for Young's modulus (twin-wire apparatus diagram: reference+experimental wires, frame+spirit-level+micrometer, boxed hero Y=MgL/πr²ΔL, reference-wire-cancels-errors note, radius-care warning Y∝1/r²)

- Sec 57 — applications toolkit recap (two-column formula list: beam depression cantilever/supported, Ig rect/circle, mountain h_max, thermal σ=YαΔT, torsion C+Searle Y, reference Y values steel/copper/aluminium/rubber)

- Sec 58 — CBSE worked example: maximum height of a mountain (σ_max=3.0e8, ρ=2.5e3, g=10 → boxed hero h_max=1.2e4 m=12km, Earth's-tallest-mountains check, gravity-vs-height/Olympus-Mons note)

- Sec 59 — NEET trap: length-free thermal stress (steel rod clamped ΔT=40°C, boxed hero σ=YαΔT=9.6e7 Pa, independent-of-length note, eliminate-length-dependent-options rule, clamping-cancels-expansion explanation)

- Sec 60 — JEE Main worked example: cantilever depression (wall+beam+200N-load+L/b/d-dims diagram, Ig=bd³/12=7.2e-7, boxed hero δ≈4.6e-4m=0.46mm, swap-b/d→2.25×-rise note)

- Sec 61 — JEE Advanced: torque and the r⁴ law (small-shaft-vs-2r-shaft C→16C diagram, boxed hero C≈5.0e3 N·m, double-radius→×16 torque, why-axles-are-fat note)

## Current
Starting Sec 62
