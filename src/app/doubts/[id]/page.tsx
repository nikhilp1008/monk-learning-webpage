"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type DoubtRow = Database["public"]["Tables"]["doubts"]["Row"];

export default function DoubtDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [doubt, setDoubt] = useState<DoubtRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("doubts")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        if (isMounted) setDoubt(data);
      } catch (err) {
        console.error("Failed to load doubt:", err);
        if (isMounted) setDoubt(null);
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
      <Header />

      <main className="flex-1 max-w-[980px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <Link
          href="/doubts"
          className="inline-flex items-center gap-1.5 font-bold text-[0.82rem] text-ink-light hover:text-ink mb-4"
        >
          ← All doubts
        </Link>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading doubt...</span>
          </div>
        ) : !doubt ? (
          <div className="py-20 text-center text-ink-muted text-sm font-semibold">
            Couldn&apos;t find that doubt.
          </div>
        ) : (
          <>
            <h1 className="text-[1.9rem] leading-[1.1] tracking-[-0.02em] font-medium text-ink">
              {doubt.concept || "Snapped doubt"}
            </h1>
            <div className="flex items-center gap-2 flex-wrap mt-3 mb-6">
              {doubt.solved && (
                <span className="inline-flex items-center gap-1.5 font-bold text-[0.74rem] text-green-badge bg-green-badge/12 px-3 py-1 rounded-full">
                  <svg viewBox="0 0 24 24" width={12} height={12} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Solved by Drona
                </span>
              )}
              <span className="font-extrabold text-[0.68rem] tracking-[0.06em] uppercase text-orange-dark bg-orange/12 px-2.5 py-1 rounded-full">
                {doubt.subject || "General"}
              </span>
              {doubt.chapter && (
                <span className="text-[0.78rem] text-ink-light font-semibold border border-border-subtle rounded-full px-2.5 py-1">
                  {doubt.chapter}
                </span>
              )}
              <span className="text-[0.76rem] text-ink-muted">
                Snapped {new Date(doubt.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-4 items-start">
              <div className="bg-white border border-border-subtle rounded-[16px] p-5 shadow-ref-stat">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                  Your question
                </span>
                <div className="bg-ruled-card border border-border-subtle rounded-xl p-4 text-[0.94rem] text-ink leading-relaxed">
                  {doubt.question_text}
                </div>
              </div>

              <div className="bg-ruled-card border border-border-subtle rounded-[16px] p-5 shadow-ref-card">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                  Drona&apos;s explanation
                </span>
                <div className="whitespace-pre-wrap text-[0.94rem] text-ink leading-relaxed">
                  {doubt.explanation || "No explanation saved for this doubt."}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
