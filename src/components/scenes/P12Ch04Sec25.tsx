"use client";

/**
 * P12Ch04 · Section 25 — "Common Pitfalls and Pro-Tips"
 * Beats (en [0,1,2,3,4,5,6,7,8]): 9 beats
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

export default function P12Ch04Sec25({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Common Pitfalls & Pro-Tips for Forces & Galvanometer", "Common Pitfalls & Pro-Tips for Forces & Galvanometer")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 2 & 3: Speed, Parallel & Angle Traps */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">SPEED, PARALLEL & ANGLE TRAPS</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Magnetic force NEVER changes speed or KE!
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (v || B ⇒ F = 0; Torque uses angle to NORMAL θ = 90° − α!)
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6, 7: Galvanometer Sine & Ratio Pro-Tip */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">GALVANOMETER SINE & CONSTANT CONTEXT PRO-TIP</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 8}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Radial field makes sin θ = 1 permanently!
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            Same Voltage ⇒ r ∝ √(m/q) | Same Momentum ⇒ r ∝ 1/q!
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Master Summary */}
      <Badge n={3} cx={52} cy={270} on={beat >= 8} delay={dl(8, 0.4)} />
      <Fade on={beat >= 8} delay={dl(8, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">THE SINGLE UNDERLYING LAW</T>
      </Fade>
      <Fade on={beat >= 8}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            All results (cyclotron, wire force, loop torque, galvanometer) flow from F = q(v × B)!
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Check constant context (voltage vs speed), use normal angle, and remember like currents attract! ✓",
            "★ Constant context check karein (voltage vs speed), normal angle lein, aur like currents attract yaad rakhein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
