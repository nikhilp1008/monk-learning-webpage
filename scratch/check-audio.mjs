import { chromium } from "playwright";
import fs from "fs";
const customExec = "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const launchOptions = fs.existsSync(customExec) ? { executablePath: customExec } : {};
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage();
const sec = process.argv[2] || "4";
await page.goto(`http://localhost:3021/lessons/16bf043d-bc59-5ebb-93ad-7b0fddf484c9?sec=${sec}&t=0`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const a = document.querySelector("audio");
  return a ? { src: a.src, duration: a.duration, readyState: a.readyState, networkState: a.networkState, error: a.error && a.error.message } : null;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
