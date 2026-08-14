"use client";

/**
 * P12Ch02 · Section 64 — "Pitfalls: swapped formulas and the conservation trap"
 * Beats (en [0,4,17,28,45,57,70]): 7 beats
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

export default function P12Ch02Sec64({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Common pitfalls in combining capacitors", "Capacitors combine karne mein common pitfalls")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 330 70 C 440 66, 640 74, 750 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Swapping formulas */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">SWAPPING FORMULAS</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={24} anchor="middle" size={15} fill={INK} weight={800} script>
            {t("Capacitors ADD in parallel,", "Capacitors parallel mein ADD hote hain,")}
          </T>
          <T x={225} y={48} anchor="middle" size={15} fill={INK} weight={800} script>
            {t("add RECIPROCALLY in series.", "series mein RECIPROCAL add hote hain.")}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Anchor */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={220} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Anchor it with the shared quantity: series shares charge, parallel shares voltage.",
            "Shared quantity se yaad rakho: series charge share karta hai, parallel voltage share karta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Forgetting shared quantity */}
      <Badge n={2} cx={52} cy={270} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">FORGETTING WHAT IS SHARED</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Breaks per-capacitor Q and V calculations!",
              "Isse per-capacitor Q aur V ki calculations galat ho jati hain!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Skipping sanity check */}
      <Badge n={3} cx={540} cy={120} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">SKIPPING SANITY CHECK</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={36} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Series < smallest; Parallel > largest.",
              "Series < smallest member se; Parallel > largest member se."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Conservation trap */}
      <Badge n={4} cx={540} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">THE CONSERVATION TRAP</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={36} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Assuming energy is conserved. ONLY charge is conserved!",
              "Yeh sochna ki energy conserve hogi. SIRF charge conserve rehta hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Pro tip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={450} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Pro-tip: Reduce networks in stages, redrawing after each step! ✓",
            "★ Pro-tip: Networks ko stages mein reduce karo, har step ke baad redraw karo! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
