import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG 1: Standalone Book (transparent bg, cream pages, forest green cover & spine, coral bookmark)
const bookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <!-- Back cover / trim -->
  <path d="M2.5 7.5C2.5 7.5 7 5.5 16 7.5C25 5.5 29.5 7.5 29.5 7.5V26.5C29.5 26.5 25 24.5 16 26.5C7 24.5 2.5 26.5 2.5 26.5Z" fill="#2C3E35" rx="1"/>
  <!-- Left page -->
  <path d="M3.5 6.5C3.5 6.5 8 4.5 16 6.5V24.5C8 22.5 3.5 24.5 3.5 24.5Z" fill="#FAF4DD" stroke="#2C3E35" stroke-width="1.6" stroke-linejoin="round"/>
  <!-- Right page -->
  <path d="M28.5 6.5C28.5 6.5 24 4.5 16 6.5V24.5C24 22.5 28.5 24.5 28.5 24.5Z" fill="#FFFDF8" stroke="#2C3E35" stroke-width="1.6" stroke-linejoin="round"/>
  <!-- Spine line -->
  <line x1="16" y1="6.5" x2="16" y2="24.5" stroke="#2C3E35" stroke-width="1.6" stroke-linecap="round"/>
  <!-- Bookmark Ribbon -->
  <path d="M16 6.5V17L18.5 15.2L21 17V6.5" fill="#E07A5F" stroke="#2C3E35" stroke-width="0.8" stroke-linejoin="round"/>
  <!-- Page line accents -->
  <line x1="7" y1="12" x2="12" y2="11" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="7" y1="16" x2="12" y2="15" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="7" y1="20" x2="11" y2="19.2" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="11" x2="25" y2="12" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="15" x2="25" y2="16" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="21" y1="19.2" x2="25" y2="20" stroke="#D4DEC8" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

// SVG 2: Lucide BookOpen shape in a cute rounded circle badge (cream background with pine book and sage/coral accents)
const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <circle cx="16" cy="16" r="15" fill="#FAF4DD" stroke="#2C3E35" stroke-width="1.5"/>
  <g transform="translate(4, 4)">
    <!-- Lucide BookOpen Path with Fill and Stroke -->
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="#D4DEC8" stroke="#2C3E35" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="#FFFDF8" stroke="#2C3E35" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 7v8" stroke="#E07A5F" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`;

// SVG 3: Pure Lucide BookOpen with high contrast fill for any tab (light/dark)
const lucidePureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none">
  <!-- Left Page -->
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="#FAF4DD" stroke="#2C3E35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Right Page -->
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="#FFFFFF" stroke="#2C3E35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Bookmark ribbon in middle -->
  <path d="M12 7v7" stroke="#E07A5F" stroke-width="2" stroke-linecap="round"/>
</svg>`;

fs.writeFileSync('temp_book.svg', bookSvg);
fs.writeFileSync('temp_badge.svg', badgeSvg);
fs.writeFileSync('temp_lucide.svg', lucidePureSvg);
console.log('SVGs created');
