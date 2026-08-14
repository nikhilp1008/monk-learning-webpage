"use client";

/**
 * P12Ch05 · Section 63 — "Derivation: magnetic shielding effectiveness of high-mu shell"
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

export default function P12Ch05Sec63({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: Shielding Factor S ∝ μ_r for High-μ Shells", "Derivation: High-μ Shells ke liye Shielding Factor S ∝ μ_r")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Internal Cavity Field Formula */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: INTERNAL CAVITY FIELD B_in APPROXIMATION", "STEP 1: INTERNAL CAVITY FIELD B_in APPROXIMATION")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B_in ≈ [ 9 / (2 μ_r (1 − a³/b³)) ] B_ext
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("For high μ_r (e.g. 10⁴ for Mu-metal), B_in vanishes inside cavity!", "High μ_r ke liye (e.g. 10⁴ Mu-metal), B_in cavity inside vanish ho jata hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Shielding Ratio S */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: SHIELDING FACTOR RATIO S = B_ext / B_in", "STEP 2: SHIELDING FACTOR RATIO S = B_ext / B_in")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={18} fill={GREEN} weight={800}>
            S = B_ext / B_in ≈ (2 / 9) μ_r (1 − a³/b³)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Shielding factor grows LINEARLY with relative permeability μ_r!", "Shielding factor relative permeability μ_r ke saath LINEARLY badhta hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Master Shielding Property */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("PRACTICAL MU-METAL SHIELDING VALUE", "PRACTICAL MU-METAL SHIELDING VALUE")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            For Mu-metal (μ_r = 100,000), external stray fields are attenuated by a factor of 10,000+!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived shielding factor S = (2/9) μ_r (1 − a³/b³) proves high-μ shells attenuate external fields by 10,000×! ✓",
            "★ Derived shielding factor S = (2/9) μ_r (1 − a³/b³) prove karta hai ki high-μ shells external fields ko 10,000× attenuate karte hain! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
