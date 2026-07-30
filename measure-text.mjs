// Measure real svg text boxes (viewBox units). Usage: node measure-text.mjs <sec> <t> <english|hinglish>
import { chromium } from "playwright";
const [SEC, T, LANG] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await page.goto(`http://localhost:3000/lessons/8d7ccfaa-af16-53e4-9f28-823c8ea923d1?sec=${SEC}&t=${T}`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.getByRole("button", { name: LANG === "english" ? "English" : "Hinglish" }).click();
await page.waitForTimeout(800);
await page.evaluate((t) => { document.querySelector("audio").currentTime = +t; }, T);
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const svg = document.querySelector("svg[viewBox='0 0 1080 620']");
  const sr = svg.getBoundingClientRect();
  const sc = sr.width / 1080;
  return [...svg.querySelectorAll("text")].map((el) => {
    const g = el.closest("g.sc-fade");
    const vis = !g || parseFloat(getComputedStyle(g).opacity) > 0.5;
    const r = el.getBoundingClientRect();
    return vis ? { t: el.textContent.slice(0, 28), x: +((r.left - sr.left) / sc).toFixed(1), y: +((r.top - sr.top) / sc).toFixed(1), w: +(r.width / sc).toFixed(1), h: +(r.height / sc).toFixed(1) } : null;
  }).filter(Boolean);
});
console.log(JSON.stringify(out));
await browser.close();
