"use client";

import { ImageOff } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { certificates, type Certificate, type Language } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { CloudinaryImage } from '@/components/img/MediaImage';
import styles from './CertificatesSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export interface CertificatesSectionProps {
  language: Language;
}

// ── Konstanta Autoplay & Looping ──
const AUTOPLAY_INTERVAL = 3800; // ms (3.8 detik per geseran)
const SLIDE_DURATION = 0.7; // detik durasi geser
const SLIDE_EASE = 'power2.out';

function isPlaceholder(val?: string): boolean {
  if (!val) return true;
  const lower = val.toLowerCase().trim();
  return (
    lower.startsWith('[') ||
    lower.includes('placeholder') ||
    lower.includes('silakan') ||
    lower.includes('todo')
  );
}

export function CertificatesSection({ language }: CertificatesSectionProps) {
  const [slotWidth, setSlotWidth] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [activeCertRatio, setActiveCertRatio] = useState<number>(1.4);
  const [mounted, setMounted] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Status untuk pause autoplay
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  // Modal Flip refs
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLButtonElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef(false);

  // Track position ref (mulai dari index 5 = set asli di tengah)
  const currentIndexRef = useRef(5);

  // Drag interaction refs
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startTrackXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  // 15 items: [5 clones prev] + [5 real] + [5 clones next]
  const extendedCertificates = useMemo(() => {
    return [
      ...certificates.map(c => ({ ...c, uniqueId: `clone-prev-${c.id}` })),
      ...certificates.map(c => ({ ...c, uniqueId: `real-${c.id}` })),
      ...certificates.map(c => ({ ...c, uniqueId: `clone-next-${c.id}` })),
    ];
  }, []);

  // Hitung langkah geser (lebar 1 slot + gap)
  const getStepSize = useCallback(() => {
    if (!viewportRef.current) return 0;
    const vpWidth = viewportRef.current.offsetWidth;
    const width = window.innerWidth;
    const slots = width <= 640 ? 1 : width <= 900 ? 2 : 3;
    const gap = width <= 640 ? 16 : width <= 900 ? 24 : 36;
    const sWidth = Math.max(0, (vpWidth - (slots - 1) * gap) / slots);
    return sWidth + gap;
  }, []);

  // Fungsi animasi pergeseran track
  const animateTo = useCallback(
    (targetIndex: number, duration = SLIDE_DURATION) => {
      if (!trackRef.current) return;
      const step = getStepSize();
      const targetX = -targetIndex * step;

      gsap.killTweensOf(trackRef.current);

      gsap.to(trackRef.current, {
        x: targetX,
        duration,
        ease: SLIDE_EASE,
        onComplete: () => {
          if (!trackRef.current) return;
          let finalIndex = targetIndex;
          const currentStep = getStepSize();

          // Reset diam-diam tanpa animasi saat melewati batas tengah
          if (finalIndex >= 10) {
            finalIndex -= 5;
            gsap.set(trackRef.current, { x: -finalIndex * currentStep });
          } else if (finalIndex < 5) {
            finalIndex += 5;
            gsap.set(trackRef.current, { x: -finalIndex * currentStep });
          }
          currentIndexRef.current = finalIndex;
        },
      });
    },
    [getStepSize]
  );

  const slideNext = useCallback(() => {
    if (activeCert || isAnimatingRef.current || isDragging) return;
    animateTo(currentIndexRef.current + 1);
  }, [activeCert, isDragging, animateTo]);

  const slidePrev = useCallback(() => {
    if (activeCert || isAnimatingRef.current || isDragging) return;
    animateTo(currentIndexRef.current - 1);
  }, [activeCert, isDragging, animateTo]);

  // Hitung lebar slot persis 1/3 viewport desktop
  useEffect(() => {
    setMounted(true);
    ctxRef.current = gsap.context(() => {}, sectionRef);

    const calculateDimensions = () => {
      if (!viewportRef.current) return;
      const vpWidth = viewportRef.current.offsetWidth;
      const width = window.innerWidth;
      const slots = width <= 640 ? 1 : width <= 900 ? 2 : 3;
      const gap = width <= 640 ? 16 : width <= 900 ? 24 : 36;
      const sWidth = Math.max(0, (vpWidth - (slots - 1) * gap) / slots);
      if (sWidth > 0) {
        setSlotWidth(sWidth);
      }

      // Reposition track ke index aktif saat resize
      if (trackRef.current) {
        const step = sWidth + gap;
        gsap.set(trackRef.current, { x: -currentIndexRef.current * step });
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => {
      ctxRef.current?.revert();
      window.removeEventListener('resize', calculateDimensions);
      document.body.style.overflow = '';
    };
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

  // ── Autoplay Timer ──
  useEffect(() => {
    const canAutoplay =
      !prefersReduced &&
      !isHovered &&
      !isDragging &&
      !activeCert &&
      isTabVisible &&
      isInView;

    if (!canAutoplay) return;

    const timer = setInterval(() => {
      slideNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [prefersReduced, isHovered, isDragging, activeCert, isTabVisible, isInView, slideNext]);

  // ── Drag & Swipe Handlers ──
  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeCert || isAnimatingRef.current) return;
    if (e.button !== 0) return;
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
      setIsGrabbing(true);
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
    setIsGrabbing(false);

    if (trackRef.current && pointerIdRef.current !== null) {
      try {
        if (trackRef.current.hasPointerCapture(pointerIdRef.current)) {
          trackRef.current.releasePointerCapture(pointerIdRef.current);
        }
      } catch {}
    }
    pointerIdRef.current = null;

    if (hasDraggedRef.current && trackRef.current) {
      const step = getStepSize();
      const deltaX = e.clientX - startXRef.current;
      let targetIndex = Math.round(-(startTrackXRef.current + deltaX) / step);

      // Swipe cepat / flick assist
      if (deltaX < -35 && targetIndex === currentIndexRef.current) {
        targetIndex = currentIndexRef.current + 1;
      } else if (deltaX > 35 && targetIndex === currentIndexRef.current) {
        targetIndex = currentIndexRef.current - 1;
      }

      animateTo(targetIndex, 0.5);

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Keyboard navigation saat carousel fokus
  const handleKeyDownCarousel = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      slidePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      slideNext();
    }
  };

  const handleImageError = (publicId: string) => {
    setFailedImages(prev => ({ ...prev, [publicId]: true }));
  };

  // ── GSAP Flip Card Zoom ──
  const openCertificate = useCallback(
    (c: Certificate, cardEl: HTMLElement) => {
      if (isAnimatingRef.current || activeCert || isDragging) return;

      activeCardRef.current = cardEl;

      const imgEl = cardEl.querySelector('img');
      const ratio =
        imgEl && imgEl.naturalWidth && imgEl.naturalHeight
          ? imgEl.naturalWidth / imgEl.naturalHeight
          : imgEl && imgEl.clientWidth && imgEl.clientHeight
            ? imgEl.clientWidth / imgEl.clientHeight
            : 1.4;
      setActiveCertRatio(ratio);

      if (prefersReduced) {
        document.body.style.overflow = 'hidden';
        setActiveCert(c);
        if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 1 });
        if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0.65 });
        return;
      }

      isAnimatingRef.current = true;
      document.body.style.overflow = 'hidden';

      // Hindari konflik CSS transition dengan GSAP
      cardEl.style.transition = 'none';
      cardEl.setAttribute('data-flip-id', 'cert-zoom');

      const state = Flip.getState(cardEl, { props: 'transform,boxShadow,borderRadius' });
      cardEl.style.visibility = 'hidden';

      flushSync(() => {
        setActiveCert(c);
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
        targetFrame.setAttribute('data-flip-id', 'cert-zoom');
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
    [activeCert, isDragging, prefersReduced]
  );

  const closeCertificate = useCallback(() => {
    if (isAnimatingRef.current || !activeCert) return;

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
      setActiveCert(null);
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
          setActiveCert(null);
        });
        isAnimatingRef.current = false;
        origCard.focus();
      },
    });
  }, [activeCert, prefersReduced]);

  // Listener Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCert && !isAnimatingRef.current) {
        closeCertificate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert, closeCertificate]);

  return (
    <section
      className={`certificate-band ${styles.carouselSection}`}
      ref={sectionRef}
      style={{ ['--slot-width' as string]: slotWidth ? `${slotWidth}px` : undefined }}
    >
      <div className="page-inner">
        <SectionTitle text="Sertifikat" page="04" />
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`${styles.carouselViewport} ${isGrabbing ? styles.isGrabbing : ''}`}
            ref={viewportRef}
            tabIndex={0}
            aria-roledescription="carousel"
            aria-live="off"
            onKeyDown={handleKeyDownCarousel}
          >
            <div
              className={styles.track}
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {extendedCertificates.map((c, index) => {
                const isFailed = failedImages[c.publicId];
                const hasRealMeta = !isPlaceholder(c.issuer) && !isPlaceholder(c.year);
                const isEvenTilt = (index % 5) % 2 === 1;

                return (
                  <article className={styles.slot} key={c.uniqueId}>
                    {isFailed ? (
                      <div className={styles.fallback}>
                        <ImageOff size={28} className={styles.fallbackIcon} aria-hidden="true" />
                        <span>{language === 'id' ? 'Pratinjau tidak tersedia' : 'Preview unavailable'}</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={`${styles.certificateFrame} ${isEvenTilt ? styles.tiltEven : styles.tiltOdd}`}
                        onClick={e => {
                          if (hasDraggedRef.current) return;
                          openCertificate(c, e.currentTarget);
                        }}
                        aria-label={`${language === 'id' ? 'Buka sertifikat' : 'Open certificate'}: ${c.title}`}
                      >
                        <CloudinaryImage
                          publicId={c.publicId}
                          alt={`Sertifikat ${c.title}`}
                          width={720}
                          loading="eager"
                          draggable={false}
                          className={styles.certificateImage}
                          onError={() => handleImageError(c.publicId)}
                        />
                      </button>
                    )}

                    <div className={styles.captionContainer}>
                      <h3 className={styles.certificateTitle}>{c.title}</h3>
                      {hasRealMeta ? (
                        <p className={styles.certificateMeta}>
                          {c.issuer} &middot; {c.year}
                        </p>
                      ) : (
                        <p className={styles.certificateMeta} aria-hidden="true">
                          &nbsp;
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
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
            aria-label={
              activeCert
                ? `Sertifikat ${activeCert.title}`
                : language === 'id'
                  ? 'Detail Sertifikat'
                  : 'Certificate Detail'
            }
          >
            <div
              ref={overlayRef}
              className={styles.modalOverlay}
              onClick={closeCertificate}
              aria-hidden="true"
            />
            <div ref={modalContentRef} className={styles.modalContent}>
              {activeCert && (
                <button
                  ref={modalFrameRef}
                  type="button"
                  className={styles.modalFrame}
                  style={{ ['--cert-aspect-ratio' as string]: activeCertRatio }}
                  onClick={closeCertificate}
                  aria-label={
                    language === 'id' ? 'Tutup pratinjau sertifikat' : 'Close certificate preview'
                  }
                >
                  <CloudinaryImage
                    publicId={activeCert.publicId}
                    alt={`Sertifikat ${activeCert.title}`}
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
  );
}
