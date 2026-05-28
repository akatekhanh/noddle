// Upload a synthetic GPX and capture the race detail page that results.
// Outputs to src/assets/screenshots/dinh-discovery/{race,track,plan}.png
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/assets/screenshots/dinh-discovery");
const GPX_PATH = process.env.GPX_PATH || "/tmp/synthetic-dinh.gpx";
const BASE = "http://localhost:3001";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 2400 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("[browser err]", msg.text());
});

console.log("→ /upload");
await page.goto(`${BASE}/upload`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

// Find file input and upload synthetic GPX
const fileInput = page.locator('input[type="file"]').first();
console.log("uploading synthetic GPX…");
await fileInput.setInputFiles(GPX_PATH);

// Wait for navigation to /race/<id> or for some race detail UI
await page.waitForTimeout(8000);
const finalUrl = page.url();
console.log("after upload url:", finalUrl);

if (!finalUrl.includes("/race/")) {
  console.warn("did not navigate to /race/<id>, capturing current view");
  await page.screenshot({ path: join(OUT, "upload-after.png") });
  await browser.close();
  process.exit(0);
}

// Wait a bit more for race data to render
await page.waitForTimeout(3000);

// Scroll to trigger lazy maps/charts
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = 400;
    const timer = setInterval(() => {
      window.scrollBy(0, step);
      y += step;
      if (y >= document.body.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(3000);

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2000);
const file = join(OUT, "race.png");
await page.screenshot({ path: file });
console.log(`saved ${file}`);

await browser.close();
console.log("done");
