"use client";

/**
 * P12Ch02 · Section 51 — "Pitfalls: sigma over epsilon zero, cavities, and one-way shielding"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH SUBTOPIC 4 RECAP & PITFALL CHECKLIST (NO CONTAINER BOXES):
 *  - Pitfall 1: Confusing Conductor Surface Field E = σ/ε₀ with Sheet Field E = σ/2ε₀!
 *  - Pitfall 2: One-Way Shielding Fallacy -> Cavity shields from OUTSIDE fields, BUT internal charge inside cavity STILL affects outside!
 *  - Pitfall 3: Outer Shell Charge Fallacy -> Outer charge q₂ NEVER affects potential difference ΔV = V_A - V_B!
 *  - Subtopic 4 Master Checklist (Sec 39 – 51)
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

export default function P12Ch02Sec51({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic 4 Pitfalls & Master Checklist: Conductors, Cavities & Shielding", "Subtopic 4 Pitfalls & Master Checklist: Conductors, Cavities & Shielding")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: THREE MAJOR CONDUCTOR PITFALLS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("THE 3 CLASSIC CONDUCTOR PITFALLS", "THE 3 CLASSIC CONDUCTOR PITFALLS")}
          </T>
        </Fade>

        {/* Floating Pitfalls (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={80} size={15} fill={RED} weight={800} anchor="start">
            1. Field Formula Slip: Conductor surface E = σ/ε₀ (NOT σ/2ε₀)!
          </T>

          <T x={40} y={130} size={15} fill={AMBER_DARK} weight={800} anchor="start">
            2. One-Way Shielding Trap: Cavity shields from OUTSIDE charges, BUT internal cavity charge DOES induce outer field!
          </T>

          <T x={40} y={180} size={15} fill={GREEN} weight={800} anchor="start">
            3. Concentric Shell Trap: Potential difference ΔV depends ONLY on inner charge q₁!
          </T>

          <T x={40} y={230} size={15} fill={INK} weight={800} anchor="start">
            4. Potential Misconception: E = 0 inside does NOT mean V = 0! V = V_surface = Constant!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: MASTER FORMULA MATRIX */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 2} delay={dl(2, 0.2)} />
        <Fade on={beat >= 2} delay={dl(2, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CONDUCTOR & SPHERICAL CAPACITOR MATRIX", "CONDUCTOR & SPHERICAL CAPACITOR MATRIX")}
          </T>
        </Fade>

        {/* Floating Matrix Features (No Card Boxes) */}
        <Fade on={beat >= 2}>
          <T x={40} y={80} size={15} fill={GREEN} weight={800} anchor="start">
            • Isolated Sphere: C = 4π ε₀ R
          </T>

          <T x={40} y={130} size={15} fill={GREEN} weight={800} anchor="start">
            • Concentric Spherical Capacitor: C = 4π ε₀ [ (a b) / (b − a) ]
          </T>

          <T x={40} y={180} size={15} fill={GREEN} weight={800} anchor="start">
            • Shell Potential Difference: ΔV = k q₁ (1/a − 1/b)
          </T>

          <T x={40} y={230} size={15} fill={GREEN} weight={800} anchor="start">
            • Cavity Induction: q_cavity_wall = −q_inside
          </T>
        </Fade>
      </g>

      {/* MIDDLE BRIDGE LINE */}
      <g transform="translate(40, 340)">
        <Fade on={beat >= 4}>
          <line x1="20" y1="10" x2="1000" y2="10" stroke={INK} strokeWidth={2} />
          <T x={510} y={45} anchor="middle" size={18} fill={AMBER_DARK} weight={800}>
            FARADAY CAGE PRINCIPLE: Cavity is 100% shielded from external fields, but outer shell needs grounding to block internal fields!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: SUBTOPIC 4 MASTER CHECKLIST */}
      <g transform="translate(40, 465)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SUBTOPIC 4 MASTER CHECKLIST (SECTIONS 39 – 51)", "SUBTOPIC 4 MASTER CHECKLIST (SECTIONS 39 – 51)")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            ✓ E_in = 0   ✓ V = Const   ✓ E_surf = σ/ε₀   ✓ C = 4πε₀R   ✓ Spherical Capacitor   ✓ Shell ΔV!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Subtopic 4 Complete (Sec 39–51): Conductors, Cavities & Spherical Capacitors 100% Mastered! ✓",
            "★ Subtopic 4 Complete (Sec 39–51): Conductors, Cavities & Spherical Capacitors 100% Mastered! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
