"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { apiFetch, ApiError } from "@/lib/api";
import type { Database } from "@/lib/database.types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

interface ChapterOption {
  id: string;
  name: string;
}

interface QuestionOption {
  key: string;
  text: string;
}

interface QuestionPayload {
  question_id: string;
  question_text: string;
  question_type: string;
  options?: Record<string, string> | QuestionOption[] | null;
  chapter_name?: string;
  concept?: string;
  difficulty?: string;
  exhausted?: boolean;
  message?: string;
}

interface AnswerResult {
  is_correct: boolean;
  correct_option?: string | null;
  correct_value?: number | null;
  solution?: string | null;
}

interface PracticeStats {
  attempted: number;
  correct: number;
  accuracy: number;
}

interface PracticeClientProps {
  profile: ProfileRow;
}

export function PracticeClient({ profile }: PracticeClientProps) {
  // Controls state
  const [classLevel, setClassLevel] = useState<number>(
    profile.enrolled_class === 12 ? 12 : 11
  );
  const [subject, setSubject] = useState<string>("Physics");
  const [chapterId, setChapterId] = useState<string>("");
  const [chapters, setChapters] = useState<ChapterOption[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(1);

  // Question & Session state
  const [question, setQuestion] = useState<QuestionPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [exhausted, setExhausted] = useState<boolean>(false);

  // Answer & Selection state
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [numericalValue, setNumericalValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);

  // Explain Drona state
  const [explaining, setExplaining] = useState<boolean>(false);
  const [explainBanner, setExplainBanner] = useState<string | null>(null);

  // Session stats
  const [lifetimeStats, setLifetimeStats] = useState<PracticeStats>({
    attempted: 0,
    correct: 0,
    accuracy: 0,
  });
  const [sessionAttempted, setSessionAttempted] = useState<number>(0);
  const [sessionCorrect, setSessionCorrect] = useState<number>(0);

  // Load Lifetime Stats on Mount
  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await apiFetch<PracticeStats>("/practice/stats");
        if (stats) {
          setLifetimeStats(stats);
        }
      } catch (err) {
        console.error("Failed to load initial practice stats:", err);
      }
    }
    loadStats();
  }, []);

  // Fetch Chapters when Subject or Class changes
  useEffect(() => {
    let isMounted = true;

    async function loadChapters() {
      try {
        const { data, error } = await supabase
          .from("chapters")
          .select("id, name")
          .eq("subject", subject)
          .eq("class_level", classLevel)
          .order("name", { ascending: true });

        if (error) throw error;

        if (isMounted && data) {
          const mapped = data
            .filter((c): c is { id: string; name: string } => Boolean(c.name))
            .map((c) => ({ id: c.id, name: c.name }));
          setChapters(mapped);
        }
      } catch (err) {
        console.error("Error fetching chapters:", err);
        if (isMounted) setChapters([]);
      }
    }

    loadChapters();

    return () => {
      isMounted = false;
    };
  }, [subject, classLevel]);

  // Fetch Next Question
  const fetchNextQuestion = useCallback(
    async (overrideChapterId?: string) => {
      setLoading(true);
      setErrorMsg(null);
      setExhausted(false);
      setAnswerResult(null);
      setSelectedOption("");
      setNumericalValue("");
      setExplainBanner(null);

      const targetChapter =
        overrideChapterId !== undefined ? overrideChapterId : chapterId;

      try {
        const payload = await apiFetch<QuestionPayload>("/practice/next", {
          method: "POST",
          body: JSON.stringify({
            subject,
            class_level: String(classLevel),
            chapter_id: targetChapter || undefined,
          }),
        });

        if (payload.exhausted) {
          setExhausted(true);
          setQuestion(null);
        } else {
          setQuestion(payload);
        }
      } catch (err) {
        console.error("Error fetching next question:", err);
        if (err && typeof err === "object" && "message" in err && typeof (err as { message: unknown }).message === "string") {
          setErrorMsg((err as { message: string }).message);
        } else {
          setErrorMsg("Failed to connect to practice service. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    },
    [subject, classLevel, chapterId]
  );

  // Trigger initial fetch when subject, classLevel, or chapterId changes
  useEffect(() => {
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  // Submit Answer
  const handleRevealAnswer = async () => {
    if (!question || submitting || answerResult) return;

    const isNumerical = question.question_type === "numerical";

    if (isNumerical && !numericalValue.trim()) return;
    if (!isNumerical && !selectedOption) return;

    setSubmitting(true);
    setErrorMsg(null);

    const body: Record<string, unknown> = {
      question_id: question.question_id,
    };

    if (isNumerical) {
      body.chosen_value = parseFloat(numericalValue.trim());
    } else {
      body.chosen_option = selectedOption;
    }

    try {
      const result = await apiFetch<AnswerResult>("/practice/answer", {
        method: "POST",
        body: JSON.stringify(body),
      });

      setAnswerResult(result);
      setSessionAttempted((prev) => prev + 1);
      if (result.is_correct) {
        setSessionCorrect((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      if (err instanceof ApiError) {
        if (err.status === 409) {
          // Ungradeable numerical question -> skip silently to next question
          fetchNextQuestion();
          return;
        }
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to submit answer. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Explain with Drona Handler
  const handleExplainWithDrona = async () => {
    if (!question || explaining) return;
    setExplaining(true);
    setExplainBanner(null);

    try {
      await apiFetch("/practice/explain", {
        method: "POST",
        body: JSON.stringify({
          question_id: question.question_id,
          chosen_option: selectedOption || undefined,
          chosen_value: numericalValue ? parseFloat(numericalValue) : undefined,
        }),
      });
      setExplainBanner("Drona AI voice explanation for this question coming soon!");
    } catch (err) {
      if (err instanceof ApiError && err.status === 501) {
        setExplainBanner("Drona AI voice explanation for this question coming soon!");
      } else {
        setExplainBanner("Drona explanation is currently unavailable.");
      }
    } finally {
      setExplaining(false);
    }
  };

  // Normalize options for MCQ
  const getNormalizedOptions = (): QuestionOption[] => {
    if (!question?.options) return [];

    if (Array.isArray(question.options)) {
      return question.options;
    }

    if (typeof question.options === "object") {
      return Object.entries(question.options).map(([key, text]) => ({
        key,
        text: String(text),
      }));
    }

    return [];
  };

  const optionsList = getNormalizedOptions();

  // Calculate totals
  const totalAttempted = lifetimeStats.attempted + sessionAttempted;
  const totalCorrect = lifetimeStats.correct + sessionCorrect;
  const accuracyPercent =
    totalAttempted > 0
      ? Math.round((totalCorrect / totalAttempted) * 100)
      : 0;

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-6 animate-ml-rise">
        {/* Top Header Controls Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[2.2rem] font-bold tracking-tight text-ink">
                Practice Unlimited
              </h1>
              <p className="text-ink-light text-sm mt-0.5">
                Master JEE &amp; NEET with infinite exam-graded practice questions.
              </p>
            </div>

            {/* Mode Toggle: Unlimited Practice | Mock Test (Disabled) */}
            <div className="flex items-center gap-2 bg-white border border-border-subtle p-1.5 rounded-full shadow-xs self-start sm:self-auto">
              <button
                type="button"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-ink text-white shadow-xs"
              >
                Unlimited practice
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-ink-muted opacity-60 cursor-not-allowed">
                <span>Mock test</span>
                <span className="font-extrabold text-[0.55rem] tracking-wider uppercase bg-ink/10 px-1.5 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Controls Bar: Class Toggle, Subject Tabs, Chapter Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-4 shadow-ref-stat">
            <div className="flex flex-wrap items-center gap-3">
              {/* Class Toggle */}
              <div className="inline-flex gap-1 p-1 bg-[rgba(28,26,22,0.05)] rounded-full border border-border-subtle">
                {[11, 12].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      if (classLevel !== cls) {
                        setClassLevel(cls);
                        setChapterId("");
                        setQuestionIndex(1);
                      }
                    }}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                      classLevel === cls
                        ? "bg-white text-ink shadow-xs"
                        : "text-ink-light hover:text-ink"
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>

              {/* Subject Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {["Physics", "Chemistry", "Math", "Biology"].map((subj) => {
                  const isActive = subject === subj;
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        if (subject !== subj) {
                          setSubject(subj);
                          setChapterId("");
                          setQuestionIndex(1);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-orange text-dark-card shadow-xs"
                          : "text-ink-light hover:bg-ink/5"
                      }`}
                    >
                      {subj}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chapter Selector Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="chapter-select" className="text-xs font-bold text-ink-muted flex-none">
                Chapter:
              </label>
              <select
                id="chapter-select"
                value={chapterId}
                onChange={(e) => {
                  setChapterId(e.target.value);
                  setQuestionIndex(1);
                }}
                className="w-full sm:w-64 px-3 py-1.5 rounded-xl border border-border-subtle bg-cream-light text-xs font-bold text-ink focus:outline-none focus:border-orange transition-colors truncate"
              >
                <option value="">All chapters</option>
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Question Card (1.3fr) + Right Session Panel (1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[18px] items-start">
          {/* LEFT: Question Card Container */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                {subject} · Class {classLevel}
              </span>
              <span className="font-script font-bold text-orange text-[1.1rem] -rotate-0.5">
                Q {questionIndex} of ∞
              </span>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[22px] p-12 text-center shadow-ref-card space-y-3">
                <div className="w-8 h-8 border-3 border-orange border-t-transparent rounded-full animate-ml-spin mx-auto" />
                <p className="font-bold text-sm text-ink-light">Fetching next question...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && errorMsg && (
              <div className="bg-white border border-red-note/30 rounded-[22px] p-8 text-center shadow-ref-card space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-note/10 text-red-note grid place-items-center mx-auto text-xl font-bold">
                  !
                </div>
                <div>
                  <b className="block font-bold text-base text-ink mb-1">
                    Failed to load question
                  </b>
                  <p className="text-xs text-ink-light max-w-md mx-auto">{errorMsg}</p>
                </div>
                <button
                  type="button"
                  onClick={() => fetchNextQuestion()}
                  className="px-6 py-2.5 rounded-full bg-ink text-white font-bold text-xs shadow-xs hover:bg-ink/90 transition-colors"
                >
                  Retry →
                </button>
              </div>
            )}

            {/* Exhausted Pool State */}
            {!loading && !errorMsg && exhausted && (
              <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[22px] p-8 md:p-12 text-center shadow-ref-card space-y-4">
                <div className="w-12 h-12 rounded-full bg-orange/15 text-orange-dark grid place-items-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-xl text-ink">
                    You&apos;ve completed every question in this set!
                  </h3>
                  <p className="text-xs text-ink-light mt-1.5 max-w-md mx-auto leading-relaxed">
                    Great work! You have attempted all available questions for {subject} under your current filter. Try selecting another chapter or subject.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setChapterId("");
                      setQuestionIndex(1);
                    }}
                    className="px-5 py-2.5 rounded-full bg-orange text-dark-card font-bold text-xs shadow-xs hover:bg-orange-light transition-colors"
                  >
                    Clear chapter filter
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubject(subject === "Physics" ? "Chemistry" : "Physics");
                      setChapterId("");
                      setQuestionIndex(1);
                    }}
                    className="px-5 py-2.5 rounded-full border border-border-subtle bg-white text-ink font-bold text-xs hover:border-ink transition-colors"
                  >
                    Switch subject →
                  </button>
                </div>
              </div>
            )}

            {/* Question Card Content */}
            {!loading && !errorMsg && !exhausted && question && (
              <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[22px] p-6 md:p-8 shadow-ref-card space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-border-subtle pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-ink bg-cream-card px-3 py-1 rounded-full border border-border-subtle">
                      {question.chapter_name || question.concept || "Practice Question"}
                    </span>
                    {question.difficulty && (
                      <span className="font-extrabold text-[0.6rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2.5 py-1 rounded-full">
                        {question.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-base md:text-lg text-ink font-medium leading-relaxed">
                  {question.question_text}
                </div>

                {/* Question Inputs: MCQ vs Numerical */}
                {question.question_type === "numerical" ? (
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-ink-light">
                      Enter your numerical answer:
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={numericalValue}
                        onChange={(e) => setNumericalValue(e.target.value)}
                        disabled={Boolean(answerResult)}
                        placeholder="e.g. 14.5 or -2"
                        className="w-full max-w-xs px-4 py-3 rounded-xl border border-border-subtle bg-white text-base font-bold text-ink focus:outline-none focus:border-orange disabled:bg-cream-light transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    {optionsList.map((opt) => {
                      const isSelected = selectedOption === opt.key;
                      const isCorrectOpt =
                        answerResult?.correct_option?.trim().toLowerCase() ===
                        opt.key.trim().toLowerCase();
                      const isChosenOpt =
                        selectedOption.trim().toLowerCase() ===
                        opt.key.trim().toLowerCase();

                      let cardStyles =
                        "border-border-subtle bg-white text-ink hover:border-ink/30";

                      if (answerResult) {
                        if (isCorrectOpt) {
                          cardStyles =
                            "border-[#1C9B57] bg-[rgba(28,155,87,0.08)] text-[#1C1A16] font-semibold";
                        } else if (isChosenOpt && !answerResult.is_correct) {
                          cardStyles =
                            "border-[#DD4433] bg-[rgba(221,68,51,0.08)] text-[#1C1A16]";
                        } else {
                          cardStyles =
                            "border-border-subtle/50 bg-white/50 text-ink-light opacity-60";
                        }
                      } else if (isSelected) {
                        cardStyles =
                          "border-orange bg-cream-card text-ink font-bold shadow-xs";
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          disabled={Boolean(answerResult)}
                          onClick={() => setSelectedOption(opt.key)}
                          className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all ${cardStyles}`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg border grid place-items-center flex-none font-bold text-xs ${
                              answerResult && isCorrectOpt
                                ? "bg-[#1C9B57] border-[#1C9B57] text-white"
                                : answerResult && isChosenOpt && !answerResult.is_correct
                                ? "bg-[#DD4433] border-[#DD4433] text-white"
                                : isSelected
                                ? "bg-orange border-orange text-dark-card"
                                : "bg-white border-ink/20 text-ink-light"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="text-sm md:text-base leading-snug pt-0.5">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Answer Feedback & Solution Box */}
                {answerResult && (
                  <div className="space-y-4 pt-3 animate-ml-rise">
                    {/* Correct / Incorrect Banner */}
                    <div
                      className={`p-4 rounded-xl border flex items-center gap-3 ${
                        answerResult.is_correct
                          ? "bg-[rgba(28,155,87,0.1)] border-[rgba(28,155,87,0.3)] text-[#157A45]"
                          : "bg-[rgba(221,68,51,0.1)] border-[rgba(221,68,51,0.3)] text-[#C53A2B]"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full grid place-items-center font-bold text-xs text-white bg-current">
                        {answerResult.is_correct ? "✓" : "✕"}
                      </span>
                      <b className="text-sm font-bold">
                        {answerResult.is_correct
                          ? "Correct! Well done."
                          : question.question_type === "numerical"
                          ? `Incorrect. Correct value: ${answerResult.correct_value}`
                          : `Incorrect. Correct answer: Option ${answerResult.correct_option}`}
                      </b>
                    </div>

                    {/* Solution Box (with graceful empty state) */}
                    <div className="bg-[#FFFEFB] border border-[rgba(28,26,22,0.12)] rounded-xl p-5 shadow-xs space-y-2">
                      <b className="block font-bold text-xs text-ink uppercase tracking-wider">
                        Step-by-Step Solution
                      </b>
                      {answerResult.solution ? (
                        <p className="text-sm text-ink-light leading-relaxed whitespace-pre-line">
                          {answerResult.solution}
                        </p>
                      ) : (
                        <p className="text-xs text-ink-muted italic">
                          No detailed solution text provided for this question yet.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Explain Banner */}
                {explainBanner && (
                  <div className="p-3.5 rounded-xl bg-orange/15 border border-orange/30 text-ink text-xs font-semibold animate-ml-rise">
                    ℹ {explainBanner}
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
                  {!answerResult ? (
                    <button
                      type="button"
                      onClick={handleRevealAnswer}
                      disabled={
                        submitting ||
                        (question.question_type === "numerical"
                          ? !numericalValue.trim()
                          : !selectedOption)
                      }
                      className="px-6 py-3 rounded-full bg-orange text-dark-card font-bold text-sm shadow-ref-pill hover:bg-orange-light transition-all disabled:opacity-40 flex items-center gap-2"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-dark-card border-t-transparent rounded-full animate-ml-spin" />
                      ) : (
                        "Reveal answer"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleExplainWithDrona}
                      disabled={explaining}
                      className="px-5 py-2.5 rounded-full border border-border-subtle bg-white text-ink font-bold text-xs hover:border-ink transition-colors flex items-center gap-2"
                    >
                      {explaining ? (
                        <div className="w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-ml-spin" />
                      ) : (
                        "🎙 Explain this with Drona"
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setQuestionIndex((prev) => prev + 1);
                      fetchNextQuestion();
                    }}
                    className="px-6 py-3 rounded-full bg-ink text-white font-bold text-sm shadow-xs hover:bg-ink/90 transition-all flex items-center gap-2 ml-auto"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Session Panel */}
          <div className="space-y-4">
            {/* "This session" Card */}
            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[22px] p-6 shadow-ref-card space-y-4">
              <div className="flex items-center justify-between border-b border-dashed border-border-subtle pb-3">
                <b className="font-extrabold text-xs tracking-wider uppercase text-ink-muted">
                  This Session
                </b>
                <span className="text-xs font-bold text-ink-light">
                  {totalAttempted} Attempted
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#FBF8EF] border border-border-subtle/80 rounded-xl p-3">
                  <span className="block font-bold text-2xl text-ink">
                    {sessionAttempted}
                  </span>
                  <span className="text-[0.65rem] font-extrabold tracking-wider uppercase text-ink-muted">
                    Session Solved
                  </span>
                </div>
                <div className="bg-[#FBF8EF] border border-border-subtle/80 rounded-xl p-3">
                  <span className="block font-bold text-2xl text-[#157A45]">
                    {sessionCorrect}
                  </span>
                  <span className="text-[0.65rem] font-extrabold tracking-wider uppercase text-[#157A45]">
                    Session Correct
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-ink-light">Overall Accuracy</span>
                  <span className="text-ink">{accuracyPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-ink/10 overflow-hidden">
                  <div
                    className="h-full bg-orange transition-all duration-300"
                    style={{ width: `${accuracyPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* "Stuck or curious?" Card */}
            <div className="bg-gradient-to-br from-[#16130E] to-[#241e15] text-[#EFEBDD] border border-[#2a2419] rounded-[22px] p-6 shadow-ref-hero space-y-3">
              <span className="font-script font-bold text-orange text-sm inline-block -rotate-0.5">
                Stuck or curious?
              </span>
              <h4 className="font-bold text-base text-white">
                Learn concept out loud on the board with Monk
              </h4>
              <p className="text-xs text-[#C7C1B3] leading-relaxed">
                If a question topic feels weak, jump into Monk&apos;s live board lessons for a full step-by-step walkthrough.
              </p>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 font-bold text-xs px-4 py-2 rounded-full bg-orange text-dark-card hover:bg-orange-light transition-colors shadow-xs"
              >
                Go to lessons →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
