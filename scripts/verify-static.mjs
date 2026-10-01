import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { projects } from '../src/data/projects.js';
import sharp from 'sharp';
const root = path.resolve('dist');
const pages = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith('.html')) pages.push(file);
  }
}
await walk(root);
assert.equal(pages.length, 9, 'Eight indexable pages and the real 404');
const titles = new Set(), descriptions = new Set();
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  assert(!/emailjs|EMAILJS|ContactForm|react-dom|@astrojs\/react/.test(html), `${file}: removed form runtime/configuration`);
  const { document } = parseHTML(html);
  assert(!document.querySelector('form, astro-island, iframe'), `${file}: no form, React island or embedded third-party content`);
  assert(!document.querySelector('a[href*="/privacy"]'), `${file}: obsolete privacy link`);
  assert(document.querySelector(`a[href="mailto:mahmoud.fawzy1992.2@gmail.com"]`) || !['index.html', 'contact/index.html'].includes(path.relative(root, file).replaceAll(path.sep, '/')), `${file}: direct email contact`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${file}: single h1`);
  const title = document.querySelector('title')?.textContent;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
  assert(title && description, `${file}: metadata`);
  assert(!titles.has(title) && !descriptions.has(description), `${file}: unique metadata`);
  titles.add(title); descriptions.add(description);
  assert(document.querySelector('link[rel="canonical"]')?.getAttribute('href')?.startsWith('https://mahmoud-fawzy.com/'));
  assert(document.querySelector('script[type="application/ld+json"]'));
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
  const route = file === path.join(root, 'index.html') ? '/' : '/' + path.relative(root, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  for (const element of document.querySelectorAll('a[href], img[src], link[rel="stylesheet"], script[src]')) {
    const value = element.getAttribute('href') || element.getAttribute('src');
    if (!value || /^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `https://mahmoud-fawzy.com${route}`);
    if (url.hash && url.pathname === route) assert(ids.includes(decodeURIComponent(url.hash.slice(1))), `${file}: broken anchor ${value}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert((await stat(target)).isFile(), `${file}: missing ${value}`);
    if (url.hash && url.pathname !== route && target.endsWith('.html')) {
      const linkedPage = parseHTML(await readFile(target, 'utf8')).document;
      assert(linkedPage.getElementById(decodeURIComponent(url.hash.slice(1))), `${file}: broken cross-page anchor ${value}`);
    }
  }
  for (const image of document.querySelectorAll('img')) assert(image.hasAttribute('alt') && image.hasAttribute('width') && image.hasAttribute('height'));
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(node => Number(node.tagName.slice(1)));
  for (let index = 1; index < headings.length; index++) assert(headings[index] <= headings[index - 1] + 1, `${file}: skipped heading level`);
  for (const image of document.querySelectorAll('img[srcset]')) {
    const descriptors = [];
    for (const variant of image.getAttribute('srcset').split(',')) {
      const [source, descriptor] = variant.trim().split(/\s+/);
      const actual = await sharp(path.join(root, source)).metadata();
      assert.equal(`${actual.width}w`, descriptor, `${file}: wrong responsive width for ${source}`);
      descriptors.push(descriptor);
    }
    assert.equal(new Set(descriptors).size, descriptors.length, `${file}: duplicate responsive width`);
  }
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  assert(!/api\.apify\.com|n8n\.cloud|BEGIN PRIVATE KEY|sk-[A-Za-z0-9]{20}/.test(html), `${file}: private workflow details`);
  assert(!/portfolio assets|generated pages|this section demonstrates/i.test(document.querySelector('main')?.textContent ?? ''), `${file}: internal implementation copy`);
}
const { document: home } = parseHTML(await readFile('dist/index.html', 'utf8'));
assert.equal(home.querySelectorAll('.project-card').length, 31, 'Homepage projects remain crawlable before pagination');
assert(home.querySelector('.hero-role .sr-only')?.textContent.includes('Full-Stack Developer'), 'Accessible static professional roles');
assert(!home.querySelector('.hero-caption'), 'Unwanted portrait caption removed');
assert.equal(home.querySelectorAll('.hero-footer .icon-button svg').length, 6, 'Social and technology icons');
const { document: work } = parseHTML(await readFile('dist/work/index.html', 'utf8'));
assert.equal(work.querySelectorAll('.project-card').length, projects.length);
assert.equal(projects.length, 31);
const { document: cases } = parseHTML(await readFile('dist/case-studies/index.html', 'utf8'));
assert.equal(cases.querySelectorAll('.case-card').length, 3);
const { document: experience } = parseHTML(await readFile('dist/experience/index.html', 'utf8'));
assert.equal(experience.querySelectorAll('.experience-card').length, 9);
for (const skill of ['OpenAI Codex', 'Docker', 'Caddy', 'PostgreSQL', 'GitHub Actions', 'TypeScript', 'Prisma', 'Paymob', 'Systemd', 'Transactional email']) assert(experience.querySelector('main')?.textContent.includes(skill), `Missing confirmed skill ${skill}`);
assert((await readFile('dist/assets/mahmoud-fawzy c.v.pdf')).subarray(0, 5).toString() === '%PDF-');
assert.deepEqual(await readFile('dist/assets/mahmoud-fawzy c.v.pdf'), await readFile('public/assets/mahmoud-fawzy c.v.pdf'));
assert((await readFile('dist/.htaccess', 'utf8')).includes('ErrorDocument 404 /404.html'));
assert(!(await readFile('dist/sitemap-0.xml', 'utf8')).includes('/404'));
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length - 1);
assert(!sitemap.includes('<lastmod>'));
assert(!sitemap.includes('/privacy'));
assert((await readFile('dist/robots.txt', 'utf8')).includes('https://mahmoud-fawzy.com/sitemap-index.xml'));
const javascript = (await readdir('dist/_astro')).filter(file => file.endsWith('.js'));
for (const file of javascript) assert(!/BEGIN PRIVATE KEY|api\.apify\.com|n8n\.cloud|sk-[A-Za-z0-9]{20}|emailjs|EMAILJS|react-dom|ContactForm/.test(await readFile(`dist/_astro/${file}`, 'utf8')), `${file}: private or removed form code`);
const cssFiles = (await readdir('dist/_astro')).filter(file => file.endsWith('.css'));
for (const file of cssFiles) assert(!/#(?:ff5b8d|ec0049|cc0040|ff8fa8)\b|contact-form|contact-field/i.test(await readFile(`dist/_astro/${file}`, 'utf8')), `${file}: obsolete colors/form styles`);
const rootFiles = await readdir(root);
assert(!rootFiles.some(file => file.startsWith('.env') || file === 'src' || file === 'node_modules'));
console.log(`Verified ${pages.length} static pages: links/assets, headings, metadata/schema, 31 projects, 3 cases, 9 roles, CV, sitemap and private-data exclusion.`);
