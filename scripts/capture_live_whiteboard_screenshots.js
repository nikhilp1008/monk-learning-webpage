const { chromium } = require("playwright");
const path = require("path");

async function captureWhiteboardScreenshots() {
  console.log("=== CAPTURING CRISP LIVE WHITEBOARD SCREENSHOTS ===");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__E2E_MOCK_TOKEN__ = "e2e_mock_token_123";
  });

  const artifactsDir = "/Users/raasikhnaveed/.gemini/antigravity-ide/brain/7c72dcc9-7a34-4bf2-b137-6b6a14b14da2";

  try {
    console.log("Navigating to http://localhost:3000/learn...");
    await page.goto("http://localhost:3000/learn", { waitUntil: "networkidle" });

    // 1. Chemistry Screenshot
    console.log("1. Selecting Chemistry...");
    await page.click("button:has-text('Chemistry')");
    await page.waitForSelector("div.max-h-\\[296px\\] button");
    const chemChaps = await page.locator("div.max-h-\\[296px\\] button").all();
    if (chemChaps.length > 0) await chemChaps[0].click();

    await page.waitForSelector("button:has-text('Start')");
    await page.locator("button:has-text('Start')").first().click();

    await page.waitForSelector("div.font-script, h3, p, form input", { timeout: 30000 });
    const chemPath = path.join(artifactsDir, "chemistry_board.png");
    await page.screenshot({ path: chemPath, fullPage: true });
    console.log(`📸 Chemistry screenshot saved: ${chemPath}`);

    // 2. Biology Screenshot
    console.log("2. Navigating back & selecting Biology...");
    await page.goto("http://localhost:3000/learn", { waitUntil: "networkidle" });
    await page.click("button:has-text('Biology')");
    await page.waitForSelector("div.max-h-\\[296px\\] button");
    const bioChaps = await page.locator("div.max-h-\\[296px\\] button").all();
    if (bioChaps.length > 0) await bioChaps[0].click();

    await page.waitForSelector("button:has-text('Start')");
    await page.locator("button:has-text('Start')").first().click();

    await page.waitForSelector("div.font-script, h3, p, form input", { timeout: 30000 });
    const bioPath = path.join(artifactsDir, "biology_board.png");
    await page.screenshot({ path: bioPath, fullPage: true });
    console.log(`📸 Biology screenshot saved: ${bioPath}`);

  } catch (err) {
    console.error("Screenshot capture error:", err);
  } finally {
    await browser.close();
  }
}

captureWhiteboardScreenshots();
