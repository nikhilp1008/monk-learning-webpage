"use client";

/**
 * P12Ch02 · Section 27 — "Capacitance is geometry alone"
 * Beats (en [0,6,16,27,40,52,65]): 7 beats
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

export default function P12Ch02Sec27({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("capacitance depends ONLY on geometry", "capacitance SIRF geometry pe depend karta hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Key insight */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 95)">
          <rect x={0} y={0} width={960} height={45} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={480} y={28} anchor="middle" size={15} fill={RED} weight={800}>
            {t(
              "⚠ C is geometry alone — plate area, separation, dielectric. NOT charge, NOT voltage!",
              "⚠ C sirf geometry hai — plate area, separation, dielectric. Charge ya voltage NAHI!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Does not depend on Q or V */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={170} size={14} fill={INK} anchor="start" script>
          {t(
            "Doesn't depend on how much charge stored, nor on applied voltage!",
            "Na charge pe depend karta hai, na applied voltage pe!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Water tank analogy */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={210} size={14} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Pouring more water doesn't widen the tank → charging more doesn't change C!",
            "Zyada paani daalke tank bada nahi hota → zyada charge daalke C nahi badalta!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: C = Q/V stays fixed */}
      <Badge n={1} cx={52} cy={270} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">WHY C STAYS FIXED</T>
      </Fade>
      <Fade on={beat >= 4}>
        <g transform="translate(60, 295)">
          <rect x={0} y={0} width={500} height={70} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={250} y={24} anchor="middle" size={14} fill={MUTED} script>Q and V rise together, ratio stays constant</T>
          <T x={250} y={50} anchor="middle" size={22} fill={RED} weight={800}>C = Q/V = constant (geometry!)</T>
        </g>
      </Fade>

      {/* BEAT 5: What DOES change C */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(60, 380)">
          <rect x={0} y={5} width={960} height={45} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={34} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t(
              "If C changed → something GEOMETRIC or DIELECTRIC must have changed!",
              "Agar C badla → kuch GEOMETRIC ya DIELECTRIC zaroor badla hoga!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: SI unit */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ SI unit: 1 Farad = 1 C/V. Practical: pF, nF, μF range ✓",
            "★ SI unit: 1 Farad = 1 C/V. Practical: pF, nF, μF range ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
