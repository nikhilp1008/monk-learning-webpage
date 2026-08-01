"use client";

/**
 * P12Ch05 · Section 62 — "Derivation: efficiency loss in transformer cores per cycle"
 * Subtopic: Electromagnets, Retentivity, Coercivity & Chapter Close
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

export default function P12Ch05Sec62({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: Transformer Core Losses (Hysteresis + Eddy)", "Derivation: Transformer Core Losses (Hysteresis + Eddy)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Hysteresis Loss P_h */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("HYSTERESIS POWER LOSS: P_h = Area × V × f", "HYSTERESIS POWER LOSS: P_h = Area × V × f")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            P_h = (A_loop) × Volume × frequency
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("Linear with AC frequency f; minimized by soft iron narrow loop!", "AC frequency f ke linear; soft iron narrow loop se minimize hota hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Eddy Current Loss P_e */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("EDDY CURRENT POWER LOSS: P_e ∝ t² f² B_max²", "EDDY CURRENT POWER LOSS: P_e ∝ t² f² B_max²")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            P_e = K_e B_max² f² t² V
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Proportional to square of sheet thickness t²!", "Sheet thickness t² ke square ke proportional hota hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Total Transformer Core Loss Equation */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("TOTAL COMBINED TRANSFORMER CORE LOSS", "TOTAL COMBINED TRANSFORMER CORE LOSS")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={GREEN} weight={800}>
            P_total = [ (A_loop · f) + (K_e B_max² f² t²) ] × Volume V
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived P_total = [A_loop f + K_e B² f² t²] V shows how soft iron reduces A_loop and laminations cut t²! ✓",
            "★ Derived P_total = [A_loop f + K_e B² f² t²] V dikhata hai ki soft iron A_loop kam karta hai aur laminations t² cut karte hain! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
