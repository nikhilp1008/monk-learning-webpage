"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ERASE } from "./Erasable";

/**
 * Delete-with-undo for a list. The item leaves the list the moment its card has
 * collapsed, but the SERVER delete is deferred until the five-second undo
 * window closes (as on the phone), so Undo is a real undo and not a re-create.
 *
 * Only the newest removal is undoable: removing a second card makes the
 * previous one final immediately. Leaving the page ends the window by
 * committing rather than dropping the delete. If the server refuses, the item
 * is put back and the caller is told.
 */
export function useEraseList<T extends { id: string }>(
  setItems: Dispatch<SetStateAction<T[]>>,
  serverDelete: (item: T) => Promise<unknown>,
  onFailed?: (item: T) => void
) {
  const [undoable, setUndoable] = useState<{ item: T; index: number } | null>(null);
  const pending = useRef<{ item: T; index: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const del = useRef(serverDelete);
  const failed = useRef(onFailed);
  useEffect(() => {
    del.current = serverDelete;
    failed.current = onFailed;
  });

  const commitPending = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const p = pending.current;
    pending.current = null;
    if (!p) return;
    del
      .current(p.item)
      .catch(() => {
        setItems((prev) => {
          const next = [...prev];
          next.splice(Math.min(p.index, next.length), 0, p.item);
          return next;
        });
        failed.current?.(p.item);
      });
  }, [setItems]);

  const remove = useCallback(
    (item: T, index: number) => {
      commitPending(); // the previous removal becomes final
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      pending.current = { item, index };
      setUndoable({ item, index });
      timer.current = setTimeout(() => {
        commitPending();
        setUndoable(null);
      }, ERASE.undoMs);
    },
    [commitPending, setItems]
  );

  const undo = useCallback(() => {
    const p = pending.current;
    if (!p) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    pending.current = null;
    setItems((prev) => {
      const next = [...prev];
      next.splice(Math.min(p.index, next.length), 0, p.item);
      return next;
    });
    setUndoable(null);
  }, [setItems]);

  // Leaving ends the window: commit, do not drop.
  useEffect(() => {
    const hide = () => document.visibilityState === "hidden" && commitPending();
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", commitPending);
    return () => {
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", commitPending);
      commitPending();
    };
  }, [commitPending]);

  return { remove, undo, canUndo: undoable !== null };
}
