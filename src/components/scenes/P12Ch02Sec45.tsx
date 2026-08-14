"use client";

/**
 * P12Ch02 · Section 45 — "Derivation: E equals sigma over epsilon zero with a Gaussian pillbox"
 * Beats (en [0,6,17,26,36,45,59,72]): 8 beats
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

export default function P12Ch02Sec45({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: field just outside a charged conductor", "derivation: charged conductor ke theek bahar ki field")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Gaussian Pillbox */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(150, 180)">
          {/* Conductor surface (vertical line, left is inside, right is outside) */}
          <rect x={-80} y={-100} width={80} height={200} fill="#e2e8f0" />
          <line x1={0} y1={-100} x2={0} y2={100} stroke={INK} strokeWidth={3} />
          <T x={-40} y={0} size={14} fill={INK} weight={700}>CONDUCTOR (E=0)</T>
          <T x={120} y={-80} size={14} fill={INK} weight={700}>OUTSIDE</T>
          <T x={15} y={-20} size={16} fill={RED} weight={800}>+</T>
          <T x={15} y={20} size={16} fill={RED} weight={800}>+</T>
          <T x={15} y={60} size={16} fill={RED} weight={800}>+</T>
          <T x={15} y={-60} size={16} fill={RED} weight={800}>+</T>

          {/* Pillbox */}
          <Fade on={beat >= 1} delay={dl(1, 0.8)}>
            <rect x={-40} y={-30} width={80} height={60} fill="none" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" />
            <T x={-5} y={-40} size={12} fill={AMBER_DARK} weight={700} anchor="end">Inner face</T>
            <T x={5} y={-40} size={12} fill={AMBER_DARK} weight={700} anchor="start">Outer face ΔS</T>
          </Fade>

          {/* E vector */}
          <Fade on={beat >= 3} delay={dl(3, 0.5)}>
            <line x1={40} y1={0} x2={120} y2={0} stroke={RED} strokeWidth={2} />
            <polygon points="128,0 118,-4 118,4" fill={RED} />
            <T x={80} y={-10} size={14} fill={RED} weight={700}>E</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Inner face flux */}
      <Badge n={1} cx={480} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={502} y={125} size={14} fill={RED} weight={700} anchor="start">INNER FACE FLUX = 0</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <T x={502} y={150} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Inside the conductor E=0, so the inner face contributes zero flux.",
            "Andar E=0 hai, isliye inner face se koi flux nahi aati."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Outer face flux */}
      <Badge n={2} cx={480} cy={200} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={502} y={205} size={14} fill={RED} weight={700} anchor="start">OUTER FACE FLUX</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <T x={502} y={230} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Just outside, E is perpendicular to surface. Only outer flat face ΔS contributes.",
            "Bahar E surface ke perpendicular hai. Sirf outer face ΔS flux deta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 4: Total Flux */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)} dim={beat >= 6}>
        <g transform="translate(480, 260)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            ∮ E·dA = E × ΔS
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Equating to q/ε₀ */}
      <Badge n={3} cx={52} cy={350} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">APPLYING GAUSS'S LAW</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E × ΔS = (σ × ΔS) / ε₀   →   E = σ / ε₀
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Why double? */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={450} size={14} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Why double the isolated sheet (σ/2ε₀)? For a sheet, flux escapes BOTH faces.",
            "Isolated sheet (σ/2ε₀) ka double kyun? Sheet mein flux DONO faces se nikalta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 7: Conclusion */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Here the inside face is dead (E=0), so ALL flux is forced out ONE face → doubling the result! ✓",
            "★ Yahan andar ka face dead hai (E=0), toh SAARI flux EK face se nikalti hai → result double! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
