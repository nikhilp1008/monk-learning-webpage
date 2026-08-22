"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setOnboardedCookie } from "@/lib/onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [displayName, setDisplayName] = useState<string>("");
  const [targetExam, setTargetExam] = useState<"JEE" | "NEET" | "Both">("JEE");
  const [enrolledClass, setEnrolledClass] = useState<number>(11);
  const [teachingLanguage, setTeachingLanguage] = useState<"english" | "hinglish">("hinglish");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStep(1);
        return;
      }

      setUserId(user.id);

      if (user.user_metadata?.full_name) {
        setDisplayName(user.user_metadata.full_name);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        router.push("/dashboard");
        return;
      }

      // User logged in, land on profile setup
      setStep(1);
    }

    checkAuth();
  }, [router]);

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      router.push("/login");
      return;
    }

    if (!displayName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const numericClass = Number(enrolledClass);

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        display_name: displayName.trim(),
        target_exam: targetExam,
        enrolled_class: numericClass,
        teaching_language: teachingLanguage,
      });

      if (error) {
        console.error("Error creating profile:", error);
        setErrorMsg(error.message);
        setSubmitting(false);
        return;
      }

      // Mirrors the cookie middleware.ts sets once it confirms a profile
      // exists -- setting it here too means the very next navigation (the
      // one we're about to trigger) already skips middleware's DB fallback
      // instead of paying for it once more before the cookie catches up.
      setOnboardedCookie(true);

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Unexpected error saving profile:", err);
      setErrorMsg("Failed to save setup. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cream-light animate-ml-rise">
      {/* LEFT COLUMN · Pitch Panel written on Ruled Notebook Paper */}
      <div className="relative overflow-hidden flex flex-col justify-between bg-ruled-pitch border-r border-border-subtle p-8 md:p-14 lg:p-[44px_64px_40px_92px]">
        {/* Red Vertical Margin Line */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-12 md:left-[60px] w-[1.5px] bg-red-note/30 pointer-events-none"
        />

        {/* Floating Math Expressions */}
        <span
          aria-hidden="true"
          className="absolute top-[22%] right-[8%] rotate-[4deg] font-script font-bold text-[1.15rem] text-ink/10 animate-ml-float pointer-events-none"
        >
          E = hν
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-[14%] right-[10%] -rotate-[5deg] font-script font-bold text-[1.05rem] text-orange/30 animate-ml-float pointer-events-none"
        >
          PV = nRT
        </span>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <svg viewBox="0 0 120 120" className="w-[46px] h-[46px] flex-none" fill="none">
            <circle cx="60" cy="60" r="36" stroke="#1C1A16" strokeWidth="11" strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="19" stroke="#1C1A16" strokeWidth="9" strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
            <circle cx="60" cy="60" r="6" className="fill-orange" />
          </svg>
          <span className="text-[1.62rem] leading-none tracking-[-0.015em]">
            <b className="font-extrabold text-ink">monk</b>
            <span className="font-medium text-ink-muted">learning</span>
          </span>
        </div>

        {/* Main Pitch & Benefit List */}
        <div className="relative z-10 my-auto py-10 max-w-lg space-y-8">
          <div>
            <h1 className="text-[2.65rem] leading-[1.08] tracking-[-0.03em] font-medium text-ink">
              A personal teacher who{" "}
              <span className="font-script font-bold text-red-note whitespace-nowrap">
                never sleeps.
              </span>
            </h1>
            <p className="text-ink-light text-base mt-3 leading-relaxed">
              Monk teaches JEE &amp; NEET out loud on a real board — in हिंदी, Hinglish or English — and stops the moment you raise your hand.
            </p>
          </div>

          {/* All 4 Benefit Rows */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <svg viewBox="0 0 120 120" className="w-5 h-5" fill="none">
                  <circle cx="60" cy="60" r="36" stroke="#1C1A16" strokeWidth="11" strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="6" className="fill-orange" />
                </svg>
              </span>
              <div>
                <b className="block font-bold text-[0.98rem] text-ink">Live classes on a real board</b>
                <span className="text-[0.84rem] text-ink-light">Monk writes every step as he speaks — pause any time.</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="14" rx="3" />
                  <circle cx="12" cy="13" r="3.2" />
                  <path d="M8 6l1.2-2h5.6L16 6" />
                </svg>
              </span>
              <div>
                <b className="block font-bold text-[0.98rem] text-ink">Snap any doubt</b>
                <span className="text-[0.84rem] text-ink-light">Photograph a question and get the worked-out answer in seconds.</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <span className="font-bold text-xl text-ink">∞</span>
              </span>
              <div>
                <b className="block font-bold text-[0.98rem] text-ink">Practice that never runs out</b>
                <span className="text-[0.84rem] text-ink-light">Unlimited questions, tuned to your weak chapters.</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 flex-none rounded-xl bg-white border border-border-subtle shadow-xs grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 4h12v16l-6-3-6 3z" />
                </svg>
              </span>
              <div>
                <b className="block font-bold text-[0.98rem] text-ink">Every class backed up</b>
                <span className="text-[0.84rem] text-ink-light">Sessions are auto-saved for 7 days — keep the good ones as notes.</span>
              </div>
            </div>
          </div>

          {/* LIVE NOW Note Card with Green Kalam Checkmark */}
          <div className="relative bg-white border-1.5 border-ink rounded-xl p-4 pl-9 shadow-ref-card max-w-sm">
            <span className="absolute top-0 bottom-0 left-6 w-[1.4px] bg-red-note/35" />
            <span className="absolute -top-2.5 left-3 bg-orange border border-ink rounded px-2 py-0.5 font-extrabold text-[0.56rem] tracking-wider uppercase text-ink">
              LIVE NOW
            </span>
            <span className="block font-script font-bold text-sm text-red-note -rotate-0.5">
              torque on a hinged rod
            </span>
            <span className="block font-extrabold text-base text-ink mt-1">
              τ = r × F = r F sin θ
              <span className="inline-block w-0.5 h-4 bg-orange ml-1 align-middle animate-ml-blink" />
            </span>
            <span className="block font-script font-bold text-[0.85rem] text-green-badge mt-1">
              push far, push perpendicular ✓
            </span>
          </div>
        </div>

        {/* All 3 Language Tag Pills */}
        <div className="relative z-10 flex items-center gap-2 flex-wrap text-xs text-ink-light">
          <span className="font-semibold px-3 py-1 rounded-full border border-border-subtle bg-white">
            हिंदी
          </span>
          <span className="font-semibold px-3 py-1 rounded-full border border-border-subtle bg-white">
            Hinglish
          </span>
          <span className="font-semibold px-3 py-1 rounded-full border border-border-subtle bg-white">
            English
          </span>
          <span className="font-script font-bold text-red-note text-sm ml-1 -rotate-0.5 inline-block">
            — padho apni bhasha mein.
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN · Form Panel with Progress Meter & Navigation */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-[430px] space-y-6">
          {/* Progress Meter Bar */}
          <div className="w-full space-y-2">
            <div className="flex gap-1.5">
              {[1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-orange" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <div className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              Step {step} of 2: {step === 1 ? "Study Profile" : "Preferences"}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-note/10 border border-red-note/30 text-red-note text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFinish} className="space-y-5">
            {step === 1 ? (
              <div className="space-y-5 animate-ml-rise">
                <div>
                  <h2 className="text-[1.55rem] font-bold tracking-[-0.02em] text-ink">
                    Set up your study profile
                  </h2>
                  <p className="text-ink-light text-sm mt-1">
                    Tell Monk your name, target exam and enrolled class.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-light mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Aarav Sharma"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-white text-sm text-ink focus:outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-light mb-2">
                    Target exam
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "JEE", label: "JEE Main & Adv" },
                      { id: "NEET", label: "NEET UG" },
                      { id: "Both", label: "Both" },
                    ].map((exam) => {
                      const isSelected = targetExam === exam.id;
                      return (
                        <button
                          key={exam.id}
                          type="button"
                          onClick={() => setTargetExam(exam.id as "JEE" | "NEET" | "Both")}
                          className={`py-3 px-4 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "border-orange bg-cream-card text-ink font-extrabold shadow-xs"
                              : "border-border-subtle text-ink-light hover:border-ink/20 font-medium"
                          }`}
                        >
                          <span className="text-sm">{exam.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-light mb-2">
                    Enrolled class
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[11, 12].map((cls) => {
                      const isSelected = enrolledClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setEnrolledClass(cls)}
                          className={`py-3 px-4 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "border-orange bg-cream-card text-ink font-extrabold shadow-xs"
                              : "border-border-subtle text-ink-light hover:border-ink/20 font-medium"
                          }`}
                        >
                          <span className="text-sm">Class {cls}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!displayName.trim()) {
                      setErrorMsg("Please enter your name.");
                      return;
                    }
                    setErrorMsg("");
                    setStep(2);
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-orange text-dark-card font-bold text-sm shadow-ref-pill hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 mt-2"
                >
                  Continue →
                </button>
              </div>
            ) : (
              <div className="space-y-5 animate-ml-rise">
                <div>
                  <h2 className="text-[1.55rem] font-bold tracking-[-0.02em] text-ink">
                    Teaching language preference
                  </h2>
                  <p className="text-ink-light text-sm mt-1">
                    Choose how Monk narrates your lessons on the board.
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: "hinglish", label: "Hinglish (Hindi + English explanation)" },
                      { id: "english", label: "English (Full English narration)" },
                    ].map((lang) => {
                      const isSelected = teachingLanguage === lang.id;
                      return (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => setTeachingLanguage(lang.id as "english" | "hinglish")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-orange bg-cream-card text-ink font-extrabold shadow-xs"
                              : "border-border-subtle text-ink-light hover:border-ink/20 font-medium"
                          }`}
                        >
                          <span className="text-sm block">{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-full border border-border-subtle text-ink font-semibold text-xs hover:border-ink"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 px-6 rounded-full bg-orange text-dark-card font-bold text-sm shadow-ref-pill hover:-translate-y-0.5 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-dark-card border-t-transparent rounded-full animate-ml-spin" />
                    ) : (
                      "Start learning with Monk →"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
