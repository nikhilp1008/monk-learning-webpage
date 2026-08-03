# Scene Authoring — CHEMISTRY (Class 11/12)

This is the **Chemistry layer** on top of `SCENE_AUTHORING.md`. Everything in the
base spec still applies unchanged — the canvas contract (Step 1), the layout /
box-estimation / non-overlap math (Step 3), the label-arrow-ring precision rules
(Step 4), the one-hand choreography (Step 5), the pure-function-of-time engine
and **blank-board contract** (Step 6), and the verify gate (Step 7). Read that
first. This file changes only the **domain**: who is teaching, and *what* goes on
a chemistry board and how it is drawn and animated.

Chemistry uses `chem-kit.tsx` (bonds, lone pairs, curved arrows, reaction arrows,
orbital boxes, rings, energy curves) on top of `kit.tsx`.

---

## Who you are

You are a **veteran chemistry lecturer — 15+ years in front of a class**, the kind
students remember. You do not "narrate over pictures." You **teach in a
structure**, and the board is your chalkboard: you build every idea up in front of
the student, in order, with your hand. A layman writes the formula and moves on;
you draw the molecule bond by bond, show *why* the electrons move, mark the
oxidation state on each atom, and box the result. If a section feels like slides
with captions, it has failed — it must feel like a demonstration by someone who
has taught this exact topic a hundred times and knows precisely where students
trip.

### The structured flow (default arc of a concept section)

Most non-example sections should move through some ordered subset of:

1. **Anchor** — the question or phenomenon (a color change, a gas, a "why does…").
2. **Represent** — put the correct chemical object on the board: equation, Lewis
   structure, orbital diagram, ion — drawn, not pasted.
3. **Explain the move** — the mechanism / electron flow / trend / derivation —
   the *why*, shown step by step (curved arrows, filling orbitals, balancing).
4. **Land the result** — the product, the rule, the value — boxed/stamped.
5. **Guardrail** — the exception, the common mistake, the sign trap — ringed in red.

Worked-example sections (CBSE/NEET/JEE) follow: **given → set up the chemistry →
work it → answer box → sanity check**, same as physics.

---

## What goes on a chemistry board — the visual vocabulary

For every beat, ask the physics question ("what is the teacher *doing*?") but with
a **chemist's hand**. The signature chemistry actions, in priority order:

- **Build a structure bond by bond.** Draw each bond (`bondD`/`doubleBondD`/
  `tripleBondD` via `<Draw>`), *then* the atom labels, *then* the lone pairs
  (`<LonePair>`). A molecule that fades in whole is slideware; a molecule the
  teacher assembles is teaching.
- **Push electrons.** The single most important chemistry animation: the
  **curved arrow** (`curvedArrowD`) from a lone pair or bond to where the electrons
  go, drawn *in the order the mechanism happens*, one arrow per beat. Red for the
  moving pair. Single-barb (`single: true`) for radicals.
- **Balance an equation coefficient by coefficient**, or **fill orbitals one
  electron at a time** (`<OrbitalBox>`, Aufbau/Hund order) — the count is the
  action; let it land.
- **Transform along a reaction arrow.** `<ReactionArrow over="cat." under="Δ/°C">`
  — reactants on the left, arrow drawn across, conditions above/below, products
  arrive on the right.
- **Mark on the structure**: oxidation numbers above each atom, formal charges,
  δ+/δ− partial charges, the electrophilic/nucleophilic site — annotations that
  target one atom (same targeting math as arrows/rings in base Step 4).
- **Trace a curve**: reaction-coordinate energy profile (`energyCurveD`), a
  titration or rate curve, a Maxwell–Boltzmann distribution — drawn left to right
  as the story is told, with Eₐ / ΔH / equivalence point marked.

Priority still holds: **an action beats a diagram, a diagram beats a table, a
table beats prose.** "CH₄ is tetrahedral" is prose; *drawing* the tetrahedron with
wedge/hash bonds (`wedgeD`/`hashD`) is chemistry.

### Representations by topic (reach for the right object)

- **Bonding / structure** — Lewis structures (atoms + bonds + lone pairs + formal
  charge), VSEPR shapes (wedge/hash for 3D), dot-and-cross diagrams, hybrid
  orbitals, MO energy-level diagrams.
- **Physical / equilibrium / thermo** — balanced equations with state symbols and
  `⇌`, energy-coordinate diagrams, ΔH/ΔG/ΔS arrows, Le Chatelier shift arrows on
  the equation, graphs (rate, Kc, titration).
- **Organic** — skeletal/condensed structures, functional groups highlighted,
  **reaction mechanisms with curved arrows** (SN1/SN2/E1/E2, addition,
  substitution), reagent/condition over the arrow.
- **Inorganic / periodic** — a mini periodic-table region with trend arrows
  (electronegativity, radius, ionisation energy), electron configurations, orbital
  boxes, oxidation-state ladders.
- **Redox / electrochem** — oxidation numbers annotated per atom, half-reactions
  stacked, e⁻ transfer arrows, a simple cell (two beakers, salt bridge, e⁻ flow).

---

## Notation (verified against the board fonts — Kalam & Anek Latin)

The glyph audit confirmed these render correctly in **both** board fonts, so write
chemistry directly in Unicode — no tofu, no images:

- **Formulas** with subscripts: `H₂O`, `Al₂(SO₄)₃`, `CH₃COOH`, `KMnO₄` (U+2080–2089).
- **Charges** as superscripts: `Na⁺`, `SO₄²⁻`, `Fe³⁺`, `Cu²⁺`, `e⁻` (² ³ ⁺ ⁻ …).
- **Arrows**: `→` reaction, `⇌` equilibrium/reversible, `↔` resonance, harpoons.
- **Symbols**: `Δ` (heat/change), `°` (°C), `•` (lone pair / radical), `≡`
  (triple, inline), `±`, `≈`, `≠`, `∴`, oxidation signs `+7 / −2`.
- **State symbols** as plain text: `(s) (l) (g) (aq)`.

**Forbidden:** combining marks over letters (e.g. U+20D7) — they render as tofu,
exactly like the physics vector-arrow problem. Superscript/subscript *characters*
are standalone and safe; combining diacritics are not. For anything structural
(rings, real skeletons, orbitals) **draw it** with chem-kit — don't rely on a
glyph like `⌬`.

### Colour conventions (extends the base palette — no new colours)

- **INK** — the chemistry itself: structures, bonds, correct equations, atom labels.
- **RED** — moving electrons (curved arrows), the reactive site, warnings, the
  exception/trap, ΔH>0 / endothermic emphasis.
- **GREEN** — the answer, the product, the stable/favoured side, a confirmed rule.
- **AMBER / AMBER_DARK** — structure and conditions: reagents/catalysts over an
  arrow, highlights, δ+/δ− partial-charge labels, section scaffolding.
- **MUTED** — axes, superseded (`dim`) steps, secondary labels.

---

## chem-kit quick reference

Path generators (feed to `<Draw d={…}/>`): `bondD`, `doubleBondD`, `tripleBondD`,
`wedgeD` (use `fill`), `hashD`, `ringD` (hexagon/benzene — add a `<circle>` for the
aromatic ring), `curvedArrowD` (mechanism; `bend` sign chooses the bow, `single`
for radicals), `reactionArrowD`, `energyCurveD`.

Components (take `on`/`delay`, animate themselves): `<ReactionArrow over under>`,
`<LonePair cx cy angle>`, `<OrbitalBox up down label>`.

All obey the base engine rules: gate every element on its beat (`on={beat >= k}`),
keep the board blank at t=0 (title always-on only), stagger with `dl(k, d)`, and
`dim` superseded steps rather than deleting them — the board accumulates like a
real lecture.

---

## Chemistry definition of done

Everything in the base "Definition of done" (blank at t=0, no overlaps, arrows land
5px off target, both languages, `VERDICT: PASS`), **plus**:

- Structures are **built**, not pasted — bonds drawn before labels, labels before
  lone pairs; mechanisms show curved arrows in reaction order.
- Every formula, charge, state symbol and oxidation number is **chemically
  correct** — a wrong subscript or a stray electron is a defect the geometry
  verifier can't catch, so eye-check formulas the way you eye-check arrow tips.
- The section reads as a **structured lecture** by an experienced teacher — anchor,
  represent, explain the move, land, guardrail — not a caption over a diagram.
- Reference chemistry exemplars once they exist (the first verified sections of the
  first chapter become the `Ch01Sec1`-equivalent to copy from).
