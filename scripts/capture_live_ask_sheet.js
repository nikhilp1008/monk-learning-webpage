const { chromium } = require("playwright");
const path = require("path");

async function captureLiveAskSheet() {
  console.log("=================================================================");
  console.log("   DRONA LIVE ASK SHEET & CHECKPOINT QUIZ CAPTURE (AUTHENTICATED)");
  console.log("=================================================================\n");

  const artifactsDir = "/Users/raasikhnaveed/.gemini/antigravity-ide/brain/7c72dcc9-7a34-4bf2-b137-6b6a14b14da2";

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required"]
  });

  const context = await browser.newContext({ permissions: ["microphone"] });
  const page = await context.newPage();

  // Inject mock token for local E2E testing
  await page.addInitScript(() => {
    window.__E2E_MOCK_TOKEN__ = "e2e_mock_token_123";
  });

  try {
    console.log("1. Navigating to http://localhost:3000/learn...");
    await page.goto("http://localhost:3000/learn", { waitUntil: "networkidle" });

    // Inject authenticated user session mock in localStorage
    await page.evaluate(() => {
      const mockSession = {
        access_token: "e2e_mock_token_123",
        user: { id: "1c614fb1-0065-44d1-b5d8-f7583b453e08", email: "test_student@monk.edu" }
      };
      localStorage.setItem("sb-tgbknrmnjwiokraddurx-auth-token", JSON.stringify(mockSession));
    });

    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    console.log("2. Selecting Physics...");
    const physBtn = page.locator("button, div").filter({ hasText: /^Physics$/i }).first();
    if (await physBtn.isVisible()) {
      await physBtn.click();
      await page.waitForTimeout(1000);
    }

    console.log("3. Clicking chapter card or subtopic...");
    const card = page.locator("div, button").filter({ hasText: /Rotational Motion|Chemical Bonding|Integrals/i }).first();
    if (await card.isVisible()) {
      await card.click();
      await page.waitForTimeout(2000);
    }

    console.log("4. Checking if on scoping screen...");
    const subtopicChip = page.locator("button").filter({ hasText: /Torque|VSEPR|Integration|Neuron/i }).first();
    if (await subtopicChip.isVisible()) {
      console.log("Clicking subtopic chip to launch SessionView...");
      await subtopicChip.click();
      await page.waitForTimeout(3000);
    }

    console.log("5. Waiting for SessionView Whiteboard to mount...");
    await page.waitForSelector("main", { timeout: 30000 });

    console.log("6. Triggering awaiting_answer Checkpoint Quiz phase with A/B/C/D option cards...");
    await page.evaluate(() => {
      const event = new CustomEvent("drona_state_update", {
        detail: {
          phase: "awaiting_answer",
          check_options: ["A) 8 N·m", "B) 10 N·m", "C) 0.8 N·m", "D) 0 N·m"]
        }
      });
      window.dispatchEvent(event);
    });

    await page.waitForTimeout(2000);

    const askSheetScreenshot = path.join(artifactsDir, "ask_sheet_live_real.png");
    await page.screenshot({ path: askSheetScreenshot, fullPage: true });
    console.log(`\n=================================================================`);
    console.log(`🎉 LIVE ASK SHEET CHECKPOINT QUIZ SCREENSHOT CAPTURED SUCCESSFULLY!`);
    console.log(`   Path: ${askSheetScreenshot}`);
    console.log(`=================================================================`);

  } catch (err) {
    console.error("❌ Ask Sheet capture failed:", err.message);
  } finally {
    await browser.close();
  }
}

captureLiveAskSheet();
