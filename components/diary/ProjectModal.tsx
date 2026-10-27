"use client";

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProjectFrame } from './ProjectFrame';
import { copy, getTranslation, type Language, type Project } from '@/data/portfolio';
import styles from './ProjectModal.module.css';

export interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
}

function ProjectModalInner({
  project,
  language,
  onClose,
}: {
  project: Project;
  language: Language;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for header separator shadow
  useEffect(() => {
    const bodyEl = bodyRef.current;
    if (!bodyEl) return;

    const handleScroll = () => setScrolled(bodyEl.scrollTop > 4);
    bodyEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => bodyEl.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 640;
    const startY = isMobile ? 60 : 100;
    const startRotate = isMobile ? 2.2 : 3.5;

    const ctx = gsap.context(() => {
      const overlayEl = document.querySelector<HTMLElement>('[data-state="open"].bg-overlay');
      if (overlayEl) {
        gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' });
      }

      if (prefersReducedMotion) {
        gsap.fromTo(
          modalEl,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.2,
            ease: 'power1.out',
            onComplete: () => { gsap.set(modalEl, { clearProps: 'opacity' }); },
          }
        );
        return;
      }

      gsap.set(modalEl, {
        xPercent: -50,
        yPercent: -50,
        willChange: 'transform, opacity',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(modalEl, { clearProps: 'transform,opacity,willChange' });
        },
      });

      tl.fromTo(
        modalEl,
        { y: startY, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' },
        0
      );

      tl.fromTo(
        modalEl,
        { rotation: startRotate },
        { rotation: -0.4, duration: 0.36, ease: 'power2.out' },
        0
      ).to(
        modalEl,
        { rotation: 0, duration: 0.19, ease: 'power1.out' },
        0.36
      );
    }, modalEl);

    return () => { ctx.revert(); };
  }, []);

  return (
    <DialogContent
      ref={modalRef}
      className={`diary-modal ${styles.modal}`}
      onCloseAutoFocus={event => {
        const trigger = document.querySelector<HTMLElement>(`[data-last-project="${project.id}"]`);
        if (trigger) {
          event.preventDefault();
          trigger.focus();
        }
      }}
    >
      {/* ── Header sticky: judul + tombol X ── */}
      <div className={`${styles.modalHeader} ${scrolled ? styles.scrolled : ''}`}>
        <DialogTitle className={styles.modalTitle}>
          {getTranslation(project.title, language)}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {copy[language].open}: {getTranslation(project.title, language)}
        </DialogDescription>
        <button
          className={styles.closeBtn}
          aria-label={copy[language].close || 'Close'}
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Body scrollable ── */}
      <div ref={bodyRef} className={styles.modalBody}>
        <ProjectFrame {...project} language={language} />
      </div>
    </DialogContent>
  );
}

export function ProjectModal({
  project,
  language,
  onClose,
}: ProjectModalProps) {
  return (
    <Dialog open={Boolean(project)} onOpenChange={open => { if (!open) onClose(); }}>
      {project && (
        <ProjectModalInner
          project={project}
          language={language}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
