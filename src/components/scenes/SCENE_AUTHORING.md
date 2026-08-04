# Scene Authoring Prompt — MonkLearning Choreographed Board Scenes

This is the working prompt/spec used to turn a lesson section (narration +
`board_reveal_at` timestamps) into a choreographed, audio-synced board scene.
Hand this, plus the section's data, to Claude (or a developer) to produce
scenes consistently.

It is written as a set of **contracts**. "MUST" rules are non-negotiable; a
scene that violates one is not done, even if it "looks okay" in one
screenshot. The contracts exist because the failure modes are known:
overlapping text, labels sitting half-on/half-off a shape's outline, arrows
that point *near* a thing instead of *at* it, and elements dropped wherever
there was room. None of those may ship.

---

## The prompt

You are building a premium "live classroom board" scene for one section of a
MonkLearning physics lesson. A teacher's pre-recorded audio narrates; the
board must **visually demonstrate** what the voice is saying — a teacher's
hand actually doing the work on the board — never merely writing the
narration as text. The finished scene should feel like sitting in the front
row of a practical session: at every moment there is one clear thing being
drawn, moved, measured, counted, ringed or crossed out, exactly in step with
the voice.

### Inputs you are given

1. **Narration text** for the section, in both languages (english / hinglish).
2. **`board_reveal_at` timestamps** — an array of seconds, one per narration
   beat, per language (they differ between languages). From the
   `lesson_sections` table in Supabase.
3. The **scene kit** (`src/components/scenes/kit.tsx`) and the reference
   scenes (`Ch01Sec1.tsx`, `Ch01Sec3.tsx`).

---

### Step 1 — The canvas contract (know your stage before you block it)

- `viewBox="0 0 1080 620"`, `preserveAspectRatio="xMidYMin meet"`, svg is
  `w-full h-full select-none`. (The real board area measures ≈1.75:1 on
  common viewports; 1080×620 ≈ 1.74 fits it with hairline side margins. The
  board never scrolls — the whole scene MUST fit.)
- **Safe area**: x ∈ [36, 1044], y ∈ [30, 596]. Nothing — including arrow
  heads, ring overshoot and cross-out overhang (they extend ~4–8px beyond
  their target) — may leave it.
- **Row bands** (a default map, not a straitjacket — but if you deviate,
  your layout plan in Step 3 must say so):
  - Title band: y 30–80 (one line, usually `script`, centered at x 540).
  - Story / setup: y 90–260.
  - Main demo: y 270–470 — the biggest, emptiest region; the physical
    demonstration lives here.
  - Verdict / conclusions: y 480–596.
- **Column guides** for side-by-side ideas: thirds at x = 210 / 540 / 870,
  halves at x = 300 / 780. Snap groups to these instead of inventing
  arbitrary centers.
- Text size floor: 14. Body labels 16–22, verdict chips 18–22, title 28–34,
  hero numerals up to 64.

### Step 2 — Split the narration into beats

Beat *i* is the stretch of speech from `reveals[i]` to `reveals[i+1]`. Read
the narration aloud (or listen to the audio) and write one line per beat:
what is the teacher **doing** during those seconds? Not "what text appears" —
what would a great teacher draw, point at, cross out, or physically
demonstrate?

Example (Ch1 §1): beat 3 is ~40 seconds where the teacher measures a table.
The visual is not the sentence — it is: draw a table, step a 1-metre stick
across it (1… 2… 3… 3½), stamp "= 3.5 m", then re-measure with 10-cm ticks
while a counter races to 350, stamp "= 350 cm".

**Choose ONE visual idea per beat**, in this priority order:

- **An action beats a diagram**: something moves, steps, counts, fills,
  converges, gets crossed out.
- **A diagram beats a table**: hub-and-spokes, timelines, converging arrows,
  before/after cards.
- **A table beats prose** — and prose is only allowed as short hand-written
  labels (Kalam), quotes from the teacher, or verdict chips. If a "label"
  needs more than ~6 words, it is prose; cut it or draw it instead.
- **Every beat MUST contain at least one drawn or moving element.** A beat
  where text merely fades in is a failed beat — find the action in it (even
  a verdict can be *stamped*, *ringed*, or *underlined by a drawn stroke*).
- Reuse the teacher's own words for labels ("nanga number ✗", "physics same
  thi — rulers alag the") — the board should feel like *that* voice wrote it.
- Red = problem/warning, green = insight/answer, amber = highlight/structure,
  ink = facts.

### Step 3 — The layout plan (blocking pass, BEFORE any JSX)

This is the step that kills "randomly written somewhere on the board".

Write the plan as the scene file's header comment and keep it true as you
code. For **every element** in every beat, one line:

```
beat 3 | table outline   | Draw  | box x170..730  y300..326
beat 3 | "= 3.5 m" chip  | Chip  | box x760..880  y296..330
beat 3 | stick numeral   | T mid | cx450 baseline y354 → box x438..462 y336..360
```

Rules for the plan:

- **Every element gets an explicit box** (x-range × y-range). Estimate text
  boxes before rendering — these ratios were **measured** on the real fonts
  (Chromium `getBoundingClientRect`, converted to viewBox units):
  - width ≈ `0.50 × size × chars` (Anek sans) / `0.55 × size × chars`
    (Kalam latin; Devanagari syllables count as ~0.75 × size each) —
    over-estimate, never under. Longest of the two languages counts.
  - height: a `<text>`'s `y` is the **baseline**. The real ink box is much
    taller than one em: **Kalam** spans `y − 1.3×size` (top) to
    `y + 0.5×size` (bottom); **Anek sans** spans `y − 0.78×size` to
    `y + 0.31×size`. Planning with a shallower box is the #1 cause of
    row collisions and labels "sitting on" outlines — use these numbers.
  - vertical optical center: `y − 0.4×size` (Kalam) / `y − 0.24×size` (sans).
  - anchor matters: `middle` → box is `x ± w/2`; `start` → `x .. x+w`.
  - After the first render, **measure the real boxes** (evaluate
    `getBoundingClientRect` on every `svg text`, divided by the svg scale)
    and re-check every clearance against reality — estimates only get you
    to the first screenshot.
- **No two boxes may intersect**, across ALL beats that are simultaneously
  visible — a beat-6 ring drawn over a beat-2 zone must be planned against
  the beat-2 boxes. (Deliberate annotation overlaps — ring around, cross-out
  through — target exactly one element and are computed from its box; see
  Step 4.)
- **Dimmed/superseded content still occupies its box** — you may NOT draw new
  content over a `dim`med earlier group. Dimming lowers opacity; it does not
  free the space. The board is wide and tall — lay later beats in the FREE
  region (the empty bands below/beside), not on top of faded earlier work.
  If you have genuinely run out of room, fully REMOVE the old group (gate it
  off so it fades to opacity 0 and vacates its box) — never dim-and-overlay.
  The verifier now counts dimmed elements as present, so an overlap onto faded
  content is a FAIL, reported as `"new"(dimmed)`.
- **Minimum clearances** (between boxes, after the annotation exception):
  - text ↔ text: ≥ 14px, and unrelated stacked lines ≥ 1.6 × size between
    baselines.
  - text ↔ any stroke (shape outline, arrow shaft, divider): ≥ 10px.
  - group ↔ group (different ideas): ≥ 24px.
- **If it doesn't fit, change the plan, not the clearances**: shrink or
  `dim` a superseded earlier group, drop a decorative element, or move the
  demo to a wider band. Squeezing is how boards turn into noise.
- Alignment: within a group, pick ONE anchor discipline (all `start` at a
  common left edge, or all `middle` on a common center) — mixed anchors read
  as scatter.

### Step 4 — Precision rules for labels, arrows, rings, cross-outs

These four are where "minute mistakes" live. Each has a computation, not a
judgement call.

**Labels on/near shapes — never straddle an outline.** A label relating to a
closed shape (circle, box, table, card) is either:
- *fully inside*: its text box fits inside the shape with ≥ `0.4 × size`
  padding to the outline on every side. For a circle of radius r centered at
  (cx, cy): text width ≤ `1.6 × r − 20` and size ≤ `0.9 × r`; place the
  baseline at `cy + 0.26 × size` so the text is optically centered. If the
  words don't fit — they go outside. No shrinking below size 14 to force it.
- *fully outside*: ≥ 10px clear of the outline, connected (when the
  association isn't obvious) by a short 12–20px leader line that stops 4px
  short of both the outline and the text box.
- The half-in/half-out label crossing the stroke is **forbidden**.

**Arrows point AT things, not near them.** An arrow's job is to land on its
target. Compute, don't eyeball:
- Target = a specific glyph/number/chip with center `(tx, ty)` (for text:
  `ty = baselineY − 0.26 × size`) and half-extent `(hw, hh)` from its box.
- The tip ends on the line from the arrow's start toward `(tx, ty)`,
  stopping `5px` outside the target's box edge — close enough to be
  unambiguous, never touching the glyph.
- The tail starts ≥ 8px clear of whatever it starts from.
- The shaft MUST NOT cross any text box or another shaft. If it would,
  move the start point or curve around — rerouting beats crossing.
- An arrow into empty space, or one whose tip is >20px from its target's
  box, is a defect.

**Rings wrap their target exactly.** `ringD(cx, cy, rx, ry)` with:
- `(cx, cy)` = the target's box center (baseline math again),
- `rx = w/2 + 14`, `ry = h/2 + 12` (the hand-drawn path overshoots ~1.3×ry
  vertically — check the overshoot stays inside the safe area and clear of
  neighbours).
- If a ring at that size would intersect a neighbouring box, don't shrink it
  onto the glyph — use a drawn underline or an arrow instead.

**Cross-outs use the real box.** `crossD(x, y, w, h)` takes the target's
actual box (it already overhangs 4px). Crossing out more than the target —
or clipping a neighbour — is a defect.

### Step 5 — Choreograph inside each beat (the teacher's hand)

- Elements appear staggered, paced to the speech (`delay` in seconds after
  the beat's timestamp). A 10-second beat might be: outline draws (0s),
  label fades (0.9s), first mark (1.8s), second mark (2.8s), verdict chip
  (4.5s). Estimate delays from the narration pacing; verify against audio.
- **One hand**: a teacher has one hand — at any instant, at most ONE element
  is actively drawing/moving. Stagger so each `Draw`'s window
  (`delay .. delay+dur`) doesn't overlap the next one's in the same beat.
  Simultaneous drawing everywhere is the fastest way to lose the "happening
  in front of you" feel.
- **The thing first, its name second**: draw the shape, *then* fade its
  label (≥ 0.4s later). A label appearing before its object reads as
  slideware, not teaching.
- Order within a beat mirrors a real demonstration: object → action →
  measurement/mark → verdict.
- Give heavy moments air: after a big landing (a stamped result, a
  cross-out), let ~1s of narration pass before the next element.

### Step 6 — Implement as a pure function of time

Non-negotiable engine rules (all provided by the kit):

- The scene is `({currentTime, reveals, language}) => JSX`. **No internal
  state that depends on how you got here.** Pause, seek forward/back,
  language switch must all land on a correct board.
- `useBeat(currentTime, reveals)` gives the current beat index.
- **The blank-board contract**: at `currentTime === 0` (paused, before the
  student presses play) `useBeat` returns `-1`, so NOTHING beat-gated is drawn —
  the board starts empty and every element draws/writes/marks in step with the
  narration once play begins, never before it. Do NOT defeat this by rendering
  foundational structure ungated; give even axes/frames a beat so they draw on
  cue. The ONE exception is the section **title**: author it always-on
  (`<Fade on={true}>`) so the heading is visible on the otherwise-blank board.
  A scene that shows its diagram/answer at `t=0` before play is a failed scene.
- Every element declares its beat: `<Fade on={beat >= k} delay={dl(k, 1.5)}>`.
- **The settle rule**: wrap every delay in `dl = (k, d) => delayFor(beat, k, d)`.
  Delays only play while `k` is the *current* beat; once narration moves
  past, elements settle instantly — so seeking never replays stale staggers.
- Live-only effects (counters, a stick stepping via CSS animation) are gated
  `beat === k`, with an explicit **parked/settled version** rendered when
  `beat > k` (e.g. the stick sits dimmed at the far end, the counter shows
  its final value).
- Primitives: `Draw` (stroke-drawn path), `Fade` (rise+fade group, `dim` for
  de-emphasis), `T` (text; `script` = Kalam), `Chip` (size the chip from the
  text estimate: `w ≥ textWidth + 26`), `arrowD/ringD/crossD`, `useCountUp`,
  `useTimelineLabel`.
- Both languages from one component: `t("english", "hinglish")`. Same
  choreography, different words and different `reveals` — and the **layout
  plan must hold for the longer of the two strings**.
- When an old idea is superseded, `dim` it rather than removing it — the
  board accumulates like a real class. BUT accumulation is **spatial**: the
  dimmed idea stays in its own box and the new idea goes in fresh space beside
  or below it. Dimming is NOT permission to write on top — a faded group under
  new text reads as a messy overlap, not a teacher's board. If the board is
  full, a real teacher ERASES: gate the old group fully off (opacity 0) so it
  vacates its box, then use that space. Never dim-and-overlay. (Do not reach for
  scrolling — the board is a fixed, audio-synced canvas; manage space by erasing,
  not scrolling.)
- House palette only: INK `#1C1A16`, AMBER `#EEA31F`, AMBER_DARK `#9A6A12`,
  GREEN `#1C9B57`, RED `#DD4433`, CREAM `#FCF4E0`, MUTED `#9C988C`.

### Step 7 — Register and verify

1. Register in `src/components/scenes/index.ts`:
   `` [`${CHAPTER_ID}:${position}`]: NewScene `` (position is 1-based within
   the chapter). Unregistered sections fall back to standard board-event
   rendering, so scenes are purely additive.
2. `npx tsc --noEmit` must pass.
3. **Run the verdict verifier** — it drives both languages at `reveals[k]+1s`
   for every beat plus the settled final frame, and prints a text verdict
   instead of a wall of screenshots:
   ```
   PORT=<port> CHAPTER_ID=<uuid> node verify-scene.mjs <sec> \
     '<reveals_en json>' '<reveals_hi json>' ./shots/sec<N>
   ```
   It asserts three gating checks, per frame, in viewBox units:
   - **overlap** — two visible text boxes intersect (text-vs-text only).
   - **overflow** — any visible element (text OR stroke: arrowhead, ring,
     chip, rule) leaves the safe area x∈[36,1044] y∈[30,596].
   - **empty** — a reveal frame renders nothing (a dropped beat).
   It also prints an advisory **stall** (a beat that added no new group vs the
   previous — usually a legitimate superseded/`dim` beat; eyeball only if
   unexpected). The section is not done until the final line reads
   `VERDICT sec=<N>: PASS`. Exit code is 0 on pass, 1 on fail.
4. **Only open a PNG when a frame is listed under `SHOTS:`** — the verifier
   writes screenshots *only* for frames that failed a check, so a clean scene
   costs zero images to review. Set `FORCE_SHOTS=1` to write every frame when
   you want to spot-check a passing section by eye (recommended at least once
   per subtopic, since assertions catch geometry, not meaning — a wrong arrow
   target or awkward Hindi placement still needs an eye).
   Text-vs-stroke clearance and arrow-tip accuracy remain eye-checks on the
   frames you do open — zoom in on every ring, every arrow tip, every label
   near an outline.
5. Fix every overlap / overflow / straddle / stray arrow found, update the
   layout plan comment, and re-run until `VERDICT … PASS`.

### Definition of done

- Watching with audio feels like a teacher demonstrating in front of you —
  every beat has an action, one thing happens at a time, in step with the
  voice.
- Seek anywhere → board is exactly what it should be at that second.
- At `t=0` before play the board is blank except the title; press play and every
  element draws in step with the narration (nothing pre-drawn).
- Final frame is a clean, complete "notes photo" of the section: nothing
  overlaps, no label touches an outline, every arrow tip lands 5px off its
  exact target, everything inside 1080×620's safe area.
- The layout-plan comment in the file matches what's rendered.
- Both languages verified beat-by-beat; `verify-scene.mjs` prints
  `VERDICT sec=<N>: PASS`.

---

## Migration note (2026-07-29)

`Ch01Sec1–3.tsx` were authored on the old `1000×620` canvas and predate the
precision contracts (Steps 3–4) — they are being re-targeted to `1080×620`
and re-verified against this spec. New scenes start from this spec directly.
