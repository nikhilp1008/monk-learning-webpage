# Monk Learning Web — Drona AI Tutor Frontend

Monk Learning Web is the Next.js (TypeScript) web interface for **Drona**, a voice-first, interactive AI tutor designed for Indian Class 11–12 high school students (JEE, NEET, and CBSE Boards).

The application provides a real-time, low-latency learning canvas featuring a progressive whiteboard, interactive Ask Sheet (option chips), live captions bar, push-to-talk voice interface, and Web Audio PCM playback queue.

---

## Table of Contents
1. [Tech Stack & Design Architecture](#1-tech-stack--design-architecture)
2. [Core Component Architecture](#2-core-component-architecture)
3. [Comprehensive History of Solved Frontend Issues](#3-comprehensive-history-of-solved-frontend-issues)
   - [3.1 Status Label Defaulting to "Listening" When Mic Was Idle](#31-status-label-defaulting-to-listening-when-mic-was-idle)
   - [3.2 TypeScript Interface Error Breaking Vercel Production Builds](#32-typescript-interface-error-breaking-vercel-production-builds)
   - [3.3 Ask Sheet Option Chips Wiring for "Samajh Aaya?" Check-ins](#33-ask-sheet-option-chips-wiring-for-samajh-aaya-check-ins)
   - [3.4 Sentence-Level Board Event Synchronization with Audio](#34-sentence-level-board-event-synchronization-with-audio)
4. [Known Limitations & Technical Debt](#4-known-limitations--technical-debt)
5. [Developer Guide & Vercel Deployment](#5-developer-guide--vercel-deployment)

---

## 1. Tech Stack & Design Architecture

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Vanilla CSS (Custom Design System with tokens, glassmorphism, dark/light modes, animated transitions)
- **Audio & Real-time**: Web Audio API (PCM queue decoder), WebSockets API
- **Mathematics Rendering**: KaTeX / MathJax LaTeX rendering engines

---

## 1.5 Directory & Folder Breakdown

Here is an explanatory guide to every primary directory in the frontend repository and what it does:

```text
monk-learning-web/
 ├── src/                      # Application source code
 │    ├── app/                 # Next.js App Router routes and page layouts
 │    │    ├── learn/          # Core live Drona tutoring canvas page (/learn)
 │    │    ├── dashboard/      # Student learning progress dashboard (/dashboard)
 │    │    ├── lessons/        # Subject chapter index & section browser (/lessons)
 │    │    ├── practice/       # Practice question solving interface (/practice)
 │    │    ├── onboarding/     # Initial student setup and persona selection
 │    │    ├── auth/           # OAuth login callbacks & Supabase session handlers
 │    │    └── login/          # User authentication login view
 │    ├── components/          # Reusable UI components
 │    │    ├── drona/          # Live Drona Tutoring Canvas components (SessionView, WhiteboardView, AskSheet)
 │    │    ├── practice/       # Practice question cards & solution step components
 │    │    └── ui/             # Core UI primitives (buttons, modals, badges, inputs)
 │    └── lib/                 # Core client libraries, utilities, & state managers
 │         └── drona/          # Client API & Web Audio engines (voice.ts, client.ts)
 ├── public/                   # Static web assets, media samples, SVG icons, and fonts
 ├── scripts/                  # Automated browser E2E test scripts & Playwright capture tools
 └── styles/                   # Global CSS design tokens, animations, and KaTeX overrides
```

### Folder Explanations

- **`src/app/`**: Contains Next.js App Router endpoints.
  - **`src/app/learn/page.tsx`**: The main live tutoring canvas page where Drona sessions run. Orchestrates topic selection, WebSocket connection, Ask Sheet rendering, and audio streaming.
  - **`src/app/lessons/`**: Displays chapter hierarchies, subtopic cards, and lesson preparation drawers for Physics, Chemistry, Biology, and Mathematics.
  - **`src/app/practice/`**: Practice question bank solver interface with step-by-step solutions.
- **`src/components/drona/`**: Contains specialized UI elements for the live Drona lesson screen:
  - `SessionView.tsx`: Manages top status badges, audio controls, transcript drawers, and layout bounds.
  - `WhiteboardView.tsx`: Renders formatted LaTeX formulas (KaTeX) and text note bullet points as Drona speaks.
  - `AskSheet.tsx`: Displays interactive option chips whenever Drona poses a question or check-in.
- **`src/lib/drona/`**:
  - `voice.ts`: Manages Web Audio API (`AudioContext`), PCM 16kHz audio buffer decoding, sentence queueing, WebSocket protocol handling, and microphone push-to-talk state.
  - `client.ts`: Supabase REST client for starting sessions, advancing subtopics, and fetching chapter plans.
- **`scripts/`**: Developer E2E verification utilities (Puppeteer/Playwright browser automation scripts for visual regression and Ask Sheet testing).
- **`public/`**: Serves static media assets, sound effects, fallback audio files, and brand icons.

---

## 2. Core Component Architecture

```text
src/
 ├── app/
 │   └── learn/page.tsx               # Main session orchestrator & topic selector
 ├── components/drona/
 │   ├── SessionView.tsx               # Primary live session container & status badge
 │   ├── WhiteboardView.tsx            # Progressive LaTeX/text board event renderer
 │   ├── AskSheet.tsx                  # Option chips container for questions & check-ins
 │   └── CaptionsBar.tsx               # Live spoken transcript captions
 └── lib/drona/
     ├── voice.ts                      # Web Audio PCM queue, WebSocket & mic manager
     └── client.ts                     # REST API client for sessions & chapters
```

### Component Roles
- **`SessionView.tsx`**: Renders session header bar, topic badge, live status indicator (`"Explaining concept"`, `"Waiting for your answer"`, `"Listening"`, `"Ready"`), whiteboard, and transcript logs.
- **`WhiteboardView.tsx`**: Displays student notes progressively. Events arrive with sequence numbers (`seq`), rendering definitions, key callouts, and LaTeX formulas.
- **`AskSheet.tsx`**: Mounts interactive option chips whenever Drona asks a check-in or question. Handles 2-chip layouts (`understanding`, `procedural`) and 3-chip layouts (`check`, `checkpoint`).
- **`voice.ts`**: Manages Web Audio `AudioContext`, buffers 16kHz binary PCM audio chunks, plays sentence-level speech sequentially, and handles push-to-talk microphone streaming.

---

## 3. Comprehensive History of Solved Frontend Issues

### 3.1 Status Label Defaulting to "Listening" When Mic Was Idle
- **The Problem**: When Drona finished speaking during a teaching turn, the top status badge displayed `"Listening"`, creating confusion as if the microphone was actively recording without student input.
- **Root Cause**: In `SessionView.tsx`, the fallback status selector checked `phase === "awaiting_answer"` vs `"Listening"`. If `phase` was `"teaching"` and audio finished playing, it defaulted to `"Listening"` regardless of microphone state.
- **The Solution**: Rebuilt `statusLabel` in `SessionView.tsx` with explicit state priority:
  ```typescript
  const statusLabel = !isConnected
    ? "Connecting..."
    : isTranscribing
    ? "Transcribing..."
    : voiceState?.hasTurnError
    ? "Something went wrong — retrying"
    : !hasAudioPlayed
    ? "Drona is preparing your lesson…"
    : isDronaSpeaking
    ? "Explaining concept"
    : isMuted
    ? "Muted"
    : isPaused
    ? "Paused"
    : phase === "awaiting_answer" || (subtopicOptions && subtopicOptions.length > 0)
    ? "Waiting for your answer"
    : voiceState?.isListening
    ? "Listening"
    : "Ready";
  ```

### 3.2 TypeScript Interface Error Breaking Vercel Production Builds
- **The Problem**: Local changes ran in dev mode, but Vercel production deployments failed during Next.js build compilation with:
  ```text
  ./src/components/drona/SessionView.tsx:111:19
  Type error: Property 'isRecording' does not exist on type 'VoiceClientState'.
  ```
  This caused Vercel to reject new commits (`881151b`), keeping production stuck on an older build.
- **Root Cause**: `SessionView.tsx` checked `voiceState?.isRecording`, but the property name defined in `VoiceClientState` in `src/lib/drona/voice.ts` was `isListening`.
- **The Solution**: Corrected the property reference to `voiceState?.isListening` in `SessionView.tsx`. Ran local `npm run build` to verify clean TypeScript compilation (0 errors), then deployed to Vercel Production via Vercel CLI (`commit 0c8ad1d`, Deployment `dpl_5EHhpbrCuJaoW4tDQADVMgP3yDzx`, status `READY`).

### 3.3 Ask Sheet Option Chips Wiring for "Samajh Aaya?" Check-ins
- **The Problem**: When Drona asked conversational check-ins (*"samajh aaya?"*, *"clear hai?"*), the speech finished but no option chips appeared on screen.
- **Root Cause**: WebSocket `state` frames emitted by the backend carried `question_type: "understanding"` and `check_options: ["Haan, samajh aaya", "Thoda dubara samjhao"]`, but the frontend `page.tsx` was only listening to `board_events` and missing state frame options.
- **The Solution**: Updated `page.tsx` and `voice.ts` to capture WebSocket `event: state` payloads (`commit 7750998`) and bind `check_options` directly to React state. Also updated `SessionView.tsx` to surface server `turn_error` events as user-facing UI toasts (`commit 4faee58`).

### 3.4 Sentence-Level Board Event Synchronization with Audio
- **The Problem**: Board notes appeared all at once at the end of a turn instead of appearing progressively as Drona spoke each sentence.
- **Root Cause**: Board events were dispatched independently from audio chunks.
- **The Solution**: Updated `voice.ts` to attach matching sentence `board_event` objects directly to incoming `audio_chunk` frames. When an audio sentence starts playing in the Web Audio context, its associated board event is written to the whiteboard canvas simultaneously.

---

## 4. Known Limitations & Technical Debt

1. **iOS Safari AudioContext Autoplay Policy**:
   - iOS Safari requires explicit user touch interaction to resume Web Audio `AudioContext`. If a session is launched without a tap, audio playback remains suspended until the user interacts with the canvas.
2. **Dynamic MathJax / KaTeX Reflow**:
   - Streaming complex multi-line LaTeX formulas can occasionally cause minor visual reflows as KaTeX renders formulas asynchronously on mobile viewports.
3. **WebSocket Fallback Latency**:
   - If the client network connection drops during a turn, the Web Socket automatically attempts reconnection with exponential backoff (1s to 15s).

---

## 5. Developer Guide & Vercel Deployment

### Local Development Setup
```bash
# Install dependencies
npm install

# Start Next.js development server (runs on http://localhost:3000)
npm run dev
```

### Production Build Verification
Per **AGENTS.md Standing Rule 3**, always verify local build compilation before pushing:
```bash
npm run build
```

### Production Deployment to Vercel
```bash
# Trigger production deployment via Vercel CLI
npx vercel --prod --yes
```

---

### Verification Status
- **Next.js Version**: `16.2.12` (Turbopack)
- **Local Build Status**: `✓ Compiled successfully (15/15 static pages)`
- **Vercel Production Deployment**: `READY` (`https://monk-learning-web.vercel.app`)
