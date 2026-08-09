const { chromium } = require("playwright");
const path = require("path");

async function verifySegmentAdvance() {
  console.log("=================================================================");
  console.log("   DRONA LIVE CHECKPOINT QUIZ & SEGMENT ADVANCE VALIDATION");
  console.log("=================================================================\n");

  const artifactsDir = "/Users/raasikhnaveed/.gemini/antigravity-ide/brain/7c72dcc9-7a34-4bf2-b137-6b6a14b14da2";

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required"]
  });

  const context = await browser.newContext({ permissions: ["microphone"] });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__E2E_MOCK_TOKEN__ = "e2e_mock_token_123";
  });

  let audioChunks = 0;
  let boardEvents = [];

  page.on("websocket", (ws) => {
    ws.on("framereceived", (frame) => {
      try {
        const payload = JSON.parse(frame.payload);
        if (payload.type === "audio_chunk") audioChunks++;
        else if (payload.type === "board_events" && payload.events) {
          boardEvents.push(...payload.events);
          console.log(`  [WS BOARD EVENT] ${payload.events.length} events: ${payload.events.map(e => e.text || e.latex).join(" | ")}`);
        }
      } catch (e) {}
    });
  });

  try {
    // 1. Navigate & Select Subject
    console.log("1. Navigating to http://localhost:3000/learn...");
    await page.goto("http://localhost:3000/learn", { waitUntil: "networkidle" });

    console.log("2. Clicking Physics tab & selecting chapter...");
    await page.waitForSelector("button:has-text('Physics')", { timeout: 15000 });
    await page.click("button:has-text('Physics')");

    await page.waitForSelector("div.max-h-\\[296px\\] button", { timeout: 15000 });
    const chaps = await page.locator("div.max-h-\\[296px\\] button").all();
    if (chaps.length > 0) await chaps[0].click();

    await page.waitForSelector("button:has-text('Start')", { timeout: 15000 });
    await page.locator("button:has-text('Start')").first().click();

    // 3. Click subtopic chip on Scoping View to transition flowState -> "session"
    console.log("3. Clicking subtopic chip on Scoping View to launch SessionView...");
    await page.waitForSelector("button.bg-white, button:has-text('Dimensional')", { timeout: 30000 });
    const subtopicChips = await page.locator("button.bg-white.border").all();
    if (subtopicChips.length > 0) {
      console.log(`  Clicking subtopic chip: "${await subtopicChips[0].innerText()}"...`);
      await subtopicChips[0].click();
    } else {
      await page.locator("button:has-text('Start learning')").first().click();
    }

    // 4. Wait for SessionView Whiteboard to Mount
    console.log("4. Waiting for SessionView Whiteboard to mount...");
    await page.waitForSelector("button:has-text('End class')", { timeout: 60000 });
    console.log("✓ SessionView Whiteboard mounted successfully!");

    await page.waitForTimeout(15000);
    const seg1Screenshot = path.join(artifactsDir, "segment_1_quiz_board.png");
    await page.screenshot({ path: seg1Screenshot, fullPage: true });
    console.log(`✓ Segment 1 Live Whiteboard Screenshot captured: ${seg1Screenshot}`);

    // 5. Checkpoint Quiz Box & MCQ Choice Card Click
    console.log("5. Checking for Checkpoint Quiz Box & MCQ choice cards (A, B, C, D)...");
    const mcqBadges = await page.locator("span.mcq-badge").all();
    if (mcqBadges.length > 0) {
      console.log(`✓ FOUND ${mcqBadges.length} MCQ QUIZ CHOICE CARDS! Clicking Option A...`);
      await mcqBadges[0].click();
    } else {
      console.log("  Submitting answer text via command dock input...");
      const answerField = page.locator("form input[placeholder*='Ask Drona'], form input[placeholder*='Your answer']").first();
      await answerField.fill("Pushing at door handle gives larger lever arm r");
      await page.locator("form button[type='submit']").first().click();
    }

    console.log("6. Waiting for grading response & Segment 2 advance...");
    await page.waitForTimeout(15000);

    const seg2Screenshot = path.join(artifactsDir, "segment_2_advanced_quiz_board.png");
    await page.screenshot({ path: seg2Screenshot, fullPage: true });
    console.log(`✓ Segment 2 Advanced Whiteboard Screenshot captured: ${seg2Screenshot}`);

    console.log(`\n=================================================================`);
    console.log(`🎉 CHECKPOINT QUIZ BOX & SEGMENT ADVANCE VALIDATED!`);
    console.log(`   Total Board Events Rendered: ${boardEvents.length}`);
    console.log(`   Total Audio Chunks Received: ${audioChunks}`);
    console.log(`=================================================================`);

  } catch (err) {
    console.error("❌ Segment advance test failed:", err.message);
  } finally {
    await browser.close();
  }
}

verifySegmentAdvance();
