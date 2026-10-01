import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../src/data/projects.js';
import { caseStudies } from '../src/data/caseStudies.js';
import { profile, technologyGroups } from '../src/data/profile.js';

test('project archive and selected case studies retain the approved content', () => {
  assert.equal(projects.length, 31);
  assert.equal(new Set(projects.map(project => project.id)).size, 31);
  assert(projects.some(project => Object.values(project).includes('https://hl-tourism.net/')));
  assert(projects.some(project => Object.values(project).includes('https://upcrealty.com/')));
  assert.deepEqual(caseStudies.map(study => study.slug).sort(), ['happylife-tourism', 'n8n-acquisition-workflow', 'upc-realty']);
});

test('direct contact and confirmed Codex skills remain available', () => {
  assert.equal(profile.email, 'mahmoud.fawzy1992.2@gmail.com');
  assert(profile.linkedin.startsWith('https://www.linkedin.com/'));
  assert.equal(profile.github, 'https://github.com/MahmoudFawzy1992');
  assert(technologyGroups.find(group => group.title === 'AI-assisted engineering').items.includes('OpenAI Codex'));
});

test('hosting rules preserve static routing and restrict immutable caching to hashed assets', async () => {
  const root = await readFile('public/.htaccess', 'utf8');
  const assets = await readFile('public/_astro/.htaccess', 'utf8');
  assert(!/^\s*RewriteRule/im.test(root));
  assert(root.includes('DirectoryIndex index.html'));
  assert(root.includes('ErrorDocument 404 /404.html'));
  assert(root.includes('Redirect 301 /mahmoud-fawzy-cv.pdf'));
  assert(root.includes('Header set Cache-Control "no-cache"'));
  assert(!/^\s*Header.*immutable/im.test(root));
  assert(!/^\s*Header.*X-XSS-Protection/im.test(root));
  const expression = assets.match(/<FilesMatch "([^"]+)">/)[1];
  const hashed = new RegExp(expression);
  assert(hashed.test('BaseLayout.CQ6tlScu.css'));
  assert(hashed.test('poppins-latin-400-normal.cpxAROuN.woff2'));
  for (const name of ['style.css', 'script.js', 'hero-profile-800.webp', 'social-card.png', 'mahmoud-fawzy c.v.pdf']) assert(!hashed.test(name), name);
});
