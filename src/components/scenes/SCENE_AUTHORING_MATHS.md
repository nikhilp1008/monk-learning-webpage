# Scene Authoring — MATHEMATICS (Class 11/12)

This is the **Maths layer** on top of `SCENE_AUTHORING.md`. Everything in the base
spec still applies unchanged — the canvas contract (Step 1), the layout /
box-estimation / non-overlap math (Step 3), the label-arrow-ring precision rules
(Step 4), the one-hand choreography (Step 5), the pure-function-of-time engine and
**blank-board contract** (Step 6), and the verify gate (Step 7). Read that first.
This file changes the **domain**: who is teaching, what goes on a maths board, the
notation, and the new geometry primitives (`math-kit.tsx`).

Maths uses `math-kit.tsx` (number lines, Venn diagrams, nested-set boxes, rounded
boxes, Cartesian axes, function-graph curves/steps) on top of `kit.tsx`.

## Data source — check before trusting `JSON_LESSONS`

For Chapter 1 the `JSON_LESSONS/Class11_Math/*.json` file's `sections` matched
Supabase `lesson_sections` 1:1 (37 = 37). **That is not guaranteed.** Chapter 2's
JSON file has only 10 coarse outline sections while Supabase actually has 28 —
the JSON was an earlier, less granular draft; Supabase is the real, current,
authoritative source. Confirm the section count matches (`select=position` from
`lesson_sections`, count the rows) **before** trusting the JSON for narration.
When Supabase has more sections than the JSON (or a mismatched count at all),
pull everything directly from `lesson_sections` instead — recent rows already
carry `board_content` (= the old `board_events`) and `segments_english` /
`segments_hinglish` (the full narration transcript) alongside the reveal
timestamps and audio URLs, so the JSON isn't even needed in that case.

---

## Who you are

You are a **veteran Class 11/12 maths teacher — the one every JEE/CBSE student
remembers** because you never let a step happen off-screen. A weak teacher writes
the final identity and says "you can verify this." You **derive it in front of the
student**, term by term, and you **show** a definition before you state it — a set
becomes a drawn Venn region, an interval becomes a marked stretch of the number
line, a formula grows on the board exactly in the order the logic demands. If a
section could be replaced by a textbook page with captions, it has failed.

### The structured flow — driven by the JSON's own `section_type`

The lesson JSON already labels every section's type; let that label set the arc
instead of guessing:

- **`concept`** — Anchor (the question / the trap everyone falls into) → Represent
  (put the correct object on the board: a set, an interval, a diagram — drawn, not
  stated) → Explain the move (the reasoning, step by step) → Land the result
  (boxed/stamped) → Guardrail (the common mistake, ringed in red — the JSON's own
  `note`/`red-margin` board events usually **are** this guardrail; render them as
  ringed or boxed asides, not just another text line).
- **`worked_examples`** — given → set up the right mathematical object (roster the
  set, plot the interval, state the equation) → work it step by step, one algebraic
  move per beat, nothing skipped → answer boxed → sanity check. The JSON itself
  flags **"speed trap"** sections — stage the wrong/tempting answer, cross it out
  in red, then land the correct one; that reversal *is* the beat, not a footnote.
- **`formulas`** — build the identity live: don't fade in the finished formula,
  assemble it (term arrives, then next term, then the equals sign, then the
  result) in the order the derivation actually proceeds — same discipline as
  chemistry "balance coefficient by coefficient."
- **`tips`** — a rapid sequence of ringed/boxed pitfalls, one per beat, each with a
  wrong-vs-right pair if the JSON's note implies one (see `{0}` vs `∅` in Sets §3).
- **`formula_recap` / `cheat_sheet`** — a grid of boxed formulas, revealed in the
  same order as the chapter taught them (a "notes page" moment, not new teaching).

---

## What goes on a maths board — the visual vocabulary

Ask the same question as always ("what is the teacher *doing*?") with a
**mathematician's hand**:

- **Build the object, don't state it.** A set is written `{...}` with its members
  or rule appearing one at a time; an interval is a *drawn* marked segment on a
  number line with the correct dot style at each end (open vs closed — get this
  right, it is the single most common exam mistake in interval questions); a Venn
  diagram is drawn (circles, then the label, then the shading) before it is
  reasoned about.
- **Derive, don't declare.** Every algebraic step is its own beat — an equation
  transforms left-to-right in front of the student (`n(A∪B) = n(A)+n(B)` appears,
  *then* `− n(A∩B)` arrives with a reason). Skipping a step because "it's obvious"
  is a failed beat, same as chemistry skipping a mechanism arrow.
- **Diagram beats formula; formula beats prose** (same priority ladder as the base
  spec, restated for this domain): a Venn shading answers "which region" faster
  than an equation does; reach for the picture first, then write the symbol form.
- **Cross out the wrong answer before landing the right one** — this is maths'
  version of chemistry's "guardrail," and the JSON's own "speed trap" sections are
  built around exactly this beat.
- **Numbers count on the board, not in the narration** — cardinality problems
  (`n(A∪B) = ...`) should show tally marks / a counted list / a filled Venn with
  numbers dropped into each region, the same way a physics counter counts up.

### Representations by topic (Chapter 1 "Sets" — extend per chapter as it starts)

- **Sets & notation** — roster braces `{1, 2, 3}` built element by element;
  set-builder `{x : P(x)}` with the colon read as "such that"; membership `a ∈ A`.
- **Number sets & nesting** — concentric/nested boxes (`NestedSets`) for
  ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ (see Notation below for why these render as **plain letters**,
  not blackboard-bold).
- **Intervals** — a drawn number line (`axisD` + `IntervalDot` open/closed +
  a thickened `Draw` span between the two dots).
- **Subsets / power set** — nested boxes or a short enumerated list of chips (no
  new primitive needed — `Chip` from the base kit already does this).
- **Venn diagrams & set operations** — two- and three-circle Venns (`circleD` +
  `VennShade`) — draw the circles, label them, *then* shade the asked-for region;
  shading is computed by the kit (real SVG clip/mask), never hand-approximated.
- **Cardinality / inclusion–exclusion** — a shaded Venn with the count written
  inside each region, built up region by region as the formula is derived.

Future chapters will need their own additions here (a Cartesian-axes primitive
for Relations & Functions, a unit circle for Trigonometry, an Argand plane for
Complex Numbers, a number-line-with-inequality-shading variant for Linear
Inequalities, and so on) — add them to `math-kit.tsx` when that chapter starts,
the same way chemistry grew `chem-kit.tsx` chapter by chapter rather than
front-loading every representation on day one.

---

## Notation — READ THIS BEFORE WRITING A SINGLE SYMBOL

Maths lesson JSON is different from physics/chemistry in one important way: its
`text` fields (and `formula`-type events' `latex` field) contain **raw LaTeX
source** — `\in`, `\subseteq`, `\mathbb{R}`, `\emptyset`, `\text{...}`, `\qquad`.
The board is a plain SVG `<text>` element, not a LaTeX renderer. **Never copy a
`\command` onto the board literally** — translate it first.

A font-glyph audit (`Anek Latin` + `Kalam`, the two board fonts, both fetched at
weight 400 from `next/font/google`) found that **almost none of the blackboard-
bold / set-theory codepoints are actually in either font file**. Chromium still
renders them via **per-glyph system-font fallback** rather than a broken/tofu box
— so they are not invisible — but the fallback is a crisp system sans, and next to
`Kalam`'s cursive handwriting it visibly clashes (verified by rendering a real
sample through the project's own Playwright/Chromium and inspecting the
screenshot). Rule of thumb:

- **Blackboard-bold number sets (ℕ 𝕎 ℤ ℚ ℝ ℂ, and the JSON's non-standard 𝕋 for
  irrationals) — DO NOT USE.** Write **plain letters instead: `N`, `W`, `Z`, `Q`,
  `R`, `C`**, optionally followed by a short parenthetical the first time
  (`R (reals)`). This is not a downgrade — a real teacher's hand doesn't draw
  blackboard-bold on a physical board either; plain letters are *more* authentic
  to the "hand-drawn lecture" conceit, and they render in the house typeface
  instead of a mismatched fallback.
- **Operators — safe to use as-is** (render via fallback, legible, mathematically
  unambiguous, and ubiquitous enough that hand-drawing them every beat would be
  an unreasonable authoring burden): `∈ ∉ ⊆ ⊂ ⊇ ⊃ ∪ ∩ ∅ △ → ⇒ ⇔ Σ`. Use them
  freely in text; just don't stack them into anything that needs true 2-D layout
  (see below).
- **Confirmed native to both fonts, no fallback:** `≤ ≥ ≠ ± √ π ° ² … ∞` and plain
  subscript/superscript digits.
- **Forbidden, same as chemistry:** combining marks over letters (e.g. the vector
  arrow U+20D7) — true tofu, not just a style clash.
- **`\text{...}`** → plain words. **`\qquad` / `\quad`** → a visual gap (put the
  two things in separate `T`/`Chip` calls with real x-distance between them, don't
  try to encode the space as characters). **`\textstyle`** → ignore, it's a
  LaTeX typesetting hint with no board meaning.
- **Stacked fractions and `lim` now exist** (`<Frac>`, `<Limit>` — added for
  Chapter 12, see the kit reference below). Keep flattening inline (`p/q`)
  for simple fractions where the numerator/denominator are each a single
  term — only reach for `<Frac>` when flattening would genuinely hurt
  readability (a compound numerator, e.g. Chapter 12's derivative
  definition `(f(x+h)-f(x))/h`). `Σ` with sub/superscript bounds and true
  integral notation still don't have a primitive — still flatten those
  (`Σ` prefix-style) until a chapter's content forces the issue.
- **`\frac{a}{b}` / `\tfrac{a}{b}`** → flatten inline as `a/b` (same rule as
  Chapter 1's `p/q`) unless the fraction is the star of the beat (a derivative
  definition, a probability) — that case is still future work, see above.
- **`\left`, `\right`, `\big`** (and similar sizing commands) → pure LaTeX
  typesetting hints, no board meaning — drop the command, keep the delimiter
  character itself (`\left(` → `(`).
- **`\mathrm{...}`** → same treatment as `\text{...}`, plain words/letters.
- **`\underbrace{expr}_{label}`** → no 2-D brace primitive exists (or is
  planned) for this; substitute a ringed/labeled callout instead — `ringD`
  or an arrow from a `T` label pointing at the relevant part, using the base
  spec's Step 4 targeting math. Don't invent a new stacked-brace primitive for
  what's usually a single occurrence per chapter.
- **Prefer a glyph that's actually native over a fallback near-equivalent**:
  set difference `\setminus` → write it the Chapter-1 way, `A − B` (plain
  hyphen-minus, native to both fonts), not `A ∖ B` (U+2216, missing from both
  fonts). "Divides"/"such that" `\mid` → plain `|` (U+007C, native), not `∣`
  (U+2223, missing). Both pairs look identical on the board; only one of each
  pair avoids the fallback-font clash.
- **Second glyph audit (Chapter 2, Relations & Functions)** — floor brackets
  `⌊ ⌋`, multiplication `× ·`, Greek `α`, and `⋯` were checked the same way.
  `× ·` are native to both fonts, use freely. `⌊ ⌋ α ⋯` fall back (same
  legible-but-mismatched category as `∈ ∪ ∩` from Chapter 1) — safe to use,
  no plain-glyph substitute exists for floor brackets or Greek letters the
  way there was for blackboard-bold, so accept the fallback there.
- **Third glyph audit (Chapter 3, Trigonometry)** — `≈` and `°` are native to
  both fonts. `θ ω ∓` fall back (same accept-it category as `α` — Greek
  letters have no plain-letter substitute, unlike blackboard-bold). `θ` is
  the chapter's single most-used symbol; use it freely despite the fallback,
  there's no real alternative.
- **`\begin{gathered} ... \\ ... \end{gathered}`** (seen throughout Chapter 3's
  formula sections) is simpler than it looks — it's just multiple centered
  lines stacked, NOT a braced system. Drop `\begin{gathered}`/`\end{gathered}`,
  treat each `\\`-separated chunk as its own line/beat (or its own row in a
  formula card) — no new primitive needed, this is standard multi-line
  `Chip`/`T` layout. (A true `\begin{cases}` piecewise brace hasn't appeared
  yet — if one does, that's the point to consider a hand-drawn brace
  primitive, not before.)
- **`\xrightarrow{label}`** (an arrow with a condition above it, e.g. "square"
  over a squaring step) → base kit's `arrowD` plus a `T` label positioned
  above it, same idea as chemistry's `ReactionArrow` — don't build a new
  primitive for what appeared once.
- **Known data bug, Chapter 3 specifically**: 13 `board_content` strings
  contain a double-escaped em/en dash — the literal six-character sequence
  backslash-u-2-0-1-4 (or -2013), not an actual dash character. Copying it
  verbatim would put that raw escape text on the board. Read it as an em/en
  dash and just write a plain hyphen (`-`) instead, consistent with the
  existing Chapter 1 convention for set difference. Worth a quick scan for
  the same bug in later chapters' `board_content` too.
- **Fourth glyph audit (Chapter 4, Complex Numbers)** — `∠ ρ φ β` all fall
  back, same accept-it category as the other Greek letters/angle symbol
  already covered — no plain substitute exists, use as-is.
- **`\bar{z}` / `\overline{z}` (conjugate, and later `\bar x` for a mean)**:
  the combining overline mark is tofu in the board fonts, exactly like
  physics's combining vector-arrow (U+20D7) problem. Use the new
  `<Overline>` primitive (math-kit) instead — a real drawn bar above the
  glyph, positioned from the same text-box-top formula the base spec
  already uses for label math. This is genuinely drawing it, which is more
  in-character for a hand-drawn board than any Unicode trick would be.
- **`\vec{OP}` / `\vec{AB}` (position vectors)**: don't try to render a
  combining arrow over two letters at all — you're almost always drawing
  the actual vector as an arrow (`arrowD` from the base kit) between two
  plotted points anyway, so just label it with the plain letters ("OP")
  near the arrow. The drawn arrow carries the "this is a vector" meaning;
  the text doesn't need to.
- **`\underbrace{...}_{n}` for a term count** (e.g. "97 copies of 1"): same
  ringed/labeled-callout substitute as before — don't build a brace
  primitive for this.
- **Fifth glyph audit (Chapter 5, Linear Inequalities)** — `γ`, `≶`
  (lessgtr), `✓` (checkmark) all fall back. `γ` joins the accept-it Greek
  list. For `≶` (used as a generic "insert < or >" placeholder), prefer
  spelling it out as words ("< or >") — clearer anyway, and sidesteps the
  fallback entirely. For `✓`, use the new `checkD` primitive (a real drawn
  stroke) instead — it's common enough across worked-example/tips sections
  to be worth drawing rather than relying on the mismatched fallback glyph.
- **`\boxed{...}`** → wrap the content in a `Chip` (or a plain bordered
  rect), same idea as chemistry's boxed final answer — no new primitive.
- **Sixth glyph audit (Chapters 6-7, Counting & Binomial Theorem)** — `÷ ∫`
  are native to both fonts. `≡ ∝ λ` fall back (`λ` joins the Greek
  accept-list; `≡` and `∝` are fine to use directly, or for `≡` specifically
  you can lean on the accompanying "(mod n)" label to carry the meaning and
  just use `=`, either is fine).
- **Important font gap found while auditing this: `Kalam` (the script font)
  is missing almost all superscript/subscript DIGITS** (only ¹²³ present;
  ⁰⁴⁵⁶⁷⁸⁹ and every subscript digit ₀-₉ are missing), while `Anek Latin`
  (the sans/body font, `<T script={false}>`, the default) has **full**
  superscript/subscript digit coverage. This matters because `Chip`
  defaults to `script={true}` (Kalam) — a chip showing something like "x²"
  or a numeric subscript will hit the fallback in Kalam even though the
  identical glyph is native in Anek. **Rule: any numeric superscript/
  subscript goes in non-script (Anek) text.** If a Kalam-styled callout
  needs one, don't rely on the Unicode digit — use two `T` calls at
  computed offsets instead (small text above/below the baseline, same idea
  as any hand-placed label).
- **`\binom{n}{r}` (nCr/nPr) — the single most common symbol in Chapters 6-7,
  read this before writing either chapter.** No new primitive; two cases:
  - **Numeric** (`\binom{5}{3}`, `\binom{9}{6}`, etc. — the common case in
    worked examples): write it as real superscript+subscript digits around
    the letter, "⁵C₃" / "⁹P₆" style (the Indian-curriculum convention the
    content itself already reaches for — see `C_r=\binom{n}{r}` used as a
    running shorthand throughout Chapter 7). Native to Anek per the digit
    coverage above — use non-script `T`, not a Chip.
  - **Symbolic** (`\binom{n}{r}`, `\binom{n-1}{r-1}`, etc. — variables, not
    literal numbers): just write "nCr" / "ⁿ⁻¹Cᵣ₋₁" as plain inline text,
    no attempt at true superscript positioning for arbitrary letters (the
    fonts don't have small-caps/superscript letter variants, and hand-
    computing an unverified offset for this composite risks a worse result
    than plain text). This matches how the content itself already
    abbreviates to `C_r` after the first definition — don't re-derive the
    stacked form every time either.
- **Chapter 6's circular permutations reuse `pointOnCircle` directly**
  (place n objects at n evenly-spaced angles, `2π/n` apart) — confirms the
  general pattern: check what a chapter needs before assuming a new
  primitive is required. Chapter 6 needed zero math-kit additions.
- **Chapters 8-9 (Sequences & Series, Straight Lines) also needed zero new
  primitives** — don't assume a diagram-sounding section title (AP's
  "staircase", GP's "chessboard") implies a bespoke visual before checking
  `board_content`: both chapters explicitly frame their sequences as
  **graphs** ("plot aₙ vs n and you get a straight line", "log aₙ plots as a
  straight line") — exactly `CartesianAxes` + `lineD`/`curveD` from Chapter
  2. Straight Lines is pure coordinate geometry end to end: points, lines,
  angles, distances, loci and reflections all compose from `CartesianAxes`/
  `lineD`/`angleArcD`/`circleD`/base-kit `crossD`+`dim` (for telescoping
  cancellation) — nothing new needed. Two chapters in a row with zero
  additions is a good sign the kit now covers most of the subject's visual
  vocabulary; keep checking each new chapter rather than assuming that
  holds forever.
- **`\lim_{n\to\infty}`** (Chapter 8, two occurrences) — too rare there to
  justify a primitive at the time; inline "lim (n→∞)" was fine. **Update
  (Chapter 12)**: `\lim` is that chapter's central, constantly-repeated
  notation, so it got a real primitive — see `<Limit>` below. Use `<Limit>`
  whenever `lim` appears more than a couple of times in a chapter; inline
  text remains fine for a one-off.
- **`\hat{n}`** (Chapter 9, unit normal vector) — same resolution as
  `\vec`: don't render a combining hat accent, draw the actual unit vector
  as a real short arrow and label it with the plain letter ("n").
- **Seventh glyph audit (Chapters 8-9)** — `⊥` (perpendicular, central to
  Chapter 9) falls back, no substitute exists, use as-is. `ℓ` (script L, a
  line's name) and `Δ` are native to Anek; `Δ` is missing from Kalam
  specifically (same "prefer non-script text" rule as the digit-coverage
  finding) while `ℓ` is fine in both.
- **`\bar{x}` reappears in Chapter 9** (centroid mean) — same `<Overline>`
  primitive from Chapter 4, first real cross-chapter reuse of it.
- **Chapter 10 (Conic Sections)** needed one new primitive: `ellipseD` (a
  circleD generalized to independent x/y radii). Parabola and hyperbola
  curves do NOT get a dedicated path generator — sample points off the real
  equation (both have a simple parametrization) and thread them through
  `curveD`, same as any smooth graph. The "one cone, four slices" intro
  concept (sections 1-2) is a one-off illustration, not a repeated need —
  hand-draw a simple stylized double-cone (two triangles meeting at a
  point) with plain `lineD`, don't build a primitive for a single diagram.
- **Chapter 11 (3D Geometry) needed a real new system**: `project3D` +
  `<ThreeDAxes>`, the standard NCERT oblique/cavalier projection (+Y right,
  +Z up, +X down-left toward the viewer, foreshortened since it represents
  depth). This is the convention behind every textbook "eight octants"
  diagram. Verified by rendering the axes plus labeled test points for
  three octants and confirming they land in the geometrically correct
  regions (octant I "+++" up-right, octant VII "−−−" its mirror down-left,
  octant II "−++" further up-right since its negative x *reinforces* the
  positive y/z pull rather than opposing it) — this was the highest-risk
  primitive added so far (three sign/direction choices that could each
  independently be backwards) and is worth extra scrutiny if any future
  chapter's 3D content looks visually "off" in a way that's hard to
  pinpoint. **Note Chapter 11's unusual structure**: it's a merge of what
  were originally separate NCERT topics — an "Applications" unit (secs
  1-12, centroid/collinearity/locus) complete with its own formula-recap/
  cheat-sheet checkpoint (secs 13-14, mid-chapter, not at the end), THEN
  the coordinate-axes/octants content begins (secs 15-37). **Correction**:
  secs 1-12 are 3D, not 2D as originally assumed here — Sec 1 intro-frames
  the centroid with a vague "balance point" analogy and no explicit
  coordinates (easy to misread as 2D from that alone), but secs 5/8's
  actual derivation and worked example use full `(x,y,z)` triples
  throughout (e.g. centroid of `A(2,-1,4), B(6,3,-2), C(1,4,5)`) — use
  `project3D`/`ThreeDAxes` for all of secs 1-12 too, not `CartesianAxes`.
  **Lesson: don't conclude a subtopic's dimensionality (2D vs 3D, or any
  similar classification) from its intro section alone** — intro sections
  are often deliberately vague/analogy-driven; check a formula or worked-
  example section from the same subtopic before deciding. The chapter ends
  on a plain `tips` section (37) with no closing recap/cheat-sheet at all —
  don't expect the usual last-two-sections pattern for this one.
- **Eighth glyph audit (Chapter 8, Sequences & Series) — subscript LETTERS,
  read this before writing a single formula, `aₙ` is this chapter's most
  common symbol.** Checked via `fontTools` cmap inspection of the actual
  Anek Latin / Kalam font files (same rigor as the earlier Chromium-render
  audits): the whole Unicode subscript-letter block (`ₐ ₑ ᵢ ⱼ ₖ ₗ ₘ ₙ ₒ ₚ ᵣ ₛ
  ₜ ᵤ ᵥ ₓ`) is **missing from BOTH fonts** — same failure mode as the
  superscript-letter block already forbidden in Chapter 7 (`ⁿ ᵣ`). Numeric
  subscript digits (`₀-₉`) remain fine in Anek only, per the existing
  digit-coverage rule. Resolution, extending the Chapter 7 numeric/symbolic
  split to subscripts: **numeric index → real Unicode subscript digit,
  non-script Anek** (`a₁`, `a₂`, `S₅` — already used freely elsewhere in the
  codebase, e.g. `E₁`, `z₁`, `P₁`); **symbolic index → plain underscore
  text, no attempt at true subscript positioning** (`a_n`, `a_(n-1)`,
  `a_(n+1)`, `S_n`, `T_n`, `a_p`, `a_q`) — parenthesize a compound index the
  same way Chapter 7 parenthesized compound binomial subscripts. Do not
  reach for the Unicode subscript-n glyph (`ₙ`, U+2099) anywhere, even
  though a few `board_content` strings in this chapter's Supabase rows use
  it directly — translate it to `_n` on the board, same as any other
  raw-LaTeX-shaped source text that needs translating before it's legible
  in-font.
- Hinglish board text stays **Latin script** (house style, inherited from
  physics/chem) — and all of the above symbols are language-agnostic, so a
  formula is byte-identical between the English and Hinglish boards; only the
  surrounding prose labels differ.
- **Ninth glyph audit (Chapters 12-13, Limits & Derivatives / Statistics)** —
  `σ ψ ↦ □` all fall back (`σ`/`ψ` join the Greek accept-list; `↦` is fine
  used directly; `□` — likely a QED/end-of-proof mark in the source — has
  no primitive, either accept the fallback or skip the mark entirely, it's
  decorative, not load-bearing).
- **`\lim` and stacked fractions finally got real primitives** (Chapter 12)
  — see `<Limit>`/`<Frac>` in the kit reference below. This is the payoff
  of Chapter 1's original deferral: wait until a chapter's content actually
  needs 2-D math layout, then build it, verified the same way as every
  other primitive (render it, check nothing overlaps/misaligns) rather
  than guessing the right offsets up front.

---

## math-kit quick reference

Path generators (feed to `<Draw d={…}/>`): `circleD` (arc-based circle, usable
both as a drawn outline and inside a clip/mask), `axisD`/`xAxisD`/`yAxisD`
(number-line / axis shaft + arrowhead), `tickD`, `roundRectD` (rounded-rect
outline, for nested-set boxes), `lineD` (straight segment — linear/identity/
constant function pieces), `curveD(points)` (smooth curve through an ordered
point list via Catmull-Rom — for polynomial/parabola graphs; **sample enough
points near the curvature you want visible** — a shallow parabola sampled too
coarsely near its vertex will legitimately look almost straight, that's the
real shape, not a kit bug).

Components: `<IntervalDot x y open />` (open = hollow ring, closed = filled dot —
get this right per the interval's bracket), `<VennShade include exclude fill />`
(shades the exact boolean region — circles listed in `include` are intersected,
circles in `exclude` are subtracted — real SVG clip-path/mask composition, not
hand-eyeballed overlap art), `<NestedSets levels />` (concentric labeled boxes for
number-set containment, outer-to-inner order = the JSON's nesting order),
`<CartesianAxes originX originY xLeft xRight yTop yBottom />` (x/y axes with
arrowheads + integer-spaced ticks — the default frame for any function graph;
draw the function's own curve on a later beat than the axes), `<StepFunction
steps />` (a list of `{x1,x2,y,leftOpen,rightOpen}` flat segments with jump-
discontinuity dots — covers signum, greatest-integer/floor, or any piecewise
function with the same primitive), `<UnitCircleDiagram cx cy r theta />` (the
circle + faint axes + radius line to the point at angle theta + drop
perpendiculars showing cos θ/sin θ as coordinates — `theta` in radians,
standard math convention, verified counterclockwise on screen).

Path generators for trig: `pointOnCircle(cx,cy,r,theta)` (returns `{x,y}` —
use this to place angle labels, not hand computation), `angleArcD(cx,cy,r,
theta1,theta2)` (the arc marking a swept angle — verified sweep direction),
`waveD(x0,x1,y0,amplitude,pxPerRadian,phaseShift,fn)` (samples `fn` — default
`Math.sin`, pass `Math.cos` for cosine — and threads it through `curveD`; NOT
for tan/cot/sec/csc, which have asymptotes a single curve would wrongly
bridge — draw those branch by branch instead).

`<Overline x y size textWidth anchor script />` — a real drawn bar above a
glyph/word (conjugate `z̄`, later a mean `x̄`) instead of the tofu combining
mark; `x`/`y`/`size`/`anchor`/`script` must match the `<T/>` call it sits
above.

`<HalfPlaneShade x1 y1 x2 y2 testX testY />` — shades the side of a line
containing a given test point, clipped to a bounding box (real SVG clip
composition — verified correct on both sides of the same line with
different test points before trusting it). Use the test point the section's
own reasoning uses (often the origin) so the shading matches the narration.

`wavyCurveD(roots, y, amplitude, xLeft, xRight, aboveOnRight)` — the
snaking curve for the wavy-curve method (non-linear/rational inequalities),
alternating above/below a number line at each root; verified to alternate
correctly and cross exactly at each marked root. Mark each root with
`IntervalDot` (open/closed per whether it's included), same as any interval
endpoint. `aboveOnRight` comes from the leading coefficient's sign per the
method — get this from the actual inequality, don't guess.

`checkD(x, y, size)` — a drawn checkmark stroke (feed to `<Draw/>`), for
sanity-check stamps in worked examples — safer than the fallback `✓` glyph.

`<PascalsTriangle cx top rows on />` — the triangular layout for Pascal's
triangle, one row per beat (`rows` is your own precomputed number arrays;
this only handles centering/positioning, verified to form a correctly
centered diamond).

`ellipseD(cx, cy, rx, ry)` — a closed ellipse outline (circleD generalized
to two radii), feed to `<Draw/>`. For parabola/hyperbola branches, sample
points off the real equation and use `curveD` instead — no dedicated
generator, both are simple open-curve parametrizations.

`project3D(x, y, z, originX, originY, scale)` + `<ThreeDAxes originX
originY scale axisLen />` — the standard NCERT oblique/cavalier 3D
projection (+Y right, +Z up, +X down-left toward the viewer, foreshortened).
Plot any 3D point with `project3D`, then connect/label with the usual 2D
primitives (`lineD`, `T`) on top. Verified against three octants' expected
positions before trusting it — this is the highest-risk primitive in the
kit (three independent sign/direction choices), worth extra scrutiny if a
future 3D scene looks subtly wrong.

`<Frac x y size numerator denominator width />` — a real stacked fraction
(numerator, bar, denominator), for compound fractions where flattening to
`a/b` inline would hurt readability. `<Limit x y size condition anchor />`
— "lim" with its condition ("h→0", "x→∞") stacked beneath, standard
textbook layout. Both verified by rendering a real derivative definition
(`f'(x) = lim(h→0) [f(x+h)-f(x)]/h`) and checking every piece lines up
before trusting them.

**Complex Numbers (Chapter 4) reuses the trig primitives almost entirely** —
the Argand plane is `<CartesianAxes>` with "Re"/"Im" labels instead of
x/y (no new primitive needed for that alone); polar form, De Moivre's
theorem, and nth-roots-of-unity are all `pointOnCircle`/`angleArcD`/`circleD`
at whatever radius `r = |z|` instead of the unit circle's r=1; position
vectors are the base kit's `arrowD` from one plotted point to another. This
is the intended shape of things — a topic's diagrams should mostly compose
from what already exists; only add a new primitive (like `Overline` above)
when something genuinely doesn't fit the existing vocabulary.

**Probability (Chapter 14, the last chapter) needed zero new primitives** —
a fitting capstone, since it pulls together three earlier chapters'
primitives directly: event algebra and the addition-rule derivation are
`VennShade` carve-ups exactly like Chapter 1 (`A∪B = A∪(B−A)`, disjoint
pieces shaded and summed); multi-outcome sample spaces (e.g. two dice,
36 ordered pairs) are the same hand-placed `T`/`Chip` grid Chapter 6 used
for Cartesian products; combinatorial counting reuses the nCr conventions
from Chapters 6-7. Confirms the pattern held for the whole subject, not
just a lucky run of a few chapters.

All obey the base engine rules: gate every element on its beat (`on={beat >= k}`),
board blank at t=0 (title always-on only), stagger with `dl(k, d)`, `dim`
superseded steps rather than deleting them.

---

## Maths definition of done

Everything in the base "Definition of done" (blank at t=0, no overlaps, arrows
land 5px off target, both languages, `VERDICT: PASS`), **plus**:

- Every mathematical object is **built**, not pasted whole — set members/roster
  entries arrive one at a time, Venn circles draw before they're shaded, formulas
  assemble term by term in derivation order.
- No blackboard-bold letters anywhere on the board (see Notation) — plain letters
  only, checked by eye since the verifier can't catch a font-style clash.
- Every interval endpoint's dot style (open/closed) is eye-checked against its
  bracket — a filled dot on an open interval is a defect the geometry verifier
  cannot see (it's stylistically valid SVG, just mathematically wrong).
- Worked examples that are JSON-flagged as a "speed trap" actually stage and
  cross out the tempting wrong answer before landing the right one — a section
  that skips straight to the correct answer has dropped the pedagogical point.
- Reference exemplars once they exist (first verified sections of Ch1 become the
  `Ch01Sec1`-equivalent to copy from, same as physics/chemistry).
