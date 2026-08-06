# Class 11 Maths — Chapter 3 "Trigonometry" — Progress

- Branch: `premium-board-math3` · Worktree: `~/Downloads/monk-scenes-math3` · Port: `3032`
- chapter_id: `fab8d5c4-68ad-5772-8888-f5b1cd687633` (subject `mathematics`, class_level 11)
- Naming: `M11Ch03SecN.tsx` / component `M11Ch03SecN`; registered at END of `index.ts` as
  `const M11CH03 = "fab8d5c4-68ad-5772-8888-f5b1cd687633"; REGISTRY[`${M11CH03}:N`] = M11Ch03SecN;`
- Data source: Supabase `lesson_sections` directly (JSON_LESSONS is stale — 11 sections vs the
  real 44 — ignored). Cached locally at `scratch/math3/sec<N>.json` (full row) and
  `scratch/math3/all_sections.json` (all 44). Sections 43-44 have no `segments_*` (recap/cheat-
  sheet types) — use `board_content` text directly. All 44 confirmed clean.
- **Known data bug**: 13 `board_content` strings (11 occurrences found across 9 sections: 2, 7,
  9, 13, 14 (x1 each), 21 (x3), 24, 28, 36) contain a literal 6-character escaped em/en dash
  (`—` or `–` as literal backslash+text, not a real dash char). Read as a dash, write a
  plain hyphen `-` on the board — never copy the escape text.
- New math-kit trig primitives (already merged into this branch): `UnitCircleDiagram`,
  `pointOnCircle`, `angleArcD`, `waveD` (sin/cos only — NOT tan/cot/sec/csc, draw those branch by
  branch), `CartesianAxes`, `curveD`, `lineD` (from Ch2 extension).

## Subtopic map
1. Sec 1-7   Angle Measurement and Radians
2. Sec 8-14  Trigonometric Functions and Quadrant Signs
3. Sec 15-19 Standard Values, Even-Odd Nature and Allied Angles
4. Sec 20-26 Graphs and Periodicity of Trigonometric Functions
5. Sec 27-35 Trigonometric Identities and Compound Angle Formulas
6. Sec 36-42 Trigonometric Equations and Solutions
7. Sec 43-44 Formula Recap and Cheat Sheet

## Model tiering
Sonnet for all — flag Sec 27-35 (identity-derivation) and any section with real unit-
circle/graph geometry (8, 15, 20, 21, 23-26, 33) for an extra eye-check pass (FORCE_SHOTS=1
spot check).

## Done
(append one line per finished section, in order)
- Sec 1 "Why degrees are arbitrary and the radian is the circle's own ruler" — degree/radian
  words column, hand-drawn radian diagram (circle, radii OA/OB, red rim-arc AB = radius, amber
  angle arc, "1 rad" label), 57.3° chip, pure-number formula card, 2π full-turn chip, sign
  convention guardrail. Eye-checked (geometry). PASS.
- Sec 2 "The cornerstone definition and the master conversion" — mini sector diagram (r,s,θ)
  grounding θ=s/r built term by term, dimensionless explain line, π radian=180° amber hero,
  two conversion-factor lines, red-margin benchmark note, 6-chip standard-angle table, bare-
  number guardrail. Notebook-page top-to-bottom layout (deviates from band map — deliberate,
  noted in header). Data-bug dash fixed (seq3). PASS.
- Sec 3 "Arc length and sector area — both fall out of one definition" — s=rθ amber hero,
  proportion route (s/2πr=θ/2π), A=½r²θ chip, same-fraction-of-disc route, A=½rs green twin
  form, filled sector-wedge diagram (r,r,s,θ,O labels) grounding all three, radians-only
  guardrail. PASS.
- Sec 4 "Converting an angle and finding a radius" — two side-by-side worked examples (Ex1
  40°20′→radians via fold-minutes; Ex2 find r from s=37.4cm, θ=60°→π/3), each builds its
  formula chain step by step to a boxed answer, shared convert-first guardrail. PASS.
- Sec 5 "Angular motion and the shared-arc ratio" — Ex3 spinning wheel (rpm→rev/s→ω=12π≈37.7
  rad/s boxed, v=rω bridge note); Ex4 equal-arc ratio trap (r1θ1=r2θ2 → r1/r2=θ2/θ1=5/4 boxed,
  inverse-relationship guardrail). Two mirrored columns. PASS.
- Sec 6 "A chord-to-arc chain and the sector inversion" — Ex5 chord-bisector right-triangle
  diagram (r=20,half-chord=10) → sin(θ/2)=1/2 → θ=π/3 → s≈20.94cm boxed; Ex6 sector-inversion
  algebra puzzle (2r+s=16, ½r²θ=16 → r=4,θ=2 boxed), JEE-Advanced-pattern guardrail.
  Eye-checked (triangle geometry). PASS.
- Sec 7 "The pitfalls that quietly cost marks" — 6 numbered red-circle pitfall rows (degrees-
  in-s=rθ, flipped factor, radian dimensionless [data-bug fixed], DMS base-60, clockwise-
  negative, calculator mode), red-margin sanity-check closer (1 rad ≈ 57°). SUBTOPIC 1
  (Angle Measurement and Radians, Sec 1-7) COMPLETE. PASS.
- Sec 8 "From the right triangle to the unit circle" — opens subtopic 2. 90°-cap anchor,
  full UnitCircleDiagram with P(a,b) in QII, θ arc, a/b/M/1 labels, correctly-placed I/II/III/IV
  quadrant numerals (the source board_content's own decorative SVG had these mislabeled/rotated
  one position off standard convention — fixed here, verified by eye), cosθ=a/sinθ=b hero,
  |sinθ|≤1 |cosθ|≤1 chip, red-margin closer. Eye-checked (geometry). PASS.
- Sec 9 "General definitions, reciprocal pairings and the sign engine" — sinθ=y/r etc and
  cscθ=r/y etc chips, sign-engine explain (data-bug fixed), cosec↔sine/sec↔cosine pairing
  guardrail, ASTC mnemonic heading, color-coded quadrant sign labels pre-placed then framed by
  CartesianAxes (no ticks) + anticlockwise A→S→T→C rotation arc, reciprocal-sign closer.
  Eye-checked (ASTC quadrant geometry, correct I/II/III/IV placement). PASS.
- Sec 10 "The three Pythagorean identities and the ranges" — sin²+cos²=1 hero, 1+tan²=sec²
  and 1+cot²=csc² chips, mini right-triangle-on-circle sketch grounding a²+b²=1, ranges
  ([-1,1] / never-strictly-inside / all-reals), red-margin range-check-every-answer closer.
  PASS.
- Sec 11 "The signature board problem — find the other five" — Ex1 sin x=3/5,QII: magnitude
  cos²x=16/25 → sign-decision guardrail (QII⇒cos negative) → all five values in two boxed rows;
  Ex2 quadrantal evaluation boxed to -2; common-mistake (+4/5 without checking quadrant)
  guardrail. PASS.
- Sec 12 "Reduce first, then read the sign" — Ex3 cos1170°: reduce to 90° → boxed answer 0,
  guessing-a-sign-because-its-big trap guardrail; Ex4 cotθ=-4/3,QII: sign facts + small 3-4-5
  reference-triangle diagram → cosθ=-4/5,sinθ=+3/5 → expression boxed to -17/48,
  magnitude-then-sign discipline guardrail. PASS.
