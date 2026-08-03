# Ch13 — Oscillations — scene progress

Worktree: branch `premium-board-ch13` · port 3013 only · chapter_id `c1bc937e-5ff5-5ecb-a67b-89053c386c23`.
58 sections total (Supabase positions 1–58 match JSON section_index; beat counts match across languages for all 58 — verified).

## Subtopics
1. SHM Concepts and Kinematics — secs 1–11
2. SHM Energy — secs 12–21
3. Pendulums and Mass-Spring Systems — secs 22–33
4. Damped and Forced Oscillations — secs 34–44
5. Reference Circle, Superposition and More SHM Systems — secs 45–56
6. Chapter Review — secs 57–58

## Done
- Sec 1 — what makes motion SHM (jhula, periodic vs oscillation, -A/O/+A line, F=-kx, fastest/frozen, verdict)
- Sec 2 — the ID card of SHM (F=-kx→F=ma, ID card a=-ω²x, a-x graph, pitfalls: Hooke/small-angle, damping/frequency)

## Current
Subtopic 1 in progress. Next: Sec 3.

## Workflow notes
- Reveal data cached: scratchpad/ch13_reveals.json (Supabase REST, cols `board_reveal_at_english/_hinglish`, all 58 rows fetched at once).
- Section dump helper: scratchpad/dump_sec.py (`python3 scratchpad/dump_sec.py <N>` → title/subtopic/board_events/narration EN+HI).
- Registration: single Ch13 block appended at END of src/components/scenes/index.ts.
- Verify: `PORT=3013 CHAPTER_ID=c1bc937e-5ff5-5ecb-a67b-89053c386c23 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<N>` — VERDICT line must read PASS.
- Hinglish board text written in Latin script (house style), even though JSON narration is Devanagari.
- Combining vector arrow U+20D7 renders as tofu — write vectors as plain letters w/ tspan subscripts. Subscript digits, ᵢ, Σ ∫ λ σ ρ ω ² ³ ⇒ ⟺ are fine.
- Palette: INK #1C1A16, AMBER #EEA31F, AMBER_DARK #9A6A12, GREEN #1C9B57, RED #DD4433, CREAM #FCF4E0, MUTED #9C988C.
