# Chapter Kickoff Prompt — Parallel Board-Scene Rendering

Paste the block below into a fresh session to render one chapter of choreographed
board scenes. It is the same kickoff used for chapters 3–7, updated so any new
chapter (8 onward) uses the **verdict-mode** `verify-scene.mjs` and the current
`SCENE_AUTHORING.md` contract. Fill in the **Chapter block** for the chapter you
are starting; the concrete values shown are for **Chapter 8**.

Chapters 3–7 are already in flight in their own worktrees on the *old* verify rig
— do not touch them. This kickoff is for the next chapter and beyond.

---

## KICKOFF PROMPT (copy from here down)

You are rendering one full chapter of MonkLearning's audio-synced "live
classroom board" scenes — one React scene component per lesson section, hand-
choreographed to the narration. This is a long, section-by-section job; you own
exactly ONE chapter and work in your own git worktree so you never collide with
the other chapters' sessions.

### Your chapter (Chapter 8 — swap these six lines for another chapter)
- Chapter: **Mechanical Properties of Solids**
- chapter_id: **39bfe6d1-bd93-5157-a29c-b8ee68c3676b** (subject `physics`, class_level 11)
- Sections: **64** (Supabase positions 1–64 = JSON `section_index`)
- Lesson JSON: `JSON_LESSONS/Class11_Phy/p11_ch08_mechanical-properties-of-solids_full.json`
- Worktree / branch / dev port: `~/Desktop/monk-scenes-ch8` · `premium-board-ch8` · **3008**
- Subtopics:
  - 1–14  Elasticity, Stress and Strain
  - 15–26 Elastic Moduli
  - 27–38 Poisson's Ratio and Elastic Energy
  - 39–50 Ductility, Malleability and Yielding
  - 51–62 Applications of Elastic Behaviour
  - 63–64 Chapter 8 Review

### One-time setup
1. Create the worktree from the latest `premium-board` (which now carries all of
   ch1–7 and the verdict-mode verify rig):
   ```
   cd ~/Desktop/monk-learning-webpage
   git fetch origin
   git worktree add -b premium-board-ch8 ~/Desktop/monk-scenes-ch8 origin/premium-board
   ```
2. Copy `.env.local` into the worktree (gitignored, not inherited): it holds
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`.
3. Install deps and start the dev server on YOUR port only:
   `npm ci` then `nohup npm run dev -- -p 3008 > <scratchpad>/dev.log 2>&1 & disown`
   (cold start can take 2–5 min under load; wait for READY before verifying).
4. Read `src/components/scenes/SCENE_AUTHORING.md` end to end — it is the binding
   contract (canvas, safe area, beats, layout plan, label/arrow/ring precision,
   choreography, palette). Study `Ch01Sec1.tsx`, `Ch01Sec3.tsx` as exemplars, and
   `kit.tsx` for the primitives.
5. Create a committed `PROGRESS.md` in the worktree root (mirror ch6's: header
   with branch/port/chapter_id, the subtopic map above, a "Done" log you append
   one line per finished section, and a "Current" pointer). This is your handoff.

### Per-section workflow (repeat for sec 1..64)
1. **Get the data.** Narration (both languages) from the lesson JSON; the
   `board_reveal_at_english` / `board_reveal_at_hinglish` arrays from Supabase
   `lesson_sections` (REST: `?chapter_id=eq.<id>&position=eq.<n>&select=
   board_reveal_at_english,board_reveal_at_hinglish`). Confirm the two arrays'
   lengths match the beat count before authoring.
2. **Author** `Ch08SecM.tsx` per `SCENE_AUTHORING.md`: layout-plan header comment
   first (every element boxed, no two boxes intersect), kit primitives, BOTH
   languages from one component via `t("english","hinglish")`, pure function of
   `currentTime` (seek/pause/language-switch must all land correct).
3. **Register** it in `src/components/scenes/index.ts` as
   `` [`${CH08}:M`]: Ch08SecM `` — append YOUR chapter's block at the END of the
   file (define `const CH08 = "39bfe6d1-…"` in it). Never edit another chapter's
   block; never touch `kit.tsx`.
4. **Typecheck:** `npx tsc --noEmit` (if node_modules was iCloud-corrupted, see
   gotchas) — must be clean.
5. **Verify (verdict mode):**
   ```
   PORT=3008 CHAPTER_ID=39bfe6d1-bd93-5157-a29c-b8ee68c3676b \
     node verify-scene.mjs <sec> '<reveals_en json>' '<reveals_hi json>' ./shots/sec<N>
   ```
   It prints a text verdict and gates on **overlap** (text-vs-text), **overflow**
   (any element leaving safe area x∈[36,1044] y∈[30,596]), and **empty** frames.
   The section is done only when the last line is `VERDICT sec=<N>: PASS`
   (exit 0). It writes screenshots ONLY for failing frames — **open a PNG only
   when one is listed under `SHOTS:`**. Assertions catch geometry, not meaning:
   run once per subtopic with `FORCE_SHOTS=1` and eyeball a frame to check arrow
   targets, ring/label placement, and Hindi phrasing. Fix every overlap/overflow/
   straddle/stray-arrow and re-run until PASS.
6. **Commit** per section: `git commit -m "Ch08 SecM: <what the scene shows>"`,
   append the one-line summary to `PROGRESS.md`, and push your branch often
   (`git push origin premium-board-ch8`) — iCloud on Desktop corrupts local git
   packs, so GitHub is your backup.

### Guardrails
- Touch only YOUR chapter's `Ch08Sec*.tsx` and your appended block in `index.ts`,
  plus your `PROGRESS.md`. Do not edit `kit.tsx`, `SCENE_AUTHORING.md`,
  `verify-scene.mjs`, or any other chapter's files.
- Do NOT merge to `premium-board` yourself — the coordinator session merges each
  finished branch back (only expected conflicts: the tail of `index.ts`, keep both
  blocks; and `PROGRESS.md`, renamed per chapter). Just keep your branch pushed.

### House-style gotchas (learned across ch3–7)
- Board text for Hinglish is written in **Latin script** (house style, per
  Ch01/Ch02), even though the JSON narration is Devanagari.
- The combining vector-arrow glyph U+20D7 renders as tofu in the board fonts —
  write vectors as plain letters with tspan subscripts (`F_ext = M a_cm`), not
  `F⃗`. Subscript digits (₁₂), ᵢ, and `Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺` are fine.
- Palette is house-only: INK `#1C1A16`, AMBER `#EEA31F`, AMBER_DARK `#9A6A12`,
  GREEN `#1C9B57`, RED `#DD4433`, CREAM `#FCF4E0`, MUTED `#9C988C`.
- iCloud on `~/Desktop` can NUL-corrupt `node_modules` and slow/wedge git. If
  `tsc` chokes on node_modules or git reports "pack … far too short", use the
  ch6 workarounds (symlink `node_modules -> node_modules.nosync` + a
  `tsconfig.check.json` that excludes it; copy-verify-mv corrupted packs). Restart
  a wedged dev server by killing port 3008 and relaunching.

### Model note
This chapter is templated work against a hard spec with a mechanical verdict gate
— run it on **Sonnet**, tiered by section type: concept intros, worked examples,
pitfalls, and recaps on Sonnet; multi-part derivations with real geometry stay on
Opus (or flag them for an eye). Measure the verify pass-rate on your first ~10
sections before committing the whole chapter to the cheaper model.

## KICKOFF PROMPT (copy to here)
