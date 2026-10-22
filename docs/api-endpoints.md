# API endpoint map — who calls what (2026-10-19)

Source of truth: `monk-learning-api/app/routers/*.py` and `app/main.py` (76 routes incl. admin).
Columns: **M** = monk-learning-mobile calls it, **W** = this web app calls it.
Verified by grep of both clients; the web column was re-checked by hand for Drona
(the first automated pass missed template-literal URLs).

## Student-facing

| Method | Path | Purpose | M | W |
|---|---|---|---|---|
| GET | `/progress` | Monk Score, per-subject/chapter mastery, headroom, recommendations | Y | Y |
| POST | `/practice/next` | Next question. Body: `exam`, `class_level`, `subject?`, **`chapter_id?`** | Y | Y (no `chapter_id` yet) |
| POST | `/practice/answer` | Grade an answer, returns solution | Y | Y |
| GET | `/practice/stats` | Lifetime attempted/correct/accuracy | Y | Y |
| POST | `/practice/explain` | Start a Drona explanation of a question | Y | Y |
| POST | `/practice/{qid}/ask` · `/ask-voice` · `/speak-stream` | Follow-up on a question (text / voice / TTS) | Y | Y |
| GET | `/mock/status` | Unlock gate numbers + waiting paper | Y | Y |
| POST | `/mock/paper` | Build a paper (403 `mock_locked` body when not earned) | Y | Y |
| GET | `/mock/active` | Unfinished paper + server `seconds_left` | Y | Y |
| POST | `/mock/{run}/submit` | Submit answers, flags, per-question time | Y | Y |
| GET | `/mock/{run}/review` | Full finished-paper report, any device | Y | Y |
| GET | `/mock/runs` | History with score summaries | Y | Y |
| POST | `/doubts` · `/doubts/stream` | Snap a question (blocking / SSE) | Y | Y |
| GET | `/doubts` · `/doubts/{id}` | List / open a doubt | Y | Y |
| POST | `/doubts/{id}/ask` · `/ask-voice` · `/speak` · `/speak-stream` | Follow-ups and TTS | Y | Y |
| POST | `/doubts/{id}/report` | Report a bad solution | Y | Y |
| DELETE | `/doubts/{id}` | Delete a doubt | Y | Y |
| POST/GET/DELETE | `/notes`, `/notes/{id}` | Class notes | Y | Y |
| GET | `/drona/catalogue` | Subject/chapter/topic tree | Y | Y |
| POST | `/drona/topic/check` | Is this topic teachable | Y | Y |
| POST | `/drona/session/start` · `{id}/scope` · `{id}/end` | Class lifecycle | Y | Y |
| POST | `/drona/session/{id}/turn` | HTTP turn (mobile fallback; web uses WS only) | Y | – |
| WS | `/drona/session/{id}/live` | Live class transport | Y | Y |
| GET | `/drona/chapter/{id}/figures` | Stored board figures for a chapter | Y | – |
| GET/POST | `/drona/persona` | Teacher persona (Drona/Vedha) sync | Y | Y |
| POST | `/doubt-of-day/chat` | Chat over the doubt of the day | – | Y |
| POST | `/events` | Product analytics events | Y | – |
| POST | `/reports` | Report-a-mistake from snap / class / practice | Y | Y |
| POST | `/account/erase` | Delete own account (body `{confirm: <email>}`) | Y | Y (this change) |
| GET | `/me` | Returns only `{user_id}` (no plan/pass). Mobile reads it in `lib/pass.ts`; nothing else | Y | – |

## Ops / not client-facing
`GET /version`, `GET /health`, and `/admin/*` (dashboard, users, costs, reports, delete/restore/erase/exclude).

## Gaps for web (endpoints that exist, web does not call)
1. `POST /practice/next` with **`chapter_id`** → weak-areas / chapter-focus practice (in progress).
2. ~~`POST /reports` → report-a-mistake.~~ Done: snap, live class and practice.
3. `GET /me` → **nothing to port.** It returns `{"user_id": ...}` only. Passes/plans live in the phone's AsyncStorage (`lib/pass.ts`, keyed per user); the API has no passes table or purchases endpoint. Web plan/promo work needs a server-side `passes` model first.
4. `POST /events` → analytics parity.
5. `GET /drona/chapter/{id}/figures` → stored board figures (board widget work).
6. Not in this API at all (mobile-only, client-side or third party): daily plan (AsyncStorage), textbooks (bundled content), payments/promo (check the mobile `lib/pass.ts` + `app/plans*.tsx` before scoping).

## Live-class board: widget negotiation (WS query string)
`WS /drona/session/{id}/live?token=...&widgets=id@ver,id@ver`
- **Mobile** sends its 17-widget manifest.
- **Web** sends the widgets it has ported (`xy_plot@4,comparison_table@1,data_table_trend@1,process_flow@1,region_plot@1,vector_sum@1,conic_plot@1,projectile_motion@1`, from `src/lib/widgets/registry.ts`), so the server serves
  those as payloads and everything else as the illustration or SVG. (An empty `widgets=` means "none".) Omitting the parameter would be read as "a pre-negotiation build" and the
  server would assume the phone's 12-widget baseline, then send payload-only events (no `svg`) that the web
  cannot draw (a blank board). When a widget is ported, add it to `widgetManifest` in `src/lib/drona/voice.ts`.
- `labelled_figure` (stored illustrations, about 48 concepts) is dispatched OUTSIDE negotiation, so it arrives
  whatever the manifest says. The web draws it (`src/components/LabelledFigure.tsx`) from
  `{ASSETS_BASE}/concept-assets/{slug}.json|png` on the public R2 bucket.
