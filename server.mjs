// Minimal static file server for the built `dist/` SPA.
//
// Replaces `serve -s dist`. Reason: the `serve` package honours HTTP `Range`
// requests and answers them with `206 Partial Content`. Strict link crawlers
// (LinkedInBot) send a `Range` header and treat a non-200 status as a failed
// fetch, so the Open Graph preview breaks even though the page is fine in a
// browser. This server deliberately:
//   - ignores `Range` and never advertises `Accept-Ranges` → always `200`
//   - serves identity (no in-app compression) → avoids the Accept-Encoding +
//     Range edge interaction that makes proxies return "bad gateway" to bots
//   - sets `s-maxage` on HTML so the edge can cache it (mirrors the sibling
//     site that LinkedIn already previews correctly)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Long-lived edge cache for HTML so a bot always gets a cached 200 even if the
// container is cold; browsers revalidate (max-age=0). Hashed assets are immutable.
function cacheControl(ext, pathname) {
  if (ext === ".html") return "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400";
  if (pathname.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  return "public, max-age=86400";
}

async function resolveFile(pathname) {
  // Strip query, decode, normalise, block path traversal.
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const safe = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  let target = join(ROOT, safe);
  if (!target.startsWith(ROOT)) target = join(ROOT, "index.html");
  try {
    const s = await stat(target);
    if (s.isFile()) return target;
  } catch {}
  // SPA fallback: any unknown route serves index.html.
  return join(ROOT, "index.html");
}

const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  try {
    const file = await resolveFile(req.url || "/");
    const ext = extname(file).toLowerCase();
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": cacheControl(ext, (req.url || "/").split("?")[0]),
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`noddle static server on :${PORT}`);
});
