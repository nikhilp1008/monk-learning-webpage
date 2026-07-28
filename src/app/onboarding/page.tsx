"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState<string>("");
  const [targetExam, setTargetExam] = useState<"JEE" | "NEET">("JEE");
  const [enrolledClass, setEnrolledClass] = useState<number>(11);
  const [teachingLanguage, setTeachingLanguage] = useState<"english" | "hinglish">("hinglish");

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
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

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (!displayName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      // Ensure enrolled_class is sent strictly as a number (11 | 12)
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

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Unexpected error saving profile:", err);
      setErrorMsg("Failed to save setup. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light">
        <div className="flex flex-col items-center gap-3 text-ink-muted">
          <div className="w-8 h-8 border-3 border-orange border-t-transparent rounded-full animate-ml-spin" />
          <span className="text-sm font-semibold">Loading setup...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cream-light p-4 md:p-8">
      {/* Single Clean Onboarding Card */}
      <div className="w-full max-w-xl bg-white border border-border-subtle rounded-2xl md:rounded-[24px] p-6 md:p-10 shadow-md animate-ml-rise">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange" />
            <span className="font-extrabold text-[0.62rem] tracking-widest uppercase text-ink-muted">
              Student Setup
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-ink">
            Set up your study profile
          </h1>
          <p className="text-ink-light text-sm mt-1">
            Personalize your board syllabus, question targets, and audio language.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-note/10 border border-red-note/30 text-red-note text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Field 1: Full Name */}
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
              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-white text-base text-ink focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          {/* Field 2: Target Exam */}
          <div>
            <label className="block text-xs font-bold text-ink-light mb-2">
              Target exam
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "JEE", label: "JEE Main & Adv" },
                { id: "NEET", label: "NEET UG" },
              ].map((exam) => {
                const isSelected = targetExam === exam.id;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setTargetExam(exam.id as "JEE" | "NEET")}
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

          {/* Field 3: Enrolled Class (Sent strictly as number 11 | 12) */}
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

          {/* Field 4: Teaching Language */}
          <div>
            <label className="block text-xs font-bold text-ink-light mb-2">
              Teaching language
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "hinglish", label: "Hinglish (Hindi + EN)" },
                { id: "english", label: "English" },
              ].map((lang) => {
                const isSelected = teachingLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setTeachingLanguage(lang.id as "english" | "hinglish")}
                    className={`py-3 px-4 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "border-orange bg-cream-card text-ink font-extrabold shadow-xs"
                        : "border-border-subtle text-ink-light hover:border-ink/20 font-medium"
                    }`}
                  >
                    <span className="text-sm">{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-full bg-orange text-ink font-bold text-sm shadow-md hover:-translate-y-0.5 transition-transform disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-ml-spin" />
            ) : (
              "Start learning with Monk →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
