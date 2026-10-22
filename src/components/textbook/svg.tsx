/**
 * react-native-svg's API, on the web's own <svg>.
 *
 * The phone's textbook figures are written against react-native-svg
 * (`import Svg, { Path, Text as SvgText } from 'react-native-svg'`). The
 * element names and nearly every prop are the DOM's own, so these are thin
 * pass-throughs and the ported figures differ from the phone's by one import
 * line rather than by a rewrite. If a figure is changed on one platform,
 * diff it against the other: they are meant to stay line-for-line alike.
 */
import type { ComponentProps, SVGProps } from "react";

type P<T extends keyof React.JSX.IntrinsicElements> = ComponentProps<T>;

/** react-native-svg takes dash patterns as number arrays; the DOM wants a
 *  string. Accept both and convert, so widgets stay line-for-line the phone's. */
type Dash = { strokeDasharray?: string | number | readonly number[] };
type W<T extends keyof React.JSX.IntrinsicElements> = Omit<P<T>, "strokeDasharray"> & Dash;
function dash<T extends Dash>(p: T): Omit<T, "strokeDasharray"> & { strokeDasharray?: string | number } {
  const d = p.strokeDasharray;
  return Array.isArray(d) ? { ...p, strokeDasharray: d.join(" ") } : (p as never);
}

export default function Svg(props: P<"svg">) {
  return <svg {...props} />;
}
export const G = (p: W<"g">) => <g {...dash(p)} />;
export const Path = (p: W<"path">) => <path {...dash(p)} />;
export const Line = (p: W<"line">) => <line {...dash(p)} />;
export const Rect = (p: W<"rect">) => <rect {...dash(p)} />;
export const Circle = (p: W<"circle">) => <circle {...dash(p)} />;
export const Ellipse = (p: W<"ellipse">) => <ellipse {...dash(p)} />;
export const Polygon = (p: W<"polygon">) => <polygon {...dash(p)} />;
export const Polyline = (p: W<"polyline">) => <polyline {...dash(p)} />;
export const Defs = (p: P<"defs">) => <defs {...p} />;
export const Pattern = (p: P<"pattern">) => <pattern {...p} />;
export const ClipPath = (p: P<"clipPath">) => <clipPath {...p} />;
export const Marker = (p: P<"marker">) => <marker {...p} />;
export const LinearGradient = (p: P<"linearGradient">) => <linearGradient {...p} />;
export const Stop = (p: P<"stop">) => <stop {...p} />;
/** The phone names its fonts by file ("Onest_700Bold"); the web has one UI
 *  face, so a family like that becomes the app font at that weight. */
function webFont(p: P<"text">): P<"text"> {
  const m = typeof p.fontFamily === "string" ? /^Onest_(\d+)/.exec(p.fontFamily) : null;
  if (m) return { ...p, fontFamily: "var(--font-sans), system-ui, sans-serif", fontWeight: p.fontWeight ?? Number(m[1]) };
  if (p.fontFamily === "Georgia") return { ...p, fontFamily: "Georgia, 'Times New Roman', serif" };
  return p;
}
export const Text = (p: P<"text">) => <text {...webFont(p)} />;
export const TSpan = (p: P<"tspan">) => <tspan {...p} />;

export type SvgTextProps = SVGProps<SVGTextElement>;
export type RectProps = SVGProps<SVGRectElement>;
export type PathProps = SVGProps<SVGPathElement>;
export type CircleProps = SVGProps<SVGCircleElement>;
