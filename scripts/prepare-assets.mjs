import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { projects } from '../src/data/projects.js';
const directory = 'public/assets/images/optimized';
const generatorTime = (await stat(new URL(import.meta.url))).mtimeMs;
await mkdir(directory, { recursive: true });
let preparedImages = 0;
const sources = [...new Set([...projects.map(project => project.image), '/assets/images/hero-profile.webp', '/assets/images/contact-me.webp'])];
for (const source of sources) {
  const input = path.join('public', source);
  const name = path.parse(source).name;
  const inputTime = (await stat(input)).mtimeMs;
  const { width: sourceWidth } = await sharp(input).metadata();
  // Small originals produce identical variants; Contact renders only the 480 image.
  const widths = sourceWidth <= 480 || source === '/assets/images/contact-me.webp' ? [480] : [480, 800];
  for (const width of widths) {
    preparedImages++;
    const target = path.join(directory, `${name}-${width}.webp`);
    try {
      if ((await stat(target)).mtimeMs >= Math.max(generatorTime, inputTime)) continue;
    } catch { /* Missing outputs are generated below. */ }
    const bytes = await sharp(await readFile(input)).resize({ width, withoutEnlargement: true }).webp({ quality: 76 }).toBuffer();
    await writeFile(target, bytes);
  }
}
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#212428"/><rect x="80" y="80" width="80" height="5" fill="#ff014f"/><g font-family="Arial,sans-serif"><text x="80" y="150" font-size="22" fill="#c4cfde" letter-spacing="3">DEVELOPER PORTFOLIO</text><text x="75" y="265" font-size="78" fill="#ff014f" font-weight="700">Mahmoud Fawzy</text><text x="80" y="340" font-size="36" fill="#ffffff">Senior Web Developer</text><text x="80" y="392" font-size="36" fill="#ffffff">&amp; Automation Engineer</text><text x="80" y="485" font-size="25" fill="#c4cfde">WordPress · React / Next.js · Shopify · n8n</text><text x="80" y="560" font-size="22" fill="#c4cfde">mahmoud-fawzy.com</text></g></svg>`;
await sharp(Buffer.from(social)).png().toFile('public/assets/images/social-card.png');
console.log(`Prepared ${preparedImages} responsive images and social preview.`);
