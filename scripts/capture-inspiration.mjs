// Capture a public site at high res for design study.
// Usage: node scripts/capture-inspiration.mjs <url> [slug]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const [, , url, slug] = process.argv;
if (!url) {
  console.error("usage: capture-inspiration.mjs <url> [slug]");
  process.exit(1);
}

const outDir = "/tmp/noddle-inspiration";
await mkdir(outDir, { recursive: true });
const name = slug || new URL(url).hostname.replace(/\W/g, "-");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForLoadState("load", { timeout: 8000 }).catch(() => {});
// Scroll the full page to trigger lazy content/images.
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = 600;
    const timer = setInterval(() => {
      window.scrollBy(0, step);
      y += step;
      if (y >= document.body.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 120);
  });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);

// Above-the-fold + full-page captures.
const fold = `${outDir}/${name}-fold.png`;
await page.screenshot({ path: fold, fullPage: false });
console.log(`saved ${fold}`);

const full = `${outDir}/${name}-full.png`;
await page.screenshot({ path: full, fullPage: true });
console.log(`saved ${full}`);

await browser.close();
