# Ch03 "Motion in a Plane" — scene-render progress

Branch: premium-board-ch3 (worktree). Port 3003 only.
Chapter ID: a5970ed6-3b48-55f9-9b80-8abdd3d4c336
Total sections: 76

## Subtopics
- Sec 1–14: Vector Algebra and Resolution
- Sec 15–28: Vector Products (Dot and Cross)
- Sec 29–40: Two-Dimensional Kinematics
- Sec 41–52: Projectile Motion
- Sec 53–63: Relative Velocity in a Plane
- Sec 64–74: Circular Motion
- Sec 75–76: Formula Recap and Cheat Sheet

## Done
- Sec 1 — Scalars vs vectors: scalar chips / which-way arrows / 3-4-5 walk demo / vector cast / contrast verdict.
- Sec 2 — Triangle & parallelogram laws: two-diagram row + rickshaw push demo (aligned vs side) + tail-to-tail θ glyph.
- Sec 3 — Resolution: F→Fx+Fy axes diagram + sledge rope demo (drag vs lift) + choose-axes verdict.
- Sec 4 — Parallelogram-law derivation pt1: OPQS construction + formula stack → R = √(A²+B²+2ABcosθ) hero box.
- Sec 5 — Derivation pt2: tan α triangle + three special-case rows + |A−B| ≤ R ≤ A+B band hero.
- Sec 6 — Toolkit 1: Â=A/|A| box, îĵk̂ chips, component form, Ax/Ay, reverse trip, from-axis warning + axes glyph.
- Sec 7 — Toolkit 2: parallelogram R + tan α boxes, range band, Rx/Ry, 2-vs-3+ verdict.
- Sec 8 — CBSE worked example: toy-cart figure (F at 60°, Fx/Fy), given chips, Fx=10/Fy≈17.3, answer box, √400 check.
- Sec 9 — NEET speed trap: option chips + bait ring on (B) 5, number-line band [1,7], ✓✓✓/✗ tests, (D) 8 N answer.
- Sec 10 — JEE Main two-ways: 6m+8m@60° walk diagram + Method-1 component stack + Method-2 parallelogram check + verdict.
- Sec 11 — JEE Adv pt1: matching-components dot product → −3 box, sign⇒obtuse note, √14·√6 magnitudes, θ≈109° hero.
- Sec 12 — JEE Adv pt2: determinant array, cofactors, 5î−5ĵ−5k̂ box, ĵ-minus warning, normal-out-of-plane diagram, n̂ + area + ABsinθ check.
- Sec 13 — Five pitfalls checklist: numbered red circles, cross-out on |A+B|=A+B, FROM-axis rule, scalar/vector species, anticommutativity, unitless û.
- Sec 14 — Pro-tips closer: RESOLVE hero box, two sanity-check boxes, DOT-along/CROSS-across split. ✅ SUBTOPIC 1 (1–14) COMPLETE.
- Sec 15 — Dot vs cross intro: two-panel shadow/normal diagrams, scalar-vs-vector red note, mirror rows, physics-question verdict.
- Sec 16 — Dot product deep-dive: thela push F/Fx/Fy split, AB cosθ box, projection line, number-not-vector, ⊥→0 bag example.
- Sec 17 — Cross product: spanner+bolt demo (along vs across pushes, τ out of plane), AB sinθ n̂ box, right-hand rule, vector-answer note, ∥→0.
- Sec 18 — Seesaw: cos/sin sweep curves 0–180°, ∥/⊥ markers, tail-to-tail + 3D fine print, dot-0-⊥ vs cross-0-∥ trap.
- Sec 19 — Dot component derivation: bracket expansion, unit products, 3×3 grid with green diagonal + crossed red zeros, AxBx+AyBy+AzBz hero.
- Sec 20 — Cross determinant derivation: î-ĵ-k̂ cycle wheel (green arcs), collected components, determinant array, +−+ WHY.
- Sec 21 — Dot toolkit: definition box, properties col, cosθ finder box, projection line, W/P/Φ application rows.
- Sec 22 — Cross toolkit: AB sinθ n̂ box, properties, mini determinant, parallelogram-area glyph, triple products, τ/L/qv×B rows.
- Sec 23 — Work worked example: F/d arrows, identification line, 6+12 → W=18 J box, scalar shape check, auto-projection note.
- Sec 24 — NEET torque trap: options + ring on (B) 0.87, spanner split diagram, τ=0.5 N·m box, sin/cos family cues.
- Sec 25 — JEE Main angle/proj/perp: base quantities, 67.6°, 8/7 proj, A-split diagram, √377/7, Pythagoras closes to |A|=3.
- Sec 26 — JEE Adv triple products: single determinant → −10, parallelepiped box, V=10 not-coplanar chip, BAC−CAB → 9î−2ĵ+5k̂.
- Sec 27 — Five product pitfalls checklist: cos/sin, species, anticommutativity, ĵ-minus, side-by-side zero-condition chips.
- Sec 28 — Pro-tip closer: family chips, two instant-check boxes, pocket-seesaw line, 'Dot agrees · Cross turns' hero. ✅ SUBTOPIC 2 (15–28) COMPLETE.
- Sec 29 — Independence big idea: carrom glide+drift diagram, x/y-story lines, clock chip+glyph, independence verdict.
- Sec 30 — Vector upgrade: two formula boxes, x-set/y-set split, projectile+circular previews, averages subtlety.
- Sec 31 — Integration derivation: a=dv/dt → v=v₀+at box, v=dr/dt → r-equation box, constant-a warning.
- Sec 32 — Components prove independence: trajectory + projections diagram, î/ĵ sets, neither-mentions-other note, shared-t recipe.
- Sec 33 — Toolkit: r→v→a derivative chain with d/dt arrows, Pythagoras magnitudes, averages, chain-rule warning.
- Sec 34 — Toolkit 2: per-axis equations, v² relations, projectile/circular chips, R = v²/a⊥ box.
- Sec 35 — Board worked example: v₀/a mini axes, v=4î+6ĵ, √52, r=8î+6ĵ, answer box, recipe verdict.
- Sec 36 — NEET Pythagoras trap: options + ring on (B) 14, 6-8-10 triangle, √100 box, wrong-option anatomy, triangle families.

## Current
Sec 37 — next.

## Notes
- Reveals cache: fetch from Supabase `lesson_sections`
  (board_reveal_at_english / board_reveal_at_hinglish per position).
- Verify: `PORT=3003 CHAPTER_ID=a5970ed6-3b48-55f9-9b80-8abdd3d4c336 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<M>`
- Kit changes: none needed so far.
- ENV WARNING (2026-07-30): Desktop is iCloud-synced; macOS evicted file contents (dataless flag)
  under disk pressure (97% full) — tsc blocked forever in read(). Remedies: `brctl download <dir>`
  for src/JSON; for node_modules just `npm ci` (6s from cache). node_modules and .next MUST be real
  dirs inside the worktree — symlinking them into /private/tmp breaks Node module resolution
  (realpath has no `node_modules`-named ancestor) and Turbopack rejects out-of-root symlinks.
