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
- **Two-line same-color text stacks (e.g. a 2-line red-margin note) need ≥ 40px between baselines at size 14-16**, not ~20px — hit this overlap twice (Sec 16, Sec 19) with a 20px gap; box height for Kalam at size15 is ~27px, so 20px gap collides. Default to 32-40px baseline spacing for any two stacked same-block lines from the start instead of discovering it via a failed verify run.

## Done
- **Sec 1** — why coefficients are just counting (n-bracket product built term-by-term, 3-box pick-a/pick-b diagram with arrows, generalized term `a^(n-r)·b^r`, boxed landing formula `= nCr`, two red-margin guardrails). Reference exemplar for the rest of the chapter. VERDICT PASS, eye-checked (FORCE_SHOTS), clean.
- **Sec 2** — Pascal's triangle + addition rule. Triangle built row-by-row (n=0..5) via 6 staggered `PascalsTriangle` calls. Ringed 1+2=3 demo, boxed Pascal's-rule formula, two red-margin notes. PASS, eye-checked.
- **Sec 3** — the master formula (`section_type=formulas`): master formula assembled chunk-by-chunk then boxed, `(1+x)^n` expansion (non-script: literal `x²`), `nCr` factorial def, general term boxed, two sum identities, two red-margin notes. PASS, eye-checked.
- **Sec 4** — induction proof [flagged]. Textbook layout: base case (checkmark), inductive hypothesis, multiply-by-(a+b), distribute+reindex (a-part/b-part color-paired), Pascal's-rule combine boxed, QED tombstone. Math hand-verified correct. PASS, eye-checked.
- **Sec 5** — Pascal's rule proved algebraically [flagged] (factorials → common denominator → `(n+1)Cr`, boxed) + triangle rows 0-4 (row 4 ringed) reading off `(a+b)⁴`. Math hand-verified correct. PASS, eye-checked.
- **Sec 6** — two worked examples: `(2x+3)^4` fully expanded with real numeric super/subscript binomial coefficients, boxed answer, x=1 sanity check + checkmark; JEE speed-trap example (crossed-out naive trinomial count 66 vs correct perfect-square insight → 21 terms, boxed). Caught+fixed an off-by-one beat-index bug here (see workflow notes). Math hand-verified correct. PASS, eye-checked.
- **Sec 7** — Example 3 [JEE Main]: coeff of x³ in (1+x)(1-2x)^5 via product split, general term computes both needed coefficients, boxed −40. Example 4 [JEE Adv]: consecutive-ratio formulas solved to n=7, r=2, red-margin verify 7C1:7C2:7C3=7:21:35=1:3:5 + checkmark. Math verified. PASS.
- **Sec 8** — subtopic 1 closer, `section_type=tips`: 2×3 grid of colored callout boxes (4 red traps: off-by-one term count, whole-bracket exponent, sign alternation, term-vs-index; 2 green pro-tips: x=1 sum check, nCr symmetry). PASS, eye-checked. **Subtopic 1 (secs 1-8) complete.**
- **Sec 9** — general term as catalogue lookup: boxed T(r+1)=nCr a^(n-r)b^r, 3 chips (given/balance-point/cancels), red-margin m-th-term rule, mini-example. PASS.
- **Sec 10** — middle/independent term intuition: seat-row diagrams (n=6 even→1 middle, n=5 odd→2 middles), tug-of-war diagram on exponent of x meeting at net=0, 3 red-margin guardrails. PASS.
- **Sec 11** — specific-term machinery (`formulas`): general term simplified to net exponent E(r)=p(n-r)-qr boxed, set-E(r) rules, middle-index formula, red-margin from-the-end rule, glossary. PASS.
- **Sec 12** — specific-term algorithm: numbered 5-step procedure (step 4 boxed: solve+validate), parity explanation, boxed r-formula, red-margin don't-expand tip. PASS.
- **Sec 13** — two worked examples: 6th term of (2x+3/x)^9=489888/x boxed; independent term in (x²-1/x)^9→r=6→T7=84 boxed; red-margin sign trap. Math hand-verified correct. PASS.
- **Sec 14** — two worked examples: middle term T4 of (3x/2-1/3x)^6=-5/2 boxed; matching coeff of x^7/x^-7 across two (…)^11 expansions collapses via 11C5=11C6 to ab=1, boxed. Verified the superscript-minus glyph (⁻ U+207B) actually renders (non-zero width in Anek, confirmed via a Playwright glyph-width probe) — screenshots of it just look subtle at review resolution, not a bug. Math hand-verified. PASS.
- **Sec 15** — subtopic 2 closer, `tips`: 2×3 grid (4 red traps: off-by-one, odd-n-two-middles, E(r) sign, non-integer/out-of-range r; 2 green tips: solve-then-validate, memory-aid mnemonic). PASS. **Subtopic 2 (secs 9-15) complete.**
- **Sec 16** — opens subtopic 3: two-column comparison (greatest coefficient vs numerically greatest term), boxed ratio formula, rise-peak-fall bar chart, red-margin sign-alternation caveat. PASS.
- **Sec 17** — formulas (`formulas`): peak-coefficient formula, boxed ratio-test formula, boxed shortcut-k formula for (1+x)^n, red-margin integer/tie rule, greatest-coefficient ratio for (1+λx)^n, glossary. PASS.
- **Sec 18** — boxed proof nCr/nC(r-1)>1 iff r<(n+1)/2, 3-step NGT algorithm, red-margin algebraic-greatest edge case for (a-b)^n. PASS.
- **Sec 19** — Example 1: 12C6=924 boxed. Example 2: NGT in (1+4x)^8 at x=1/2 → tie at r=6, T6=T7=1792 boxed, red-margin |x| vs |4x| trap. Math hand-verified. PASS.
- **Sec 20** — Example 3: greatest coeff of (1+2x)^6 = c4=240 boxed (not the middle term). Example 4: (4-3x)^8 at x=1 — |T4| numerically largest but negative, compare positive neighbours T3/T5 → algebraically greatest=T5, boxed. Math hand-verified. PASS.
- **Sec 21** — subtopic 3 closer, `tips`: 2×3 grid (4 red traps, 2 green tips incl. k-formula mnemonic). PASS. **Subtopic 3 (secs 16-21) complete — chapter is now half done (21/47).**
- **Sec 22** — opens subtopic 4: hub-and-spoke diagram, boxed identity (1+x)^n=ΣCr x^r as central "machine", fan-out arrows to 4 satellite results (x=1, x=-1, d/dx, ∫). PASS.
- **Sec 23** — dense `formulas` reference: sum family, index-shift, weighted sums, reciprocal sums, square/product sums incl. Vandermonde. PASS.
- **Sec 24** — 4-technique toolkit (title itself names them): boxed substitution/integration/compare formulas, limits caveat, red-margin meta-tip. PASS.
- **Sec 25** — Example 1: x=1/x=-1 added to isolate C0+C2+...=2^(n-1), boxed. Example 2: index-weighted sum → n=10 → 5120, boxed. Math verified. PASS.
- **Sec 26** — Example 3: reciprocal-weight sum, n=5 → 21/2, boxed. Example 4: (1+x)^n(1+x)^n symmetry proof of ΣCr²=(2n)Cn, n=4 → 70=8C4, boxed. Math verified. PASS.
- **Sec 27** — subtopic 4 closer, `tips`: 2×3 grid (4 red traps, 2 green tips; fixed a text-overflowing-its-box cosmetic issue with a two-line layout). PASS. **Subtopic 4 (secs 22-27) complete.**
- **Sec 28** [flagged] — opens subtopic 5: boxed generalized falling-factorial nCr formula, number-line diagram with open dots at ±1 shading the convergence region, two red-margin guardrails. PASS.
- **Sec 29** [flagged] — dense `formulas` reference: boxed master series (1+x)^n, general term, the "standard four" ((1±x)^-1, (1±x)^-2), general (1-x)^-p, boxed small-|x| approximation. **Caught and fixed a real superscript-letter violation** (⁻ᵖ) via a chapter-wide glyph audit (`grep -nP '[\x{207F}\x{2090}-\x{209C}\x{1D2C}-\x{1D6A}]'`) before commit — worth re-running this audit periodically.
- **Sec 30** [flagged] — three labeled MOVE blocks (factor/identify/approximate), two boxed formulas, red-margin Taylor's-theorem justification. PASS.
- **Sec 31** [flagged] — Example 1: (1+x)^-2 first four terms boxed. Example 2: coeff of x^4 in (1-2x)^-3 via general series, p=3/y=2x → 240, boxed. Math verified. PASS.
- **Sec 32** [flagged] — Example 3: (255)^(1/4) estimated via first-order approx → 3.9961, boxed. Example 4: match a numeric series to n(n-1)/2!y² → n=-3/2, y=-1/2 → sum=2√2, boxed. Advanced JEE-level derivation, math hand-verified. PASS.
- **Sec 33** [flagged] — subtopic 5 closer, `tips`: 2×3 grid (4 red traps, 2 green tips). PASS. **Subtopic 5 (secs 28-33) complete — the flagged any-index run is done.**
- **Sec 34** — opens subtopic 6: 7^103 mod 25 setup, red-margin K-divisibility rule, diagram of crossed-out vanishing terms with the survivor ringed green, conjugate-surd cancellation, red-margin 0<p-√q<1 requirement. PASS.
- **Sec 35** — dense `formulas` reference: (K±1)^n expansion, boxed (1+K)^n≡1+nK mod K², divisibility identities, conjugate setup, boxed product identity (p²-q)^n. PASS.
- **Sec 36** — title itself names 4 procedures (remainder/last-digits/divisibility/parts), each a one-line recipe, boxed evaluation formula, 2 red-margin guardrails. PASS.
- **Sec 37** — Example 1: 9^n-1=8(...) ⇒ 8|9^n-1, boxed. Example 2: completes Sec 34's 7^103 mod 25 example → 18, boxed. Math verified. PASS.
- **Sec 38** — Example 3: 3^400=(80+1)^100 ⇒ last two digits 01, boxed+red-margin why. Example 4: (7+4√3)^n=I+f proof that (I+f)(1-f)=1 via conjugate product = (49-48)^n, boxed. Math verified. PASS.
- **Sec 39** — subtopic 6 closer, `tips`: 2×3 grid (4 red traps, 2 green tips; shortened one cell's text that was crowding its box edge). PASS. **Subtopic 6 (secs 34-39) complete.**
- **Sec 40** [flagged] — opens subtopic 7: binomial-vs-multinomial framing, 5-bracket a/b/c donation diagram (extends Sec 1's metaphor), boxed coefficient formula, red-margin k=2 note, boxed stars-and-bars term-count formula. PASS.
- **Sec 41** [flagged] — dense `formulas`: boxed master multinomial theorem, coefficient def, boxed term-count formula, trinomial case, boxed sum-of-coefficients=k^n, red-margin k=2-recovers-binomial. PASS.
- **Sec 42** [flagged] — two labeled PROOF blocks (coefficient via assignment-counting, term-count via stars-and-bars, both boxed) + two labeled TECHNIQUE blocks (direct extraction; geometric-series bridge). **Closes out every flagged section in the task brief.** PASS.

- **Sec 43** — Example 1: distinct terms in (a+b+c)^12 -> 14C2=91, boxed. Example 2: coeff of x^2y^3z^4 in (x+y+z)^9 -> exponent-sum check -> 9!/(2!3!4!)=1260, boxed. Math verified. PASS.
- **Sec 44** — Example 3: coeff of x^4 in (1+x+x^2)^3 via two case-solutions -> 6, boxed, red-margin full-expansion cross-check. Example 4: geometric-series bridge (1-x)^-3 -> [x^7] -> 9C2=36, boxed, agrees with stars-and-bars. Math hand-verified with a full manual expansion check. PASS.
- **Sec 45** — subtopic 7 closer, `tips`: 2×3 grid (4 red traps, 2 green tips). PASS. **Subtopic 7 (secs 40-45) complete.**
- **Sec 46** — `formula_recap`: 2×4 grid of boxed formula cards covering all 7 subtopics in teaching order, plus a wide red "backbone" card (symmetry + Pascal's rule). PASS.
- **Sec 47** — `cheat_sheet`, **FINAL section of the chapter**: color-coded 2×4 grid (red=rule/guardrail, amber=formula) of grab-and-go essentials across every subtopic, closing with a wide red "four mantras" banner (raise the whole bracket / solve for r first / read the weights pick the tool / divisor inside the bracket) as the last beat of the entire chapter. PASS. **Subtopic 8 (secs 46-47) complete — CHAPTER COMPLETE, 47/47.**

## Chapter complete — final status
All 47 sections built, registered, type-checked (0 new tsc errors — only the 4 pre-existing/unrelated ones in `src/app/learn/page.tsx` remain), verified via `verify-scene.mjs` (VERDICT PASS, both languages, every section), and eye-checked via FORCE_SHOTS screenshots. All worked-example math hand-verified against the actual arithmetic (not just transcribed). Pushed to origin through Sec 47 — `git push origin premium-board-math7` is up to date with local history.

Recurring issues found and fixed along the way (see notation/style decisions above for the general rules extracted from each):
- Off-by-one beat-index bug (Sec 6) — now a mandatory pre-write checklist item.
- Superscript-letter glyph violations (Sec 14 assumed one was a bug, wasn't; Sec 29 and Sec 38 had real ones) — fixed by a repo-wide regex audit, safe to re-run: `grep -nP '[\x{207F}\x{2090}-\x{209C}\x{1D2C}-\x{1D6A}]' src/components/scenes/M11Ch07Sec*.tsx` (should return nothing).
- Two-line same-color text stacks need ≥40px baseline spacing, not ~20px — hit 3 times (Sec 16, 19, 47) before it became reflexive.
- Text crowding its own callout-box edge (cosmetic, not gated by the verifier) — fixed in Sec 27 and 39 by shortening text or splitting to two lines.

Nothing outstanding. No further action needed unless new content is added to this chapter.

## Workflow notes
- Dev server: `nohup npm run dev -- -p 3036 > /tmp/dev-math7.log 2>&1 &`, confirmed READY.
- Data pull: `node scratch/dump-math7.mjs <positions...>` (no args = list all titles/count; with positions = full JSON rows for those positions). Uses `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` from env or repo defaults.
- Verify: `PORT=3036 CHAPTER_ID=ad7f3197-f77b-5be6-8581-f5372ffb7797 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`.
- Registration: single `M11CH07` block appended at END of `src/components/scenes/index.ts` (import + REGISTRY lines; ES module imports hoist regardless of textual position).
- `npx tsc --noEmit` shows 4 pre-existing errors in `src/app/learn/page.tsx` — unrelated, not ours (per task brief); only check no *new* errors appear.
