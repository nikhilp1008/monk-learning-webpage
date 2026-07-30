/**
 * Scene registry — hand-choreographed board scenes, keyed by
 * `${chapter_id}:${section position}`. Sections with a registered scene
 * play full motion; everything else falls back to the premium board events.
 */

import type React from "react";
import type { SceneProps } from "./kit";
import Ch01Sec1 from "./Ch01Sec1";
import Ch01Sec2 from "./Ch01Sec2";
import Ch01Sec3 from "./Ch01Sec3";
import Ch01Sec4 from "./Ch01Sec4";
import Ch01Sec5 from "./Ch01Sec5";
import Ch01Sec6 from "./Ch01Sec6";
import Ch01Sec7 from "./Ch01Sec7";
import Ch01Sec8 from "./Ch01Sec8";
import Ch01Sec9 from "./Ch01Sec9";
import Ch01Sec10 from "./Ch01Sec10";

const CH01 = "8d7ccfaa-af16-53e4-9f28-823c8ea923d1"; // Class 11 · Units & Measurements

const REGISTRY: Record<string, React.ComponentType<SceneProps>> = {
  [`${CH01}:1`]: Ch01Sec1,
  [`${CH01}:2`]: Ch01Sec2,
  [`${CH01}:3`]: Ch01Sec3,
  [`${CH01}:4`]: Ch01Sec4,
  [`${CH01}:5`]: Ch01Sec5,
  [`${CH01}:6`]: Ch01Sec6,
  [`${CH01}:7`]: Ch01Sec7,
  [`${CH01}:8`]: Ch01Sec8,
  [`${CH01}:9`]: Ch01Sec9,
  [`${CH01}:10`]: Ch01Sec10,
};

export function getScene(
  chapterId: string | undefined,
  position: number | null | undefined
): React.ComponentType<SceneProps> | null {
  if (!chapterId || position == null) return null;
  return REGISTRY[`${chapterId}:${position}`] ?? null;
}

export type { SceneProps };
