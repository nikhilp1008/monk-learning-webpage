"use client";

/**
 * B11 Ch03 · Section 3 — "Locking proponent to system"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 17.24, 39.59, 60.84, 85.67, 108.2, 130.22, 155.05]):
 *  0 title (always-on) + hook: swap two names, lose the mark
 *  1 framework: 3 proponent chips (top) + 3 system chips (bottom), NO
 *    arrows yet — "three names on top, three systems underneath"
 *  2 wire 1: Linnaeus → ARTIFICIAL, vertical arrow + trigger-word caption
 *  3 why artificial: weakness note under column 1 (veg=sex equal weight,
 *    veg is environment-plastic → unnatural)
 *  4 wire 2: Bentham & Hooker → NATURAL, vertical arrow + caption
 *  5 wire 3: Engler & Prantl → PHYLOGENETIC, vertical arrow + caption
 *  6 concrete illustration: two plants, same stamen count, everything else
 *    different — Linnaeus still boxes them together
 *  7 correction: ARTIFICIAL ≠ bad/wrong — convenient but unnatural, banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  always | title (script24 red)              | T mid  | x?..?  y33.5..76.6 (bl64)
 *  b0 | hook (script13 muted)                  | T mid  | x?..?  y85..102 (bl98) [dim@1]
 *  b1 | 3 top chips (Linnaeus/B&H/E&P)         | Chip   | x=colX-110 y124..158
 *  b1 | 3 bottom chips (ARTIFICIAL/NAT/PHYLO)  | Chip   | x=colX-110 y232..260
 *  b2 | col1 arrow                             | Draw   | x210 y162..228
 *  b2 | col1 caption (12 ink)                  | T mid  | x210  bl280
 *  b3 | weakness line1/2 (12 red, col1)        | T mid  | x210  bl310/330
 *  b4 | col2 arrow + caption                   | Draw/T | x540  bl280
 *  b5 | col3 arrow + caption                   | Draw/T | x870  bl280
 *  b6 | PLANT A / PLANT B boxes                | Draw   | x300..420 / 660..780 y380..416
 *  b6 | "stamens 6=6" mid label (13 green)     | T mid  | x540  bl398
 *  b6 | "all different" note (12 red)          | T mid  | x540  bl450
 *  b6 | closing label (13 amber-d script)      | T mid  | x540  bl490
 *  b7 | outer emphasis box                     | Draw   | x300..780 y524..566
 *  b7 | correction chip                        | Chip   | x305..775 y528..562
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
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const COL_X = [210, 540, 870];

const TOP_LABEL = ["Linnaeus", "Bentham & Hooker", "Engler & Prantl"];
const BOTTOM_LABEL = ["ARTIFICIAL", "NATURAL", "PHYLOGENETIC"];
const CAPTION: [string, string][] = [
  ["stamens · sexual system", "stamens · sexual system"],
  ["Genera Plantarum", "Genera Plantarum"],
  ["evolution · ancestry · descent", "evolution · ancestry · descent"],
];
const WIRE_BEAT = [2, 4, 5]; // col0 wired in beat2, col1 in beat4, col2 in beat5

export default function B11Ch03Sec3({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={64} size={24} fill={RED} script>
          {t("wire each proponent to ONE system", "har proponent ko EK system se wire karo")}
        </T>
      </Fade>

      {/* beat 0 — hook */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.3)}>
        <T x={540} y={98} size={13} fill={MUTED} script>
          {t(
            "swap two names, lose the mark — one arrow each, no crossing",
            "do naam badlo, mark gaya — ek arrow har ek, koi crossing nahi"
          )}
        </T>
      </Fade>

      {/* beat 1 — framework: 3 top chips + 3 bottom chips, no arrows yet */}
      {COL_X.map((cx, i) => (
        <Fade key={`top${i}`} on={beat >= 1} delay={dl(1, 0.3 + i * 0.3)}>
          <Chip x={cx - 110} y={124} w={220} h={34} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
            {TOP_LABEL[i]}
          </Chip>
        </Fade>
      ))}
      {COL_X.map((cx, i) => (
        <Fade key={`bot${i}`} on={beat >= 1} delay={dl(1, 1.4 + i * 0.3)}>
          <Chip
            x={cx - 110}
            y={232}
            w={220}
            h={28}
            fill={CREAM}
            stroke={AMBER_DARK}
            textFill={AMBER_DARK}
            size={12}
            script={false}
          >
            {BOTTOM_LABEL[i]}
          </Chip>
        </Fade>
      ))}

      {/* beats 2, 4, 5 — the three wires, one per column */}
      {COL_X.map((cx, i) => {
        const k = WIRE_BEAT[i];
        return (
          <React.Fragment key={`wire${i}`}>
            <Draw on={beat >= k} delay={dl(k, 0.3)} d={arrowD(cx, 162, cx, 228)} stroke={AMBER_DARK} sw={2.4} dur={0.7} />
            <Fade on={beat >= k} delay={dl(k, 1.2)}>
              <T x={cx} y={280} size={12} fill={INK} anchor="middle" script={false}>
                {t(CAPTION[i][0], CAPTION[i][1])}
              </T>
            </Fade>
          </React.Fragment>
        );
      })}

      {/* beat 3 — why artificial: the weakness, under column 1 */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={210} y={310} size={12} fill={RED} anchor="middle" script={false}>
          {t("weakness: veg = sex, EQUAL weight", "kamzori: veg = sex, BARABAR weight")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.0)}>
        <T x={210} y={330} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "veg is environment-plastic → UNNATURAL groups",
            "veg environment se plastic hai → UNNATURAL groups"
          )}
        </T>
      </Fade>

      {/* beat 6 — concrete illustration: same stamens, everything else different */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d="M 300 380 h 120 v 36 h -120 z" stroke={INK} sw={2} dur={0.6} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={360} y={402} size={13} fill={INK} anchor="middle" script={false}>
          PLANT A
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.1)} d="M 660 380 h 120 v 36 h -120 z" stroke={INK} sw={2} dur={0.6} />
      <Fade on={beat >= 6} delay={dl(6, 1.7)}>
        <T x={720} y={402} size={13} fill={INK} anchor="middle" script={false}>
          PLANT B
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.3)}>
        <T x={540} y={402} size={13} fill={GREEN} anchor="middle" script={false}>
          stamens: 6 = 6 ✓
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.0)}>
        <T x={540} y={450} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "habit, leaves, anatomy, embryology — ALL different",
            "habit, leaves, anatomy, embryology — SAB alag"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.7)}>
        <T x={540} y={490} size={13} fill={AMBER_DARK} anchor="middle" script>
          {t(
            "Linnaeus: same box anyway → ARTIFICIAL",
            "Linnaeus: phir bhi same box → ARTIFICIAL"
          )}
        </T>
      </Fade>

      {/* beat 7 — correction: artificial ≠ bad */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 300 524 h 480 q 8 0 8 8 v 26 q 0 8 -8 8 h -480 q -8 0 -8 -8 v -26 q 0 -8 8 -8"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.1)}>
        <Chip x={305} y={528} w={470} h={34} fill={CREAM} stroke="none" textFill={AMBER_DARK} size={12} script={false}>
          {t(
            "ARTIFICIAL ≠ bad/wrong — convenient but unnatural; a vital early tool",
            "ARTIFICIAL ≠ bekaar/galat — convenient par unnatural; zaroori shuruaati tool"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
