import { copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const source = join(distDir, 'sitemap-index.xml');
const target = join(distDir, 'sitemap.xml');

await stat(source);
await copyFile(source, target);
console.log('Copied sitemap-index.xml to sitemap.xml');
