"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Tap a photographed question to read it full size: the phone's QuestionPeek.
 * A photo of a page is mostly small print, and the card it sits in shows it
 * about a quarter of its size.
 *
 * Inside: double-click (or double-tap) toggles 1x/2.5x, the wheel zooms,
 * dragging pans when zoomed, Escape or a click outside closes.
 */

const MAX_ZOOM = 4;

export function PhotoLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const setZ = (z: number) => {
    const next = Math.min(MAX_ZOOM, Math.max(1, z));
    setZoom(next);
    if (next === 1) setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-[rgba(14,12,9,.92)] flex items-center justify-center select-none"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      onWheel={(e) => setZ(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15))}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 text-white text-xl grid place-items-center hover:bg-white/25"
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={() => setZ(zoom > 1 ? 1 : 2.5)}
        onPointerDown={(e) => {
          if (zoom <= 1) return;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (d) setPan({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y });
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
        className={`max-w-[94vw] max-h-[90vh] object-contain touch-none ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transition: dragging ? "none" : "transform 120ms ease-out" }}
      />
    </div>
  );
}

/** Wraps any photo so a click opens it in the lightbox. */
export function EnlargeOnClick({ src, alt, children, className = "" }: { src: string; alt: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${alt}`}
        className={`block w-full cursor-zoom-in text-left ${className}`}
      >
        {children}
      </button>
      {open && <PhotoLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
