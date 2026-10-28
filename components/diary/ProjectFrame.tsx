import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import {
  ArrowUpRight,
  ExternalLink,
  ImageIcon,
  LoaderCircle,
  Video,
  X,
} from 'lucide-react';
import { copy, getTranslation, type Language, type Project, type ProjectMedia } from '@/data/portfolio';
import { HoverButton } from '@/components/ui/HoverButton/HoverButton';
import { CloudinaryImage } from '@/components/img/MediaImage';
import { MediaVideo } from '@/components/img/MediaVideo';
import styles from './ProjectFrame.module.css';

/* ─── Modern Play Triangle Icon (Sudut membulat bersih tanpa background) ─── */
function PlayTriangleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M8.5 5.3a1.5 1.5 0 0 1 2.27-1.3l9.8 6.7a1.5 1.5 0 0 1 0 2.58l-9.8 6.7a1.5 1.5 0 0 1-2.27-1.28V5.3z"
        fill="#ffffff"
      />
    </svg>
  );
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

/* ─── Cloudinary URL Builders ─── */
const CLOUD_NAME = 'dblv5trjd';
function buildImageUrl(publicId: string): string {
  if (publicId === 'FotoProfil') return '/FotoProfil.png';
  if (publicId.startsWith('/') || publicId.startsWith('http')) return publicId;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}
function buildVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}`;
}
function buildVideoPosterUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto,so_0/${publicId}.jpg`;
}

/* ─── Cloudinary Poster Helper ─── */
export function getCloudinaryPoster(item: ProjectMedia): string {
  if (item.posterPublicId) return buildImageUrl(item.posterPublicId);
  if (item.type === 'video' && item.publicId) return buildVideoPosterUrl(item.publicId);
  return '';
}

/* ─── Missing Media Placeholder ─── */
export function MissingMedia({ type, label }: { type?: 'image' | 'video'; label: string }) {
  const Icon = type === 'video' ? Video : ImageIcon;
  return (
    <div className="media-missing">
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/* ─── GitHub SVG Icon ─── */
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* ─── Media Caption Helper (Bilingual with Auto Fallback) ─── */
function getMediaCaption(item: ProjectMedia, index: number, language: Language = 'id') {
  const isId = language === 'id';

  const defaultCaptions = isId
    ? [
        'Tampilan antarmuka dengan tata letak bersih dan responsif, memudahkan akses ke fitur utama.',
        'Alur data dan validasi sistem yang memastikan informasi diproses dengan cepat dan stabil.',
        'Penyajian visual dan pengaturan fitur yang memberi gambaran jelas tentang proses kerja sistem.',
      ]
    : [
        'A clean, responsive interface that makes key features easy to reach.',
        'Data workflow and system validation that keep information processing fast and stable.',
        'Visual presentation and feature controls that give a clear view of how the system works.',
      ];

  const caption = typeof item.caption === 'object' ? item.caption?.[language] : item.caption;
  return caption || defaultCaptions[index % defaultCaptions.length];
}

/* ─── Zig-Zag Kodak Film Gallery Component ─── */
interface FilmStripProps {
  items: ProjectMedia[];
  title: string;
  language?: Language;
}

function FilmStrip({ items, title, language = 'id' }: FilmStripProps) {
  // Batasi data galeri maksimal 3 baris
  const displayItems = items.slice(0, 3);
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});
  const [mounted, setMounted] = useState(false);
  const [activeMedia, setActiveMedia] = useState<ProjectMedia | null>(null);
  const [activeRatio, setActiveRatio] = useState<number>(1.4);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isModalVideoPlaying, setIsModalVideoPlaying] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handleMotionChange);
    return () => {
      mql.removeEventListener('change', handleMotionChange);
      document.body.style.overflow = '';
    };
  }, []);

  const handleMediaLoad = (idx: number, width: number, height: number) => {
    if (width && height) {
      const ratio = width / height;
      setAspectRatios(prev => (prev[idx] === ratio ? prev : { ...prev, [idx]: ratio }));
    }
  };

  // ── GSAP Flip Zoom Media (Animasi persis AchievementsSection) ──
  const openMedia = useCallback(
    (mediaItem: ProjectMedia, cardEl: HTMLElement) => {
      if (isAnimatingRef.current || activeMedia) return;

      activeCardRef.current = cardEl;
      setIsModalVideoPlaying(Boolean(mediaItem.autoplay));

      const imgEl = cardEl.querySelector('img');
      const videoEl = cardEl.querySelector('video');
      const mediaEl = imgEl || videoEl;

      let ratio = 1.4;
      if (imgEl && imgEl.naturalWidth && imgEl.naturalHeight) {
        ratio = imgEl.naturalWidth / imgEl.naturalHeight;
      } else if (videoEl && videoEl.videoWidth && videoEl.videoHeight) {
        ratio = videoEl.videoWidth / videoEl.videoHeight;
      } else if (mediaEl && mediaEl.clientWidth && mediaEl.clientHeight) {
        ratio = mediaEl.clientWidth / mediaEl.clientHeight;
      }
      setActiveRatio(ratio);

      if (prefersReduced) {
        document.body.style.overflow = 'hidden';
        setActiveMedia(mediaItem);
        if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 1 });
        if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0.75 });
        return;
      }

      isAnimatingRef.current = true;
      document.body.style.overflow = 'hidden';

      cardEl.style.transition = 'none';
      cardEl.setAttribute('data-flip-id', 'gallery-media-zoom');

      const state = Flip.getState(cardEl, { props: 'transform,boxShadow,borderRadius' });
      cardEl.style.visibility = 'hidden';

      flushSync(() => {
        setActiveMedia(mediaItem);
      });

      if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 1 });
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.75, duration: 0.35, ease: 'power1.inOut' }
        );
      }

      const targetFrame = modalFrameRef.current;
      if (targetFrame) {
        targetFrame.setAttribute('data-flip-id', 'gallery-media-zoom');
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
    [activeMedia, prefersReduced]
  );

  const closeMedia = useCallback(() => {
    if (isAnimatingRef.current || !activeMedia) return;

    const origCard = activeCardRef.current;
    const modalFrame = modalFrameRef.current;

    if (modalFrame) {
      const vid = modalFrame.querySelector('video');
      if (vid) vid.pause();
    }
    setIsModalVideoPlaying(false);

    if (prefersReduced || !origCard || !modalFrame) {
      document.body.style.overflow = '';
      if (modalRef.current) gsap.set(modalRef.current, { autoAlpha: 0 });
      if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });
      if (origCard) {
        origCard.style.visibility = 'visible';
        origCard.style.transition = '';
      }
      setActiveMedia(null);
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
          setActiveMedia(null);
        });
        isAnimatingRef.current = false;
        origCard.focus();
      },
    });
  }, [activeMedia, prefersReduced]);

  // Listener tombol Escape (capture phase agar tidak menutup modal dialog induk)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMedia && !isAnimatingRef.current) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeMedia();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [activeMedia, closeMedia]);

  return (
    <div className={styles.zigzagContainer} role="region" aria-label={`Galeri fitur: ${title}`}>
      {displayItems.map((item, idx) => {
        const frameNum = idx + 1;
        const poster = getCloudinaryPoster(item);
        const caption = getMediaCaption(item, idx, language);

        // Lebar frame di dalam kolom foto (~57% konten): landscape penuh, square & portrait
        // dipersempit agar frame tetap mengikuti rasio asli tanpa menjadi terlalu tinggi
        const ratio = aspectRatios[idx];
        const frameWidth = ratio
          ? ratio < 0.85
            ? '62%'
            : ratio <= 1.15
              ? '80%'
              : '100%'
          : '100%';

        return (
          <div key={idx} className={styles.zigzagRow}>
            {/* ── Kolom Frame Foto ── */}
            <div className={styles.photoCol}>
              <div className={styles.tiltWrap} style={{ width: frameWidth }}>
                <button
                  type="button"
                  className={styles.photoFrame}
                  onClick={e => openMedia(item, e.currentTarget)}
                  aria-label={`Buka media ${frameNum}`}
                >
                  {item.type === 'video' ? (
                    <div className={styles.videoWrapper}>
                      <MediaVideo
                        publicId={item.publicId}
                        src={item.src}
                        posterPublicId={item.posterPublicId}
                        autoplay={item.autoplay}
                        className={styles.photoThumb}
                        onLoadedMetadata={e => {
                          const video = e.currentTarget;
                          if (video.videoWidth && video.videoHeight) {
                            handleMediaLoad(idx, video.videoWidth, video.videoHeight);
                          }
                        }}
                      />
                      {!item.autoplay && (
                        <div className={styles.playOverlay} aria-hidden="true">
                          <div className={styles.playTriangle}>
                            <PlayTriangleIcon className={styles.playIconSvg} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.publicId ? buildImageUrl(item.publicId) : ''}
                      alt={`Galeri item ${frameNum}`}
                      loading="lazy"
                      className={styles.photoThumb}
                      onLoad={e => {
                        const img = e.currentTarget;
                        if (img.naturalWidth && img.naturalHeight) {
                          handleMediaLoad(idx, img.naturalWidth, img.naturalHeight);
                        }
                      }}
                      onError={e => {
                        if (item.publicId === 'FotoProfil') {
                          e.currentTarget.src = '/FotoProfil.png';
                        }
                      }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ── Kolom Teks: satu paragraf keterangan singkat ── */}
            <div className={styles.textCol}>
              <p className={styles.caption}>{caption}</p>
            </div>
          </div>
        );
      })}

      {/* Modal Portal dengan Overlay dan Media GSAP Flip Zoom (Keluar dari batas dialog ke document.body) */}
      {mounted &&
        createPortal(
          <div
            ref={modalRef}
            className={styles.fullscreenModal}
            role="dialog"
            aria-modal="true"
            aria-label={activeMedia ? `Pratinjau media ${title}` : 'Pratinjau media'}
            onClick={closeMedia}
          >
            <div
              ref={overlayRef}
              className={styles.fullscreenOverlay}
              aria-hidden="true"
            />
            <div ref={modalContentRef} className={styles.fullscreenContent}>
              {activeMedia && (
                <div
                  ref={modalFrameRef}
                  tabIndex={-1}
                  className={styles.fullscreenFrame}
                  style={{ ['--media-aspect-ratio' as string]: activeRatio }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.frameCloseBtn}
                    onClick={closeMedia}
                    aria-label="Tutup pratinjau"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                  {activeMedia.type === 'video' ? (
                    <div className={styles.fullscreenVideoWrapper}>
                      <MediaVideo
                        publicId={activeMedia.publicId}
                        src={activeMedia.src}
                        posterPublicId={activeMedia.posterPublicId}
                        autoplay={activeMedia.autoplay}
                        autoPlay={true}
                        loop={activeMedia.autoplay}
                        muted={activeMedia.autoplay ? true : false}
                        controls={!activeMedia.autoplay}
                        playsInline
                        className={styles.fullscreenMedia}
                        onClick={e => e.stopPropagation()}
                        onPlay={() => setIsModalVideoPlaying(true)}
                        onPause={() => setIsModalVideoPlaying(false)}
                        onEnded={() => setIsModalVideoPlaying(false)}
                      />
                      {!activeMedia.autoplay && !isModalVideoPlaying && (
                        <div className={styles.playOverlay} aria-hidden="true">
                          <div className={styles.playTriangle}>
                            <PlayTriangleIcon className={styles.playIconSvg} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeMedia.publicId ? buildImageUrl(activeMedia.publicId) : ''}
                      alt="Pratinjau media galeri"
                      className={styles.fullscreenMedia}
                      draggable={false}
                    />
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/* ─── Main ProjectFrame Component ─── */
export function ProjectFrame({
  preview,
  title,
  role,
  description,
  stack,
  architecture,
  links,
  imagePublicId,
  media,
  language = 'id',
}: Omit<Project, 'id' | 'category' | 'previewLabels'> & { language?: Language }) {
  const t = copy[language];
  const displayTitle = getTranslation(title, language);
  const displayDesc = getTranslation(description, language);
  const rawRoles = Array.isArray(role) ? role : [role];
  const roles = rawRoles
    .map(r => getTranslation(r as any, language).replace(/^Role:\s*/i, '').trim())
    .filter(Boolean);

  const activePreview = preview || (imagePublicId ? { type: 'image' as const, publicId: imagePublicId } : undefined);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [activePreview?.publicId]);

  // Primary URL for "Buka di tab baru" button
  const externalUrl = links.demo;
  const repoUrl = links.repo;

  return (
    <div className="modal-details">
      {/* ── Media Utama (Cloudinary Image / Video) ── */}
      <div className="frame-media">
        {!activePreview?.publicId || failed ? (
          <div className={styles.mainPlaceholder}>
            <ImageIcon size={38} aria-hidden="true" className={styles.placeholderIcon} />
            <span>{t.missing}</span>
          </div>
        ) : (
          <>
            {activePreview.type === 'video' ? (
              <MediaVideo
                publicId={activePreview.publicId}
                posterPublicId={activePreview.posterPublicId}
                autoplay={activePreview.autoplay}
                className={styles.mainMedia}
                onLoadedMetadata={() => setLoaded(true)}
                onError={() => setFailed(true)}
              />
            ) : (
              <CloudinaryImage
                publicId={activePreview.publicId}
                alt={displayTitle}
                width={1200}
                className={styles.mainMedia}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
              />
            )}
            {!loaded && (
              <div className="frame-skeleton" role="status" aria-label={t.loading}>
                <LoaderCircle aria-hidden="true" />
              </div>
            )}
          </>
        )}

        {/* ── Overlay Tombol Link di Pojok Kanan Bawah Preview ── */}
        {(externalUrl || repoUrl) && (
          <div className={styles.previewActions} onClick={(e) => e.stopPropagation()}>
            {externalUrl && (
              <HoverButton
                icon={<ExternalLink size={16} aria-hidden="true" />}
                trailingIcon={<ArrowUpRight size={16} aria-hidden="true" />}
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnTextFull}>{t.newTab}</span>
                <span className={styles.btnTextShort}>{language === 'id' ? 'Buka Web' : 'Live'}</span>
              </HoverButton>
            )}
            {repoUrl && (
              <HoverButton
                icon={<GitHubIcon size={16} />}
                trailingIcon={<ArrowUpRight size={16} aria-hidden="true" />}
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnTextFull}>GitHub Repo</span>
                <span className={styles.btnTextShort}>GitHub</span>
              </HoverButton>
            )}
          </div>
        )}
      </div>

      {/* ── 2. ROLE + DESKRIPSI ── */}
      <div className="modal-info-section">
        <div className={styles.roleRow}>
          <span className={styles.roleLabel}>{t.role || 'Role'}:</span>
          <div className={styles.roleChips}>
            {roles.map(r => (
              <span className="sticker" key={r}>
                {r}
              </span>
            ))}
          </div>
        </div>
        {displayDesc && (
          <div className="modal-description">
            {displayDesc
              .split('\n\n')
              .map(p => p.trim())
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        )}
      </div>

      {/* ── 3. FILM STRIP ── */}
      {media && media.length > 0 && (
        <div className="modal-filmstrip-section">
          <FilmStrip
            items={media}
            title={displayTitle}
            language={language}
          />
        </div>
      )}

      {/* ── 4. TECH STACK & ARSITEKTUR (gaya sama dengan baris Role) ── */}
      {(stack.length > 0 || (architecture?.length ?? 0) > 0) && (
        <div className="modal-tools-section">
          <div className={styles.specGrid}>
            {stack.length > 0 && (
              <>
                <span className={styles.roleLabel}>{t.techStack}:</span>
                <div className={styles.roleChips}>
                  {stack.map(s => (
                    <span className="sticker" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
            {architecture && architecture.length > 0 && (
              <>
                <span className={styles.roleLabel}>{t.architecture}:</span>
                <div className={styles.roleChips}>
                  {architecture.map(a => (
                    <span className="sticker" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
