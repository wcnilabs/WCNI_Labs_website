/**
 * Builds the favicon set from a short form of the logo: "W/" in Plex Mono 700,
 * with the orange slash. The full "WCNI/" is unreadable at 16px, so the tab
 * icon keeps only the first letter and the slash.
 *
 * - icon.svg: no background. The W is carbon on light browser themes and
 *   paper on dark ones (prefers-color-scheme inside the SVG).
 * - favicon.ico / icon-32.png: fallback for browsers without SVG icons.
 *   Carbon W with a thin paper edge, so it reads on light and dark tab bars.
 * - apple-touch-icon.png, icon-192.png, icon-512.png: home-screen icons need a
 *   solid square, so they use a paper tile.
 *
 * Glyphs are converted to SVG paths, so the icons don't depend on any installed font.
 * Run: npm run icons   (only needed if the mark changes; outputs are committed)
 * Then bump ICON_VERSION in src/lib/metadata.ts so browsers drop their cached icons.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = process.cwd();
const out = (file) => join(root, "public", file);

const CARBON = "#111111";
const PAPER = "#F2F0EB";
const SIGNAL = "#FF5A1F";
const CANVAS = 64;
const FONT_SIZE = 100;
const TRACKING = -4; // tighter than text, like the logo

const buffer = await readFile(join(root, "src/fonts/woff/ibm-plex-mono-latin-700-normal.woff"));
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
const unit = FONT_SIZE / font.unitsPerEm;

// Lay out "W/"
let x = 0;
const [letter, slash] = ["W", "/"].map((char) => {
  const glyph = font.charToGlyph(char);
  const path = glyph.getPath(x, 0, FONT_SIZE);
  x += glyph.advanceWidth * unit + TRACKING;
  return path;
});

// Ink bounding box of the mark
const box = [letter, slash].reduce(
  (acc, path) => {
    const b = path.getBoundingBox();
    return {
      x1: Math.min(acc.x1, b.x1),
      y1: Math.min(acc.y1, b.y1),
      x2: Math.max(acc.x2, b.x2),
      y2: Math.max(acc.y2, b.y2),
    };
  },
  { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity },
);
const inkW = box.x2 - box.x1;
const inkH = box.y2 - box.y1;

/** Transform that centres the mark with `pad` (fraction of the canvas) on each side. */
function place(pad) {
  const s = Math.min((CANVAS * (1 - 2 * pad)) / inkW, (CANVAS * (1 - 2 * pad)) / inkH);
  const tx = (CANVAS - inkW * s) / 2 - box.x1 * s;
  const ty = (CANVAS - inkH * s) / 2 - box.y1 * s;
  return `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})`;
}

const letterD = letter.toPathData(2);
const slashD = slash.toPathData(2);
const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">`;

/** Browser tab icon: follows the browser's light/dark theme. */
const tabSvg =
  open +
  `<style>.w{fill:${CARBON}}@media (prefers-color-scheme:dark){.w{fill:${PAPER}}}</style>` +
  `<g transform="${place(0.02)}"><path class="w" d="${letterD}"/><path fill="${SIGNAL}" d="${slashD}"/></g></svg>`;

/** Raster fallback for the tab: carbon W with a paper edge so it shows on dark tab bars too. */
const fallbackSvg =
  open +
  `<g transform="${place(0.06)}" stroke="${PAPER}" stroke-width="7" stroke-linejoin="round" paint-order="stroke">` +
  `<path fill="${CARBON}" d="${letterD}"/><path fill="${SIGNAL}" d="${slashD}"/></g></svg>`;

/** Home-screen icon: paper tile (iOS and Android add their own rounded corners). */
const tileSvg =
  open +
  `<rect width="${CANVAS}" height="${CANVAS}" fill="${PAPER}"/>` +
  `<g transform="${place(0.2)}"><path fill="${CARBON}" d="${letterD}"/><path fill="${SIGNAL}" d="${slashD}"/></g></svg>`;

const png = (source, size) => sharp(Buffer.from(source), { density: 600 }).resize(size, size).png().toBuffer();

/** Minimal .ico container holding PNG images. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const [p16, p32, p180, p192, p512] = await Promise.all([
  png(fallbackSvg, 16),
  png(fallbackSvg, 32),
  png(tileSvg, 180),
  png(tileSvg, 192),
  png(tileSvg, 512),
]);

await Promise.all([
  writeFile(out("icon.svg"), tabSvg),
  writeFile(out("favicon.ico"), ico([{ size: 16, data: p16 }, { size: 32, data: p32 }])),
  writeFile(out("icon-32.png"), p32),
  writeFile(out("apple-touch-icon.png"), p180),
  writeFile(out("icon-192.png"), p192),
  writeFile(out("icon-512.png"), p512),
]);

console.log("Icons written to public/: icon.svg, favicon.ico, icon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png");
