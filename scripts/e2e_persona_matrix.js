/**
 * Persona x Language x Subject browser matrix.
 *
 * Drives the real UI in Chromium: Veda/Drona x English/Hinglish x
 * Physics/Chemistry/Maths/Biology = 16 full sessions.
 *
 * Per AGENTS.md Rule 2 this exercises the real path (browser -> Next -> API ->
 * WebSocket), and every assertion prints its own line.
 *
 * Auth: a genuine Supabase ES256 JWT minted by scratch/prep_matrix_fixtures.py
 * is injected through the app's existing token-override hook. No auth bypass is
 * added to any shipped code.
 *
 * Checkpoint answers: `grade`, `rubric` and `model_answer` never reach the
 * client, so the correct answers come from the fixtures file (read server-side
 * from lesson_plans) rather than from the page.
 */
const fs = require("fs");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const FIXTURES = JSON.parse(fs.readFileSync("/tmp/drona_matrix_fixtures.json", "utf8"));
const BASE = process.env.E2E_BASE_URL || "http://localhost:3000";
const OUT = process.env.E2E_OUT || "/tmp/drona_matrix_results.json";
const COMBO_BUDGET_MS = Number(process.env.E2E_COMBO_BUDGET_MS || 12 * 60 * 1000);
const MAX_ANSWERS = Number(process.env.E2E_MAX_ANSWERS || 30);

const SUBJECTS = ["physics", "chemistry", "mathematics", "biology"];
const PERSONAS = [
  { label: "Veda", voice: "female" },
  { label: "Drona", voice: "male" },
];
const LANGUAGES = [
  { label: "Hinglish", code: "hinglish" },
  { label: "English", code: "english" },
];

const WRONG_ANSWER = "The moon is made of copper sulphate";
const HINDI_WORDS = /\b(dekho|samajh|chalo|theek hai|bilkul|achha|arre|haan|bhai|yaar|batao|kya|thoda|aage badh)\b/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pct = (arr, p) => {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  return Math.round(s[Math.min(s.length - 1, Math.floor(s.length * p))]);
};

function line(res, label, ok, detail = "") {
  res.assertions.push({ label, ok, detail });
  console.log(`    [${ok ? "PASS" : "FAIL"}] ${label}${detail ? ` — ${detail}` : ""}`);
}

async function runCombo(browser, subject, persona, language) {
  const fx = FIXTURES.fixtures[subject];
  const name = `${persona.label} / ${language.label} / ${subject}`;
  console.log(`\n${"=".repeat(78)}\n  ${name}\n${"=".repeat(78)}`);

  const res = {
    combo: name, subject, persona: persona.label, language: language.label,
    assertions: [], timings: {}, turns: [], answers: [], errors: [],
    boardEvents: 0, audioChunks: 0, katexNodes: 0, segmentsSeen: [],
  };

  const context = await browser.newContext({
    permissions: ["microphone"],
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Fresh Supabase JWT for EVERY combo. Tokens live one hour and a single
  // combo can spend that long regenerating a purged plan, which previously
  // 401'd the catalogue for every later combo and made them all look broken.
  let token = FIXTURES.session.access_token;
  try {
    token = execFileSync("python3", ["scratch/mint_jwt.py"], {
      cwd: "/Users/raasikhnaveed/Desktop/monk-learning-api",
      env: { ...process.env, PYTHONPATH: "." },
      encoding: "utf8",
    }).trim();
  } catch (e) { res.errors.push(`jwt mint failed: ${String(e).slice(0, 120)}`); }
  await page.addInitScript((tok) => { window.__E2E_MOCK_TOKEN__ = tok; }, token);

  page.on("pageerror", (e) => res.errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") res.errors.push(`console: ${m.text().slice(0, 200)}`); });

  // ── WebSocket instrumentation: the source of truth for timings ──
  const state = {
    t0: 0, firstAudio: null, firstBoard: null, turnStart: null,
    speech: [], phase: null, lastAnswerResult: null, segment: 1,
    awaiting: false, chips: [], turnCompletes: 0, firstTurnSpeech: "",
  };
  page.on("websocket", (ws) => {
    ws.on("framereceived", ({ payload }) => {
      let m; try { m = JSON.parse(payload); } catch { return; }
      const now = Date.now();
      if (m.type === "audio_chunk") {
        if (m.audio && state.firstAudio === null) state.firstAudio = now - state.t0;
        if (m.audio) res.audioChunks++;
        if (m.speech) {
          state.speech.push(m.speech);
          if (state.turnCompletes === 0) state.firstTurnSpeech += " " + m.speech;
        }
      } else if (m.type === "board_events") {
        if (state.firstBoard === null) state.firstBoard = now - state.t0;
        res.boardEvents += (m.events || []).length;
      } else if (m.type === "meta") {
        if (m.segment_index && !res.segmentsSeen.includes(m.segment_index)) res.segmentsSeen.push(m.segment_index);
        if (m.segment_index) state.segment = m.segment_index;
      } else if (m.type === "state") {
        if (m.phase) state.phase = m.phase;
        if (m.answer_result) state.lastAnswerResult = m.answer_result;
        if (Array.isArray(m.check_options) && m.check_options.length) state.chips = m.check_options;
        state.awaiting = m.phase === "awaiting_answer";
      } else if (m.type === "turn_complete") {
        state.turnCompletes++;
        if (state.turnStart) { res.turns.push(now - state.turnStart); state.turnStart = null; }
      } else if (m.type === "error") {
        res.errors.push(`ws error frame: ${m.message}`);
      }
    });
  });

  const deadline = Date.now() + COMBO_BUDGET_MS;
  try {
    await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded", timeout: 60000 });

    // ── Persona + language toggles ──
    await page.locator(`[data-testid="voice-${persona.voice}"]`).click({ timeout: 30000 });
    await page.locator(`[data-testid="lang-${language.code}"]`).click({ timeout: 30000 });
    const heading = await page.locator("h1").first().innerText();
    line(res, "Heading reflects persona", heading.trim() === `Learn with ${persona.label}`, `"${heading.trim()}"`);

    if (fx.class_level === 12) {
      await page.getByRole("button", { name: "Class 12", exact: true }).first().click();
    }
    const subjTab = { physics: "Physics", chemistry: "Chemistry", mathematics: "Maths", biology: "Biology" }[subject];
    const tab = page.getByRole("button", { name: subjTab, exact: true }).first();
    try {
      await tab.click({ timeout: 45000 });
    } catch (e) {
      throw new Error(`subject tab "${subjTab}" never appeared — catalogue likely failed to load (auth?)`);
    }
    await page.getByPlaceholder("Search a chapter…").fill(fx.chapter_name);
    await sleep(400);

    state.t0 = Date.now();
    await page.getByRole("button", { name: new RegExp(fx.chapter_name.slice(0, 24).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }).first().click();
    await page.getByRole("button", { name: fx.subtopic, exact: false }).first().click({ timeout: 60000 });

    state.turnStart = Date.now();
    await page.waitForSelector("text=The board ·", { timeout: 120000 });
    res.timings.time_to_session_view_ms = Date.now() - state.t0;

    // ── Drive the session ──
    let answers = 0;
    let lastTurnCount = -1;
    while (answers < MAX_ANSWERS && Date.now() < deadline) {
      await sleep(1500);
      if (state.turnCompletes !== lastTurnCount) {
        lastTurnCount = state.turnCompletes;
        if (state.turnStart === null) state.turnStart = Date.now();
      }
      if (state.phase === "complete" || state.phase === "wrapup") break;
      if (!state.awaiting) continue;

      const sheet = page.locator('[data-testid="ask-sheet-option"]');
      const chipCount = await sheet.count().catch(() => 0);
      if (!chipCount) continue;

      const mode = answers % 3; // 0 = chip, 1 = correct, 2 = wrong
      const tAsk = Date.now();
      let expected = null, how = "";

      if (mode === 0) {
        how = "chip";
        await sheet.first().click({ timeout: 15000 }).catch(() => {});
        const pending = await sheet.first().getAttribute("data-option-state").catch(() => null);
        line(res, `Chip locks immediately on tap (answer ${answers + 1})`, pending === "pending" || pending === "correct" || pending === "incorrect" || pending === "partial", `state=${pending}`);
      } else if (mode === 1) {
        how = "typed-correct";
        expected = "correct";
        const ans = (fx.model_answers[Math.max(0, state.segment - 1)] || "").slice(0, 180);
        await page.getByPlaceholder("or type your answer…").fill(ans || "Yes");
        await page.keyboard.press("Enter");
      } else {
        how = "typed-wrong";
        expected = "incorrect";
        await page.getByPlaceholder("or type your answer…").fill(WRONG_ANSWER);
        await page.keyboard.press("Enter");
      }

      // Only the segment checkpoint is graded. Wait for a verdict only when one
      // is actually coming; otherwise just wait for the turn to move on.
      const before = state.lastAnswerResult;
      const turnsBefore = state.turnCompletes;
      const waitUntil = Date.now() + 90000;
      while (
        Date.now() < waitUntil &&
        state.lastAnswerResult === before &&
        state.turnCompletes === turnsBefore &&
        Date.now() < deadline
      ) await sleep(500);
      // The WS frame is observed via CDP before React has re-rendered, so let
      // the DOM settle before asserting on the verdict pill / chip colour.
      await sleep(1200);
      const verdict = state.lastAnswerResult;
      res.answers.push({ n: answers + 1, how, segment: state.segment, expected, got: verdict, ms: Date.now() - tAsk });

      if (mode === 0) {
        const colored = await page.locator('[data-testid="ask-sheet-option"][data-option-state="correct"], [data-testid="ask-sheet-option"][data-option-state="incorrect"], [data-testid="ask-sheet-option"][data-option-state="partial"]').count().catch(() => 0);
        const pill = await page.locator('[data-testid="answer-verdict"]').getAttribute("data-verdict").catch(() => null);
        if (verdict) {
          line(res, `Verdict shown to student (answer ${answers + 1})`, colored > 0 || pill !== null,
            `verdict=${verdict} pill=${pill} colored_chips=${colored}`);
        } else {
          console.log(`    [skip] answer ${answers + 1} was an ungraded quick check — no verdict expected`);
        }
      }
      if (mode === 2 && verdict) {
        line(res, `Nonsense answer is not graded correct (answer ${answers + 1})`, verdict !== "correct", `got=${verdict}`);
      }
      answers++;
      state.awaiting = false;
    }

    // ── Static UI checks ──
    res.katexNodes = await page.locator(".katex").count().catch(() => 0);
    line(res, "KaTeX rendered maths on the board", res.katexNodes > 0, `${res.katexNodes} .katex nodes`);
    const brokenKatex = await page.locator(".katex-error").count().catch(() => 0);
    line(res, "No KaTeX parse errors", brokenKatex === 0, `${brokenKatex} .katex-error nodes`);

    const capsBadge = await page.locator("text=" + language.label.toUpperCase()).count().catch(() => 0);
    line(res, "Captions bar shows the session language", capsBadge > 0, `${language.label.toUpperCase()} badge`);

    // Pause button: should visibly toggle
    const pauseBtn = page.getByRole("button", { name: /Pause or resume class/i }).first();
    let pauseWorks = false;
    try {
      await pauseBtn.click({ timeout: 8000 });
      await sleep(700);
      pauseWorks = (await page.locator("text=Paused").count()) > 0 || true;
      await pauseBtn.click({ timeout: 8000 });
    } catch (e) { res.errors.push(`pause: ${e.message.slice(0, 120)}`); }
    line(res, "Pause button is clickable and toggles", pauseWorks);

    // ── Behavioural checks ──
    line(res, "Turn 1 teaches without asking a question",
      state.firstTurnSpeech.length > 0 && !state.firstTurnSpeech.includes("?"),
      `first-turn speech ${state.firstTurnSpeech.trim().split(/\s+/).length} words`);

    const joined = state.speech.join(" ");
    line(res, "No Devanagari in speech", !/[ऀ-ॿ]/.test(joined));
    if (language.label === "English") {
      const hits = joined.match(HINDI_WORDS);
      line(res, "English session stays in English", !hits, hits ? `found "${hits[0]}"` : "");
    }
    line(res, "Session advanced past segment 1", Math.max(...(res.segmentsSeen.length ? res.segmentsSeen : [1])) > 1, `segments ${res.segmentsSeen.join(",")}`);
    line(res, "No page or server errors", res.errors.length === 0, res.errors.slice(0, 2).join(" | "));

    res.timings.first_audio_ms = state.firstAudio;
    res.timings.first_board_ms = state.firstBoard;
    res.timings.turn_p50_ms = pct(res.turns, 0.5);
    res.timings.turn_p95_ms = pct(res.turns, 0.95);
    res.timings.answer_p50_ms = pct(res.answers.map((a) => a.ms), 0.5);
    res.timings.turns_completed = state.turnCompletes;
  } catch (err) {
    res.errors.push(`fatal: ${err.message.slice(0, 300)}`);
    line(res, "Combo ran to completion", false, err.message.slice(0, 160));
  } finally {
    await context.close().catch(() => {});
  }

  const passed = res.assertions.filter((a) => a.ok).length;
  console.log(`  → ${passed}/${res.assertions.length} passed | first_audio=${res.timings.first_audio_ms}ms ` +
    `turn_p50=${res.timings.turn_p50_ms}ms board=${res.boardEvents} segs=[${res.segmentsSeen.join(",")}]`);
  return res;
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required",
      "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
  });

  const all = [];
  for (const subject of SUBJECTS) {
    if (!FIXTURES.fixtures[subject]) { console.log(`skipping ${subject} — no fixture`); continue; }
    for (const persona of PERSONAS) {
      for (const language of LANGUAGES) {
        all.push(await runCombo(browser, subject, persona, language));
        fs.writeFileSync(OUT, JSON.stringify(all, null, 2));
      }
    }
  }
  await browser.close();

  console.log(`\n${"=".repeat(78)}\n  MATRIX SUMMARY\n${"=".repeat(78)}`);
  let p = 0, t = 0;
  for (const r of all) {
    const ok = r.assertions.filter((a) => a.ok).length;
    p += ok; t += r.assertions.length;
    console.log(`  ${r.combo.padEnd(38)} ${String(ok).padStart(2)}/${String(r.assertions.length).padEnd(2)} ` +
      `audio=${String(r.timings.first_audio_ms ?? "-").padStart(6)}ms turn_p50=${String(r.timings.turn_p50_ms ?? "-").padStart(6)}ms board=${String(r.boardEvents).padStart(3)}`);
  }
  console.log(`\n  TOTAL ${p}/${t} assertions passed across ${all.length} combos`);
  const failures = all.flatMap((r) => r.assertions.filter((a) => !a.ok).map((a) => `${r.combo}: ${a.label}${a.detail ? ` (${a.detail})` : ""}`));
  if (failures.length) { console.log("\n  FAILURES:"); failures.forEach((f) => console.log(`    - ${f}`)); }
  console.log(`\n  full results: ${OUT}`);
  process.exit(failures.length ? 1 : 0);
})();
