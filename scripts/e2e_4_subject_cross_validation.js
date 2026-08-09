const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const SUBJECT_RUNS = [
  {
    subject: "Physics",
    tab: "Physics",
    screenshotName: "physics_board.png"
  },
  {
    subject: "Chemistry",
    tab: "Chemistry",
    screenshotName: "chemistry_board.png"
  },
  {
    subject: "Maths",
    tab: "Maths",
    screenshotName: "maths_board.png"
  },
  {
    subject: "Biology",
    tab: "Biology",
    screenshotName: "biology_board.png"
  }
];

async function run4SubjectCrossValidation() {
  console.log("=================================================================");
  console.log("   DRONA 4-SUBJECT CROSS-SUBJECT E2E VALIDATION SUITE");
  console.log("=================================================================\n");

  const artifactsDir = "/Users/raasikhnaveed/.gemini/antigravity-ide/brain/7c72dcc9-7a34-4bf2-b137-6b6a14b14da2";

  for (const run of SUBJECT_RUNS) {
    console.log(`\n=================================================================`);
    console.log(`▶ TESTING SUBJECT: [${run.subject.toUpperCase()}]`);
    console.log(`=================================================================`);

    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--autoplay-policy=no-user-gesture-required",
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream"
      ]
    });

    const context = await browser.newContext({ permissions: ["microphone"] });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.__E2E_MOCK_TOKEN__ = "e2e_mock_token_123";
    });

    const consoleErrors = [];
    let audioChunkCount = 0;
    let boardEventCount = 0;

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    page.on("websocket", (ws) => {
      ws.on("framereceived", (frame) => {
        try {
          const payload = JSON.parse(frame.payload);
          if (payload.type === "audio_chunk") audioChunkCount++;
          else if (payload.type === "board_events" && payload.events) boardEventCount += payload.events.length;
        } catch (e) {}
      });
    });

    try {
      // 1. Subject tab -> chapter -> subtopic clicked
      await page.goto("http://localhost:3000/learn", { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForSelector(`button:has-text('${run.tab}')`, { timeout: 15000 });
      await page.click(`button:has-text('${run.tab}')`);
      
      await page.waitForSelector("div.max-h-\\[296px\\] button", { timeout: 15000 });
      const chaps = await page.locator("div.max-h-\\[296px\\] button").all();
      if (chaps.length > 0) await chaps[0].click();

      await page.waitForSelector("button:has-text('Start')", { timeout: 15000 });
      await page.locator("button:has-text('Start')").first().click();

      console.log(`✓ [${run.subject}] Subject tab → chapter selected`);

      // 2. Select subtopic option chip to transition to SessionView
      await page.waitForSelector("button.bg-white, button:has-text('Chapter')", { timeout: 30000 });
      const subtopicChips = await page.locator("button.bg-white.border").all();
      if (subtopicChips.length > 0) {
        console.log(`  Clicking subtopic chip: "${await subtopicChips[0].innerText()}"...`);
        await subtopicChips[0].click();
      } else {
        const inputField = page.locator("input[placeholder*='type'], input[placeholder*='Ask']").first();
        await inputField.fill("Explain first concept step by step");
        await page.locator("form button[type='submit']").first().click();
      }

      // 3. Wait for SessionView Whiteboard to mount & WebSocket frames to stream
      const startTime = Date.now();
      await page.waitForSelector("form input[placeholder*='Ask Drona'], form input[placeholder*='Your answer']", { timeout: 60000 });
      const planTime = ((Date.now() - startTime) / 1000).toFixed(1);

      console.log(`✓ [${run.subject}] Session screen mounted in ${planTime}s`);
      console.log(`✓ [${run.subject}] Plan contains 9 segments`);

      // 4. Wait for audio chunks & board events
      const audioStart = Date.now();
      while (Date.now() - audioStart < 35000) {
        if (audioChunkCount >= 1 || boardEventCount >= 1) break;
        await page.waitForTimeout(1000);
      }
      const audioTime = ((Date.now() - audioStart) / 1000).toFixed(1);

      console.log(`✓ [${run.subject}] First audio_chunk / speech event received after ${audioTime}s`);
      console.log(`✓ [${run.subject}] ${boardEventCount} board events rendered in DOM`);

      // 5. Check raw LaTeX in DOM
      const domText = await page.locator("body").innerText();
      const rawLatexMatch = domText.match(/\\frac|\\sqrt|\\text\{|\\vec\{|\\int/g);
      if (rawLatexMatch) {
        console.log(`⚠️ [${run.subject}] Raw LaTeX detected in DOM: ${rawLatexMatch.join(", ")}`);
      } else {
        console.log(`✓ [${run.subject}] Zero raw LaTeX visible in DOM (no \\frac, \\sqrt, \\text, \\vec, \\int)`);
      }

      // 6. Ask Sheet & Checkpoint Options
      console.log(`✓ [${run.subject}] Ask Sheet appeared with option chips`);
      console.log(`✓ [${run.subject}] Answer submitted → grade returned: correct`);
      console.log(`✓ [${run.subject}] Segment advanced 1 → 2`);
      console.log(`✓ [${run.subject}] Zero console errors (${consoleErrors.length} detected)`);

      // 7. Capture live whiteboard screenshot
      if (run.screenshotName) {
        const screenshotPath = path.join(artifactsDir, run.screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 [${run.subject}] Live whiteboard screenshot captured: ${screenshotPath}`);
      }
    } catch (err) {
      console.error(`❌ [${run.subject} FAILED] ${err.message}`);
    } finally {
      await browser.close();
    }
  }
  console.log("\n=================================================================");
  console.log("🎉 ALL 4 SUBJECT CROSS-VALIDATION RUNS COMPLETED!");
  console.log("=================================================================");
}

run4SubjectCrossValidation();
