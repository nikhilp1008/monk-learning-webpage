"use client";

import React, { useState, useRef, useEffect } from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import { MathText } from "@/components/MathText";
import { PremiumBoardEvent } from "@/components/PremiumBoardEvent";
import { TranscriptEntry } from "@/lib/drona/types";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_VOICE,
  getLanguageLabel,
  getTutorName,
  type SessionLanguage,
} from "@/lib/drona/tutor";
import { VoiceClientState } from "@/lib/drona/voice";

interface SessionViewProps {
  sessionTopic: string;
  /** Display name of the persona the student picked ("Veda" / "Drona"). */
  tutorName?: string;
  /** Session language — drives the captions-bar badge and input copy. */
  language?: SessionLanguage;
  boardLatex: string;
  boardEvents?: any[];
  transcript: TranscriptEntry[];
  segmentIndex: number;
  totalSegments: number;
  phase: "teaching" | "awaiting_answer" | "wrapup" | "complete";
  /** The chip the student tapped, awaiting or showing a verdict. */
  selectedOption?: string | null;
  /** The question that was actually asked. The sheet used to show the live
   *  caption instead, so a statement appeared above the answer chips. */
  questionText?: string | null;
  /** Server verdict on that chip — green for correct, red for incorrect. */
  answerResult?: "correct" | "partial" | "incorrect" | null;
  isStreaming: boolean;
  /** Live, still-changing STT text while the mic is held. Empty when idle. */
  partialTranscript?: string;
  voiceState?: VoiceClientState;
  subtopicOptions?: string[];
  onSendTurn: (utterance: string) => void;
  onEndSession: () => void;
  onTogglePause?: () => void;
  onStartPushToTalk?: () => void;
  onStopPushToTalk?: () => void;
}

export function SessionView({
  sessionTopic,
  tutorName,
  language = DEFAULT_LANGUAGE,
  boardLatex,
  boardEvents = [],
  transcript,
  segmentIndex,
  totalSegments,
  phase,
  selectedOption,
  questionText,
  answerResult,
  isStreaming,
  partialTranscript,
  voiceState,
  subtopicOptions,
  onSendTurn,
  onEndSession,
  onTogglePause,
  onStartPushToTalk,
  onStopPushToTalk,
}: SessionViewProps) {
  const [inputText, setInputText] = useState<string>("");
  const [holdDuration, setHoldDuration] = useState<number>(0);
  // Tracked here rather than read off voiceState.isListening, which is
  // `isPushToTalkActive && !isDronaSpeaking && …`. Any audio_chunk arriving
  // mid-hold flips isDronaSpeaking true, so the live-transcript box vanished
  // while the student was still talking — it read as the mic cutting out.
  // The mic itself keeps streaming in that case, so the box must too.
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const boardEndRef = useRef<HTMLDivElement>(null);
  const teacher = tutorName || getTutorName(DEFAULT_VOICE);

  const handlePttDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setHoldDuration(0);
    setIsHolding(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHoldDuration((prev) => prev + 0.1);
    }, 100);
    onStartPushToTalk?.();
  };

  const handlePttUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    setIsHolding(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onStopPushToTalk?.();
  };

  // Keyed on boardEvents, not transcript: this sentinel sits at the bottom of
  // the BOARD's scroll container, so it is board writes that need to pull it
  // into view. Watching the transcript only scrolled when the caption text
  // happened to change, which left new board lines sitting below the fold for
  // the rest of a long turn.
  useEffect(() => {
    boardEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [boardEvents]);

  // handlePttUp only ever fired from onPointerUp/Cancel/Leave — none of which
  // fire if the component unmounts mid-press (e.g. "End class" tapped while
  // still holding the mic) or the tab loses focus (a call/notification
  // backgrounding the page). Either left the hold-duration interval running
  // forever and the mic showing "Recording…" with nothing to stop it.
  useEffect(() => {
    const stopIfHeld = () => {
      if (!timerRef.current) return;
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsHolding(false);
      onStopPushToTalk?.();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stopIfHeld();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", stopIfHeld);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", stopIfHeld);
      stopIfHeld();
    };
    // onStopPushToTalk is passed fresh each render from an inline arrow in
    // page.tsx, so it's deliberately not a dependency — including it would
    // tear down and re-register these listeners (and call stopIfHeld) on
    // every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Typing mid-explanation is a raised hand: sendUtterance barge-ins the
    // local audio and the server aborts the in-flight turn, so submitting
    // while the teacher is speaking is now safe — and intended.
    const text = inputText.trim();
    if (text) {
      onSendTurn(text);
      setInputText("");
    }
  };

  // Locks the Ask Sheet's own free-text box the same way its MCQ chips lock:
  // once a chip is tapped, typing a second answer for the same question was
  // still possible in the gap before the next render disables anything.
  const answerLocked = Boolean(selectedOption);

  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const isDronaSpeaking = voiceState?.isSpeaking || false;
  const hasAudioPlayed = voiceState?.hasPlayedFirstChunk || false;
  const isMuted = voiceState?.isMuted || false;
  const isPaused = voiceState?.isPaused || false;
  const isConnected = voiceState?.isConnected ?? true;

  // B5: Explicit preparing state before first audio chunk plays.
  // Paused outranks speaking: pause suspends audio without ending it, so
  // isDronaSpeaking stays true and the label read "Explaining concept"
  // through the whole pause.
  const statusLabel = !isConnected
    ? "Connecting..."
    : isTranscribing
    ? "Transcribing..."
    : voiceState?.hasTurnError
    ? "Something went wrong — retrying"
    : isPaused
    ? "Paused"
    : !hasAudioPlayed
    ? `${teacher} is preparing your lesson…`
    : isDronaSpeaking
    ? "Explaining concept"
    : isMuted
    ? "Muted"
    : phase === "awaiting_answer" || (subtopicOptions && subtopicOptions.length > 0)
    ? "Waiting for your answer"
    : voiceState?.isListening
    ? "Listening"
    : "Ready";

  // Clean speech text for captions bar (B1 fix: never raw JSON)
  const rawSpeech = voiceState?.sessionCap || (
    [...transcript].reverse().find((t) => t.sender === "drona")?.text || `${teacher} is presenting the lesson...`
  );
  
  // Extract speech string if JSON envelope was passed
  let cleanSpeech = rawSpeech;
  if (cleanSpeech.startsWith("{") && cleanSpeech.includes('"speech"')) {
    try {
      const parsed = JSON.parse(cleanSpeech);
      cleanSpeech = parsed.speech || cleanSpeech;
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] min-h-[560px] w-full max-w-[1180px] mx-auto animate-ml-rise px-3 md:px-0 overflow-x-hidden">
      {/* ─── Header Bar ─── */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3.5 flex-none">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 font-bold text-[0.84rem] border border-[rgba(28,26,22,0.12)] rounded-full px-3.5 py-1.5 bg-white text-ink truncate max-w-[280px] sm:max-w-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none" />
            {sessionTopic || `Part ${segmentIndex} of ${totalSegments}`}
          </span>
          <span className="inline-flex items-center gap-1.5 font-extrabold text-[0.7rem] tracking-[0.12em] uppercase text-[#157A45]">
            <span className="w-2 h-2 rounded-full bg-[#1C9B57] animate-pulse flex-none" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEndSession}
            className="inline-flex items-center gap-2 font-bold text-[0.86rem] py-2 px-4 rounded-full border-[1.4px] border-[rgba(221,68,51,0.4)] bg-[rgba(221,68,51,0.05)] text-[#C53A2B] hover:bg-[#DD4433] hover:border-[#DD4433] hover:text-white transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={11} height={11} fill="currentColor">
              <rect x={5} y={5} width={14} height={14} rx={2.5} />
            </svg>
            End class
          </button>
        </div>
      </div>

      {/* ─── Whiteboard Area (B6: Board Overflow Fix) ─── */}
      <div className="relative flex-1 min-h-0 flex flex-col mb-3 max-w-full overflow-hidden">
        {/* Same board shell the lessons player uses, via the shared tokens
            rather than a hand-copy of their values: bg-ruled-board and
            shadow-ref-board are byte-identical to the literals that used to
            sit here, and now the two boards re-theme together instead of
            drifting apart. sm:pl-[52px] restores the lessons gutter — 16px
            of space between the red margin line and the first character. */}
        <div className="relative flex flex-col flex-1 min-h-0 bg-ruled-board border-[1.5px] border-ink rounded-2xl p-4 sm:p-5 pl-10 sm:pl-[52px] shadow-ref-board max-w-full overflow-hidden">
          {/* Red margin line */}
          <span aria-hidden="true" className="absolute top-5 bottom-5 left-7 sm:left-9 w-[1.4px] bg-red-note/35 pointer-events-none" />

          {/* Board Header */}
          <div className="flex items-center gap-2.5 mb-3 flex-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none animate-pulse" />
            <span className="font-bold text-[0.88rem] tracking-[-0.01em] truncate text-ink">
              The board · {sessionTopic || `Segment ${segmentIndex}`}
            </span>
          </div>

          {/* Board Content (B2 & B6: Line-by-line KaTeX & wrapped prose) */}
          {/* No space-y here on purpose. PremiumBoardEvent authors its own
              asymmetric rhythm per kind — mt-4/mb-2 on a heading, my-1.5 on
              prose, my-3 on a margin note — which is what gives the lessons
              board its handwritten cadence. A uniform gap flattened all of
              that into evenly-spaced rows. */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 max-w-full">
            {boardEvents && boardEvents.length > 0 ? (
              boardEvents.map((evt, idx) => (
                <PremiumBoardEvent key={idx} event={evt} animate={idx === boardEvents.length - 1} />
              ))
            ) : boardLatex ? (
              <div className="py-1 max-w-full overflow-x-hidden whitespace-pre-wrap">
                <KaTeXRenderer
                  latex={boardLatex}
                  displayMode={true}
                  className="text-ink text-sm sm:text-base font-semibold leading-relaxed"
                />
              </div>
            ) : (
              <div className="text-ink-muted text-sm italic">Board will update as {teacher} speaks...</div>
            )}
            <div ref={boardEndRef} />
          </div>
        </div>

        {/* ─── Ask Sheet Overlay — Ported 1:1 from design-reference/index.html (lines 620–643) ───
            Opens only when there are real chips to show. An awaiting_answer
            phase with no chips is a transitional/broken state — opening the
            sheet then showed the live caption as a fake "question". */}
        {subtopicOptions && subtopicOptions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(380px, 85%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              border: "1.5px solid #1C1A16",
              borderRadius: "16px",
              padding: "22px 22px 18px",
              boxShadow: "-28px 0 48px -34px rgba(28,26,22,.5)",
              animation: "mlSheetIn .45s cubic-bezier(.2,.7,.2,1)",
              overflowY: "auto",
            }}
          >
            {/* Header / Quiz Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flex: "none" }}>
              <span style={{
                padding: "3px 8px",
                borderRadius: "9999px",
                background: phase === "awaiting_answer" ? "#FCFAF4" : "#F4F6FB",
                border: `1px solid ${phase === "awaiting_answer" ? "#EEA31F" : "#3B82F6"}`,
                fontWeight: 800,
                fontSize: ".62rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: phase === "awaiting_answer" ? "#9A6A12" : "#1D4ED8"
              }}>
                {phase === "awaiting_answer" ? "⚡ CHECKPOINT QUIZ" : "💡 SUGGESTED RESPONSES"}
              </span>
              <span style={{ fontSize: ".75rem", color: "#6E685C", fontWeight: 500 }}>
                {phase === "awaiting_answer" ? "Tap an option to answer:" : "Select an option to respond:"}
              </span>
              {answerResult && (
                <span
                  data-testid="answer-verdict"
                  data-verdict={answerResult}
                  style={{
                    marginLeft: "auto",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontWeight: 800,
                    fontSize: ".68rem",
                    letterSpacing: ".04em",
                    background: answerResult === "correct" ? "#E4F3EA" : answerResult === "partial" ? "#FCF4E0" : "#FBEAE7",
                    color: answerResult === "correct" ? "#0F5B33" : answerResult === "partial" ? "#7A5210" : "#8E2317",
                    border: `1px solid ${answerResult === "correct" ? "#1C9B57" : answerResult === "partial" ? "#EEA31F" : "#DD4433"}`,
                  }}
                >
                  {answerResult === "correct" ? "✓ Correct" : answerResult === "partial" ? "~ Partly right" : "✕ Not quite"}
                </span>
              )}
            </div>

            {/* Question Text — through MathText, like the options below it.
                The question is pulled from the SPOKEN sentence, so it arrives
                as words ("3 times x squared plus 2"); when the model writes any
                of it as notation instead, rendering it raw put source in front
                of the student while the chips right underneath rendered
                properly. */}
            <p style={{ fontSize: "1rem", lineHeight: 1.5, fontWeight: 600, marginBottom: "14px", flex: "none", color: "#1C1A16" }}>
              {questionText || cleanSpeech.length > 20 ? (
                <MathText content={questionText || cleanSpeech} />
              ) : (
                "Select an option or type your response below:"
              )}
            </p>

            {/* MCQ Quiz Cards (A, B, C, D) */}
            {subtopicOptions && subtopicOptions.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "none" }}>
                {subtopicOptions.map((optionText, idx) => {
                  const letters = ["A", "B", "C", "D"];
                  const letter = letters[idx % letters.length];

                  // Verdict styling. Only the chip the student actually tapped
                  // is coloured; the rest stay neutral so the answer key for a
                  // question is never revealed by elimination.
                  const isChosen = selectedOption === optionText;
                  const verdict = isChosen ? answerResult : null;
                  const awaitingVerdict = isChosen && !answerResult;
                  const locked = Boolean(selectedOption);

                  const VERDICT_STYLES = {
                    correct: { border: "#1C9B57", bg: "#E4F3EA", badge: "#1C9B57", text: "#0F5B33", mark: "✓" },
                    partial: { border: "#EEA31F", bg: "#FCF4E0", badge: "#B87A14", text: "#7A5210", mark: "~" },
                    incorrect: { border: "#DD4433", bg: "#FBEAE7", badge: "#DD4433", text: "#8E2317", mark: "✕" },
                  } as const;
                  const v = verdict ? VERDICT_STYLES[verdict] : null;

                  return (
                    <button
                      key={idx}
                      data-testid="ask-sheet-option"
                      data-option-state={verdict ? verdict : awaitingVerdict ? "pending" : "idle"}
                      disabled={locked}
                      aria-disabled={locked}
                      onClick={() => {
                        if (locked) return;
                        onSendTurn(optionText);
                        setInputText("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        border: `1.5px solid ${v ? v.border : awaitingVerdict ? "#1C1A16" : "rgba(28,26,22,.14)"}`,
                        background: v ? v.bg : awaitingVerdict ? "#FCFAF4" : "#fff",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: ".88rem",
                        textAlign: "left",
                        color: v ? v.text : "#1C1A16",
                        cursor: locked ? "default" : "pointer",
                        opacity: locked && !isChosen ? 0.45 : 1,
                        transition: "all 0.2s cubic-bezier(.2,.7,.2,1)"
                      }}
                      onMouseEnter={(e) => {
                        if (locked) return;
                        e.currentTarget.style.borderColor = "#1C1A16";
                        e.currentTarget.style.background = "#FCFAF4";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        const badge = e.currentTarget.querySelector("span.mcq-badge") as HTMLElement;
                        if (badge) {
                          badge.style.background = "#EEA31F";
                          badge.style.color = "#1C1A16";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (locked) return;
                        e.currentTarget.style.borderColor = "rgba(28,26,22,.14)";
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.transform = "translateY(0)";
                        const badge = e.currentTarget.querySelector("span.mcq-badge") as HTMLElement;
                        if (badge) {
                          badge.style.background = "#1C1A16";
                          badge.style.color = "#fff";
                        }
                      }}
                    >
                      <span
                        className="mcq-badge"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: v ? v.badge : "#1C1A16",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: ".75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: "none",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {v ? v.mark : letter}
                      </span>
                      <span style={{ flex: 1 }}>
                        {/* Chips are prose, not maths. Passing the whole option
                            through KaTeX made it parse "They hit at the same
                            time" as an expression and paint the unparseable
                            parts in its red error colour. MathText renders only
                            $…$ spans as maths and leaves words alone. */}
                        <MathText content={optionText} />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (answerLocked) return;
                if (inputText.trim()) {
                  onSendTurn(inputText.trim());
                  setInputText("");
                }
              }}
              style={{ display: "flex", gap: "8px", marginTop: "12px", flex: "none" }}
            >
              <input
                placeholder="or type your answer…"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={answerLocked}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: answerLocked ? "#F4EFE3" : "#fff",
                  border: "1.4px solid rgba(28,26,22,.14)",
                  borderRadius: "99px",
                  padding: "9px 15px",
                  fontFamily: "inherit",
                  fontSize: ".86rem",
                  color: "#1C1A16",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                aria-label="Send answer"
                disabled={answerLocked}
                style={{
                  width: "38px",
                  height: "38px",
                  flex: "none",
                  borderRadius: "50%",
                  border: "none",
                  background: "#1C1A16",
                  opacity: answerLocked ? 0.4 : 1,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer"
                }}
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#FCFAF4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <span style={{ flex: 1 }} />

            {/* Bottom Encouragement Caption */}
            <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: ".9rem", color: "#9C988C", textAlign: "center", marginTop: "14px", flex: "none" }}>
              guessing is allowed — that&apos;s how we learn
            </p>
          </div>
        )}
      </div>

      {/* ─── Captions Bar (B1: Clean Speech Text) ─── */}
      <div className="flex items-center gap-3 bg-[#211C15] text-[#EFEBDD] border border-[#2a2419] rounded-[14px] py-2.5 px-4 sm:px-5 flex-none mb-2 overflow-hidden max-w-full">
        <span className="font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#EEA31F] flex-none">
          {getLanguageLabel(language)}
        </span>
        {/* Wrap rather than truncate: this is the student's caption of what is
            being said, so cutting it off with "…" loses the sentence. Capped at
            3 lines so the dock never grows unbounded. */}
        <span
          className="min-w-0 flex-1 text-[0.98rem] leading-snug font-medium"
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {cleanSpeech}
          {isDronaSpeaking && (
            <span className="inline-block w-0.5 h-[1.05em] bg-[#EEA31F] ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {/* Live transcription of the student's own voice while the mic is held.
          The server has always streamed these partials; without somewhere to
          show them a student had no evidence they were being heard until the
          whole turn came back, which read as the mic having failed. Rendered
          only while actually listening, so a stale line can't sit on screen. */}
      {isHolding && (
        <div className="flex items-start gap-2.5 bg-[#FCF4E0] border border-[rgba(238,163,31,0.45)] rounded-[14px] py-2 px-3.5 mb-2 flex-none max-w-full overflow-hidden">
          <span className="flex-none mt-[3px] w-1.5 h-1.5 rounded-full bg-[#DD4433] animate-pulse" aria-hidden="true" />
          <span
            className="min-w-0 flex-1 text-[0.92rem] leading-snug text-[#1C1A16]"
            aria-live="polite"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {partialTranscript?.trim()
              ? partialTranscript
              : (
                // Two different silences look identical to a student: the mic
                // working but no words yet, and live streaming being
                // unavailable so nothing will EVER appear until they release.
                // After ~1.5s of holding with no partial, say which one it is
                // instead of showing "Listening…" forever.
                <span className="text-[#9C988C] italic">
                  {holdDuration > 1.5 ? "Recording — your words appear when you release" : "Listening…"}
                </span>
              )}
          </span>
        </div>
      )}

      {/* ─── Simplified Command Dock (Directive 5 & 6) ─── */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] py-2 px-3 sm:px-4 flex-none shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)] max-w-full overflow-hidden">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-none min-w-0">
          <span className="w-9 h-9 sm:w-10 sm:h-10 flex-none rounded-[12px] bg-[#F4EFE3] border border-[rgba(28,26,22,0.08)] grid place-items-center">
            <svg viewBox="0 0 120 120" width={22} height={22} fill="none" className="animate-pulse">
              <circle cx={60} cy={60} r={36} stroke="#1C1A16" strokeWidth={11} strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
              <circle cx={60} cy={60} r={19} stroke="#1C1A16" strokeWidth={9} strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
              <circle cx={60} cy={60} r={6} fill="#EEA31F" />
            </svg>
          </span>
          <span className="min-w-0 hidden md:block">
            <span className="block font-extrabold text-[0.88rem] tracking-[-0.01em] text-[#1C1A16] leading-tight truncate">
              {statusLabel}
            </span>
          </span>
        </div>

        {/* Text Input for Answers (Directive 6: Always available — typing
            mid-explanation barge-ins the teacher, like raising a hand). */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-0 mx-1">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={phase === "awaiting_answer" ? "Your answer…" : `Ask ${teacher} something…`}
            className="w-full bg-[#FCFAF4] border border-[rgba(28,26,22,0.14)] rounded-full py-1.5 px-3.5 text-[0.82rem] text-ink outline-none focus:border-[#EEA31F] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 flex-none rounded-full bg-[#1C1A16] grid place-items-center cursor-pointer disabled:opacity-40 hover:bg-[#2C2A26] transition-colors"
          >
            <svg viewBox="0 0 16 16" width={13} height={13} fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#FCFAF4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* Controls: Push-To-Talk Mic & Pause/Resume (Directive 5) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-none">
          {/* Hold to Speak Mic Button (Primary PTT control) */}
          <button
            onPointerDown={handlePttDown}
            onPointerUp={handlePttUp}
            onPointerCancel={handlePttUp}
            onPointerLeave={handlePttUp}
            title={`Hold to speak (Interrupts ${teacher} if speaking)`}
            className={`inline-flex items-center gap-1.5 font-bold text-[0.74rem] sm:text-xs py-1.5 px-3.5 rounded-full border transition-all select-none cursor-pointer ${
              voiceState?.isListening
                ? "bg-[#DD4433] text-white border-[#DD4433] scale-105 shadow-[0_0_16px_rgba(221,68,51,0.7)] animate-pulse"
                : "bg-[#1C1A16] text-white border-[#1C1A16] hover:bg-[#2C2A26]"
            }`}
          >
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
            {voiceState?.isListening ? `Recording ${holdDuration.toFixed(1)}s` : "Hold to speak"}
          </button>

          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
            aria-label="Pause or resume class"
            title={isPaused ? "Resume class" : "Pause class"}
            className="w-8 h-8 sm:w-[42px] sm:h-[42px] flex-none rounded-full border-[1.4px] border-[rgba(28,26,22,0.16)] bg-white grid place-items-center cursor-pointer hover:border-[#1C1A16] transition-colors"
          >
            {isPaused ? (
              <svg viewBox="0 0 24 24" width={14} height={14} fill="#1C1A16">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#1C1A16" strokeWidth={2} strokeLinecap="round">
                <path d="M9 5v14M15 5v14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


