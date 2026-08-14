"use client";

/**
 * P12Ch02 · Section 1 — "Random motion and the birth of drift"
 * Beats (en [0,8,20,35,50,63,64,65]): 8 beats
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

export default function P12Ch03Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Random motion and the birth of drift", "Random motion aur drift velocity ki shuruat")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 330 70 C 440 66, 640 74, 750 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* Wire conductor illustration */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 7}>
        <g transform="translate(100, 120)">
          {/* Conductor body */}
          <rect x={0} y={0} width={400} height={180} rx={12} fill="#f8fafc" stroke={INK} strokeWidth={2} />
          <ellipse cx={0} cy={90} rx={15} ry={90} fill="#e2e8f0" stroke={INK} strokeWidth={2} />
          <ellipse cx={400} cy={90} rx={15} ry={90} fill="#f1f5f9" stroke={INK} strokeWidth={2} />

          {/* Fixed Lattice Ions */}
          {[
            { x: 80, y: 45 }, { x: 200, y: 45 }, { x: 320, y: 45 },
            { x: 80, y: 135 }, { x: 200, y: 135 }, { x: 320, y: 135 },
          ].map((ion, idx) => (
            <g key={idx}>
              <circle cx={ion.x} cy={ion.y} r={14} fill="#fee2e2" stroke={RED} strokeWidth={1.5} />
              <T x={ion.x} y={ion.y + 4} size={12} fill={RED} weight={800}>+</T>
            </g>
          ))}

          {/* Field OFF (Beats 2, 3, 4): Random Zig-Zag Path */}
          <Fade on={beat >= 2 && beat < 5} delay={dl(2, 0.3)}>
            {/* Electron starting at (140, 90), colliding randomly */}
            <path d="M 140 90 L 180 55 L 210 120 L 160 140 L 140 90" fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 3" />
            <circle cx={140} cy={90} r={6} fill="#3b82f6" />
            <T x={140} y={75} size={12} fill="#3b82f6" weight={700}>e⁻</T>
            {/* Random velocity vectors */}
            <Draw on={beat >= 2} delay={dl(2, 0.5)} d="M 140 90 L 170 65" stroke="#3b82f6" sw={2} />
            <T x={250} y={160} size={13} fill="#3b82f6" weight={700}>
              {t("Thermal speed ~ 10⁵ m/s (Random)", "Thermal speed ~ 10⁵ m/s (Random)")}
            </T>
          </Fade>

          {/* Field ON (Beats 5, 6): Tilted Path with Net Drift */}
          <Fade on={beat >= 5} delay={dl(5, 0.3)}>
            {/* E-field arrow */}
            <Draw on={beat >= 5} delay={dl(5, 0.5)} d="M 50 -20 L 350 -20" stroke={RED} sw={2.5} />
            <path d="M 340 -26 L 355 -20 L 340 -14" fill={RED} />
            <T x={200} y={-30} size={14} fill={RED} weight={800}>Electric Field E →</T>

            {/* Force on electron */}
            <T x={200} y={-8} size={12} fill={AMBER_DARK} weight={700}>Force F = -eE (← Leftward)</T>

            {/* Tilted Path towards left */}
            <path d="M 140 90 L 175 57 L 200 123 L 145 142 L 115 92" fill="none" stroke={GREEN} strokeWidth={2.2} />
            <circle cx={115} cy={92} r={6} fill={GREEN} />
            <Draw on={beat >= 6} delay={dl(6, 0.4)} d="M 140 90 L 115 92" stroke={RED} sw={3} />
            <T x={125} y={115} size={13} fill={RED} weight={800}>Net Drift v_d ←</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Thermal randomness */}
      <Badge n={1} cx={580} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={602} y={145} size={14} fill={RED} weight={700} anchor="start">THERMAL CHAOS (FIELD OFF)</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(580, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Electrons move at ~10⁵ m/s, but in random directions.",
              "Electrons ~10⁵ m/s se randomly har taraf bhaagte hain."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Zero net current */}
      <Badge n={2} cx={580} cy={240} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={602} y={245} size={14} fill={RED} weight={700} anchor="start">AVERAGE DISPLACEMENT = ZERO</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(580, 260)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Equal charges cross left & right: Net Current I = 0.",
              "Dono taraf barabar charge jata hai: Net Current I = 0."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Field ON & Force */}
      <Badge n={3} cx={580} cy={340} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={602} y={345} size={14} fill={RED} weight={700} anchor="start">ELECTRIC FIELD APPLIED</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(580, 360)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Field E exerts force F = -eE opposite to field direction.",
              "Field E, field ke opposite direction mein force F = -eE lagata hai."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Definition of Drift Velocity */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Drift velocity (v_d): Small net average velocity superimposed on thermal chaos! ✓",
            "★ Drift velocity (v_d): Thermal chaos ke upar choti si net average velocity! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
