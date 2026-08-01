"use client";

/**
 * P12Ch05 · Section 1 — "Iron filings and the shape of a magnetic field"
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

export default function P12Ch05Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Iron Filings and the Shape of a Magnetic Field", "Iron Filings aur Magnetic Field ki Shape")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Bar Magnet Visual & Field Lines */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("THE BAR MAGNET & CONTINUOUS FIELD LINES", "BAR MAGNET AUR CONTINUOUS FIELD LINES")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          {/* Bar Magnet graphic */}
          <rect x={120} y={40} width={100} height={50} fill={RED} rx={4} />
          <rect x={220} y={40} width={100} height={50} fill={INK} rx={4} />
          <T x={170} y={72} size={22} fill="#ffffff" weight={800}>S</T>
          <T x={270} y={72} size={22} fill="#ffffff" weight={800}>N</T>
          
          {/* Field Lines sweeping out */}
          <path d="M 270 40 C 270 -20, 170 -20, 170 40" stroke={AMBER_DARK} strokeWidth={2} fill="none" strokeDasharray="5 3" />
          <path d="M 270 90 C 270 150, 170 150, 170 90" stroke={AMBER_DARK} strokeWidth={2} fill="none" strokeDasharray="5 3" />
          <path d="M 300 40 C 340 -40, 100 -40, 140 40" stroke={AMBER_DARK} strokeWidth={1.8} fill="none" />
          <path d="M 300 90 C 340 170, 100 170, 140 90" stroke={AMBER_DARK} strokeWidth={1.8} fill="none" />

          {/* Dipole Moment vector inside */}
          <line x1={140} y1={65} x2={300} y2={65} stroke={GREEN} strokeWidth={3} markerEnd="url(#arrow)" />
          <T x={220} y={60} size={13} fill={GREEN} weight={800}>m (S → N inside)</T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Magnetic Dipole Moment Definition */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("MAGNETIC DIPOLE MOMENT (m)", "MAGNETIC DIPOLE MOMENT (m)")}
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            m = q_m × 2l  (or m = I × A for loops)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("Vector direction: South Pole → North Pole INSIDE magnet!", "Vector direction: South Pole → North Pole INSIDE magnet!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Field Line Density & Strength */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("FIELD LINE DENSITY = FIELD STRENGTH", "FIELD LINE DENSITY = FIELD STRENGTH")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            {t(
              "Dense lines near poles ⇒ Strong B field | Spreading lines near equator ⇒ Weak B field!",
              "Poles ke paas dense lines ⇒ Strong B field | Equator par spreading lines ⇒ Weak B field!"
            )}
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Magnetic field lines are continuous closed loops (S → N inside, N → S outside)! ✓",
            "★ Magnetic field lines continuous closed loops hoti hain (S → N inside, N → S outside)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
