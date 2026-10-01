import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
const origin = 'http://127.0.0.1:4173';
const routes = ['/', '/work/', '/experience/', '/contact/', '/case-studies/', '/case-studies/happylife-tourism/', '/case-studies/upc-realty/', '/case-studies/n8n-acquisition-workflow/'];
for (const route of routes) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 200, route);
  assert(response.headers.get('content-type').startsWith('text/html'), route);
  assert((await response.text()).includes('<main'), route);
}
for (const route of ['/privacy/', '/privacy', '/privacy/index.html', '/missing-page-check/', '/case-studies/missing-case/', '/.htaccess', '/_astro/.htaccess', '/missing-image.webp']) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 404, route);
  assert((await response.text()).includes('noindex, follow'), route);
}
const slash = await fetch(origin + '/case-studies/upc-realty', { redirect: 'manual' });
assert.equal(slash.status, 301);
assert.equal(slash.headers.get('location'), '/case-studies/upc-realty/');
const legacy = await fetch(origin + '/mahmoud-fawzy-cv.pdf', { redirect: 'manual' });
assert.equal(legacy.status, 301);
assert.equal(legacy.headers.get('location'), '/assets/mahmoud-fawzy%20c.v.pdf');
const cv = await fetch(origin + '/assets/mahmoud-fawzy%20c.v.pdf');
assert.equal(cv.status, 200);
assert.equal(cv.headers.get('content-type'), 'application/pdf');
assert.equal(Buffer.from(await cv.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
const image = await fetch(origin + '/assets/images/social-card.png');
assert.equal(image.status, 200);
assert.equal(image.headers.get('content-type'), 'image/png');
for (const route of ['/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml']) assert.equal((await fetch(origin + route)).status, 200, route);
const assets = await readdir('dist/_astro');
for (const [extension, mime] of [['.css', 'text/css'], ['.woff', 'font/woff'], ['.woff2', 'font/woff2']]) {
  const name = assets.find(file => file.endsWith(extension));
  assert(name, `Missing ${extension} asset`);
  const response = await fetch(origin + '/_astro/' + name);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), mime);
}
console.log('HTTP verification passed: eight direct page routes, removed Privacy returns 404, custom 404s, directory/CV redirects, real PDF, social PNG, robots and sitemaps.');
