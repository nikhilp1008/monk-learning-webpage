"use client";

/**
 * P12Ch05 · Section 22 — "Derivation: why a tilted dip circle lies to you"
 * Subtopic: Earth's Magnetism
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

export default function P12Ch05Sec22({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: Two Apparent Dips to Find True Dip", "Derivation: Do Apparent Dips se True Dip nikalna")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Two Perpendicular Planes */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: APPARENT DIPS IN PERPENDICULAR PLANES", "STEP 1: PERPENDICULAR PLANES MEIN APPARENT DIPS")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            cot δ₁ = cot δ cos α  |  cot δ₂ = cot δ sin α
          </T>
          <T x={225} y={52} anchor="middle" size={13} fill={AMBER_DARK} weight={700}>
            {t("Planes are at angle α and (90° − α) to magnetic meridian!", "Planes magnetic meridian se α aur (90° − α) angle par hain!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Squaring and Adding */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: SQUARE AND ADD BOTH EQUATIONS", "STEP 2: DONO EQUATIONS KO SQUARE AUR ADD KAREIN")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            cot² δ₁ + cot² δ₂ = cot² δ (cos² α + sin² α)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Since cos² α + sin² α = 1, angle α drops out completely!", "cos² α + sin² α = 1 hone se angle α poori tarah hatt jaata hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Master Derived Relation */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("MASTER TWO-APPARENT-DIPS FORMULA", "MASTER TWO-APPARENT-DIPS FORMULA")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={GREEN} weight={800}>
            cot² δ = cot² δ₁ + cot² δ₂
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Master Formula: cot² δ = cot² δ₁ + cot² δ₂ finds true dip δ without knowing meridian angle α! ✓",
            "★ Master Formula: cot² δ = cot² δ₁ + cot² δ₂ se bina α jaane true dip δ nikal aata hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
