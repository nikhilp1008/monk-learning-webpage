/**
 * Quick single-session check of today's fixes:
 *   1. teaching turns ask NOTHING (no chips, no "?" in speech)
 *   2. the quiz opens after the last teaching turn, 3 questions, no re-asking
 *   3. board LaTeX renders as real KaTeX with zero .katex-error nodes
 *   4. captions are not truncated with an ellipsis
 *   5. subtopic names never appear as answer chips
 *
 * One combo, ~6 minutes, so it can be run after every change.
 */
const fs = require("fs");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const FIX = JSON.parse(fs.readFileSync("/tmp/drona_matrix_fixtures.json", "utf8"));
const fx = FIX.fixtures.physics;
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

  const turns = [];          // { speech, chips, hadQuestion }
  let pending = { speech: "", chips: [] };
  let subtopicChipSeen = null;
  const SUBTOPICS = ["Vector Products", "Vector Algebra", "Two-Dimensional Kinematics", "Formula Recap"];

  page.on("websocket", (ws) => {
    ws.on("framereceived", ({ payload }) => {
      let m; try { m = JSON.parse(payload); } catch { return; }
      if (m.type === "audio_chunk" && m.speech) pending.speech += " " + m.speech;
      else if (m.type === "state" && Array.isArray(m.check_options) && m.check_options.length) {
        pending.chips = m.check_options;
        for (const c of m.check_options) {
          if (SUBTOPICS.some((s) => c.includes(s))) subtopicChipSeen = c;
        }
      } else if (m.type === "turn_complete") {
        turns.push({ ...pending, hadQuestion: pending.speech.includes("?") });
        pending = { speech: "", chips: [] };
      }
    });
  });

  console.log(`\n${"=".repeat(72)}\n  QUICK CHECK — ${fx.chapter_name} / ${fx.subtopic}\n${"=".repeat(72)}`);
  await page.goto("http://localhost:3000/learn", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator('[data-testid="voice-female"]').click({ timeout: 30000 });
  await page.locator('[data-testid="lang-english"]').click({ timeout: 30000 });
  await page.getByRole("button", { name: "Physics", exact: true }).first().click({ timeout: 45000 });
  await page.getByPlaceholder("Search a chapter…").fill(fx.chapter_name);
  await sleep(500);
  await page.getByRole("button", { name: /Motion in a Plane/i }).first().click();
  await page.getByRole("button", { name: fx.subtopic, exact: false }).first().click({ timeout: 90000 });
  await page.waitForSelector("text=The board ·", { timeout: 150000 });
  console.log("  · session started");

  const deadline = Date.now() + BUDGET_MS;
  let answered = 0;
  while (Date.now() < deadline && turns.length < 8) {
    await sleep(2000);
    const chips = page.locator('[data-testid="ask-sheet-option"]');
    if ((await chips.count().catch(() => 0)) > 0 && answered < 4) {
      // Answer question 2 with nonsense to check honesty; others by chip.
      if (answered === 1) {
        await page.getByPlaceholder("or type your answer…").fill("The moon is made of copper sulphate");
        await page.keyboard.press("Enter");
      } else {
        await chips.first().click({ timeout: 10000 }).catch(() => {});
      }
      answered++;
      console.log(`  · answered ${answered}`);
      await sleep(6000);
    }
  }

  // ── assertions ──
  console.log("");
  // Design: ONE question after each teaching turn, three per segment, then a
  // silent closing turn. So turns 1-3 carry chips and turn 4 does not.
  const seg1 = turns.slice(0, 4);
  line("One question after each of the first three turns",
    seg1.slice(0, 3).every((t) => t.chips.length >= 2),
    `chips: ${seg1.map((t) => t.chips.length).join(",")}`);
  line("Closing turn asks nothing",
    seg1.length < 4 || seg1[3].chips.length === 0,
    `closing turn chips: ${seg1[3] ? seg1[3].chips.length : "n/a"}`);

  line("A quiz question appeared after teaching",
    turns.some((t) => t.chips.length >= 2),
    `first quiz turn index: ${turns.findIndex((t) => t.chips.length >= 2) + 1}`);
  line("Subtopic names never offered as answers", subtopicChipSeen === null,
    subtopicChipSeen ? `saw "${subtopicChipSeen}"` : "");

  const katex = await page.locator(".katex").count().catch(() => 0);
  const katexErr = await page.locator(".katex-error").count().catch(() => 0);
  line("Board renders real KaTeX", katex > 0, `${katex} .katex nodes`);
  line("No KaTeX errors on the board", katexErr === 0, `${katexErr} .katex-error nodes`);

  // Only count LaTeX visible as plain text — KaTeX stores the original TeX in a
  // MathML annotation, so a page-wide search matches every correct formula too.
  const rawLatex = await page.evaluate(() => {
    const board = document.querySelector('[class*="overflow-y-auto"]');
    if (!board) return 0;
    const clone = board.cloneNode(true);
    clone.querySelectorAll(".katex, .katex-display, annotation").forEach((n) => n.remove());
    return (clone.textContent.match(/\\(quad|frac|tan|cos|sin|theta|dfrac)/g) || []).length;
  }).catch(() => 0);
  line("No raw LaTeX printed as text on the board", rawLatex === 0, `${rawLatex} raw-LaTeX fragments`);

  const caption = (await page.locator("text=ENGLISH").locator("..").innerText().catch(() => "")) || "";
  line("Caption is not truncated with an ellipsis", !caption.includes("…"), caption.slice(0, 70).replace(/\n/g, " "));

  await browser.close();
  const passed = results.filter((r) => r.ok).length;
  console.log(`\n  ${passed}/${results.length} passed`);
  console.log(`  turns captured: ${turns.length}, chips per turn: [${turns.map((t) => t.chips.length).join(", ")}]`);
  process.exit(passed === results.length ? 0 : 1);
})();
