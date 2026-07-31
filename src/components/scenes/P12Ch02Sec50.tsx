"use client";

/**
 * P12Ch02 · Section 50 — "JEE Advanced: deriving the spherical capacitor"
 * Beats (en [0,6,19,30,41,57,69,83]): 8 beats
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

export default function P12Ch02Sec50({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: deriving the spherical capacitor", "JEE Advanced: deriving the spherical capacitor")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Spherical capacitor cross-section */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(180, 200)">
          {/* Outer shell b */}
          <circle cx={0} cy={0} r={100} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <T x={50} y={-110} size={14} fill="#3b82f6" weight={700}>−Q</T>
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 0 L 70 70" stroke={INK} sw={1.5} />
          <T x={80} y={80} size={12} fill={INK} weight={700}>b = 0.10 m</T>
          
          {/* Inner shell a */}
          <circle cx={0} cy={0} r={60} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={20} y={-70} size={14} fill={RED} weight={700}>+Q</T>
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 0 L -60 0" stroke={INK} sw={1.5} />
          <T x={-30} y={-10} size={12} fill={INK} weight={700}>a = 0.08 m</T>

          {/* E field between a and b */}
          <Fade on={beat >= 2} delay={dl(2, 0.5)}>
            <Draw on={beat >= 2} delay={dl(2, 0.8)} d="M 60 0 L 100 0" stroke={RED} sw={1.5} />
            <polygon points="100,0 92,-4 92,4" fill={RED} />
            <Draw on={beat >= 2} delay={dl(2, 0.8)} d="M 0 60 L 0 100" stroke={RED} sw={1.5} />
            <polygon points="0,100 -4,92 4,92" fill={RED} />
            <Draw on={beat >= 2} delay={dl(2, 0.8)} d="M -42 42 L -70 70" stroke={RED} sw={1.5} />
            <polygon points="-70,70 -60,67 -63,60" fill={RED} />
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Field E between shells */}
      <Badge n={1} cx={450} cy={110} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={472} y={115} size={14} fill={RED} weight={700} anchor="start">FIELD IN THE GAP (a &lt; r &lt; b)</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(450, 130)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E = Q / (4πε₀ r²)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Outer shell doesn't contribute */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={450} y={205} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Outer shell gives NO field inside its cavity (by Gauss's Law). Only inner shell matters!",
            "Outer shell cavity ke andar KOI field nahi deta. Sirf inner shell matter karta hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Integrating to find V */}
      <Badge n={2} cx={450} cy={235} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={472} y={240} size={14} fill={RED} weight={700} anchor="start">POTENTIAL DIFFERENCE V</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(450, 255)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = ∫ E dr = (Q / 4πε₀) [1/a − 1/b]
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Capacitance formula */}
      <Badge n={3} cx={52} cy={350} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">CAPACITANCE C = Q/V</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = 4πε₀ · [ (ab) / (b − a) ]
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Evaluating the number */}
      <Badge n={4} cx={520} cy={350} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={542} y={355} size={14} fill={RED} weight={700} anchor="start">NUMERICAL VALUE</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(520, 370)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = (0.08 × 0.10) / [(9×10⁹)(0.02)] ≈ 44 pF
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Small gap note */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Notice how a small gap (b−a) produces a LARGE capacitance! ✓",
            "★ Dekho kaise chota gap (b−a) bada capacitance banata hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
