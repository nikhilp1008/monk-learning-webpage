"use client";

/**
 * P12Ch05 · Section 4 — "Limiting conditions: when the clean formulas are allowed"
 * Subtopic: Bar Magnet, Magnetic Field Lines and Dipole Moment
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

export default function P12Ch05Sec4({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Limiting Conditions: When Short-Dipole Formulas Apply", "Limiting Conditions: Short Dipole Formulas Kab Apply Hote Hain")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Short Dipole Condition */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("THE FAR-FIELD CONDITION (x ≫ l)", "FAR-FIELD CONDITION (x ≫ l)")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            Exact: B_axial = (μ₀ / 4π) · [2 m x / (x² − l²)²]
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("When distance x ≫ l, (x² − l²) ≈ x⁴ ⇒ B_axial = (μ₀ / 4π) (2m / x³)", "Jab x ≫ l, tab B_axial = (μ₀ / 4π) (2m / x³) Short dipole formula!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Equatorial Far Field */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("EQUATORIAL FIELD APPROXIMATION (y ≫ l)", "EQUATORIAL FIELD APPROXIMATION (y ≫ l)")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            B_eq = (μ₀ / 4π) (m / y³)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("Ratio at equal far distance: B_axial : B_eq = 2 : 1!", "Equal far distance par ratio: B_axial : B_eq = 2 : 1!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Warning Rule */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("EXAM TRAP: NEAR-FIELD VS FAR-FIELD FORMULA", "EXAM TRAP: NEAR-FIELD VS FAR-FIELD FORMULA")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            {t(
              "Do NOT use 2m/x³ if distance x is comparable to magnet length 2l! Use exact formula instead!",
              "Agar distance x magnet length 2l ke comparable ho to exact formula use karein, 2m/x³ nahi!"
            )}
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Far-field approximation requires x ≫ l, yielding 1/x³ inverse-cube distance drop-off! ✓",
            "★ Far-field approximation x ≫ l maangta hai, jisse 1/x³ inverse-cube drop-off milta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
