# Scene Authoring — MATHEMATICS (Class 11/12)

This is the **Maths layer** on top of `SCENE_AUTHORING.md`. Everything in the base
spec still applies unchanged — the canvas contract (Step 1), the layout /
box-estimation / non-overlap math (Step 3), the label-arrow-ring precision rules
(Step 4), the one-hand choreography (Step 5), the pure-function-of-time engine and
**blank-board contract** (Step 6), and the verify gate (Step 7). Read that first.
This file changes the **domain**: who is teaching, what goes on a maths board, the
notation, and the new geometry primitives (`math-kit.tsx`).

Maths uses `math-kit.tsx` (number lines, Venn diagrams, nested-set boxes, rounded
boxes) on top of `kit.tsx`.

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
- **No true 2-D math yet** (stacked fractions, `lim`/`Σ` with sub/superscript
  bounds, integral signs) — Chapter 1 doesn't need it; when a chapter that does
  (Limits & Derivatives, Statistics) starts, add a `Frac`/stacked-bounds primitive
  to `math-kit.tsx` then, verified the same way. Until it exists, flatten inline
  (`p/q`, `Σ n(A)` prefix-style) — that covers everything in Sets.
- Hinglish board text stays **Latin script** (house style, inherited from
  physics/chem) — and all of the above symbols are language-agnostic, so a
  formula is byte-identical between the English and Hinglish boards; only the
  surrounding prose labels differ.

---

## math-kit quick reference

Path generators (feed to `<Draw d={…}/>`): `circleD` (arc-based circle, usable
both as a drawn outline and inside a clip/mask), `axisD` (number-line shaft +
arrowhead), `tickD`, `roundRectD` (rounded-rect outline, for nested-set boxes).

Components: `<IntervalDot x y open />` (open = hollow ring, closed = filled dot —
get this right per the interval's bracket), `<VennShade include exclude fill />`
(shades the exact boolean region — circles listed in `include` are intersected,
circles in `exclude` are subtracted — real SVG clip-path/mask composition, not
hand-eyeballed overlap art), `<NestedSets levels />` (concentric labeled boxes for
number-set containment, outer-to-inner order = the JSON's nesting order).

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
