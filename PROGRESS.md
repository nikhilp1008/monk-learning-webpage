# Ch01 "Sets" (Class 11 Maths) — scene progress

Branch `premium-board-math1` · port 3030 only · chapter_id `b4f9bb1a-a366-5e67-ae76-52ffd1dd8a67`.
37 sections total (Supabase `position` = JSON section_index).
Naming: `M11Ch01SecN.tsx`, component `M11Ch01SecN`, registered at END of `index.ts` under `const M11CH01 = "b4f9bb1a-a366-5e67-ae76-52ffd1dd8a67"`.

## Subtopics
1. Sets and their Representations — secs 1–9
2. Subsets, Power Set, and Universal Set — secs 10–18
3. Venn Diagrams and Set Operations — secs 19–27
4. Cardinality of Unions and Practical Problems — secs 28–35
5. Formula Recap — sec 36
6. Cheat Sheet — sec 37

## Current
Starting Sec 27.

## Gotcha log
- **Beat-index off-by-one (found in Sec 23, fixed):** `reveals` has N entries (indices 0..N-1); beat index0 is always the title/heading (no separate content gate needed), so content beats must be gated `beat >= 1` through `beat >= N-1` — exactly N-1 gates, one per remaining `board_content` seq item. Never invent an extra beat (e.g. a standalone "draw the diagram" step) that doesn't correspond to a real reveal index — it shifts every later beat's content diagram+text late relative to the narration and silently drops the last beat's content entirely (since `beat` can never exceed N-1). The verifier can't catch this — it only checks geometry at whatever timestamps you pass it, and if the component's own gating is shifted, it'll still "pass" while being out of sync. Sanity check before verifying: count `board_content` seq items = count of `board_reveal_at_*` entries = (number of `beat >= k` gates used) + 1.

## Done
- Sec 1 — what makes a collection a set (team-sheet well-defined demo, tall-students guardrail, roster A={2,3,5,7} + ∈/∉, repetition/order irrelevance, ∅)
- Sec 2 — roster vs set-builder (built both forms token by token, colon = "such that", roster-trails-into-dots vs one-line set-builder, dots-are-a-hint ring)
- Sec 3 — empty/singleton/finite/infinite, equal vs equivalent ({ } vs {0} vs {∅} trap, singleton ring, finite/infinite pair, mutual-containment equality, same-cardinality equivalence, equal⇒equivalent✓ but not conversely✗)
- Sec 4 — standard number sets and nesting (N,W,Z,Q,R,T defs built, N⊂W⊂Z⊂Q⊂R chain token-built, NestedSets 5-ring diagram with staggered draw [extended math-kit's NestedSets with a `delays` array for per-ring stagger], irrationals R−Q band annotated with √2/π, universe-decides-the-answer guardrail)
- Sec 5 — worked: two-digit numbers digit-sum 8 (set-up t+u=8, two-column table build t=1..4 / t=5..8, ring on "80" for the drop-the-zero trap, roster answer boxed)
- Sec 6 — speed trap: which set is empty (4 options staged, (a)/(d) stamped EMPTY, decoys (b)/(c) staged as tempting "EMPTY?" then crossed out and corrected to NOT-empty, check-the-universe-first verdict)
- Sec 7 — |x|≤2 vs x³=x cardinality/equality (one shared number line: A's 5 dots, factoring derivation x³=x⇒x(x-1)(x+1)=0, B's 3 members ringed green on the same line, -2/2 recolored red at the end as the A≠B evidence, B⊂A landing)
- Sec 8 — advanced: parameter a with n(T)=1 (factor x²-(a+1)x+a=(x-1)(x-a), domain rule, 3-card casework table with dividers: a∈N,a≠1→n=2✗ / a=1→n=1✓ / a∉N→n=1✓, iff landing)
- Sec 9 — pitfalls & pro-tips: representations (4 rapid traps — {0}/{∅} not empty w/ wrong-vs-right pair, counting repeats, ignoring the universe, equal vs equivalent — then circle-the-universe-symbol pro-tip)

**Subtopic 2 (Subsets, Power Set, Universal Set):**
- Sec 10 — subsets, proper subsets, supersets (nested boxes B={1..5}⊃A={1,2} with "extras" callout, boundary-case dashed card A⊆A/∅⊆B, proper-subset and superset lines annotate the same diagram, equality-test landing)
- Sec 11 — ∈ vs ⊆, universal set, intervals (∈/⊆ side-by-side comparison + category-error guardrail, universal-set box U containing A/B, interval definition, number-line [2,5) with correct closed/open dots, infinite-despite-small guardrail)
- Sec 12 — power set and coin-flip intuition (A={a,b} sub-selections listed, P(A) formula, binary coin-flip tree a:out/in → b:out/in → 4 leaves ∅/{b}/{a}/{a,b} = 2×2=4, ∈ vs ⊆ landing with P({1,2}))
- Sec 13 — subset counting formulas, why 2ⁿ (2-column toolkit: n[P(A)]=2ⁿ headline, proper/non-empty=2ⁿ-1, non-empty-proper=2ⁿ-2, C(n,r); live-built product derivation 2×2×⋯×2=2ⁿ; binomial cross-check C(n,0)+⋯+C(n,n)=(1+1)ⁿ=2ⁿ)
- Sec 14 — power set of {p,q,r} listed by size (full power-set lattice built bottom-up: ∅ → 3 singletons → 3 pairs → {p,q,r}, all 12 covering edges drawn, then flattened to roster + n[P(A)]=2³=8 count check)
- Sec 15 — speed trap: n[P(A)]=256 → n(A) and proper subsets (256=2⁸ recognition, two-column derivation n(A)=8 / proper=255, dual traps staged-crossed-corrected: n(A)=256✗ and proper=254✗)
- Sec 16 — quadratic inequality over Z, power-set count (factor (x-3)(x+2)≤0⇒-2≤x≤3 on a number line, continuous span + 6 integer dots overlaid, n(A)=6, n[P(A)]=2⁶=64, guardrail recolors the span red for the over-R-infinite contrast)
- Sec 17 — advanced: odd-only subsets, complement principle (A={1..7} split into O(n=4)/E(n=3), two-column divider layout: (a) 2⁴=16 odd-only subsets incl. ∅, (b) complement 2⁷-2⁴=128-16=112 at-least-one-even)
- Sec 18 — pitfalls & pro-tips: subsets/power sets (4 traps — ∈vs⊆ three-symbol trio, forgetting ∅/A itself, proper=2ⁿ-1 not 2ⁿ-2, n[P(A)]≠n(A) — then memorise-the-powers-of-two pro-tip ladder 2→4→...→1024)

**Subtopic 3 (Venn Diagrams and Set Operations):**
- Sec 19 — five set operations as membership questions (6-cell grid of real VennShade diagrams: union/intersection/difference/complement/symmetric-difference/disjoint, each drawn+shaded+labeled; note VennShade needs explicit tight x/y/w/h bounds per cell or its default full-canvas rect trips the overflow check even though the visible shading is correctly clipped)
- Sec 20 — four Venn regions: shading not memorising (one big U/A/B diagram with only-A/A∩B/only-B/neither shaded+labeled, then a 4-icon "recipe row" showing which regions each operation shades: ∪/∩/−/′, landing on you-never-memorise-you-just-shade)
- Sec 21 — De Morgan's laws (visual proof: diagram1 shades outside-both = (A∪B)′=A′∩B′, diagram2 shades everything-but-the-lens = (A∩B)′=A′∪B′ via 3 disjoint VennShade regions, element-chase line, flip guardrail, illustrates-vs-proves closing)
- Sec 22 — algebra of sets, two-set cardinality formula (5-group law toolkit: commutative/associative, distributive, identity/domination, complement, De Morgan recap; boxed landing on n(A∪B)=n(A)+n(B)-n(A∩B))
- Sec 23 — compute every operation over U={1..10} (one Venn diagram with actual numbers filled per region as computed: lens{2,4}, only-A{6,8}, neither{7,9,10}, only-B{1,3,5}; crescents recolor green for A△B; caught+fixed an off-by-one beat-mapping bug here — see note below)
- Sec 24 — speed trap: simplify (A−B)∪(A∩B) (single VennShade include:[A] fills the whole crescent+lens = A instantly, algebraic confirmation A−B=A∩B′⇒A∩(B′∪B)=A∩U=A, trap: both over-shaded A∪B and under-shaded A∩B mini-Venns staged and crossed out)
- Sec 25 — operations on intervals A=[-2,5), B=(1,8] (two-row number line, A closed@-2/open@5, B open@1/closed@8, all 4 dot styles verified correct; A∩B=(1,5) tighter/stricter, A∪B=[-2,8] looser, A−B=[-2,1]; shaded overlap band exactly (1,5))
- Sec 26 — advanced: two definitions of A△B agree (claim (A∪B)-(A∩B)=(A-B)∪(B-A) + mini-Venn visual anchor with both crescents shaded, full element-chase proof x∈LHS⇔in-exactly-one⇔(x∈A,x∉B)OR(x∈B,x∉A)⇔x∈RHS, iff-chain guardrail landing; fixed a second stray ⟺ (unconfirmed glyph) → ⇔)
