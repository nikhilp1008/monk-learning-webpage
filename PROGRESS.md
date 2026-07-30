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

## Done
(none yet)

## Current
Subtopic 1 · starting sec 1.

## Working notes
- Per-section narration+reveals dumped to scratchpad `sections/secN.txt` by a python script that zips JSON sections with Supabase rows (script inline in session; re-derivable: fetch `lesson_sections?chapter_id=eq.<id>&order=position`, zip with JSON `sections` array, titles assert-match).
- Registration: ONE delimited Ch07 block appended at END of `src/components/scenes/index.ts` (imports hoisted; `REGISTRY[`${CH07}:N`] = Ch07SecN;` assignments after the object literal — avoids merge conflicts with ch3–6 sessions).
- Verify: `PORT=3007 CHAPTER_ID=29b5be47-3b75-550d-9636-ad45a901d4dd node verify-scene.mjs <sec> '<reveals_en>' '<reveals_hi>' ./shots/sec<M>` — all AUDIT lines must be `[]`; eye-check final frames both languages.
- Exemplars studied: Ch02Sec69, Ch02Sec70 (note: they use label sizes 11–13 in practice despite the 14 floor in SCENE_AUTHORING.md; hinglish labels are romanized Latin, not Devanagari).
