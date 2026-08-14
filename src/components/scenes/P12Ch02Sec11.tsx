"use client";

/**
 * P12Ch02 · Section 11 — "JEE Main: axial potential of a charged ring"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,6,20,29,42,57,72,87,101]): 9 beats
 * Fixed: repositioned diagram, explanation text, and answer boxes to avoid overlaps.
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

export default function P12Ch02Sec11({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: axial potential of a charged ring", "JEE Main: charged ring ka axial potential")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Diagram — Ring with axial point (LEFT panel, compact) ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 5}>
        <ellipse cx={160} cy={180} rx={55} ry={20} fill="none" stroke={AMBER_DARK} strokeWidth={2.5} />
        <T x={160} y={210} size={11} fill={AMBER_DARK} weight={700}>Q, R</T>
        <circle cx={160} cy={180} r={2.5} fill={INK} />
        <T x={148} y={176} size={10} fill={INK} weight={700}>O</T>
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 160 180 h 180" stroke={INK} sw={1.2} dur={0.4} />
        <circle cx={310} cy={180} r={3.5} fill={RED} />
        <T x={318} y={175} size={12} fill={RED} weight={700} anchor="start">P</T>
        <T x={235} y={198} size={11} fill={INK} script>x</T>
      </Fade>

      {/* ── BEAT 2: Setup text ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={400} y={110} size={13} fill={INK} anchor="start" script>
          {t(
            "Find: V at centre O, V at P, and work to move charge between them",
            "Nikalo: centre O pe V, P pe V, aur charge move karne ka work"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: Badge 1 — Axial Ring Formula ── */}
      <Badge n={1} cx={400} cy={145} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={422} y={150} size={14} fill={RED} weight={700} anchor="start">AXIAL RING POTENTIAL</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(400, 163)">
          <rect x={0} y={5} width={520} height={48} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={260} y={36} anchor="middle" size={18} fill={INK} weight={800}>
            V_axis = (1/4πε₀) · Q / √(R² + x²)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 4: √ explanation ── */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={400} y={240} size={12} fill={MUTED} anchor="start" script>
          {t(
            "Every ring element at same distance √(R²+x²) from axial point!",
            "Ring ka har element axial point se √(R²+x²) door!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 5: Badge 2 — V at Centre & V at P ── */}
      <Badge n={2} cx={52} cy={280} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={285} size={14} fill={RED} weight={700} anchor="start">NUMERICAL VALUES</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 300)">
          <rect x={0} y={5} width={460} height={48} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={230} y={36} anchor="middle" size={16} fill={INK} weight={800}>
            V_O = kQ/R = 180 V  (at centre, x = 0)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: V at P ── */}
      <Fade on={beat >= 6} delay={dl(6, 0.5)} dim={beat >= 7}>
        <g transform="translate(540, 300)">
          <rect x={0} y={5} width={460} height={48} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={230} y={36} anchor="middle" size={16} fill={INK} weight={800}>
            V_P = kQ/√(R²+x²) = 360 V
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Badge 3 — Work ── */}
      <Badge n={3} cx={52} cy={390} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <g transform="translate(72, 405)">
          <rect x={0} y={0} width={560} height={70} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={280} y={24} anchor="middle" size={14} fill={MUTED} script>Work to move q from P to O</T>
          <T x={280} y={50} anchor="middle" size={20} fill={RED} weight={800}>
            W = q(V_O − V_P) = 5nC × (−180V) = −0.9 μJ
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Takeaway ── */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Ring formula V = kQ/√(R²+x²) + work-potential stitched together ✓",
            "★ Ring formula V = kQ/√(R²+x²) + work-potential stitched together ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
