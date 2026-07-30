// Scene verify rig — VERDICT MODE. Assertions first, pictures only on failure.
//
// Usage: node verify-scene.mjs <sec> '<json reveals en>' '<json reveals hi>' [outdir]
// Env:   CHAPTER_ID, PORT (default 3000), FORCE_SHOTS=1 (write every frame, for spot-checks)
//
// Prints one compact block per language plus a final VERDICT line. Screenshots
// are written ONLY for frames that fail a check (or all frames if FORCE_SHOTS=1),
// so a clean section costs the reader ~10 lines of text and zero images. Open a
// PNG only when a frame is listed under SHOTS.
//
// Gate (a scene is not done until VERDICT is PASS):
//   overlap   — two visible text boxes intersect (>2px). Text-vs-text only:
//               diagram elements legitimately overlap, text colliding does not.
//   overflow  — any visible scene element (text OR stroke: arrowhead, ring,
//               chip, rule) leaves the safe area x∈[36,1044] y∈[30,596].
//   empty     — a reveal frame renders nothing visible (a dropped beat).
// Advisory (printed, not gating):
//   stall     — a beat added no new visible group vs the previous beat
//               (usually a superseded/dim beat; eyeball if unexpected).
import { chromium } from "playwright";
import fs from "fs";

const SEC = process.argv[2];
const REV_EN = JSON.parse(process.argv[3]);
const REV_HI = JSON.parse(process.argv[4]);
const OUT = process.argv[5] || `./shots/sec${SEC}`;
const CHAPTER = process.env.CHAPTER_ID || "8d7ccfaa-af16-53e4-9f28-823c8ea923d1";
const PORT = process.env.PORT || "3000";
const FORCE_SHOTS = process.env.FORCE_SHOTS === "1";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "/Users/nikhi/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await page.goto(`http://localhost:${PORT}/lessons/${CHAPTER}?sec=${SEC}&t=0`, {
  waitUntil: "domcontentloaded",
});
// wait for the scene svg + a loaded audio element rather than networkidle
// (a dev server's HMR socket keeps the network busy, so networkidle never fires)
await page.waitForFunction(
  () => {
    const a = document.querySelector("audio");
    const svg = [...document.querySelectorAll("svg")].find(
      (s) => s.viewBox?.baseVal?.width === 1080
    );
    return a && a.readyState >= 1 && svg;
  },
  { timeout: 30000 }
);
await page.waitForTimeout(1500);

async function seek(t) {
  await page.evaluate((tt) => {
    const a = document.querySelector("audio");
    a.currentTime = tt;
  }, t);
  await page.waitForFunction(() => !document.querySelector("audio").seeking);
  await page.waitForTimeout(1800); // let staggers land at t+~1s frame
}

// One in-page pass: returns every check's raw data for the current frame, all
// computed in viewBox units so the reported numbers read against the spec's
// safe area (x∈[36,1044], y∈[30,596]) directly.
async function inspect() {
  return page.evaluate(() => {
    const SAFE = { x1: 36, x2: 1044, y1: 30, y2: 596 };
    const TOL = 1; // viewBox units of slack before a check fires
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
    const shown = (el) => {
      const g = el.closest("g.sc-fade");
      if (g && parseFloat(getComputedStyle(g).opacity) <= 0.5) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0.5 && r.height > 0.5;
    };

    // visible text boxes (for overlap + overflow + emptiness)
    const texts = [...svg.querySelectorAll("text")].filter(shown).map((el) => ({
      t: (el.textContent || "").trim().slice(0, 24),
      b: toUser(el.getBoundingClientRect()),
    }));

    // visible strokes/marks (for overflow: arrowheads, rings, chips, rules)
    const marks = [...svg.querySelectorAll("path,rect,circle,ellipse,line,polygon,polyline")]
      .filter(shown)
      .map((el) => ({ t: el.tagName, b: toUser(el.getBoundingClientRect()) }));

    // text-vs-text overlap (>2px in screen space ≈ tolerance handled in user units)
    const overlaps = [];
    for (let i = 0; i < texts.length; i++)
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i].b, b = texts[j].b;
        if (a.x1 < b.x2 - 1.5 && b.x1 < a.x2 - 1.5 && a.y1 < b.y2 - 1.5 && b.y1 < a.y2 - 1.5)
          overlaps.push(`"${texts[i].t}" × "${texts[j].t}"`);
      }

    // safe-area overflow across text + marks
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
  await page.waitForTimeout(900);
  const dur = await page.evaluate(() => document.querySelector("audio").duration);
  const times = revs.map((r) => Math.min(r + 1, dur - 0.5));
  times.push(Math.max(0, dur - 1)); // settled final frame

  const frames = [];
  let prevGroups = -1;
  for (let k = 0; k < times.length; k++) {
    await seek(times[k]);
    const label = k < revs.length ? `b${k}` : "final";
    if (label === "final") {
      // last-beat staggers keep playing after a seek — flush so the audit sees
      // the fully settled board
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

  // report
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
console.log(`VERDICT sec=${SEC}: ${passAll ? "PASS" : "FAIL"}`);
if (shots.length) console.log(`SHOTS: ${shots.map((s) => `${OUT}/${s}`).join("  ")}`);
else if (FORCE_SHOTS) console.log(`SHOTS: all frames written to ${OUT}/ (FORCE_SHOTS)`);
else console.log(`SHOTS: none (clean) — no images to open`);
process.exit(passAll ? 0 : 1);
