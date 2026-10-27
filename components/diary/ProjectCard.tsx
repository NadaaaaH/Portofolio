"use client";
import React from 'react';
import { ImageIcon, Play, ExternalLink } from 'lucide-react';
import { Tape, Pin, Sticker } from '@/components/decorations';
import { copy, getTranslation, type Language, type Project } from '@/data/portfolio';
import { CloudinaryImage } from '@/components/img/MediaImage';
import { MediaVideo } from '@/components/img/MediaVideo';
import styles from './ProjectCard.module.css';

function MissingMediaInline({ type, label }: { type?: 'image' | 'video'; label: string }) {
  const Icon = type === 'video' ? Play : ImageIcon;
  return (
    <div className="media-missing">
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export interface ProjectCardProps {
  project: Project;
  language: Language;
  onOpen: (p: Project) => void;
  summary?: { title: string; description: string };
}

export function ProjectCard({
  project,
  language,
  onOpen,
}: ProjectCardProps) {
  const t = copy[language];
  const creative = project.category === 'Creative Works';
  const projectTitle = getTranslation(project.title, language);
  const projectDescription = getTranslation(project.description, language);
  const preview = project.preview || (project.imagePublicId ? { type: 'image' as const, publicId: project.imagePublicId } : undefined);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      onOpen(project);
    }
  };

  const rawRoles = Array.isArray(project.role) ? project.role : [project.role];
  const roles = rawRoles
    .map(r => getTranslation(r as any, language).replace(/^Role:\s*/i, '').trim())
    .filter(Boolean);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={projectTitle}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      className={`project-card scroll-reveal polaroid ${creative ? 'creative-card' : ''} ${styles.card}`}
    >
      {project.id.endsWith('1') ? (
        <Pin />
      ) : (
        <Tape tone={creative ? 'denim' : 'green'} />
      )}
      <div className="project-preview">
        {preview?.publicId ? (
          preview.type === 'video' ? (
            <MediaVideo
              publicId={preview.publicId}
              posterPublicId={preview.posterPublicId}
              autoplay={preview.autoplay}
              className="portfolio-shot"
            />
          ) : (
            <CloudinaryImage
              publicId={preview.publicId}
              alt={projectTitle}
              width={640}
              className="portfolio-shot"
            />
          )
        ) : creative ? (
          <div className="photo-strip">
            {project.previewLabels.map(label => (
              <span key={label}>
                {preview?.type === 'video' ? (
                  <Play size={27} aria-hidden="true" />
                ) : (
                  <ImageIcon size={27} aria-hidden="true" />
                )}
                {label}
              </span>
            ))}
          </div>
        ) : (
          <MissingMediaInline type={preview?.type} label={project.previewLabels[0] || t.missing} />
        )}
      </div>
      <div className={styles.roleRow}>
        <span className={styles.roleLabel}>{t.role || 'Role'}:</span>
        <div className={styles.roleChips}>
          {roles.map(r => (
            <Sticker key={r}>{r}</Sticker>
          ))}
        </div>
      </div>
      <h3 className={styles.title}>{projectTitle}</h3>
      <p className={`card-description ${styles.description}`}>
        {projectDescription || '\u00A0'}
      </p>
      <div className={`card-bottom ${styles.cardBottom}`}>
        <div className="stack-list">
          {project.stack.map(s => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <button
          className="ghost-icon-btn"
          aria-label={`${t.open}: ${projectTitle}`}
          title={t.open}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(project);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
        >
          <ExternalLink />
        </button>
      </div>
    </article>
  );
}
