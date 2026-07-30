# Ch05 · Work, Energy & Power — scene progress

Branch `premium-board-ch5` · chapter_id `a88de5d2-84e4-5489-878a-f17a195e3267` · port 3005.
Total sections: **66** (from JSON + Supabase, both agree).

Reveals cache: `scratchpad/ch05-reveals.json` (re-fetch: Supabase `lesson_sections`,
columns `board_reveal_at_english` / `board_reveal_at_hinglish`; creds in `.env.local`).
Verify: `PORT=3005 CHAPTER_ID=a88de5d2-84e4-5489-878a-f17a195e3267 node verify-scene.mjs <sec> '<en>' '<hi>' ./shots/sec<M>`.

## Subtopics

| # | Subtopic | Sections | Status |
|---|----------|----------|--------|
| 1 | Foundations: The Scalar (Dot) Product | 1–7 | DONE |
| 2 | Work and the Work-Energy Theorem | 8–17 | DONE |
| 3 | Mechanical Energy: Kinetic and Potential | 18–26 | next |
| 4 | Conservative and Non-Conservative Forces | 27–34 | — |
| 5 | Various Forms of Energy & Conservation of Energy | 35–41 | — |
| 6 | Power | 42–49 | — |
| 7 | Collisions | 50–57 | — |
| 8 | Application: Motion in a Vertical Circle | 58–64 | — |
| 9 | Chapter Recap | 65–66 | — |

## Done

- **Sec 1** — "Two vectors in, one number out": dot machine, trolley push demo,
  A·B = AB cos θ with measured underlines, alignment meter, W/P chips, scalar verdict.
  Audits [] both langs; eye-checked.
- **Sec 2** — "The shadow picture": sun + projection demo, A cos θ chip, shadow×ground,
  three θ case cards (0/90/180), sign-story verdict. Audits [] both langs; eye-checked.
  (hi beats 4→5 only 1s apart — beat-4 delays kept ≤0.8.)
- **Sec 3** — properties + angle-finding drill flowchart + sign-check panel.
- **Sec 4** — toolkit: six formula cards (2×3 grid) + inherited-dimensions verdict.
  (en beats 3/4 last ~1s → `en ? tiny : normal` delays — reusable pattern.)
- **Sec 5** — Ex1 substitution (10 units) + Ex2 NEET zero-dot shortcut with mini plot.
- **Sec 6** — Ex3 find-λ inversion + Ex4 cube body-diagonal 54.7° & projection 5/3.
- **Sec 7** — four pitfalls (crossed vector-answer, sign survival, dot-vs-cross panels,
  zero-dot≠zero-vector) + reflex band. Subtopic 1 (1–7) COMPLETE.
- **Sec 8** — holding a bag = zero work: figure demo, F×0, two-question test, hook wall.
- **Sec 9** — angle writes the sign: auto push + three-panel +/−/0 demo, W = FS cos θ.
- **Sec 10** — suitcase decomposition (F cos θ / F sin θ), work IS a dot product, K, W=ΔK.
- **Sec 11** — CBSE derivation: 5-move flowchart, amber chain-rule box, NET warning.
- **Sec 12** — area under F-x: piecewise curve, signed regions, dW strip proof.
- **Sec 13** — key formulas sheet: 5 cards + units + conversions (eV, kWh trap) + sign rule.
- **Sec 14** — tilted pull (1000 J) + porter staircase (horizontal distance = bait).
- **Sec 15** — JEE Main variable force: graph + ∫(3x²+2x)dx = 80 J → v = 4√5.
- **Sec 16** — JEE Advanced frames: ground +36 J vs train 0 J, both verified, never mix.
- **Sec 17** — four pitfalls + sign-first reflex + SAD-angles chips.
  Subtopic 2 (8–17) COMPLETE — 17/66.

## Notes / gotchas

- `Draw` with `fill=CREAM` renders its fill before the beat (dash anim only hides the
  stroke) — wrap filled Draws in a beat-gated `Fade`.
- Measure exact glyph x-extents with `svgText.getStartPositionOfChar(i)` (viewBox units)
  when underlining/pointing at substrings — estimates are off by ~20px at size 22.
- Hinglish narration is Devanagari-heavy but board labels follow the Ch01/Ch02
  convention: romanized Hinglish, Kalam script font.
- No combining vector-arrow glyphs (U+20D7) anywhere in Ch01/Ch02 — write plain A·B, F·d.
