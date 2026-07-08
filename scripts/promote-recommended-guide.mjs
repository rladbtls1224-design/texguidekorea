import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const guides = {
  '1': 'f2-7-visa-income-proof-tax-records-korea.md',
  '2': 'e7-visa-tax-documents-income-proof-korea.md',
  '3': 'korea-tax-filing-side-income-foreigners.md',
  '4': 'missed-may-tax-filing-deadline-korea.md',
  '5': 'leaving-korea-tax-checklist-foreigners.md',
  '6': 'korea-tax-treaty-exemption-foreign-teachers.md',
  '7': 'overseas-income-tax-korea-foreigners.md',
  '8': 'korean-tax-vs-pension-health-insurance-foreigners.md'
};

const number = process.argv[2];
const fileName = guides[number];

if (!fileName) {
  console.error('Usage: npm run promote:guide -- <number>');
  console.error('Available numbers: 1, 2, 3, 4, 5, 6, 7, 8');
  process.exit(1);
}

const root = process.cwd();
const source = path.join(root, 'drafts', 'recommended-guides', fileName);
const targetDir = path.join(root, 'src', 'content', 'guides');
const target = path.join(targetDir, fileName);

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
await copyFile(source, target);

console.log(`Promoted guide ${number}: ${fileName}`);
console.log(`Target: ${target}`);
