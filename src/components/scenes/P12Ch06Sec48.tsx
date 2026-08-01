"use client";

/**
 * P12Ch06 · Section 48 — "Where the sine wave comes from: the projection of a rotating vector"
 * Subtopic: AC Generator & Energy Density
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

export default function P12Ch06Sec48({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Phasor Derivation: Rotating Vector Projection & 90° Phase Shift", "Phasor Derivation: Rotating Vector Projection & 90° Phase Shift")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: 90° Phase Shift between Flux & EMF */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("FLUX Φ(t) = Φ_max cos(ωt) VS EMF ε(t) = ε₀ sin(ωt)", "FLUX Φ(t) = Φ_max cos(ωt) VS EMF ε(t) = ε₀ sin(ωt)")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            EMF leads flux in phase by 90°!
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            When flux is MAXIMUM (cos=1), EMF is ZERO (sin=0)!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Peak EMF Condition */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("PEAK EMF ε₀ OCCURS WHEN COIL PLANE IS PARALLEL TO B", "PEAK EMF ε₀ OCCURS WHEN COIL PLANE IS PARALLEL TO B")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            θ = 90°  ⇒  Φ = 0, but dΦ/dt is MAX!
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Coil cuts magnetic field lines at maximum rate!", "Coil magnetic field lines ko maximum rate par cut karti hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Rule */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("PHASOR ROTATION SUMMARY", "PHASOR ROTATION SUMMARY")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Cos wave flux projection leads to Sin wave EMF because derivative d/dt [cos(ωt)] = −ω sin(ωt)!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Peak EMF occurs when coil is PARALLEL to B (flux=0, rate of cutting lines max); zero EMF occurs when PERPENDICULAR to B! ✓",
            "★ Peak EMF tab hota hai jab coil B ke PARALLEL ho (flux=0, rate max); zero EMF when PERPENDICULAR to B! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
