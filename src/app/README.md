# 🌐 `src/app/` — Next.js App Router Routes & Page Views

The `src/app/` directory contains all route pages, layouts, and server actions for **Monk Learning Web**, built on Next.js 16 (App Router).

---

## 📂 Route Directory Map

```text
src/app/
 ├── learn/            # Core live Drona tutoring canvas (/learn)
 ├── dashboard/        # Student learning analytics & subject progress (/dashboard)
 ├── mocks/            # Mock tests: gate, live paper, report (/mocks)
 ├── textbooks/        # Textbook shelf, chapters and reader (/textbooks)
 ├── practice/         # Practice question bank & step-by-step solver (/practice)
 ├── onboarding/       # Student grade, subject, & tutor persona setup
 ├── auth/             # Supabase OAuth login callbacks
 └── login/            # User authentication view
```

---

## 🛠️ Key Routes Overview

### 1. `/learn` ([`src/app/learn/page.tsx`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/app/learn/page.tsx))
- The primary live session canvas.
- Renders the header bar, topic selector drawer, dynamic whiteboard, captions bar, Ask Sheet option chips, and push-to-talk microphone.
- Orchestrates client Web Audio PCM streaming and WebSocket connection state.

### 2. `/dashboard`
- Displays subject mastery scores, completed Drona sessions, diagnostic misconception counts, and recommendation cards.

### 3. `/mocks` and `/textbooks`
- `/mocks`: the unlock gate, the live paper and its report; the same `/mock/*` API the phone uses.
- `/textbooks`: subject shelf, chapter lists and the block reader for the written chapters.

(There is no `/lessons` browser: chapters are started from `/learn`, as on the phone.)

---

> [!NOTE]
> All live lesson UI components (Whiteboard, Ask Sheet, Status Badges) are located inside [`src/components/drona/`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/components/drona/README.md).
