"use client";

/**
 * B11 Ch02 · Section 23 — "Protista pitfalls and the covering-clue tool"
 * (tips — closes subtopic 2) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 8.53, 32.17, 51.63, 69.8, 88.15, 109.74, 120.32]):
 *  0 title
 *  1-5 five numbered pitfalls
 *  6 the tool intro: jump straight to the covering clue
 *  7 the 5-row lookup list fills in
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const PITFALLS: { cy: number; en: string; hi: string }[] = [
  { cy: 88, en: "Monera vs Protista: check the NUCLEUS, never the size", hi: "Monera vs Protista: NUCLEUS check karo, size nahi" },
  { cy: 118, en: "Euglena ≠ pure plant — it's the poster child for mixotrophy", hi: "Euglena ≠ pure plant — mixotrophy ka poster child hai" },
  { cy: 148, en: "wall ≠ same everywhere: diatom=silica (not CaCO₃!), dino=cellulose, euglenoid=none", hi: "wall ≠ same har jagah: diatom=silica (CaCO₃ nahi!), dino=cellulose, euglenoid=none" },
  { cy: 178, en: "don't scramble the 4 protozoan classes — anchor each to its organ", hi: "4 protozoan classes mat mix karo — har ek apne organ se anchor" },
  { cy: 208, en: "don't classify by nutrition alone — structure decides, not lifestyle", hi: "sirf nutrition se classify mat karo — structure decide karta, lifestyle nahi" },
];

const TOOL_ROWS: { y: number; en: string; hi: string }[] = [
  { y: 300, en: "silica → chrysophyte", hi: "silica → chrysophyte" },
  { y: 330, en: "cellulose plates → dinoflagellate", hi: "cellulose plates → dinoflagellate" },
  { y: 360, en: "pellicle / no wall → euglenoid", hi: "pellicle / no wall → euglenoid" },
  { y: 390, en: "crawling saprophyte → slime mould", hi: "crawling saprophyte → slime mould" },
  { y: 420, en: "animal-like feeder → protozoan", hi: "animal-like feeder → protozoan" },
];

export default function B11Ch02Sec23({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={50} size={16} fill={RED} script>
          {t("Protista pitfalls + the covering-clue tool", "Protista pitfalls + covering-clue tool")}
        </T>
      </Fade>

      {/* beats 1-5 — the five pitfalls */}
      {PITFALLS.map((p, i) => (
        <Fade key={p.cy} on={beat >= 1 + i} delay={dl(1 + i, 0.3)}>
          <circle cx={70} cy={p.cy} r={12} fill={RED} />
          <T x={70} y={p.cy + 4.5} size={12} fill={CREAM} weight={800}>
            {i + 1}
          </T>
          <T x={92} y={p.cy + 4} size={12} fill={INK} anchor="start" script>
            {t(p.en, p.hi)}
          </T>
        </Fade>
      ))}

      {/* beat 6 — the tool: jump straight to the covering clue */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={248} size={14} fill={GREEN} script>
          {t("don't read the options first — jump to the covering clue", "options pehle mat padho — covering clue pe jao")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.1)} d="M 250 268 H 830" stroke={MUTED} sw={1.6} dur={0.6} />
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <T x={540} y={285} size={12} fill={MUTED} weight={700}>
          {t("COVERING CLUE → GROUP", "COVERING CLUE → GROUP")}
        </T>
      </Fade>

      {/* beat 7 — the five-row lookup list */}
      {TOOL_ROWS.map((r, i) => (
        <Fade key={r.y} on={beat >= 7} delay={dl(7, 0.3 + i * 0.35)}>
          <T x={540} y={r.y} size={13} fill={AMBER_DARK} weight={700}>
            {t(r.en, r.hi)}
          </T>
        </Fade>
      ))}
    </svg>
  );
}
