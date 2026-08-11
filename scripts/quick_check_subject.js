/**
 * Parameterized single-session check, adapted from quick_check_quiz_flow.js.
 * Drives one live session for any subject/chapter/subtopic and asserts the
 * same turn-structure and rendering rules:
 *   SUBJECT_LABEL="Chemistry" CHAPTER="Some Basic Concepts" SUBTOPIC="Uncertainty" node scripts/quick_check_subject.js
 */
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const SUBJECT_LABEL = process.env.SUBJECT_LABEL;
const CHAPTER = process.env.CHAPTER;
const SUBTOPIC = process.env.SUBTOPIC;
if (!SUBJECT_LABEL || !CHAPTER || !SUBTOPIC) {
  console.error("Set SUBJECT_LABEL, CHAPTER, SUBTOPIC env vars.");
  process.exit(2);
}
const BUDGET_MS = Number(process.env.QUICK_BUDGET_MS || 8 * 60 * 1000);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const line = (label, ok, detail = "") => {
  results.push({ label, ok });
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}${detail ? ` — ${detail}` : ""}`);
};

(async () => {
  const token = execFileSync("python3", ["scratch/mint_jwt.py"], {
    cwd: "/Users/raasikhnaveed/Desktop/monk-learning-api",
    env: { ...process.env, PYTHONPATH: "." }, encoding: "utf8",
  }).trim();

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required",
      "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
  });
  const ctx = await browser.newContext({ permissions: ["microphone"], viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((t) => { window.__E2E_MOCK_TOKEN__ = t; }, token);

  const turns = [];
  let pending = { speech: "", chips: [] };

  page.on("websocket", (ws) => {
    ws.on("framereceived", ({ payload }) => {
      let m; try { m = JSON.parse(payload); } catch { return; }
      if (m.type === "audio_chunk" && m.speech) pending.speech += " " + m.speech;
      else if (m.type === "state" && Array.isArray(m.check_options) && m.check_options.length) {
        pending.chips = m.check_options;
      } else if (m.type === "turn_complete") {
        turns.push({ ...pending, hadQuestion: pending.speech.includes("?") });
        pending = { speech: "", chips: [] };
      }
    });
  });

  console.log(`\n${"=".repeat(72)}\n  SUBJECT CHECK — ${SUBJECT_LABEL} / ${CHAPTER} / ${SUBTOPIC}\n${"=".repeat(72)}`);
  await page.goto("http://localhost:3000/learn", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator('[data-testid="voice-female"]').click({ timeout: 30000 });
  await page.locator('[data-testid="lang-english"]').click({ timeout: 30000 });
  await page.getByRole("button", { name: SUBJECT_LABEL, exact: true }).first().click({ timeout: 45000 });
  await page.getByPlaceholder("Search a chapter…").fill(CHAPTER);
  await sleep(500);
  await page.getByRole("button", { name: new RegExp(CHAPTER.slice(0, 24), "i") }).first().click();
  await page.getByRole("button", { name: SUBTOPIC, exact: false }).first().click({ timeout: 90000 });
  await page.waitForSelector("text=The board ·", { timeout: 150000 });
  console.log("  · session started");

  const deadline = Date.now() + BUDGET_MS;
  let answered = 0;
  while (Date.now() < deadline && turns.length < 5) {
    await sleep(2000);
    const chips = page.locator('[data-testid="ask-sheet-option"]');
    if ((await chips.count().catch(() => 0)) > 0 && answered < 4) {
      await chips.first().click({ timeout: 10000 }).catch(() => {});
      answered++;
      console.log(`  · answered ${answered}`);
      await sleep(6000);
    }
  }

  console.log("");
  const seg1 = turns.slice(0, 4);
  line("One question after each of the first three turns",
    seg1.slice(0, 3).every((t) => t.chips.length >= 2),
    `chips: ${seg1.map((t) => t.chips.length).join(",")}`);
  line("Closing turn asks nothing",
    seg1.length < 4 || seg1[3].chips.length === 0,
    `closing turn chips: ${seg1[3] ? seg1[3].chips.length : "n/a"}`);
  const katexErr = await page.locator(".katex-error").count().catch(() => 0);
  line("No KaTeX errors on the board", katexErr === 0, `${katexErr} .katex-error nodes`);
  const rawLatex = await page.evaluate(() => {
    const board = document.querySelector('[class*="overflow-y-auto"]');
    if (!board) return 0;
    const clone = board.cloneNode(true);
    clone.querySelectorAll(".katex, .katex-display, annotation").forEach((n) => n.remove());
    return (clone.textContent.match(/\\(quad|frac|tan|cos|sin|theta|dfrac|text)/g) || []).length;
  }).catch(() => 0);
  line("No raw LaTeX printed as text on the board", rawLatex === 0, `${rawLatex} raw-LaTeX fragments`);

  await browser.close();
  const passed = results.filter((r) => r.ok).length;
  console.log(`\n  ${passed}/${results.length} passed`);
  console.log(`  turns captured: ${turns.length}, chips per turn: [${turns.map((t) => t.chips.length).join(", ")}]`);
  process.exit(passed === results.length ? 0 : 1);
})();
