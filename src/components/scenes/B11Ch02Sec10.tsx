"use client";

/**
 * B11 Ch02 · Section 10 — "The odd-one-out and an assertion-reason"
 * (worked_examples, continuing Sec9's numbering as EXAMPLE 3 / EXAMPLE 4)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 7.68, 24.06, 40.36, 58.45, 65.88, 82.6, 100.1]):
 *  0 EXAMPLE 3 label (NEET odd-one-out)
 *  1 question + 4 options (cell structure / nutrition / Gram-staining / phylogeny)
 *  2 answer: Gram-staining ringed red — not kingdom-level
 *  3 defend: recap the 5 real criteria (recap of Sec4), not-on-list = answer
 *  4 EXAMPLE 4 label (Assertion-Reason, high-difficulty)
 *  5 A and R statements
 *  6 the technique: decide A, decide R, then does R explain A?
 *  7 work through: A✓ R✓ R-explains-A✓ → green answer stamp
 *
 * Layout plan:
 *  b0 | title (script16 red, no rule)| T mid | x540  y50
 *  b0 | EX3 label chip (amber)       | Chip  | x60   y85   w230 h28
 *  b1 | question (script14 ink)      | T mid | x540  y130
 *  b1 | 4 option chips               | Chip  | y160  h34  x210/400/550/740
 *  b2 | ring Gram-staining (red)     | Draw  | c(635,177) rx99 ry29
 *  b2 | caption (script12 red)       | T mid | x540  y212
 *  b3 | 5-criteria checklist (12)    | T mid | x540  y240
 *  b3 | closing caption (script13)   | T mid | x540  y262
 *  b4 | EX4 label chip (amber)       | Chip  | x60   y295  w280 h28
 *  b5 | "A: …" (script14 ink, start) | T st  | x90   y340
 *  b5 | "R: …" (script14 ink, start) | T st  | x90   y368
 *  b6 | technique (script13 green)   | T mid | x540  y400
 *  b7 | 3 checkmark chips            | Chip  | y428  h30  x270/430/590
 *  b7 | answer stamp (16 green)      | Chip  | x280  y470  w520 h40
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS: { x: number; w: number; en: string }[] = [
  { x: 210, w: 170, en: "cell structure" },
  { x: 400, w: 130, en: "nutrition" },
  { x: 550, w: 170, en: "Gram-staining" },
  { x: 740, w: 130, en: "phylogeny" },
];

export default function B11Ch02Sec10({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title + Example 3 label */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={50} size={16} fill={RED} script>
          {t("two more worked examples", "do aur worked examples")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 1.2)}>
        <Chip x={60} y={85} w={230} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 3 · NEET (odd-one-out)", "EXAMPLE 3 · NEET (odd-one-out)")}
        </Chip>
      </Fade>

      {/* beat 1 — the question + options */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={130} size={14} fill={INK} script>
          {t("which was NOT a Whittaker criterion?", "Whittaker ka criterion kaun sa NAHI hai?")}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.en} on={beat >= 1} delay={dl(1, 1 + i * 0.25)}>
          <Chip x={o.x} y={160} w={o.w} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
            {o.en}
          </Chip>
        </Fade>
      ))}

      {/* beat 2 — the answer: Gram-staining is not kingdom-level */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={ringD(635, 177, 99, 29)} stroke={RED} sw={2.4} dur={0.7} />
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <T x={540} y={212} size={12} fill={RED} script>
          {t(
            "not kingdom-level — it's a bacteria sub-classification tool",
            "kingdom-level nahi — bacteria ka sub-classification tool hai"
          )}
        </T>
      </Fade>

      {/* beat 3 — the defence: recap the 5 real criteria */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={240} size={12} fill={INK} anchor="middle">
          cell structure ✓ · body organisation ✓ · nutrition ✓ · reproduction ✓ · phylogeny ✓
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <T x={540} y={262} size={13} fill={GREEN} script>
          {t("not on the list → that's your answer", "list mein nahi hai → wahi tumhara answer hai")}
        </T>
      </Fade>

      {/* beat 4 — Example 4 label */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={60} y={295} w={280} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 4 · Assertion-Reason [high-diff]", "EXAMPLE 4 · Assertion-Reason [high-diff]")}
        </Chip>
      </Fade>

      {/* beat 5 — the assertion and reason */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={90} y={340} size={14} fill={INK} script anchor="start">
          {t(
            "A: Monera & Protista are heterogeneous assemblages",
            "A: Monera & Protista heterogeneous assemblages hain"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.3)}>
        <T x={90} y={368} size={14} fill={INK} script anchor="start">
          {t(
            "R: each groups organisms differing widely in nutrition, wall, body form",
            "R: har ek mein nutrition, wall, body form mein bahut alag organisms hain"
          )}
        </T>
      </Fade>

      {/* beat 6 — the technique */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={400} size={13} fill={GREEN} script>
          {t(
            "① is A true?  ② is R true?  ③ does R explain A?",
            "① A sahi hai?  ② R sahi hai?  ③ R, A ko explain karta hai?"
          )}
        </T>
      </Fade>

      {/* beat 7 — work it through: both true, R explains A */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={270} y={428} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("A ✓ true", "A ✓ true")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <Chip x={430} y={428} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("R ✓ true", "R ✓ true")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Chip x={590} y={428} w={200} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("R explains A ✓", "R, A explain karta ✓")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <Chip x={280} y={470} w={520} h={40} fill={GREEN} textFill="#fff" size={15} script={false}>
          {t("answer: both true — R is the correct explanation of A", "answer: dono true — R hi A ka correct explanation hai")}
        </Chip>
      </Fade>
    </svg>
  );
}
