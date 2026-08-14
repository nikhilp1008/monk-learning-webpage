"use client";

/**
 * B11 Ch02 · Section 8 — "Where Whittaker's scheme still falls short"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 16.04, 29.87, 41.81, 61.61, 78.42, 93.18, 108.97]):
 *  0 title
 *  1 the five-kingdom row draws (all at once — this is a critique, not a build-up)
 *  2 Monera re-stroked red + 2 fact chips: heterogeneous inside
 *  3 Protista re-stroked red + "leftovers kingdom" chip
 *  4 boundary cases float above the row: Chlamydomonas/Chlorella, Euglena
 *  5 acellular agents float in a dashed zone below: Viruses, Viroids, Lichens
 *  6 caption: pulls it together (verdict slot)
 *  7 closing (story band): little on evolution → domains; still standard
 *
 * Layout plan (measured ratios: Anek bl−0.78s..+0.31s):
 *  b1 | 5 kingdom boxes              | Draw  | y280..332  x100/270/440/610/780 (w150)
 *  b2 | Monera re-stroke (red)       | Draw  | x100..250  y280..332
 *  b2 | 2 fact chips under Monera    | Chip  | x105  y345/373  w140 h24
 *  b3 | Protista re-stroke (red)     | Draw  | x270..420  y280..332
 *  b3 | "leftovers kingdom" chip     | Chip  | x270  y345  w150 h24
 *  b4 | "Chlamydomonas/Chlorella"    | Chip  | x430  y215  w190 h30 (floats)
 *  b4 | "Euglena"                    | Chip  | x600  y215  w120 h30 (floats)
 *  b5 | dashed outside-zone          | Fade  | x150..900  y400..465
 *  b5 | "outside the kingdom system" | T st  | x160  y418
 *  b5 | Viruses/Viroids/Lichens chips| Chip  | y435..461  cx280/540/780
 *  b6 | caption slot (script15 green)| T mid | x540  y500
 *  b7 | closing line1 (script16)     | T mid | x540  y100 (story band)
 *  b7 | closing line2 (script13 muted)| T mid | x540 y128
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const KINGDOMS: { x: number; cx: number; name: string }[] = [
  { x: 100, cx: 175, name: "Monera" },
  { x: 270, cx: 345, name: "Protista" },
  { x: 440, cx: 515, name: "Fungi" },
  { x: 610, cx: 685, name: "Plantae" },
  { x: 780, cx: 855, name: "Animalia" },
];
const ROW_Y = 280;
const ROW_H = 52;

export default function B11Ch02Sec8({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={56} size={22} fill={RED} script>
          {t("Whittaker's scheme isn't perfect", "Whittaker ka scheme bhi perfect nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 74 C 420 70, 660 70, 760 74" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 1 — the five-kingdom row */}
      {KINGDOMS.map((k, i) => (
        <React.Fragment key={k.name}>
          <Draw
            on={beat >= 1}
            delay={dl(1, 0.3 + i * 0.15)}
            d={`M ${k.x} ${ROW_Y} h 150 v ${ROW_H} h -150 z`}
            stroke={INK}
            sw={2.2}
            dur={0.6}
            fill={CREAM}
          />
          <Fade on={beat >= 1} delay={dl(1, 0.6 + i * 0.15)}>
            <T x={k.cx} y={ROW_Y + ROW_H / 2 + 6} size={16} fill={INK} weight={700}>
              {k.name}
            </T>
          </Fade>
        </React.Fragment>
      ))}

      {/* beat 2 — Monera: heterogeneous inside */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={`M 100 ${ROW_Y} h 150 v ${ROW_H} h -150 z`} stroke={RED} sw={2.8} dur={0.7} />
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <Chip x={105} y={345} w={140} h={24} fill={CREAM} stroke={RED} textFill={INK} size={11} script={false}>
          {t("auto + hetero", "auto + hetero")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.8)}>
        <Chip x={105} y={373} w={140} h={24} fill={CREAM} stroke={RED} textFill={INK} size={11} script={false}>
          {t("walled + naked", "walled + naked")}
        </Chip>
      </Fade>

      {/* beat 3 — Protista: the leftovers kingdom */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={`M 270 ${ROW_Y} h 150 v ${ROW_H} h -150 z`} stroke={RED} sw={2.8} dur={0.7} />
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <Chip x={270} y={345} w={150} h={24} fill={CREAM} stroke={RED} textFill={INK} size={11} script={false}>
          {t("leftovers kingdom", "leftovers kingdom")}
        </Chip>
      </Fade>

      {/* beat 4 — boundary cases, floating between kingdoms */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={430} y={215} w={190} h={30} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          Chlamydomonas?
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <Chip x={600} y={215} w={120} h={30} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          Euglena?
        </Chip>
      </Fade>

      {/* beat 5 — acellular agents: no home at all */}
      <Fade on={beat >= 5} delay={dl(5, 0.2)}>
        <path d="M 150 400 h 750 v 65 h -750 z" fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="7 6" />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={160} y={418} size={13} fill={RED} anchor="start" weight={700}>
          {t("outside the kingdom system", "kingdom system ke bahar")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <Chip x={220} y={435} w={120} h={26} fill={CREAM} stroke={RED} textFill={RED} size={13} script={false}>
          Viruses
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.7)}>
        <Chip x={480} y={435} w={120} h={26} fill={CREAM} stroke={RED} textFill={RED} size={13} script={false}>
          Viroids
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.2)}>
        <Chip x={720} y={435} w={120} h={26} fill={CREAM} stroke={RED} textFill={RED} size={13} script={false}>
          Lichens
        </Chip>
      </Fade>

      {/* beat 6 — pulls it together */}
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 0.4)}>
        <T x={540} y={500} size={15} fill={GREEN} script>
          {t(
            "2 shaky kingdoms, boundary cases, and agents with no home",
            "2 shaky kingdoms, boundary cases, aur ghar-rahit agents"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing, in the freed story band */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={100} size={16} fill={GREEN} script>
          {t(
            "little on evolutionary links — that's why domains got added",
            "evolutionary links kam — isiliye domains add hue"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <T x={540} y={128} size={13} fill={MUTED} script>
          {t("none of this makes it wrong — still the standard framework", "isse yeh galat nahi hota — abhi bhi standard framework hai")}
        </T>
      </Fade>
    </svg>
  );
}
