"use client";

/**
 * P12Ch02 · Section 23 — "JEE Main: released charge, conservation of energy"
 * Beats (en [0,6,19,29,40,53,66,76]): 8 beats
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

export default function P12Ch02Sec23({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: released charge, energy conservation", "JEE Main: charge chhoda, energy conservation")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 180 70 C 400 66, 660 74, 900 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={28} size={13} fill={INK} anchor="start" script>
            {t(
              "q₁ = +5μC (fixed), q₂ = +2μC (m = 5g), initially r = 0.10m, released from rest.",
              "q₁ = +5μC (fixed), q₂ = +2μC (m = 5g), shuru mein r = 0.10m, rest se chhoda."
            )}
          </T>
          <T x={20} y={50} size={13} fill={INK} anchor="start" script>
            {t("Find speed of q₂ at infinity.", "q₂ ki speed infinity pe nikalo.")}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Physical picture */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={178} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Like charges repel → q₂ accelerates outward → U converts to K!",
            "Like charges repel → q₂ bahar jaata → U se K banta hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Conservation equation */}
      <Badge n={1} cx={52} cy={215} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={220} size={14} fill={RED} weight={700} anchor="start">ENERGY CONSERVATION</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(60, 235)">
          <rect x={0} y={5} width={400} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={200} y={38} anchor="middle" size={22} fill={RED} weight={800}>
            U_i + K_i = U_f + K_f
          </T>
        </g>
      </Fade>

      {/* BEAT 4: U_i */}
      <Badge n={2} cx={52} cy={320} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={325} size={14} fill={RED} weight={700} anchor="start">INITIAL PE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 340)">
          <rect x={0} y={5} width={560} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={280} y={38} anchor="middle" size={17} fill={INK} weight={800}>
            U_i = (9×10⁹)(5×10⁻⁶)(2×10⁻⁶) / 0.10 = 0.90 J
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Simplification */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={420} size={13} fill={MUTED} anchor="start" script>
          {t(
            "At ∞: U_f = 0. From rest: K_i = 0. So K_f = U_i = 0.90 J",
            "∞ pe: U_f = 0. Rest se: K_i = 0. So K_f = U_i = 0.90 J"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Final speed */}
      <Badge n={3} cx={52} cy={458} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <g transform="translate(72, 443)">
          <rect x={0} y={0} width={520} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={260} y={35} anchor="middle" size={22} fill={RED} weight={800}>
            v = √(2K/m) = √(2×0.90/0.005) ≈ 19 m/s
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Takeaway */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Skip forces! U = kq₁q₂/r + energy conservation → speed directly ✓",
            "★ Forces chhodo! U = kq₁q₂/r + energy conservation → sidha speed ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
