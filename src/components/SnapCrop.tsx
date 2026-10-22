"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Crop the shot before sending it. The phone's snap-crop.tsx, for the web.
 *
 * This is the student's control over what they send, not a workaround for the
 * reader: a photo of a page holds several questions, and being able to send
 * one of them is the difference between asking what you meant and asking what
 * happened to be on the paper. It opens on the whole photo, so sending
 * everything is one tap.
 *
 * Rotation is applied to the pixels (the image is redrawn rotated), not as a
 * CSS transform, so the crop rectangle and the output always agree.
 */

const MIN_SIDE = 64; // smallest crop the handles can produce, in display px
const STAGE_MAX_W = 720;
const STAGE_MAX_H = 520;

type Rect = { x: number; y: number; w: number; h: number };
type Grip = "move" | "tl" | "tr" | "bl" | "br" | "t" | "b" | "l" | "r";

function rotate90(img: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement {
  const w = img instanceof HTMLImageElement ? img.naturalWidth : img.width;
  const h = img instanceof HTMLImageElement ? img.naturalHeight : img.height;
  const c = document.createElement("canvas");
  c.width = h;
  c.height = w;
  const ctx = c.getContext("2d")!;
  ctx.translate(h, 0);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(img, 0, 0);
  return c;
}

export function SnapCrop({
  file,
  onCancel,
  onDone,
}: {
  file: File;
  onCancel: () => void;
  onDone: (cropped: File) => void;
}) {
  // The pixels being cropped: the decoded photo, redrawn after each rotation.
  const [source, setSource] = useState<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);
  // The student's adjustment, tagged with the photo state it was made on: a
  // rotation or a new photo discards it and the default (the whole photo)
  // applies again, without an effect to reset it.
  const [adjusted, setAdjusted] = useState<{ rev: number; rect: Rect } | null>(null);
  const [rev, setRev] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `cancelled` stops a stale load/error callback from a previous run (React
    // re-runs effects in development, and a replaced file) from touching state:
    // the cleanup revokes the URL, which fires the old image's onerror.
    let cancelled = false;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")!.drawImage(img, 0, 0);
      setSource(c);
      setFailed(false);
    };
    img.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    img.src = url;
    return () => {
      cancelled = true;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Where the image is drawn on the stage after "contain".
  const frame = useMemo(() => {
    if (!source) return null;
    const k = Math.min(STAGE_MAX_W / source.width, STAGE_MAX_H / source.height, 1);
    return { w: Math.round(source.width * k), h: Math.round(source.height * k), k };
  }, [source]);

  // Start on the whole photo, inset slightly so the handles are reachable.
  const crop: Rect | null = !frame
    ? null
    : adjusted && adjusted.rev === rev
      ? adjusted.rect
      : { x: 6, y: 6, w: frame.w - 12, h: frame.h - 12 };

  const previewUrl = useMemo(() => {
    if (!source) return null;
    return source.toDataURL("image/jpeg", 0.85);
  }, [source]);

  const startDrag = useCallback(
    (grip: Grip) => (e: React.PointerEvent) => {
      if (!crop || !frame) return;
      e.preventDefault();
      e.stopPropagation();
      const start = { x: e.clientX, y: e.clientY, crop };
      const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - start.x;
        const dy = ev.clientY - start.y;
        let { x, y, w, h } = start.crop;
        if (grip === "move") {
          x = clamp(x + dx, 0, frame.w - w);
          y = clamp(y + dy, 0, frame.h - h);
        } else {
          const right = x + w;
          const bottom = y + h;
          if (grip.includes("l")) {
            x = clamp(x + dx, 0, right - MIN_SIDE);
            w = right - x;
          }
          if (grip.includes("r")) w = clamp(w + dx, MIN_SIDE, frame.w - x);
          if (grip.includes("t")) {
            y = clamp(y + dy, 0, bottom - MIN_SIDE);
            h = bottom - y;
          }
          if (grip.includes("b")) h = clamp(h + dy, MIN_SIDE, frame.h - y);
        }
        setAdjusted({ rev, rect: { x, y, w, h } });
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    },
    [crop, frame, rev]
  );

  const finish = () => {
    if (!source || !frame || !crop) return;
    // Display px -> source px, so the full-resolution photo is what gets cropped.
    const sx = Math.round(crop.x / frame.k);
    const sy = Math.round(crop.y / frame.k);
    const sw = Math.min(source.width - sx, Math.round(crop.w / frame.k));
    const sh = Math.min(source.height - sy, Math.round(crop.h / frame.k));
    const out = document.createElement("canvas");
    out.width = sw;
    out.height = sh;
    out.getContext("2d")!.drawImage(source, sx, sy, sw, sh, 0, 0, sw, sh);
    out.toBlob(
      (blob) => {
        if (!blob) return onCancel();
        const base = file.name.replace(/\.[^.]+$/, "") || "snap";
        onDone(new File([blob], `${base}-cropped.jpg`, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const handle = "absolute w-7 h-7 -m-3.5 rounded-full bg-white border-2 border-orange shadow touch-none";

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0C09] flex flex-col items-center justify-center gap-4 p-4" role="dialog" aria-modal="true" aria-label="Crop your photo">
      <p className="text-sm text-white/80">Drag the corners to keep just the question you want.</p>
      {failed ? (
        <p className="text-white">That photo could not be opened.</p>
      ) : !frame || !previewUrl || !crop ? (
        <p className="text-white/70 text-sm">Opening…</p>
      ) : (
        <div
          ref={stageRef}
          className="relative select-none overflow-hidden"
          style={{ width: frame.w, height: frame.h }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="" draggable={false} width={frame.w} height={frame.h} className="block" />
          <div
            onPointerDown={startDrag("move")}
            className="absolute border-2 border-white cursor-move touch-none"
            style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h, boxShadow: "0 0 0 9999px rgba(14,12,9,.6)" }}
          >
            {/* edges: wide invisible grips */}
            <div onPointerDown={startDrag("t")} className="absolute -top-2 left-4 right-4 h-4 cursor-ns-resize touch-none" />
            <div onPointerDown={startDrag("b")} className="absolute -bottom-2 left-4 right-4 h-4 cursor-ns-resize touch-none" />
            <div onPointerDown={startDrag("l")} className="absolute -left-2 top-4 bottom-4 w-4 cursor-ew-resize touch-none" />
            <div onPointerDown={startDrag("r")} className="absolute -right-2 top-4 bottom-4 w-4 cursor-ew-resize touch-none" />
            {(["tl", "tr", "bl", "br"] as const).map((g) => (
              <div
                key={g}
                onPointerDown={startDrag(g)}
                aria-hidden
                className={`${handle} ${g.includes("t") ? "top-0" : "top-full"} ${g.includes("l") ? "left-0" : "left-full"} ${
                  g === "tl" || g === "br" ? "cursor-nwse-resize" : "cursor-nesw-resize"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-bold">
          Cancel
        </button>
        <button
          onClick={() => {
            if (!source) return;
            setSource(rotate90(source));
            setRev((r) => r + 1);
          }}
          disabled={!source}
          className="px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-bold disabled:opacity-40"
        >
          Rotate
        </button>
        <button
          onClick={finish}
          disabled={!crop}
          className="px-6 py-2.5 rounded-full bg-orange text-dark-card text-sm font-bold disabled:opacity-40"
        >
          Use this crop
        </button>
      </div>
    </div>
  );
}
