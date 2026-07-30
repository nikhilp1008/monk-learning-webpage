// Scene verify rig — screenshots every beat + collision audit, both languages.
// Usage: node verify-scene.mjs <sec> '<json reveals en>' '<json reveals hi>' [outdir]
// Audit output: lines "AUDIT <lang> t=<s>: []" — must all be [].
import { chromium } from "playwright";
import fs from "fs";

const SEC = process.argv[2];
const REV_EN = JSON.parse(process.argv[3]);
const REV_HI = JSON.parse(process.argv[4]);
const OUT = process.argv[5] || `./shots/sec${SEC}`;
const CHAPTER = process.env.CHAPTER_ID || "8d7ccfaa-af16-53e4-9f28-823c8ea923d1";
const PORT = process.env.PORT || "3000";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await page.goto(`http://localhost:${PORT}/lessons/${CHAPTER}?sec=${SEC}&t=0`, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2500);

async function seek(t) {
  await page.evaluate((tt) => {
    const a = document.querySelector("audio");
    a.currentTime = tt;
  }, t);
  await page.waitForFunction(() => !document.querySelector("audio").seeking);
  await page.waitForTimeout(1800); // let staggers land at t+~1s frame
}

async function audit() {
  return page.evaluate(() => {
    const vis = [...document.querySelectorAll("svg text")].filter((el) => {
      const g = el.closest("g.sc-fade");
      return !g || parseFloat(getComputedStyle(g).opacity) > 0.5;
    });
    const boxes = vis.map((el) => ({ t: el.textContent, r: el.getBoundingClientRect() }));
    const out = [];
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].r, b = boxes[j].r;
        if (a.left < b.right - 2 && b.left < a.right - 2 &&
            a.top < b.bottom - 2 && b.top < a.bottom - 2)
          out.push(`${boxes[i].t}  ×  ${boxes[j].t}`);
      }
    return out;
  });
}

async function runLang(lang, revs) {
  await page.getByRole("button", { name: lang === "english" ? "English" : "Hinglish" }).click();
  await page.waitForTimeout(900);
  const dur = await page.evaluate(() => document.querySelector("audio").duration);
  const times = revs.map((r) => Math.min(r + 1, dur - 0.5));
  times.push(Math.max(0, dur - 1)); // settled final frame
  for (let k = 0; k < times.length; k++) {
    await seek(times[k]);
    const label = k < revs.length ? `b${k}` : "final";
    if (label === "final") {
      // last-beat staggers play in real time even after seek — flush them so
      // the audit sees the fully settled board
      await page.evaluate(() => {
        document.querySelectorAll("g.sc-fade").forEach((g) => {
          if (g.style.opacity !== "0") {
            g.style.transition = "none";
            g.style.transform = "none";
          }
        });
        document.querySelectorAll("svg path").forEach((p) => {
          if (p.style.strokeDashoffset === "0") p.style.transition = "none";
        });
      });
      await page.waitForTimeout(300);
    }
    await page.screenshot({ path: `${OUT}/${lang}-${label}.png` });
    const hits = await audit();
    console.log(`AUDIT ${lang} ${label} t=${times[k].toFixed(1)}: ${JSON.stringify(hits)}`);
  }
}

await runLang("english", REV_EN);
await runLang("hinglish", REV_HI);
await browser.close();
console.log("DONE", OUT);
