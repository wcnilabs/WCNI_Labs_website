/**
 * Tiny static server for the production build in out/ — the same files
 * Cloudflare Pages serves. Handles /path/ → /path/index.html and the 404 page.
 *
 * Run: npm run build && npm run preview   →   http://localhost:4173
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, clean), join(root, clean, "index.html"), join(root, `${clean}.html`)];
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  const status = file ? 200 : 404;
  const target = file ?? join(root, "404.html");
  // Next writes the social images without an extension (Cloudflare gets the type from public/_headers).
  const type = /-image$/.test(target) ? "image/png" : (types[extname(target)] ?? "application/octet-stream");
  res.writeHead(status, { "content-type": type });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
