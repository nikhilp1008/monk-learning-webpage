"use client";

/**
 * B11 Ch02 · Section 22 — "Identifying a group and an assertion-reason"
 * (worked_examples, continues Sec21 as EXAMPLE 3 / EXAMPLE 4)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 8.19, 24.92, 40.28, 58.37, 78.85, 83.88, 96.6]):
 *  0 EXAMPLE 3 label (NEET clue-pile)
 *  1 the clues + 4 options
 *  2 answer: dinoflagellate (Gonyaulax) — cellulose+biflagellate+red tide
 *  3 eliminate on covering first: cross diatom, euglenoid
 *  4 confirm: cross slime mould, ring dinoflagellate
 *  5 EXAMPLE 4 label (assertion-reason)
 *  6 A and R statements
 *  7 the drill worked through → answer stamp
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, crossD, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS = [
  { x: 195, w: 130, name: "diatom" },
  { x: 345, w: 150, name: "euglenoid" },
  { x: 515, w: 210, name: "dinoflagellate" },
  { x: 745, w: 160, name: "slime mould" },
];

export default function B11Ch02Sec22({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — Example 3 label */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={48} size={15} fill={RED} script>
          {t("two more worked examples", "do aur worked examples")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 1)}>
        <Chip x={60} y={78} w={260} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 3 · NEET (clue pile)", "EXAMPLE 3 · NEET (clue pile)")}
        </Chip>
      </Fade>

      {/* beat 1 — the clues + options */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={125} size={13} fill={INK} script>
          {t(
            "marine · photosynthetic · biflagellate · cellulose plates · red tides",
            "marine · photosynthetic · biflagellate · cellulose plates · red tides"
          )}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 1} delay={dl(1, 1 + i * 0.25)}>
          <Chip x={o.x} y={150} w={o.w} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 2 — the answer named */}
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 0.3)}>
        <T x={540} y={280} size={13} fill={GREEN} script>
          {t("dinoflagellate — the Gonyaulax signature", "dinoflagellate — Gonyaulax ka signature")}
        </T>
      </Fade>

      {/* beat 3 — eliminate on the covering clue first */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={crossD(195, 150, 130, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 0.8)} d={crossD(345, 150, 150, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 1.4)}>
        <T x={540} y={280} size={12} fill={RED} script>
          {t("covering clue alone eliminates 2 (silica / no wall)", "covering clue akela hi 2 khatam karta (silica / no wall)")}
        </T>
      </Fade>

      {/* beat 4 — confirm with the rest */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={crossD(745, 150, 160, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={ringD(620, 167, 119, 29)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={540} y={280} size={12} fill={GREEN} script>
          {t("red tide + marine + photosynthetic confirms it", "red tide + marine + photosynthetic confirm karta")}
        </T>
      </Fade>

      {/* beat 5 — Example 4 label */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={60} y={300} w={290} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 4 · Assertion-Reason", "EXAMPLE 4 · Assertion-Reason")}
        </Chip>
      </Fade>

      {/* beat 6 — the assertion and reason */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={90} y={345} size={14} fill={INK} script anchor="start">
          {t("A: Euglena shows mixotrophic nutrition", "A: Euglena mixotrophic nutrition dikhata hai")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <T x={90} y={373} size={14} fill={INK} script anchor="start">
          {t(
            "R: autotrophic in sunlight, heterotrophic in its absence",
            "R: sunlight mein autotrophic, uske bina heterotrophic"
          )}
        </T>
      </Fade>

      {/* beat 7 — the drill, worked through */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={270} y={410} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          A ✓ true
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <Chip x={430} y={410} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          R ✓ true
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Chip x={590} y={410} w={200} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("R is A's definition", "R hi A ki definition")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.1)}>
        <Chip x={280} y={452} w={520} h={40} fill={GREEN} textFill="#fff" size={14} script={false}>
          {t("answer: both true — R is the correct explanation of A", "answer: dono true — R hi A ka correct explanation hai")}
        </Chip>
      </Fade>
    </svg>
  );
}
