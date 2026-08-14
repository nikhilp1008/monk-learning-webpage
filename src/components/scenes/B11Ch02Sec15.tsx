"use client";

/**
 * B11 Ch02 · Section 15 — "Three lifestyles inside one kingdom"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 14.42, 25.0, 37.72, 52.65, 62.98, 76.37, 88.92]):
 *  0 title
 *  1 ROOT question + 3 branches fan out
 *  2 branch 1 groups: chrysophytes, dinoflagellates, euglenoids
 *  3 branch 2 groups: the four protozoan classes
 *  4 branch 3 groups: slime moulds
 *  5-7 caption slot: why the scaffold matters → 2-step exam logic → fix lifestyle first
 *
 * Layout plan:
 *  b0 | title (script19 red)          | T mid | x540  y54
 *  b1 | ROOT box (ink)                | Draw  | x390..690  y100..148
 *  b1 | 3 fan arrows                  | Draw  | (540,148)→(175/540/905,210)
 *  b1 | 3 branch boxes (ink)          | Chip  | y210 h50  x45(w260)/400(w280)/775(w260)
 *  b2 | subgroup line under branch 1  | T mid | x175  y280
 *  b3 | subgroup line under branch 2  | T mid | x540  y280
 *  b4 | subgroup line under branch 3  | T mid | x905  y280
 *  b5-7| caption slot (script14/15)   | T mid | x540  y360
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, MUTED, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec15({ currentTime, reveals, language }: SceneProps) {
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
          {t("how a protist makes a living", "protist apni living kaise banata hai")}
        </T>
      </Fade>

      {/* beat 1 — the root question, fanning into three branches */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 390 100 h 300 v 48 h -300 z" stroke={INK} sw={2.4} dur={0.8} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={540} y={129} size={15} fill={INK} weight={700}>
          {t("how does it make a living?", "living kaise banata hai?")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.6)} d={arrowD(540, 148, 175, 205)} stroke={INK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 1.9)} d={arrowD(540, 148, 540, 205)} stroke={INK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 2.2)} d={arrowD(540, 148, 905, 205)} stroke={INK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 2.6)}>
        <Chip x={45} y={210} w={260} h={50} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("photosynthesizes → algal protists", "photosynthesize karta → algal protists")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 3)}>
        <Chip x={400} y={210} w={280} h={50} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("hunts or parasitizes → protozoa", "shikar/parasite karta → protozoa")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 3.4)}>
        <Chip x={775} y={210} w={260} h={50} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("absorbs decay → fungus-like", "decay absorb karta → fungus-like")}
        </Chip>
      </Fade>

      {/* beat 2 — branch 1 groups */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={175} y={285} size={11} fill={MUTED} script>
          {t("chrysophytes · dinoflagellates · euglenoids", "chrysophytes · dinoflagellates · euglenoids")}
        </T>
      </Fade>

      {/* beat 3 — branch 2 groups */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={285} size={12} fill={MUTED} script>
          {t("the four protozoan classes", "chaar protozoan classes")}
        </T>
      </Fade>

      {/* beat 4 — branch 3 groups */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={905} y={285} size={12} fill={MUTED} script>
          {t("slime moulds", "slime moulds")}
        </T>
      </Fade>

      {/* beats 5-7 — the pay-off, single replaced caption slot */}
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 0.4)}>
        <T x={540} y={360} size={15} fill={GREEN} script>
          {t(
            "the single most useful mental scaffold for this sub-topic",
            "is sub-topic ka sabse useful mental scaffold"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 0.4)}>
        <T x={540} y={360} size={14} fill={INK} script>
          {t(
            "every question asks: which lifestyle? then which group?",
            "har question poochta hai: konsa lifestyle? phir konsa group?"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={360} size={15} fill={GREEN} script>
          {t(
            "fix the lifestyle first — photosynthesize, hunt, or absorb?",
            "pehle lifestyle fix karo — photosynthesize, hunt, ya absorb?"
          )}
        </T>
      </Fade>
    </svg>
  );
}
