# Chapter 11 — Thermodynamics — Progress

- Branch: `premium-board-ch11` · Worktree: `~/Desktop/monk-scenes-ch11` · Dev port: **3011**
- chapter_id: `58c19132-676f-5dfb-b84e-e3a34b34a48e`
- Lesson JSON: `JSON_LESSONS/Class11_Phy/p11_ch11_thermodynamics_full.json`
- Sections: 61 (Supabase `position` 1–61 = JSON `section_index`)
- Registry const: `CH11` (appended at end of `src/components/scenes/index.ts`)

## Subtopic map
1. 1–8   State / Zeroth Law
2. 9–15  First Law
3. 16–24 Processes
4. 25–32 Specific Heats & Mayer
5. 33–38 Heat Engines / Refrigerators
6. 39–45 Second Law / Reversibility
7. 46–53 Carnot
8. 54–59 Entropy
9. 60–61 Recap

## Data notes
- `board_reveal_at_english`/`_hinglish` arrays fetched once for all 61 sections
  (cached locally during authoring) — beat counts (narration segments ==
  reveal array lengths, both languages) verified to match for all 61 sections
  before starting.
- Many sections have a run of consecutive beats exactly 1.0s apart (an
  alignment-fallback artifact also present in already-shipped chapters, e.g.
  Ch07) — sometimes at the *start* of the reveal array for one language and
  the *end* for the other (the two languages' slow/fast beats don't line up).
  This is expected: `delayFor`'s settle rule means a beat's elements always
  end up fully visible once the beat has passed, regardless of how much real
  time that beat got in a given language — so choreography is authored for
  generous pacing and simply settles faster where a language's beat is short.

## Done
1. State/system/surroundings/wall — molecule box crossed out (macroscopic), 5 state-variable chips → STATE, system-in-surroundings diagram with wall ringed, twin-gas diathermic→adiabatic wall demo, WALL verdict.

## Current
Starting Section 2.
