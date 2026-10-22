/**
 * Drona board widget runtime -- contract, web edition.
 *
 * Ported from the phone's lib/widgets/types.ts. The one structural difference:
 * the phone hands a widget a SharedValue per animatable param (UI-thread
 * animation); the web hands plain numbers, tweened by the host and re-rendered
 * per frame, so `motion` is `Record<string, number>`. Everything else (the
 * model never draws, params authoritative, validate() is the only gate) is
 * the phone's contract unchanged.
 */
import type { ComponentType } from "react";

export type WidgetId = string;

export type ValidationResult<P> =
  | { ok: true; params: P }
  | { ok: false; errors: readonly string[] };

/** Emitted by the model, or baked into a lesson at content-build time. */
export interface WidgetPayload<P extends object = Record<string, unknown>> {
  widget: WidgetId;
  version: number;
  params: P;
  annotate?: readonly string[];
  cues?: readonly Cue[];
}

export interface Cue {
  /** The board-event `seq` this cue applies at: the active cue is the one with
   *  the greatest `seq` <= the highest seq revealed so far this turn. */
  seq: number;
  /** Partial params applied at `seq`. Numeric keys in `animatable` are tweened. */
  patch: Readonly<Record<string, number | string | boolean>>;
  /** Tween ms. 0 or omitted = snap. */
  tween?: number;
  /** Display-only caption; `{{token}}` filled from computeDerived. Never speech. */
  caption?: string;
}

export interface WidgetTheme {
  ink: string;
  inkMuted: string;
  rule: string;
  accent: string;
  surface: string;
  fontFamily: string;
  monoFontFamily: string;
}

export interface WidgetRenderProps<P extends object> {
  params: P;
  /** The CURRENT value of each key in `animatable` (mid-tween on a cue). */
  motion: Readonly<Record<string, number>>;
  width: number;
  height: number;
  theme: WidgetTheme;
}

export interface WidgetModule<P extends object> {
  id: WidgetId;
  version: number;
  defaults: P;
  animatable: readonly Extract<keyof P, string>[];
  derived: readonly string[];
  computeDerived(params: P): Record<string, number>;
  derivedAliases: Readonly<Record<string, readonly string[]>>;
  validate(raw: unknown): ValidationResult<P>;
  Component: ComponentType<WidgetRenderProps<P>>;
}
