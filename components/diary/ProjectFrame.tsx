"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon,
  LoaderCircle,
  Monitor,
  Play,
  Video,
  X,
} from 'lucide-react';
import { copy, type Language, type Project, type ProjectMedia } from '@/data/portfolio';
import { HoverButton } from '@/components/ui/HoverButton/HoverButton';
import styles from './ProjectFrame.module.css';

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

/* ─── YouTube Embed Helper ─── */
export function youtubeEmbed(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host !== 'youtube.com' && host !== 'youtu.be' && host !== 'm.youtube.com') return null;
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ||
          url.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1];
    return id && /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  } catch {
    return null;
  }
}

/* ─── Cloudinary Poster Helper ─── */
export function getCloudinaryPoster(item: ProjectMedia): string {
  if (item.posterPublicId) return buildImageUrl(item.posterPublicId);
  if (item.type === 'video' && item.publicId) return buildVideoPosterUrl(item.publicId);
  return '';
}

/* ─── Missing Media Placeholder ─── */
export function MissingMedia({ type, label }: { type: Project['type']; label: string }) {
  const Icon = type === 'website' ? Monitor : type === 'video' ? Video : ImageIcon;
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

/* ─── Media Content Helper (Bilingual with Auto Fallback) ─── */
function getMediaContent(item: ProjectMedia, index: number, language: Language = 'id') {
  const isId = language === 'id';

  const defaultPlaceholders = [
    {
      title: isId ? 'Antarmuka Utama & Interaksi Pengguna' : 'Main Interface & User Interaction',
      description: isId
        ? 'Tampilan antarmuka yang dirancang dengan tata letak bersih dan responsif, memudahkan pengguna dalam mengakses fitur utama dengan interaksi yang nyaman.'
        : 'User interface designed with clean, responsive layouts, providing intuitive access to key features and smooth interactions.',
      features: isId
        ? ['Desain antarmuka responsif & ramah pengguna', 'Navigasi komponen interaktif', 'Akses fitur utama yang terorganisir']
        : ['Responsive & user-friendly interface', 'Interactive component navigation', 'Well-organized feature access'],
      techFlow: isId
        ? 'Komponen frontend dirender secara dinamis dengan styling responsif dan manajemen state terpusat.'
        : 'Frontend components rendered dynamically with responsive styling and centralized state management.',
    },
    {
      title: isId ? 'Alur Data & Logika Sistem' : 'Data Workflow & System Logic',
      description: isId
        ? 'Pengelolaan alur data dan validasi sistem untuk memastikan pemrosesan informasi berjalan cepat, stabil, dan konsisten di setiap tahapan.'
        : 'Data workflow management and system validation ensuring fast, stable, and consistent information processing across all steps.',
      features: isId
        ? ['Validasi data real-time', 'Penanganan status proses yang transparan', 'Arsitektur modular yang mudah dikembangkan']
        : ['Real-time data validation', 'Transparent process status handling', 'Modular & maintainable architecture'],
      techFlow: isId
        ? 'Integrasi API dan penanganan event asinkron menghubungkan antarmuka dengan layer logika secara aman.'
        : 'API integration and asynchronous event handling connect the UI layer with backend logic securely.',
    },
    {
      title: isId ? 'Visualisasi & Manajemen Fitur' : 'Feature Management & Visualization',
      description: isId
        ? 'Penyajian visual dan kontrol pengaturan fitur yang komprehensif, memberikan visibilitas penuh terhadap proses kerja dan performa sistem.'
        : 'Comprehensive visual presentation and feature control, providing full visibility into system workflow and performance.',
      features: isId
        ? ['Visualisasi status interaktif', 'Laporan ringkas yang mudah dipahami', 'Pengaturan preferensi yang fleksibel']
        : ['Interactive status visualization', 'Clear and concise summary insights', 'Flexible user preferences control'],
      techFlow: isId
        ? 'Data divisualisasikan dengan komponen visual yang dioptimalkan untuk performa tinggi di berbagai peramban.'
        : 'Data visualized via optimized visual components ensuring high performance across all modern browsers.',
    },
  ];

  const placeholder = defaultPlaceholders[index % defaultPlaceholders.length];

  const title = (typeof item.title === 'object' ? item.title?.[language] : item.title) || placeholder.title;
  const description = (typeof item.description === 'object' ? item.description?.[language] : item.description) || placeholder.description;
  const rawFeatures = typeof item.features === 'object' && !Array.isArray(item.features) ? item.features?.[language] : item.features;
  const features = rawFeatures && rawFeatures.length > 0 ? rawFeatures : placeholder.features;
  const techFlow = (typeof item.techFlow === 'object' ? item.techFlow?.[language] : item.techFlow) || placeholder.techFlow;

  return { title, description, features, techFlow };
}

/* ─── Zig-Zag Kodak Film Gallery Component ─── */
interface FilmStripProps {
  items: ProjectMedia[];
  title: string;
  language?: Language;
  onOpenLightbox: (index: number) => void;
}

function FilmStrip({ items, title, language = 'id', onOpenLightbox }: FilmStripProps) {
  // Batasi data galeri maksimal 3 baris
  const displayItems = items.slice(0, 3);
  const isId = language === 'id';
  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

  const handleMediaLoad = (idx: number, width: number, height: number) => {
    if (width && height) {
      const ratio = width / height;
      setAspectRatios(prev => (prev[idx] === ratio ? prev : { ...prev, [idx]: ratio }));
    }
  };

  return (
    <div className={styles.zigzagContainer} role="region" aria-label={`Galeri fitur: ${title}`}>
      {displayItems.map((item, idx) => {
        const frameNum = idx + 1;
        const poster = getCloudinaryPoster(item);
        const content = getMediaContent(item, idx, language);

        // Lebar frame adaptif: landscape ~330px (sekitar 44% modal), square ~255px, portrait ~220px
        const ratio = aspectRatios[idx];
        const frameWidth = ratio
          ? ratio < 0.85
            ? '220px'
            : ratio <= 1.15
              ? '255px'
              : '330px'
          : '330px';

        return (
          <div key={idx} className={styles.zigzagRow}>
            {/* ── Kolom Frame Foto (Sama persis dengan frame preview utama di atas modal) ── */}
            <div className={styles.photoCol} style={{ width: frameWidth }}>
              <button
                type="button"
                className={styles.photoFrame}
                onClick={() => onOpenLightbox(idx)}
                aria-label={`Buka media ${frameNum} di lightbox`}
              >
                {item.type === 'video' ? (
                  <div className={styles.videoWrapper}>
                    {poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={poster}
                        alt={`Video preview ${frameNum}`}
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
                    ) : (
                      <video
                        src={item.publicId ? buildVideoUrl(item.publicId) : ''}
                        preload="metadata"
                        muted
                        playsInline
                        className={styles.photoThumb}
                        onLoadedMetadata={e => {
                          const video = e.currentTarget;
                          if (video.videoWidth && video.videoHeight) {
                            handleMediaLoad(idx, video.videoWidth, video.videoHeight);
                          }
                        }}
                      />
                    )}
                    <div className={styles.playOverlay} aria-hidden="true">
                      <div className={styles.playBadge}>
                        <Play size={20} fill="#ffffff" color="#ffffff" className="translate-x-0.5" />
                      </div>
                    </div>
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

            {/* ── Kolom Teks Informasi Fitur ── */}
            <div className={styles.textCol}>
              <span className={styles.featureBadge}>
                {isId ? `Fitur ${frameNum}` : `Feature ${frameNum}`}
              </span>

              <h4 className={styles.featureTitle}>
                {content.title}
              </h4>

              <p className={styles.featureDescription}>
                {content.description}
              </p>

              {content.features && content.features.length > 0 && (
                <ul className={styles.featureList}>
                  {content.features.map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>
              )}

              {content.techFlow && (
                <div className={styles.techFlowBox}>
                  <div className={styles.techFlowHeader}>
                    <span>{isId ? 'Teknologi & Cara Kerja' : 'Tech & How It Works'}</span>
                  </div>
                  <p className={styles.techFlowText}>
                    {content.techFlow}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Lightbox Modal Component ─── */
interface LightboxProps {
  items: ProjectMedia[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}

function Lightbox({ items, initialIndex, title, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setIndex(i => (i <= 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setIndex(i => (i >= items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, prev, next]);

  const current = items[index];
  const poster = current ? getCloudinaryPoster(current) : '';

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri Lightbox: ${title}`}
      onClick={e => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Close Button */}
      <button
        type="button"
        className="lightbox-close-btn"
        onClick={onClose}
        aria-label="Tutup lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-prev"
            onClick={prev}
            aria-label="Media sebelumnya"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-next"
            onClick={next}
            aria-label="Media berikutnya"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Main Media Display */}
      <div className="lightbox-content-box">
        {current.type === 'video' ? (
          <video
            key={current.publicId}
            src={current.publicId ? buildVideoUrl(current.publicId) : ''}
            poster={poster || undefined}
            controls
            autoPlay
            playsInline
            className="lightbox-active-media"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.publicId ? buildImageUrl(current.publicId) : ''}
            alt={`${title} — preview ${index + 1}`}
            className="lightbox-active-media"
            loading="lazy"
          />
        )}

        {/* Counter Badge */}
        {items.length > 1 && (
          <div className="lightbox-counter" aria-live="polite">
            <span>{index + 1}</span> / <span>{items.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main ProjectFrame Component ─── */
export function ProjectFrame({
  type,
  src,
  title,
  role,
  description,
  stack,
  links,
  imagePublicId,
  media,
  language = 'id',
}: Omit<Project, 'id' | 'category' | 'previewLabels'> & { language?: Language }) {
  const t = copy[language];
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build full Cloudinary URL from publicId
  const imageUrl = imagePublicId ? buildImageUrl(imagePublicId) : undefined;

  const yt = type === 'video' ? youtubeEmbed(src) : null;

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Primary URL for "Buka di tab baru" button
  const externalUrl = links.demo || (type === 'website' && src ? src : undefined);
  const repoUrl = links.repo;

  return (
    <div className="modal-details">
      {/* ── Foto Utama (Main Media) ── */}
      <div ref={element} className="frame-media">
        {(!src && !imageUrl) ? (
          <MissingMedia type={type} label={t.missing} />
        ) : (type === 'image' || (type === 'website' && !visible)) && imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} loading="lazy" onError={() => setFailed(true)} />
        ) : type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={title} loading="lazy" onError={() => setFailed(true)} />
        ) : visible && (type === 'website' || yt) ? (
          <>
            <iframe
              src={yt || src}
              title={title}
              tabIndex={-1}
              loading="lazy"
              allow={yt ? 'fullscreen; picture-in-picture' : undefined}
              allowFullScreen={Boolean(yt)}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            {!loaded && !failed && (
              <div className="frame-skeleton" role="status" aria-label={t.loading}>
                <LoaderCircle aria-hidden="true" />
              </div>
            )}
            {/* Fallback: tampilkan screenshot Cloudinary jika iframe diblokir */}
            {failed && imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={title} loading="lazy" />
            )}
          </>
        ) : visible && type === 'video' ? (
          <video
            src={src}
            poster={imageUrl}
            controls
            muted
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="frame-skeleton">
            <LoaderCircle aria-hidden="true" />
          </div>
        )}
        {failed && !imageUrl && (
          <div className="frame-skeleton">
            <MissingMedia type={type} label={t.missing} />
          </div>
        )}
      </div>

      {/* ── 1. TOMBOL LINK ── */}
      {(externalUrl || repoUrl) && (
        <div className="modal-toolbar">
          {externalUrl && (
            <HoverButton
              icon={<ExternalLink size={16} aria-hidden="true" />}
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.newTab}
            </HoverButton>
          )}
          {repoUrl && (
            <HoverButton
              icon={<GitHubIcon size={16} />}
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo
            </HoverButton>
          )}
        </div>
      )}

      {/* ── 2. ROLE + DESKRIPSI ── */}
      <div className="modal-info-section">
        <div className="modal-roles">
          {(Array.isArray(role) ? role : [role]).map(r => (
            <span className="sticker" key={r}>
              {t.role}: {r}
            </span>
          ))}
        </div>
        {description && (
          <div className="modal-description">
            {description.split('\n\n').filter(Boolean).map((para, i) => (
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
            title={title}
            language={language}
            onOpenLightbox={index => setLightboxIndex(index)}
          />
        </div>
      )}

      {/* ── 4. TOOLS ── */}
      {stack.length > 0 && (
        <div className="modal-tools-section">
          <div className="flex flex-wrap gap-2">
            {stack.map(s => (
              <span className="sticker" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX OVERLAY ── */}
      {lightboxIndex !== null && media && media[lightboxIndex] && (
        <Lightbox
          items={media}
          initialIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
