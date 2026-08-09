# 🎨 `src/components/drona/` — Live Tutoring Canvas Components

The `src/components/drona/` directory contains all React components powering the **Drona Live Tutoring Screen**. It includes the main canvas layout, progressive whiteboard renderer, Ask Sheet option chips, status badges, and spoken transcript captions.

---

## 📂 Component Registry

| Component File | Role & Features | Sub-components |
|---|---|---|
| [`SessionView.tsx`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/components/drona/SessionView.tsx) | Primary session screen container & status badge selector | Status badge, topic pill, exit button |
| [`WhiteboardView.tsx`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/components/drona/WhiteboardView.tsx) | Progressive LaTeX/text board event renderer | KaTeX math display, key callout cards |
| [`AskSheet.tsx`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/components/drona/AskSheet.tsx) | Interactive option chips container for questions & check-ins | 2-chip & 3-chip option buttons |
| `CaptionsBar.tsx` | Live spoken transcript text bar | Animated audio equalizer dots |

---

## 🎯 Status Badge Logic (`SessionView.tsx`)

The top status badge indicates session activity based on state priorities:

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

---

> [!IMPORTANT]
> **Ask Sheet Rendering**: Whenever `phase === "awaiting_answer"` or `subtopicOptions` has items, `AskSheet.tsx` mounts immediately with option chips (`["Haan, samajh aaya", "Thoda dubara samjhao"]` for check-ins, or 3 options for content checks).
