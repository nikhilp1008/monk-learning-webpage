"use client";

/**
 * P12Ch02 · Section 39 — "Why the field inside a conductor is exactly zero"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH CONDUCTOR DRIFT DIAGRAM (NO CONTAINER BOXES):
 *  - Solid Conductor placed in External Field E₀
 *  - Free electron drift to left boundary (-σ_ind), leaving positive ions on right (+σ_ind)
 *  - Internal induced field E_ind opposes E₀
 *  - Equilibrium reached in ~10⁻¹⁴ seconds when E_ind = E₀  =>  E_inside = 0 N/C!
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

export default function P12Ch02Sec39({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Electron drift animation inside conductor
  const driftX = (currentTime * 40) % 60;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Why Electrostatic Field Inside a Conductor is EXACTLY Zero (E_inside = 0)", "Why Electrostatic Field Inside a Conductor is EXACTLY Zero (E_inside = 0)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CONDUCTOR INDUCED CHARGE DRIFT */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FREE ELECTRON DRIFT & INDUCED OPPOSING FIELD", "FREE ELECTRON DRIFT & INDUCED OPPOSING FIELD")}
          </T>
        </Fade>

        {/* Conductor Body */}
        <Fade on={beat >= 1}>
          {/* External Field Arrows E0 */}
          <path d={arrowD(20, 110, 440, 110)} stroke={RED} strokeWidth={2.5} />
          <path d={arrowD(20, 190, 440, 190)} stroke={RED} strokeWidth={2.5} />
          <path d={arrowD(20, 270, 440, 270)} stroke={RED} strokeWidth={2.5} />
          <T x={445} y={195} size={13} fill={RED} weight={800} anchor="start">E₀ External</T>

          {/* Solid Conductor Block */}
          <rect x="120" y="80" width="220" height="220" rx={15} fill={AMBER_DARK} opacity={0.2} stroke={AMBER_DARK} strokeWidth={2.5} />

          {/* Induced Charges on Boundaries */}
          <T x={135} y={195} size={22} fill={GREEN} weight={900} anchor="middle">− − − −</T>
          <T x={325} y={195} size={22} fill={RED} weight={900} anchor="middle">+ + + +</T>

          {/* Opposing Internal Field E_ind */}
          <path d={arrowD(310, 190, 150, 190)} stroke={GREEN} strokeWidth={3} />
          <T x={230} y={170} size={15} fill={GREEN} weight={900} anchor="middle">E_ind (Opposes E₀)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            Net Internal Field E_inside = E₀ − E_ind = 0 N/C !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EQUILIBRIUM MECHANISM STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EQUILIBRIUM MECHANISM IN ~10⁻¹⁴ SECONDS", "EQUILIBRIUM MECHANISM IN ~10⁻¹⁴ SECONDS")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. External field E₀ exerts force F = −e E₀ on free electrons.
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Electrons drift left, creating surface charge density ±σ_ind.
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. E_ind grows until E_ind = E₀ exactly canceling E₀.
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. If E ≠ 0 inside, charge would flow (Not Static)!
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Electrostatic equilibrium means ALL internal charge motion has ceased!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FOUNDATIONAL CONDUCTOR RULE", "FOUNDATIONAL CONDUCTOR RULE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Inside any conductor in electrostatic equilibrium (solid or hollow), E_inside = 0 N/C!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            This holds regardless of external charge configuration or shape!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Conductor Rule 1 Mastered: Internal electric field E_inside = 0 N/C in electrostatic equilibrium! ✓",
            "★ Conductor Rule 1 Mastered: Internal electric field E_inside = 0 N/C in electrostatic equilibrium! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
