# M11 Ch07 — Binomial Theorem — scene progress

Worktree: branch `premium-board-math7` · port 3036 · chapter_id `ad7f3197-f77b-5be6-8581-f5372ffb7797`.
47 sections total (Supabase `lesson_sections`, positions 1–47 — confirmed via `scratch/dump-math7.mjs` with no args). JSON_LESSONS is stale (10 sections) — **not used**; all content pulled live from Supabase (`board_content`, `segments_english/hinglish`, `board_reveal_at_english/hinglish`, audio URLs). Full cache: `scratch/math7-all.json` (all 47 sections' full rows, `node scratch/dump-math7.mjs 1 2 3...47` regenerates).

## Subtopics
1. Binomial Expansion & Pascal's Triangle — secs 1–8
2. General/Middle/Independent Terms — secs 9–15
3. Greatest Term & Coefficient — secs 16–21
4. Properties & Summation — secs 22–27
5. Any Index & Approximations — secs 28–33
6. Applications (Divisibility/Remainders) — secs 34–39
7. Multinomial Theorem — secs 40–45
8. Recap/Cheat Sheet — secs 46–47

Flagged for extra eye-scrutiny per task brief: induction proof (secs 4–5), any-index/multinomial derivations (secs 28–33, 40–42).

## Chapter-wide notation/style decisions (keep consistent across all 47 sections)
- **Script default**: `script={true}` (Kalam) for everything by default, matching house style — title, labels, formulas, captions. `script={false}` (Anek) ONLY when the text contains an actual numeric superscript/subscript **digit** glyph (e.g. `⁵C₃`, `x²`) — Kalam is missing most of those glyphs, Anek has full coverage.
- **Symbolic exponents/indices** (`n`, `r`, `n-r`, not literal numbers): plain caret text, e.g. `a^(n-r)`, `(a+b)^n` — no attempt at true superscript positioning for letters (font has no superscript-letter variants). Caret `^` is plain ASCII, safe in either font, either script mode.
- **Numeric exponents/combinations** (literal digits, e.g. `⁵C₃`, `x²`): real Unicode super/subscript digits, non-script (Anek) `T`.
- **`\binom{n}{r}` symbolic** (variables): plain inline `nCr` text (no stacked form). **Numeric** (`\binom{5}{3}`): `⁵C₃` real super/subscript digits, non-script.
- Minus sign in board text: plain hyphen `-`, never U+2212.
- Red-margin guardrail convention: a short vertical red bar (`M x y1 v h`, `RED`, sw 3) to the left of a short (≤~6 word) red caption — same shape as the physics `Ch06Sec1` red-margin note, adapted maths-side.
- Row bands followed loosely: title 30–80, story/setup 90–260, main demo 270–470, verdict/conclusions 480–596 (not a straitjacket, see base spec).

## Done
- **Sec 1** — why coefficients are just counting (n-bracket product built term-by-term, 3-box pick-a/pick-b diagram with arrows, generalized term `a^(n-r)·b^r`, boxed landing formula `= nCr`, two red-margin guardrails). Reference exemplar for the rest of the chapter. VERDICT PASS, eye-checked (FORCE_SHOTS), clean.

## Workflow notes
- Dev server: `nohup npm run dev -- -p 3036 > /tmp/dev-math7.log 2>&1 &`, confirmed READY.
- Data pull: `node scratch/dump-math7.mjs <positions...>` (no args = list all titles/count; with positions = full JSON rows for those positions). Uses `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` from env or repo defaults.
- Verify: `PORT=3036 CHAPTER_ID=ad7f3197-f77b-5be6-8581-f5372ffb7797 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`.
- Registration: single `M11CH07` block appended at END of `src/components/scenes/index.ts` (import + REGISTRY lines; ES module imports hoist regardless of textual position).
- `npx tsc --noEmit` shows 4 pre-existing errors in `src/app/learn/page.tsx` — unrelated, not ours (per task brief); only check no *new* errors appear.
