# Ch12 — Kinetic Theory — scene progress

Worktree: branch `premium-board-ch12` · port 3012 only · chapter_id `8300dbf9-d9f7-505b-82c6-ad8d236eaff1`.
48 sections total (Supabase positions 1–48 match JSON section_index; beat counts match across languages for all 48).

## Subtopics
1. Molecular Nature of Matter — secs 1–9
2. Ideal Gas / Gas Laws — secs 10–18
3. Kinetic Theory / Pressure — secs 19–27
4. RMS Speed / Maxwell Distribution — secs 28–36
5. Degrees of Freedom / Mean Free Path — secs 37–46
6. Summary — secs 47–48

## Done
(none yet)

## Current
Starting Sec 1.

## Workflow notes
- Reveal data cached: scratchpad/ch12_reveals.json (Supabase REST, cols `board_reveal_at_english/_hinglish`, all 48 positions, lengths match narration segment counts for every section).
- Section dump helper: scratchpad/dump-sec.py (`python3 scratchpad/dump-sec.py <N>` → per-beat EN/HI narration + board events + reveals).
- Registration: single Ch12 block appended at END of src/components/scenes/index.ts (imports hoisted; `const CH12 = "8300dbf9-..."`, then `REGISTRY[`${CH12}:N`] = Ch12SecN`).
- Verify: `PORT=3012 CHAPTER_ID=8300dbf9-d9f7-505b-82c6-ad8d236eaff1 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — done only on `VERDICT sec=N: PASS`.
- Hinglish board text written in Latin script (house style, per Ch01/Ch02 exemplars), even though JSON narration is Devanagari.
- Combining vector arrow U+20D7 renders as tofu in the board fonts — write vectors as plain letters (subscripts via tspan). Subscript digits (₁₂), ᵢ, and Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺ are fine.
- node_modules and tsc verified clean at kickoff (no iCloud corruption seen so far on this worktree).
