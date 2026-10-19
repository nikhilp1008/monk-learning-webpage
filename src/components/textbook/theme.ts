import type { CSSProperties } from "react";
import { colors } from "@/components/textbook/brand";
import { SERIF } from "@/components/textbook/markup";

/**
 * Shared type and surface values for the reader's content blocks, ported from
 * the phone's theme.ts (which carries the reasoning for each departure from
 * the design handoff: the app's own face for kickers, one ink-derived border,
 * one warm tint).
 *
 * `type` is the device scale times the reader's chosen text multiplier;
 * `scale` is the layout scale alone. Font sizes and line heights go through
 * `type`; boxes, radii and padding go through `scale`. On the web both are
 * plain px, and `type` carries only the reader's text-size preset.
 */

export const BORDER = "rgba(28,26,22,.12)";
export const BORDER_SOFT = "rgba(28,26,22,.06)";
export const BORDER_STRONG = "rgba(28,26,22,.16)";
export const CARD_BORDER = "rgba(28,26,22,.14)";
export const DASH = "rgba(28,26,22,.25)";

/** Card width and the distance between two cards' left edges (carousel). */
export const CARD_W = 306;
export const CARD_GAP = 12;

const SANS = "var(--font-sans), system-ui, sans-serif";

export function kicker(type: (n: number) => number, size = 12): CSSProperties {
  return {
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: type(size),
    letterSpacing: type(size * 0.015),
    color: colors.faint,
  };
}

export function mathText(type: (n: number) => number, size: number): CSSProperties {
  return { fontFamily: SERIF, fontStyle: "italic", fontSize: type(size), color: colors.ink };
}

export function makeBlockStyles(scale: (n: number) => number, type = scale) {
  return {
    card: {
      background: colors.readingCard,
      border: `1px solid ${BORDER}`,
      borderRadius: scale(12),
      padding: `${scale(14)}px ${scale(16)}px`,
    },
    cardFlush: {
      background: colors.readingCard,
      border: `1px solid ${BORDER}`,
      borderRadius: scale(12),
      overflow: "hidden",
    },
    body: {
      fontFamily: SANS,
      fontSize: type(16.5),
      lineHeight: `${type(16.5 * 1.66)}px`,
      color: colors.ink,
    },
    blockBody: {
      fontFamily: SANS,
      fontSize: type(14.5),
      lineHeight: `${type(14.5 * 1.55)}px`,
      color: colors.slate,
    },
    hand: { fontFamily: SANS, color: colors.slate },
    tintPanel: {
      background: colors.tint,
      borderRadius: scale(10),
      padding: `${scale(10)}px ${scale(12)}px`,
    },
  } satisfies Record<string, CSSProperties>;
}
