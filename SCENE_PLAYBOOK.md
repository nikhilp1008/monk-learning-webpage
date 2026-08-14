1.  The two documents, and what to tell Claude first SCENE_AUTHORING.md
    is the contract: canvas 1080×620, safe area x∈\[36,1044\]
    y∈\[30,596\], row bands, text-size floor 14, the measured text-box
    ratios, arrow/ring/cross-out computations, the settle rule, house
    palette only. Claude must read it before writing anything. Reference
    scenes matter as much as the spec. Have it read kit.tsx plus two
    finished scenes --- one text-layout scene (Ch01Sec90) and one
    diagram scene (Ch01Sec76). Everything it writes should look like
    those. Style is absorbed from examples, not rules. A kickoff prompt
    that reproduces what I did:

Read SCENE_AUTHORING.md, kit.tsx, Ch01Sec90.tsx and Ch01Sec76.tsx. Then
build every section of chapter N as registered scenes: narration from
JSON_LESSONS, reveals from Supabase, verify each with verify-scene.mjs
until VERDICT: PASS, commit per section. Don't stop between sections.

2.  Setup once, then a strict per-section loop Pull all inputs up front
    (narration from JSON_LESSONS/.../full.json, board_reveal_at\_\* +
    durations from Supabase lesson_sections) and merge them into one
    scratch JSON per section --- the loop should never re-query.
    Sanity-check that reveal counts match across languages.

Then the loop, never deviating and one section per commit:

read secN → plan beats+layout → write ChNNSecM.tsx → register in
index.ts → npx tsc --noEmit → verify until PASS → eye-check if flagged →
commit

3.  Planning is where quality is decided (do arithmetic, not vibes)
    Every element gets an estimated box before rendering: width ≈
    0.50×size×chars (sans) / 0.55×size×chars (Kalam); ink height Kalam
    bl−1.3s...+0.5s, sans bl−0.78s...+0.31s. Under-estimating height is
    the #1 collision cause. Plan against the longer language --- usually
    the Hinglish string. Budget vertically first: count the lines a
    region must hold; stacked notes need \~24--30 px baseline pitch,
    text↔stroke ≥10 px. If it doesn't fit, cut a line --- never squeeze
    clearances. Keep the layout plan in the file's header comment and
    keep it true --- it's what makes the next fix cheap. One visual idea
    per beat, action \> diagram \> table \> prose, and every beat needs
    a Draw --- even a verdict line gets a margin bar, underline, tick or
    ring so something happens on the board.

4.  Choreography rules that make seeking bulletproof Pure function of
    (currentTime, reveals, language); every delay wrapped in dl(k, d) so
    seeks settle instantly. One hand: stagger draws inside a beat; draw
    the thing, name it ≥0.4 s later; \~1 s of air after a heavy landing.
    Beats that fire 1 s apart in one language need no special handling
    --- delays only play in the current beat, so the crammed language
    settles instantly. Live counters are almost never needed (one scene
    in 165 used them).

5.  Reuse a small motif vocabulary Consistency across 73 scenes came
    from \~8 repeated shapes: red-margin note (+ green/amber variants),
    cream formula card with double-underline result, 2×2 worked-example
    card grid, the numbered-badge pitfall closer + amber pro-tips box
    (ends every subtopic), muted-skeleton-then-colored flowchart,
    row-by-row table builder, the x/v/a ladder, and the MCQ options row
    with cross-out + green ring. Don't reinvent --- recognition is
    pedagogy.

6.  Hard-won gotchas (each cost one fix cycle) Dashed lines can't use
    Draw --- its dash-reveal trick conflicts with strokeDasharray; wrap
    a plain dashed `<path>`{=html} in Fade. Ring a word inside a
    sentence? Split the text into separate `<T>`{=html}s with
    per-language x positions, then ring that element. Ring a small
    glyph? Measure first with a quick playwright eval (viewBox units);
    if a correctly-sized ring would clip a neighbour, use a drawn
    underline --- the spec's own escape hatch. Leader arrows can lie ---
    an arrow whose tail sits near label A reads as pointing at A. If
    color+proximity already carry the association, delete the leader.
    Tick labels straddle strokes --- offset any axis label 12--16 px
    from a vertical guide at the same x. Narration color words vs
    palette --- "blue line" gets ink/green, disambiguated by shape and
    label; only red can be honored literally. Prefer unicode (½ ² ₁ ⁄)
    over tspan gymnastics. An empty verify output is not a pass ---
    rerun and demand the VERDICT line.

7.  Verification (current verdict-mode rig)

CHAPTER_ID=`<uuid>`{=html} PORT=`<port>`{=html} node verify-scene.mjs
`<sec>`{=html} '`<rev_en>`{=html}' '`<rev_hi>`{=html}' ./shots/... Done
only on VERDICT sec=N: PASS. It gates on text-overlap, safe-area
overflow (text and strokes), and empty frames --- and writes screenshots
only for failures, so a clean section costs \~10 lines and zero images.
Run FORCE_SHOTS=1 about once per subtopic for a by-eye pass: assertions
catch geometry, not meaning --- a wrong arrow target or awkward Hindi
still needs an eye.

8.  Language + bookkeeping + cost Hinglish labels are romanized, keep
    English technical terms, and should sound like the teacher ("muft
    jaanch", "ratta mat maaro") --- reuse the narration's own phrases as
    board labels. Register via mechanical string-replace in index.ts;
    commit as ChNN SecM: `<content>`{=html}; at chapter end: file count
    = registry count = no gaps, final tsc, a 10-section live smoke test,
    push, memory handoff. For cost: read English narration only, lean on
    verdict-mode verify, and tier models --- concept/example/recap
    sections work on a smaller model, keep the strongest one for
    geometry-heavy derivations and coordination.

Anyone (or any future session) can now open SCENE_PLAYBOOK.md +
SCENE_AUTHORING.md together and reproduce the pipeline --- the playbook
is the "how to drive," the spec is the "definition of done."
