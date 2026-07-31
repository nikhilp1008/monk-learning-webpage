import { chromium } from "playwright";

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  
  const url = "http://localhost:3000/lessons/cf605dc6-faed-5c33-8107-81114cbfef79?sec=1&t=0";
  console.log("Navigating to", url);
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForFunction(
    () => !![...document.querySelectorAll("svg")].find((s) => s.viewBox?.baseVal?.width === 1080),
    { timeout: 15000 }
  );

  console.log("SVG found!");

  const data = await page.evaluate(() => {
    const SAFE = { x1: 36, x2: 1044, y1: 30, y2: 596 };
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

    const elements = [...svg.querySelectorAll("text, path, rect, circle, g")].map(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return null;
      const u = toUser(r);
      return {
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 20),
        box: u,
        outLeft: u.x1 < SAFE.x1,
        outRight: u.x2 > SAFE.x2,
        outTop: u.y1 < SAFE.y1,
        outBottom: u.y2 > SAFE.y2,
      };
    }).filter(Boolean);

    return { total: elements.length, overflows: elements.filter(e => e.outLeft || e.outRight || e.outTop || e.outBottom) };
  });

  console.log("Inspection result:", JSON.stringify(data, null, 2));
  await browser.close();
}

run().catch(console.error);
