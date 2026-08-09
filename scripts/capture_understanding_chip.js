const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("Launching browser to capture Understanding Check-in 2-chip box...");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  
  // Navigate to learn page
  await page.goto('http://localhost:3000/learn', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click on a subtopic card to start session
  const subtopicBtn = await page.$('button, [role="button"]');
  if (subtopicBtn) {
    await subtopicBtn.click();
  }

  await new Promise(r => setTimeout(r, 5000));

  const screenshotPath = '/Users/raasikhnaveed/.gemini/antigravity-ide/brain/7c72dcc9-7a34-4bf2-b137-6b6a14b14da2/understanding_checkin_2_chips_proof.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
