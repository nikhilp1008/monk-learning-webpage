# Progress — M11 Chapter 10: Conic Sections

chapter_id: `ce3b1755-7eb0-5e16-9849-e752cca5f723`
36 sections confirmed directly from Supabase `lesson_sections` (JSON_LESSONS is stale, ignored per task brief).

Subtopics: 1-7 The Conic Family · 8-13 The Circle · 14-20 The Parabola · 21-27 The Ellipse ·
28-34 The Hyperbola · 35-36 Recap/Cheat Sheet.

New primitive `ellipseD(cx,cy,rx,ry)` already added to math-kit.tsx ahead of this run.
Parabola/hyperbola get no dedicated generator — sample the real equation, thread through `curveD`.

## Log
- **Sec 1** — concept, opens the chapter: hand-drawn stylized double-cone (two
  mirrored triangles meeting at a shared apex, pure `lineD`, per task brief — no
  ellipse rims). Vertex/axis/generator labeled; α (semi-vertical angle at the
  vertex) and a generic illustrative β (cutting-plane-vs-axis angle) both arced
  and labeled via `angleArcD`/`pointOnCircle` computed live off the actual
  coordinates (not hand-guessed degrees). The four β-vs-α classification cases
  build as a small ledger (tilt-icon + condition + result word) to the right of
  the cone rather than redrawing 4 overlapping planes on one small diagram —
  keeps "one hand, one demo." Guardrail beat rings "Hyperbola" and adds the
  actual payoff visual: a second, real RED cut through both nappes (offset from
  the vertex, not degenerate). PASS both languages, eye-checked via FORCE_SHOTS
  (cone shape, all labels, both-nappes cut all confirmed correct).
- **Sec 2** — concept: focus/directrix definition diagram (F, directrix, P, PF/PM
  distances) sets up the ratio-definition of e, reused verbatim by later chapters'
  own focus-directrix derivations. Main payoff is the "eccentricity dial" — a
  labeled e-axis with 4 small shape icons built progressively: real `circleD`,
  first use of the new `ellipseD` (genuinely wider-than-tall, not a squished
  circle), and hand-sampled parabola/hyperbola curves via `curveD` (upward
  parabola from `v=u²/h²·height`, two independent hyperbola branches via
  `cosh`/`sinh` parametrization, each its own curveD call per the no-bridging
  rule). Guardrail rings "Parabola" tying back to Sec1's β=α. Three degenerate-
  case icons (point/line/X) close the section. PASS both languages, eye-checked
  — all 4 icon shapes confirmed visually correct against their definitions.
- **Sec 3** — concept, closes the "how to classify" trio: two-column layout,
  LEFT = no-xy-term test (equation with A/C highlighted → 4-row sign table →
  guardrail reusing Sec2's circle/hyperbola-branch icons for closes-vs-opens
  continuity), RIGHT = xy-term/rotation case (hand-built tilted-axes icon →
  boxed Δ=B²−4AC formula → 3-row Δ table). One overlap caught by the verifier
  (a multi-`T`-span equation "A" touching "x²+" — same string split too
  tightly) and fixed by widening the manual x-offsets. PASS both languages,
  eye-checked.
- **Sec 4** — formulas, the chapter's first reference card: three panels
  (by-angle, by-eccentricity mirrored side by side; by-equation full width
  below with the general 2nd-degree form, boxed Δ formula at larger HIGH-
  emphasis size, 3-row Δ table with the circle special-case parenthetical).
  Guardrail closes on B=0 = Class-11 default. Clean PASS both languages on
  first render, eye-checked.
- **Sec 5** — worked_examples: Example 1 draws an accurate mini cone (half-width
  computed from `tan(30°)` rather than eyeballed, so the generator truly reads
  30° off the axis; β=50° plane likewise placed via computed trig, both
  cross-checked with `Math.atan2` on the actual drawn points) building to a
  boxed ELLIPSE, then a red aside for the β=α boundary case (PARABOLA), framed
  as an exam pitfall rather than a wrong-answer cross-out since this is a
  genuine alternate case, not a mistake. Example 2 demonstrates the "erase,
  don't overlay" rule: the plain equation (`beat===5` only) is fully replaced
  by an A/C-highlighted respan at beat 6 in the same slot, not stacked on top.
  Fixed one invalid `weight` prop passed to `Chip` (no such prop) caught by
  tsc before it ever reached the browser. PASS both languages, eye-checked —
  cone angles visually match their stated 30°/50° values.
- **Sec 6** — worked_examples, closes Subtopic 1: Example 3 repeats Sec5's
  slot-replace technique for A=4/C=−9 (sign made explicit by keeping the minus
  in the highlighted span, not just the digit) → inline discriminant 144>0 →
  boxed HYPERBOLA tied to e>1 → "two tests agree" note. Example 4 is the
  chapter's first genuinely rotated conic (real xy term, not just discussed
  abstractly like Sec3/4): 2-line stacked derivation → boxed Δ=−144<0 (HIGH
  emphasis, amber not red since it's a correct result not a warning) → boxed
  ELLIPSE + rotation-invariance punchline. All arithmetic hand-verified
  (144>0 ✓, 16−160=−144 ✓). PASS both languages, eye-checked.
- **Sec 7** — tips, closes Subtopic 1: 2x2 grid of RED pitfall cards (vertex
  degenerate-case/HIGH, parabola-is-a-boundary-not-a-range, circle needs A=C
  AND B=0 else it's a rotated ellipse, never rotate axes before classifying)
  using the new `roundRectD`-bordered `Card` helper, then a 2-card AMBER
  "reflex" recap (red = avoid, amber = remember, per house palette). Clean
  PASS both languages on first render, eye-checked.

## Subtopic 1 (The Conic Family, secs 1-7) — COMPLETE
All 7 sections authored, tsc clean, VERDICT PASS both languages, eye-checked via
FORCE_SHOTS before logging. New primitive `ellipseD` confirmed working (Sec2).
Parabola/hyperbola sampled via `curveD` off real equations/parametrizations
throughout (Sec2, Sec3's rotated-axes icon doesn't need this but Sec2 does) —
no dedicated curve generator needed, matches the task brief. All cone/angle
diagrams (Sec1, Sec5) use live `Math.atan2`/`pointOnCircle` computation from
actual coordinates rather than hand-guessed degrees, cross-checked against the
stated angles. Two real bugs caught before commit: a multi-span equation with too-tight
manual x-offsets (Sec3, caught by verify-scene.mjs overlap check) and an
invalid `weight` prop passed to `Chip` (Sec5, caught by `tsc --noEmit`).
No other section needed a post-verify fix.

## Subtopic 2 — The Circle (secs 8-13)
- **Sec 8** — concept, opens the subtopic: LEFT diagram formalizes in place
  (goat-and-peg intuition → same circle+radius, "peg"/"goat" labels erase and
  replace with "C(h,k)"/"P(x,y)", axes fade in underneath — geometry persists,
  only labels swap, per the erase-don't-overlay rule). RIGHT column ties back
  to Sec2's e=0 with a limiting-ellipse guardrail icon (faint ellipse +
  circle sharing a center, two foci drawn merged together), then previews
  standard vs general form (both properly derived next in Sec9). PASS both
  languages on first render, eye-checked.
- **Sec 9** — concept, FLAGGED derivation section (task brief: extra scrutiny).
  Standard-form derivation (C/P/r diagram → distance formula → squared,
  boxed HIGH) and general-form derivation (equation → complete-the-square →
  boxed centre/r² match) run in parallel LEFT/RIGHT columns. Hand-verified
  the algebra: x²+y²+2gx+2fy+c=0 → (x+g)²+(y+f)²=g²+f²−c is the correct
  completion of the square (expand back: x²+2gx+g²+y²+2fy+f²=g²+f²−c+g²+f²
  cancels to the original ✓). The semicircle bonus result builds the
  right-angle mark at P from the ACTUAL unit vectors P→A/P→B (computed via
  `Math.hypot`/live coordinates, not hand-placed) — force-screenshotted and
  zoomed in to confirm the little corner glyph genuinely reads as 90°, not
  just labeled as one. Diameter form (x−x₁)(x−x₂)+(y−y₁)(y−y₂)=0 uses real
  Unicode subscript digits in non-script Anek per the digit-coverage rule.
  PASS both languages, eye-checked at high scrutiny.
- **Sec 10** — formulas, the circle's reference card: LEFT column (standard
  form → general form → boxed centre/radius, HIGH) → RED 3-line guardrail
  card (sign of g²+f²−c: real/point/imaginary, reusing Sec7's `roundRectD`
  Card pattern). RIGHT column (diameter form + explanation → S₁ definition →
  sign-placement meaning → boxed tangent-length formula). Clean PASS both
  languages on first render, eye-checked.
- **Sec 11** — worked_examples: Example 1 (general form → match g/f/c → boxed
  centre/radius, hand-verified g²+f²−c=9+16+11=36, √36=6 ✓) and Example 2
  (diameter ends A(1,2)/B(5,6) → small A–B segment icon → diameter form →
  boxed expansion, hand-verified (x−1)(x−5)+(y−2)(y−6) expands to
  x²+y²−6x−8y+17 ✓). Clean PASS both languages, eye-checked.
- **Sec 12** — worked_examples, denser than Sec11 (4 beats per example):
  Example 3 chains radius-from-distance (hand-verified √(9+16)=5) → boxed
  equation → S₁ position test (hand-verified 16+4−16+4−20=−12<0 → INSIDE).
  Example 4 chains three-point substitution (hand-verified at A: 36+12g=0→
  g=−3; at B: 64+16f=0→f=−4) → boxed circle+centre/radius → HIGH-emphasis
  S₁ tangent-length computation (hand-verified 49+81−42−72=16, √16=4). Clean
  PASS both languages, eye-checked.
- **Sec 13** — tips, closes Subtopic 2: same 2x2-grid + reflex-recap structure
  as Sec7 (centre-sign trap flagged HIGH, radius-positivity check, diameter-
  form-is-faster, real-circle-needs-equal-coeffs), then a wide AMBER "one-pass
  reflex" card and a final RED/HIGH card on S₁'s double duty. Clean PASS both
  languages on first render, eye-checked.

## Subtopic 2 (The Circle, secs 8-13) — COMPLETE
All 6 sections authored, tsc clean, VERDICT PASS both languages, eye-checked.
Every worked-example computation hand-verified against the source JSON before
logging (Sec11: r=6, expansion x²+y²−6x−8y+17=0; Sec12: S₁=−12 inside,
three-point substitution g=−3/f=−4, tangent=4). Sec9's flagged derivation
got extra scrutiny — zoomed screenshot to confirm the right-angle mark at P
is built from live perpendicular vectors, not just a labeled glyph. No new
math-kit primitives needed this subtopic — pure `circleD`/`CartesianAxes`/
`roundRectD` reuse plus per-scene `pointOnCircle` math for angle work.
