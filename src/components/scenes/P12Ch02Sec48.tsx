"use client";

/**
 * P12Ch02 · Section 48 — "NEET speed trap: induced charges on a cavity"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH CAVITY CHARGE INDUCTION DIAGRAM (NO CONTAINER BOXES):
 *  - Uncharged conductor with cavity holding point charge +q
 *  - Induced inner cavity surface charge = -q
 *  - Induced outer conductor surface charge = +q
 *  - Field inside cavity E_cavity ≠ 0; Field inside metal E_metal = 0; Outer field E_outside = kq/r²
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

export default function P12Ch02Sec48({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("NEET Speed Trap: Charge Induction on Cavity Walls (−q_inner & +q_outer)", "NEET Speed Trap: Charge Induction on Cavity Walls (−q_inner & +q_outer)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CAVITY INDUCTION DIAGRAM */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("POINT CHARGE +q INSIDE CONDUCTOR CAVITY", "POINT CHARGE +q INSIDE CONDUCTOR CAVITY")}
          </T>
        </Fade>

        {/* Cavity Diagram */}
        <Fade on={beat >= 1}>
          {/* Outer Conductor Shell */}
          <circle cx={240} cy={180} r={110} stroke={AMBER_DARK} strokeWidth={4} fill={AMBER_DARK} fillOpacity={0.15} />
          <T x={240} y={55} size={13} fill={RED} weight={900} anchor="middle">+q Induced Outer Surface</T>

          {/* Inner Cavity Boundary */}
          <circle cx={220} cy={180} r={50} stroke={GREEN} strokeWidth={2.5} fill="#ffffff" strokeDasharray="4 4" />
          <T x={220} y={115} size={12} fill={GREEN} weight={900} anchor="middle">−q Induced Cavity Wall</T>

          {/* Central Point Charge +q */}
          <circle cx={220} cy={180} r={12} fill={RED} />
          <T x={220} y={185} size={13} fill="#ffffff" weight={900}>+q</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={16} fill={INK} weight={800}>
            Gauss Law: ∮ E_metal · dA = (q + q_cavity) / ε₀ = 0  ⇒  q_cavity = −q !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: FIELD REGION ANALYSIS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("FIELD REGION BREAKDOWN", "FIELD REGION BREAKDOWN")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={RED} weight={800} anchor="start">
            1. Cavity Interior: E_cavity = k q / r² ≠ 0
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Metal Body: E_metal = 0 N/C  (Exact Cancellation!)
          </T>

          <T x={50} y={205} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            3. Exterior Region: E_outside = k q / r²  (As if +q at center)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={19} fill={GREEN} weight={900} anchor="start">
            4. Net Conductor Charge = (−q) + (+q) = 0
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Moving +q inside cavity changes outer charge distribution UNLESS outer surface is grounded!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("NEET CAVITY REASONING TRICK", "NEET CAVITY REASONING TRICK")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Inner cavity wall receives −q; Outer conductor surface receives +q (or Q + q if conductor had initial charge Q)!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Grounding the conductor drains the outer +q charge to zero, making E_outside = 0!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ NEET Trap Neutralized: Charge +q in cavity induces −q on cavity wall and +q on outer conductor surface! ✓",
            "★ NEET Trap Neutralized: Charge +q in cavity induces −q on cavity wall and +q on outer conductor surface! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
