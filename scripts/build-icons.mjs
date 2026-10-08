#!/usr/bin/env node
// Build the favicon.ico and the app icons in public/ from public/favicon.svg.
//
//     node scripts/build-icons.mjs
//
// Needs `npm install` first (sharp comes with Astro). Run it from the project root.
// favicon.svg is the one source: change it and rerun, and every raster follows.
//
//   favicon.ico            16, 32 and 48 px, for browsers that skip SVG icons
//   apple-touch-icon.png   180 px, square and full-bleed (iOS rounds the corners itself)
//   icon-192.png, icon-512.png   rounded, for "any"
//   icon-maskable-512.png  full-bleed, art scaled into the safe zone (the OS cuts its own shape)

import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SVG = 'public/favicon.svg';
const svg = readFileSync(SVG, 'utf8');

const pick = (re, what) => {
  const m = svg.match(re);
  if (!m) throw new Error(`${SVG}: no ${what} found, so the maskable and full-bleed versions cannot be derived`);
  return m[0];
};
const defs = pick(/<defs>[\s\S]*?<\/defs>/, '<defs>');
const plate = pick(/<rect[^>]*\/>/, 'background <rect>');
const art = pick(/<g transform[\s\S]*<\/g>/, 'art group');
const NIGHT = plate.match(/fill="([^"]+)"/)[1];

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${defs}${inner}</svg>`;
const square = wrap(`<rect width="64" height="64" fill="${NIGHT}"/>${art}`);
// The safe zone of a maskable icon is a circle 80% of the width across; the art's corners reach
// just past it at full size, so it is drawn at 75% around the centre.
const maskable = wrap(
  `<rect width="64" height="64" fill="${NIGHT}"/>` +
    `<g transform="translate(32 32) scale(.75) translate(-32 -32)">${art}</g>`,
);

const png = (source, size) =>
  sharp(Buffer.from(source), { density: (72 * size) / 64 })
    .resize(size, size)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

// An .ico is a small directory followed by PNG files, which every current browser reads.
const ico = (images) => {
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(1, 2); // type: icon
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(({ size, data }, i) => {
    const at = 6 + 16 * i;
    head.writeUInt8(size, at); // width (0 would mean 256)
    head.writeUInt8(size, at + 1);
    head.writeUInt16LE(1, at + 4); // colour planes
    head.writeUInt16LE(32, at + 6); // bits per pixel
    head.writeUInt32LE(data.length, at + 8);
    head.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map((i) => i.data)]);
};

const out = (name, data) => {
  writeFileSync(`public/${name}`, data);
  console.log(`public/${name}  ${data.length} bytes`);
};

out('favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(svg, size) })))));
out('apple-touch-icon.png', await png(square, 180));
out('icon-192.png', await png(svg, 192));
out('icon-512.png', await png(svg, 512));
out('icon-maskable-512.png', await png(maskable, 512));
