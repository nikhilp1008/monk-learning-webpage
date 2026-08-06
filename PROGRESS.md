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
- **Compound symbolic binomials** (top or bottom is an expression, e.g. `\binom{n-1}{r-1}`): parenthesize the expression, attach directly to `C` — `(n-1)C(r-1)`. Do NOT use Unicode superscript/subscript *letters* (ⁿ, ᵣ) — despite one misleading literal example in SCENE_AUTHORING_MATHS.md, the surrounding rule text is explicit that fonts have no superscript-letter variants, and subscript-r (ᵣ, U+1D63) is an obscure IPA glyph almost certainly missing from both fonts. Never render it.
- **Whole-line-non-script rule**: `script` is a per-`<T>` (whole string) property, not per-character — you cannot mix Kalam prose with an Anek numeric superscript inside one `<T>`. So: if ANY part of a formula line needs a numeric super/subscript digit (e.g. `x²`, `(a+b)⁴`), render the ENTIRE line non-script (Anek) for visual consistency, not just that token. Lines with zero literal numeric exponents stay script (Kalam) per the default above.
- Minus sign in board text: plain hyphen `-`, never U+2212.
- Red-margin guardrail convention: a short vertical red bar (`M x y1 v h`, `RED`, sw 3) to the left of a short (≤~6 word) red caption — same shape as the physics `Ch06Sec1` red-margin note, adapted maths-side.
- QED / checkmark stamps: `checkD`/other draw-path helpers live in **`math-kit.tsx`**, not `kit.tsx` — import from the right module (tripped this up once in Sec 4; tsc did not catch the bad import, only the dev-server bundler did, so a page-render check matters even when tsc is clean).
- Row bands followed loosely: title 30–80, story/setup 90–260, main demo 270–470, verdict/conclusions 480–596 (not a straitjacket, see base spec).
- Multi-row `PascalsTriangle` builds: call it once per row with a 1-element `rows` slice and a manually offset `top = TOP + i*rowHeight`, each with its own `delay` — the component's own `delay` prop is shared by every row passed in one call, so per-row staggering requires separate calls.
- **Beat-index checklist (do this for every section, caught a real off-by-one in Sec 6)**: `len(board_content) == len(board_reveal_at_english) == len(board_reveal_at_hinglish)` always holds — N items map 1:1 to reveal indices `0..N-1`. When `board_content[0]` (seq1) is naturally a section-opening question/heading, treat it as the always-on title and gate the REST at `beat >= 1 .. beat >= N-1` (sections 1–5 pattern). When seq1 is NOT a general title (e.g. Sec 6's two-worked-example sections where seq1 is "Example 1" label and the real title is invented from Supabase's own `title` field, shown separately/always-on), gate ALL N items at `beat >= 0 .. beat >= N-1` instead — don't also burn a slot skipping index 0. Sanity check before writing: count board_content items, count reveals, decide which pattern applies, and make sure the highest `beat >=` used equals `N-1` exactly (not N).
- Title at size 24-26 needs `y ≈ 58-60`, not 55 — a size-24 title at y=55 clipped the safe-area top by 1px in practice (Sec 6 first pass), even though size-26 at y=58 (Sec 1-5) was fine.

## Done
- **Sec 1** — why coefficients are just counting (n-bracket product built term-by-term, 3-box pick-a/pick-b diagram with arrows, generalized term `a^(n-r)·b^r`, boxed landing formula `= nCr`, two red-margin guardrails). Reference exemplar for the rest of the chapter. VERDICT PASS, eye-checked (FORCE_SHOTS), clean.
- **Sec 2** — Pascal's triangle + addition rule. Triangle built row-by-row (n=0..5) via 6 staggered `PascalsTriangle` calls. Ringed 1+2=3 demo, boxed Pascal's-rule formula, two red-margin notes. PASS, eye-checked.
- **Sec 3** — the master formula (`section_type=formulas`): master formula assembled chunk-by-chunk then boxed, `(1+x)^n` expansion (non-script: literal `x²`), `nCr` factorial def, general term boxed, two sum identities, two red-margin notes. PASS, eye-checked.
- **Sec 4** — induction proof [flagged]. Textbook layout: base case (checkmark), inductive hypothesis, multiply-by-(a+b), distribute+reindex (a-part/b-part color-paired), Pascal's-rule combine boxed, QED tombstone. Math hand-verified correct. PASS, eye-checked.
- **Sec 5** — Pascal's rule proved algebraically [flagged] (factorials → common denominator → `(n+1)Cr`, boxed) + triangle rows 0-4 (row 4 ringed) reading off `(a+b)⁴`. Math hand-verified correct. PASS, eye-checked.
- **Sec 6** — two worked examples: `(2x+3)^4` fully expanded with real numeric super/subscript binomial coefficients, boxed answer, x=1 sanity check + checkmark; JEE speed-trap example (crossed-out naive trinomial count 66 vs correct perfect-square insight → 21 terms, boxed). Caught+fixed an off-by-one beat-index bug here (see workflow notes). Math hand-verified correct. PASS, eye-checked.

Pushed to origin through Sec 5 (Sec 6 committed locally, next push ~Sec 10).

## Workflow notes
- Dev server: `nohup npm run dev -- -p 3036 > /tmp/dev-math7.log 2>&1 &`, confirmed READY.
- Data pull: `node scratch/dump-math7.mjs <positions...>` (no args = list all titles/count; with positions = full JSON rows for those positions). Uses `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` from env or repo defaults.
- Verify: `PORT=3036 CHAPTER_ID=ad7f3197-f77b-5be6-8581-f5372ffb7797 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`.
- Registration: single `M11CH07` block appended at END of `src/components/scenes/index.ts` (import + REGISTRY lines; ES module imports hoist regardless of textual position).
- `npx tsc --noEmit` shows 4 pre-existing errors in `src/app/learn/page.tsx` — unrelated, not ours (per task brief); only check no *new* errors appear.
