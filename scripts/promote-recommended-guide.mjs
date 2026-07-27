import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { draftFolder, recommendedGuides } from './recommended-guides.mjs';

const number = process.argv[2];
const fileName = recommendedGuides[number];
const dryRun = process.argv.includes('--dry-run');

if (!fileName) {
  console.error('Usage: npm run promote:guide -- <number>');
  console.error(`Available numbers: ${Object.keys(recommendedGuides).join(', ')}`);
  process.exit(1);
}

const root = process.cwd();
const source = path.join(root, 'drafts', draftFolder, fileName);
const targetDir = path.join(root, 'src', 'content', 'guides');
const target = path.join(targetDir, fileName);
const publicationState = path.join(root, 'src', 'data', 'recommendedGuidePublication.ts');
const slug = fileName.replace(/\.md$/, '');

function koreaDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function applyDeploymentDate(markdown, date) {
  return markdown
    .replace(/^pubDate:\s*.*$/m, `pubDate: ${date}`)
    .replace(/^updatedDate:\s*.*$/m, `updatedDate: ${date}`)
    .replace(/^lastReviewed:\s*.*$/m, `lastReviewed: ${date}`);
}

try {
  await stat(source);
} catch {
  console.error(`Draft not found: ${source}`);
  process.exit(1);
}

await mkdir(targetDir, { recursive: true });
const deploymentDate = koreaDate();

let guideMarkdown;
try {
  guideMarkdown = await readFile(target, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  guideMarkdown = await readFile(source, 'utf8');
}

const publicationSource = await readFile(publicationState, 'utf8');
const listMatch = publicationSource.match(/publishedRecommendedGuideSlugs: string\[\] = \[([\s\S]*?)\];/);
if (!listMatch) {
  throw new Error('Could not read the recommended-guide publication list.');
}
const publishedSlugs = [...listMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
const nextPublishedSlugs = [...new Set([...publishedSlugs, slug])];
const nextPublicationSource = publicationSource.replace(
  /publishedRecommendedGuideSlugs: string\[\] = \[[\s\S]*?\];/,
  `publishedRecommendedGuideSlugs: string[] = [${nextPublishedSlugs.map((item) => `\n  '${item}'`).join(',')}\n];`
);

if (dryRun) {
  console.log(`Dry run for guide ${number}: ${fileName}`);
  console.log(`Draft source: ${source}`);
  console.log(`Target: ${target}`);
  console.log(`Public route: /guides/${slug}/`);
  console.log(`Deployment date that would be applied: ${deploymentDate}`);
  process.exit(0);
}

await writeFile(target, applyDeploymentDate(guideMarkdown, deploymentDate), 'utf8');
await writeFile(publicationState, nextPublicationSource, 'utf8');

console.log(`Promoted guide ${number}: ${fileName}`);
console.log(`Target: ${target}`);
console.log(`Public route enabled: /guides/${slug}/`);
console.log(`Deployment date applied: ${deploymentDate}`);
