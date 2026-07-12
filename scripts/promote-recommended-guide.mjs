import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const guides = {
  '1': 'korea-tax-payment-certificate-foreigners.md',
  '2': 'hometax-fact-certificate-foreigners.md',
  '3': 'visit-korean-tax-office-foreigners.md',
  '4': 'multiple-employers-tax-filing-korea-foreigners.md',
  '5': 'job-change-year-end-settlement-korea-foreigners.md',
  '6': 'severance-pay-tax-korea-foreigners.md',
  '7': 'monthly-rent-tax-deduction-korea-foreigners.md',
  '8': 'cash-receipt-credit-card-deductions-korea-foreigners.md',
  '9': 'dependent-deductions-foreign-workers-korea.md',
  '10': 'insurance-pension-deductions-year-end-settlement-foreigners.md',
  '11': 'business-registration-foreign-freelancers-korea.md',
  '12': 'vat-guide-foreign-freelancers-korea.md',
  '13': 'creator-youtuber-tax-korea-foreigners.md',
  '14': 'korean-tax-notices-letters-foreigners.md'
};

const number = process.argv[2];
const fileName = guides[number];

if (!fileName) {
  console.error('Usage: npm run promote:guide -- <number>');
  console.error(`Available numbers: ${Object.keys(guides).join(', ')}`);
  process.exit(1);
}

const root = process.cwd();
const source = path.join(root, 'drafts', 'recommended-guides-2026-07-12', fileName);
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
await writeFile(target, applyDeploymentDate(draft, deploymentDate), 'utf8');

console.log(`Promoted guide ${number}: ${fileName}`);
console.log(`Target: ${target}`);
console.log(`Deployment date applied: ${deploymentDate}`);
