# Chapter 9 — Hydrocarbons (Class 11 Chemistry) — Progress

- chapter_id: `388fccf5-9390-50aa-b678-5800a9e4fffa`
- branch: `premium-board-chem9` · worktree: `~/Downloads/monk-scenes-chem9` · dev port: `3028`
- Naming: `C11Ch09SecM.tsx`, component `C11Ch09SecM`, registry key `` `${C11CH09}:M` ``
- Spec: `src/components/scenes/SCENE_AUTHORING_CHEMISTRY.md` (domain) over
  `SCENE_AUTHORING.md` (engine/precision contract) + `chem-kit.tsx` (bond/mechanism
  primitives) + `kit.tsx` (base primitives). This chapter is the **first** to use
  `chem-kit.tsx` — Sec 1, once verified, becomes the house exemplar for future
  chemistry chapters.
- 80 sections total. **77 to author** — Sec 11, 47, 53 are SKIPPED (see below).

## Subtopic map
- 1–5 Classification of Hydrocarbons
- 6–21 Alkanes
- 22–41 Alkenes
- 42–58 Alkynes
- 59–78 Aromatic Hydrocarbons
- 79–80 Chapter Recap

## SKIPPED (placeholder / uniform-timing audio — revisit once real audio lands)
- Sec 11 — "Preparing alkanes II: the Wurtz reaction"
- Sec 47 — "Physical properties of alkynes"
- Sec 53 — "Polymerisation of ethyne"

## ⚠ KNOWN ISSUE (resolved with a workaround): this chapter's audio CDN 404s
All `audio_url_english`/`audio_url_hinglish` for this chapter point to
`audio.monklearning.com/11/Chemistry/c11_ch09/...` which returns **404** for
every section checked (confirmed sec 1, 2, 40, 80 — and the sibling
`c11_ch05` chapter's audio 404s too, so this is a broader not-yet-generated-
audio pipeline gap, not specific to ch09). Same failure mode chem8's Ch02
hit before ("BLOCKED on broken audio CDN", see that worktree's git history).

Consequence: the app's board playback is driven entirely by the real
`<audio>` element's `loadedmetadata`/`timeupdate` events. With the file
404ing, `duration` stays `NaN` and `currentTime` never leaves 0 — every
beat-gated element stays hidden and `verify-scene.mjs` "passes" on a
permanently-blank (title-only) board. A false positive, not a real check.

**Workaround (this worktree only, does not touch the shared `verify-scene.mjs`):**
`scratch/verify-scene-mocked.mjs` — identical assertions/output, but
`page.route()`-intercepts requests to `audio.monklearning.com` and fulfills
them with a locally-synthesised silent WAV (`Accept-Ranges: bytes` header is
required or Chromium refuses to seek within it) sized to cover the section's
reveals. This makes `loadedmetadata`/seeking/`timeupdate` fire for real, so
it gives genuine beat-by-beat overlap/overflow/empty checks, not just a
screenshot eyeball. Confirmed working end-to-end on Sec 1 (FORCE_SHOTS
eyeballed clean in both languages, real per-beat progression, zero stalls).
**All sections in this chapter are verified with this script, not the
original.** Once the real CDN audio is live, a normal `verify-scene.mjs`
pass should need no rewrite (choreography is against the real reveals/content
already).

## Done
(append one line per finished section: `Sec N: <title> — <one-line what the scene shows> — PASS [mocked-audio]`)
- Sec 1: The hydrocarbon family tree — root "HYDROCARBONS" branches into ALIPHATIC/ALICYCLIC/AROMATIC, aliphatic splits saturated/unsaturated with CnH2n+2/CnH2n/CnH2n-2 chips, alicyclic vs aromatic rings (plain hexagon vs hexagon+circle), red theme banner — PASS [mocked-audio]
- Sec 2: Cycloalkanes and Baeyer's ring strain — chain→ring pictogram, CnH2n formula, red "same formula as alkenes, no double bond" trap, cyclo-+hexane=cyclohexane naming, 109.5° tetrahedral icon, 4-ring strain row (triangle 60°/square 90° red-strained, pentagon ~108° near-strain-free, chair-zigzag cyclohexane green-stable) — PASS [mocked-audio]
- Sec 3: How cycloalkanes react: strain decides — strained-ring lane (triangle + H2/catalyst → CH3CH2CH3, "mimics unsaturation") vs strain-free lane (pentagon + hν,X2 → R–X substitution), red rule banner — PASS [mocked-audio]
- Sec 4: Ordering cycloalkanes by stability (worked example) — 4-row table (icon/name/angle/deviation) for all four rings, green answer chain "cyclohexane > cyclopentane > cyclobutane > cyclopropane", red reactivity-is-reverse note — PASS [mocked-audio]
- Sec 5: Two classic cycloalkane traps (tips) — TRAP 1 (CnH2n chip shared with alkenes, red "≠ double bond", cyclopropane-adds-from-strain aside) and TRAP 2 (assuming flat, red "cyclohexane is puckered" + chair icon), amber pro-tip banner — PASS [mocked-audio]
- Sec 6: Saturated hydrocarbons: the paraffins — 4-bond methane-like icon (every valency filled), double bond drawn then crossed out (none waiting to react), paraffins/parum affinis etymology, CnH2n+2 chip, CH₄/C₂H₆ examples, red "unreactive toward acids/bases, not oxygen" caveat — PASS [mocked-audio]
- Sec 7: The homologous series — drawn 5-step ascending staircase with CH₄→C₅H₁₂ landing on each tread, green rising arrow for "boiling point rises smoothly", red payoff banner — PASS [mocked-audio]
- Sec 8: sp3 geometry and free rotation — tetrahedral tent icon, drawn zigzag carbon backbone with 109.5° angle arc (never a straight rod), steering-wheel icon for σ-bond rotation, red "not perfectly free" note — PASS [mocked-audio]
- Sec 9: Key definitions and formulae (fact-sheet) — CnH2n+2 chip, boxed combustion equation (high emphasis), geometry/alkyl/degree facts, red halogen/hydrogen reactivity orders, torsional strain note — PASS [mocked-audio]
- Sec 10: Preparing alkanes I: hydrogenation and reduction — two reaction rows (CH2=CH2+H2 --Pt/Pd/Ni--> CH3-CH3; R-X+2[H] --Zn,dil.HCl--> R-H+HX), red "not the fluoride" note — PASS [mocked-audio]
- Sec 12: Preparing alkanes III: from carboxylic acids — decarboxylation (CH3COONa+NaOH --CaO,Δ--> CH4+Na2CO3, drops a carbon) vs Kolbe's electrolytic (couples fragments, even carbons), red "Kolbe doubles / decarboxylation drops one" mnemonic — PASS [mocked-audio]
- Sec 13: Free-radical halogenation: the three-step chain — Cl-Cl bond with single-barb curved (radical) arrows for homolysis, hν reaction arrow, two propagation equations, loop icon for chain regeneration, termination equation, red 3°>2°>1° selectivity — PASS [mocked-audio]
- Sec 14: Conformational analysis of ethane — drawn Newman projections (staggered vs eclipsed spokes), energy bars (short green/tall red) with dashed gap connector, ΔE≈12.5 kJ/mol, red "conformers can't be isolated" note — PASS [mocked-audio]
- Sec 15: Physical properties of alkanes — 3-segment phase bar (C1-C4 gas/C5-C17 liquid/C18+ solid), green rising arrow for boiling-point trend, red "like dissolves like" solubility note — PASS [mocked-audio]
- Sec 16: The rest of the reaction map — boxed combustion equation (ΔcH=-890) plus 6 concise one-line reactions (incomplete combustion, controlled oxidation, KMnO4, isomerisation, aromatization, steam+pyrolysis) — PASS [mocked-audio]
- Sec 17: CO2 volume from combustion of propane (CBSE worked example) — given→step1 moles→boxed balanced equation→step3 ratio→step4 volume→green answer chip "3.36 L CO2 at STP" — PASS [mocked-audio]
- Sec 18: Counting monochloro products (NEET worked example) — drawn 2-methylbutane skeleton with 4 color-coded H-environment rings (red×2 equivalent methyls, amber tertiary H, green×2 methylene/methyl), green "4 products" answer, red over-counting trap — PASS [mocked-audio]
- Sec 19: Wurtz product and its monochloro count (JEE Main worked example) — isobutyl bromide + boxed Wurtz equation → 2,5-dimethylhexane, red "3 types ⇒ 3 monochloro products" — PASS [mocked-audio]
- Sec 20: Tetramethylbutane: m.p., chlorination, conformers (JEE Advanced, 3-parter) — drawn symmetric "bowtie" structure (two tert-butyl halves), packing/m.p. argument, red "3°>2°>1° irrelevant" note, conformer aside — PASS [mocked-audio]
- Sec 21: Alkane pitfalls and pro-tips (closes Alkanes subtopic) — 4 traps (miscounting monochloro products, eclipsed/staggered swap, Wurtz misuse, confusing reactivity orders) each with amber/red guardrails — PASS [mocked-audio]

- Sec 22: The double bond is the whole personality — drawn ethene structure (C=C+4H), CnH2n chip, amber ring on the double bond, dashed π-cloud arc, red "add electrophiles across C=C" theme — PASS [mocked-audio]
- Sec 23: Two kinds of glue: sigma and pi — thick σ bond line vs dashed π cloud arc (bolt vs rubber band), bond-energy numbers, red "electrophile trades π for 2 new σ" payoff — PASS [mocked-audio]
- Sec 24: cis and trans: a plank, not a swivel — drawn cis-/trans-but-2-ene structures (green same-side vs red opposite-side CH3), dipole comparison, red "needs 2 different groups" gate — PASS [mocked-audio]

- Sec 25: Key definitions and formulae (alkene fact-sheet) — CnH2n chip, σ/π/C=C bond energies, lengths, cis/trans polarity, red Markovnikov note, HX reactivity, unsaturation tests — PASS [mocked-audio]
- Sec 26: The orbital picture of ethene — drawn ethene skeleton framed by top/bottom dashed π-lobe arcs (sp2 σ framework in-plane, π cloud out-of-plane), red "reactivity hangs on this weak π cloud" — PASS [mocked-audio]
- Sec 27: Naming alkenes and dienes — 3-step IUPAC rule list, but-1-ene/but-2-ene examples, diene/triene extension, red isoprene/natural-rubber note — PASS [mocked-audio]

- Sec 28: Physical properties of alkenes — phase bar (first 3 gas/next ~14 liquid/higher solid), green rising BP-trend arrow, red "straight chain boils higher than branched" note — PASS [mocked-audio]
- Sec 29: Making alkenes I: from alkynes (geometry control) — two reaction lanes (Lindlar's poisoned Pd → green cis-alkene; Na/liq.NH3 → red trans-alkene), concrete CH3-C≡C-CH3 example, red "reducing system SETS geometry" exam hook — PASS [mocked-audio]
- Sec 30: Making alkenes II: three eliminations — (b) dehydrohalogenation, (c) dehalogenation (CH2BrCH2Br+Zn→CH2=CH2+ZnBr2 reaction arrow), (d) dehydration, red "all four routes unveil C=C" closer — PASS [mocked-audio]

- Sec 31: Electrophilic addition: hydrogen and halogens — H2/Ni,Pd,Pt reaction row, Br2/Cl2 vicinal-dihalide equation, iodine exception, Br2/CCl4 test, red "electron-rich, π cloud" theme — PASS [mocked-audio]
- Sec 32: HX addition and Markovnikov's rule — propene skeleton with two curved mechanism arrows (π→H⁺ forming the carbocation, Br⁻→C2 closing it), green "2° beats 1°", red restated-Markovnikov note — PASS [mocked-audio]
- Sec 33: The peroxide (Kharasch) effect — propene skeleton with a single-barb (radical) curved arrow for Br• addition to the terminal carbon, red HBr-only bond-strength explanation, "Br Breaks the Rule" memory hook — PASS [mocked-audio]

- Sec 34: Adding sulphuric acid and water — two Markovnikov addition rows (cold H2SO4 → alkyl hydrogen sulphate; H2O/H2SO4 → alcohol), same carbocation logic as HX, red "standard lab route" note — PASS [mocked-audio]
- Sec 35: Oxidation: Baeyer's test and cleavage — mild (cold dil. KMnO4 → vicinal glycol) vs forcing (hot KMnO4/K2Cr2O7 cleaves to 2 CH3COOH) oxidation, red "=CH→COOH, 2-alkyl C→ketone" reading rule — PASS [mocked-audio]
- Sec 36: Ozonolysis and polymerisation — alkene→(i)O3→ozonide(pentagon)→(ii)Zn/H2O→two carbonyls scheme, red "2 alkyls⇒ketone, 1H⇒aldehyde" rule, polythene addition-polymerisation line — PASS [mocked-audio]

- Sec 37: but-1-ene + HBr, with and without peroxide (CBSE worked) — (i) without peroxide→2-bromobutane (Markovnikov, green); (ii) with peroxide→1-bromobutane (red, anti-Markovnikov) — PASS [mocked-audio]
- Sec 38: Which alkene shows geometrical isomerism? (NEET worked) — 3-candidate gate-check table with ✗/✓ marks, green "only (B) pent-2-ene" answer, trap note — PASS [mocked-audio]
- Sec 39: Ozonolysis: identify the alkene (JEE Main worked) — reverse-ozonolysis stitch (propanal+ethanal→pent-2-ene), green C5H10 confirmation, red "peroxide reverses only with clear 1°-vs-2°" teaching point — PASS [mocked-audio]

- Sec 40: Carbocation rearrangement (JEE Advanced worked) — 2° cation + curved arrow "1,2-H shift" → 3° cation, green result, red "real Markovnikov rule" driving-force note — PASS [mocked-audio]
- Sec 41: Alkene pitfalls and pro-tips (closes Alkenes subtopic) — 4 traps (cis-trans without checking substituents, peroxide on HCl/HI, forgetting rearrangement, ozonolysis reconstruction) with amber/red guardrails — PASS [mocked-audio]

- Sec 42: Pull the carbons closer, add a third bond — drawn H-C≡C-H ethyne structure with a dashed two-lobe π-cylinder, CnH2n-2 chip, red "two π bonds ⇒ can add two molecules" theme — PASS [mocked-audio]
- Sec 43: s-character sets the acidity — 3-column sp3/sp2/sp comparison (¼/⅓/½ s-character), red "more s-character = more acidic" most-tested note, metal acetylide payoff — PASS [mocked-audio]
- Sec 44: Key definitions and formulae (alkyne fact-sheet) — CnH2n-2 chip, linear geometry, triple-bond composition, bond energies/lengths, red acidity order, HC≡CH+Na equation, Markovnikov/Br2 test — PASS [mocked-audio]

- Sec 45: The orbital picture of ethyne — linear H-C≡C-H skeleton with two perpendicular π systems (amber up/down lobes + green encompassing ellipse), red "electron-rich cylinder, room to add twice" — PASS [mocked-audio]
- Sec 46: Naming and isomerism — common vs IUPAC naming, ethyne/propyne (single structure) vs but-1-yne/but-2-yne (position isomers), C5H8 chain-isomer set, red exam-speed note — PASS [mocked-audio]
- Sec 48: Preparing alkynes: two routes — (a) 4-arrow CaCO3→CaO→CaC2→C2H2 industrial chain, (b) two-elimination row (dihalide→alc.KOH→vinyl halide→NaNH2→triple bond), red "match base to difficulty" note — PASS [mocked-audio]

- Sec 49: The signature reaction: acidity and acetylides — Na/NaNH2 deprotonation equations, disodium ethynide, red acidity order HC≡CH>CH3C≡CH>CH3C≡CCH3 — PASS [mocked-audio]
- Sec 50: Electrophilic addition I: hydrogen and halogens — two 2-arrow reaction chains (H2/Ni,Pd,Pt: alkyne→alkene→alkane; Br2: alkyne→dihaloalkene→tetrahalide), red "why twice" note — PASS [mocked-audio]
- Sec 51: Electrophilic addition II: hydrogen halides — HC≡CH+2HBr→CH3CHBr2 gem-dihalide, propyne example, gem-vs-vicinal distinction, red "track the reagent" memory rule — PASS [mocked-audio]

- Sec 52: Kucherov hydration — HC≡CH+H2O --HgSO4,333K--> [enol] --tautomerise--> CH3CHO chain, red "higher alkynes → ketone, never stop at enol" — PASS [mocked-audio]
- Sec 54: Propyne with sodamide and water (CBSE worked) — (i) NaNH2→sodium propynide; (ii) Markovnikov hydration→propanone (acetone) — PASS [mocked-audio]
- Sec 55: Which liberates hydrogen with sodium? (NEET worked) — 3-candidate gate-check (but-2-yne✗/but-1-yne✓/but-2-ene✗), green "only (B)" answer, trap note — PASS [mocked-audio]

- Sec 56: Hydration regiochemistry and iodoform (JEE Main worked) — why ethyne→aldehyde vs higher alkynes→ketone, but-1-yne→butan-2-one, red positive-iodoform-test note — PASS [mocked-audio]
- Sec 57: pKa and choosing a base (JEE Advanced worked) — given pKa values, acidity order, green NaNH2-CAN vs red NaOH-CANNOT conjugate-acid reasoning, red "never hydroxide" rule — PASS [mocked-audio]
- Sec 58: Alkyne pitfalls and pro-tips (closes Alkynes subtopic) — 4 traps (calling all alkynes acidic, alcohol-not-carbonyl hydration mistake, gem/vicinal confusion, NaOH too weak) with guardrails — PASS [mocked-audio]

## Current
Sec 1-46, 48-52, 54-58 done (Sec 11, 47, 53 skipped). Classification +
Alkanes + Alkenes + Alkynes all complete. Moving to Aromatic Hydrocarbons
(Sec 59-78).
