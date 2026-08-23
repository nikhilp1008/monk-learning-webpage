"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Draws a molecule from its SMILES string.
 *
 * Mathpix converts a structure DRAWN on the page into SMILES (the
 * `include_smiles` option), and the pipeline deliberately carries the
 * `<smiles>…</smiles>` tag all the way through to the student — dropping it
 * once produced a confabulated answer to "the given molecule". But shown as
 * text the tag is worse than useless: a student reads `<smiles>CC=CC(C)O
 * </smiles>` where the paper showed a skeletal structure, so it is drawn here.
 *
 * smiles-drawer is imported on demand. It is ~190KB and most questions carry
 * no structure at all, so it must not sit in the main bundle.
 */
export function SmilesStructure({ smiles }: { smiles: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;

    (async () => {
      try {
        const mod = await import("smiles-drawer");
        if (cancelled || !hostRef.current) return;

        // The package ships a namespace class as its default export.
        const SmilesDrawer = ((mod as unknown as { default?: unknown }).default ??
          mod) as {
          SvgDrawer: new (options: object) => {
            draw: (tree: unknown, target: SVGSVGElement, theme: string) => void;
          };
          parse: (
            smiles: string,
            onSuccess: (tree: unknown) => void,
            onError: (err: unknown) => void
          ) => void;
        };

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "100%");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", `Chemical structure: ${smiles}`);

        const drawer = new SmilesDrawer.SvgDrawer({
          width: 200,
          height: 150,
          padding: 12,
          // The question sheet is cream, not white — a transparent background
          // lets the ruled paper show through instead of punching a white box.
          themes: {
            monk: {
              C: "#1C1A16", O: "#C53A2B", N: "#2C5AA0", F: "#1E8E4E",
              CL: "#1E8E4E", BR: "#8A5A2B", I: "#6B3FA0", P: "#C77B1F",
              S: "#B8960B", B: "#8A5A2B", SI: "#57534B", H: "#1C1A16",
              BACKGROUND: "#00000000",
            },
          },
        });

        SmilesDrawer.parse(
          smiles,
          (tree: unknown) => {
            if (cancelled || !hostRef.current) return;
            try {
              drawer.draw(tree, svg, "monk");
              hostRef.current.replaceChildren(svg);
            } catch {
              setFailed(true);
            }
          },
          () => {
            // An unparseable SMILES is a real outcome (OCR mangles them), not
            // a crash: fall through to showing the string itself.
            if (!cancelled) setFailed(true);
          }
        );
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [smiles]);

  // Whatever happens, the molecule's identity stays on screen. The drawing is
  // the readable form; the string underneath it is the checkable one, and is
  // all that is left if the structure could not be drawn.
  if (failed) {
    return (
      <span className="inline-flex items-baseline gap-1.5 align-baseline">
        <span className="font-extrabold text-[0.58rem] tracking-[0.1em] uppercase text-ink-muted">
          Structure
        </span>
        <code className="text-[0.86rem] font-mono text-ink break-all">
          {smiles}
        </code>
      </span>
    );
  }

  // No SMILES string alongside a structure that drew: the drawing IS the
  // molecule, and printing "CC=CC(C)O" under it just puts back the unreadable
  // thing this component exists to replace. The string survives only in the
  // fallback above, where it is all there is.
  return (
    <span
      ref={hostRef}
      className="block my-1.5 max-w-[210px] [&>svg]:max-w-full [&>svg]:h-auto"
    />
  );
}
