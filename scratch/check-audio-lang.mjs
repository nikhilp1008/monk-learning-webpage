import { chromium } from "playwright";
import fs from "fs";
const customExec = "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const launchOptions = fs.existsSync(customExec) ? { executablePath: customExec } : {};
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage();
const sec = process.argv[2] || "4";
await page.goto(`http://localhost:3021/lessons/16bf043d-bc59-5ebb-93ad-7b0fddf484c9?sec=${sec}&t=0`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
for (const lang of ["English", "Hinglish"]) {
  await page.getByRole("button", { name: lang }).click();
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const a = document.querySelector("audio");
    return a ? { src: a.src.split("/").pop(), duration: a.duration } : null;
  });
  console.log(lang, JSON.stringify(info));
}
await browser.close();
