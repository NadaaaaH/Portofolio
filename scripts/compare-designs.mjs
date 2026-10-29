import fs from 'fs';
import sharp from 'sharp';

// Design 1: Polished circular badge (scrapbook sticker style)
// Sage border, cream background, pine book with coral bookmark
const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
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

// Design 2: Standalone open book with Sage Cover backing (fills canvas, crisp contrast everywhere)
const standaloneBookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!-- Outer Sage Cover with dark pine border -->
  <path d="M3 8C3 8 8 5.5 16 8C24 5.5 29 8 29 8V25C29 25 24 22.5 16 25C8 22.5 3 25 3 25Z" fill="#607D67" stroke="#2C3E35" stroke-width="1.5" stroke-linejoin="round"/>
  <!-- Left Page -->
  <path d="M4.5 7C4.5 7 9 5 16 7V23.5C9 21.5 4.5 23.5 4.5 23.5Z" fill="#FFFDF8" stroke="#2C3E35" stroke-width="1.5" stroke-linejoin="round"/>
  <!-- Right Page -->
  <path d="M27.5 7C27.5 7 23 5 16 7V23.5C23 21.5 27.5 23.5 27.5 23.5Z" fill="#FAF4DD" stroke="#2C3E35" stroke-width="1.5" stroke-linejoin="round"/>
  <!-- Center spine line -->
  <line x1="16" y1="7" x2="16" y2="23.5" stroke="#2C3E35" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Bookmark Ribbon -->
  <path d="M16 7V17L18.5 15.2L21 17V7" fill="#E07A5F" stroke="#2C3E35" stroke-width="0.8" stroke-linejoin="round"/>
  <!-- Page line accents -->
  <line x1="8" y1="12" x2="13" y2="11.2" stroke="#BCCAB4" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="8" y1="16" x2="13" y2="15.2" stroke="#BCCAB4" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="19" y1="11.2" x2="24" y2="12" stroke="#BCCAB4" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="19" y1="15.2" x2="24" y2="16" stroke="#BCCAB4" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

// Design 3: Direct Lucide BookOpen representation, but enhanced with dual-tone fill (cream + white) and soft white glow/backing so it never disappears on dark or light tabs
const directLucideSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none">
  <!-- Subtle back plate to ensure visibility on dark tabs -->
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="#FFFDF8" stroke="#2C3E35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="#FAF4DD" stroke="#2C3E35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 7v8" stroke="#E07A5F" stroke-width="2" stroke-linecap="round"/>
</svg>`;

async function run() {
  const list = [
    { name: 'v1_badge', svg: badgeSvg },
    { name: 'v2_standalone', svg: standaloneBookSvg },
    { name: 'v3_lucide', svg: directLucideSvg }
  ];

  for (const item of list) {
    const buf = Buffer.from(item.svg);
    // Dark tab sim
    await sharp({
      create: { width: 140, height: 40, channels: 4, background: { r: 32, g: 33, b: 36, alpha: 1 } }
    })
    .composite([{ input: await sharp(buf).resize(20, 20).png().toBuffer(), left: 12, top: 10 }])
    .png()
    .toFile(`C:/Users/Amira Hasna/.gemini/antigravity/brain/31eabab2-5f7b-4680-90c0-bb1b56897137/${item.name}_dark.png`);

    // Light tab sim
    await sharp({
      create: { width: 140, height: 40, channels: 4, background: { r: 230, g: 232, b: 235, alpha: 1 } }
    })
    .composite([{ input: await sharp(buf).resize(20, 20).png().toBuffer(), left: 12, top: 10 }])
    .png()
    .toFile(`C:/Users/Amira Hasna/.gemini/antigravity/brain/31eabab2-5f7b-4680-90c0-bb1b56897137/${item.name}_light.png`);
  }
  console.log('Done!');
}
run();
