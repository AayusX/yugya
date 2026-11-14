#!/usr/bin/env node
/**
 * Zero-dependency checks for the static export in ./out.
 *
 * Verifies the things that are easy to regress in a hand-maintained static
 * site: canonical host, unique titles and descriptions, one H1 per page,
 * parseable JSON-LD, sitemap/robots consistency, and internal links that
 * resolve to exported files.
 *
 * Run after `npm run build`: `npm run seo:check`
 */

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("out");
const EXPECTED_ORIGIN = "https://www.yugya.com";

const errors = [];
const warnings = [];
const pages = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? decodeEntities(match[1].trim()) : null;
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

function routeFor(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    const route = `/${relative.slice(0, -"index.html".length)}`;
    // Next exports the error page at /404/ and /_not-found/. They are
    // intentionally noindex, are not canonical landing pages, and share copy.
    if (route === "/404/" || route === "/_not-found/") return null;
    return route;
  }
  return null;
}

function expectedCanonical(route) {
  return `${EXPECTED_ORIGIN}${route}`;
}

function resolveInternal(target) {
  const withoutHash = target.split("#")[0].split("?")[0];
  if (!withoutHash.startsWith("/")) return null;

  const decoded = decodeURIComponent(withoutHash);
  const absolute = path.join(ROOT, decoded.replace(/^\//, ""));

  if (withoutHash.endsWith("/")) {
    return path.join(absolute, "index.html");
  }

  const extension = path.extname(absolute);
  if (extension) return absolute;

  return path.join(absolute, "index.html");
}

async function exists(file) {
  try {
    const info = await stat(file);
    return info.isFile();
  } catch {
    return false;
  }
}

async function checkPage(file) {
  const route = routeFor(file);
  if (!route) return;

  const html = await readFile(file, "utf8");
  const relative = path.relative(ROOT, file).split(path.sep).join("/");
  const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
  const description = firstMatch(
    html,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  ) ?? firstMatch(html, /<meta\s+content="([^"]*)"\s+name="description"/i);
  const canonical = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const ogUrl = firstMatch(html, /<meta\s+property="og:url"\s+content="([^"]*)"/i);
  const ogImage = firstMatch(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const robots = firstMatch(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

  if (!title) fail(`${relative}: missing <title>`);
  if (!description) fail(`${relative}: missing meta description`);
  if (!canonical) fail(`${relative}: missing rel=canonical`);
  if (h1Count !== 1) fail(`${relative}: expected exactly one H1, found ${h1Count}`);

  if (canonical && canonical !== expectedCanonical(route)) {
    fail(`${relative}: canonical is ${canonical}, expected ${expectedCanonical(route)}`);
  }
  if (ogUrl && canonical && ogUrl !== canonical) {
    fail(`${relative}: og:url ${ogUrl} does not match canonical ${canonical}`);
  }
  if (ogImage && !ogImage.startsWith(`${EXPECTED_ORIGIN}/`)) {
    fail(`${relative}: og:image is not absolute on ${EXPECTED_ORIGIN}`);
  }
  if (robots && /noindex/i.test(robots)) {
    warn(`${relative}: robots meta contains noindex`);
  }

  for (const [index, match] of jsonLdBlocks.entries()) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed["@context"] !== "https://schema.org") {
        fail(`${relative}: JSON-LD block ${index + 1} has no schema.org @context`);
      }
      const nodes = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
      for (const node of nodes) {
        if (!node["@type"]) fail(`${relative}: JSON-LD node ${index + 1} has no @type`);
      }
    } catch (error) {
      fail(`${relative}: JSON-LD block ${index + 1} is not valid JSON (${error.message})`);
    }
  }

  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const target of hrefs) {
    if (!target.startsWith("/") || target.startsWith("//")) continue;
    if (target.startsWith("/_next/")) continue;

    const resolved = resolveInternal(target);
    if (resolved && !(await exists(resolved))) {
      fail(`${relative}: internal link does not resolve in out/: ${target}`);
    }
  }

  pages.push({ route, relative, title, description, canonical });
}

async function checkSitemap() {
  const file = path.join(ROOT, "sitemap.xml");
  if (!(await exists(file))) {
    fail("sitemap.xml is missing from out/");
    return;
  }

  const xml = await readFile(file, "utf8");
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (locations.length === 0) fail("sitemap.xml has no <loc> entries");

  for (const location of locations) {
    if (!location.startsWith(`${EXPECTED_ORIGIN}/`)) {
      fail(`sitemap.xml: URL is not on ${EXPECTED_ORIGIN}: ${location}`);
    }
    const pathname = new URL(location).pathname;
    const resolved = resolveInternal(pathname);
    if (resolved && !(await exists(resolved))) {
      fail(`sitemap.xml: URL does not exist in out/: ${location}`);
    }
  }

  return locations;
}

async function checkRobots() {
  const file = path.join(ROOT, "robots.txt");
  if (!(await exists(file))) {
    fail("robots.txt is missing from out/");
    return;
  }

  const text = await readFile(file, "utf8");

  if (!/User-Agent:\s*\*/i.test(text)) fail("robots.txt does not address User-Agent: *");
  if (!/Allow:\s*\//i.test(text)) fail("robots.txt does not allow /");
  if (!text.includes(`Sitemap: ${EXPECTED_ORIGIN}/sitemap.xml`)) {
    fail("robots.txt does not point at the canonical sitemap URL");
  }

  const host = text.match(/^Host:\s*(.+)$/im)?.[1].trim();
  if (host && host.includes("://")) {
    fail("robots.txt Host must be a hostname, not a URL");
  }
}

async function main() {
  const files = await walk(ROOT);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    await checkPage(file);
  }

  const sitemapLocations = await checkSitemap();
  await checkRobots();

  const titles = new Map();
  const descriptions = new Map();
  for (const page of pages) {
    if (!page.title) continue;
    if (titles.has(page.title)) {
      fail(`duplicate title: "${page.title}" on ${titles.get(page.title)} and ${page.relative}`);
    }
    titles.set(page.title, page.relative);

    if (!page.description) continue;
    if (descriptions.has(page.description)) {
      fail(
        `duplicate description on ${descriptions.get(page.description)} and ${page.relative}`,
      );
    }
    descriptions.set(page.description, page.relative);
  }

  if (sitemapLocations) {
    const sitemapRoutes = new Set(
      sitemapLocations.map((location) => new URL(location).pathname),
    );
    for (const page of pages) {
      if (!sitemapRoutes.has(page.route)) {
        warn(`page not listed in sitemap.xml: ${page.route}`);
      }
    }
  }

  console.log(`Checked ${pages.length} HTML pages, ${pages.length ? titles.size : 0} unique titles.`);

  for (const warning of warnings) console.warn(`WARN  ${warning}`);
  for (const error of errors) console.error(`ERROR ${error}`);

  if (errors.length > 0) {
    console.error(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nNo errors. ${warnings.length} warning(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
