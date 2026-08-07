# M11 Ch09 — Straight Lines — scene progress

Branch `premium-board-math9` · port 3038 · chapter_id `5edf4eb2-af54-5da2-b8fa-bfbb3270e702`.
62 sections total (Supabase `lesson_sections`, positions 1–62 — confirmed count). JSON_LESSONS is
stale (10 sections) — **not used**; all content pulled live from Supabase (`board_content`,
`segments_english/hinglish`, `board_reveal_at_english/hinglish`, audio URLs). Full cache split
one-file-per-section under the session scratchpad (`sections/sec<N>.json`).

## Subtopics
1. Coordinate Foundations — secs 1–9
2. Slope & Angles — secs 10–17
3. Equations of a Line — secs 18–26
4. Distance Formulas — secs 27–34
5. Intersection, Concurrency & Family of Lines — secs 35–43
6. Angle Bisectors — secs 44–51
7. Foot of Perpendicular, Image & Reflection — secs 52–59
8. Recap / Cheat Sheet — secs 60–62

Flagged "Proof:" sections for extra eye-scrutiny per task brief: **3, 4, 11, 19, 20, 28, 29, 37,
38, 45, 46, 53, 54** (46 is "Which bisector is which?" — not literally titled "Proof:" but still
flagged, treat with the same rigor).

## No new primitives (confirmed before starting)
Per SCENE_AUTHORING_MATHS.md's own audit note, Ch09 is pure coordinate geometry end to end —
composes entirely from `CartesianAxes`/`lineD`/`angleArcD`/`circleD`/base-kit `arrowD`/`crossD`,
plus the per-scene `toScreen(x,y) = {x: OX+x*SCALE, y: OY-y*SCALE}` local helper pattern (see
Ch04Sec61) to place math-coordinate points on screen. `<Overline>` (Ch04) reused for `x̄` (centroid
mean). No math-kit.tsx additions needed.

## Chapter-wide notation decisions (keep consistent across all 62 sections)
- **`\hat{n}` (unit normal vector)**: same treatment as `\vec` — do NOT render a combining hat
  accent (tofu). Draw the actual short unit vector as a real arrow (`arrowD`) and label it with
  the plain letter `n` near the arrowhead. The drawn arrow carries the "this is a vector" meaning.
- **`⊥` (perpendicular)**: falls back to a system font but is legible/unambiguous and central to
  this chapter (perpendicular distance, perpendicular bisectors, normal form) — use directly, no
  substitute exists.
- **`\bar{x}` (centroid mean)**: reuse `<Overline>` from math-kit (first cross-chapter reuse, was
  built for Ch04's conjugate `z̄`) — a real drawn bar above the glyph, not a combining mark.
- **`ℓ`** (a line's name) — native to Anek, safe either script mode.
- **`Δ`** (triangle notation, e.g. `ΔABC`) — native to Anek, **missing from Kalam** → any line
  using `Δ` renders in non-script (Anek) text, same rule as numeric super/subscripts.
- Minus sign in board text: plain hyphen `-`, never U+2212.
- House palette: INK facts, RED guardrails/warnings, GREEN insight/answer, AMBER/AMBER_DARK
  highlight/structure, MUTED for construction lines (dashed-drop substitute — Draw's dasharray
  slot is used for the reveal animation, so "dashed" legs/perpendiculars are thin MUTED solid
  strokes instead, per Ch04Sec1/Sec61 convention).
- **Plot the points first, then the line(s), then whatever's being asked** — every section should
  read like drawing on real graph paper (per task brief). `CartesianAxes` first (own beat), then
  points, then the line/lines, then angle arcs / perpendicular drops / distance segments / loci.
- Diagrams are **built fresh** from primitives — a `board_content` `diagram`-type item's raw
  embedded `<svg>` is never pasted; it's redesigned as a real choreographed CartesianAxes scene.
- Hinglish board text is Latin-script (transliterated from `segments_hinglish`'s Devanagari
  narration, condensed to board-caption length) — never Devanagari on the board itself.

## Workflow used
Sec 1 authored directly as the reference exemplar. Secs 2–62 delegated to subagents (1 section
per agent for "Proof:"-flagged sections and dense `formulas`/`worked_examples` sections needing
independent numeric verification; 2–3 sections per agent for lighter `concept`/`tips` sections),
each given the full spec docs + Sec 1 + a `toScreen`-pattern exemplar (Ch04Sec61) as references.
Agents write + `tsc` + `verify-scene.mjs` to VERDICT PASS but do NOT touch `index.ts` or commit —
registration and commits are centralized here to avoid merge races on the shared registry file.
Every proof-flagged file is eye-reviewed (FORCE_SHOTS spot-check) before registering.

## Delegation model that worked well
Sections were delegated to subagents 1-2 at a time (1 for flagged "Proof:" sections and dense
formula/worked sections needing independent numeric verification, 2 for lighter paired
concept/worked/tips sections), running several agents concurrently per subtopic wave. Each agent
was given: the full spec docs, Sec1 as this chapter's reference exemplar, a `toScreen`-pattern
exemplar (Ch04Sec61), the section's JSON data path, and explicit instructions to hand-verify
every plotted point/line/angle against the actual numbers (with the arithmetic shown in a header
comment) before finalizing — this caught real geometry defects (mis-verified centroids, wrong
angle sweeps) that the automated verifier cannot see (it only catches overlap/overflow/empty).
Orchestrator (not agents) pre-registers a placeholder scene + index.ts entry for every section in
a wave before dispatch, so agents only ever touch their own `M11Ch09SecN.tsx` file and never race
on the shared `index.ts` registry. Agents reported back exact verification arithmetic, which the
orchestrator independently spot-checked (re-deriving the key numbers by hand) before committing —
every section reviewed this way passed cleanly on first read; a few had a genuine geometry/eye
defect caught by the *agent's own* FORCE_SHOTS pass (e.g. Sec2's label clipping a circle outline,
Sec7's guardrail bar clipping adjacent text, Sec9's Overline sitting too far from its "3") that
the automated overlap/overflow checker could not see — reinforcing that FORCE_SHOTS eye-checks are
not optional even when VERDICT is PASS.

## Done
- **Sec 1** — "Geometry becomes arithmetic": axes + two illustrative points (A(2,2), B(7,5)),
  dashed-substitute right-triangle legs labeled x2-x1/y2-y1, green hypotenuse, P at 1/3 along AB
  (section-formula teaser), three tool chips (Distance/Section Point/Triangle Area). PASS both
  languages, eye-checked (FORCE_SHOTS), clean. Reference exemplar for the rest of the chapter.
- **Sec 2** — "The idea of a locus": goat/peg circle + two-villages perpendicular-bisector
  construction (A(2,1), B(8,1), P(5,5), two 3-4-5 triangles, PA=PB=5 verified), external-section
  m=n guardrail, translation-of-axes closer. PASS both languages, eye-checked.
- **Sec 3** [PROOF] — internal section formula: similar-triangle diagram (A(1,1), B(7,4), ratio
  2:1, P(5,3) verified both by distance and by x-projection), formula built term by term to a
  boxed section-point result. PASS both languages, eye-checked.
- **Sec 4** [PROOF] — triangle-area/collinearity: trapezia diagram (A(1,1),B(4,5),C(7,2), area
  10.5 verified three independent ways — trapezia sum, 3-term board formula, shoelace formula),
  messy sum dims as the clean boxed formula lands, collinear-degenerate 3-dot inset. PASS both
  languages, eye-checked.
- **Sec 5** — formula toolkit (distance/section/midpoint/centroid/area/shift-of-origin), single
  centered column, width-budgeted, high-emphasis items boxed as chips. PASS both languages,
  eye-checked. Reference layout precedent for later `formulas` sections.
- **Sec 6** — worked: centroid G(2,1) of A(2,-3)/B(-4,5)/C(8,1) landing visibly inside the
  triangle; collinearity of (1,4)/(3,-2)/(-3,16) shown by plotting first, then drawing the line
  only once the area determinant resolves to 0 (anisotropic screen scale, verified affine
  preserves collinearity). Split left/right board. PASS both languages, eye-checked.
- **Sec 7** — worked: section point P(3,-5) (verified as the 2/3-along point on A(-1,3)-B(5,-9))
  chained into distance OP=√34. Single progressive diagram. PASS both languages, eye-checked.
- **Sec 8** — worked: Apollonius circle locus (distance from (4,0) = 2× distance from (1,0) ⟹
  x²+y²=4), algebra left / diagram right, circle payoff lands exactly when the algebra reaches
  the final equation, 2:1 sanity-check segments at P(2,0). PASS both languages, eye-checked.
- **Sec 9** — tips, closes Subtopic 1: 2×3 pitfall/pro-tip grid, introduces `<Overline>` for
  centroid mean x̄ (position verified via real `getBoundingClientRect` measurement). PASS both
  languages, eye-checked. **Subtopic 1 (secs 1-9) complete.**
- **Sec 10** — opens Subtopic 2: three rays from a common origin at 30°/135°/90° with graduated
  concentric angle arcs (pointOnCircle radian math verified), boxed m=tanθ, vertical-undefined
  guardrail. PASS both languages, eye-checked.
- **Sec 11** [PROOF] — slope=rise/run + perpendicularity: right triangle QPN (P(1,1), Q(5,4), a
  3-4-5 case; θ computed at runtime via atan2 so the arc can never drift from the geometry; right
  angle at N confirmed by dot product), extends symbolically to boxed m1·m2=-1. PASS both
  languages, eye-checked.
- **Sec 12** — angle between two lines: two crossing lines (m1=1/3, m2=2, tanθ=1 ⟹ θ=45°, cross-
  checked via atan difference), concentric acute/obtuse arcs, 4-step procedure as a numbered
  checklist strip with a red "!" guardrail badge for the zero-denominator degenerate case. PASS
  both languages, eye-checked.
- **Sec 13** — slope/angle formula toolkit, single-column precedent from Sec5, three high-
  emphasis formulas boxed. PASS both languages, eye-checked.
- **Sec 14** — worked: Ex1 slope -3/4 (obtuse, falling line); Ex2 stages and crosses out the
  tempting +1/2 speed-trap before landing k=14 and drawing the genuinely perpendicular target
  line (m1·m2=-1 confirmed). Two-panel diagram. PASS both languages, eye-checked.
- **Sec 15** — worked: collinearity (a=6 verified) chained into the angle formula (θ=atan(1/3)
  ≈18.43°); the PQR line and the y=x reference line are algebraically confirmed to meet exactly
  at P, so the angle-arc vertex is the real intersection, not a fudge. PASS both languages,
  eye-checked.
- **Sec 16** — Advanced worked: line at 45° to 3x-y+5=0 (m=3); three lines fanned from a shared
  point with ray angles computed via atan2, verified in-code to sit exactly 45° on each side of
  the given line (m=-2, m=1/2); red vertical-line test correctly fails the check. PASS both
  languages, eye-checked.
- **Sec 17** — tips, closes Subtopic 2: 2×2 red trap grid + a green pro-tip card with four
  hand-drawn rising/falling/flat/vertical mnemonic icons. PASS both languages, eye-checked.
  **Subtopic 2 (secs 10-17) complete — chapter is 17/62 (27%) done.**
