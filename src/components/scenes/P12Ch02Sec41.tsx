"use client";

/**
 * P12Ch02 · Section 41 — "The surface field, and the Faraday cage"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH FARADAY CAGE SCHEMATIC (NO CONTAINER BOXES):
 *  - Surface Field E = σ / ε₀ (perpendicular ⊥ to conductor surface)
 *  - Faraday Cage Shielding: Metallic cavity shielded 100% from external electric fields (E_cavity = 0)
 *  - Practical applications: Lightning protection in cars, sensitive coaxial cables, electrostatic shielding
 *  - Zero card box containers
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD,
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

export default function P12Ch02Sec41({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Surface Field E = σ/ε₀ & Electrostatic Shielding (The Faraday Cage)", "Surface Field E = σ/ε₀ & Electrostatic Shielding (The Faraday Cage)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SURFACE FIELD E = σ / ε₀ */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SURFACE FIELD E IS ALWAYS PERPENDICULAR ⊥", "SURFACE FIELD E IS ALWAYS PERPENDICULAR ⊥")}
          </T>
        </Fade>

        {/* Conductor surface and field vector */}
        <Fade on={beat >= 1}>
          <path d="M 60 260 Q 240 220, 420 260" stroke={INK} strokeWidth={4} fill="none" />
          <T x={240} y={285} size={14} fill={INK} weight={800} anchor="middle">Conductor Surface (σ)</T>

          {/* Perpendicular field arrows E */}
          <path d={arrowD(150, 245, 150, 100)} stroke={RED} strokeWidth={3} />
          <path d={arrowD(240, 235, 240, 90)} stroke={RED} strokeWidth={3} />
          <path d={arrowD(330, 245, 330, 100)} stroke={RED} strokeWidth={3} />

          <T x={240} y={75} size={16} fill={RED} weight={900} anchor="middle">E = (σ / ε₀) n^</T>

          {/* 90 degree symbol */}
          <path d="M 240 225 L 252 225 L 252 235" stroke="#000000" strokeWidth={1.5} fill="none" />
          <T x={265} y={220} size={12} fill={INK} weight={800}>90° ⊥</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            If field had a tangential component, surface charges would move!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: FARADAY CAGE HOLLOW CAVITY SHIELDING */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FARADAY CAGE: HOLLOW CAVITY SHIELDING", "FARADAY CAGE: HOLLOW CAVITY SHIELDING")}
          </T>
        </Fade>

        {/* Hollow Metallic Shell Diagram */}
        <Fade on={beat >= 4}>
          {/* Outer Field Arrows E0 */}
          <path d={arrowD(30, 180, 80, 180)} stroke={RED} strokeWidth={2.5} />
          <path d={arrowD(420, 180, 470, 180)} stroke={RED} strokeWidth={2.5} />

          {/* Metal Shell Ring */}
          <circle cx={250} cy={180} r={110} stroke={AMBER_DARK} strokeWidth={15} fill="none" />
          <T x={250} y={55} size={14} fill={AMBER_DARK} weight={900} anchor="middle">Metallic Shell / Car Body</T>

          {/* Interior Hollow Cavity */}
          <circle cx={250} cy={180} r={102} fill="#ffffff" />
          <T x={250} y={170} size={18} fill={GREEN} weight={900} anchor="middle">Hollow Cavity E = 0</T>
          <T x={250} y={200} size={14} fill={GREEN} weight={800} anchor="middle">100% Shielded!</T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Lightning strikes outer shell and flows safely to ground — interior remains 100% safe!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FARADAY CAGE PRACTICAL APPLICATIONS", "FARADAY CAGE PRACTICAL APPLICATIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            1. Car in a thunderstorm   |   2. Coaxial cable shielding   |   3. Sensitive instrument enclosures!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Surface field magnitude E = σ / ε₀ (Twice as strong as single infinite sheet field σ / 2ε₀)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Electrostatic Shielding Mastered: E = σ/ε₀ normal to surface & E_cavity = 0 inside any hollow metallic enclosure! ✓",
            "★ Electrostatic Shielding Mastered: E = σ/ε₀ normal to surface & E_cavity = 0 inside any hollow metallic enclosure! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
