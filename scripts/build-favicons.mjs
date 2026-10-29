import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const bookBadgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <circle cx="16" cy="16" r="15" fill="#FAF4DD" stroke="#2C3E35" stroke-width="1.5"/>
  <path d="M7 9C7 9 10.5 7.5 16 9C21.5 7.5 25 9 25 9V22C25 22 21.5 20.5 16 22C10.5 20.5 7 22 7 22Z" fill="#D4DEC8"/>
  <!-- Left Page -->
  <path d="M7.5 8.5C7.5 8.5 11 7 16 8.5V21.5C11 20 7.5 21.5 7.5 21.5Z" fill="#FFFFFF" stroke="#2C3E35" stroke-width="1.6" stroke-linejoin="round"/>
  <!-- Right Page -->
  <path d="M24.5 8.5C24.5 8.5 21 7 16 8.5V21.5C21 20 24.5 21.5 24.5 21.5Z" fill="#FAF4DD" stroke="#2C3E35" stroke-width="1.6" stroke-linejoin="round"/>
  <!-- Spine Line -->
  <line x1="16" y1="8.5" x2="16" y2="21.5" stroke="#2C3E35" stroke-width="1.6" stroke-linecap="round"/>
  <!-- Bookmark ribbon -->
  <path d="M16 8.5V16L18 14.5L20 16V8.5" fill="#E07A5F" stroke="#2C3E35" stroke-width="0.8" stroke-linejoin="round"/>
</svg>`;

function createIco(pngEntries) {
  const numImages = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  let offset = 6 + 16 * numImages;

  for (const { buffer, width, height } of pngEntries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngEntries.map(p => p.buffer)]);
}

async function buildFavicons() {
  const svgBuf = Buffer.from(bookBadgeSvg);

  // Write SVG files
  fs.writeFileSync(path.join(process.cwd(), 'app', 'icon.svg'), bookBadgeSvg);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.svg'), bookBadgeSvg);

  // Render PNGs for ICO (16, 32, 48)
  const p16 = await sharp(svgBuf).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuf).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuf).resize(48, 48).png().toBuffer();

  const icoBuf = createIco([
    { buffer: p16, width: 16, height: 16 },
    { buffer: p32, width: 32, height: 32 },
    { buffer: p48, width: 48, height: 48 },
  ]);

  fs.writeFileSync(path.join(process.cwd(), 'app', 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuf);

  // Also write high-res PNG for apple-icon / icon.png
  const p192 = await sharp(svgBuf).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'app', 'icon.png'), p192);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.png'), p192);

  console.log('Successfully generated icon.svg, favicon.ico, and icon.png in both app/ and public/');
}

buildFavicons();
