import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { parseHTML } from 'linkedom';
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const assets = await files('dist/_astro');
const totals = {};
for (const extension of ['.js', '.css', '.woff2']) {
  const matching = assets.filter(file => file.endsWith(extension));
  const bytes = await Promise.all(matching.map(file => readFile(file)));
  totals[extension.slice(1)] = { files: matching.length, bytes: bytes.reduce((sum, data) => sum + data.length, 0), gzipBytes: bytes.reduce((sum, data) => sum + gzipSync(data).length, 0) };
}
const pages = {};
for (const route of ['index.html', 'work/index.html', 'contact/index.html']) {
  const data = await readFile(`dist/${route}`);
  const { document } = parseHTML(data.toString());
  pages[route] = { htmlBytes: data.length, inlineModuleBytes: [...document.querySelectorAll('script[type="module"]:not([src])')].reduce((sum, node) => sum + Buffer.byteLength(node.textContent), 0), reactIslands: document.querySelectorAll('astro-island').length };
}
const originalHero = (await readFile('public/assets/images/hero-profile.webp')).length;
const resizedHero = (await readFile('dist/assets/images/optimized/hero-profile-800.webp')).length;
const result = { method: 'Local build file sizes; separate gzip per asset. These are not Lighthouse, network timing, or field performance scores.', totals, pages, hero: { originalBytes: originalHero, optimized800Bytes: resizedHero } };
await writeFile('docs/BUILD_MEASUREMENTS.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
