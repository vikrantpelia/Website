// Regenerates public/apple-touch-icon.png (180x180) from the same VP
// monogram treatment used by favicon.ico: paper background, ink letters —
// solid background since apple-touch-icon has no theme-awareness and iOS
// composites it directly (no transparency support). Run with:
//   node scripts/build-apple-touch-icon.mjs
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'apple-touch-icon.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#FAF9F7"/>
  <text x="90" y="98" text-anchor="middle" dominant-baseline="central" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="700" font-size="84" letter-spacing="-3.4" fill="#17191D">VP</text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg), { density: 384 })
  .resize(180, 180)
  .png()
  .toBuffer();

writeFileSync(OUT, buffer);
console.log('apple-touch-icon.png written,', buffer.length, 'bytes');
