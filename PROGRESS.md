# Ch06 — System of Particles & Rotational Motion — scene progress

Worktree: branch `premium-board-ch6` · port 3006 only · chapter_id `262da95c-2f3a-56da-905e-003fa8f0e4dc`.
70 sections total (Supabase positions 1–70 match JSON section_index; beat counts match across languages for all 70).

## Subtopics
1. Rigid Bodies & Types of Motion — secs 1–2
2. Center of Mass — secs 3–12
3. Vector Product of Two Vectors — secs 13–21
4. Torque and Angular Momentum — secs 22–31
5. Equilibrium of a Rigid Body — secs 32–40
6. Moment of Inertia — secs 41–50
7. Rotational Kinematics and Dynamics — secs 51–59
8. Rolling Motion — secs 60–68
9. Chapter Wrap-Up — secs 69–70

## Done
(none yet)

## Current
Subtopic 1 — working on Sec 1.

## Workflow notes
- Reveal data cached: scratchpad/ch6_reveals.json (re-fetch via Supabase REST, cols `board_reveal_at_english/_hinglish`).
- Section dump helper: scratchpad/dump-sec.mjs (`SP=<scratchpad> node dump-sec.mjs <N>` → per-beat EN/HI narration + board events).
- Registration: single Ch06 block appended at END of src/components/scenes/index.ts (imports hoisted; `Object.assign(REGISTRY, {...})`).
- Verify: `PORT=3006 CHAPTER_ID=262da95c-2f3a-56da-905e-003fa8f0e4dc node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — all audit lines must be [].
- Hinglish board text written in Latin script (house style, per Ch01/Ch02 exemplars), even though JSON narration is Devanagari.
