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

export default function Svg(props: P<"svg">) {
  return <svg {...props} />;
}
export const G = (p: P<"g">) => <g {...p} />;
export const Path = (p: P<"path">) => <path {...p} />;
export const Line = (p: P<"line">) => <line {...p} />;
export const Rect = (p: P<"rect">) => <rect {...p} />;
export const Circle = (p: P<"circle">) => <circle {...p} />;
export const Ellipse = (p: P<"ellipse">) => <ellipse {...p} />;
export const Polygon = (p: P<"polygon">) => <polygon {...p} />;
export const Polyline = (p: P<"polyline">) => <polyline {...p} />;
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
