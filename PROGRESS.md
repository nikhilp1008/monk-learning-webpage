# Ch03 "Motion in a Plane" — scene-render progress

Branch: premium-board-ch3 (worktree). Port 3003 only.
Chapter ID: a5970ed6-3b48-55f9-9b80-8abdd3d4c336
Total sections: 76

## Subtopics
- Sec 1–14: Vector Algebra and Resolution
- Sec 15–28: Vector Products (Dot and Cross)
- Sec 29–40: Two-Dimensional Kinematics
- Sec 41–52: Projectile Motion
- Sec 53–63: Relative Velocity in a Plane
- Sec 64–74: Circular Motion
- Sec 75–76: Formula Recap and Cheat Sheet

## Done
- Sec 1 — Scalars vs vectors: scalar chips / which-way arrows / 3-4-5 walk demo / vector cast / contrast verdict.
- Sec 2 — Triangle & parallelogram laws: two-diagram row + rickshaw push demo (aligned vs side) + tail-to-tail θ glyph.
- Sec 3 — Resolution: F→Fx+Fy axes diagram + sledge rope demo (drag vs lift) + choose-axes verdict.
- Sec 4 — Parallelogram-law derivation pt1: OPQS construction + formula stack → R = √(A²+B²+2ABcosθ) hero box.
- Sec 5 — Derivation pt2: tan α triangle + three special-case rows + |A−B| ≤ R ≤ A+B band hero.

## Current
Sec 6 — next.

## Notes
- Reveals cache: fetch from Supabase `lesson_sections`
  (board_reveal_at_english / board_reveal_at_hinglish per position).
- Verify: `PORT=3003 CHAPTER_ID=a5970ed6-3b48-55f9-9b80-8abdd3d4c336 node verify-scene.mjs <sec> '<rev_en>' '<rev_hi>' ./shots/sec<M>`
- Kit changes: none needed so far.
