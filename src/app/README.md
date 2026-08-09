# 🌐 `src/app/` — Next.js App Router Routes & Page Views

The `src/app/` directory contains all route pages, layouts, and server actions for **Monk Learning Web**, built on Next.js 16 (App Router).

---

## 📂 Route Directory Map

```text
src/app/
 ├── learn/            # Core live Drona tutoring canvas (/learn)
 ├── dashboard/        # Student learning analytics & subject progress (/dashboard)
 ├── lessons/          # Chapter index & section browser (/lessons)
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

### 3. `/lessons`
- Subject selection drawer for Physics, Chemistry, Biology, and Mathematics.
- Displays chapter cards, subtopics, and lesson plan preview drawers.

---

> [!NOTE]
> All live lesson UI components (Whiteboard, Ask Sheet, Status Badges) are located inside [`src/components/drona/`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/components/drona/README.md).
