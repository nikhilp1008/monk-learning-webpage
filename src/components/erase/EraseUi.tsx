"use client";

/** The eraser tool, the mode line and the undo row, as drawn in the phone's
 *  erase handoff. The tool lives at the right end of the filter row and is
 *  absent where nothing is the student's to delete. */

export function EraseTool({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full border text-[0.75rem] font-bold pl-[9px] pr-3 py-[5px] transition-colors ${
        on ? "bg-ink border-ink text-cream-light" : "border-[rgba(28,26,22,.14)] text-ink-light hover:border-ink"
      }`}
    >
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden>
        <path
          d="M4.8 16.9 12.5 6.6a1.9 1.9 0 0 1 2.7-.4l2.9 2.1a1.9 1.9 0 0 1 .4 2.7L13.4 19H6.7a1.9 1.9 0 0 1-1.9-2.1z"
          fill={on ? "#FCFAF4" : "#FCF4E0"}
          stroke={on ? "#FCFAF4" : "#1C1A16"}
        />
        <path d="M9.4 12.2 15.7 16.8M13.4 19h4.9" stroke={on ? "#1C1A16" : "#1C1A16"} />
      </svg>
      {on ? "Erasing" : "Erase"}
    </button>
  );
}

export function EraseModeLine({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-4 animate-ml-rise">
      <span className="font-script font-bold text-[0.95rem] text-ink-light">rub any card to erase it</span>
      <button type="button" onClick={onDone} className="text-[0.72rem] font-extrabold tracking-[0.06em] text-ink">
        DONE
      </button>
    </div>
  );
}

export function UndoRow({ onUndo }: { onUndo: () => void }) {
  return (
    <div className="flex items-center gap-3 my-3 animate-ml-rise" role="status">
      <span className="flex-1 h-px bg-border-subtle" />
      <span className="font-script font-bold text-[0.85rem] text-ink-light">erased</span>
      <button type="button" onClick={onUndo} className="text-[0.72rem] font-extrabold tracking-[0.06em] text-orange-dark">
        UNDO
      </button>
      <span className="flex-1 h-px bg-border-subtle" />
    </div>
  );
}
