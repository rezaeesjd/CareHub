#!/usr/bin/env node
/**
 * Post-build sanity checks on dist/. Fails CI if the static output is missing
 * expected pages or still contains a placeholder that must never ship.
 */
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

const requiredFiles = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap-index.xml',
  'en/index.html',
  'it/index.html',
  'en/nursing-care-florence/index.html',
  'en/home-physiotherapy-florence/index.html',
  'en/medical-help-tourists-florence/index.html',
  'en/about/index.html',
  'en/faq/index.html',
  'en/contact/index.html',
  'it/assistenza-infermieristica-firenze/index.html',
  'it/fisioterapia-domicilio-firenze/index.html',
  'it/assistenza-sanitaria-turisti-firenze/index.html',
  'it/chi-siamo/index.html',
  'it/contatti/index.html',
];

// Substrings that must NOT appear anywhere in the built HTML.
const forbidden = ['lorem ipsum', 'TODO_REPLACE', 'FIXME', 'example.com'];

const errors = [];

if (!existsSync(DIST)) {
  console.error('✖ dist/ does not exist — run `npm run build` first.');
  process.exit(1);
}

for (const rel of requiredFiles) {
  const p = resolve(DIST, rel);
  if (!existsSync(p)) {
    errors.push(`Missing expected file: ${rel}`);
    continue;
  }
  // Size sanity applies to HTML pages only (robots.txt / sitemaps are tiny).
  if (rel.endsWith('.html')) {
    const s = await stat(p);
    if (s.size < 500) errors.push(`Suspiciously small HTML file (<500 bytes): ${rel}`);
  }
}

// Scan the English homepage for required conversion elements.
const home = resolve(DIST, 'en/index.html');
if (existsSync(home)) {
  const html = (await readFile(home, 'utf8')).toLowerCase();
  if (!html.includes('wa.me/393758374492')) errors.push('Homepage missing WhatsApp link.');
  if (!html.includes('tel:+393758374492')) errors.push('Homepage missing phone link.');
  if (!html.includes('rel="canonical"')) errors.push('Homepage missing canonical link.');
  if (!html.includes('hreflang="it"')) errors.push('Homepage missing IT hreflang.');
  for (const bad of forbidden) {
    if (html.includes(bad.toLowerCase()))
      errors.push(`Homepage contains forbidden placeholder: "${bad}".`);
  }
}

if (errors.length) {
  console.error('\n✖ verify-dist failed:\n' + errors.map((e) => `  - ${e}`).join('\n') + '\n');
  process.exit(1);
}

console.log(
  `✔ verify-dist passed: ${requiredFiles.length} required files present, homepage conversion elements OK.`
);
