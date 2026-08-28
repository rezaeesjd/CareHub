#!/usr/bin/env node
/**
 * Partner referral + QR generator (the lightweight version — no dashboard, no
 * commission logic). Creates a branded QR SVG pointing at a ref-tagged URL and
 * records the partner in an internal registry (partners.json).
 *
 * Usage:
 *   npm run partner:create -- --code H001 --name "Hotel Example" --type hotel
 *
 * Options:
 *   --code   Partner code (e.g. H001). Required. [A-Za-z0-9_-]
 *   --name   Human-readable partner name. Required.
 *   --type   Partner type / utm_source (hotel, bnb, property-manager, ...). Default: referral
 *   --lang   Landing language (en|it). Default: en
 *
 * Output:
 *   public/assets/partners/<CODE>.svg   (printable QR)
 *   partners.json                       (internal registry — no commissions)
 *
 * NEVER put commission percentages or health data in this registry or the QR.
 */
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { loadEnv } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
// Honour a domain set only in .env (same as astro.config), so printed QR codes
// never bake in the fallback domain. loadEnv also picks up process.env vars.
const env = loadEnv(process.env.NODE_ENV ?? 'production', ROOT, 'PUBLIC_');
const SITE_URL = (env.PUBLIC_SITE_URL || 'https://florencecare24.com').replace(/\/$/, '');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));
const code = String(args.code || '').trim();
const name = String(args.name || '').trim();
const type = String(args.type || 'referral').trim();
const lang = args.lang === 'it' ? 'it' : 'en';

if (!code) fail('Missing --code (e.g. --code H001)');
if (!/^[A-Za-z0-9_-]{1,32}$/.test(code))
  fail('--code must be 1–32 chars: letters, numbers, - or _');
if (!name) fail('Missing --name (e.g. --name "Hotel Example")');

const utmSource = type.replace(/[^A-Za-z0-9_-]/g, '') || 'referral';
const targetUrl = `${SITE_URL}/${lang}/?ref=${encodeURIComponent(code)}&utm_source=${encodeURIComponent(utmSource)}&utm_medium=referral`;

const outDir = resolve(ROOT, 'public/assets/partners');
const outSvg = resolve(outDir, `${code}.svg`);
const registryPath = resolve(ROOT, 'partners.json');

const svg = await QRCode.toString(targetUrl, {
  type: 'svg',
  margin: 1,
  color: { dark: '#1b3a6b', light: '#ffffff' },
  errorCorrectionLevel: 'M',
});

if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
await writeFile(outSvg, svg, 'utf8');

// Update the internal registry (create if missing).
let registry = { partners: [] };
if (existsSync(registryPath)) {
  try {
    registry = JSON.parse(await readFile(registryPath, 'utf8'));
    if (!Array.isArray(registry.partners)) registry.partners = [];
  } catch {
    fail('partners.json is not valid JSON — fix or remove it and retry.');
  }
}
const existingIndex = registry.partners.findIndex((p) => p.code === code);
const entry = {
  code,
  name,
  type: utmSource,
  lang,
  url: targetUrl,
  qr: `public/assets/partners/${code}.svg`,
  createdAt:
    existingIndex >= 0 ? registry.partners[existingIndex].createdAt : new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
if (existingIndex >= 0) registry.partners[existingIndex] = entry;
else registry.partners.push(entry);
registry.partners.sort((a, b) => a.code.localeCompare(b.code));
await writeFile(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');

console.log(`
✔ Partner ${existingIndex >= 0 ? 'updated' : 'created'}

  Partner: ${name}
  Code:    ${code}
  Type:    ${utmSource}
  URL:     ${targetUrl}
  QR:      public/assets/partners/${code}.svg

Print the QR on the partner's flyer / desk card. Attribution persists for 90
days and the code is appended to the visitor's WhatsApp message automatically.
`);
