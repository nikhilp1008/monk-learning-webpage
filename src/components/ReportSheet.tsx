"use client";

import { useState } from "react";
import { REPORT_REASONS, sendReport, type ReportInput } from "@/lib/reports";

/**
 * Report a mistake: reasons, a note, Send. More than one reason can be on --
 * a wrong answer is often a confusing step too. The first is the report's
 * `reason`; with several, all travel in `context.reasons`.
 */
export function ReportSheet({
  target,
  onClose,
  onSent,
}: {
  /** Everything about WHAT is being reported; the sheet adds reason + note. */
  target: Omit<ReportInput, "reason" | "comment">;
  onClose: () => void;
  onSent?: () => void;
}) {
  const [reasons, setReasons] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (r: string) =>
    setReasons((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const send = async () => {
    if (sending || sent) return;
    setSending(true);
    setError(null);
    try {
      await sendReport({
        ...target,
        reason: reasons[0] ?? null,
        comment: note.trim() || null,
        context: {
          ...(target.context ?? {}),
          ...(reasons.length > 1 ? { reasons } : {}),
        },
      });
      setSent(true);
      onSent?.();
      setTimeout(onClose, 1400);
    } catch (err) {
      setSending(false);
      setError(err instanceof Error && err.message ? err.message : "Couldn't send that. Try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Report a mistake"
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <p className="text-center text-ink font-bold py-6">Sent. Thank you, we&apos;ll look at this.</p>
        ) : (
          <>
            <h2 className="text-lg font-extrabold text-ink">Report a mistake</h2>
            <div className="flex flex-wrap gap-2">
              {REPORT_REASONS.map((r) => {
                const on = reasons.includes(r);
                return (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(r)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      on ? "bg-red-note text-white border-red-note" : "border-border-subtle text-ink-light hover:text-ink"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Anything else we should know? (optional)"
              className="w-full rounded-xl border border-border-subtle px-3 py-2 text-sm text-ink bg-cream-soft resize-none"
            />
            {error && <p className="text-sm text-red-dark">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-border-subtle text-sm font-bold text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={send}
                disabled={sending}
                className="px-5 py-2 rounded-full bg-ink text-white text-sm font-bold disabled:opacity-40"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
