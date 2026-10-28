"use client";

import { ImageOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { achievements, type Achievement } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { CloudinaryImage } from '@/components/img/MediaImage';
import styles from './AchievementsSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export function AchievementsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [activeRatio, setActiveRatio] = useState<number>(1.4);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(260);

  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLButtonElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef(false);

  // ── Hitung tinggi slot maksimum untuk alignment konsisten & anti layout shift ──
  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handleMotionChange);

    const updateDimensions = () => {
      if (!gridRef.current) return;
      const gridWidth = gridRef.current.offsetWidth;
      const isMobile = window.innerWidth <= 640;
      const cols = isMobile ? 1 : 3;
      const gap = isMobile ? 36 : 28;
      const slotWidth = Math.max(0, (gridWidth - (cols - 1) * gap) / cols);

      if (slotWidth > 0) {
        // Cari ratio paling kecil (kartu tertinggi pada lebar yang sama)
        let minRatio = 1.4;
        achievements.forEach(a => {
          if (a.width && a.height) {
            const r = a.width / a.height;
            if (r < minRatio) minRatio = r;
          }
        });
        const calculatedMaxHeight = slotWidth / minRatio;
        setMaxCardHeight(Math.round(calculatedMaxHeight));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      mql.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleImageError = (publicId: string) => {
    setFailedImages(prev => ({ ...prev, [publicId]: true }));
  };

  // ── GSAP Flip Zoom Card ──
  const openAchievement = useCallback(
    (a: Achievement, cardEl: HTMLElement) => {
      if (isAnimatingRef.current || activeAchievement) return;

      activeCardRef.current = cardEl;

      const imgEl = cardEl.querySelector('img');
      const ratio =
        imgEl && imgEl.naturalWidth && imgEl.naturalHeight
          ? imgEl.naturalWidth / imgEl.naturalHeight
          : imgEl && imgEl.clientWidth && imgEl.clientHeight
            ? imgEl.clientWidth / imgEl.clientHeight
            : a.width && a.height
              ? a.width / a.height
              : 1.4;
      setActiveRatio(ratio);

      if (prefersReduced) {
        document.body.style.overflow = 'hidden';
        setActiveAchievement(a);
        if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 1 });
        if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0.65 });
        return;
      }

      isAnimatingRef.current = true;
      document.body.style.overflow = 'hidden';

      cardEl.style.transition = 'none';
      cardEl.setAttribute('data-flip-id', 'achievement-zoom');

      const state = Flip.getState(cardEl, { props: 'transform,boxShadow,borderRadius' });
      cardEl.style.visibility = 'hidden';

      flushSync(() => {
        setActiveAchievement(a);
      });

      if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 1 });
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.65, duration: 0.35, ease: 'power1.inOut' }
        );
      }

      const targetFrame = modalFrameRef.current;
      if (targetFrame) {
        targetFrame.setAttribute('data-flip-id', 'achievement-zoom');
        targetFrame.style.transition = 'none';

        Flip.from(state, {
          targets: targetFrame,
          duration: 0.7,
          ease: 'power1.inOut',
          onComplete: () => {
            isAnimatingRef.current = false;
            targetFrame.focus();
          },
        });
      } else {
        isAnimatingRef.current = false;
      }
    },
    [activeAchievement, prefersReduced]
  );

  const closeAchievement = useCallback(() => {
    if (isAnimatingRef.current || !activeAchievement) return;

    const origCard = activeCardRef.current;
    const modalFrame = modalFrameRef.current;

    if (prefersReduced || !origCard || !modalFrame) {
      document.body.style.overflow = '';
      if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 0 });
      if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });
      if (origCard) {
        origCard.style.visibility = 'visible';
        origCard.style.transition = '';
      }
      setActiveAchievement(null);
      origCard?.focus();
      return;
    }

    isAnimatingRef.current = true;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.35, ease: 'power1.inOut' });
    }

    Flip.fit(modalFrame, origCard, {
      scale: true,
      duration: 0.7,
      ease: 'power1.inOut',
      props: 'borderRadius,boxShadow',
      onComplete: () => {
        origCard.style.visibility = 'visible';
        origCard.style.transition = '';
        if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 0 });
        document.body.style.overflow = '';
        flushSync(() => {
          setActiveAchievement(null);
        });
        isAnimatingRef.current = false;
        origCard.focus();
      },
    });
  }, [activeAchievement, prefersReduced]);

  // Listener tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeAchievement && !isAnimatingRef.current) {
        closeAchievement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAchievement, closeAchievement]);

  return (
    <div id="achievements-wrapper" className={styles.achievementWrapper}>
      <section
        id="achievements"
        className={`achievement-band ${styles.achievementSection}`}
        style={{ ['--max-card-height' as string]: `${maxCardHeight}px` }}
      >
        <div className="page-inner">
        <SectionTitle text="Achievements" page="02" />
        <div className={styles.achievementsGrid} ref={gridRef}>
          {achievements.map((a, i) => {
            const isFailed = failedImages[a.publicId];
            const tiltClass = i === 1 ? styles.tilt1 : i === 2 ? styles.tilt2 : styles.tilt0;
            const captionTiltClass =
              i === 1 ? styles.captionTilt1 : i === 2 ? styles.captionTilt2 : styles.captionTilt0;

            return (
              <article className={styles.slot} key={a.id}>
                <div className={styles.cardSlot}>
                  {isFailed ? (
                    <div className={styles.fallback}>
                      <ImageOff size={28} className={styles.fallbackIcon} aria-hidden="true" />
                      <span>Pratinjau tidak tersedia</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`${styles.achievementFrame} ${tiltClass}`}
                      onClick={e => openAchievement(a, e.currentTarget)}
                      aria-label={`Buka sertifikat: ${a.title}`}
                    >
                      <CloudinaryImage
                        publicId={a.publicId}
                        alt={`Sertifikat ${a.title}`}
                        width={800}
                        loading="lazy"
                        draggable={false}
                        className={styles.achievementImage}
                        onError={() => handleImageError(a.publicId)}
                      />
                    </button>
                  )}
                </div>

                <div className={`${styles.captionContainer} ${captionTiltClass}`}>
                  <h3 className={styles.achievementTitle}>{a.title}</h3>
                  <p className={styles.achievementMeta}>
                    {a.category} &middot; {a.year}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal Portal dengan Overlay dan Kartu Tengah GSAP Flip */}
      {mounted &&
        createPortal(
          <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={activeAchievement ? `Sertifikat ${activeAchievement.title}` : 'Detail Sertifikat'}
          >
            <div
              ref={overlayRef}
              className={styles.modalOverlay}
              onClick={closeAchievement}
              aria-hidden="true"
            />
            <div ref={modalContentRef} className={styles.modalContent}>
              {activeAchievement && (
                <button
                  ref={modalFrameRef}
                  type="button"
                  className={styles.modalFrame}
                  style={{ ['--cert-aspect-ratio' as string]: activeRatio }}
                  onClick={closeAchievement}
                  aria-label="Tutup pratinjau sertifikat"
                >
                  <CloudinaryImage
                    publicId={activeAchievement.publicId}
                    alt={`Sertifikat ${activeAchievement.title}`}
                    width={1600}
                    loading="eager"
                    draggable={false}
                    className={styles.modalImage}
                  />
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
      </section>
    </div>
  );
}
