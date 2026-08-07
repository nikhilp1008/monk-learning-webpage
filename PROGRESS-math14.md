# Ch14 (Math) · Probability — scene progress

Branch: premium-board-math14 · port 3037 · chapter_id 35830227-5b8e-5d97-a032-a5f775c28b07
Total sections: 43 (confirmed 43=43 against Supabase `lesson_sections`; JSON_LESSONS is stale
at 10 sections — ignore it per task brief). Full Supabase dump cached at
scratch/ch14/all_sections.json; scratch/ch14/dump.py <N> prints one section's board_content +
english narration for quick review.

THIS IS MATHS — read SCENE_AUTHORING_MATHS.md before base SCENE_AUTHORING.md before
math-kit.tsx. Chapter needs ZERO new math-kit primitives (already documented ahead of this run,
commit cbf5391): event algebra / addition-rule derivation = VennShade carve-ups like Ch1 Sec20/
Sec28; multi-outcome sample spaces (two dice, 36 pairs) = hand-placed T/Chip grid like Ch6's
counting-principle work; combinatorics reuses Ch6-7's nCr numeric/symbolic conventions.

NAMING: files M11Ch14SecN.tsx, component M11Ch14SecN; registered at END of index.ts:
  const M11CH14 = "35830227-5b8e-5d97-a032-a5f775c28b07";
  REGISTRY[`${M11CH14}:N`] = M11Ch14SecN;

Verify per section:
`PORT=3037 CHAPTER_ID=35830227-5b8e-5d97-a032-a5f775c28b07 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`
Done only on `VERDICT sec=<N>: PASS`. Eye-check every Venn shading against the actual event
algebra and every sample-space count against the real combinatorics.

## Subtopics
1. Sample Space & Events — secs 1–14
2. Probability of Events & the Axiomatic Approach — secs 15–28
3. Computing Probabilities (Combinatorial Methods, Multi-Event Addition, Odds) — secs 29–39
4. Formula Recap, two parts — secs 40–41
5. Cheat Sheet, two parts — secs 42–43

Sections 40-43 have NO segments_english/hinglish in Supabase (expected — TWO formula_recap +
TWO cheat_sheet sections, one pair per unit). Use board_content directly for all four; reveal
timestamps still come from board_reveal_at_english/hinglish.

Flagged for extra scrutiny (axiom-derivation / JEE Advanced): 13, 21, 22, 23, 27, 37.

## Log
- **Sec 1** — concept, opens the chapter: anchor contrast (cannot-predict ✗ /
  can-list ✓ chips) + 3 everyday-experiment chips, guardrail crosses out
  "2+3=5" (not random, no uncertainty) — erased once vocabulary starts.
  OUTCOME defined via a single "4" die-card, then the full die roster
  S={1..6} builds card by card (n(S)=6 chip), coin roster H/T below
  (n(S)=2), closing tagline ringed. PASS both languages, eye-checked via
  FORCE_SHOTS — die roster and ring both confirmed correct.
