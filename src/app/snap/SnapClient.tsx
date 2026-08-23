"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  QuestionSheet,
  RefusalCard,
  RuledSheet,
  Solution,
  UnsureCard,
} from "@/components/SavedBoard";
import { DEFAULT_VOICE, getTutorName, loadVoicePreference } from "@/lib/drona/tutor";
import {
  MAX_QUESTIONS,
  rejectReason,
  reportDoubt,
  streamSnap,
  type ReadQuestion,
  type SnapFailure,
  type SnappedQuestion,
} from "@/lib/doubts";

export function SnapClient() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [teacher, setTeacher] = useState(() => getTutorName(DEFAULT_VOICE));
  useEffect(() => {
    setTeacher(getTutorName(loadVoicePreference()));
  }, []);

  const [busy, setBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Questions land one at a time as the stream delivers them, so the first
  // answer is on screen while the rest are still being solved.
  const [questions, setQuestions] = useState<SnappedQuestion[]>([]);
  // What was READ off the photo, delivered before the first solve starts. The
  // question card renders from this immediately; each answer fills in beside
  // it as it lands.
  const [readQuestions, setReadQuestions] = useState<ReadQuestion[]>([]);
  const [expected, setExpected] = useState<number | null>(null);
  const [streamNote, setStreamNote] = useState<string | null>(null);
  // The question currently being solved, printing live: thinking seconds while
  // the solver reasons, then each step as it is written. Never an answer —
  // that arrives only in the validated final card.
  const [live, setLive] = useState<{
    qIndex: number;
    seconds: number;
    steps: { n: number; text: string }[];
  } | null>(null);
  const [failure, setFailure] = useState<SnapFailure | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());

  // Object URLs are only valid while held; release the previous one on replace
  // and on unmount.
  const previewRef = useRef<string | null>(null);
  const setPreview = useCallback((url: string | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = url;
    setPreviewUrl(url);
  }, []);
  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const handleFile = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (!files.length) return;

      // One photo per submission; it may hold up to MAX_QUESTIONS questions,
      // which the server enforces when it transcribes.
      const file = files[0];
      const extraNote =
        files.length > 1
          ? `You picked ${files.length} files. ${teacher} reads one photo at a time — the first was used.`
          : null;

      const reason = rejectReason(file);
      if (reason) {
        setNotice(reason);
        return;
      }

      setNotice(extraNote);
      setFailure(null);
      setQuestions([]);
      setReadQuestions([]);
      setExpected(null);
      setStreamNote(null);
      setPreview(URL.createObjectURL(file));
      setBusy(true);

      await streamSnap(file, {
        onMeta: (m) => {
          setExpected(m.question_count);
          setStreamNote(m.note);
        },
        onQuestionsRead: (r) => setReadQuestions(r.questions),
        onThinking: (t) =>
          setLive((prev) =>
            prev && prev.qIndex === t.question_index
              ? { ...prev, seconds: t.seconds }
              : { qIndex: t.question_index, seconds: t.seconds, steps: [] }
          ),
        onStep: (st) =>
          setLive((prev) => {
            const base =
              prev && prev.qIndex === st.question_index
                ? prev
                : { qIndex: st.question_index, seconds: 0, steps: [] };
            if (base.steps.some((x) => x.n === st.n)) return base;
            return { ...base, steps: [...base.steps, { n: st.n, text: st.text }] };
          }),
        onStepsReset: (r) =>
          setLive((prev) =>
            prev && prev.qIndex === r.question_index ? { ...prev, steps: [] } : prev
          ),
        onQuestion: (q) => {
          setLive(null);
          setQuestions((prev) => [...prev, q]);
        },
        onError: (f) => setFailure(f),
      });
      setLive(null);
      setBusy(false);
    },
    [setPreview, teacher]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (busy) return;
    if (e.dataTransfer.files?.length) handleFile(e.dataTransfer.files);
  };

  const onPaste = useCallback(
    (e: ClipboardEvent) => {
      if (busy) return;
      const files = Array.from(e.clipboardData?.files || []);
      if (files.length) handleFile(files);
    },
    [busy, handleFile]
  );

  useEffect(() => {
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [onPaste]);

  const retake = () => {
    setPreview(null);
    setQuestions([]);
    setReadQuestions([]);
    setExpected(null);
    setStreamNote(null);
    setLive(null);
    setFailure(null);
    setNotice(null);
  };

  /**
   * "Ask a follow-up" seeds a free-text Drona session with the question, rather
   * than introducing a new session type. /learn reads the seed and starts from
   * it.
   */
  const askFollowUp = (questionText: string | null) => {
    // A refusal may have no transcribed text to seed with; the session still opens.
    if (questionText) {
      try {
        window.sessionStorage.setItem("monk.snap.followup", questionText);
      } catch {
        // Private mode: the session still opens, just without the seed.
      }
    }
    router.push("/learn?from=snap");
  };

  const handleReport = async (doubtId: string) => {
    try {
      await reportDoubt(doubtId);
      setReportedIds((prev) => new Set(prev).add(doubtId));
    } catch {
      setNotice("Could not send that report. Try again.");
    }
  };

  // One card per question read off the photo: the question on the left, its
  // answer (or live working) on the right. Built from readQuestions so the
  // question is on screen as soon as it is read, ~20-30s before its solve
  // lands. Falls back to the solved list if questions_read never arrived, so
  // an older API keeps rendering.
  const cards = readQuestions.length
    ? readQuestions.map((r) => ({
        key: `q${r.question_index}`,
        index: r.question_index,
        read: r as ReadQuestion | null,
        solved:
          questions.find((q) => q.question_index === r.question_index) ?? null,
      }))
    : questions.map((q) => ({
        key: q.id,
        index: q.question_index,
        read: null as ReadQuestion | null,
        solved: q as SnappedQuestion | null,
      }));

  const showCapture = !busy && cards.length === 0 && !failure;

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <div className="mb-6">
          <h1 className="text-[2.3rem] font-normal tracking-[-0.025em] leading-tight text-ink">
            Stuck on a question? Show it to {teacher}.
          </h1>
          <p className="text-ink-light text-base mt-2 max-w-[42rem]">
            Photograph a handwritten or printed question. {teacher} reads it and
            explains it, step by step.
          </p>
        </div>

        {notice && (
          <div className="mb-4 max-w-[640px] bg-[rgba(238,163,31,0.08)] border border-[rgba(238,163,31,0.4)] rounded-2xl px-4 py-3">
            <p className="text-[0.86rem] text-ink-light leading-relaxed">{notice}</p>
          </div>
        )}

        {/* ─── Capture ─── */}
        {showCapture && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`relative text-center py-14 px-6 bg-white border-[1.6px] border-dashed rounded-[22px] shadow-[0_14px_30px_-24px_rgba(28,26,22,0.4)] transition-colors ${
              dragging ? "border-orange bg-cream/40" : "border-[rgba(28,26,22,0.22)]"
            }`}
          >
            <span className="absolute top-3.5 left-3.5 w-[22px] h-[22px] border-2 border-orange border-r-0 border-b-0 rounded-tl-[6px]" />
            <span className="absolute top-3.5 right-3.5 w-[22px] h-[22px] border-2 border-orange border-l-0 border-b-0 rounded-tr-[6px]" />
            <span className="absolute bottom-3.5 left-3.5 w-[22px] h-[22px] border-2 border-orange border-r-0 border-t-0 rounded-bl-[6px]" />
            <span className="absolute bottom-3.5 right-3.5 w-[22px] h-[22px] border-2 border-orange border-l-0 border-t-0 rounded-br-[6px]" />

            <span className="w-[60px] h-[60px] mx-auto mb-4 rounded-full grid place-items-center bg-[#FBF8EF] border border-[rgba(28,26,22,0.1)]">
              <CameraIcon size={27} stroke="#1C1A16" />
            </span>

            <h3 className="font-bold text-[1.2rem] tracking-[-0.01em] text-ink">
              Snap or upload your questions
            </h3>
            <p className="text-ink-light text-[0.9rem] mt-1.5 mb-3.5">
              Clear, well-lit shots work best.{" "}
              <b className="text-ink">Up to {MAX_QUESTIONS} questions at a time.</b>
            </p>

            <div className="flex gap-3 justify-center flex-wrap mt-2">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 font-semibold text-[0.92rem] py-3 px-5 rounded-full border-none text-cream-light bg-ink shadow-[0_10px_24px_-12px_rgba(28,26,22,0.7)] cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                Take a photo
                <ArrowIcon />
              </button>
              <button
                onClick={() => uploadInputRef.current?.click()}
                className="inline-flex items-center gap-2 font-semibold text-[0.92rem] py-3 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
              >
                Upload an image
              </button>
            </div>

            <p className="text-[0.78rem] text-ink-muted mt-4 mx-auto max-w-[30rem]">
              Up to {MAX_QUESTIONS} at a time keeps {teacher} focused, so it reads
              and explains each one properly instead of rushing a whole page. You
              can also drag a file here, or paste one.
            </p>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFile(e.target.files);
                e.target.value = "";
              }}
            />
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFile(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        )}

        {/* ─── Reading the photo. Only until the questions themselves arrive;
             from then on each question's own card carries its progress. ─── */}
        {busy && cards.length === 0 && (
          <div className="flex items-center gap-3.5 bg-white border border-border-subtle rounded-2xl px-6 py-8 shadow-ref-card">
            <span className="w-5 h-5 rounded-full border-2 border-ink-dim border-t-ink animate-ml-spin" />
            <div>
              <b className="block font-bold text-[0.98rem] text-ink">
                {expected === null
                  ? `${teacher} is reading your photo…`
                  : `Found ${expected} question${expected === 1 ? "" : "s"} — working through the first…`}
              </b>
              <span className="block text-[0.84rem] text-ink-light mt-0.5">
                Answers appear one at a time, as soon as each is ready.
              </span>
            </div>
          </div>
        )}

        {/* ─── Whole submission failed: show what was unclear, offer a retake ─── */}
        {failure && !busy && failure.stage === "quota" && (
          <div className="max-w-[560px] rounded-2xl p-6 bg-white border border-border-subtle shadow-ref-card">
            <b className="block font-bold text-[1.02rem] text-ink mb-1.5">
              That&apos;s today&apos;s questions used up
            </b>
            <p className="text-[0.9rem] text-ink-light leading-relaxed">
              {failure.message}
            </p>
            {typeof failure.used_today === "number" && (
              <div className="mt-3.5">
                <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden">
                  <div
                    className="h-full bg-orange rounded-full"
                    style={{
                      width: `${Math.min(100, (failure.used_today / (failure.daily_limit || 50)) * 100)}%`,
                    }}
                  />
                </div>
                <span className="block text-[0.76rem] text-ink-muted font-semibold mt-1.5">
                  {failure.used_today} of {failure.daily_limit} used
                </span>
              </div>
            )}
            <button
              onClick={() => router.push("/doubts")}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-[0.88rem] py-2.5 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
            >
              Revisit your solved doubts →
            </button>
          </div>
        )}

        {failure && !busy && failure.stage !== "quota" && (
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 items-start">
            <PhotoCard previewUrl={previewUrl} readable={false} />
            <RefusalCard
              message={failure.message}
              remedy={failure.remedy}
              teacher={teacher}
              onRetake={failure.remedy === "retake" ? retake : undefined}
              onAskInSession={
                failure.remedy === "retake" ? undefined : () => askFollowUp(null)
              }
            />
          </div>
        )}

        {/* ─── Results ─── */}
        {questions.length > 0 && (
          <div className="flex flex-col gap-7">
            {streamNote && (
              <p className="text-[0.86rem] text-ink-light">{streamNote}</p>
            )}

            {questions.map((q, idx) => (
              <div key={q.id}>
                {(expected ?? questions.length) > 1 && (
                  <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-ink-muted mb-2">
                    Question {idx + 1} of {expected ?? questions.length}
                  </span>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 items-start">
                  {/* Left — YOUR QUESTION */}
                  <div className="bg-white border border-border-subtle rounded-[20px] p-5 shadow-[0_14px_30px_-22px_rgba(28,26,22,0.4)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                        Your question
                      </span>
                      {q.legible ? (
                        <span className="inline-flex items-center gap-1.5 font-bold text-[0.7rem] text-[#157A45]">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-badge" />
                          Read clearly
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-bold text-[0.7rem] text-red-dark">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-note" />
                          Not clear
                        </span>
                      )}
                    </div>

                    {idx === 0 && previewUrl && (
                      // A local object URL of the student's own file — next/image
                      // would add an optimizer round-trip for a preview that is
                      // discarded on retake.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt="The question you photographed"
                        className="w-full max-h-[260px] object-contain rounded-xl border border-[rgba(28,26,22,0.1)] bg-[#FBF8EF] mb-3.5"
                      />
                    )}

                    {q.question_text ? (
                      <QuestionSheet
                        questionText={q.question_text}
                        subject={q.subject}
                        topic={q.chapter}
                        stem={q.stem}
                        options={q.options}
                      />
                    ) : (
                      <p className="text-[0.88rem] text-ink-light">
                        {q.legibility_note || "This one could not be read."}
                      </p>
                    )}

                    <button
                      onClick={retake}
                      className="font-semibold text-[0.84rem] py-2.5 px-4 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink-light cursor-pointer mt-3.5 hover:border-ink hover:text-ink transition-colors"
                    >
                      ↺ Retake
                    </button>
                  </div>

                  {/* Right — DRONA EXPLAINS */}
                  <div className="flex flex-col gap-4">
                    {q.status === "solved" && (
                      <RuledSheet label={`${teacher.toUpperCase()} EXPLAINS`}>
                        <Solution
                          answer={q.answer}
                          steps={q.steps}
                          keyIdea={q.key_idea}
                        />
                      </RuledSheet>
                    )}

                    {q.status === "unsure" && (
                      <UnsureCard
                        reason={q.failure_reason}
                        steps={q.steps}
                        keyIdea={q.key_idea}
                        teacher={teacher}
                      />
                    )}

                    {q.status !== "solved" && q.status !== "unsure" && (
                      <RefusalCard
                        message={
                          q.legibility_note ||
                          q.failure_reason ||
                          "Try a clearer, well-lit shot."
                        }
                        remedy={q.remedy}
                        teacher={teacher}
                        onRetake={q.remedy === "retake" ? retake : undefined}
                        onAskInSession={
                          q.remedy === "retake"
                            ? undefined
                            : () => askFollowUp(q.question_text)
                        }
                      />
                    )}

                    {q.status === "solved" && (
                      <div className="flex gap-3 flex-wrap items-center">
                        <button
                          onClick={() => askFollowUp(q.question_text)}
                          className="inline-flex items-center gap-2 font-semibold text-[0.9rem] py-2.5 px-5 rounded-full border-none text-cream-light bg-ink shadow-[0_10px_24px_-12px_rgba(28,26,22,0.7)] cursor-pointer hover:-translate-y-0.5 transition-transform"
                        >
                          Ask a follow-up
                          <ArrowIcon />
                        </button>
                        <button
                          onClick={() => handleReport(q.id)}
                          disabled={reportedIds.has(q.id)}
                          title={`Did ${teacher} get this wrong? Report it`}
                          className={`inline-flex items-center gap-1.5 ml-auto font-semibold text-[0.82rem] py-2.5 px-3 rounded-full border-none bg-transparent cursor-pointer transition-colors ${
                            reportedIds.has(q.id)
                              ? "text-red-dark cursor-default"
                              : "text-ink-muted hover:text-red-dark"
                          }`}
                        >
                          <FlagIcon />
                          {reportedIds.has(q.id)
                            ? "Reported — thank you"
                            : "Report a mistake"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {busy && live && (
              <div>
                {(expected ?? 1) > 1 && (
                  <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-ink-muted mb-2">
                    Question {live.qIndex} of {expected}
                  </span>
                )}
                <RuledSheet label={`${teacher.toUpperCase()} IS WORKING`}>
                  {live.steps.length > 0 && (
                    <Solution
                      answer={null}
                      steps={live.steps}
                      keyIdea={null}
                    />
                  )}
                  <div className="flex items-center gap-2.5 text-ink-muted text-[0.86rem] mt-1">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-dim border-t-ink animate-ml-spin" />
                    {live.steps.length === 0
                      ? `${teacher} is thinking it through… ${live.seconds}s`
                      : "writing the next step…"}
                  </div>
                </RuledSheet>
              </div>
            )}

            {busy && !live && (
              <div className="flex items-center gap-3 text-ink-muted text-[0.88rem]">
                <span className="w-4 h-4 rounded-full border-2 border-ink-dim border-t-ink animate-ml-spin" />
                {expected && expected > questions.length
                  ? `Working through question ${questions.length + 1} of ${expected}…`
                  : "Finishing up…"}
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={retake}
                disabled={busy}
                className="inline-flex items-center gap-2 font-semibold text-[0.88rem] py-2.5 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors disabled:opacity-50"
              >
                ↺ Snap another
              </button>
              <button
                onClick={() => router.push("/doubts")}
                className="inline-flex items-center gap-2 font-semibold text-[0.88rem] py-2.5 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
              >
                See all my doubts →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PhotoCard({
  previewUrl,
  readable,
}: {
  previewUrl: string | null;
  readable: boolean;
}) {
  return (
    <div className="bg-white border border-border-subtle rounded-[20px] p-5 shadow-[0_14px_30px_-22px_rgba(28,26,22,0.4)]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
          Your question
        </span>
        <span
          className={`inline-flex items-center gap-1.5 font-bold text-[0.7rem] ${
            readable ? "text-[#157A45]" : "text-red-dark"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              readable ? "bg-green-badge" : "bg-red-note"
            }`}
          />
          {readable ? "Read clearly" : "Not read"}
        </span>
      </div>
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="The question you photographed"
          className="w-full max-h-[280px] object-contain rounded-xl border border-[rgba(28,26,22,0.1)] bg-[#FBF8EF]"
        />
      )}
    </div>
  );
}

function CameraIcon({ size = 14, stroke = "currentColor" }: { size?: number; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="3" />
      <circle cx="12" cy="13" r="3.2" />
      <path d="M8 6l1.2-2h5.6L16 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4" />
      <path d="M5 4c4.2-2 8.8 2 14 0v10c-5.2 2-9.8-2-14 0" />
    </svg>
  );
}
