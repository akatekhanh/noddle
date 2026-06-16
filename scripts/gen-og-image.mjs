// Generates the static social-preview image at public/og-image.png (1200×630).
// Renders a branded card via headless Chromium (same Playwright dep the other
// capture scripts use). Re-run after changing brand copy/colors:
//   node scripts/gen-og-image.mjs
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og-image.png");

// Brand tokens mirror src/index.css (.dark): graphite bg, ochre primary, cream fg.
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Geist', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: #0E1015;
    background-image:
      radial-gradient(900px 500px at 78% -10%, rgba(216,154,60,0.22), transparent 60%),
      radial-gradient(700px 600px at 0% 110%, rgba(216,154,60,0.10), transparent 55%);
    color: #E8E4D8;
    width: 1200px; height: 630px;
    display: flex; flex-direction: column; justify-content: center;
    padding: 88px 96px;
    position: relative;
  }
  .dot { width: 18px; height: 18px; border-radius: 50%; background: #D89A3C; box-shadow: 0 0 24px rgba(216,154,60,0.8); }
  .brandrow { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }
  .brand { font-size: 40px; font-weight: 700; letter-spacing: -0.02em; }
  h1 { font-size: 76px; line-height: 1.04; font-weight: 700; letter-spacing: -0.03em; max-width: 940px; }
  h1 .ochre { color: #D89A3C; }
  p.sub { margin-top: 28px; font-size: 30px; line-height: 1.4; color: #A7A293; max-width: 880px; }
  .chips { margin-top: 48px; display: flex; gap: 14px; flex-wrap: wrap; }
  .chip {
    font-size: 24px; padding: 12px 22px; border-radius: 999px;
    border: 1px solid #252934; background: rgba(22,25,34,0.6); color: #E8E4D8;
  }
  .url { position: absolute; bottom: 56px; right: 96px; font-size: 26px; color: #D89A3C; font-weight: 600; }
</style></head><body>
  <div class="brandrow"><div class="dot"></div><div class="brand">noddle</div></div>
  <h1>Production <span class="ochre">data &amp; AI</span> products, shipped end-to-end.</h1>
  <p class="sub">A unified data platform, an AI prompt marketplace, and a trail-running race planner — backend, frontend, infra &amp; billing in production.</p>
  <div class="chips">
    <div class="chip">Noddle Data Platform</div>
    <div class="chip">HeroPrompt</div>
    <div class="chip">Dinh Discovery</div>
  </div>
  <div class="url">noddle.dev</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("Wrote", out);
