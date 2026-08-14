"use client";

/**
 * B11 Ch02 · Section 14 — "The group table examiners love"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.37, 32.77, 52.39, 64.0, 75.26, 89.0, 101.55]):
 *  0 title
 *  1 grid + headers (Wall/covering and Stored food highlighted amber)
 *  2 wall column fills for Chrysophytes/Dinoflagellates/Euglenoids
 *  3 wall column fills for Protozoans/Slime moulds
 *  4 caption: sneaky — sometimes a stored-food clue instead
 *  5 stored-food column fills for the 3 plant-like ones
 *  6 lifestyle/flagella/example columns fill for all 5 — table complete
 *  7 closing: learn the columns, not just the names
 *
 * Layout plan: header col x60..210 w150, 5 data cols w162 each
 * (210..372/372..534/534..696/696..858/858..1020), header row y140..176,
 * 5 data rows h44 (176..396).
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const COL_X = [291, 453, 615, 777, 939];
const COL_DIVS = [372, 534, 696, 858];
const ROW_Y = [198, 242, 286, 330, 374];
const ROW_DIVS = [220, 264, 308, 352];
const GROUPS = ["Chrysophytes", "Dinoflagellates", "Euglenoids", "Slime moulds", "Protozoans"];
const HEADERS = ["Lifestyle", "Wall/covering", "Flagella", "Stored food", "Example"];

// [lifestyle, wall, flagella, food, example] per group
const CELLS: string[][] = [
  ["photosynthetic", "silica", "2, unequal", "chrysolaminarin", "diatoms"],
  ["marine", "cellulose plates", "2 (transverse)", "starch", "Gonyaulax"],
  ["freshwater", "no wall—pellicle", "2 (long+short)", "paramylon", "Euglena"],
  ["saprophytic", "no wall—naked", "none", "—", "Physarum"],
  ["heterotrophic", "no wall—naked", "varies", "—", "Amoeba"],
];

function gridPath(): string {
  let d = `M 60 140 H 1020 V 396 H 60 Z`;
  d += ` M 210 140 V 396`;
  for (const x of COL_DIVS) d += ` M ${x} 140 V 396`;
  d += ` M 60 176 H 1020`;
  for (const y of ROW_DIVS) d += ` M 60 ${y} H 1020`;
  return d;
}

export default function B11Ch02Sec14({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={54} size={19} fill={RED} script>
          {t("the table examiners love", "table jo examiners pyaar karte hain")}
        </T>
      </Fade>

      {/* beat 1 — the grid + headers */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={gridPath()} stroke={INK} sw={2} dur={1.2} />
      {GROUPS.map((g, i) => (
        <Fade key={g} on={beat >= 1} delay={dl(1, 1.4 + i * 0.15)}>
          <T x={70} y={ROW_Y[i] + 5} size={12} fill={INK} anchor="start" weight={700}>
            {g}
          </T>
        </Fade>
      ))}
      {HEADERS.map((h, i) => (
        <Fade key={h} on={beat >= 1} delay={dl(1, 2.2 + i * 0.15)}>
          <T x={COL_X[i]} y={163} size={13} fill={i === 1 || i === 3 ? AMBER_DARK : INK} weight={700}>
            {h}
          </T>
        </Fade>
      ))}

      {/* beat 2 — wall column: the first three plant-like groups */}
      {[0, 1, 2].map((r, i) => (
        <Fade key={`w${r}`} on={beat >= 2} delay={dl(2, 0.3 + i * 0.3)}>
          <T x={COL_X[1]} y={ROW_Y[r] + 5} size={11} fill={AMBER_DARK} weight={700}>
            {CELLS[r][1]}
          </T>
        </Fade>
      ))}

      {/* beat 3 — wall column: protozoans and slime moulds */}
      {[4, 3].map((r, i) => (
        <Fade key={`w${r}`} on={beat >= 3} delay={dl(3, 0.3 + i * 0.3)}>
          <T x={COL_X[1]} y={ROW_Y[r] + 5} size={11} fill={AMBER_DARK} weight={700}>
            {CELLS[r][1]}
          </T>
        </Fade>
      ))}

      {/* beat 4 — sneaky: sometimes it's stored food instead */}
      <Fade on={beat >= 2} dim={beat >= 4} delay={dl(2, 1.4)}>
        <T x={540} y={420} size={13} fill={RED} script>
          {t("wall material = the giveaway", "wall material = giveaway hai")}
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6} delay={dl(4, 0.3)}>
        <T x={540} y={420} size={13} fill={RED} script>
          {t("sneaky? sometimes it's a stored-food clue instead", "sneaky? kabhi stored-food clue milta hai")}
        </T>
      </Fade>

      {/* beat 5 — stored-food column: the three plant-like ones */}
      {[0, 2, 1].map((r, i) => (
        <Fade key={`f${r}`} on={beat >= 5} delay={dl(5, 0.3 + i * 0.4)}>
          <T x={COL_X[3]} y={ROW_Y[r] + 5} size={11} fill={AMBER_DARK} weight={700}>
            {CELLS[r][3]}
          </T>
        </Fade>
      ))}

      {/* beat 6 — the rest of the table completes */}
      {GROUPS.map((g, r) => (
        <React.Fragment key={`rest${r}`}>
          <Fade on={beat >= 6} delay={dl(6, 0.2 + r * 0.2)}>
            <T x={COL_X[0]} y={ROW_Y[r] + 5} size={11} fill={INK}>
              {CELLS[r][0]}
            </T>
          </Fade>
          <Fade on={beat >= 6} delay={dl(6, 0.3 + r * 0.2)}>
            <T x={COL_X[2]} y={ROW_Y[r] + 5} size={11} fill={INK}>
              {CELLS[r][2]}
            </T>
          </Fade>
          <Fade on={beat >= 6} delay={dl(6, 0.4 + r * 0.2)}>
            <T x={COL_X[4]} y={ROW_Y[r] + 5} size={11} fill={INK} script>
              {CELLS[r][4]}
            </T>
          </Fade>
        </React.Fragment>
      ))}
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 1.6)}>
        <T x={540} y={420} size={14} fill={GREEN} script>
          {t("two columns, most of the marks", "do columns, zyada tar marks")}
        </T>
      </Fade>

      {/* beat 7 — closing: features, not names */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={420} size={14} fill={GREEN} script>
          {t(
            "learn the columns, not just names — features don't get swapped",
            "columns yaad rakho, sirf naam nahi — features swap nahi hote"
          )}
        </T>
      </Fade>
    </svg>
  );
}
