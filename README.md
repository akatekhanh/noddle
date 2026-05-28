# Noddle

Portfolio landing page for three shipped products: **Data Platform Core**, **HeroPrompt**, **Dinh Discovery**.

Built on Vite + React 18 + TypeScript + Tailwind + shadcn/ui. Production bundle ~98 KB gzipped.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy

```bash
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

Deploy `dist/` to any static host: Vercel, Netlify, Cloudflare Pages, GitHub Pages.

## Structure

- `src/App.tsx` — section composition
- `src/components/` — section components (Hero, About, Features, Showcase, Services, Cta, FAQ, Footer)
- `src/assets/screenshots/` — real product screenshots used by Showcase
- `scripts/capture-screenshots.mjs` — Playwright script that captures live product screens
- `index.html` — SEO meta tags
- `tailwind.config.js` — theme config

## Refresh screenshots

```bash
# All three products (skip the ones whose dev servers aren't running)
node scripts/capture-screenshots.mjs

# Just one product
node scripts/capture-screenshots.mjs heroprompt
node scripts/capture-screenshots.mjs data-platform
node scripts/capture-screenshots.mjs dinh-discovery
```

The data-platform target requires login. Pass credentials via env vars:

```bash
DP_LOGIN_EMAIL=you@example.dev DP_LOGIN_PASSWORD=*** \
  node scripts/capture-screenshots.mjs data-platform
```

## Self-review the live preview

Take a series of screenshots of the running preview at a typical desktop
viewport (1440×900) so you can review the layout from a user's eyes:

```bash
npm run preview &
node scripts/self-review.mjs
# 8 screenshots saved to /tmp/noddle-review/
```

Each capture is anchored to a section (`#about`, `#products`, `#showcase`,
`#engineering`, `#contact`, `#faq`) so adding sections doesn't break offsets.

## Probe routes (for adding new shots)

Before adding new routes to the capture script, sanity-check that they return
200 and what their title is:

```bash
node scripts/probe-routes.mjs https://heroprompt.store /prompts /skills /packs
```

## Capture inspiration

Save above-the-fold and full-page screenshots of any public site for design
study. Output goes to `/tmp/noddle-inspiration/`.

```bash
node scripts/capture-inspiration.mjs https://www.getwren.ai/ wren
```

## Capture a Dinh Discovery race detail

`/race/[id]` requires a real race in the database. Use the helper to upload
a synthetic GPX and capture the result:

```bash
# Start dinh-discovery first (cached image — no network needed):
cd /Users/admin/git_personal/dinh-discovery-sim && docker compose up -d

# From this project:
node scripts/upload-and-capture.mjs

# Or with a custom GPX file:
GPX_PATH=/path/to/your.gpx node scripts/upload-and-capture.mjs
```

Screenshots are captured at 1920×2400 viewport with 2× device scale (so 3840×4800
native pixels) and converted to WebP @ q85:

```bash
for f in src/assets/screenshots/*/*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp" && rm "$f"
done
```

## Credits

Template adapted from [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page) by Leopoldo Miranda (MIT).
