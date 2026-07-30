"use client";

/**
 * Ch01 · Section 3 — "From FPS to SI: why the world had to standardise"
 *
 * Beats:
 *  0 heading · 1 three systems (FPS/CGS/MKS cards draw in)
 *  2 each room worked alone · 3 Pune/NASA/France — same thing, three numbers
 *  4 1971: converge → SI badge · 5 what makes a unit good (checklist)
 *  6 the old kilogram: vault, scratches, dust · 7 2019 — constants take over
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
  INK_LIGHT,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const CARD: [string, string, string, string, number][] = [
  // name, units, who, reading, x
  ["FPS", "foot · pound · second", "the British", "11.5 ft", 75],
  ["CGS", "centimetre · gram · second", "scientists", "350 cm", 390],
  ["MKS", "metre · kilogram · second", "engineers", "3.5 m", 705],
];

const CHECKS: [string, string, string][] = [
  ["well-defined", "no argument about meaning", "matlab pe jhagda nahi"],
  ["invariant", "no drift with time / place", "time-place se na khiske"],
  ["reproducible", "any lab can rebuild it", "kahin bhi bana sako"],
  ["imperishable", "can never decay", "kabhi kharab na ho"],
];

export default function Ch01Sec3({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* beat 0 — heading */}
      <Fade on={beat >= 0}>
        <T x={500} y={48} size={29} fill={RED} script>
          {t(
            "different people, different founding members",
            "same cheez — teen alag numbers?"
          )}
        </T>
      </Fade>

      {/* beat 1 — the three system cards */}
      {CARD.map(([name, units, who], i) => (
        <g key={name}>
          <Draw
            on={beat >= 1}
            delay={dl(1, i * 1.1)}
            d={`M ${CARD[i][4]} 78 h 220 v 150 h -220 z`}
            stroke={INK}
            sw={2}
            dur={0.7}
            fill="none"
          />
          <Fade on={beat >= 1} delay={dl(1, i * 1.1 + 0.4)}>
            <T x={CARD[i][4] + 110} y={112} size={24} fill={INK} weight={800}>
              {name}
            </T>
            <T x={CARD[i][4] + 110} y={136} size={13} fill={INK_LIGHT} script={false}>
              {units}
            </T>
            <T x={CARD[i][4] + 110} y={156} size={13} fill={MUTED} script>
              {who}
            </T>
            {/* the same golden bar, different tick spacing */}
            <rect
              x={CARD[i][4] + 30}
              y={168}
              width={160}
              height={13}
              rx={3}
              fill={AMBER}
              stroke={INK}
              strokeWidth={1.5}
            />
            {Array.from(
              { length: Math.floor(159 / [14, 5, 46][i]) },
              (_, k) => (k + 1) * [14, 5, 46][i]
            ).map((off) => (
              <line
                key={off}
                x1={CARD[i][4] + 30 + off}
                y1={168}
                x2={CARD[i][4] + 30 + off}
                y2={181}
                stroke={INK}
                strokeWidth={1}
              />
            ))}
          </Fade>
        </g>
      ))}

      {/* beat 2 — every room worked alone */}
      <Fade on={beat >= 2}>
        <T x={500} y={252} size={18} fill={MUTED} script>
          {t(
            "each system worked fine — inside its own room",
            "har system apne kamre mein theek chalta tha"
          )}
        </T>
      </Fade>

      {/* beat 3 — same thing, three different numbers */}
      {CARD.map(([name, , , reading], i) => (
        <Fade key={name} on={beat >= 3} delay={dl(3, i * 0.6)}>
          <T x={CARD[i][4] + 110} y={212} size={21} fill={INK} script>
            {reading}
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 3} delay={dl(3, 2)}>
        <T x={500} y={282} size={20} fill={RED} script>
          {t(
            "physics was the same — the rulers were different",
            "physics same thi — rulers alag the"
          )}
        </T>
      </Fade>

      {/* beat 4 — 1971: SI */}
      {[
        [185, 300, 420, 336],
        [500, 300, 500, 336],
        [815, 300, 580, 336],
      ].map(([x1, y1, x2, y2], i) => (
        <Draw
          key={i}
          on={beat >= 4}
          delay={dl(4, i * 0.3)}
          d={arrowD(x1, y1, x2, y2)}
          stroke={MUTED}
          sw={2.2}
          dur={0.5}
        />
      ))}
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <rect x={355} y={344} width={290} height={64} rx={16} fill={INK} />
        <T x={500} y={372} size={24} fill="#FCFAF4" weight={800}>
          SI · 1971
        </T>
        <T x={500} y={396} size={13} fill={AMBER} script>
          {t("7 base + 2 supplementary — upgraded MKS", "7 base + 2 supplementary — upgraded MKS")}
        </T>
      </Fade>

      {/* beat 5 — what makes a unit good */}
      <Fade on={beat >= 5}>
        <T x={210} y={448} size={19} fill={RED} script>
          {t("a world-standard unit — 4 tests", "world-standard unit — 4 sharten")}
        </T>
      </Fade>
      {CHECKS.map(([name, noteEn, noteHi], i) => (
        <g key={name}>
          <Draw
            on={beat >= 5}
            delay={dl(5, 0.6 + i * 0.9)}
            d={`M 72 ${462 + i * 40} l 9 11 l 18 -23`}
            stroke={GREEN}
            sw={3.6}
            dur={0.35}
          />
          <Fade on={beat >= 5} delay={dl(5, 0.8 + i * 0.9)}>
            <T x={112} y={474 + i * 40} size={19} fill={INK} script anchor="start">
              {name}
            </T>
            <T x={255} y={474 + i * 40} size={13} fill={MUTED} script anchor="start">
              {t(noteEn, noteHi)}
            </T>
          </Fade>
        </g>
      ))}

      {/* beat 6 — the old kilogram in its vault */}
      <Fade on={beat >= 6}>
        <rect
          x={520}
          y={430}
          width={300}
          height={180}
          rx={14}
          fill="#F4EFE3"
          stroke={INK}
          strokeWidth={2.2}
        />
        <T x={670} y={456} size={14} fill={MUTED} script>
          {t("a vault in France · 1889", "France ki tijori · 1889")}
        </T>
      </Fade>
      <Draw
        on={beat >= 6}
        delay={dl(6, 0.5)}
        d="M 610 596 L 610 512 C 610 480, 730 480, 730 512 L 730 596"
        stroke={INK_LIGHT}
        sw={2.4}
        dur={0.9}
      />
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <ellipse cx={670} cy={528} rx={34} ry={9} fill="#E7E2D6" stroke={INK} strokeWidth={1.8} />
        <path
          d="M 636 528 V 584 A 34 9 0 0 0 704 584 V 528"
          fill="#DDD6C6"
          stroke={INK}
          strokeWidth={1.8}
        />
        <T x={670} y={604} size={12} fill={INK} script>
          {t("THE kilogram (platinum)", "THE kilogram (platinum)")}
        </T>
      </Fade>
      <Draw
        on={beat >= 6}
        delay={dl(6, 2)}
        d="M 648 552 l 15 7 l -7 5 l 14 4 M 682 566 l 12 -6 l -3 10"
        stroke={RED}
        sw={2.4}
        dur={0.6}
      />
      <Fade on={beat >= 6} delay={dl(6, 2.2)}>
        <T x={590} y={560} size={14} fill={RED} script>
          {t("scratch!", "scratch!")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.8)}>
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={644 + i * 11}
              cy={505 + (i % 3) * 6}
              r={2}
              fill={MUTED}
              className="sc-dust"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </g>
        <T x={766} y={512} size={13} fill={MUTED} script>
          {t("dust…", "dhool…")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.4)}>
        <g className="sc-wob">
          <T x={897} y={556} size={17} fill={RED} script>
            {t("exactly 1 kg…?", "exactly 1 kg…?")}
          </T>
        </g>
      </Fade>

      {/* beat 7 — 2019: throw the cylinder away */}
      <Draw on={beat >= 7} d={crossD(630, 515, 80, 78)} stroke={RED} sw={3} dur={0.6} />
      <Fade on={beat >= 7} delay={dl(7, 0.6)}>
        <Chip x={836} y={572} w={148} h={40} fill={INK} textFill={AMBER} size={15}>
          h = exact number
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={268} y={614} size={15} fill={GREEN} script>
          {t(
            "2019: constants anchor the units — any lab in the cosmos",
            "2019: constants anchor — cosmos ki koi bhi lab dubara bana le"
          )}
        </T>
      </Fade>
    </svg>
  );
}
