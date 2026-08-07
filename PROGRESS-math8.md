# M11 Ch08 — Sequences and Series — scene progress

Worktree: branch `premium-board-math8` · port 3037 · chapter_id `7936f031-5b80-5350-ad08-bc78bef84e12`.
85 sections total (Supabase `lesson_sections`, positions 1–85 — confirmed via `node scratch/dump-math8.mjs` with no args). JSON_LESSONS is stale (10 sections) — **not used**; all content pulled live from Supabase (`board_content`, `segments_english/hinglish`, `board_reveal_at_english/hinglish`, audio URLs). Full cache: `scratch/math8-all.json` (all 85 sections' full rows, `node scratch/dump-math8.mjs 1 2 3...85` regenerates). Concise per-section viewer for planning: `python3 scratch/show.py <positions...>`.

## Subtopics
1. Foundations (sequence/series/sigma) — secs 1–8
2. AP (Arithmetic Progression) — secs 9–22
3. GP (Geometric Progression) — secs 23–37
4. HP (Harmonic Progression) — secs 38–47
5. AM–GM–HM — secs 48–55
6. AGP (Arithmetico-Geometric Progression) — secs 56–64
7. Special Series — secs 65–74
8. Telescoping — secs 75–83
9. Recap/Cheat Sheet — secs 84–85

Flagged derivation sections per task brief (extra eye-scrutiny): 10, 13, 24, 25, 39, 49, 57, 66, 76.

## Chapter-wide notation/style decisions (keep consistent across all 85 sections)
- Per SCENE_AUTHORING_MATHS.md notation audit (already pre-documented before this chapter started): NO new math-kit primitives needed. Sequences are framed as GRAPHS in the content itself ("plot aₙ vs n" for AP → straight line via `CartesianAxes`+`lineD`, discrete dots at integer n; "log aₙ" for GP → straight line, or plot aₙ itself as `curveD` exponential) — use those from Ch02's kit. Telescoping (75–83) uses base kit's `crossD`+`dim` for cancelling terms in a sum.
- `\lim_{n\to\infty}` → write inline "lim (n→∞)", no stacked-bounds attempt.
- `\bar{x}` (mean, later chapters) — not expected in this chapter (that's Ch09/Statistics), but if it appears use the `<Overline>` primitive from math-kit.
- **Beat-index convention** (same as math7): `len(board_content) == len(board_reveal_at_english) == len(board_reveal_at_hinglish)`. When `board_content[0]` is a general section-opening heading, treat it as the always-on title and gate the REST at `beat >= 1 .. beat >= N-1`. Verify this per section before writing.
- Script default: `script={true}` (Kalam) for prose/labels; `script={false}` (Anek, non-script) ONLY when a line contains a literal numeric superscript/subscript digit (Kalam is missing most of those glyphs).
- Minus sign: plain hyphen `-`, never U+2212.
- Red-margin guardrail: short vertical red bar (`M x y1 v h`, RED, sw 3) to the left of a short red caption.
- **Subscript convention (this chapter's `aₙ` is the most-used symbol — glyph-audited via fontTools cmap, both board fonts confirmed MISSING the entire Unicode subscript-letter block, same failure as Ch7's superscript-letter block):** numeric index → real Unicode subscript digit, non-script Anek (`a₁`, `a₂`, `S₅`). Symbolic index → plain underscore, no true subscript positioning (`a_n`, `a_(n-1)`, `a_(n+1)`, `S_n`, `T_n`, `a_p`, `a_q`). Never use the literal `ₙ` glyph even when a raw `board_content` string contains it. See SCENE_AUTHORING_MATHS.md's 8th glyph audit for the full writeup.
- **Per-LINE subscript consistency**: if one formula line mixes a numeric index with a symbolic one (e.g. `a_1 = a_2 = 1, a_n = a_(n-1)+a_(n-2)`), use underscore for EVERY index on that line, even the numeric ones — don't mix real subscript digits with underscore-symbolic on the same line. Only use real subscript digits (`a₁`, `a₂`) on a line that is purely numeric-indexed throughout.
- House palette only: INK, AMBER, AMBER_DARK, GREEN(_DARK), RED, CREAM, MUTED.
- **`arrowD`/`ringD`/`crossD` live in `kit.tsx`, NOT `math-kit.tsx`** (only `roundRectD`/`circleD`/etc. are math-kit) — tripped this up in Sec 6, tsc caught it immediately (unlike math7's Sec4 where only the dev bundler caught a similar mistake).

## Done
(section-by-section log goes here as work proceeds)

## Workflow notes
- Dev server: `nohup npm run dev -- -p 3037 > /tmp/dev-math8.log 2>&1 &`, confirmed READY.
- Data pull: `node scratch/dump-math8.mjs <positions...>` (no args = list all titles/count; with positions = full JSON rows).
- Plan viewer: `python3 scratch/show.py <positions...>` — concise board_content + reveals dump for planning without re-fetching.
- Verify: `PORT=3037 CHAPTER_ID=7936f031-5b80-5350-ad08-bc78bef84e12 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`.
- Registration: single `M11CH08` block appended at END of `src/components/scenes/index.ts` (import + REGISTRY lines).
