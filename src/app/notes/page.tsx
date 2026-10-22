"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { deleteNote } from "@/lib/notes";
import { Erasable } from "@/components/erase/Erasable";
import { useEraseList } from "@/components/erase/useEraseList";
import { EraseModeLine, EraseTool, UndoRow } from "@/components/erase/EraseUi";

type NoteRow = Database["public"]["Tables"]["notes"]["Row"];

const SUBJECTS = ["Physics", "Chemistry", "Maths"];

const SUBJECT_DOT: Record<string, string> = {
  Physics: "bg-red-note",
  Chemistry: "bg-green-badge",
  Maths: "bg-orange",
};

/** First real prose of the note, cleaned for a two-line card. The raw content
 *  opens with an ALL-CAPS heading and bullet markers, so the cards all read
 *  "PROJECTILE MOTION • After launch…" — noise at card size, and identical
 *  for every note on the same topic. Skip headings and formula lines, strip
 *  markers and $ delimiters, and join the first bullets into a sentence. */
function previewText(n: NoteRow): string {
  if (!n.content) return "";
  const lines = n.content
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !(/[A-Z]/.test(l) && !/[a-z]/.test(l)) && // ALL-CAPS headings
        !(l.startsWith("$") && l.endsWith("$")) // formula-only lines
    )
    .map((l) => l.replace(/^•\s*/, "").replace(/\$/g, ""));
  return lines.slice(0, 3).join(" ");
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffH = diffMs / 3600000;
  if (diffH < 20) return diffH < 1 ? "just now" : `${Math.round(diffH)}h ago`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[d.getDay()];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");
  // Erase mode: rub a card to delete it (the phone's gesture). Undoable for 5s.
  const [erase, setErase] = useState(false);
  const [eraseNotice, setEraseNotice] = useState<string | null>(null);
  const { remove, undo, canUndo } = useEraseList<NoteRow>(
    setNotes,
    (n) => deleteNote(n.id),
    (n) => setEraseNotice(`Couldn't delete "${n.concept || "that note"}". It is back in your list.`)
  );
  // Nothing left to erase: put the eraser down. Escape does the same.
  const eraseOn = erase && notes.length > 0;
  useEffect(() => {
    if (!erase) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setErase(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [erase]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (isMounted) {
            setNotes([]);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (isMounted) setNotes(data || []);
      } catch (err) {
        console.error("Failed to load notes:", err);
        if (isMounted) setNotes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = notes.filter((n) => {
    if (filter !== "All" && n.subject !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      const hay = `${n.concept || ""} ${n.chapter || ""} ${n.subject || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div
      className="min-h-screen flex flex-col bg-ruled-body transition-colors duration-300"
      style={eraseOn ? { backgroundColor: "#F4F3EF", backgroundImage: "none" } : undefined}
    >

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
          Everything worth keeping.
        </h1>
        <p className="text-ink-light text-base mt-1.5 max-w-[48rem]">
          Every session you saved with Drona, with the full board ready to revise.
        </p>

        <div className="flex items-center gap-3 flex-wrap mt-6 mb-6">
          <div className="flex-1 min-w-[220px] max-w-[380px] flex items-center gap-2 bg-white border border-border-subtle rounded-full px-4 py-2.5 shadow-xs">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" className="flex-none stroke-ink-muted" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes by concept or chapter…"
              className="flex-1 min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </div>

          <div className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
            {["All", ...SUBJECTS].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  filter === s ? "font-bold bg-ink text-cream-light" : "font-semibold text-ink-light"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <span className="text-[0.76rem] text-ink-muted font-semibold ml-auto">
            {notes.length} note{notes.length === 1 ? "" : "s"}
          </span>
          {notes.length > 0 && <EraseTool on={eraseOn} onToggle={() => setErase((v) => !v)} />}
        </div>

        {eraseOn && <EraseModeLine onDone={() => setErase(false)} />}
        {eraseNotice && (
          <p className="text-[0.8rem] text-red-dark mb-3" role="alert">
            {eraseNotice}
          </p>
        )}
        {canUndo && <UndoRow onUndo={undo} />}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading notes...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-muted text-sm font-semibold">
              {notes.length === 0
                ? "Nothing saved yet. Notes you keep from a Drona session will show up here."
                : "No notes match that. Try another search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((n) => (
              <Erasable
                key={n.id}
                active={eraseOn}
                label={n.concept || "note"}
                onRemove={() => remove(n, notes.findIndex((x) => x.id === n.id))}
                className={eraseOn ? "animate-ml-nudge" : ""}
              >
              <Link
                href={`/notes/${n.id}`}
                className="block bg-white border border-border-subtle rounded-[16px] p-4 shadow-ref-stat hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-extrabold text-[0.66rem] tracking-[0.08em] uppercase text-ink-light">
                    <span className={`w-1.5 h-1.5 rounded-full ${SUBJECT_DOT[n.subject || ""] || "bg-ink-dim"}`} />
                    {n.subject || "General"}
                  </span>
                  <span className="text-[0.72rem] text-ink-muted font-semibold">
                    {dayLabel(n.created_at)}
                  </span>
                </div>
                <h4 className="font-bold text-[1rem] text-ink mt-2.5">{n.concept || "Untitled note"}</h4>
                <p className="text-[0.82rem] text-ink-light mt-1.5 line-clamp-2 leading-relaxed">
                  {previewText(n) || n.chapter}
                </p>
              </Link>
              </Erasable>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
