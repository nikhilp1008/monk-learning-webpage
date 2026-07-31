"use client";

/**
 * P12Ch02 · Section 40 — "Charge on the surface, and one big equipotential blob"
 * Beats (en [0,7,18,32,44,56,66]): 7 beats
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

export default function P12Ch02Sec40({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("all excess charge sits on the surface", "saara excess charge surface pe hota hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Blob with Gaussian surface */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 3}>
        <path d="M 120 220 Q 150 120 220 160 T 320 220 Q 300 320 200 280 T 120 220 Z" fill="#e2e8f0" stroke={INK} strokeWidth={2} />
        <T x={220} y={220} size={14} fill={INK} weight={700}>CONDUCTOR</T>
        {/* Gaussian surface inside */}
        <Fade on={beat >= 1} delay={dl(1, 1)}>
          <path d="M 130 220 Q 160 135 220 170 T 305 220 Q 285 305 200 270 T 130 220 Z" fill="none" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="6 4" />
          <T x={220} y={245} size={12} fill={AMBER_DARK} weight={700}>Gaussian Surface</T>
        </Fade>
      </Fade>

      {/* BEAT 2: Gauss's Law logic */}
      <Badge n={1} cx={400} cy={145} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={422} y={150} size={14} fill={RED} weight={700} anchor="start">GAUSS'S LAW INSIDE</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(400, 165)">
          <rect x={0} y={5} width={560} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={280} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            E = 0 inside  →  Flux Φ = 0  →  q_enclosed = 0
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Conclusion on charge */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={400} y={260} size={13} fill={RED} anchor="start" script>
          {t(
            "Shrink surface down to nothing → NO charge anywhere inside!",
            "Surface choti karte jao → andar KAHIN BHI charge nahi!"
          )}
        </T>
        <T x={400} y={285} size={13} fill={INK} anchor="start" script>
          {t(
            "The only place left for excess charge is the OUTER SURFACE.",
            "Excess charge ke liye sirf ek jagah bachi hai: OUTER SURFACE."
          )}
        </T>
      </Fade>

      {/* BEAT 4: V logic */}
      <Badge n={2} cx={52} cy={355} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={360} size={14} fill={RED} weight={700} anchor="start">EQUIPOTENTIAL BLOB</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 375)">
          <rect x={0} y={5} width={900} height={45} rx={6} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={450} y={34} anchor="middle" size={14} fill={INK} weight={800}>
            {t(
              "E = 0 everywhere inside → no 'downhill' → moving charge costs ZERO work (W = 0).",
              "Andar E = 0 → koi 'slope' nahi → charge move karne mein ZERO work lagta hai (W = 0)."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Equipotential */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={450} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Since ΔV = −W/q = 0, every point inside and on surface is at SAME POTENTIAL V!",
            "Kyunki ΔV = −W/q = 0, andar aur surface ka har point SAME POTENTIAL V pe hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: The rule */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ A charged conductor is one big equipotential blob. V_inside = V_surface! ✓",
            "★ Charged conductor ek bada equipotential blob hota hai. V_inside = V_surface! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
