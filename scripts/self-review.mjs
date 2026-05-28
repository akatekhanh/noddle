// Self-review: take screenshots of the local preview at different scroll
// positions, save to /tmp/ for visual inspection.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "/tmp/noddle-review";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Total page height for proper scroll positions.
const fullHeight = await page.evaluate(() => document.body.scrollHeight);
console.log(`page height: ${fullHeight}px`);

const captures = [
  { slug: "01-hero", y: 0 },
  { slug: "02-about", anchor: "#about" },
  { slug: "03-products", anchor: "#products" },
  { slug: "04-showcase-heroprompt", anchor: "#showcase" },
  { slug: "05-showcase-dinh-video", anchor: "#showcase", scrollExtra: 1800 },
  { slug: "06-engineering", anchor: "#engineering" },
  { slug: "07-contact", anchor: "#contact" },
  { slug: "08-faq", anchor: "#faq" },
];

for (const c of captures) {
  if (c.anchor) {
    await page.evaluate(
      ([anchor, extra]) => {
        const el = document.querySelector(anchor);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + (extra || 0);
          window.scrollTo(0, top);
        }
      },
      [c.anchor, c.scrollExtra ?? 0]
    );
  } else {
    await page.evaluate((y) => window.scrollTo(0, y), c.y ?? 0);
  }
  await page.waitForTimeout(800);
  const file = `${OUT}/${c.slug}.png`;
  await page.screenshot({ path: file });
  console.log(`saved ${file}`);
}

await browser.close();
