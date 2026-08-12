"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NoteContent } from "@/components/NoteContent";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type NoteRow = Database["public"]["Tables"]["notes"]["Row"];

export default function NoteDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [note, setNote] = useState<NoteRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        if (isMounted) setNote(data);
      } catch (err) {
        console.error("Failed to load note:", err);
        if (isMounted) setNote(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">

      <main className="flex-1 max-w-[880px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <Link
          href="/notes"
          className="inline-flex items-center gap-1.5 font-bold text-[0.82rem] text-ink-light hover:text-ink mb-4"
        >
          ← All notes
        </Link>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading note...</span>
          </div>
        ) : !note ? (
          <div className="py-20 text-center text-ink-muted text-sm font-semibold">
            Couldn&apos;t find that note.
          </div>
        ) : (
          <>
            <h1 className="text-[1.9rem] leading-[1.1] tracking-[-0.02em] font-medium text-ink">
              {note.concept || "Untitled note"}
            </h1>
            <div className="flex items-center gap-2 flex-wrap mt-3 mb-6">
              <span className="font-extrabold text-[0.68rem] tracking-[0.06em] uppercase text-orange-dark bg-orange/12 px-2.5 py-1 rounded-full">
                {note.subject || "General"}
              </span>
              {note.chapter && (
                <span className="text-[0.78rem] text-ink-light font-semibold border border-border-subtle rounded-full px-2.5 py-1">
                  {note.chapter}
                </span>
              )}
              {/* Class progress and size were saved with the note all along —
                  a student picking between three "Projectile Motion" notes
                  needs to see which class got further, not three identical
                  cards. */}
              {note.total_segments > 0 && (
                <span className="text-[0.78rem] text-ink-light font-semibold border border-border-subtle rounded-full px-2.5 py-1">
                  {note.segments_covered >= note.total_segments
                    ? "Full lesson covered"
                    : `Class covered ${note.segments_covered} of ${note.total_segments} parts`}
                </span>
              )}
              <span className="text-[0.76rem] text-ink-muted">
                {note.item_count > 0 ? `${note.item_count} board items · ` : ""}
                Saved {new Date(note.created_at).toLocaleDateString()} · from a Drona session
              </span>
            </div>

            <div className="bg-ruled-card border border-border-subtle rounded-[16px] px-6 py-7 md:px-8 shadow-ref-card">
              {note.content ? (
                <NoteContent content={note.content} />
              ) : (
                <span className="text-ink-muted text-sm">No content saved for this note.</span>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
