"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

const LANGS: { key: string; label: string }[] = [
  { key: "hi", label: "हिंदी" },
  { key: "hinglish", label: "Hinglish" },
  { key: "english", label: "English" },
];

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-6 rounded-full flex-none relative transition-colors cursor-pointer ${
        on ? "bg-green-badge" : "bg-ink/15"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!isMounted) return;
        setUserId(user?.id || null);

        if (!user) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (isMounted) setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const update = async (patch: Partial<ProfileRow>) => {
    if (!userId || !profile) return;
    setProfile({ ...profile, ...patch });
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
    if (error) {
      console.error("Failed to update profile:", error);
      setProfile(profile);
    }
  };

  const initial = profile?.display_name?.trim().charAt(0).toUpperCase() || "S";
  const subjects =
    profile?.target_exam === "NEET"
      ? ["Physics", "Chemistry", "Biology"]
      : ["Physics", "Chemistry", "Maths"];

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
              Your profile
            </h1>
            <p className="text-ink-light text-base mt-1.5">
              Who you are as a learner, and how Drona teaches you.
            </p>
          </div>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 font-bold text-[0.82rem] px-4 py-2.5 rounded-full border border-border-subtle text-ink hover:border-ink transition-colors"
          >
            ⚙ Account settings
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading profile...</span>
          </div>
        ) : !userId ? (
          <div className="py-20 text-center text-ink-muted text-sm font-semibold">
            <Link href="/login" className="text-ink underline">
              Sign in
            </Link>{" "}
            to see and edit your profile.
          </div>
        ) : (
          <>
            <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card flex items-center justify-between gap-4 flex-wrap mb-5">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full grid place-items-center bg-gradient-to-br from-orange-light to-orange text-[#3A2A06] font-extrabold text-lg shadow-xs flex-none">
                  {initial}
                </span>
                <div>
                  <b className="block font-bold text-[1.1rem] text-ink">
                    {profile?.display_name || "Student"}
                  </b>
                  <span className="text-[0.82rem] text-ink-light font-medium">
                    Class {profile?.enrolled_class || 11} ·{" "}
                    {profile?.target_exam === "NEET" ? "NEET" : "JEE Main"}
                  </span>
                  <span className="inline-block ml-2 text-[0.72rem] font-bold text-orange-dark bg-orange/12 px-2.5 py-0.5 rounded-full">
                    {profile?.target_exam || "JEE Main"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-5 items-start">
              <div className="space-y-5">
                {/* Learning preferences */}
                <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                  <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-3">
                    Learning preferences
                  </span>

                  <span className="block text-[0.8rem] font-bold text-ink mb-2">Your teacher</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { key: "drona", name: "Drona", tag: "Male voice", traits: ["Calm", "Strict", "Disciplined"] },
                      { key: "vedha", name: "Vedha", tag: "Female voice", traits: ["Warm", "Precise", "Patient"] },
                    ].map((t) => {
                      const active = (profile?.teacher_voice || "drona") === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => update({ teacher_voice: t.key })}
                          className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                            active ? "border-orange bg-orange/8" : "border-border-subtle hover:border-ink/30"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full grid place-items-center bg-ink text-white font-extrabold text-xs">
                                {t.name.charAt(0)}
                              </span>
                              <span>
                                <b className="block font-bold text-[0.9rem] text-ink">{t.name}</b>
                                <span className="block text-[0.66rem] font-bold uppercase tracking-wide text-ink-muted">
                                  {t.tag}
                                </span>
                              </span>
                            </span>
                            {active && (
                              <span className="w-5 h-5 rounded-full bg-orange grid place-items-center flex-none">
                                <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1.5 flex-wrap mt-2.5">
                            {t.traits.map((tr) => (
                              <span key={tr} className="text-[0.66rem] font-semibold text-ink-light bg-ink/5 px-2 py-0.5 rounded-full">
                                {tr}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <span className="block text-[0.8rem] font-bold text-ink mb-2">Teaching language</span>
                  <div className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full mb-5 w-full sm:w-auto">
                    {LANGS.map((l) => (
                      <button
                        key={l.key}
                        onClick={() => update({ teaching_language: l.key })}
                        className={`flex-1 sm:flex-none text-[0.84rem] px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                          (profile?.teaching_language || "hinglish") === l.key
                            ? "font-bold bg-ink text-cream-light"
                            : "font-semibold text-ink-light"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1 -mx-1">
                    {[
                      {
                        key: "read_equations_aloud" as const,
                        title: "Read equations aloud",
                        sub: "Spoken in plain words, shown as proper equations.",
                      },
                      {
                        key: "allow_interrupt" as const,
                        title: "Let me interrupt mid-explanation",
                        sub: "Jump in any time, like a real class.",
                      },
                      {
                        key: "daily_reminder" as const,
                        title: "Daily reminder",
                        sub: "A nudge to keep your daily study going.",
                      },
                    ].map((row) => (
                      <div key={row.key} className="flex items-center justify-between gap-4 px-1 py-3 border-t border-border-subtle first:border-t-0">
                        <div>
                          <b className="block font-bold text-[0.86rem] text-ink">{row.title}</b>
                          <span className="text-[0.74rem] text-ink-muted">{row.sub}</span>
                        </div>
                        <Switch
                          on={Boolean(profile?.[row.key] ?? true)}
                          onToggle={() => update({ [row.key]: !(profile?.[row.key] ?? true) })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                  <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted block mb-2">
                    Notifications
                  </span>
                  <div className="space-y-1">
                    {[
                      { key: "daily_reminder" as const, title: "Daily study reminder" },
                      { key: "notify_new_content" as const, title: "New content in your chapters" },
                      { key: "notify_product_updates" as const, title: "Product updates" },
                    ].map((row) => (
                      <div key={row.key} className="flex items-center justify-between gap-4 py-2.5 border-t border-border-subtle first:border-t-0">
                        <b className="font-bold text-[0.86rem] text-ink">{row.title}</b>
                        <Switch
                          on={Boolean(profile?.[row.key] ?? (row.key !== "notify_product_updates"))}
                          onToggle={() =>
                            update({ [row.key]: !(profile?.[row.key] ?? (row.key !== "notify_product_updates")) })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Your exam */}
              <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-script font-bold text-red-dark text-[0.92rem] -rotate-[0.5deg] inline-block">
                    Your exam
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[0.66rem] text-ink-muted border border-border-subtle rounded-full px-2.5 py-1">
                    🔒 Locked to your plan
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl grid place-items-center bg-orange/12 flex-none">
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink">
                      <path d="M5 4h11l3 3v13H5z" />
                      <path d="M9 9h6M9 13h6M9 17h3" />
                    </svg>
                  </span>
                  <div>
                    <b className="block font-bold text-[1.05rem] text-ink">
                      {profile?.target_exam === "NEET" ? "NEET" : "JEE Main"}
                    </b>
                    <span className="text-[0.72rem] text-ink-muted font-semibold">2027 attempt</span>
                  </div>
                </div>
                <span className="block text-[0.72rem] font-bold text-ink-muted uppercase tracking-wide mt-4 mb-1.5">
                  Subjects
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {subjects.map((s) => (
                    <span key={s} className="text-[0.76rem] font-semibold text-ink border border-border-subtle rounded-full px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[0.74rem] text-ink-muted mt-3">
                  You&apos;re subscribed per exam, so this can&apos;t be changed here.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
