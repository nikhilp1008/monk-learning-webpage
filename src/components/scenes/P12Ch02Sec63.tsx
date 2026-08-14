"use client";

/**
 * P12Ch02 · Section 63 — "JEE Advanced: common potential and energy lost"
 * Beats (en [0,5,16,26,39,49,59,68]): 8 beats
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

export default function P12Ch02Sec63({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: reconnection, common potential, energy lost", "JEE Advanced: reconnection, common potential, energy lost")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "4 µF capacitor (100V) connected + to + with a 6 µF capacitor (50V).",
            "4 µF capacitor (100V) ko 6 µF capacitor (50V) ke saath + se + joda gaya."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Common potential */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">COMMON POTENTIAL</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            V_c = [ (4)(100) + (6)(50) ] / (4 + 6)
          </T>
          <T x={225} y={55} anchor="middle" size={16} fill={INK} weight={800}>
            = (400 + 300) / 10 = 70 V
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Weighted average logic */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={260} size={13} fill={AMBER_DARK} anchor="start" script>
          {t("70V sits exactly between 50V and 100V,", "70V exactly 50V aur 100V ke beech mein hai,")}
        </T>
        <T x={60} y={280} size={13} fill={AMBER_DARK} anchor="start" script>
          {t("weighted by their capacitances.", "unki capacitances ke weight ke hisaab se.")}
        </T>
      </Fade>

      {/* BEAT 4: Final charges */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">FINAL CHARGES</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            Q₁' = (4)(70) = 280 µC
          </T>
          <T x={240} y={55} anchor="middle" size={16} fill={INK} weight={800}>
            Q₂' = (6)(70) = 420 µC
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Check total charge */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={260} size={13} fill={MUTED} anchor="start" script>
          {t("Check: 280 + 420 = 700 µC.", "Check: 280 + 420 = 700 µC.")}
        </T>
        <T x={540} y={280} size={13} fill={MUTED} anchor="start" script>
          {t("Matches initial (400+300 = 700).", "Yeh initial (400+300 = 700) se match karta hai.")}
        </T>
      </Fade>

      {/* BEAT 6: Energy lost */}
      <Badge n={3} cx={52} cy={340} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">ENERGY LOST</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            ΔU = ½ × [ (4×6)/10 ] × 10⁻⁶ × (50)² = 3 × 10⁻³ J
          </T>
        </g>
      </Fade>

      {/* BEAT 7: 3mJ heat */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ 3 mJ went to heat: charge is conserved, energy is not. ✓",
            "★ 3 mJ heat mein gaya: charge conserve rehta hai, energy nahi. ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
