// Verify the Hero peek carousel rotates every 3s.
// Snapshots the peek area at t=0, 3.2s, 6.4s, 9.6s, 12.8s.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] || "http://localhost:5173/";
const outDir = "/tmp/noddle-carousel-check";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
await page.waitForLoadState("load", { timeout: 8000 }).catch(() => {});
// Wait for at least one peek image to render.
await page
  .waitForSelector("section img[src*='heroprompt']", { timeout: 8000 })
  .catch(() => {});

async function snap(label) {
  const file = `${outDir}/peek-${label}.png`;
  await page.screenshot({ path: file, fullPage: false });
  // Report which image is currently opaque (opacity === 1).
  const visible = await page.evaluate(() => {
    const imgs = Array.from(
      document.querySelectorAll("section img")
    ).filter((img) => img.src.includes("heroprompt"));
    const opaque = imgs.find((img) => parseFloat(getComputedStyle(img).opacity) > 0.5);
    return opaque ? opaque.src.split("/").pop() : "(none)";
  });
  const url = await page.evaluate(() => {
    const bar = document.querySelector(".font-mono");
    return bar ? bar.textContent : "(none)";
  });
  console.log(`${label}: visible=${visible}  bar=${url}`);
}

await snap("0s");
await page.waitForTimeout(3200);
await snap("3s");
await page.waitForTimeout(3200);
await snap("6s");
await page.waitForTimeout(3200);
await snap("9s");
await page.waitForTimeout(3200);
await snap("12s");

await browser.close();
console.log(`\nScreenshots in ${outDir}`);
