// Capture real product screenshots with Playwright.
// Usage: node scripts/capture-screenshots.mjs [product]
//   product = heroprompt | data-platform | dinh-discovery | all (default)
//
// Auth (data-platform) — set before running:
//   DP_LOGIN_EMAIL=you@example.dev DP_LOGIN_PASSWORD=secret \
//     node scripts/capture-screenshots.mjs data-platform
//
// Outputs PNGs to src/assets/screenshots/<product>/<slug>.png

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/assets/screenshots");

// Wide + tall viewport so sites that use inner-scroll layouts (fixed sidebar,
// content `overflow: auto`) still render most of their content in one frame.
// 1920px wide matches the common 2x desktop layout breakpoint and gives sharp
// screenshots even when downsized to ~1200px display width.
const VIEWPORT = { width: 1920, height: 2400 };
const DEFAULT_FULL_PAGE = false;
// 2x device pixel ratio for retina-sharp screenshots.
const DEVICE_SCALE = 2;

const targets = {
  heroprompt: {
    baseUrl: "https://heroprompt.store",
    shots: [
      { slug: "home", path: "/" },
      { slug: "prompts", path: "/prompts" },
      { slug: "skills", path: "/skills" },
      { slug: "packs", path: "/packs" },
    ],
  },
  "data-platform": {
    baseUrl: "http://localhost:3000",
    login:
      process.env.DP_LOGIN_EMAIL && process.env.DP_LOGIN_PASSWORD
        ? {
            url: "http://localhost:3000/login",
            email: process.env.DP_LOGIN_EMAIL,
            password: process.env.DP_LOGIN_PASSWORD,
          }
        : null,
    shots: [
      { slug: "home", path: "/" },
      { slug: "catalog", path: "/catalog" },
      { slug: "lineage", path: "/lineage" },
      { slug: "quality", path: "/quality" },
      { slug: "scheduler", path: "/scheduler" },
    ],
  },
  "dinh-discovery": {
    baseUrl: "http://localhost:3001",
    shots: [
      { slug: "home", path: "/" },
      { slug: "upload", path: "/upload" },
      { slug: "discover", path: "/discover" },
      { slug: "race", path: "/race/1" },
      { slug: "pricing", path: "/pricing" },
    ],
  },
};

async function captureProduct(browser, name, { baseUrl, shots, login }) {
  const dir = join(OUT, name);
  await mkdir(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await ctx.newPage();
  if (login) {
    try {
      await page.goto(login.url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);
      await page.fill('input[type="email"], input[name="email"]', login.email);
      await page.fill(
        'input[type="password"], input[name="password"]',
        login.password
      );
      await page.click('button[type="submit"]');
      await page.waitForURL((u) => !u.pathname.startsWith("/login"), {
        timeout: 10000,
      });
      console.log(`[${name}] logged in`);
    } catch (err) {
      console.warn(
        `[${name}] login failed (${err.message}). Screenshots will capture the unauthenticated state.`
      );
    }
  } else if (name === "data-platform") {
    console.warn(
      `[${name}] no credentials set — skipping login. Set DP_LOGIN_EMAIL and DP_LOGIN_PASSWORD to authenticate.`
    );
  }
  let ok = 0;
  let fail = 0;
  for (const shot of shots) {
    const { slug, path } = shot;
    const url = `${baseUrl}${path}`;
    const file = join(dir, `${slug}.png`);
    try {
      const res = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      if (!res || res.status() >= 400) {
        console.error(`[${name}] ${slug} → HTTP ${res?.status()} (skipped)`);
        fail++;
        continue;
      }
      await page.waitForLoadState("load", { timeout: 5000 }).catch(() => {});
      // Wait until the "Loading..." spinner disappears (SPA initial fetch).
      await page
        .waitForFunction(
          () => !document.body.innerText.trim().startsWith("Loading"),
          { timeout: 12000 }
        )
        .catch(() => {});
      // Scroll to bottom and back to trigger lazy-loaded content/images.
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
      await page.waitForTimeout(1500);
      const fullPage =
        typeof shot.fullPage === "boolean" ? shot.fullPage : DEFAULT_FULL_PAGE;
      await page.screenshot({ path: file, fullPage });
      console.log(`[${name}] ${slug} → ${file}`);
      ok++;
    } catch (err) {
      console.error(`[${name}] ${slug} → ${err.message}`);
      fail++;
    }
  }
  await ctx.close();
  return { ok, fail };
}

const which = process.argv[2] || "all";
const browser = await chromium.launch();

const summary = {};
for (const [name, cfg] of Object.entries(targets)) {
  if (which !== "all" && which !== name) continue;
  console.log(`\n→ ${name} (${cfg.baseUrl})`);
  summary[name] = await captureProduct(browser, name, cfg);
}

await browser.close();
console.log("\nSummary:");
for (const [name, s] of Object.entries(summary)) {
  console.log(`  ${name}: ${s.ok} ok, ${s.fail} failed`);
}
