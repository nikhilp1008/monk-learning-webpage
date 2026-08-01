"use client";

/**
 * P12Ch02 · Section 16 — "Energy conservation and the work-energy sign convention"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH ENERGY BALANCE SCHEMATIC (NO CONTAINER BOXES):
 *  - Mechanical Energy Conservation: K_initial + U_initial = K_final + U_final
 *  - External Work W_ext = ΔU = U_final - U_initial = q (V_final - V_initial)
 *  - Electrostatic Field Work W_field = - ΔU = ΔK
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

export default function P12Ch02Sec16({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Conservation of Energy & Work-Energy Sign Conventions", "Conservation of Energy & Work-Energy Sign Conventions")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CONSERVATION OF MECHANICAL ENERGY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CONSERVATION OF MECHANICAL ENERGY (ΔE = 0)", "CONSERVATION OF MECHANICAL ENERGY (ΔE = 0)")}
          </T>
        </Fade>

        {/* Floating Mechanical Energy Equation */}
        <Fade on={beat >= 1}>
          <T x={230} y={110} anchor="middle" size={20} fill={INK} weight={800}>
            K_initial + U_initial = K_final + U_final
          </T>
          <T x={230} y={150} anchor="middle" size={16} fill={AMBER_DARK} weight={700}>
            ΔK + ΔU = 0   ⇒   ΔK = − ΔU
          </T>

          <path d={arrowD(120, 190, 340, 190)} stroke={GREEN} strokeWidth={3} />
          <T x={230} y={225} size={15} fill={GREEN} weight={800} anchor="middle">Decreasing U converts to Kinetic Energy K!</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={305} anchor="middle" size={17} fill={GREEN} weight={800}>
            ½ m v² = q (V_initial − V_final)   [Accelerating Charge Speed]
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EXTERNAL WORK VS FIELD WORK */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EXTERNAL WORK (W_ext) VS FIELD WORK (W_field)", "EXTERNAL WORK (W_ext) VS FIELD WORK (W_field)")}
          </T>
        </Fade>

        {/* Floating Work Conventions (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={90} size={16} fill={RED} weight={800} anchor="start">
            1. External Agent Work: W_ext = + ΔU = q (V_final − V_initial)
          </T>

          <T x={50} y={150} size={16} fill={GREEN} weight={800} anchor="start">
            2. Electrostatic Field Work: W_field = − ΔU = − q (V_final − V_initial)
          </T>

          <T x={50} y={210} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            3. Net Work Theorem: W_ext + W_field = ΔK
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 245 L 450 245" stroke={INK} sw={2} />

          <T x={50} y={295} size={20} fill={RED} weight={800} anchor="start">
            W_field = − W_ext  (Equal & Opposite!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            If charge moves without change in kinetic energy (ΔK = 0), W_ext = − W_field = ΔU!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SIGN CONVENTION SPEED TRAP", "SIGN CONVENTION SPEED TRAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Always check if question asks for Work by External Force (W_ext) or Work by Electric Field (W_field)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            W_ext = + q ΔV   vs   W_field = − q ΔV !
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Work-Energy Mastered: W_ext = +ΔU = q ΔV while W_field = −ΔU = ΔK (Conservation of Mechanical Energy)! ✓",
            "★ Work-Energy Mastered: W_ext = +ΔU = q ΔV while W_field = −ΔU = ΔK (Conservation of Mechanical Energy)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
