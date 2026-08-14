"use client";

/**
 * P12Ch02 · Section 16 — "Energy conservation and the work-energy sign convention"
 * Beats (en [0,5,15,25,33,43,50,57]): 8 beats
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

export default function P12Ch02Sec16({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("energy bookkeeping: K + U stays constant", "energy bookkeeping: K + U constant rehta hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: K_i + U_i = K_f + U_f */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">CONSERVATION OF ENERGY</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={480} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={240} y={40} anchor="middle" size={26} fill={RED} weight={800}>
            K_i + U_i = K_f + U_f
          </T>
        </g>
      </Fade>

      {/* BEAT 2: U → K conversion */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={225} size={14} fill={INK} anchor="start" script>
          {t(
            "Release a charge → U converts to K — speeds up exactly as PE falls!",
            "Charge chhodo → U se K banta hai — jitna PE girata utna speed badhta!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: W_field = −ΔU */}
      <Badge n={2} cx={52} cy={270} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">FIELD DOES WORK</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={22} fill={INK} weight={800}>W_field = −ΔU</T>
        </g>
      </Fade>

      {/* BEAT 4: Explanation */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={370} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Field does positive work → charge falls downhill → U decreases!",
            "Field positive work karta → charge downhill jaata → U decrease!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: W_ext = +ΔU */}
      <Badge n={3} cx={540} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">EXTERNAL AGENT DOES WORK</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={22} fill={INK} weight={800}>W_ext = +ΔU</T>
        </g>
      </Fade>

      {/* BEAT 6: Explanation */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={370} size={13} fill={MUTED} anchor="start" script>
          {t(
            "External agent drags charge uphill → U increases by that work!",
            "External agent charge ko uphill le jaata → U usse utna badhta!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Takeaway */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ RULE: Know WHO does the work → sign sorts itself out every time ✓",
            "★ RULE: KAUN work kar raha hai pata karo → sign apne aap sahi aata hai ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
