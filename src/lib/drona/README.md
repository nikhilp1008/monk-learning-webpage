# 🔊 `src/lib/drona/` — Web Audio & WebSocket Client Library

The `src/lib/drona/` directory handles low-level client-side network communication, WebSockets, Web Audio API binary PCM audio buffering, and REST API calls.

---

## 📂 Library Modules

### 1. [`voice.ts`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/lib/drona/voice.ts) — Drona Voice Client Engine
- **WebSockets Manager**: Connects to `wss://<backend>/drona/session/{id}/live`.
- **Web Audio PCM Queue**: Buffers incoming 16kHz binary PCM audio chunks, decoding and playing sentences sequentially through `AudioContext`.
- **Sentence-level Board Sync**: Attaches matching `board_event` objects directly to sentence audio chunks so whiteboard notes write onto the canvas as Drona speaks.
- **Push-to-Talk Microphone Listener**: Captures 16kHz PCM audio from student microphone (`MediaStream`) and sends binary audio frames over WebSocket.

---

### 2. [`client.ts`](file:///Users/raasikhnaveed/Desktop/monk-learning-web/src/lib/drona/client.ts) — Drona REST Client
- Supabase REST API wrapper for starting Drona sessions, switching chapters, advancing subtopic segments, and fetching mastery stats.

---

## 🛡️ Web Audio Queue Pipeline

```text
WebSocket Event (audio_chunk)
 ├── 1. Base64 Decode PCM Audio Payload
 ├── 2. Create AudioBuffer (16kHz PCM)
 ├── 3. Enqueue AudioBufferSourceNode
 ├── 4. Trigger Matching Board Event on Playback Start
 └── 5. Update Voice State (isDronaSpeaking = true)
```

---

> [!TIP]
> **Safari Autoplay Handling**: `voice.ts` includes an auto-resume handler for iOS Safari that unlocks `AudioContext` on the first user touch event.
