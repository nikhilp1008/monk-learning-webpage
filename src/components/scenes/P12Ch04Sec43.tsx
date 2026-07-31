"use client";

/**
 * P12Ch04 · Section 43 — "Cheat Sheet: Quick Recall for the Whole Chapter"
 * Beats (en [0,1,3,5,7,9,11]): 7 beats
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
  INK, MUTED, AMBER_DARK, GREEN, RED, CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw on={on} delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED} sw={2.2} dur={0.4} />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>{n}</T>
      </Fade>
    </g>
  );
}

export default function P12Ch04Sec43({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Chapter Cheat Sheet & Exam Memory Aids", "Chapter Cheat Sheet & Exam Memory Aids")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 3 & 5: Subtopics 1 - 3 Memory Aids */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">SUBTOPICS 1 – 3 MEMORY AIDS</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 7}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Straight bits aimed at point contribute ZERO!
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (Force ONLY steers (W=0); Like currents ATTRACT!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7 & 9: Subtopics 4 - 5 Memory Aids */}
      <Badge n={2} cx={540} cy={140} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">SUBTOPICS 4 – 5 MEMORY AIDS</T>
      </Badge>
      <Fade on={beat >= 7} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Shunt is small, Multiplier is mighty!
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            Loop is a baby bar magnet; B_axial : B_eq = 2 : 1!
          </T>
        </g>
      </Fade>

      {/* BEAT 11: Final Exam Checklist */}
      <Badge n={3} cx={52} cy={270} on={beat >= 11} delay={dl(11, 0.4)} />
      <Fade on={beat >= 11} delay={dl(11, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">FINAL EXAM CHECKLIST</T>
      </Badge>
      <Fade on={beat >= 11}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Convert lengths to meters first! Use vector addition for B fields! Check held constants!
          </T>
        </g>
      </Fade>

      {/* BEAT 11: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Class 12 Physics Chapter 4 Moving Charges and Magnetism 100% COMPLETE! All 43 Sections Authored & Registered! 🎉",
            "★ Class 12 Physics Chapter 4 Moving Charges and Magnetism 100% COMPLETE! Tamam 43 Sections Mukammal! 🎉"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
