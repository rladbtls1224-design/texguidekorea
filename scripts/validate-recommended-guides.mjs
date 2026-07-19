import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';
import { draftFolder, recommendedGuides } from './recommended-guides.mjs';

const root = process.cwd();
const draftDir = path.join(root, 'drafts', draftFolder);
const publishedDir = path.join(root, 'src', 'content', 'guides');
const required = [
  'title',
  'seoTitle',
  'thumbnailSuggestion',
  'description',
  'pubDate',
  'updatedDate',
  'lastReviewed',
  'category',
  'difficulty',
  'tags',
  'quickAnswer',
  'audience',
  'keyPoints',
  'documents',
  'mistakes',
  'related',
  'faqs',
  'sources'
];

const files = (await readdir(draftDir))
  .filter((name) => name.endsWith('.md') && name !== 'README.md')
  .sort();

if (files.length !== 14) {
  throw new Error(`Expected 14 recommended guides, found ${files.length}.`);
}

const mappedFiles = Object.values(recommendedGuides).sort();
if (JSON.stringify(files) !== JSON.stringify(mappedFiles)) {
  throw new Error('Draft files do not match the numbered deployment map.');
}

const seenTitles = new Set();
const sourceUrls = new Set();

for (const fileName of files) {
  const markdown = await readFile(path.join(draftDir, fileName), 'utf8');
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    throw new Error(`Frontmatter not found: ${fileName}`);
  }

  const data = YAML.parse(match[1]);

  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(`Missing ${field}: ${fileName}`);
    }
  }

  if (data.seoTitle.length > 65) {
    throw new Error(`seoTitle exceeds 65 characters: ${fileName}`);
  }

  if (seenTitles.has(data.title)) {
    throw new Error(`Duplicate title: ${data.title}`);
  }
  seenTitles.add(data.title);

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    throw new Error(`At least one official source is required: ${fileName}`);
  }

  for (const source of data.sources) {
    if (source.type !== 'official' || !String(source.url).startsWith('https://')) {
      throw new Error(`Invalid official source: ${fileName}`);
    }
    sourceUrls.add(source.url);
  }

  try {
    await stat(path.join(publishedDir, fileName));
    throw new Error(`Draft already exists in the published collection: ${fileName}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

if (process.argv.includes('--check-links')) {
  const results = await Promise.all([...sourceUrls].map(async (url) => {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'Mozilla/5.0 KoreaTaxGuideDraftValidator/1.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(20_000)
      });
      return { url, status: response.status };
    } catch (error) {
      return { url, status: 'ERROR', message: error.message };
    }
  }));

  for (const result of results) {
    console.log(`${result.status}\t${result.url}${result.message ? `\t${result.message}` : ''}`);
  }

  const broken = results.filter((result) => typeof result.status === 'number' && result.status === 404);
  if (broken.length > 0) {
    throw new Error(`${broken.length} official source URL(s) returned 404.`);
  }
}

console.log(`Validated ${files.length} recommended guide drafts.`);
