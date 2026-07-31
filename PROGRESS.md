# Ch07 Gravitation — scene rendering progress

Branch: `premium-board-ch7` · Port: **3007** · chapter_id: `29b5be47-3b75-550d-9636-ad45a901d4dd`

**Total sections: 76** (from Supabase `lesson_sections`; JSON `p11_ch07_gravitation_full.json` matches 1:1 by order).

## Subtopics
1. Newton's Law of Gravitation — sec 1–13
2. Gravitational Field Intensity — sec 14–25
3. Acceleration due to Gravity — sec 26–37
4. Gravitational Potential and Energy — sec 38–49
5. Kepler's Laws and Satellites — sec 50–62
6. The Gravitational Constant and Two-Body Systems — sec 63–74
7. Chapter 7 — Master Revision — sec 75–76

## Done (verified + committed + pushed)
Sec 1–37 (subtopics 1–3: Newton's Law · Gravitational Field Intensity · Acceleration due to Gravity) — all verified (audits `[]`, finals eye-checked both languages), committed, and pushed.

## Drafted but UNVERIFIED (blocking issue below)
Sec 38–76 (subtopics 4–7: all of Gravitational Potential and Energy, Kepler's Laws and Satellites, The Gravitational Constant and Two-Body Systems, and Master Revision) — **every remaining section of the chapter is now written**, registered in `index.ts`, and passes `npx tsc --noEmit` (confirmed clean at least twice, most recently with all 76 files present). None of sec 38–76 has been screenshotted, collision-audited, or committed yet — the local dev server could not stay up long enough to run `verify-scene.mjs` (see incident below). Files exist on disk in `src/components/scenes/Ch07Sec38.tsx` … `Ch07Sec76.tsx` and are NOT lost even though uncommitted — re-verify and commit them section-by-section (or in small batches) as soon as `npm run dev -- -p 3007` stays up.

## Current
Blocked on dev-server stability (see incident below). Resume by: confirm `sysctl vm.swapusage` shows healthy headroom, start `./node_modules/.bin/next dev -p 3007`, then run `verify-scene.mjs` for sec 38 onward in order, fixing any collisions found (none expected — layouts follow the same discipline as the 37 verified sections, but they are genuinely unchecked) and committing each as it passes.

## Incident log
- 2026-07-30: the shared object store (`monk-learning-webpage/.git`) had a truncated packfile (`pack-a44415a65…`, "far too short to be a packfile", SIGBUS on reads) blocking all commits. Fix: renamed its `.idx` to `corrupt-backup-pack-a44415a65.idx-bak` (pack kept on disk), bare-cloned origin into scratchpad, `git unpack-objects` restored all 270 pack objects as loose. `git fsck` still reports stale cache-tree pointers in some worktree indexes — benign, clears when each index is rewritten. Affects/benefits all chapter worktrees.
- 2026-07-30 (later, ongoing at time of writing): severe system-wide memory pressure from 5 parallel chapter sessions (ch3–ch6 dev servers + this one, all running Next.js/TypeScript/Playwright concurrently) caused `sysctl vm.swapusage` to sit near 90%+ used for an extended period (load average 10–20 sustained). `npm run dev -- -p 3007` / `next dev -p 3007` (both Turbopack and `--webpack`) would start, run silently for 5–50s, then exit cleanly (exit code 0, empty log, no crash trace) — consistent with the OS declining to let the process fully initialize under memory starvation, not a bug in this worktree's config. Diagnosed and fixed a **false lead**: manually backgrounding via shell `&`/`nohup`/`disown` inside a *foreground* Bash tool call reliably died the instant that tool call returned — the fix was to always launch the dev server via the harness's own `run_in_background: true` Bash parameter, which isolates it into its own tracked process group (survives across turns). That fix alone did not solve the OOM-style death, only made behavior consistent/diagnosable. Also killed (with explicit user permission) three confirmed-orphaned dev servers whose worktrees no longer exist (ports 3000 main-repo-idle, 3003 ch3-deleted, 3006 ch6-deleted) — port 3004 (ch4, actively rendering) was explicitly left untouched. This freed some memory but pressure remained volatile (free swap oscillated 700MB–1.7GB across ~29 retries over roughly 30 minutes) and the server never stayed up long enough to reach "Ready". **If picking this up fresh**: check `sysctl vm.swapusage` and `uptime` first; if load average is back under ~5 and swap has real headroom, a plain `next dev -p 3007` should work normally — this was purely a resource contention issue, not a code or config problem.

## Working notes
- Per-section narration+reveals dumped to scratchpad `sections/secN.txt` by a python script that zips JSON sections with Supabase rows (script inline in session; re-derivable: fetch `lesson_sections?chapter_id=eq.<id>&order=position`, zip with JSON `sections` array, titles assert-match).
- Registration: ONE delimited Ch07 block appended at END of `src/components/scenes/index.ts` (imports hoisted; `REGISTRY[`${CH07}:N`] = Ch07SecN;` assignments after the object literal — avoids merge conflicts with ch3–6 sessions).
- Verify: `PORT=3007 CHAPTER_ID=29b5be47-3b75-550d-9636-ad45a901d4dd node verify-scene.mjs <sec> '<reveals_en>' '<reveals_hi>' ./shots/sec<M>` — all AUDIT lines must be `[]`; eye-check final frames both languages.
- Exemplars studied: Ch02Sec69, Ch02Sec70 (note: they use label sizes 11–13 in practice despite the 14 floor in SCENE_AUTHORING.md; hinglish labels are romanized Latin, not Devanagari).
