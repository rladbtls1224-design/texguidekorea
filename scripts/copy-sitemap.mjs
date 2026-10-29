import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const siteOrigin = 'https://taxguidekorea.com';

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findHtmlFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(entryPath);
  }

  return files;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

const urls = new Map();

for (const file of await findHtmlFiles(distDir)) {
  const html = await readFile(file, 'utf8');
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;

  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  if (!canonical) continue;

  const parsedUrl = new URL(canonical);
  if (parsedUrl.origin !== siteOrigin) {
    throw new Error(`Refusing to add an off-site canonical URL to the sitemap: ${canonical}`);
  }

  const lastmod = html.match(/"dateModified":"([^"]+)"/)?.[1];
  urls.set(canonical, { loc: canonical, lastmod });
}

const entries = [...urls.values()]
  .sort((a, b) => a.loc.localeCompare(b.loc))
  .map(({ loc, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : undefined,
    '  </url>'
  ].filter(Boolean).join('\n'))
  .join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  entries,
  '</urlset>',
  ''
].join('\n');

await Promise.all([
  writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(join(distDir, 'sitemap-0.xml'), sitemap, 'utf8')
]);

console.log(`Generated canonical sitemap with ${urls.size} URLs`);
