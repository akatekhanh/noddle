// Quick route probe — visit a list of paths and report status + title.
// Usage: node scripts/probe-routes.mjs <baseUrl> <path1> <path2> ...
import { chromium } from "playwright";

const [, , baseUrl, ...paths] = process.argv;
if (!baseUrl || paths.length === 0) {
  console.error("usage: probe-routes.mjs <baseUrl> <path> [...]");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const p of paths) {
  try {
    const res = await page.goto(`${baseUrl}${p}`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });
    await page.waitForTimeout(800);
    const title = await page.title();
    console.log(`${res?.status() ?? "?"}  ${p}  →  ${title}`);
  } catch (err) {
    console.log(`ERR  ${p}  →  ${err.message.split("\n")[0]}`);
  }
}
await browser.close();
