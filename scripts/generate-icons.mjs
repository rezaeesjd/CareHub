#!/usr/bin/env node
/**
 * Regenerate the raster favicon + social-share images from the source SVGs.
 *
 * The generated files ARE committed (they are static brand assets), so you only
 * need to run this after editing public/favicon.svg or the OG source SVG.
 *
 * Requires sharp, which is intentionally NOT a project dependency (it is a heavy
 * native module we don't want in CI). Install it just-in-time to run this:
 *
 *   npm i -D sharp && npm run icons:generate && npm remove sharp
 *
 * Produces (in public/):
 *   favicon.ico            16/32/48 (PNG-in-ICO) — classic fallback
 *   favicon-16.png, favicon-32.png                — PNG tab icons
 *   apple-touch-icon.png   180x180 (white bg)     — iOS home screen
 *   icon-192.png, icon-512.png                    — PWA / manifest
 *   assets/brand/og-default.png  1200x630         — WhatsApp / social preview
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const P = (p) => resolve(ROOT, p);

const faviconSvg = await readFile(P('public/favicon.svg'));
const ogSvg = await readFile(P('public/assets/brand/og-default.svg'));

// High render density keeps downscaled sizes crisp from the 48px-viewBox emblem.
const fav = () => sharp(faviconSvg, { density: 768 });

await fav().resize(16, 16).png().toFile(P('public/favicon-16.png'));
await fav().resize(32, 32).png().toFile(P('public/favicon-32.png'));

// Apple / PWA icons: flatten onto white (iOS renders transparency as black).
await fav()
  .resize(180, 180)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(P('public/apple-touch-icon.png'));
await fav()
  .resize(192, 192)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(P('public/icon-192.png'));
await fav()
  .resize(512, 512)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(P('public/icon-512.png'));

// Open Graph preview (PNG — social platforms do not render SVG previews).
await sharp(ogSvg).resize(1200, 630).png().toFile(P('public/assets/brand/og-default.png'));

// favicon.ico: pack PNGs into an ICO container (modern browsers accept PNG-in-ICO).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => fav().resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
const dir = Buffer.alloc(16 * pngs.length);
let offset = 6 + 16 * pngs.length;
pngs.forEach((buf, i) => {
  const e = 16 * i;
  dir.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], e + 0);
  dir.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], e + 1);
  dir.writeUInt16LE(1, e + 4);
  dir.writeUInt16LE(32, e + 6);
  dir.writeUInt32LE(buf.length, e + 8);
  dir.writeUInt32LE(offset, e + 12);
  offset += buf.length;
});
await writeFile(P('public/favicon.ico'), Buffer.concat([header, dir, ...pngs]));

console.log('✔ Regenerated favicons + og-default.png in public/');
