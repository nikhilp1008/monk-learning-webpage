# Ch05 · Work, Energy & Power — scene progress

Branch `premium-board-ch5` · chapter_id `a88de5d2-84e4-5489-878a-f17a195e3267` · port 3005.
Total sections: **66** (from JSON + Supabase, both agree).

Reveals cache: `scratchpad/ch05-reveals.json` (re-fetch: Supabase `lesson_sections`,
columns `board_reveal_at_english` / `board_reveal_at_hinglish`; creds in `.env.local`).
Verify: `PORT=3005 CHAPTER_ID=a88de5d2-84e4-5489-878a-f17a195e3267 node verify-scene.mjs <sec> '<en>' '<hi>' ./shots/sec<M>`.

## Subtopics

| # | Subtopic | Sections | Status |
|---|----------|----------|--------|
| 1 | Foundations: The Scalar (Dot) Product | 1–7 | in progress |
| 2 | Work and the Work-Energy Theorem | 8–17 | — |
| 3 | Mechanical Energy: Kinetic and Potential | 18–26 | — |
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

## Notes / gotchas

- `Draw` with `fill=CREAM` renders its fill before the beat (dash anim only hides the
  stroke) — wrap filled Draws in a beat-gated `Fade`.
- Measure exact glyph x-extents with `svgText.getStartPositionOfChar(i)` (viewBox units)
  when underlining/pointing at substrings — estimates are off by ~20px at size 22.
- Hinglish narration is Devanagari-heavy but board labels follow the Ch01/Ch02
  convention: romanized Hinglish, Kalam script font.
- No combining vector-arrow glyphs (U+20D7) anywhere in Ch01/Ch02 — write plain A·B, F·d.
