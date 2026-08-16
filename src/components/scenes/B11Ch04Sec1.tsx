"use client";

/**
 * B11 Ch04 · Section 1 — "What makes an animal an animal: the cell-level signature"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.12, 25.69, 40.36, 54.7, 69.38, 83.29, 98.05]):
 *  0 title (always-on) + drawn underline · hook: fix the membership card first
 *  1 trait: multicellular + eukaryotic — small cell-cluster diagram + chip
 *  2 trait: heterotrophic — ingests whole (holozoic), digests in a cavity
 *  3 MAIN DEMO: animal cell (no wall) vs plant/fungal/bacterial cell (rigid
 *    red wall) side by side, each with its nucleus
 *  4 consequence, stacked under the animal cell: no wall → bends/contracts →
 *    MUSCLE, movement
 *  5 storeroom: glycogen+fat chip (green) vs starch chip (red, crossed out)
 *  6 framing line: symmetry/germ layers/coelom/phyla/classes are all
 *    sub-division inside this ONE kingdom
 *  7 closing SIGNATURE banner: wall-less + heterotrophic + glycogen
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script25 red)         | T mid  | x?..?  y30..77  (bl62)
 *  b0 | underline swoosh             | Draw   | y86  x380..700
 *  b0 | hook (script15 muted)        | T mid  | x?..?  y99..126 (bl118) [dim@1]
 *  b1 | cell-cluster (3 circles)     | Draw   | x70..175  y140..215
 *  b1 | trait-1 chip                 | Chip   | x210..510 y148..178
 *  b1 | caption (12 muted)           | T st   | x210..?  y187..200 (bl196)
 *  b2 | heterotrophic line (14 ink)  | T mid  | x?..?  y227..244 (bl240)
 *  b3 | header (15 ink bold)         | T mid  | x?..?  y271..284 (bl280)
 *  b3 | divider (dashed)             | Fade   | x540  y300..460
 *  b3 | ANIMAL CELL label            | T mid  | x?..?  y290..302 (bl300)
 *  b3 | animal ellipse               | Draw   | c(265,390) rx125 ry78
 *  b3 | nucleus (animal)             | Draw   | c(265,378) r22
 *  b3 | nucleus label                | T mid  | x265  y382..392 (bl382)
 *  b3 | animal caption               | T mid  | x?..?  y452..464 (bl458)
 *  b3 | PLANT/FUNGAL/BACT label      | T mid  | x?..?  y290..302 (bl300)
 *  b3 | plant rect (thick red wall)  | Draw   | x655..905 y312..462
 *  b3 | nucleus (plant)              | Draw   | c(780,387) r20
 *  b3 | nucleus label                | T mid  | x780  y391..401 (bl391)
 *  b3 | plant caption                | T mid  | x?..?  y452..464 (bl458)
 *  b4 | small curved arrow           | Draw   | (300,462)→(280,476)
 *  b4 | consequence (11 amber-d)     | T mid  | x?..?  y470..482 (bl478)
 *  b5 | glycogen chip (green)        | Chip   | x300..520 y498..528
 *  b5 | starch chip (red, crossed)   | Chip   | x560..750 y498..528
 *  b6 | framing line (13 ink)        | T mid  | x?..?  y521..539 (bl538)
 *  b6 | underline                    | Draw   | y552  x400..680
 *  b7 | SIGNATURE chip (ink/cream)   | Chip   | x190..890 y562..588
 *  b7 | outer emphasis box           | Draw   | x182..898 y555..594
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
  crossD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
}

const CELLS: [number, number, number][] = [
  [100, 160, 15],
  [130, 187, 14],
  [95, 202, 12],
];

export default function B11Ch04Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={62} size={25} fill={RED} script>
          {t("Kingdom Animalia: the cell-level signature", "Kingdom Animalia: cell-level signature")}
        </T>
      </Fade>

      {/* beat 0 — hook */}
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 380 86 C 460 82, 620 82, 700 86" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={118} size={15} fill={MUTED} script>
          {t(
            "fix the membership card first — what does EVERY animal share?",
            "sabse pehle membership card fix karo — HAR animal mein common kya hai?"
          )}
        </T>
      </Fade>

      {/* beat 1 — multicellular + eukaryotic */}
      {CELLS.map(([cx, cy, r], i) => (
        <React.Fragment key={i}>
          <Draw on={beat >= 1} delay={dl(1, 0.2 + i * 0.3)} d={circleD(cx, cy, r)} stroke={INK} sw={1.5} dur={0.4} />
          <Fade on={beat >= 1} delay={dl(1, 0.5 + i * 0.3)}>
            <circle cx={cx} cy={cy - 1} r={3.2} fill={AMBER_DARK} />
          </Fade>
        </React.Fragment>
      ))}
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <Chip x={210} y={148} w={300} h={30} fill={CREAM} stroke={AMBER} textFill={INK} size={14} script={false}>
          {t("multicellular + eukaryotic", "multicellular + eukaryotic")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.1)}>
        <T x={210} y={196} size={12} fill={MUTED} anchor="start" script>
          {t(
            "many cells share the work; each has a true nucleus",
            "bahut saare cells kaam baantte; har ek mein true nucleus"
          )}
        </T>
      </Fade>

      {/* beat 2 — heterotrophic */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={240} size={14} fill={INK} script={false}>
          {t(
            "heterotrophic: can't make food — ingests it whole, digests in a cavity",
            "heterotrophic: khana khud nahi banata — poora leta hai, cavity mein digest"
          )}
        </T>
      </Fade>

      {/* beat 3 — main demo: two cells compared */}
      <Fade on={beat >= 3} delay={dl(3, 0.2)}>
        <T x={540} y={280} size={15} fill={INK} weight={700} script={false}>
          {t("compare the two cells", "dono cells compare karo")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.6)}>
        <path d="M 540 300 L 540 460" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 6" fill="none" />
      </Fade>

      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={265} y={300} size={13} fill={INK} weight={700} script={false}>
          {t("ANIMAL CELL", "ANIMAL CELL")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1.4)} d={circleD(265, 390, 125)} stroke={INK} sw={2.2} dur={0.9} />
      <Draw on={beat >= 3} delay={dl(3, 2.3)} d={circleD(265, 378, 22)} stroke={INK} sw={1.4} fill={CREAM} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 2.8)}>
        <T x={265} y={382} size={10} fill={INK} script={false}>
          {t("nucleus", "nucleus")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 3.3)}>
        <T x={265} y={458} size={11} fill={MUTED} script>
          {t("no cell wall — soft membrane only", "cell wall nahi — sirf soft membrane")}
        </T>
      </Fade>

      <Fade on={beat >= 3} delay={dl(3, 1.1)}>
        <T x={780} y={300} size={12} fill={INK} weight={700} script={false}>
          {t("PLANT / FUNGAL / BACTERIAL CELL", "PLANT / FUNGAL / BACTERIAL CELL")}
        </T>
      </Fade>
      <Draw
        on={beat >= 3}
        delay={dl(3, 1.6)}
        d="M 663 312 h 234 q 8 0 8 8 v 134 q 0 8 -8 8 h -234 q -8 0 -8 -8 v -134 q 0 -8 8 -8"
        stroke={RED}
        sw={5}
        dur={0.9}
      />
      <Draw on={beat >= 3} delay={dl(3, 2.5)} d={circleD(780, 387, 20)} stroke={INK} sw={1.4} fill={CREAM} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 3)}>
        <T x={780} y={391} size={10} fill={INK} script={false}>
          {t("nucleus", "nucleus")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 3.4)}>
        <T x={780} y={458} size={11} fill={MUTED} script>
          {t("rigid wall — no contractile body", "rigid wall — contractile body nahi")}
        </T>
      </Fade>

      {/* beat 4 — consequence: wall-less enables movement */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={arrowD(310, 458, 285, 472)} stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <T x={265} y={480} size={11} fill={AMBER_DARK} script>
          {t("→ bends, contracts → MUSCLE, movement", "→ mud sakta, contract → MUSCLE possible")}
        </T>
      </Fade>

      {/* beat 5 — the storeroom: glycogen + fat, not starch */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={300} y={498} w={230} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("reserve food: glycogen + fat", "reserve food: glycogen + fat")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <Chip x={565} y={498} w={215} h={30} fill={CREAM} stroke={RED} textFill={RED} size={13} script={false}>
          {t("starch ✗ (that's the plant's)", "starch ✗ (plant ki hai)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 2.1)} d={crossD(565, 498, 215, 30)} stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 6 — framing line */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={538} size={13} fill={INK} script>
          {t(
            "remember: symmetry, germ layers, coelom, phyla, classes — all sub-division INSIDE this one kingdom",
            "yaad rakho: symmetry, germ layers, coelom, phyla, classes — sab isi kingdom ke andar sub-division hai"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 2.4)} d="M 400 552 C 460 549, 620 549, 680 552" stroke={INK} sw={1.6} dur={0.5} />

      {/* beat 7 — closing SIGNATURE banner */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 190 555 h 700 q 8 0 8 8 v 23 q 0 8 -8 8 h -700 q -8 0 -8 -8 v -23 q 0 -8 8 -8"
        stroke={AMBER}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <Chip x={195} y={562} w={690} h={26} fill={INK} textFill={CREAM} size={14} script={false}>
          {t("SIGNATURE: wall-less + heterotrophic + glycogen", "SIGNATURE: wall-less + heterotrophic + glycogen")}
        </Chip>
      </Fade>
    </svg>
  );
}
