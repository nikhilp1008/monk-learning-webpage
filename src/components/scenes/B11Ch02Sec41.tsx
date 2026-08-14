"use client";

/**
 * B11 Ch02 · Section 41 — "Inside the plant, and why it feeds everything else"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.81, 27.22, 45.65, 62.12, 82.18, 94.98, 110.34]):
 *  0 intro: the cell on the left, its consequences on the right
 *  1 LEFT: cellulose wall + plastids (chloroplasts) — the exam's favourites
 *  2 LEFT: central vacuole — stores sap, maintains turgor; wilted = lost turgor
 *  3 CENTER hinge: photosynthesis — chlorophyll+light: CO2+H2O → sugars+O2
 *  4 RIGHT: PRODUCERS — feeds nearly every other organism; every meal → a chloroplast
 *  5 RIGHT: starch storage · fixed, non-motile
 *  6 RIGHT: tissue/organ level (roots,stems,leaves); algae simpler — barely a thallus
 *  7 closing: 6 characteristics, all consequences of being a maker of food
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)         | T mid script20 RED  | x540 y58
 *  title swoosh              | Draw                 | y76 x340..740
 *  b0 intro (Anek14)         | T mid                | x540 y100  [dim@1]
 *  b1 chip "cellulose wall"  | Chip x140 y120 w310 h36 (GREEN)
 *  b1 chip "plastids"        | Chip x140 y164 w310 h36 (GREEN)
 *  b2 chip "central vacuole..."| Chip x140 y208 w310 h36 (GREEN)
 *  b2 "wilted = lost turgor" | T mid Kalam14 RED    | x295 y254
 *  b3 hinge arrow             | Draw                 | x540 y150..300
 *  b3 "photosynthesis" label  | T mid Anek13 GREEN   | x540 y320
 *  b3 equation                | T mid Anek14 INK     | x540 y400
 *  b4 "PRODUCERS"             | T mid Anek18 GREEN   | x785 y128
 *  b4 subline                 | T mid Anek14         | x785 y156
 *  b4 punchline (Kalam14 RED) | T mid                | x785 y186
 *  b5 chip "starch...motile"  | Chip x650 y212 w270 h36 (AMBER_DARK)
 *  b6 chip "tissue/organ..."  | Chip x620 y256 w330 h36 (AMBER_DARK)
 *  b6 "algae simpler..." (Kalam14 MUTED)| T mid       | x785 y302
 *  b7 6 recap chips           | Chip y430 h32 x270/330/420/510/595/700
 *  b7 caption (Kalam15 GREEN) | T mid                | x540 y498
 *  b7 swoosh                  | Draw                 | y516 x420..660
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

const RECAP: { x: number; w: number; label: string }[] = [
  { x: 270, w: 50, label: "wall" },
  { x: 330, w: 80, label: "plastids" },
  { x: 420, w: 80, label: "vacuole" },
  { x: 510, w: 75, label: "starch" },
  { x: 595, w: 95, label: "fixed life" },
  { x: 700, w: 110, label: "tissue/organ" },
];

export default function B11Ch02Sec41({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — persists whole scene */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={58} size={20} fill={RED} script>
          {t("inside the plant: cell, then consequences", "plant ke andar: cell, phir consequences")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.6)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — intro */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.5)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t("the cell on the left, its consequences on the right", "cell left mein, uske consequences right mein")}
        </T>
      </Fade>

      {/* beat 1 — LEFT: wall + plastids */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <Chip x={140} y={120} w={310} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("cellulose wall", "cellulose wall")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)}>
        <Chip x={140} y={164} w={310} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("plastids (chloroplasts)", "plastids (chloroplasts)")}
        </Chip>
      </Fade>

      {/* beat 2 — LEFT: central vacuole, turgor */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={140} y={208} w={310} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("central vacuole — stores sap, turgor", "central vacuole — sap store, turgor")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={295} y={254} size={14} fill={RED} script>
          {t("wilted = lost turgor", "murjhaya = turgor gaya")}
        </T>
      </Fade>

      {/* beat 3 — CENTER hinge: photosynthesis */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={arrowD(540, 150, 540, 300)} stroke={GREEN} sw={2.4} dur={1} />
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <T x={540} y={320} size={13} fill={GREEN} weight={700} anchor="middle">
          {t("photosynthesis", "photosynthesis")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={540} y={400} size={14} fill={INK} anchor="middle">
          chlorophyll + light: CO<tspan baselineShift="-30%" fontSize="0.7em">2</tspan> + H<tspan baselineShift="-30%" fontSize="0.7em">2</tspan>O → sugars + O<tspan baselineShift="-30%" fontSize="0.7em">2</tspan>
        </T>
      </Fade>

      {/* beat 4 — RIGHT: PRODUCERS, the big payoff */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={785} y={128} size={18} fill={GREEN} weight={800} anchor="middle">
          PRODUCERS
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <T x={785} y={156} size={14} fill={INK} anchor="middle">
          {t("feeds nearly every other organism", "lagbhag har doosre organism ko khilata hai")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={785} y={186} size={14} fill={RED} script>
          {t("every meal traces back to a chloroplast", "har meal ek chloroplast tak jaata hai")}
        </T>
      </Fade>

      {/* beat 5 — RIGHT: starch, fixed & non-motile */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={650} y={212} w={270} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("starch storage · fixed, non-motile", "starch storage · fixed, non-motile")}
        </Chip>
      </Fade>

      {/* beat 6 — RIGHT: tissue/organ level; algae simpler */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={620} y={256} w={330} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("tissue / organ level (roots, stems, leaves)", "tissue / organ level (roots, stems, leaves)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={785} y={302} size={14} fill={MUTED} script>
          {t("algae simpler — barely a thallus", "algae simple — bas ek thallus jaisa")}
        </T>
      </Fade>

      {/* beat 7 — closing: six characteristics, all consequences */}
      {RECAP.map((c, i) => (
        <Fade key={c.label} on={beat >= 7} delay={dl(7, 0.3 + i * 0.25)}>
          <Chip x={c.x} y={430} w={c.w} h={32} fill={INK} textFill={CREAM} size={13} script={false}>
            {c.label}
          </Chip>
        </Fade>
      ))}
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <T x={540} y={498} size={15} fill={GREEN} script>
          {t("six consequences of being a maker of food", "khana banane wale hone ke 6 consequences")}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.9)} d="M 420 516 C 470 512, 610 512, 660 516" stroke={GREEN} sw={1.8} dur={0.5} />
    </svg>
  );
}
