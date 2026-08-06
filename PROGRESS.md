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
