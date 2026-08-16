"use client";

/**
 * B11 Ch03 · Section 10 — "Three colours, one chlorophyll underneath"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * Subtopic 2 (Algae). Four phases, each erasing into the next (board is
 * genuinely full across 8 dense beats):
 *  A) beat 0 hook — the classic 3-way split (fully erases, `on={beat===0}`)
 *  B) beats 1-3 — the stacked-pigment diagram + depth panel (`stackOn = beat<4`)
 *  C) beat 4 — the assertion–reason payoff (`on={beat===4}`, single beat)
 *  D) beats 5-7 — two caveats + closing correction banner (final phase)
 *
 * Beats (en [0, 23.21, 45.06, 69.89, 94.29, 116.22, 141.06, 164.01]):
 *  0 hook: classic split — 3 classes by pigment colour
 *  1 stack: chlorophyll-a base layer, SAME in all three columns
 *  2 stack: accessory layers on top (fucoxanthin / r-phycoerythrin) — two jobs
 *  3 depth panel: how far each colour of light reaches → r-phyco's depth match
 *  4 the A–R payoff: red algae at depth (A) because r-phyco absorbs deepest light (R)
 *  5 caveat 1: colour is not a reliable field marker (olive→deep-brown range)
 *  6 caveat 2: habitat is a tendency, not a rule
 *  7 closing: teaching simplification + exam categories, not a law/family tree
 *
 * Layout plan (Anek bl−0.78s..+0.31s; script only on title):
 *  always | title (script22 red)                    | T mid | y61
 *  A: b0  | caption (13 muted) / 3 chips             | T/Chip| y100 / y118 h32
 *  B: b1  | caption (13 amber-d)                     | T mid | y98
 *     b1  | 3 base rects (Fade+Draw fill GREEN)      | Draw  | cx210/540/870 y190..240 w160
 *     b1  | "chlorophyll a" labels (11 cream)        | T mid | y218 (inside)
 *     b1  | column names (11 ink w700)               | T mid | y266
 *     b1  | insight (13 green w700)                  | T mid | y300
 *     b2  | 2 accessory rects (Fade+Draw fill amber-d/red) | Draw | cx540/870 y160..190 w160
 *     b2  | accessory labels (9 cream, inside)       | T mid | y177
 *     b2  | two-jobs line (12 amber-d)                | T mid | y330
 *     b3  | panel caption (12 amber-d)                | T mid | y366
 *     b3  | 3 depth bars (Fade+Draw fill red/green/ink)| Draw | x210.. y384/408/432 h16
 *     b3  | bar-end labels (10)                       | T st  | y396/420/444 x328/528/884
 *     b3  | r-phyco dot (Fade+Draw fill red)          | Draw  | cx870 cy440 r5
 *     b3  | payoff (12 green)                         | T mid | y476
 *  C: b4  | tag / A / R / verdict1 / verdict2 / chip  | T/Chip| y110/160/200/250/280/330 h44
 *  D: b5  | header (13 red) / line1 (12 ink)          | T mid | y100 / y130
 *     b5  | 2 swatches + arrow (Fade+Draw fill)       | Draw  | x430/520 y158 w50 h24
 *     b5  | swatch labels (10) / warning (12 red)     | T mid | y200 / y226
 *     b6  | header2 (13 red) / line2-4 (12)           | T mid | y266/296/326/356
 *     b7  | box outline (amber-d) x220 y386 w640 h130 | Draw
 *     b7  | header3 / line5 / line6 / line7           | T mid | y412/442/470/498
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  arrowD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function rectD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w} v ${h} h ${-w} z`;
}
function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${
    cx - r
  } ${cy} Z`;
}

export default function B11Ch03Sec10({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const stackOn = beat < 4;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={61} size={22} fill={RED} script>
          {t("three colours, one chlorophyll underneath", "teen colours, ek chlorophyll neeche")}
        </T>
      </Fade>

      {/* ══════════ A: beat 0 — the classic split (fully erases) ══════════ */}
      <Fade on={beat === 0} delay={dl(0, 0.3)}>
        <T x={540} y={100} size={13} fill={MUTED} anchor="middle" script={false}>
          {t(
            "the classic split — three classes by pigment colour",
            "classic split — teen classes, pigment colour ke hisaab se"
          )}
        </T>
      </Fade>
      <Fade on={beat === 0} delay={dl(0, 0.9)}>
        <Chip x={100} y={118} w={220} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          Chlorophyceae
        </Chip>
      </Fade>
      <Fade on={beat === 0} delay={dl(0, 1.2)}>
        <Chip x={430} y={118} w={220} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          Phaeophyceae
        </Chip>
      </Fade>
      <Fade on={beat === 0} delay={dl(0, 1.5)}>
        <Chip x={760} y={118} w={220} h={32} fill={CREAM} stroke={RED} textFill={RED} size={12} script={false}>
          Rhodophyceae
        </Chip>
      </Fade>

      {/* ══════════ B: beats 1-3 — stack diagram + depth panel ══════════ */}
      <Fade on={beat >= 1 && stackOn} delay={dl(1, 0.3)}>
        <T x={540} y={98} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "all three are green underneath — the picture most students never see",
            "teenon andar se green hain — jo zyada students ko kabhi nahi bataya"
          )}
        </T>
      </Fade>
      {[210, 540, 870].map((cx, i) => (
        <Fade key={i} on={beat >= 1 && stackOn} delay={dl(1, 1.0 + i * 0.4)}>
          <Draw on={true} d={rectD(cx - 80, 190, 160, 50)} fill={GREEN} stroke={GREEN} sw={1.5} dur={0.5} />
        </Fade>
      ))}
      {[210, 540, 870].map((cx, i) => (
        <Fade key={i} on={beat >= 1 && stackOn} delay={dl(1, 1.3 + i * 0.4)}>
          <T x={cx} y={218} size={11} fill={CREAM} anchor="middle" script={false}>
            chlorophyll a
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 1 && stackOn} delay={dl(1, 2.8)}>
        <T x={210} y={266} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          Chlorophyceae
        </T>
      </Fade>
      <Fade on={beat >= 1 && stackOn} delay={dl(1, 2.9)}>
        <T x={540} y={266} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          Phaeophyceae
        </T>
      </Fade>
      <Fade on={beat >= 1 && stackOn} delay={dl(1, 3.0)}>
        <T x={870} y={266} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          Rhodophyceae
        </T>
      </Fade>
      <Fade on={beat >= 1 && stackOn} delay={dl(1, 3.5)}>
        <T x={540} y={300} size={13} fill={GREEN} weight={700} anchor="middle" script={false}>
          {t(
            "chlorophyll a — the base layer in ALL THREE classes",
            "chlorophyll a — teenon classes mein base layer"
          )}
        </T>
      </Fade>

      {/* beat 2 — accessory layers */}
      <Fade on={beat >= 2 && stackOn} delay={dl(2, 0.3)}>
        <Draw on={true} d={rectD(460, 160, 160, 30)} fill={AMBER_DARK} stroke={AMBER_DARK} sw={1.5} dur={0.5} />
      </Fade>
      <Fade on={beat >= 2 && stackOn} delay={dl(2, 0.7)}>
        <Draw on={true} d={rectD(790, 160, 160, 30)} fill={RED} stroke={RED} sw={1.5} dur={0.5} />
      </Fade>
      <Fade on={beat >= 2 && stackOn} delay={dl(2, 1.1)}>
        <T x={540} y={177} size={9} fill={CREAM} anchor="middle" script={false}>
          fucoxanthin
        </T>
      </Fade>
      <Fade on={beat >= 2 && stackOn} delay={dl(2, 1.3)}>
        <T x={870} y={177} size={9} fill={CREAM} anchor="middle" script={false}>
          r-phycoerythrin
        </T>
      </Fade>
      <Fade on={beat >= 2 && stackOn} delay={dl(2, 1.8)}>
        <T x={540} y={330} size={12} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "both extras do TWO jobs: ① mask the green ② absorb light where green light has run out",
            "dono extras do kaam karte: ① green ko mask karte ② light absorb karte jahan green light khatam ho chuki"
          )}
        </T>
      </Fade>

      {/* beat 3 — depth panel */}
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 0.3)}>
        <T x={540} y={366} size={12} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "how far each colour of light reaches — before it's absorbed",
            "har colour ki light kitni door tak jaati — absorb hone se pehle"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 1.0)}>
        <Draw on={true} d={rectD(210, 384, 110, 16)} fill={RED} stroke={RED} sw={1.2} dur={0.4} />
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 1.1)}>
        <T x={328} y={396} size={10} fill={RED} anchor="start" script={false}>
          {t("red — gone shallow", "red — jaldi khatam")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 1.6)}>
        <Draw on={true} d={rectD(210, 408, 310, 16)} fill={GREEN} stroke={GREEN} sw={1.2} dur={0.5} />
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 1.7)}>
        <T x={528} y={420} size={10} fill={GREEN} anchor="start" script={false}>
          {t("green — mid-depth", "green — beech mein")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 2.2)}>
        <Draw on={true} d={rectD(210, 432, 660, 16)} fill={INK} stroke={INK} sw={1.2} dur={0.7} />
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 2.9)}>
        <Draw on={true} d={circleD(870, 440, 5)} fill={RED} stroke={RED} sw={1} dur={0.3} />
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 3.1)}>
        <T x={884} y={444} size={10} fill={INK} anchor="start" script={false}>
          {t("blue — deepest", "blue — sabse gehra")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && stackOn} delay={dl(3, 3.7)}>
        <T x={540} y={476} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "r-phycoerythrin absorbs exactly these wavelengths → deep red algae aren't “less green” inside",
            "r-phycoerythrin exactly wahi wavelengths absorb karta → gehre red algae andar se “kam green” nahi"
          )}
        </T>
      </Fade>

      {/* ══════════ C: beat 4 — the assertion–reason payoff (single beat) ══════════ */}
      <Fade on={beat === 4} delay={dl(4, 0.3)}>
        <T x={540} y={110} size={13} fill={MUTED} anchor="middle" script={false}>
          {t(
            "this answers a standard ASSERTION–REASON question",
            "yeh ek standard ASSERTION–REASON question ka jawab deta"
          )}
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 0.9)}>
        <T x={540} y={160} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "A: some red algae can live at great ocean depths",
            "A: kuch red algae samundar ki bahut gehri gehraiyon mein rah sakte"
          )}
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 1.5)}>
        <T x={540} y={200} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "R: r-phycoerythrin absorbs the wavelengths that penetrate deepest",
            "R: r-phycoerythrin un wavelengths ko absorb karta jo sabse gehra penetrate karti"
          )}
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 2.1)}>
        <T x={540} y={250} size={12} fill={GREEN} anchor="middle" script={false}>
          {t("✓ both statements are TRUE", "✓ dono statements TRUE hain")}
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 2.6)}>
        <T x={540} y={280} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "✓ R correctly explains A — depth is where those wavelengths still exist",
            "✓ R sahi se A ko explain karta — depth wahi hai jahan wo wavelengths bachi rehti"
          )}
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 3.2)}>
        <Chip x={270} y={330} w={540} h={44} fill={CREAM} stroke={GREEN} textFill={GREEN} size={14} script={false}>
          {t("ANSWER: both true, R explains A", "ANSWER: dono true, R, A ko explain karta")}
        </Chip>
      </Fade>

      {/* ══════════ D: beats 5-7 — caveats + closing correction ══════════ */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={100} size={13} fill={RED} weight={700} anchor="middle" script={false}>
          {t("CAVEAT 1 — colour is NOT a reliable field marker", "CAVEAT 1 — colour bharosemand field marker NAHI")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <T x={540} y={130} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "brown algae range olive-green → deep brown, depending on xanthophyll",
            "brown algae olive-green se deep brown tak jaate, xanthophyll par depend karta"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <Draw on={true} d={rectD(430, 158, 50, 24)} fill={AMBER} stroke={AMBER_DARK} sw={1.5} dur={0.4} />
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.9)} d={arrowD(486, 170, 514, 170)} stroke={AMBER_DARK} sw={1.8} dur={0.3} />
      <Fade on={beat >= 5} delay={dl(5, 2.1)}>
        <Draw on={true} d={rectD(520, 158, 50, 24)} fill={AMBER_DARK} stroke={AMBER_DARK} sw={1.5} dur={0.4} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.5)}>
        <T x={455} y={200} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          {t("olive-green", "olive-green")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.6)}>
        <T x={545} y={200} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          {t("deep brown", "deep brown")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.1)}>
        <T x={540} y={226} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "✗ “I saw a brownish weed → Phaeophyceae” can simply FAIL",
            "✗ “maine brownish weed dekha → Phaeophyceae” simply FAIL ho sakta"
          )}
        </T>
      </Fade>

      {/* beat 6 — caveat 2 */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={266} size={13} fill={RED} weight={700} anchor="middle" script={false}>
          {t("CAVEAT 2 — habitat is a TENDENCY, not a rule", "CAVEAT 2 — habitat ek TENDENCY hai, rule nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={540} y={296} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "green = freshwater, brown/red = marine — usually true, not a rule",
            "green = freshwater, brown/red = marine — aksar sach, rule nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.5)}>
        <T x={540} y={326} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "✗ some red algae live in freshwater · some green algae are marine",
            "✗ kuch red algae freshwater mein rehte · kuch green algae marine hain"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.1)}>
        <T x={540} y={356} size={12} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "a question resting its whole case on habitat → be suspicious",
            "jo question apna poora case habitat par rakhe → shak karo"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing correction */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.3)}
        d="M 230 386 h 620 q 10 0 10 10 v 110 q 0 10 -10 10 h -620 q -10 0 -10 -10 v -110 q 0 -10 10 -10"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.8}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={540} y={412} size={13} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t("hold the three-colour scheme correctly", "three-colour scheme ko sahi tarah pakdo")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.9)}>
        <T x={540} y={442} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "a teaching simplification + a set of exam categories",
            "ek teaching simplification + exam categories ka set"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.5)}>
        <T x={540} y={470} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "NOT a hard law of nature · NOT an evolutionary family tree",
            "koi hard law of nature NAHI · koi evolutionary family tree NAHI"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 3.1)}>
        <T x={540} y={498} size={12} fill={GREEN} weight={700} anchor="middle" script={false}>
          {t(
            "decide by PIGMENT NAMES + STORED FOOD — not the colour you imagine",
            "PIGMENT NAMES + STORED FOOD se decide karo — jo colour tum imagine karte uss se nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
