"use client";

/**
 * P12Ch04 · Section 40 — "Worked Examples Three and Four: Dipole Field and SHM Oscillations"
 * Beats (en [0,4,5,6,8,9,10,11]): 8 beats
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

export default function P12Ch04Sec40({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main & Advanced: Dipole Far Field & Vibration Magnetometer SHM", "JEE Main & Advanced: Dipole Far Field & Vibration Magnetometer SHM")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: JEE MAIN DIPOLE AXIAL FIELD */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN: DIPOLE AXIAL FIELD NUMERICAL", "JEE MAIN: DIPOLE AXIAL FIELD NUMERICAL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Parameters: Dipole moment m = 0.188 A m², distance x = 0.50 m.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Far-Field Axial Formula: B_axial = (μ_0 / 4π) (2m / x³).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Calculation: B_axial = (10^-7) × [2(0.188) / (0.50)³].
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Calculated Field: B_axial = 3.0 × 10^-7 T!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (At same distance, equatorial field B_eq = 1.5 × 10^-7 T)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: JEE ADVANCED DIPOLE SHM OSCILLATIONS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED: DIPOLE SHM OSCILLATIONS", "JEE ADVANCED: DIPOLE SHM OSCILLATIONS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Restoring Torque: τ = -m B sin θ ≈ -m B θ for small angle θ.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Differential Equation: I (d²θ/dt²) = -m B θ  =&gt;  d²θ/dt² = - (m B / I) θ.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. SHM Period: ω = √(m B / I)  =&gt;  T = 2π √(I / m B).
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Numerical Period: T = 2π √(2.0×10^-4 / 0.02) = 0.63 s!
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Foundation principle of the Vibration Magnetometer)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SUMMARY OF DIPOLE FIELD & OSCILLATIONS", "SUMMARY OF DIPOLE FIELD & OSCILLATIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Axial Field: B_axial = 3.0 × 10^-7 T drops off inversely with the cube of distance x^3.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Magnetometer SHM: Period T = 2π √(I / mB) allows precise measurement of unknown B or m.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ B_axial = 3.0 × 10⁻⁷ T | Vibration Magnetometer SHM period T = 2π √(I / mB) = 0.63 s! ✓",
            "★ B_axial = 3.0 × 10⁻⁷ T | Vibration Magnetometer SHM period T = 2π √(I / mB) = 0.63 s! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
