/**
 * Minimal zero-dependency static file server for the exported `out/` folder.
 * Used by `npm start` so previewing the build needs no extra packages.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const ROOT = resolve(process.cwd(), "out");
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "127.0.0.1";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

async function findFile(pathname) {
  // Resolve inside ROOT only; anything that escapes it is treated as missing.
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const base = join(ROOT, safePath);
  if (base !== ROOT && !base.startsWith(ROOT + sep)) return null;

  const candidates = [base, join(base, "index.html"), `${base}.html`];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? HOST}`);
  const file = await findFile(decodeURIComponent(url.pathname));

  if (!file) {
    const notFound = await findFile("/404.html");
    response.writeHead(404, { "Content-Type": MIME_TYPES[".html"] });
    if (notFound) {
      createReadStream(notFound).pipe(response);
    } else {
      response.end("404 Not Found");
    }
    return;
  }

  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(file)] ?? "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(file).pipe(response);
});

server.listen(PORT, HOST, () => {
  console.log(`Serving out/ at http://${HOST}:${PORT}`);
});
