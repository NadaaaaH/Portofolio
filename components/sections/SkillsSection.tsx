"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Code2,
  Database,
  Feather,
  Globe,
  Palette,
  PenTool,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { skills, type SkillItem } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { TornPaperEdge } from '@/components/decorations';
import styles from './SkillsSection.module.css';

// ── Konstanta Urutan Kategori ──
export const CATEGORY_ORDER = [
  'technology',
  'design',
  'writing',
  'soft skill',
] as const;

// ── Konstanta Arah Geser Per Baris ──
// Baris 1: kanan ke kiri ('left')
// Baris 2: kanan ke kiri ('left')
// Baris 3: kiri ke kanan ('right')
export const ROW_DIRECTIONS: Array<'left' | 'right'> = ['left', 'left', 'right'];

// ── Konstanta Indeks Kartu Hijau Per Baris ──
// Baris 1: indeks 2 (kartu ke-3)
// Baris 2: indeks 1 (kartu ke-2)
// Baris 3: indeks 2 (kartu ke-3, sejajar dengan baris 1)
export const ROW_HIGHLIGHT_INDICES = [2, 1, 2] as const;

// ── Konstanta Animasi (Reuse dari CertificatesSection) ──
const AUTOPLAY_INTERVAL = 3800; // ms
const SLIDE_DURATION = 0.7; // detik durasi geser
const SLIDE_EASE = 'power2.out';

/**
 * Pemetaan prioritas kategori skill berdasarkan CATEGORY_ORDER.
 * Mendukung variasi penulisan seperti "design/tools", "writing/content", "soft skill".
 */
export function getCategoryPriority(category?: string): number {
  if (!category) return 999;
  const lower = category.toLowerCase().trim();
  if (lower.startsWith('tech')) return 0;
  if (lower.startsWith('design') || lower.includes('tool')) return 1;
  if (lower.startsWith('writ') || lower.includes('content')) return 2;
  if (lower.startsWith('soft')) return 3;

  const idx = CATEGORY_ORDER.findIndex(c => c.toLowerCase() === lower);
  return idx !== -1 ? idx : 999;
}

/**
 * Stable sort skill berdasarkan prioritas kategori:
 * technology -> design/tools -> writing/content -> soft skill
 * Urutan awal di data dipertahankan di dalam kategori yang sama.
 */
export function sortSkillsByCategory<T extends { category?: string }>(skillsList: T[]): T[] {
  return [...skillsList].sort((a, b) => {
    const pA = getCategoryPriority(a.category);
    const pB = getCategoryPriority(b.category);
    return pA - pB;
  });
}

/**
 * Rumus pembagian skill ke 3 baris:
 * capacity = jumlah kartu muat dalam 1 baris
 * Mode A: n <= 3 * capacity (Isi berurutan baris 1..3, rata kiri, baris kosong dibiarkan)
 * Mode B: n > 3 * capacity (Sebar merata 3 baris dengan selisih maks 1, kategori terjaga & soft skill di ujung akhir baris 3)
 */
export function distributeSkills<T>(
  sortedSkills: T[],
  capacity: number
): [T[], T[], T[]] {
  const n = sortedSkills.length;
  if (n === 0) return [[], [], []];

  const maxCapacity = 3 * capacity;

  // Mode A: belum penuh 3 baris (isi berurutan dari baris 1 sampai kapasitas penuh)
  if (n <= maxCapacity) {
    const row0 = sortedSkills.slice(0, Math.min(n, capacity));
    const row1 = sortedSkills.slice(
      Math.min(n, capacity),
      Math.min(n, capacity * 2)
    );
    const row2 = sortedSkills.slice(Math.min(n, capacity * 2));
    return [row0, row1, row2];
  }

  // Mode B: sudah lebih dari penuh (sebar merata ke 3 baris)
  const base = Math.floor(n / 3);
  const sisa = n % 3;

  const count0 = base + (sisa > 0 ? 1 : 0);
  const count1 = base + (sisa > 1 ? 1 : 0);

  const row0 = sortedSkills.slice(0, count0);
  const row1 = sortedSkills.slice(count0, count0 + count1);
  const row2 = sortedSkills.slice(count0 + count1);

  return [row0, row1, row2];
}

/**
 * Pemetaan icon Lucide berdasarkan nama/kata kunci skill.
 */
function getSkillIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes('html') || n.includes('css') || n.includes('web')) return Globe;
  if (n.includes('tailwind') || n.includes('style')) return Palette;
  if (n.includes('figma')) return PenTool;
  if (
    n.includes('ui') ||
    n.includes('ux') ||
    n.includes('copywriting') ||
    n.includes('writing') ||
    n.includes('content')
  ) {
    return Feather;
  }
  if (
    n.includes('node') ||
    n.includes('supabase') ||
    n.includes('sql') ||
    n.includes('database') ||
    n.includes('backend')
  ) {
    return Database;
  }
  return Code2;
}

interface SkillRowProps {
  items: SkillItem[];
  rowIndex: number;
  direction: 'left' | 'right';
  highlightIndex: number;
  prefersReduced: boolean;
  isTabVisible: boolean;
  isInView: boolean;
}

function SkillRow({
  items,
  rowIndex,
  direction,
  highlightIndex,
  prefersReduced,
  isTabVisible,
  isInView,
}: SkillRowProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);
  const [stepSize, setStepSize] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Status index track (mulai di items.length = set tengah jika loop)
  const currentIndexRef = useRef(items.length);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startTrackXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  // Extended items untuk seamless loop visual: [clones prev] + [real items] + [clones next]
  const extendedItems = useMemo(() => {
    return [
      ...items.map((item, idx) => ({ ...item, uniqueKey: `prev-${idx}`, isClone: true, originalIdx: idx })),
      ...items.map((item, idx) => ({ ...item, uniqueKey: `real-${idx}`, isClone: false, originalIdx: idx })),
      ...items.map((item, idx) => ({ ...item, uniqueKey: `next-${idx}`, isClone: true, originalIdx: idx })),
    ];
  }, [items]);

  // Cek apakah konten baris melebihi container & hitung ukuran langkah geser
  const checkDimensions = useCallback(() => {
    if (!viewportRef.current || !trackRef.current || items.length === 0) return;
    const vpWidth = viewportRef.current.offsetWidth;
    const firstCard = trackRef.current.querySelector<HTMLElement>(`.${styles.skillCard}`);
    const cardWidth = firstCard ? firstCard.offsetWidth : (vpWidth <= 640 ? 170 : 200);
    const gap = vpWidth <= 640 ? 12 : 14;
    const step = cardWidth + gap;
    const totalRowWidth = items.length * step - gap;

    setStepSize(step);
    const overflow = totalRowWidth > vpWidth + 2;
    setIsOverflow(overflow);

    if (overflow) {
      gsap.set(trackRef.current, { x: -currentIndexRef.current * step });
    } else {
      gsap.set(trackRef.current, { x: 0 });
    }
  }, [items.length]);

  useEffect(() => {
    currentIndexRef.current = items.length;
    checkDimensions();
    window.addEventListener('resize', checkDimensions);
    return () => window.removeEventListener('resize', checkDimensions);
  }, [checkDimensions, items.length]);

  // Fungsi animasi pergeseran track (Sama persis dengan CertificatesSection)
  const animateTo = useCallback(
    (targetIndex: number, duration = SLIDE_DURATION) => {
      if (!trackRef.current || stepSize <= 0) return;
      const targetX = -targetIndex * stepSize;

      gsap.killTweensOf(trackRef.current);
      gsap.to(trackRef.current, {
        x: targetX,
        duration,
        ease: SLIDE_EASE,
        onComplete: () => {
          if (!trackRef.current) return;
          let finalIndex = targetIndex;

          // Reset diam-diam tanpa animasi saat melewati batas loop
          if (finalIndex >= items.length * 2) {
            finalIndex -= items.length;
            gsap.set(trackRef.current, { x: -finalIndex * stepSize });
          } else if (finalIndex < items.length) {
            finalIndex += items.length;
            gsap.set(trackRef.current, { x: -finalIndex * stepSize });
          }
          currentIndexRef.current = finalIndex;
        },
      });
    },
    [stepSize, items.length]
  );

  // ── Autoplay pergeseran berkala ──
  useEffect(() => {
    const canAutoplay =
      isOverflow &&
      !prefersReduced &&
      !isHovered &&
      !isDragging &&
      isTabVisible &&
      isInView;

    if (!canAutoplay) return;

    const timer = setInterval(() => {
      if (direction === 'left') {
        animateTo(currentIndexRef.current + 1);
      } else {
        animateTo(currentIndexRef.current - 1);
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [
    isOverflow,
    prefersReduced,
    isHovered,
    isDragging,
    isTabVisible,
    isInView,
    direction,
    animateTo,
  ]);

  // ── Drag & Swipe Interaction (Sama persis dengan CertificatesSection) ──
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isOverflow || e.button !== 0) return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    pointerIdRef.current = e.pointerId;

    if (trackRef.current) {
      gsap.killTweensOf(trackRef.current);
      startTrackXRef.current = (gsap.getProperty(trackRef.current, 'x') as number) || 0;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || !trackRef.current) return;
    const deltaX = e.clientX - startXRef.current;

    if (!hasDraggedRef.current && Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
      setIsDragging(true);
      try {
        trackRef.current.setPointerCapture(e.pointerId);
      } catch {}
    }

    if (hasDraggedRef.current) {
      gsap.set(trackRef.current, { x: startTrackXRef.current + deltaX });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    if (trackRef.current && pointerIdRef.current !== null) {
      try {
        if (trackRef.current.hasPointerCapture(pointerIdRef.current)) {
          trackRef.current.releasePointerCapture(pointerIdRef.current);
        }
      } catch {}
    }
    pointerIdRef.current = null;

    if (hasDraggedRef.current && trackRef.current && stepSize > 0) {
      const deltaX = e.clientX - startXRef.current;
      let targetIndex = Math.round(-(startTrackXRef.current + deltaX) / stepSize);

      // Flick assist untuk swipe cepat
      if (deltaX < -30 && targetIndex === currentIndexRef.current) {
        targetIndex = currentIndexRef.current + 1;
      } else if (deltaX > 30 && targetIndex === currentIndexRef.current) {
        targetIndex = currentIndexRef.current - 1;
      }

      animateTo(targetIndex, 0.5);

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  const renderCard = (skill: SkillItem, origIdx: number, key: string, isClone = false) => {
    const Icon = getSkillIcon(skill.name);
    const starCount =
      skill.level === 'Master' ? 5 : skill.level === 'Advanced' ? 4 : skill.level === 'Proficient' ? 3 : 2;
    // Highlight ditentukan dari indeks kolom posisi di baris
    const isHighlight = origIdx === highlightIndex;

    return (
      <article
        key={key}
        className={`${styles.skillCard} ${isHighlight ? styles.skillCardHighlight : ''}`}
        aria-hidden={isClone ? 'true' : undefined}
      >
        <div className={styles.skillHeader}>
          <Icon className={styles.skillIcon} size={19} strokeWidth={1.75} aria-hidden="true" />
          <h3 className={styles.skillName} title={skill.name}>
            {skill.name}
          </h3>
        </div>
        <div
          className={styles.skillStars}
          role="img"
          aria-label={!isClone ? `Tingkat ${skill.name}: ${skill.level}` : undefined}
        >
          {Array.from({ length: 5 }, (_, j) => (
            <Star
              key={j}
              size={11}
              fill={j < starCount ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>
      </article>
    );
  };

  return (
    <div
      ref={viewportRef}
      className={styles.rowWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className={`${styles.rowTrack} ${!isOverflow ? styles.rowTrackStatic : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {isOverflow
          ? extendedItems.map(item =>
              renderCard(item, item.originalIdx, item.uniqueKey, item.isClone)
            )
          : items.map((item, idx) => renderCard(item, idx, `real-${idx}`, false))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [capacity, setCapacity] = useState<number>(4);

  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // ResizeObserver untuk menghitung capacity secara responsif:
  // capacity = floor((lebarContainer + gap) / (lebarKartu + gap))
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCapacity = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth <= 0) return;
      const cardEl = container.querySelector<HTMLElement>(`.${styles.skillCard}`);
      const cardWidth = cardEl ? cardEl.offsetWidth : (containerWidth <= 640 ? 170 : 200);
      const gap = containerWidth <= 640 ? 12 : 14;

      const calcCapacity = Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)));
      setCapacity(calcCapacity);
    };

    updateCapacity();

    const ro = new ResizeObserver(() => {
      updateCapacity();
    });
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  // Tab visibility check
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver check
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Prefers-reduced-motion check
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // 1. Urutkan skill berdasarkan kategori dengan stable sort
  const sortedSkills = useMemo(() => sortSkillsByCategory(skills), []);

  // 2. Bagi ke 3 baris berdasarkan rumus capacity (Mode A atau Mode B)
  const [row1, row2, row3] = useMemo(
    () => distributeSkills(sortedSkills, capacity),
    [sortedSkills, capacity]
  );

  return (
    <section ref={sectionRef} className={`skills-band ${styles.skillsSection}`}>
      <TornPaperEdge />
      <div className="page-inner">
        <SectionTitle text="Skill" page="03" />

        <div ref={containerRef} className={styles.skillsContainer}>
          {/* Baris 1: arah ROW_DIRECTIONS[0], highlight ROW_HIGHLIGHT_INDICES[0] */}
          <SkillRow
            items={row1}
            rowIndex={0}
            direction={ROW_DIRECTIONS[0]}
            highlightIndex={ROW_HIGHLIGHT_INDICES[0]}
            prefersReduced={prefersReduced}
            isTabVisible={isTabVisible}
            isInView={isInView}
          />

          {/* Baris 2: arah ROW_DIRECTIONS[1], highlight ROW_HIGHLIGHT_INDICES[1] */}
          <SkillRow
            items={row2}
            rowIndex={1}
            direction={ROW_DIRECTIONS[1]}
            highlightIndex={ROW_HIGHLIGHT_INDICES[1]}
            prefersReduced={prefersReduced}
            isTabVisible={isTabVisible}
            isInView={isInView}
          />

          {/* Baris 3: arah ROW_DIRECTIONS[2], highlight ROW_HIGHLIGHT_INDICES[2] */}
          <SkillRow
            items={row3}
            rowIndex={2}
            direction={ROW_DIRECTIONS[2]}
            highlightIndex={ROW_HIGHLIGHT_INDICES[2]}
            prefersReduced={prefersReduced}
            isTabVisible={isTabVisible}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
}
