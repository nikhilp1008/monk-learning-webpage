"use client";

/**
 * P12Ch02 · Section 2 — "Slow carriers, fast signal"
 * Beats (en [0,5,15,23,35,47,60,73]): 8 beats
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

export default function P12Ch03Sec2({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Slow carriers, fast signal", "Slow carriers, fast signal")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 380 70 C 440 66, 640 74, 700 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Slow speed of electrons */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">DRIFT SPEED IS EXTREMELY SLOW</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            v_d ≈ 10⁻⁴ m/s = 0.1 mm/s (Slower than a snail!)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: The paradox */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)} dim={beat >= 4}>
        <T x={60} y={235} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Paradox: If electrons crawl at 0.1 mm/s, why does bulb light instantly?",
            "Sawaal: Agar electrons 0.1 mm/s pe reengte hain, toh bulb turant kyun jalta hai?"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Pipe Analogy Diagram */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)} dim={beat >= 7}>
        <g transform="translate(140, 270)">
          {/* Water Pipe Filled with Marbles */}
          <rect x={0} y={0} width={800} height={50} rx={8} fill="#f1f5f9" stroke={INK} strokeWidth={2} />
          <T x={400} y={-10} size={13} fill={INK} weight={700} anchor="middle">
            {t("Water Pipe Full of Marbles (Or wire full of free electrons)", "Water Pipe Full of Marbles (Puri wire mein pehle se electrons hain)")}
          </T>

          {/* Marbles inside pipe */}
          {[40, 110, 180, 250, 320, 390, 460, 530, 600, 670, 750].map((x, idx) => (
            <circle key={idx} cx={x} cy={25} r={14} fill={idx === 0 ? RED : (idx === 10 ? GREEN : "#3b82f6")} />
          ))}

          {/* Push arrow on left */}
          <Draw on={beat >= 5} delay={dl(5, 0.4)} d="M -30 25 L 20 25" stroke={RED} sw={3} />
          <T x={-20} y={-5} size={13} fill={RED} weight={800} anchor="middle">Push</T>

          {/* Pop arrow on right */}
          <Draw on={beat >= 5} delay={dl(5, 0.4)} d="M 780 25 L 830 25" stroke={GREEN} sw={3} />
          <T x={820} y={-5} size={13} fill={GREEN} weight={800} anchor="middle">Instant Output!</T>
        </g>
      </Fade>

      {/* BEAT 5: Electric field signal speed */}
      <Badge n={2} cx={52} cy={370} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={375} size={14} fill={RED} weight={700} anchor="start">ELECTRIC FIELD SIGNAL SPEED</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 390)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            v_signal ≈ c ≈ 3 × 10⁸ m/s (Speed of Light)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Filament local movement */}
      <Badge n={3} cx={540} cy={370} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={375} size={14} fill={RED} weight={700} anchor="start">EVERY ELECTRON DRIFTS TOGETHER</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(540, 390)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Electrons already inside bulb filament move immediately!",
              "Bulb ke andar ke electrons turant hi chalne lagte hain!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Signal is fast (~c), carriers are slow (~10⁻⁴ m/s). Bulb glows instantly! ✓",
            "★ Signal tez hai (~c), carriers dheeme (~10⁻⁴ m/s). Bulb turant jalta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
