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

try {
  await stat(target);
  console.error(`Target already exists: ${target}`);
  console.error('Refusing to overwrite an existing guide.');
  process.exit(1);
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

await mkdir(targetDir, { recursive: true });
const draft = await readFile(source, 'utf8');
const deploymentDate = koreaDate();

if (dryRun) {
  console.log(`Dry run for guide ${number}: ${fileName}`);
  console.log(`Source: ${source}`);
  console.log(`Target: ${target}`);
  console.log(`Deployment date that would be applied: ${deploymentDate}`);
  process.exit(0);
}

await writeFile(target, applyDeploymentDate(draft, deploymentDate), 'utf8');

console.log(`Promoted guide ${number}: ${fileName}`);
console.log(`Target: ${target}`);
console.log(`Deployment date applied: ${deploymentDate}`);
