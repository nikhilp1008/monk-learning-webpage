# Ch06 — System of Particles & Rotational Motion — scene progress

Worktree: branch `premium-board-ch6` · port 3006 only · chapter_id `262da95c-2f3a-56da-905e-003fa8f0e4dc`.
70 sections total (Supabase positions 1–70 match JSON section_index; beat counts match across languages for all 70).

## Subtopics
1. Rigid Bodies & Types of Motion — secs 1–2
2. Center of Mass — secs 3–12
3. Vector Product of Two Vectors — secs 13–21
4. Torque and Angular Momentum — secs 22–31
5. Equilibrium of a Rigid Body — secs 32–40
6. Moment of Inertia — secs 41–50
7. Rotational Kinematics and Dynamics — secs 51–59
8. Rolling Motion — secs 60–68
9. Chapter Wrap-Up — secs 69–70

## Done
- Sec 1 — rigid body (point-mass limits, welded swarm, frozen geometry)
- Sec 2 — three types of motion (3-panel: translation/rotation/rolling + master strategy)
- Sec 3 — CoM intro (tumbling bat parabola, chaos loop, see-saw, swarm→particle)
- Sec 4 — surprises (ring empty centre, axes invariance, CG drift tower, exam secret)
- Sec 5 — CoM toolkit (formula ledger, fraction bars, F=Ma hero, density chips)
- Sec 6 — derivation F_ext = M a_cm (bomb parabola, 4 steps, N3L pair cancel)
- Sec 7 — semicircular wire integration (setup figure, 2R/π, empty space)
- Sec 8 — three point masses [CBSE] (figure + rings + (1.2,1.5))
- Sec 9 — man on boat [NEET] (before/after hulls, pinned CoM line, 3 m)
- Sec 10 — disc with hole [JEE Main] (negative mass, −R/6, fill it back)
- Sec 11 — varying-density rod [JEE Adv] (tapered hatch, 5L/9)
- Sec 12 — pitfalls & pro-tips (4 traps + wire/disc chips + pro-tip box)

- Sec 13 — cross product intro (parallelogram figure, door demo, RHR, area)
- Sec 14 — ground rules (up/down figure, anti-commutative, sinθ=0)
- Sec 15 — cross toolkit (cyclic ring, determinant box, geometry chips, identity)
- Sec 16 — perpendicularity proof (six-term cancel pairs, procedure, xy shortcut)
- Sec 17 — compute A×B [CBSE] (numeric grid, zero check)
- Sec 18 — angle from |A×B| [NEET] (magnitude card, half-of-max bar, 30°)
- Sec 19 — triangle area + perpendicular [JEE Main] (shaded triangle, 5.5, k)
- Sec 20 — find vector X [JEE Adv] (dot+cross system, labour chips)
- Sec 21 — cross pitfalls (4 traps, hinge no-torque mini, dot-check pro-tip)

- Sec 22 — torque concept (door pushes, factor chips, spanner, couple, axial vector)
- Sec 23 — angular momentum (dancer I/ω, L = Iω card, Kepler II, neutron star)
- Sec 24 — τ & L toolkit (moment-arm figure, master eq, conservation card)
- Sec 25 — τ = dL/dt derivation (product rule, v×mv cross-out, corollary)
- Sec 26 — determinant for τ and L (planar k-term, −13 N·m, sign chips)

## Current
26/70 done. Subtopic 4 in progress — next Sec 27 (torque on a bolt [CBSE]).

## Workflow notes
- 2026-07-30 PM: node_modules suffered NUL-file corruption (iCloud eviction on Desktop). Layout is now `node_modules -> node_modules.nosync` (symlink). Type-check with `npx tsc --noEmit -p tsconfig.check.json` (untracked local config that also excludes node_modules.nosync); plain `npx tsc --noEmit` scans node_modules.nosync and fails.
- Dev server occasionally wedges after many verify runs — restart: kill port 3006, `nohup npm run dev -- -p 3006 > <scratch>/dev.log 2>&1 & disown`, wait for READY (cold start can take 2–5 min under load).
- Reveal data cached: scratchpad/ch6_reveals.json (re-fetch via Supabase REST, cols `board_reveal_at_english/_hinglish`).
- Section dump helper: scratchpad/dump-sec.mjs (`SP=<scratchpad> node dump-sec.mjs <N>` → per-beat EN/HI narration + board events).
- Registration: single Ch06 block appended at END of src/components/scenes/index.ts (imports hoisted; `Object.assign(REGISTRY, {...})`).
- Verify: `PORT=3006 CHAPTER_ID=262da95c-2f3a-56da-905e-003fa8f0e4dc node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — all audit lines must be [].
- Hinglish board text written in Latin script (house style, per Ch01/Ch02 exemplars), even though JSON narration is Devanagari.
- Combining vector arrow U+20D7 renders as tofu in the board fonts — write vectors as plain letters (F_ext = M a_cm via tspan subscripts). Subscript digits (₁₂) and ᵢ are fine; so are Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺.

## SERVER NOTE (from coordinator session, 13:10+)
The :3006 dev server is now run by the COORDINATOR session as a persistent background task.
- Before killing anything on :3006, curl the lesson route first — if it answers (even slowly), USE it.
- Your own `nohup npm run dev &` launches inside normal Bash calls KEEP DYING — the harness kills the
  process group when the call ends. If you must own the server, launch it with Bash run_in_background: true
  (the command being ONLY the server, no wait-loop in the same call), then poll in a separate call.
- node_modules and shots are now *.nosync symlinks (iCloud corruption fix) — this is intentional, don't "repair" them.
