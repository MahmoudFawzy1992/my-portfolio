import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { zipSync, unzipSync } from 'fflate';
import assert from 'node:assert/strict';
const files = {};
async function collect(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) await collect(`${directory}/${entry.name}`, `${relative}/`);
    else files[relative] = new Uint8Array(await readFile(`${directory}/${entry.name}`));
  }
}
await collect('dist');
if (!files['index.html'] || !files['.htaccess'] || !files['404.html']) throw new Error('Incomplete static build.');
await mkdir('output', { recursive: true });
await writeFile('output/portfolio-hostinger.zip', zipSync(files, { level: 6 }));
const extracted = unzipSync(new Uint8Array(await readFile('output/portfolio-hostinger.zip')));
assert.equal(Object.keys(extracted).length, Object.keys(files).length);
for (const [name, bytes] of Object.entries(files)) assert.deepEqual(extracted[name], bytes, `Archive mismatch: ${name}`);
console.log(`Packaged ${Object.keys(files).length} files at archive root: output/portfolio-hostinger.zip`);
