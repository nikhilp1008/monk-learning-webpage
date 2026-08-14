"use client";

/**
 * P12Ch02 · Section 30 — "When the series and parallel rules do not apply"
 * Beats (en [0,10,17,26,34,47,61,74]): 8 beats
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

export default function P12Ch03Sec30({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("When series and parallel rules DO NOT apply", "When series and parallel rules DO NOT apply")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 2 & 3: Necessary Conditions */}
      <Badge n={1} cx={52} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">STRICT TOPOLOGY RULES</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Series: NO junction/branch in between!
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={INK} weight={800}>
            Parallel: BOTH ends must share common nodes!
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Paper Traps */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">PAPER DRAWING TRAPS</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={RED} weight={800} script>
            {t(
              "Looking side-by-side on paper DOES NOT mean parallel!",
              "Paper par side-by-side dikhna matlab parallel nahi hota!"
            )}
          </T>
          <T x={240} y={52} anchor="middle" size={13} fill={INK} weight={700}>
            {t("Check node connections, not drawing layout.", "Drawing ki jagah electrical nodes check karein.")}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Irreducible Networks (Kirchhoff's needed) */}
      <Badge n={3} cx={52} cy={290} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">IRREDUCIBLE NETWORKS</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Unbalanced bridge or complex mesh cannot be reduced $\\implies$ Require Kirchhoff's Laws!",
              "Unbalanced bridge ya mesh reduce nahi ho sakta $\\implies$ Kirchhoff's Laws chahiye!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Recognising when a circuit CANNOT be simplified with series/parallel is a key skill! ✓",
            "★ Kab circuit series/parallel se reduce nahi hoga ye pehchanna bohot zaroori hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
