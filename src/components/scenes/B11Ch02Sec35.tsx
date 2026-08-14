"use client";

/**
 * B11 Ch02 · Section 35 — "Fungi pitfalls and the two-question class tool"
 * (tips — closes subtopic 3) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 10.33, 33.96, 56.49, 71.85, 87.81, 112.47, 120.58]):
 *  0 title
 *  1-5 five numbered pitfalls
 *  6 the tool intro: two questions, don't read options first — Q1 drawn
 *  7 Q1 no→Phycomycetes(done); yes→Q2 fans to 3 classes
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const PITFALLS: { cy: number; en: string; hi: string }[] = [
  {
    cy: 85,
    en: "plasmogamy (protoplasm, first) vs karyogamy (nucleus, second) — root words don't lie",
    hi: "plasmogamy (protoplasm, pehle) vs karyogamy (nucleus, baad mein) — root words nahi jhoothe",
  },
  {
    cy: 113,
    en: "dikaryon isn't universal — only Asco/Basidio (delayed karyogamy)",
    hi: "dikaryon universal nahi — sirf Asco/Basidio (delayed karyogamy)",
  },
  {
    cy: 141,
    en: "say it as a pair: in a sac (Asco) → on a club (Basidio)",
    hi: "pair bolo: sac ke andar (Asco) → club ke upar (Basidio)",
  },
  {
    cy: 169,
    en: "Deuteromycetes isn't natural — a waiting room, not a family",
    hi: "Deuteromycetes natural nahi — waiting room hai, family nahi",
  },
  {
    cy: 197,
    en: "heterotroph ≠ ingests — fungi absorb, they don't engulf like Amoeba",
    hi: "heterotroph ≠ ingest — fungi absorb karte, Amoeba jaisa engulf nahi",
  },
];

export default function B11Ch02Sec35({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={52} size={16} fill={RED} script>
          {t("fungi pitfalls + the two-question class tool", "fungi pitfalls + two-question class tool")}
        </T>
      </Fade>

      {/* beats 1-5 — the five pitfalls */}
      {PITFALLS.map((p, i) => (
        <Fade key={p.cy} on={beat >= 1 + i} delay={dl(1 + i, 0.3)}>
          <circle cx={70} cy={p.cy} r={12} fill={RED} />
          <T x={70} y={p.cy + 4.5} size={12} fill={CREAM} weight={800}>
            {i + 1}
          </T>
          <T x={92} y={p.cy + 4} size={11} fill={INK} anchor="start" script>
            {t(p.en, p.hi)}
          </T>
        </Fade>
      ))}

      {/* beat 6 — the tool intro + question 1 */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={232} size={13} fill={GREEN} script>
          {t("two questions — don't read the options first", "do questions — options pehle mat padho")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1)} d="M 440 250 h 200 v 40 h -200 z" stroke={INK} sw={2.2} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 6} delay={dl(6, 1.8)}>
        <T x={540} y={275} size={13} fill={INK} weight={700}>
          {t("septate?", "septate?")}
        </T>
      </Fade>

      {/* beat 7 — the full branch: no→done, yes→Q2 fans to 3 */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d={arrowD(438, 270, 385, 270)} stroke={RED} sw={2} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 0.6)}>
        <T x={410} y={258} size={10} fill={RED} weight={700}>
          {t("no", "nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <Chip x={200} y={250} w={180} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          Phycomycetes
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={290} y={305} size={10} fill={GREEN} weight={700}>
          {t("done ✓", "done ✓")}
        </T>
      </Fade>

      <Draw on={beat >= 7} delay={dl(7, 1.7)} d={arrowD(540, 290, 540, 335)} stroke={GREEN} sw={2} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 2.1)}>
        <T x={558} y={318} size={10} fill={GREEN} weight={700} anchor="start">
          {t("yes", "haan")}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.4)} d="M 420 340 h 240 v 40 h -240 z" stroke={INK} sw={2.2} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 7} delay={dl(7, 3.1)}>
        <T x={540} y={365} size={12} fill={INK} weight={700}>
          {t("sac / club / absent?", "sac / club / absent?")}
        </T>
      </Fade>

      <Draw on={beat >= 7} delay={dl(7, 3.5)} d={arrowD(470, 380, 290, 420)} stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 7} delay={dl(7, 3.7)} d={arrowD(540, 380, 540, 420)} stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 7} delay={dl(7, 3.9)} d={arrowD(610, 380, 790, 420)} stroke={AMBER_DARK} sw={1.8} dur={0.4} />

      <Fade on={beat >= 7} delay={dl(7, 4.3)}>
        <Chip x={200} y={425} w={180} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          Ascomycetes
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 4.5)}>
        <Chip x={450} y={425} w={180} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          Basidiomycetes
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 4.7)}>
        <Chip x={700} y={425} w={180} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          Deuteromycetes
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 5.1)}>
        <T x={290} y={494} size={10} fill={AMBER_DARK} script>
          {t("sac", "sac")}
        </T>
        <T x={540} y={494} size={10} fill={AMBER_DARK} script>
          {t("club", "club")}
        </T>
        <T x={790} y={494} size={10} fill={AMBER_DARK} script>
          {t("absent", "absent")}
        </T>
      </Fade>
    </svg>
  );
}
