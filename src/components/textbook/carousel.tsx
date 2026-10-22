"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { colors } from "@/components/textbook/brand";
import { CARD_GAP, CARD_W } from "@/components/textbook/theme";

// useLayoutEffect warns during SSR; the restore below only matters in the
// browser, so fall back to a plain effect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The swipeable card rail used by solved examples, MCQs and practice.
 *
 * Ported from the phone's carousel.tsx. The phone uses a snapping
 * `ScrollView` (`snapToInterval`); here it is a horizontal overflow container
 * with CSS scroll-snap, which gives the same drag-follows-finger, advance-one-
 * card, spring-back behaviour natively on touch and trackpad.
 *
 * The card's own presence follows the live scroll position, not the settled
 * page index: the next card brightens while the finger is still moving rather
 * than after it lifts. On the phone that is an interpolation against the
 * offset on the native driver; here the offset is rounded to the nearest card
 * once per animation frame and the cards fade between two states with a CSS
 * transition. The settled page (debounced scroll end) is what is reported
 * through `onPage` so the reader can keep it per block.
 */
export function Carousel({
  count,
  page,
  onPage,
  scale,
  children,
}: {
  count: number;
  page: number;
  onPage: (index: number) => void;
  scale: (n: number) => number;
  /** Called with (live page, step) so each card can tell whether it is the current one. */
  children: (page: number, step: number) => ReactNode;
}) {
  const step = scale(CARD_W) + scale(CARD_GAP);
  const railRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(page);
  const frame = useRef<number | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Latest props, read from the scroll handlers so they need not be rebuilt.
  const latest = useRef({ page, onPage, step, count });
  useEffect(() => {
    latest.current = { page, onPage, step, count };
  });

  // The page the student left this rail on, restored. The reader already keeps
  // it per block so it survives a topic switch; without seeding the scroller
  // the number was stored and never used, and coming back to a topic dropped
  // you on card one of a rail you were halfway through.
  useIsoLayoutEffect(() => {
    railRef.current?.scrollTo({ left: page * step, behavior: "auto" });
    // Mount only: later `page` changes come FROM the scroll, not into it.
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      if (settle.current) clearTimeout(settle.current);
    },
    [],
  );

  const clampPage = (n: number) => Math.max(0, Math.min(latest.current.count - 1, n));

  const onScroll = useCallback(() => {
    if (frame.current === null) {
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const el = railRef.current;
        if (el) setLive(clampPage(Math.round(el.scrollLeft / latest.current.step)));
      });
    }
    // Still tracked at rest, but only for the reader's stored page, which is
    // about where the student landed rather than where their finger is.
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = railRef.current;
      if (!el) return;
      const next = clampPage(Math.round(el.scrollLeft / latest.current.step));
      setLive(next);
      if (next !== latest.current.page) latest.current.onPage(next);
    }, 120);
  }, []);

  const goTo = (i: number) => {
    railRef.current?.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        onScroll={onScroll}
        style={{
          display: "flex",
          alignItems: "flex-start",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          gap: scale(CARD_GAP),
          // Lets the last card clear the right gutter the reader adds.
          paddingRight: scale(24),
        }}>
        {children(live, step)}
      </div>

      {/* Dots only. There was a "← SWIPE" label beside them, from the design;
          a row of dots with one lit is already the most recognised affordance
          on a phone, and spelling it out was the only instruction on a page
          that otherwise never instructs. On the web they are also buttons. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: scale(2),
          paddingTop: scale(6),
        }}>
        {Array.from({ length: count }, (_, i) => (
          <Dot key={i} index={i} live={live} scale={scale} onSelect={goTo} />
        ))}
      </div>
    </div>
  );
}

/**
 * One dot, lit against the live page like the cards are.
 *
 * Opacity and scale rather than a colour change: every dot is the same ink
 * already, so fading between .18 and 1 is enough. The button around it is
 * larger than the dot so it can be hit; the dot itself is unchanged.
 */
function Dot({
  index,
  live,
  scale,
  onSelect,
}: {
  index: number;
  live: number;
  scale: (n: number) => number;
  onSelect: (index: number) => void;
}) {
  const on = index === live;
  return (
    <button
      type="button"
      aria-label={`Go to card ${index + 1}`}
      aria-current={on ? "true" : undefined}
      onClick={() => onSelect(index)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: scale(18),
        height: scale(18),
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
      }}>
      <span
        style={{
          display: "block",
          width: scale(6),
          height: scale(6),
          borderRadius: scale(99),
          backgroundColor: colors.ink,
          opacity: on ? 1 : 0.18,
          transform: `scale(${on ? 1.25 : 1})`,
          transition: "opacity 160ms ease, transform 160ms ease",
        }}
      />
    </button>
  );
}

/** One card, dimmed and slightly shrunk unless it is the current one. */
export function CarouselCard({
  index,
  active,
  scale,
  children,
}: {
  index: number;
  active: boolean;
  scale: (n: number) => number;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Card ${index + 1}`}
      style={{
        width: scale(CARD_W),
        flexShrink: 0,
        scrollSnapAlign: "start",
        opacity: active ? 1 : 0.55,
        transform: `scale(${active ? 1 : 0.98})`,
        transition: "opacity 180ms ease, transform 180ms ease",
      }}>
      {children}
    </div>
  );
}
