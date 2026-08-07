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
- **Sec 18** — opens Subtopic 3: one line (2x+3y-12=0) labeled four ways at once — intercepts
  A(6,0)/B(0,4), point P(3,2) verified as the AB midpoint, perpendicular foot N computed via
  the standard formula and verified on-line, angle ω swept from the x-axis to ON. PASS both
  languages, eye-checked.
- **Sec 19** [PROOF] — point-slope form: line through (1,1)/(3,5), all numbers computed at
  runtime (not hardcoded) so labels stay self-consistent; specializes to two-point form and
  slope-intercept form (y-intercept (0,-1) marked on the same diagram). PASS both languages,
  eye-checked.
- **Sec 20** [PROOF] — intercept form (a=6,b=4, filled OAB triangle) + normal form (p=5, ω=30°,
  N computed literally via pointOnCircle, landed line confirmed perpendicular to ON by a
  screen-space dot-product check) — two independent side-by-side derivations, 9 beats. PASS
  both languages, eye-checked.
- **Sec 21** — reducing general form to normal form (A=3,B=4,C=-20): the sign-choice guardrail
  gets a concrete wrong-vs-right demo (dividing by -5 gives the invalid p=-4, crossed out
  beside the correct p=4), side-column diagram with verified foot N=(2.4,3.2). PASS both
  languages, eye-checked.
- **Sec 22** — equations-of-a-line formula toolkit (9 items, densest so far), single-column
  precedent from Sec5/Sec13. PASS both languages, eye-checked.
- **Sec 23** — worked: two independent examples — line through (-2,5)/(3,-1) extended to its
  y-intercept 13/5; 3x-4y+12=0 via its intercepts. Sign-trap (m=A/B vs -A/B) staged and
  crossed out. PASS both languages, eye-checked.
- **Sec 24** — worked: single uniform-scale diagram chains reduction→slope→flip-negate→
  perpendicular→intercept form; the two drawn lines confirmed perpendicular via a screen-space
  dot-product check, not just algebraically. PASS both languages, eye-checked.
- **Sec 25** — Advanced worked: normal form of x-√3y+8=0 (√(A²+B²)=2, divide by -2 since C=8>0,
  cosω=-1/2, sinω=√3/2, p=4, ω=120° in Q2), foot N verified on-line, wrong-sign aside (÷+2 →
  forbidden p=-4) crossed out. PASS both languages, eye-checked. NOTE: this section's English
  audio has its last `board_reveal_at` only ~0.04s before the clip ends, so the automated
  verifier's capped seek time never activates the final beat for English (confirmed via
  Hinglish, which has a healthy buffer, that the final beat renders correctly with no
  overlap/overflow) — a data-timing quirk upstream of the scene code, not a scene defect.
  Worth a spot-check if this pattern recurs elsewhere.
- **Sec 26** — tips, closes Subtopic 3: Sec17's 2×2 red-trap-grid + green-pro-tip-card
  precedent, drawn x/y-intercept mnemonic icon. PASS both languages, eye-checked.
  **Subtopic 3 (secs 18-26) complete — chapter is 26/62 (42%) done.**
- **Sec 27** — opens Subtopic 4: line 3x+4y-12=0, point P(5,5), foot Q(2.24,1.32) verified
  algebraically and via the distance formula (d=4.6, matches exactly); genuinely perpendicular
  normal-vector arrow (dot-product verified); mini parallel-lines and symmetric-form diagrams.
  PASS both languages, eye-checked.
- **Sec 28** [PROOF] — the chapter's one `\hat{n}` occurrence: rendered as a real drawn arrow
  labeled plain "n" (no hat accent). Line 3x+4y-12=0, R(4,0), P(1,1): unit normal (0.6,0.8),
  signed distance -1.0 verified three ways. Side-test guardrail closes it. PASS both
  languages, eye-checked (including the beat carrying the guardrail specifically).
- **Sec 29** [PROOF] — Part A: parallel lines 3x+4y-12=0/3x+4y-27=0, d=3 verified via both the
  point-line formula and the |C1-C2| shortcut. Part B: symmetric-form P(2,2), θ=60°, r=4,
  Q verified to land exactly r=4 away. Full erase-and-reuse pivot between the two parts. PASS
  both languages, eye-checked.
- **Sec 30** — distance-formulas toolkit, single-column precedent from Sec5/13/22, two
  visually-distinct red-margin guardrails (mid-list vs closing). PASS both languages,
  independently re-verified.
- **Sec 31** — worked: Ex1 point-to-line d=1 with a real perpendicular drop to its verified
  foot; Ex2 stages the normalized d=1.9 before crossing out the un-normalized 2.4 speed trap.
  Two side-by-side panels, both parallel lines confirmed same on-screen slope. PASS both
  languages, eye-checked (caught+fixed a label-on-stroke defect during its own eye-check).
- **Sec 32** — worked: chains the two-point line equation (A(1,2)/B(4,6) → 4x-3y+2=0) into the
  origin distance d=0.4, foot of perpendicular verified on the line. PASS both languages,
  eye-checked.
- **Sec 33** — Advanced worked: line through P(1,1) at θ=60° meets 2x+y=8 at Q;
  r=10(2-√3)=20-10√3≈2.68 derived and verified, Q's coordinates confirmed on the target line.
  PASS both languages, eye-checked.
- **Sec 34** — tips, closes Subtopic 4: Sec17/26 card-grid precedent; the same-side/
  opposite-side mnemonic's dot placement verified via a cross-product side test. PASS both
  languages, eye-checked. **Subtopic 4 (secs 27-34) complete — chapter is 34/62 (55%) done.**
- **Sec 35** — opens Subtopic 5: L1(x+y-4=0)/L2(x-y=0) meet at J(2,2) via a real elimination
  derivation, then L3(2x-y-2=0) joins through the same ringed point. PASS both languages,
  eye-checked.
- **Sec 36** — the family trick: a genuine 5-line fan through J(2,2) — L1, L2 plus three
  family members at λ=1,-1,2 (vertical/horizontal/slope-3), all verified through J,
  concretely grounding "one line per λ" and the L2-unreachable guardrail. PASS both
  languages, eye-checked.
- **Sec 37** [PROOF] — two-column build (symbolic proof left, concrete L1(x+y-3=0)/
  L2(x-y-1=0)/J(2,1) grounding right with checkmarked verifications); λ=3 family member
  lands ringed through J, three more thin members sweep in to concretely sell "for every λ".
  PASS both languages, eye-checked.
- **Sec 38** [PROOF] — densest section in the subtopic (9 beats). L1/L2/L3 through J(2,1),
  determinant verified 0 by hand; first literal 3x3 determinant grid (Draw bars + T grid,
  no new primitive), compact 3-line "asterisk" diagram, concrete verification line. PASS
  both languages, eye-checked with zoomed-crop clearance verification.
- **Sec 39** — intersection/family formula toolkit incl. Cramer's rule, ratio tests, and the
  determinant grid (second occurrence, same construction pattern as Sec38). Single-column
  precedent held via a taller determinant row. PASS both languages, eye-checked.
- **Sec 40** — worked: Ex1 intersection (1,2) plotted; Ex2's determinant (=6, ringed) with
  the +/-/+ cofactor sign pattern stamped above the grid. PASS both languages, eye-checked.
- **Sec 41** — worked: the family-method payoff made concrete — the actual (ugly-fraction)
  intersection J=(3/7,16/7) is computed only for illustration, never shown in the algebra;
  the final answer line confirmed on-screen to pass through the never-computed J. PASS both
  languages, eye-checked.
- **Sec 42** — Advanced worked: determinant |a 2 1; 2 a 2; 1 1 -1|=0 → a=-5 or a=2. Two-panel
  visual contrast is the payoff — a=2 genuinely renders as two parallel lines (crossed out);
  a=-5 genuinely renders as three lines converging at the verified (3/7,4/7). PASS both
  languages, eye-checked.
- **Sec 43** — tips, closes Subtopic 5: established 2x2-red-grid + green-pro-tip-card
  precedent; fan-of-3-lines mnemonic with a legend row avoiding label-on-line collision.
  PASS both languages, eye-checked. **Subtopic 5 (secs 35-43) complete — chapter is 43/62
  (69%) done.**
- **Sec 44** — opens Subtopic 6: schematic two-crossing-lines diagram (slope +1/-1 through
  O) with the two perpendicular bisectors drawn as MUTED construction lines; bisector
  directions verified as the normalized sum/difference of the two unit direction vectors
  (dot product 0). PASS both languages, eye-checked.
- **Sec 45** [PROOF] — the bisector is the equidistant locus: from-scratch wedge diagram
  (vertex V, two rays L1/L2, P placed on the internal bisector by construction so both
  perpendicular drops are exactly 45px — verified numerically, not hand-picked); modulus-
  bar formula dims in place as the ± formula lands below it, making the core "bars drop,
  ± appears" proof step visible in one settled frame. PASS both languages, eye-checked.
- **Sec 46** [FLAGGED, "Which bisector is which?"] — 3-step numbered procedure (normalize
  → '+' = origin's bisector → compute a1a2+b1b2) with a color-coded two-branch fork
  (>0 obtuse / <0 acute) and two visually distinct red-margin guardrails. Sign-logic
  direction independently re-verified against sibling Sec47/Sec49 and the standard NCERT
  result before committing. PASS both languages, eye-checked with extra scrutiny.
- **Sec 47** — angle-bisectors formula toolkit, single-column precedent from Sec5/13/22/
  30/39; two visually-distinct red-margin guardrails (mid-list normalize note, closing
  own-denominator note). PASS both languages, eye-checked.
- **Sec 48** — worked: erase-and-reuse pivot (Sec29 idiom) between Example 1 (both
  bisectors of 3x-4y+7=0 / 5x+12y-2=0 → 14x-112y+101=0 and 64x+8y+81=0) and Example 2
  (origin's bisector of 4x+3y-6=0 / 5x+12y+9=0 → 7x+9y-3=0). All cross-multiplications
  independently re-verified by hand before dispatch. PASS both languages, eye-checked.
- **Sec 49** — worked: identifying the acute bisector for x+y-2=0 / 7x-y+3=0
  (a1a2+b1b2=-6<0 ⟹ acute) → 12x+4y-7=0, cross-checked via the line's actual intersection
  point. Single flowing derivation (Sec33 precedent), no diagram (pure algebra). PASS both
  languages, eye-checked.
- **Sec 50** — Advanced worked: verifies Sec48 Example 1's two bisectors are perpendicular
  (m1=1/8, m2=-8, product=-1); diagram lines built from exact-integer perpendicular
  direction vectors with a runtime-computed 90° arc (Sec11 discipline), not hardcoded
  degrees. PASS both languages, eye-checked.
- **Sec 51** — tips, closes Subtopic 6: one red trap card (normalization) + a 3-row amber
  checklist + the green pro-tip card (origin's bisector = '+' one) with a drawn crossing-
  lines mnemonic — deliberately NOT a padded 2x2 red grid, since the JSON only tags one
  beat as an actual trap. PASS both languages, eye-checked. **Subtopic 6 (secs 44-51)
  complete — chapter is 51/62 (82%) done.**
- **Sec 52** — opens Subtopic 7 (final content subtopic): torch/wall diagram with a real
  computed foot Q (vector projection of P onto the mirror line, via a footOnLine helper
  generalizing Sec45's footOnRay) and reflection P'=2Q-P, verified numerically so "Q is
  the midpoint of P and P'" holds by construction, not assertion. PASS both languages,
  eye-checked.
- **Sec 53** [PROOF] — foot of the perpendicular: diagram uses a genuine computed line
  (x+4y-1400=0, screen-pixel space) with t and Q derived by the real formula, verified
  Q lands exactly on the line and PQ is perpendicular by dot product; single-column
  symbolic derivation lands on the boxed compact foot formula. PASS both languages,
  eye-checked with extra scrutiny.
- **Sec 54** [PROOF] — image of a point, reflecting a line: continues Sec53 symbolically
  (P'=2Q-P → P'=P+2t(a,b) → boxed coordinate formula, denominator stays raw a²+b², no
  root), pivots via a divider to the reflect-a-line procedure and the m∩ℓ intersection
  shortcut. PASS both languages, eye-checked with extra scrutiny.
- **Sec 55** — foot/image/reflection formula toolkit (9 beats), single-column precedent
  from Sec5/13/22/30/39/47; foot and image formulas paired as matched Chips, the three
  mirror-shortcut formulas (y=x, x-axis, y-axis) grouped with tighter rhythm, closing
  no-square-root guardrail. PASS both languages, eye-checked.
- **Sec 56** — worked: Example 1 foot of perpendicular from P(2,3) to x+y-1=0 → Q(0,1),
  plotted with a genuinely perpendicular PQ segment (dot-product verified); Example 2
  swap trick for y=x, (4,-1)→(-1,4). PASS both languages, eye-checked.
- **Sec 57** — worked: image of P(1,1) in 3x-4y+5=0 → P'(1/25,57/25), both sides'
  distances independently confirmed equal at 0.8 (sign flip +4/-4 confirms opposite
  sides); diagram draws the full P-M-P' perpendicular chord in two matching green
  halves. PASS both languages, eye-checked.
- **Sec 58** — Advanced worked: reflected ray. Optics-to-coordinates: incidence point
  I(6,11/2), reflect A(-5,0) in the mirror to A'(-59/25,-88/25), reflected ray
  41x-38y-37=0 confirmed through both points exactly and on screen via an affine-
  collinearity argument. PASS both languages, eye-checked.
- **Sec 59** — tips, closes Subtopic 7: 2x2 red-trap grid (4 genuinely-named traps in
  the narration, unlike Sec51's lighter layout) + green pro-tip card with a drawn
  mirror/line/image mnemonic, closing into the "Subtopic 7 — complete" chip. Documents
  a genuine data-timing anomaly in the English reveal array (non-monotonic, exceeds
  clip duration) as an upstream quirk — verified clean via Hinglish and a forced-time
  manual seek. PASS (with documented quirk), eye-checked. **Subtopic 7 (secs 52-59)
  complete — chapter is 59/62 (95%) done.**
- **Sec 60** — formula recap I, opens the Chapter Wrap-Up subtopic: 7-card grid
  (borrowed M11Ch04Sec65's 2x3-grid-plus-full-width-7th-card layout geometry, adapted
  to this chapter's own title-always-on beat convention) + closing guardrail. Every
  formula verified byte-for-byte against its source toolkit section (Sec5/13/22),
  deliberately keeping each card's own subscript style (Unicode vs plain digits)
  rather than forcing one convention across all 7. PASS both languages, eye-checked.
- **Sec 61** — formula recap II: same 7-card-grid-plus-guardrail structure, formulas
  verified against Sec30/39/47/55. The chapter's one literal 3x3 determinant (from
  Sec38/39) is flattened to inline pipe-delimited notation for card-width space;
  foot and image formulas visually paired (GREEN, matching typography) as "same
  shape, factor of 2". PASS both languages, eye-checked.
- **Sec 62** — cheat sheet, closes the chapter: 2x4 grid of 8 red mnemonic cards
  (borrowed M11Ch04Sec66's grid-of-cards geometry), the final HIGH-emphasis card
  given a visibly thicker capstone border, closing into a "Straight Lines —
  complete!" chip (extending the chapter's own "Subtopic N — complete" convention
  up one level). Every one-line mnemonic cross-checked against the section that
  actually taught it. PASS both languages, eye-checked. **Subtopic 8 (secs 60-62)
  complete — chapter is 62/62 (100%) done. Chapter 9 "Straight Lines" complete.**

## Chapter complete
All 62 sections authored, `tsc --noEmit` clean, VERDICT PASS (both languages) on every
section, and every section eye-checked via FORCE_SHOTS before commit. No new math-kit
primitives were needed (confirmed at the outset and held true through all 62 sections) —
the chapter composes entirely from `CartesianAxes`/`lineD`/`angleArcD`/`circleD`/`Overline`
plus per-scene `toScreen` helpers, base-kit `arrowD`/`crossD`/`ringD`/`checkD`, and two
from-scratch constructions introduced along the way: the literal 3x3 determinant grid
(Draw bars + T grid, first built in Sec39) and the grid-of-`Card` layout for the three
recap/cheat-sheet closers (Sec60-62, borrowed from M11Ch04's own Sec65/66 precedent).
One data-timing quirk was found and documented rather than worked around: Sec59's English
`board_reveal_at` array is non-monotonic and exceeds the clip's own duration (upstream
Supabase data, not a scene defect) — verified clean via Hinglish and a forced-time manual
seek, following the Sec25/26 precedent for similar (milder) timing quirks earlier in the
chapter.
