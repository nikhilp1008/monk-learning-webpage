"use client";

/**
 * P12Ch02 · Section 43 — "Spherical conductors and the spherical capacitor"
 * Beats (en [0,5,15,25,38,51,64,79]): 8 beats
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

export default function P12Ch02Sec43({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("spherical conductors and the spherical capacitor", "spherical conductors aur spherical capacitor")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Solid sphere V */}
      <Badge n={1} cx={52} cy={110} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={115} size={14} fill={RED} weight={700} anchor="start">ISOLATED SPHERICAL CONDUCTOR (Radius R)</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 130)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = (1/4πε₀) · Q / R
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Isolated C */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)} dim={beat >= 3}>
        <g transform="translate(480, 130)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = Q/V = 4πε₀ R
          </T>
        </g>
      </Fade>

      {/* BEAT 3: E inside and outside */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={215} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Inside E = 0. Outside, it acts as if all charge sits exactly at the centre point!",
            "Andar E = 0. Bahar aisa lagta hai jaise saara charge bilkul centre pe baitha ho!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Spherical capacitor (inner a, outer b) */}
      <Badge n={2} cx={52} cy={275} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={280} size={14} fill={RED} weight={700} anchor="start">SPHERICAL CAPACITOR (Shells a and b)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 295)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = 4πε₀ · [ (ab) / (b − a) ]
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Small gap logic */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={380} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Notice (b−a) in denominator: a small gap gives a LARGE capacitance (just like small d)!",
            "Notice karo denominator mein (b−a) hai: chota gap C bada dega (just like chota d)!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Shell potential rule */}
      <Badge n={3} cx={52} cy={430} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={74} y={435} size={14} fill={RED} weight={700} anchor="start">GOLDEN RULE FOR CONCENTRIC SHELLS</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 450)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={RED} strokeWidth={2} />
          <T x={480} y={36} anchor="middle" size={15} fill={RED} weight={800}>
            {t(
              "A shell contributes (kQ/R) everywhere INSIDE itself, and (kQ/r) OUTSIDE itself.",
              "Shell (kQ/R) V deti hai apne andar KAHIN BHI, aur (kQ/r) apne BAHAR."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Mechanical problems */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ That single rule makes 3-shell potential problems purely mechanical to solve! ✓",
            "★ Yeh ek rule 3-shell potential problems ko purely mechanical bana deta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
