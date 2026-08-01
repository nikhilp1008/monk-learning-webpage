const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function captureAll() {
  const outDir = path.join(__dirname, "../ch2_screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 750 },
    deviceScaleFactor: 2, // crisp high resolution
  });
  const page = await context.newPage();

  console.log("Capturing screenshots for Chapter 2 sections 1 to 66...");

  for (let sec = 1; sec <= 66; sec++) {
    const url = `http://localhost:3000/preview-ch2?sec=${sec}`;
    await page.goto(url, { waitUntil: "networkidle" });
    // short wait to let any transition settle
    await page.waitForTimeout(300);

    const imgPath = path.join(outDir, `ch2_sec_${sec}.png`);
    await page.screenshot({ path: imgPath });
    if (sec % 10 === 0 || sec === 66) {
      console.log(`Captured ${sec}/66 screenshots...`);
    }
  }

  await browser.close();
  console.log("All 66 screenshots captured successfully in:", outDir);
}

captureAll().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
