"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { MathText } from "@/components/MathText";

type DoubtRow = Database["public"]["Tables"]["doubts"]["Row"];

const SUBJECTS = ["Physics", "Chemistry", "Maths"];

function dayLabel(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffH = diffMs / 3600000;
  if (diffH < 20) return diffH < 1 ? "just now" : `${Math.round(diffH)}h ago`;
  if (diffH < 44) return "yesterday";
  if (diffH < 24 * 7) return "this week";
  return "last week";
}

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState<DoubtRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (isMounted) {
            setDoubts([]);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from("doubts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (isMounted) setDoubts(data || []);
      } catch (err) {
        console.error("Failed to load doubts:", err);
        if (isMounted) setDoubts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = doubts.filter((d) => {
    if (filter !== "All" && d.subject !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      const hay = `${d.question_text || ""} ${d.concept || ""} ${d.chapter || ""} ${d.subject || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
          Every question you&apos;ve snapped.
        </h1>
        <p className="text-ink-light text-base mt-1.5 max-w-[48rem]">
          Each photo you send to Drona is solved and saved here automatically.
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
              placeholder="Search your doubts…"
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
            {doubts.length} snapped doubt{doubts.length === 1 ? "" : "s"}
          </span>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading doubts...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-muted text-sm font-semibold">
              {doubts.length === 0
                ? "Nothing snapped yet. Questions you photograph for Drona will show up here, solved."
                : "No doubts match that. Try another search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((d) => (
              <Link
                key={d.id}
                href={`/doubts/${d.id}`}
                className="flex items-center gap-4 bg-white border border-border-subtle rounded-[16px] p-4 shadow-ref-stat hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-16 h-16 flex-none rounded-xl bg-ruled-card border border-border-subtle grid place-items-center relative overflow-hidden">
                  <span className="text-[0.6rem] font-bold text-ink-light text-center leading-tight px-1">
                    {(d.concept || d.subject || "?").slice(0, 14)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.76rem] text-ink-muted font-semibold">
                    {d.subject} · {d.chapter} · {dayLabel(d.created_at)}
                  </div>
                  <p className="font-bold text-[0.96rem] text-ink mt-0.5 line-clamp-2">
                    <MathText content={d.question_text} />
                  </p>
                  {d.solved && (
                    <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-green-badge mt-1.5">
                      <svg viewBox="0 0 24 24" width={12} height={12} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Solved
                    </span>
                  )}
                </div>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" className="flex-none stroke-ink-dim" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
