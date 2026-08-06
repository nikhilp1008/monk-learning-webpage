# Ch05 (Math) · Linear Inequalities — scene progress

Branch: premium-board-math5 · port 3034 · chapter_id 7bc767a8-c36f-5f5c-93f5-fb8337ffd7f5
Total sections: 43 (confirmed 43=43 against Supabase `lesson_sections`).
Data: JSON_LESSONS/Class11_Math/m11_ch05_linear-inequalities_full.json (matches Supabase 1:1,
safe to use); full Supabase dump cached at scratch/ch05_math_sections.json (board_content,
segments_english/hinglish, board_reveal_at_english/hinglish, durations — refetch with
scratch/get-ch05-math-sections.mjs if session restarts).

THIS IS MATHS — read SCENE_AUTHORING_MATHS.md (esp. Notation §, HalfPlaneShade/wavyCurveD/checkD)
before base SCENE_AUTHORING.md before math-kit.tsx. This is the FIRST Class 11 Math chapter to
get real scene files — no M11 prefix existed before this branch; no math reference exemplar
exists yet either, so Sec 1 sets the pattern others copy from.

NAMING: files M11Ch05SecN.tsx, component M11Ch05SecN; registered at END of index.ts:
  const M11CH05 = "7bc767a8-c36f-5f5c-93f5-fb8337ffd7f5";
  REGISTRY[`${M11CH05}:N`] = M11Ch05SecN;

Verify per section:
`PORT=3034 CHAPTER_ID=7bc767a8-c36f-5f5c-93f5-fb8337ffd7f5 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`
Done only on `VERDICT sec=<N>: PASS`. Eye-check every half-plane shade against its test point and
every wavy-curve sign against the actual inequality — verifier catches collisions, not wrong math.

## Subtopics
1. One Variable Inequalities — secs 1–12
2. Two Variable Inequalities (half-planes) — secs 13–23
3. Applications & Word Problems — secs 24–32
4. Non-Linear Inequalities (Wavy-Curve Method) — secs 33–41
5. Recap (42) + Cheat Sheet (43)

Flagged for extra scrutiny: Sec 17 (CBSE half-plane derivation), and any section with real
geometric construction (half-plane shading, wavy-curve sign charts).

## Done
- [x] Sec 1 — Equation vs inequality: two-column number-line comparison (point vs
      interval), POINT/INTERVAL guardrail chips, erase → real-life examples + stamp.
      Reference exemplar for this chapter. VERDICT PASS both langs.
- [x] Sec 2 — Hollow/filled dot notation (x>2 vs x≥2, two stacked lines) → erase →
      sign-flip rule: -2<3 →×(-1)→ 2>-3 with the flipped ">" in red, red-margin
      guardrail, reflection diagram (crossing arcs -2→2, 3→-3, red image dots).
      VERDICT PASS both langs.
- [x] Sec 3 — Definitions (A rel B skeleton, 4 symbol chips strict/non-strict,
      solution set on a line, 'linear'=power1 with x²/1/x/|x| crossed) → erase →
      safe moves (add/subtract demo, ±chips, cross-multiply/square guardrail).
      VERDICT PASS both langs.
- [x] Sec 4 — Seven-step algorithm as a running worked example, (2x+1)/3≥x-1
      carried through all 7 steps (STEPS|EXAMPLE two-column), landing on x≤4,
      (-∞,4] on a number line. Caught+fixed: divider bled into the beat-7
      diagram text on first render (eye-check, verifier doesn't gate text-vs-
      stroke) — shortened it to stop before row 7. VERDICT PASS both langs.
- [x] Sec 5 — Formal proof (accumulating, no erase): order-means-b-a-positive
      axiom boxed, c(b-a)<0 boxed, distribute chase, a<b BUT ca>cb (red), boxed
      QED conclusion. Swapped an unaudited long-double-arrow glyph for the
      safe-listed ⇔ and used "Q.E.D." instead of the unaudited ∎ mark.
      VERDICT PASS both langs.
- [x] Sec 6 — Compound inequality skeleton (p ≤ expr ≤ q), same-move-both-ends
      arrows, negative-multiply guardrail, concrete demo 1≤x≤4 →×(-1)→
      -1≥-x≥-4 re-read as -4≤-x≤-1, classic-error caption. VERDICT PASS both.
- [x] Sec 7 (formulas) — Reference card: 4 order axioms (label|formula rows,
      the negative-multiply one in red), general form ax+b>0 with a hand-drawn
      piecewise bracket for the two a>0/a<0 cases, three-language equivalence
      (mini number line, set-builder, interval), bracket-rule guardrail.
      VERDICT PASS both langs. SUBTOPIC 1 (One Variable) 7/12 done.
- [x] Sec 8 (worked ex) — 3(2x-1)≥2(x+3)-5 solved top-to-bottom (distribute →
      collect → ÷4 → x≥1) with a boxed green answer chip, then represented on
      a number line (filled dot at 1, shaded to +∞). VERDICT PASS both langs.
- [x] Sec 9 (worked ex, SPEED TRAP) — -7≤(3-2x)/4<5: ×4, -3, then ÷(-2) stages
      the tempting un-flipped "15.5≤x<-8.5" chip, crosses it out ("impossible"
      caption), lands the correctly flipped (-17/2, 31/2]. VERDICT PASS both.
- [x] Sec 10 (worked ex) — 3x-2>4 AND 2(x-1)≤x+3: one shared number line with
      two amber half-shades overlapping into a green (2,5] intersection bar,
      then integers 3,4 marked and counted to sum=12. Caught+fixed a real
      text-vs-chip visual overlap the automated check doesn't gate (only
      text-vs-text) via eye-check on the screenshot. VERDICT PASS both.
- [x] Sec 11 (worked ex, JEE Adv) — a(x-1)<2x+3 for every x: 3-case-analysis
      cards (a>2, a<2 both crossed out as half-lines, a=2 wins with 0<5 true
      for every x), boxed a=2 answer. Caught+fixed a bad import (checkD lives
      in math-kit not kit — tsc didn't flag it, only the dev-server bundler
      did; runtime-check every new section, don't trust tsc alone for cross-
      module re-exports). VERDICT PASS both langs. SUBTOPIC 1: 11/12 done.
- [x] Sec 12 (tips) — 5 pitfall rows (tick + text, negative-flip in red first),
      pro-tip callout (test a number inside the interval), worked sanity
      check reusing Sec 9's answer (-17/2,31/2], x=0 ⇒ 0.75, -7≤0.75<5 ✓.
      VERDICT PASS both langs. **SUBTOPIC 1 (One Variable) DONE — 12/12.**

### Subtopic 2 (Two Variables / half-planes)
- [x] Sec 13 — First 2-var section: CartesianAxes, boundary line x+y=4 drawn,
      3 sample points ((1,1) origin-side, (2,2) on the line, (5,3) far side),
      REGION-not-point guardrail, then BOTH half-planes shaded via two
      HalfPlaneShade calls (test points (0,0) and (6,~3)) + region labels.
      Eye-verified shading matches all 3 sample points' actual sides.
      VERDICT PASS both langs.
- [x] Sec 14 — Budget-region story (register ₹40, pen ₹20, ₹120): 40x+20y≤120
      simplified to 2x+y≤6, sample valid pairs (3,0)/(2,1) plotted, region
      shaded via HalfPlaneShade, an outside point (3,3) fails the test, then
      the origin explicitly tested (0≤6 ✓) as the guardrail's "one point"
      trick. Swapped an unaudited ✗ glyph for plain text. VERDICT PASS both.
- [x] Sec 15 — The four working rules: two-column RULES|PICTURE, one evolving
      mini-diagram (boundary line → style legend → test point+shade → 2nd
      line for system/intersection), erase → first-quadrant restriction +
      origin-fails guardrail (crossed origin, (1,0) alternative).
      **Found and fixed a real bug: `npx tsc --noEmit` had been silently
      skipping semantic checking (missing-export errors) for the WHOLE
      project since before this session started, because a pre-existing
      syntax error in src/app/learn/page.tsx (stray `);` orphaned by the
      streamTurn deletion in commit e16b531) made tsc bail out of full
      checking. Fixed that stray fragment — tsc now genuinely gates.
      This means Sec 11 and Sec 15's kit/math-kit import-boundary mistakes
      were only ever caught by the dev-server bundler via verify-scene.mjs,
      not by tsc — the verify step was the real safety net all along.**
      VERDICT PASS both langs.
- [x] Sec 16 — Bounded/unbounded/empty as 3 sketch panels (triangle, open
      quadrilateral, two non-touching shapes + ∅), erase → corner-points
      triangle (P,Q,R vertices) + Class-12-LP guardrail + solid⇔filled /
      dotted⇔hollow legend + closing callback. VERDICT PASS both langs.
- [x] Sec 17 (FLAGGED — CBSE derivation) — Formal proof that ax+by>c (b>0) is
      the half-plane above ax+by=c: PROOF|DIAGRAM two-column, P(α,β) on the
      line, Q(α,γ) directly above, boxed key step aα+bγ>aα+bβ=c, regions I/II
      labeled, red-margin QED conclusion. Hand-verified: P lies exactly on
      the line, Q sits strictly above it, and regions I/II fall on the
      correct sides algebraically. Caught+fixed the diagram's x-axis visibly
      crossing through the guardrail chip (shrank yBottom 520→470, moved the
      chip below it) — another text/shape-vs-stroke case tsc/verifier don't
      gate, eye-check only. VERDICT PASS both langs.
- [x] Sec 18 (formulas) — General inequality form ax+by(≤≥<>)c, intercept
      formula (c/a,0)/(0,c/b), shoelace area for the concrete 3-vertex case
      using native numeral subscripts (x₁y₂−x₂y₁+...) instead of Σ-with-i/i+1
      (no 2-D bounds primitive exists), cyclic-order guardrail.
      VERDICT PASS both langs.
- [x] Sec 19 (worked ex) — 2x+3y≤12 graphically: intercepts (6,0)/(0,4)
      plotted, solid boundary (≤ included), origin tested (0≤12 ✓), region
      shaded via HalfPlaneShade, final region label. Annotations placed
      directly on the graph rather than a separate caption column.
      VERDICT PASS both langs.
- [x] Sec 20 (worked ex, SPEED TRAP) — y>2x: origin lies ON the boundary
      (useless test), so (1,0) is tried and fails (crossed), (0,1) confirms
      (checked), dotted line (strict >), region shaded via HalfPlaneShade.
      Caught+fixed a real kit/math-kit import mix-up (crossD) — tsc genuinely
      caught it this time. VERDICT PASS both langs.
- [x] Sec 21 (worked ex) — x+y≤4, x≥1, y≥0: three boundary lines drawn,
      triangle shaded (exact polygon, vertices computed not guessed), all
      three vertices found by pairwise intersection and labeled in place
      ((1,0), (4,0), (1,3)), red-margin "bounded triangle" conclusion.
      VERDICT PASS both langs.
- [x] Sec 22 (worked ex, JEE Adv) — x+y≤6, x+2y≤8, x≥0, y≥0: quadrilateral
      (0,0),(6,0),(4,2),(0,4) found vertex by vertex (tighter-bound reasoning
      + solving the two slant lines), exact shaded polygon, cyclic list,
      shoelace sum 0+(6·2)+(4·4)+0=28, boxed Area=14 sq units.
      VERDICT PASS both langs.
- [x] Sec 23 (tips) — 4 pitfall rows (origin-on-line first, red; line style;
      wrong-side shading; union-vs-intersection), pro-tip callout, worked
      callback check reusing Sec 22's quadrilateral: test (1,1) against all
      four constraints, region confirmed. VERDICT PASS both langs.
      **SUBTOPIC 2 (Two Variables) DONE — 11/11.**

### Subtopic 3 (Applications & Word Problems)
- [x] Sec 24 — TRANSLATE→SOLVE→INTERPRET framework (3 boxes+arrows, TRANSLATE
      ringed amber as the hard step), translation dictionary (at least/more
      than/no more than → ≥/>/≤), guardrail, Diwali sweet-shop constraint
      chips, hidden-constraints closing note. VERDICT PASS both langs.
- [x] Sec 25 — Phrase-to-symbol dictionary (6-row table matching the JSON's
      own diagram exactly) → erase → 3 modeling rules (define variable+units,
      one-condition-one-inequality, hidden domain), "between a,b is strict"
      guardrail, units-carry-through closing note. VERDICT PASS both langs.
- [x] Sec 26 — Five-step vertical flowchart (matches JSON diagram exactly,
      step 5 green) with a moving amber spotlight highlight across steps
      1-2 then 3-4 (pure prop-driven color change, no re-animation), words-
      vs-symbols guardrail (201 boxes vs bare x≥200, crossed), mixture-setup
      preview. Caught+fixed two real bugs: heading caption overlapping box 1
      (shifted flowchart down), and a Hinglish caption overflowing the safe
      area (moved to full-width bottom placement). VERDICT PASS both langs.
- [x] Sec 27 (formulas) — Average template (sum/n ≥ A) and mixture/
      concentration template (((a/100)V+(b/100)y)/(V+y)), both boxed;
      double-inequality-in-y note; V+y>0 guardrail (clearing fractions never
      flips). Fractions flattened inline per notation guide (no stacked-
      fraction primitive exists). VERDICT PASS both langs.
- [x] Sec 28 (worked ex) — Triangle perimeter (longest=2×shortest,
      third=shortest+2, perimeter≥42): 5-step routine worked left-to-right
      (x+2x+(x+2)≥42 → 4x+2≥42 → x≥10), triangle diagram with sides labeled
      x/2x/x+2 on the right. Caught+fixed the guardrail chip visually
      overlapping the triangle (shape-vs-shape, not verifier-gated) — confined
      it to the left column. VERDICT PASS both langs.
- [x] Sec 29 (worked ex) — Consecutive odd naturals >10, sum<40: solved to
      10<x<19, then the hidden-domain trap — x must be an odd natural, so
      only {11,13,15,17} qualify, NOT the whole interval. Number line: open
      circles at 10/19, filled odd dots inside. Caught+fixed a real bug:
      literal "&gt;"/"&lt;" text rendered on the board because HTML entities
      inside a JS string argument to t() are never decoded (only entities
      written directly as JSX text get decoded by the parser) — swapped for
      raw >/< characters. Audited all other sections for the same pattern,
      none found. VERDICT PASS both langs.
- [x] Sec 30 (worked ex, JEE Main) — Acid mixture: 600mL 20% + y mL 50%,
      result between 30-40%, applies Sec 27's mixture template directly:
      0.30<(120+0.5y)/(600+y)<0.40, cleared by the positive total (no flip),
      split to y>300 and y<1200, boxed answer 300<y<1200 mL.
      VERDICT PASS both langs.
- [x] Sec 31 (worked ex, JEE Adv) — Workshop LP bridge: 2x+3y≤36, x+2y≤22,
      x,y≥0. Exact feasible quadrilateral shaded, all 4 vertices found and
      labeled ((0,0),(18,0),(0,11),(6,8) — the joint-constraint vertex in
      green), Z=30x+50y evaluated at each (0, 540, 550, 580=MAX), boxed
      answer. First real preview of Class 12 Linear Programming.
      VERDICT PASS both langs.
- [x] Sec 32 (tips) — 5 pitfall rows (comparison-word misreading first, red;
      underline-then-symbol; hidden domain; interpret-back; "between"
      strictness), pro-tip (plug a scenario back in), worked callback check
      reusing Sec 28's triangle: x=10, perimeter=42≥42 ✓.
      VERDICT PASS both langs. **SUBTOPIC 3 (Applications) DONE — 9/9.**

### Subtopic 4 (Non-Linear / Wavy-Curve Method)
- [x] Sec 33 — First use of wavyCurveD in the chapter. Act 1 (linear=one
      flip demo, invalid-method chips crossed) erased at beat 3 → Act 2:
      critical points chop the line (regions I-IV, erased at beat 6), sign-
      constant guardrail, wavy curve for (x-1)(x-3)(x+2) at roots -2,1,3,
      multiplicity guardrail. Hand-verified the curve's sign pattern
      (−,+,−,+ left to right) against the actual factored signs — matches
      exactly. Fixed several tight/overlapping vertical-spacing estimates
      before verifying (ring overshoot vs labels, curve amplitude vs
      guardrail chips). VERDICT PASS both langs.
- [x] Sec 34 — Factor normalization ((x-r), positive coefficient; (3-x)=
      -(x-3)), hand-drawn cross-vs-touch-bounce mini-diagram (odd root
      crosses via a diagonal line, even root touches via a shallow arc,
      since wavyCurveD can't represent a non-crossing root), even-
      multiplicity guardrail, denominator-always-open icon+guardrail,
      numerator-closed-only-if-non-strict icon+caption. Caught+fixed another
      kit/math-kit IntervalDot import mix-up via tsc. VERDICT PASS both.
- [x] Sec 35 — Six-step algorithm as a left-aligned numbered list (long
      lines don't center well), closing on the quadratic outside/between
      shortcut with a hand-drawn parabola (a(x-α)(x-β): + outside roots, −
      between). Caught+fixed +/- sign labels overlapping the guardrail chip
      — shifted the whole diagram down 35px for clearance. VERDICT PASS both.
- [x] Sec 36 (formulas) — Modulus results |x|<a/|x|>a each with a mini number
      line (interval vs two rays, side by side for direct comparison),
      squared-form bridge, quadratic between/outside boxed (extends Sec 35),
      no-real-roots guardrail. Caught+fixed a real rendering bug: mixing
      literal JSX text with a mid-line {t(...)} call rendered "or" glued to
      the following word with no visible gap ("orx") — consolidated each
      line into a single t() call instead. VERDICT PASS both langs.
- [x] Sec 37 (worked ex) — x²-x-6>0 factored to (x-3)(x+2), roots -2/3,
      positive leading coefficient ⇒ outside. Real sampled parabola (10
      points from the actual function values, scaled) touching the axis
      exactly at both roots, dipping below between them, shaded rays outside,
      boxed answer (-∞,-2)∪(3,∞), strict-endpoints guardrail.
      VERDICT PASS both langs.
