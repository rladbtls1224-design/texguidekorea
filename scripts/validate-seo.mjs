import { access, readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { onRequest } from '../functions/_middleware.js';

const distDir = join(process.cwd(), 'dist');
const siteOrigin = 'https://taxguidekorea.com';
const errors = [];

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

function localTargets(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!cleanPath) return [join(distDir, 'index.html')];
  if (pathname.endsWith('/')) return [join(distDir, cleanPath, 'index.html')];
  if (/\.[a-z0-9]+$/i.test(cleanPath)) return [join(distDir, cleanPath)];
  return [
    join(distDir, cleanPath),
    join(distDir, `${cleanPath}.html`),
    join(distDir, cleanPath, 'index.html')
  ];
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const htmlFiles = await findHtmlFiles(distDir);
const indexablePages = [];
const titles = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const fileLabel = relative(distDir, file).split(sep).join('/');
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];

  if (fileLabel === '404.html') {
    if (!noindex) errors.push('404.html must include a noindex robots directive');
    if (canonical) errors.push('404.html must not declare a canonical URL');
    continue;
  }

  if (noindex) errors.push(`${fileLabel} is unexpectedly marked noindex`);
  if (!canonical) {
    errors.push(`${fileLabel} is missing a canonical URL`);
    continue;
  }

  const parsedCanonical = new URL(canonical);
  if (parsedCanonical.origin !== siteOrigin) {
    errors.push(`${fileLabel} has an off-site canonical URL: ${canonical}`);
  }

  indexablePages.push({ file, fileLabel, html, canonical });

  if (title) {
    const titleFiles = titles.get(title) ?? [];
    titleFiles.push(fileLabel);
    titles.set(title, titleFiles);
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of new Set(hrefs)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const targetUrl = new URL(href, siteOrigin);
    const candidates = localTargets(targetUrl.pathname);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      errors.push(`${fileLabel} links to a missing local target: ${href}`);
    }
  }
}

for (const [title, files] of titles) {
  if (files.length > 1) errors.push(`Duplicate title "${title}" in ${files.join(', ')}`);
}

const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8');
const sitemapEntries = new Map(
  [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const loc = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    return [loc, { lastmod }];
  }).filter(([loc]) => Boolean(loc))
);
const sitemapUrls = new Set(sitemapEntries.keys());
const canonicalUrls = new Set(indexablePages.map((page) => page.canonical));

for (const url of canonicalUrls) {
  if (!sitemapUrls.has(url)) errors.push(`Canonical URL missing from sitemap: ${url}`);
}
for (const url of sitemapUrls) {
  if (!canonicalUrls.has(url)) errors.push(`Sitemap contains a non-indexable URL: ${url}`);
}

for (const page of indexablePages) {
  if (!page.html.includes('"dateModified"')) continue;
  if (!sitemapEntries.get(page.canonical)?.lastmod) {
    errors.push(`Article URL is missing lastmod in sitemap: ${page.canonical}`);
  }
}

const robots = await readFile(join(distDir, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://taxguidekorea.com/sitemap.xml')) {
  errors.push('robots.txt does not advertise the canonical sitemap URL');
}

const redirected = await onRequest({
  request: new Request('https://www.taxguidekorea.com/guides/example/?source=test'),
  next: () => { throw new Error('www request must not reach the asset handler'); }
});
if (redirected.status !== 301) errors.push(`www redirect returned ${redirected.status}, expected 301`);
if (redirected.headers.get('location') !== 'https://taxguidekorea.com/guides/example/?source=test') {
  errors.push(`www redirect produced an unexpected location: ${redirected.headers.get('location')}`);
}

const secured = await onRequest({
  request: new Request('https://taxguidekorea.com/'),
  next: () => new Response('ok', { status: 200 })
});
for (const header of ['content-security-policy', 'permissions-policy', 'referrer-policy', 'strict-transport-security', 'x-content-type-options', 'x-frame-options']) {
  if (!secured.headers.has(header)) errors.push(`Security response is missing ${header}`);
}

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`SEO validation passed: ${canonicalUrls.size} canonical pages, ${sitemapUrls.size} sitemap URLs, no broken internal links`);
}
