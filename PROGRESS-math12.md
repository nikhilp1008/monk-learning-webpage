# Progress — M11 Chapter 12: Limits and Derivatives

chapter_id: `b5fa886e-012b-5425-9399-a8249254a151`

**35/35 sections complete.** JSON_LESSONS was stale (10 sections vs the real 35) and was
ignored per the task brief — all narration/board content pulled directly from Supabase
`lesson_sections`. All 35 sections confirmed clean; sections 34-35 have no
`segments_english`/`segments_hinglish` (expected — recap/cheat-sheet sections have no new
narration, only board text authored fresh).

This chapter is why `<Frac>` and `<Limit>` exist in math-kit.tsx (added just before this run,
per the prior commit "Extend math-kit for Chapters 12-13"). Every "lim" on the board uses
`<Limit>`; every compound-numerator fraction (the derivative definition above all) uses
`<Frac>`. Ninth glyph audit (already logged in SCENE_AUTHORING_MATHS.md before this run):
σ ψ ↦ fall back but are safe; `□` (end-of-proof mark) has no primitive, skipped as decorative.

Subtopics: 1-7 Limits: Concepts & Algebra · 8-14 Standard Limits · 15-21 Derivatives & First
Principle · 22-27 Rules of Differentiation · 28-33 Limits at Infinity & Special Cases ·
34-35 Recap/Cheat Sheet.

## Authorship model

Sections 1-3 authored directly to establish house style for this chapter (first real use of
`<Frac>`/`<Limit>` in production). The three sections flagged in the brief for extra scrutiny
— **Sec 10** (Squeeze Theorem geometric proof), **Sec 17** (first-principle derivations of
x^n/sin x/e^x), **Sec 23** (quotient-rule derivation + trig-table completion + chain-rule
rigor) — were also authored directly, with exact coordinate/slope verification worked by hand
in each file's header comment before a single pixel was drawn. Sec 34 (formula recap) and
Sec 35 (cheat sheet) were authored directly as the chapter's capstone. All other sections
(4-9, 11-16, 18-22, 24-33) were delegated to Sonnet subagents with self-contained briefs
(full board_content + narration + suggested visual arc), then independently re-verified by
reading their actual rendered screenshots — not just trusting their PASS reports — before
registration and commit.

## New primitives / techniques introduced or reinforced this chapter

- `<Frac>`/`<Limit>` (math-kit) — used in nearly every section; see SCENE_AUTHORING_MATHS.md
  for the full usage rule (compound numerator → Frac, simple single-term → flatten inline).
- The "piecewise brace has no primitive" rule (already documented) got its first real
  exercise: Sec 30's 3-case degree rule renders as a small 2-column×3-row mini-table instead
  of a hand-drawn `\begin{cases}` brace — reusable pattern for any future piecewise formula.
- `StepFunction` (already in kit) got its first real workout in Sec 28's greatest-integer
  staircase — confirmed correct dot convention: filled/closed at each step's left (lower-x)
  end, hollow/open at the right, matching floor(x) = n on [n, n+1).
- Currency-symbols (₹, $, €) confirmed native/legible in Sec 22's chain-rule-as-unit-
  cancellation analogy — no glyph issues, safe to reuse.
- Five "four traps + two pro-tips" sections across the chapter (Sec 7, 14, 21, 27, 33) — same
  2×2 red-margin grid + green/amber banner pattern reused deliberately for series
  recognition; this is now a well-worn, reliable motif for any `tips` section type.

## A few worth flagging for a future eye (not blocking, all PASS)

- Sec 26 ("three nested layers", sin(cos(x²))) has the densest single formula chain in the
  chapter — verified correct by hand but worth a fresh look if this chapter is ever revised.
- Sec 34 (formula recap) is the single densest board in the whole chapter (9 rows, one with
  6 sub-facts) — took real iteration to fit legibly; if any future edit touches this file,
  re-run `FORCE_SHOTS=1` and eyeball every fact again before trusting the geometry verifier
  alone (it catches overlap, not correctness).

## Verification

Every section individually passed `verify-scene.mjs` (`VERDICT sec=N: PASS`, both languages,
0 overlaps/overflow/empty) at commit time. A post-hoc live smoke test re-verified 8 sections
spanning every subtopic and both authorship paths (1, 5, 10, 15, 20, 25, 30, 35) fresh
against the running dev server — all still PASS. Full-chapter `npx tsc --noEmit` is clean.
File count (35) = import count (35) = registry count (35), sequential 1-35, no gaps.

## Wrap-up

- Pushed to `premium-board-math12` throughout (every ~5 sections, plus a final push).
- No outstanding known issues. Chapter is complete and ready for review/merge.
