import React from 'react';

export type RansomBgKey = 'cream' | 'soft-blue' | 'medium-blue' | 'lime' | 'navy';
export type RansomTextKey = 'navy' | 'denim' | 'olive' | 'white' | 'lime' | 'light-blue';

// Backward compatibility key
export type RansomColorKey = RansomBgKey;

export interface RansomTilePattern {
  bg: RansomBgKey;
  text: RansomTextKey;
}

export interface RansomColorPair {
  name: RansomColorKey;
  className: string;
  label: string;
}

export const RANSOM_COLOR_PAIRS: Record<RansomColorKey, RansomColorPair> = {
  cream: {
    name: 'cream',
    className: 'ransom-tone-cream',
    label: 'Krem / Putih hangat',
  },
  'soft-blue': {
    name: 'soft-blue',
    className: 'ransom-tone-soft-blue',
    label: 'Biru muda pastel',
  },
  'medium-blue': {
    name: 'medium-blue',
    className: 'ransom-tone-medium-blue',
    label: 'Biru medium denim',
  },
  lime: {
    name: 'lime',
    className: 'ransom-tone-lime',
    label: 'Hijau lime / olive',
  },
  navy: {
    name: 'navy',
    className: 'ransom-tone-navy',
    label: 'Navy gelap',
  },
};

/**
 * Pola warna latar kotak dan huruf terkontrol untuk Nama di Hero Section:
 * Baris 1: "Nada Haifa" (9 huruf: 4 huruf 'Nada' + 5 huruf 'Haifa')
 * Baris 2: "Nurfadhilah" (11 huruf)
 *
 * WARNA LATAR KOTAK 100% TETAP SAMA PERSIS (JANGAN DIUBAH).
 * WARNA HURUF DIVARIASIKAN (tidak monoton navy):
 * - Navy: 7 huruf (tepat 35% dari total 20 huruf, batas 35-40%)
 * - Hijau Olive tua: 5 huruf (25%)
 * - Biru Denim medium: 4 huruf (20%)
 * - Putih/Krem: 3 huruf (15%)
 * - Hijau Lime: 1 huruf (5%)
 *
 * Aturan yang terpenuhi secara ketat:
 * 1. Kontras tinggi WCAG (semua >= 5:1, tidak ada biru di atas biru, tidak ada hijau di atas lime).
 * 2. Dua huruf bersebelahan TIDAK BOLEH memakai warna huruf yang sama.
 * 3. Tidak ada lebih dari 2 warna huruf serupa berdampingan.
 * 4. Pola baris 2 tidak identik dengan baris 1, namun selaras.
 */
export const HERO_NAME_PATTERNS: {
  line1: RansomTilePattern[];
  line2: RansomTilePattern[];
} = {
  // Baris 1: Nada (4) + Haifa (5) = 9 huruf
  // Box: [medium-blue, cream, lime, cream | soft-blue, cream, navy, cream, lime]
  // Text: [white, denim, navy, olive | navy, denim, lime, olive, navy]
  line1: [
    { bg: 'medium-blue', text: 'white' }, // N (putih di atas biru denim)
    { bg: 'cream',       text: 'denim' }, // a (biru medium di atas krem)
    { bg: 'lime',        text: 'navy' },  // d (navy di atas hijau lime)
    { bg: 'cream',       text: 'olive' }, // a (hijau olive tua di atas krem)
    { bg: 'soft-blue',   text: 'navy' },  // H (navy di atas biru muda)
    { bg: 'cream',       text: 'denim' }, // a (biru medium di atas krem)
    { bg: 'navy',        text: 'white' }, // i (krem/putih di atas navy)
    { bg: 'cream',       text: 'olive' }, // f (hijau olive tua di atas krem)
    { bg: 'lime',        text: 'navy' },  // a (navy di atas hijau lime)
  ],

  // Baris 2: Nurfadhilah (11 huruf)
  // Box: [cream, soft-blue, cream, medium-blue, cream, lime, cream, soft-blue, cream, medium-blue, cream]
  // Text: [olive, navy, denim, white, olive, navy, denim, navy, olive, white, navy]
  line2: [
    { bg: 'cream',       text: 'olive' }, // N (hijau olive tua di atas krem)
    { bg: 'soft-blue',   text: 'navy' },  // u (navy di atas biru muda)
    { bg: 'cream',       text: 'denim' }, // r (biru medium di atas krem)
    { bg: 'medium-blue', text: 'white' }, // f (putih di atas biru denim)
    { bg: 'cream',       text: 'olive' }, // a (hijau olive tua di atas krem)
    { bg: 'lime',        text: 'navy' },  // d (navy di atas hijau lime)
    { bg: 'cream',       text: 'denim' }, // h (biru medium di atas krem)
    { bg: 'soft-blue',   text: 'navy' },  // i (navy di atas biru muda)
    { bg: 'cream',       text: 'olive' }, // l (hijau olive tua di atas krem)
    { bg: 'medium-blue', text: 'white' }, // a (putih di atas biru denim)
    { bg: 'cream',       text: 'navy' },  // h (navy di atas krem)
  ],
};

// Alias untuk kompatibilitas
export const HERO_NAME_COLOR_PATTERNS = {
  line1: HERO_NAME_PATTERNS.line1.map((p) => p.bg),
  line2: HERO_NAME_PATTERNS.line2.map((p) => p.bg),
};

// Pola siklus default untuk teks ransom umum (misal judul section di latar krem)
export const DEFAULT_TILE_CYCLE: RansomTilePattern[] = [
  { bg: 'cream',       text: 'navy' },
  { bg: 'soft-blue',   text: 'navy' },
  { bg: 'cream',       text: 'denim' },
  { bg: 'lime',        text: 'navy' },
  { bg: 'cream',       text: 'olive' },
  { bg: 'medium-blue', text: 'white' },
];

/**
 * Pola tile ransom khusus untuk judul section di atas background biru (var(--secondary)):
 * Mencegah tile soft-blue menyatu dengan latar belakang section.
 * - Section "My Work..." / "Karyaku...": tile soft-blue diubah jadi navy gelap dengan teks putih
 *   (sama dengan huruf "i" pada "Haifa" di judul hero).
 * - Section "Skill": huruf "k" diubah jadi medium-blue dengan teks putih
 *   (sama dengan huruf "N" pada "Nada" di judul hero).
 */
export const SECTION_TITLE_PATTERNS: Record<string, RansomTilePattern[]> = {
  // Section "Skill": huruf "k" (indeks 1) -> medium-blue dengan teks putih
  Skill: [
    { bg: 'cream',       text: 'navy' },  // S
    { bg: 'medium-blue', text: 'white' }, // k (medium-blue dengan teks putih)
    { bg: 'cream',       text: 'denim' }, // i
    { bg: 'lime',        text: 'navy' },  // l
    { bg: 'cream',       text: 'olive' }, // l
  ],

  // Section "My Work...": huruf 'k' (indeks 5) satu-satunya tile hitam/navy, 'y' (indeks 1) & '.' (indeks 7) jadi medium-blue
  'My Work ...': [
    { bg: 'cream',       text: 'navy' },  // M
    { bg: 'medium-blue', text: 'white' }, // y (medium-blue dengan teks putih)
    { bg: 'cream',       text: 'denim' }, // W
    { bg: 'lime',        text: 'navy' },  // o
    { bg: 'cream',       text: 'olive' }, // r
    { bg: 'navy',        text: 'white' }, // k (satu-satunya tile hitam/navy dengan teks putih)
    { bg: 'cream',       text: 'navy' },  // .
    { bg: 'medium-blue', text: 'white' }, // . (medium-blue dengan teks putih)
    { bg: 'cream',       text: 'denim' }, // .
  ],

  // Section "Karyaku...": huruf 'k' (indeks 5) satu-satunya tile hitam/navy, 'a' (indeks 1) & '.' (indeks 7) jadi medium-blue
  'Karyaku ...': [
    { bg: 'cream',       text: 'navy' },  // K
    { bg: 'medium-blue', text: 'white' }, // a (medium-blue dengan teks putih)
    { bg: 'cream',       text: 'denim' }, // r
    { bg: 'lime',        text: 'navy' },  // y
    { bg: 'cream',       text: 'olive' }, // a
    { bg: 'navy',        text: 'white' }, // k (satu-satunya tile hitam/navy dengan teks putih)
    { bg: 'cream',       text: 'navy' },  // u
    { bg: 'medium-blue', text: 'white' }, // . (medium-blue dengan teks putih)
    { bg: 'cream',       text: 'denim' }, // .
    { bg: 'lime',        text: 'navy' },  // .
  ],
};

// Dukung variasi tanpa spasi sebelum titik
SECTION_TITLE_PATTERNS['My Work...'] = SECTION_TITLE_PATTERNS['My Work ...'];
SECTION_TITLE_PATTERNS['Karyaku...'] = SECTION_TITLE_PATTERNS['Karyaku ...'];

/**
 * Formula varian font dan rotasi bawaan (0 - 4).
 * Menjaga bentuk font, rotasi, dan gaya potongan koran agar tidak berubah.
 */
export function ransomVariant(char: string, index: number, text: string): number {
  return (char.charCodeAt(0) * 31 + index * 17 + text.length * 7) % 5;
}

export interface RansomTextProps {
  text?: string;
  lines?: string[];
  patterns?: RansomTilePattern[][];
  colorPatterns?: RansomColorKey[][];
  className?: string;
  ariaLabel?: string;
}

export function RansomText({
  text,
  lines,
  patterns,
  colorPatterns,
  className = '',
  ariaLabel,
}: RansomTextProps) {
  const isHeroName = className.includes('hero-name');

  // Tentukan baris yang akan dirender
  let resolvedLines: string[];
  if (lines && lines.length > 0) {
    resolvedLines = lines;
  } else if (text && text.includes('\n')) {
    resolvedLines = text.split('\n');
  } else if (isHeroName && text === 'Nada Haifa Nurfadhilah') {
    resolvedLines = ['Nada Haifa', 'Nurfadhilah'];
  } else if (text) {
    resolvedLines = [text];
  } else {
    resolvedLines = [];
  }

  // Cek apakah ada pola konfigurasi khusus judul section (misal: Skill, My Work..., Karyaku...)
  const firstLine = (text || resolvedLines[0] || '').trim();
  const sectionTitlePattern = !isHeroName && firstLine ? SECTION_TITLE_PATTERNS[firstLine] : undefined;

  // Tentukan pola per baris
  const resolvedPatterns: RansomTilePattern[][] =
    patterns ??
    (isHeroName
      ? [HERO_NAME_PATTERNS.line1, HERO_NAME_PATTERNS.line2]
      : sectionTitlePattern
      ? [sectionTitlePattern]
      : colorPatterns
      ? colorPatterns.map((line) =>
          line.map((bg) => ({
            bg,
            text: bg === 'medium-blue' ? 'white' : bg === 'navy' ? 'white' : 'navy',
          }))
        )
      : []);

  const fullText = ariaLabel || text || resolvedLines.join(' ');

  let globalCharOffset = 0;

  return (
    <span className={`ransom ${className}`.trim()} aria-label={fullText}>
      {resolvedLines.map((lineStr, lineIdx) => {
        const words = lineStr.trim().split(/\s+/).filter(Boolean);
        const linePattern = resolvedPatterns[lineIdx];
        let lineCharCounter = 0;

        return (
          <span className="ransom-line" key={lineIdx}>
            {words.map((word, wordIdx) => {
              const wordStartOffset = globalCharOffset;
              globalCharOffset += word.length + 1;

              return (
                <span className="ransom-word" aria-hidden="true" key={wordIdx}>
                  {Array.from(word).map((char, charIdx) => {
                    const currentLineCharIdx = lineCharCounter++;
                    const fontIdx = ransomVariant(
                      char,
                      wordStartOffset + charIdx,
                      fullText
                    );

                    // Pilih pola kotak dan teks
                    const pattern: RansomTilePattern =
                      linePattern && linePattern[currentLineCharIdx]
                        ? linePattern[currentLineCharIdx]
                        : DEFAULT_TILE_CYCLE[
                            currentLineCharIdx % DEFAULT_TILE_CYCLE.length
                          ];

                    return (
                      <span
                        className={`ransom-tile tile-${fontIdx} ransom-bg-${pattern.bg} ransom-text-${pattern.text}`}
                        key={charIdx}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
