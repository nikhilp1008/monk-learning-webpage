"use client";

import { useLayoutEffect, useRef, type ComponentProps } from "react";
import { Text as SvgText } from "@/components/textbook/svg";
import { textWidth } from "@/lib/widgets/chrome";

/**
 * Board text for web widgets. The phone's BoardText splits a string into runs
 * by glyph coverage (Onest has no Greek) and draws each in a face that has the
 * glyph; the browser already substitutes per glyph, so that part is not needed.
 *
 * What IS needed: widget layouts (table columns, label pills) are sized from
 * chrome.ts's advance widths for the phone's font, while the web draws in its
 * own UI face. If the web face renders a string wider than the layout planned,
 * it spills into its neighbour. So a string that measures wider than planned is
 * squeezed to the planned width with `textLength`; one that fits is left alone
 * (stretching short text would be worse than leaving it).
 */

let ctx: CanvasRenderingContext2D | null | undefined;

function measure(text: string, size: number, weight: string | number | undefined): number | null {
  if (typeof document === "undefined") return null;
  if (ctx === undefined) ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;
  ctx.font = `${weight ?? 400} ${size}px ${getComputedStyle(document.body).fontFamily}`;
  return ctx.measureText(text).width;
}

type Props = ComponentProps<typeof SvgText> & { children?: React.ReactNode };

/**
 * The squeeze is applied to the DOM node after mount, not decided during
 * render: it depends on a browser measurement, so deciding it in render would
 * make server and client HTML disagree (a hydration mismatch) for any widget
 * that is ever server-rendered.
 */
export function BoardText({ children, ...rest }: Props) {
  const ref = useRef<SVGTextElement>(null);
  const text = typeof children === "string" ? children : typeof children === "number" ? String(children) : null;
  const size = typeof rest.fontSize === "number" ? rest.fontSize : Number(rest.fontSize);
  const weight =
    typeof rest.fontWeight === "string" || typeof rest.fontWeight === "number" ? rest.fontWeight : undefined;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || text === null || !Number.isFinite(size)) return;
    // Planned width = what the layout priced it at (textWidth includes the
    // safety margin the layout reserved).
    const planned = textWidth(text, size);
    const actual = measure(text, size, weight);
    if (actual !== null && actual > planned) {
      el.setAttribute("textLength", String(planned));
      el.setAttribute("lengthAdjust", "spacingAndGlyphs");
    } else {
      el.removeAttribute("textLength");
      el.removeAttribute("lengthAdjust");
    }
  });

  return (
    <SvgText ref={ref} {...rest}>
      {text ?? children}
    </SvgText>
  );
}
