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
- **Capital Pi `Π` (product notation, JSON's `\prod_{k=1}^n G_k`) is MISSING from both board fonts** (checked via fontTools cmap, same method as the other audits) — unlike Σ this hasn't been accepted anywhere else in the codebase and appears only once in this chapter (Sec 27), so avoid it entirely rather than accept a fallback: write the product out as explicit dot-multiplication instead, `G_1 · G_2 · ... · G_n`.
- **Two-AP comparison notation** (JSON sometimes writes `a^{(1)}_m` for "AP1's mth term" vs `a^{(2)}_m` — a true 2-D superscript+subscript stack on one letter, not supported): rename to distinct plain letters instead, e.g. AP1 = `a_m`/`S_n`, AP2 = `b_m`/`T_n`. Same math, no stacked notation (Sec 16).
- **Per-LINE subscript consistency**: if one formula line mixes a numeric index with a symbolic one (e.g. `a_1 = a_2 = 1, a_n = a_(n-1)+a_(n-2)`), use underscore for EVERY index on that line, even the numeric ones — don't mix real subscript digits with underscore-symbolic on the same line. Only use real subscript digits (`a₁`, `a₂`) on a line that is purely numeric-indexed throughout.
- House palette only: INK, AMBER, AMBER_DARK, GREEN(_DARK), RED, CREAM, MUTED.
- **The verifier cannot catch a truncated/incomplete sentence** (Sec 25 beat2 originally read "|r|<1 ⇒ each multiplication" with no verb — a copy-paste-shortening slip, not a layout bug). Re-read every beat's actual sentence for completeness before moving on, not just its box geometry.
- **The verifier only gates text-vs-text overlap and safe-area overflow — it does NOT catch shape-vs-shape overlap** (e.g. two bordered `roundRectD` cells whose boxes intersect). Caught this by eye (FORCE_SHOTS) in Sec 22: two 340-wide cells at cx 380/700 overlapped by 20px and still verified PASS. Hand-check cell `x ± w/2` math whenever laying out a multi-cell grid with cx+w, don't trust the verifier alone for box layouts.
- **`arrowD`/`ringD`/`crossD` live in `kit.tsx`, NOT `math-kit.tsx`** (only `roundRectD`/`circleD`/etc. are math-kit) — tripped this up in Sec 6, tsc caught it immediately (unlike math7's Sec4 where only the dev bundler caught a similar mistake).

## BLOCKED — needs content-team fix
- **Sec 32** ("Alternating signs select the ratio") — **not authored, skipped intentionally.** Both `board_content` (item 5/6) and the narration audio (segments_english seq 6-7) state the final answer as `a = -4`, but this is a genuine arithmetic error: solving `a(1+r) = a(-1) = 12` gives `a = -12`, not `-4`. Independently verified: with a=-12, r=-2, the four terms are -12, 24, -48, 96 — term1+term2=12 ✓, term3+term4=48 ✓, signs alternate ✓, all conditions satisfied. With a=-4 (the stated wrong answer), term1+term2 = -4+8 = 4 ≠ 12 — fails the problem's own first given condition. User decision (asked via AskUserQuestion, 2026-08-06): do not paper over this with a scene-authoring workaround (neither "match the wrong audio" nor "silently show correct math that contradicts the audio") — leave the section unbuilt and flag it here for the content team to fix the underlying derivation and regenerate the audio. Resume authoring Sec 32 once the source Supabase row + audio are corrected. Chapter numbering/registry has a gap at position 32 until then (Secs 1-31, 33-85 registered; 32 is not).

## Done
- **Sec 1** — sequence-as-function machine diagram (input n → rule aₙ → output), 4 fixed-position boxes, explicit-vs-recursive (Fibonacci) example pair, not-a-set guardrail. Reference exemplar. PASS, eye-checked.
- **Sec 2** — series as running total: 4-bead cumulative-sum build (S₁..S₄), sigma formula (bounds spelled out prefix-style below the line, not stacked), cricket over-by-over running-score demo, index-need-not-start-at-1 guardrail. PASS.
- **Sec 3** — `formulas`: 3 sigma linearity rules (split/constant-multiple/constant-sum), each label→formula build, live numeric demo Σ(2k-1) k=1..4=16 built expand→substitute→add→boxed. PASS.
- **Sec 4** — worked example: a_n=(2n-3)/4 substituted for n=1..4, AP-insight number line (4 equally-spaced dots, +1/2 gap labels) foreshadowing Unit 2. PASS.
- **Sec 5** — worked example: general term from a pattern (3,8,15,24,35,…) — first/second differences built live (arcs+labels), quadratic conclusion, factored a_n=n(n+2), 3 checkD verification stamps. PASS, eye-checked.
- **Sec 6** — worked example: recursive a_n=3a_(n-1)+1, feed-forward chain diagram (5 boxes+arrows) filling as each term computes, red-margin neither-AP-nor-GP note (differences AND ratios both change).
- **Sec 7** — worked example: Σ(3k²-2k+1) split via linearity — 3 color-coded pieces (amber/green/ink) carried consistently through Σ-form → standard-sum substitution → simplify → n(2n²+n+1)/2 boxed.
- **Sec 8** — `tips` closer: 2×3 grid (4 red traps, 2 green pro-tips) + wide red closing banner (golden habit). PASS, eye-checked. **Subtopic 1 (Foundations, secs 1-8) complete.**
- **Sec 9** — opens subtopic 2 (AP): two-panel demo — rising-bar staircase (a,a+d,a+2d,a+3d) beside a CartesianAxes+lineD graph of aₙ vs n with 4 dots on the line. Reference exemplar for the graph-of-AP visual language. PASS, eye-checked.
- **Sec 10** [flagged] — nth-term + Gauss-sum derivations, two-column layout: LEFT telescoping stack (a_2-a_1=d,...,a_n-a_(n-1)=d, add all) → boxed a_n=a+(n-1)d; RIGHT forwards+backwards sum → 2S_n=n[2a+(n-1)d] with column-pairing note → boxed S_n both forms. Math hand-verified. PASS, eye-checked.
- **Sec 11** — `formulas`: notation legend (a/d/l/S_n) + 2×2 grid of boxed core formulas (nth term, nth-from-end, sum via a-d-n, sum via a-l-n), off-by-one red-margin, d-sign closer. PASS.
- **Sec 12** — `formulas`: number-line mean visual (a,b,c), insert-means chain, d/A_k formulas, boxed S_n=An²+Bn characterization test (verified a_1=A+B,d=2A), zero-constant-term guardrail, three-term test closer. PASS.
- **Sec 13** [flagged] — symmetric-selection technique: number-line demo (a-d,a,a+d with +d arcs, d's cancel), 3/5-term odd cases, 4-term even case (CD=2d), red-margin even-count guardrail. Math hand-verified for r=1,2 and the even case. PASS, eye-checked.
- **Sec 14** — worked example: a=20,d=19¼-20=-¾ AP; a₂₈=-¼; solve 80-3(n-1)<0→n>27⅔→round up to n=28 (matches a₂₈, elegant consistency). Math verified. PASS.
- **Sec 15** — worked example: 6 scattered terms with 3 nested arcs pairing equidistant ones (a₁+a₂₄=a₅+a₂₀=a₁₀+a₁₅), each pair=75, S₂₄=900. Math verified. PASS.
- **Sec 16** — worked example: ratio-of-sums device (renamed JSON's stacked a^(1)_m notation to distinct letters a_m/S_n vs b_m/T_n — see notation decisions). m=24→n=47→ratio 66:41. Math verified. PASS.
- **Sec 17** — worked example: insert 11 AMs between 28,10; d=-3/2; position row 1-11 with middle three highlighted; A_5=41/2,A_6=19(=AM,centre),A_7=35/2. Math verified. PASS.
- **Sec 18** — worked example: savings word problem, bar chart (flat 200×3 then rising by 40), S_n=11040 target, n=21 months (quadratic (n-3)(n+8)=522). Math verified. PASS.
- **Sec 19** — worked example: AP fused with logs, log2/log(2^x-1)/log(2^x+3) → u²-4u-5=0 → domain check 2^x>0 rejects u=-1 → x=log₂5. Superscript-x translated to plain caret. Math verified. PASS.
- **Sec 20** — worked example: S_7:S_11=6:11 → a=9d → a_7=15d → 130<15d<140 → natural-number constraint forces d=9. Math verified. PASS.
- **Sec 21** — worked example: three APs as residue classes (CRT), 3 congruences, d=lcm(3,5,7)=105, verified x=52 (checkD), a+d=157. Math verified. PASS.
- **Sec 22** — `tips` closer: red top/bottom banners (off-by-one, fast tests) bookending a 3-red-trap + 2-green-tip grid. Caught and fixed a shape-vs-shape box overlap the verifier didn't gate on (see notation decisions). PASS, eye-checked. **Subtopic 2 (AP, secs 9-22) complete — chapter is now 22/85.**

## Workflow notes
- Dev server: `nohup npm run dev -- -p 3037 > /tmp/dev-math8.log 2>&1 &`, confirmed READY.
- Data pull: `node scratch/dump-math8.mjs <positions...>` (no args = list all titles/count; with positions = full JSON rows).
- Plan viewer: `python3 scratch/show.py <positions...>` — concise board_content + reveals dump for planning without re-fetching.
- Verify: `PORT=3037 CHAPTER_ID=7936f031-5b80-5350-ad08-bc78bef84e12 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>`.
- Registration: single `M11CH08` block appended at END of `src/components/scenes/index.ts` (import + REGISTRY lines).
