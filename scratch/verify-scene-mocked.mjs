// Local workaround for the c11_ch09 audio-CDN 404 (see PROGRESS.md "KNOWN ISSUE").
// Identical to ../verify-scene.mjs (same assertions, same output format) EXCEPT it
// intercepts requests to audio.monklearning.com and fulfills them with a locally
// synthesised silent WAV of adequate duration. The app's board playback is driven
// entirely by the real <audio> element's loadedmetadata/timeupdate events — with the
// real file 404ing those never fire, currentTime is stuck at 0, and verify-scene.mjs
// "passes" on a permanently-blank board (false positive). Serving a same-duration
// silent file makes loadedmetadata/seeking/timeupdate all fire for real, so this gives
// genuine beat-by-beat geometry verification instead of just eyeballing a screenshot.
// Not a shared-tooling edit — this is a new file, verify-scene.mjs is untouched.
//
// Usage: node scratch/verify-scene-mocked.mjs <sec> '<json reveals en>' '<json reveals hi>' [outdir]
// Env:   CHAPTER_ID, PORT, FORCE_SHOTS=1
import { chromium } from "playwright";
import fs from "fs";

const SEC = process.argv[2];
const REV_EN = JSON.parse(process.argv[3]);
const REV_HI = JSON.parse(process.argv[4]);
const OUT = process.argv[5] || `./shots/sec${SEC}`;
const CHAPTER = process.env.CHAPTER_ID;
const PORT = process.env.PORT || "3000";
const FORCE_SHOTS = process.env.FORCE_SHOTS === "1";
fs.mkdirSync(OUT, { recursive: true });

function silentWav(durationSec, sampleRate = 8000) {
  const numSamples = Math.ceil(durationSec * sampleRate);
  const dataSize = numSamples * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  return buf;
}

const maxRev = Math.max(...REV_EN, ...REV_HI, 0);
const MOCK_DUR = maxRev + 25;
const MOCK_WAV = silentWav(MOCK_DUR);

const customExec = "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const launchOptions = fs.existsSync(customExec) ? { executablePath: customExec } : {};
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });

await page.route("**/audio.monklearning.com/**", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "audio/wav",
    headers: { "Accept-Ranges": "bytes" },
    body: MOCK_WAV,
  });
});

await page.goto(`http://localhost:${PORT}/lessons/${CHAPTER}?sec=${SEC}&t=0`, {
  waitUntil: "domcontentloaded",
});
await page.waitForFunction(
  () => {
    return !![...document.querySelectorAll("svg")].find(
      (s) => s.viewBox?.baseVal?.width === 1080
    );
  },
  { timeout: 30000 }
);
await page.waitForTimeout(1500);

async function seek(t) {
  await page.evaluate((tt) => {
    const a = document.querySelector("audio");
    if (a) a.currentTime = tt;
  }, t);
  await page.waitForFunction(() => {
    const a = document.querySelector("audio");
    return !a || !a.seeking;
  });
  await page.waitForTimeout(1800);
}

async function inspect() {
  return page.evaluate(() => {
    const SAFE = { x1: 36, x2: 1044, y1: 30, y2: 596 };
    const TOL = 1;
    const svg = [...document.querySelectorAll("svg")].find(
      (s) => s.viewBox.baseVal.width === 1080 && s.viewBox.baseVal.height === 620
    );
    if (!svg) return { noSvg: true };
    const inv = svg.getScreenCTM().inverse();
    const toUser = (r) => {
      const a = new DOMPoint(r.left, r.top).matrixTransform(inv);
      const b = new DOMPoint(r.right, r.bottom).matrixTransform(inv);
      return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    };
    const opacityOf = (el) => {
      const g = el.closest("g.sc-fade");
      return g ? parseFloat(getComputedStyle(g).opacity) : 1;
    };
    const shown = (el) => {
      if (opacityOf(el) <= 0.05) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0.5 && r.height > 0.5;
    };

    const texts = [...svg.querySelectorAll("text")].filter(shown).map((el) => ({
      t: (el.textContent || "").trim().slice(0, 24),
      dim: opacityOf(el) < 0.6,
      b: toUser(el.getBoundingClientRect()),
    }));

    const marks = [...svg.querySelectorAll("path,rect,circle,ellipse,line,polygon,polyline")]
      .filter(shown)
      .map((el) => ({ t: el.tagName, b: toUser(el.getBoundingClientRect()) }));

    const overlaps = [];
    for (let i = 0; i < texts.length; i++)
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i].b, b = texts[j].b;
        if (a.x1 < b.x2 - 1.5 && b.x1 < a.x2 - 1.5 && a.y1 < b.y2 - 1.5 && b.y1 < a.y2 - 1.5) {
          const tag = (x) => (x.dim ? `"${x.t}"(dimmed)` : `"${x.t}"`);
          overlaps.push(`${tag(texts[i])} × ${tag(texts[j])}`);
        }
      }

    const overflow = [];
    for (const e of [...texts, ...marks]) {
      const o = [];
      if (e.b.x1 < SAFE.x1 - TOL) o.push(`left=${e.b.x1.toFixed(0)}`);
      if (e.b.x2 > SAFE.x2 + TOL) o.push(`right=${e.b.x2.toFixed(0)}`);
      if (e.b.y1 < SAFE.y1 - TOL) o.push(`top=${e.b.y1.toFixed(0)}`);
      if (e.b.y2 > SAFE.y2 + TOL) o.push(`bottom=${e.b.y2.toFixed(0)}`);
      if (o.length) overflow.push(`${e.t === undefined ? "?" : `"${e.t}"`} ${o.join(" ")}`);
    }

    const groups = [...svg.querySelectorAll("g.sc-fade")].filter(
      (g) => parseFloat(getComputedStyle(g).opacity) > 0.5
    ).length;

    return {
      overlaps,
      overflow,
      groups,
      textCount: texts.length,
      empty: texts.length === 0 && marks.length === 0,
    };
  });
}

async function runLang(lang, revs) {
  await page.getByRole("button", { name: lang === "english" ? "English" : "Hinglish" }).click();
  await page.waitForTimeout(1000);
  let dur = await page.evaluate(() => {
    const a = document.querySelector("audio");
    return a && Number.isFinite(a.duration) ? a.duration : null;
  });
  if (!dur) {
    const maxRev = Math.max(...revs, 0);
    dur = maxRev + 20;
  }
  const times = revs.map((r) => Math.min(r + 1, dur - 0.5));
  times.push(Math.max(0, dur - 1));

  const frames = [];
  let prevGroups = -1;
  for (let k = 0; k < times.length; k++) {
    await seek(times[k]);
    const label = k < revs.length ? `b${k}` : "final";
    if (label === "final") {
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
    const r = await inspect();
    if (r.noSvg) {
      console.log(`  ${lang} ${label}: NO 1080x620 SVG FOUND (page not rendering scene?)`);
      frames.push({ label, fail: true, reasons: ["no-svg"], stall: false });
      continue;
    }
    const stall = label !== "final" && k > 0 && r.groups <= prevGroups;
    prevGroups = r.groups;
    const fail = r.empty || r.overlaps.length > 0 || r.overflow.length > 0;
    frames.push({ label, ...r, fail, stall, t: times[k] });
    if (fail || FORCE_SHOTS) {
      await page.screenshot({ path: `${OUT}/${lang}-${label}.png` });
    }
  }

  const bad = frames.filter((f) => f.fail);
  const stalls = frames.filter((f) => f.stall);
  const pass = bad.length === 0;
  console.log(
    `  ${lang}: ${pass ? "PASS" : "FAIL"}  frames=${frames.length}` +
      `  overlaps=${frames.reduce((n, f) => n + (f.overlaps?.length || 0), 0)}` +
      `  overflow=${frames.reduce((n, f) => n + (f.overflow?.length || 0), 0)}` +
      `  empty=${frames.filter((f) => f.empty).length}` +
      (stalls.length ? `  stalls=${stalls.length}` : "")
  );
  for (const f of bad) {
    for (const o of f.overlaps || []) console.log(`    OVERLAP  ${lang} ${f.label}: ${o}`);
    for (const o of f.overflow || []) console.log(`    OVERFLOW ${lang} ${f.label}: ${o}`);
    if (f.empty) console.log(`    EMPTY    ${lang} ${f.label}: nothing rendered`);
  }
  for (const f of stalls) console.log(`    stall    ${lang} ${f.label}: no new group vs previous beat`);
  return { pass, shots: bad.map((f) => `${lang}-${f.label}.png`) };
}

const en = await runLang("english", REV_EN);
const hi = await runLang("hinglish", REV_HI);
await browser.close();

const passAll = en.pass && hi.pass;
const shots = [...en.shots, ...hi.shots];
console.log(`VERDICT sec=${SEC}: ${passAll ? "PASS" : "FAIL"}  [mocked-audio]`);
if (shots.length) console.log(`SHOTS: ${shots.map((s) => `${OUT}/${s}`).join("  ")}`);
else if (FORCE_SHOTS) console.log(`SHOTS: all frames written to ${OUT}/ (FORCE_SHOTS)`);
else console.log(`SHOTS: none (clean) — no images to open`);
process.exit(passAll ? 0 : 1);
