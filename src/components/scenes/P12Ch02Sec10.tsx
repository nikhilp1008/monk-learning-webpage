"use client";

/**
 * P12Ch02 · Section 10 — "NEET speed trap: potential zero, field not"
 * Subtopic: Electrostatic Potential & Equipotentials
 * OPEN CHALKBOARD DESIGN WITH NEET TRAP COMPARISON DIAGRAMS (NO CONTAINER BOXES):
 *  - Trap 1: Dipole Equatorial Line -> Potential V = 0, but Field E ≠ 0!
 *  - Trap 2: Inside Charged Shell -> Field E = 0, but Potential V ≠ 0 (V = kQ/R)!
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

export default function P12Ch02Sec10({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("NEET Speed Trap: V = 0 Does NOT Mean E = 0 (and Vice Versa!)", "NEET Speed Trap: V = 0 Does NOT Mean E = 0 (and Vice Versa!)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: TRAP 1 — DIPOLE EQUATORIAL LINE (V = 0, E ≠ 0) */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("TRAP 1: DIPOLE EQUATORIAL LINE", "TRAP 1: DIPOLE EQUATORIAL LINE")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Dipole Charges +q and -q */}
          <circle cx={100} cy={220} r={20} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={100} y={226} size={16} fill={RED} weight={800}>+q</T>

          <circle cx={340} cy={220} r={20} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={340} y={226} size={18} fill={GREEN} weight={800}>-q</T>

          {/* Equatorial Bisector Line */}
          <line x1="220" y1="60" x2="220" y2="300" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="5 5" />
          <circle cx={220} cy={120} r={7} fill={AMBER_DARK} />
          <T x={220} y={95} size={15} fill={AMBER_DARK} weight={800}>Point P</T>

          {/* E Field Vector pointing left parallel to dipole */}
          <path d={arrowD(220, 120, 150, 120)} stroke={RED} strokeWidth={3.5} />
          <T x={185} y={105} size={14} fill={RED} weight={900}>E ≠ 0</T>

          <T x={220} y={150} size={15} fill={GREEN} weight={800}>V_total = +kq/r − kq/r = 0 V</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={220} y={350} anchor="middle" size={17} fill={RED} weight={800}>
            ★ V = 0 V everywhere on equatorial line, BUT E = kp/r³ ≠ 0 !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: TRAP 2 — INSIDE CONDUCTING SHELL (E = 0, V ≠ 0) */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("TRAP 2: INSIDE CHARGED SHELL", "TRAP 2: INSIDE CHARGED SHELL")}
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          {/* Conducting Shell Circle */}
          <circle cx={240} cy={190} r={100} stroke={RED} strokeWidth={3} fill="none" />
          <T x={240} y={75} size={14} fill={RED} weight={800} anchor="middle">Charged Shell (+Q, Radius R)</T>

          {/* Interior point */}
          <circle cx={200} cy={190} r={6} fill={GREEN} />
          <T x={200} y={170} size={14} fill={GREEN} weight={800}>Interior (r &lt; R)</T>

          <T x={240} y={210} size={16} fill={GREEN} weight={800} anchor="middle">E_inside = 0 N/C</T>
          <T x={240} y={240} size={16} fill={AMBER_DARK} weight={800} anchor="middle">V_inside = kQ/R ≠ 0 V !</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 6}>
          <T x={240} y={350} anchor="middle" size={17} fill={GREEN} weight={800}>
            ★ E = 0 inside shell, BUT V is constant non-zero (V = kQ/R)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS COMPARISON TABLE */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SUMMARY: FIELD VS POTENTIAL INDEPENDENCE", "SUMMARY: FIELD VS POTENTIAL INDEPENDENCE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Electric Field E = derivative (−dV/dr)  |  Potential V = scalar work accumulation!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Never assume V = 0 implies E = 0, or E = 0 implies V = 0! Always test E = −dV/dr!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ NEET Speed Trap Neutralized: Dipole equatorial line has V=0 but E≠0; Shell interior has E=0 but V=kQ/R! ✓",
            "★ NEET Speed Trap Neutralized: Dipole equatorial line has V=0 but E≠0; Shell interior has E=0 but V=kQ/R! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
