"use client";

/**
 * P12Ch02 · Section 1 — "Electrostatic potential — the electrical altitude"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Electrostatic potential V is work done per unit positive charge in bringing it from infinity to point P without acceleration.
 *  - Analogy: Electrical altitude (high potential = high peak, low potential = valley).
 *  - Positive charges naturally flow from higher potential to lower potential.
 *  - Negative charges flow from lower potential to higher potential!
 *  - Formula: V = W_ext / q₀ = k Q / r  [Volts = J / C]
 *
 * Beats (en [0, 18, 31, 46, 62, 75, 86, 98, 108]):
 *  0 Title "electrostatic potential — the electrical altitude" + drawn underline
 *  1 Hook note: work done per unit test charge moving from infinity to a point!
 *  2 Badge 1 & Definition: V = W_ext / q₀  [J/C = Volt]
 *  3 Badge 2 & Point Charge Potential: V(r) = k Q / r  (Inverse distance 1/r!)
 *  4 Badge 3 & Natural Charge Flow: Positive charge flows down-hill (high V → low V)
 *  5 Negative charge flow: Negative charge flows up-hill (low V → high V)!
 *  6 Reference level at infinity: V(∞) = 0
 *  7 Grand Verdict: V = W_ext / q₀ = k Q / r  (Electrical Altitude in Volts)!
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw
        on={on}
        delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED}
        sw={2.2}
        dur={0.4}
      />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>
          {n}
        </T>
      </Fade>
    </g>
  );
}

export default function P12Ch02Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t(
            "electrostatic potential — the electrical altitude",
            "electrostatic potential — electrical altitude"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 180 70 C 440 66, 640 74, 900 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Hook Note ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={15} fill={MUTED} script anchor="start">
          {t(
            "work done per unit test charge moving from infinity to a point!",
            "test charge ko infinity se point tak laane me kiya gaya work!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Badge 1 & Definition ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("DEFINITION: POTENTIAL V = W_ext / q₀", "DEFINITION: POTENTIAL V = W_ext / q₀")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={20} fill={INK} weight={800}>
            V = W_ext / q₀  [Volt = J / C]
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Scalar quantity! Zero reference at infinity V(∞) = 0", "Scalar quantity! Infinity par reference zero V(∞) = 0")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 3: Badge 2 & Point Charge Potential ── */}
      <Badge n={3} cx={540} cy={165} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("POINT CHARGE POTENTIAL V = k Q / r", "POINT CHARGE POTENTIAL V = k Q / r")}
        </T>
      </Fade>

      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            V(r) = (1 / 4πε₀) (Q / r)
          </T>
          <T x={0} y={65} anchor="start" size={24} fill={RED} weight={800}>
            V ∝ 1 / r  (Inverse distance decay!)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Grand Verdict Chip ── */}
      <Fade on={beat >= 7}>
        <Chip
          x={100}
          y={536}
          w={880}
          h={44}
          fill={GREEN}
          textFill="#ffffff"
          size={18}
        >
          {t(
            "★ VERDICT: V = W_ext / q₀ = k Q / r  (Electrical Altitude in Volts)!",
            "★ VERDICT: V = W_ext / q₀ = k Q / r  (Electrical Altitude in Volts)!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
