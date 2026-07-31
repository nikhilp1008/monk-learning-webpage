# Scene Generation Playbook — driving Claude Code to author board scenes

`SCENE_AUTHORING.md` is the **contract** (what a finished scene must satisfy).
This file is the **operating manual**: how to run a Claude Code session so it
produces scenes that pass that contract on the first or second try. It was
distilled from building Ch1 (92 sections) and Ch2 (73 sections) end to end.

---

## 1 · Session setup (do once per session)

1. Work in `~/Desktop/monk-learning-webpage`, branch `premium-board`.
2. A server must be running on the port you'll verify against
   (`npm run dev`, default :3000).
3. Pull the inputs for the whole chapter **up front** and merge them into one
   scratch file per section, so the per-section loop never re-queries:
   - Narration (en + hinglish) from `JSON_LESSONS/<class>/<chapter>_full.json`
     (`sections[i].narration.{english,hinglish}.segments`).
   - `board_reveal_at_english/_hinglish`, durations from Supabase
     `lesson_sections` (`.env.local` has the URL and anon key; chapter ids come
     from `chapters` filtered by `subject`/`class_level`).
   - Sanity-check: reveal counts equal in both languages, audio URLs present.
4. Read, in this order: `SCENE_AUTHORING.md`, `kit.tsx`, **two reference
   scenes** — one text-layout scene (e.g. `Ch01Sec90`) and one diagram scene
   (e.g. `Ch01Sec76`). Everything the model writes should look like those.

## 2 · The per-section loop (never deviate)

```
read secN scratch JSON  →  plan beats + layout (in thinking, not on disk)
→ write ChNNSecM.tsx    →  register in index.ts
→ npx tsc --noEmit      →  verify-scene.mjs until VERDICT: PASS
→ eye-check if needed   →  git commit "ChNN SecM: <what>"
```

One section per commit. Never batch sections before verifying; a collision
found three sections later is much more expensive to localise.

Verify command (verdict mode):

```
CHAPTER_ID=<uuid> PORT=<port> node verify-scene.mjs <sec> '<reveals_en>' '<reveals_hi>' ./shots/chNsecM
```

- Done **only** when it prints `VERDICT sec=<N>: PASS`. Gates: text-vs-text
  overlap, safe-area overflow (text *and* strokes), empty reveal frame.
- Screenshots are written only for failing frames; open a PNG only when it is
  listed under `SHOTS:`. Use `FORCE_SHOTS=1` about once per subtopic for a
  by-eye spot-check — the assertions catch geometry, not meaning (a
  wrong-target arrow or awkward Hindi still needs an eye).
- If the script exits with no output, the server was busy — just rerun it.

## 3 · Planning: where quality is actually decided

**Do the layout plan as arithmetic, before any JSX.** Every element gets an
estimated box, using the measured ratios from the spec:

- width ≈ `0.50 × size × chars` (sans) / `0.55 × size × chars` (Kalam).
  Always plan against the **longer of the two languages** — write the hinglish
  string first if unsure, it is usually the longer one.
- text ink box: Kalam `bl−1.3×size … bl+0.5×size`; sans `bl−0.78×size …
  bl+0.31×size`. Planning with a shallower box is the #1 collision cause.
- Practical spacing that survives the audit: stacked note lines at **24–30 px
  baseline pitch** (size 12–14); ≥10 px text↔stroke; leave the arithmetic in
  the header comment so the next fix is grounded.

**One visual idea per beat**, chosen by the spec's hierarchy (action > diagram
> table > prose), and **every beat needs at least one `Draw`** — a beat where
text merely fades is a failed beat. If a beat is only a verdict sentence, give
it a drawn margin bar, underline, tick or ring so something *happens*.

**Vertical budget first.** Sketch the row map (title / demo / cards / notes /
verdict) and count lines before placing anything. If five note lines must fit
under y≈470, compute the pitch; if it comes out under ~24 px, cut a line —
squeezing clearances is how boards turn into noise.

## 4 · Choreography rules that keep seeking correct

- Pure function of `(currentTime, reveals, language)`. Every delay goes
  through `dl = (k,d) => delayFor(beat,k,d)` so seeks settle instantly.
- One hand: stagger `Draw` windows inside a beat; thing first, label ≥0.4 s
  later; ~1 s of air after a heavy landing.
- Beats that are near-simultaneous in one language (reveals 1 s apart happen —
  e.g. EN b2/b3/b4 within 3 s) need no special handling: delays only play in
  the *current* beat, so the crammed language settles instantly while the
  other language gets the full stagger. Don't shorten delays for this.
- Live effects (`useCountUp`, gated `beat === k`) are almost never needed —
  Ch1+Ch2 used them in exactly one scene. Prefer declarative Draw/Fade.

## 5 · Recurring motifs (reuse, don't reinvent)

Consistency across 70+ scenes comes from a small motif vocabulary:

- **Red-margin note** — `Draw M 66 y v h` bar + 1–3 Kalam lines st x84.
  Green/amber variants for verdicts/pro-tips (x56/x66, text x72/x84).
- **Formula card** — rounded-rect `Draw` (often `fill={CREAM}`), formula sans
  18–24, optional script sub-line, green double-underline for "the result".
- **Worked-example card grid** — 2×2 answer cards with header (script 12,
  colored) / formula (sans 14–18) / note (script 11 muted).
- **Pitfall closer** — numbered red `Badge` circles at x76 + one line each,
  then a big amber pro-tips box (this exact shape ends *every* subtopic).
- **Flowchart** — muted skeleton drawn in one beat, then each box re-stroked
  in its color as its beat arrives.
- **Table builder** — outer frame + verticals in beat 0, one row (+ its
  horizontal rule) per beat.
- **The ladder** — x/v/a boxes, red arrows right, green arrows left; reused in
  three sections deliberately, because recognition is the point.
- **Options row + verdicts** for MCQs — chips, cross-out on the trap, green
  ring on the answer (`ringD` sized `rx = w/2+14`), arrow at "the eye's
  answer".

## 6 · Hard-won gotchas (each cost a fix cycle once)

1. **Dashed lines cannot use `Draw`** — its stroke-dash reveal trick conflicts
   with `strokeDasharray`. Wrap a plain dashed `<path>` in `Fade` instead
   (chords, guides, asymptotes, trajectories).
2. **Ring a glyph inside a line of text? Split the text.** Render the target
   words as their own `<T>` with per-language x positions, then `ringD` that
   element (Ch2Sec12 "equal distance"). Estimating a substring's position
   inside one string is not reliable.
3. **When a ring must hit a small glyph, measure first.** Run a 10-line
   playwright eval that converts `getBoundingClientRect` to viewBox units, and
   place from the real box (Ch2Sec2's "0"). If a properly-sized ring would
   clip a neighbour, the spec's own escape hatch is right: use a drawn
   underline instead.
4. **Leader arrows can lie.** An arrow whose tail sits near label A while
   pointing at element B reads as pointing at A. If association is already
   carried by color + proximity, delete the leader (Ch2Sec4).
5. **Tick labels love to sit on strokes.** Any axis label near a vertical
   guide/step (x = the tick value) will straddle it — offset the label 12–16 px
   sideways (Ch2Sec27's "2").
6. **Narration color words vs the palette.** Narration may say "blue line";
   the palette has no blue. Precedent (Ch1Sec31, Ch2Sec1): keep the house
   palette, disambiguate by shape/position/label. Use RED for whatever the
   narration calls red — that one you can honor.
7. **Fractions/subscripts**: prefer unicode (`½ ⅔ ₁ ₂ ² ⁻¹ ⁄`) over tspan
   gymnastics; use `<tspan dy>` only when a real sub/superscript matters
   (Ch2Sec1's `x_f`), knowing the audit measures the whole text box.
8. **Kalam titles at bl 56–58 technically poke above y30** for the ascender
   estimate; real ink doesn't. This is the one place the estimate is
   pessimistic — the verifier measures truth, trust it.
9. **`awk`-filtered verify output can be empty** when the server hiccups; an
   empty result is *not* a pass. Rerun and demand the VERDICT line.

## 7 · Language discipline

- Both languages come from one component via `t("english", "hinglish")` — the
  layout must hold for the longer string. Hinglish labels are romanized
  (Latin script), reuse English technical terms (velocity, displacement,
  equation ①), and should carry the teacher's voice ("ratta mat maaro", "muft
  jaanch"), not literal translation.
- Reuse the narration's own phrases as board labels — the board should feel
  like that voice wrote it ("the slow leg hogs the clock", "politely decline").

## 8 · Registration & bookkeeping

- `index.ts`: one import + one `` [`${CHNN}:pos`] `` line per scene. Doing this
  edit via a small python string-replace keeps it mechanical and diff-clean.
- Commit message format: `ChNN SecM: <concrete content summary>`; mark
  subtopic completions in the message ("subtopic 3 complete (43/73)").
- End of chapter: count files, grep-count registry entries, assert no gaps
  1..N, final `tsc`, a 10-section live smoke test, push, and update the
  project memory handoff.

## 9 · Cost control

- Verdict-mode verify is the big lever: a clean section costs ~10 lines of
  text and zero images.
- Read English narration in full; skip full hinglish dumps (labels are
  authored fresh anyway).
- Model tiering (see memory note): concept/example/recap sections work on a
  smaller model; keep the strongest model for multi-part derivations with real
  geometry, kit/spec changes, and coordination.
