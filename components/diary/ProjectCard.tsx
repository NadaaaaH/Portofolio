"use client";
import { ArrowUpRight, ImageIcon, Play, ExternalLink } from 'lucide-react';
import { Tape, Pin, Sticker } from '@/components/decorations';
import { copy, type Language, type Project } from '@/data/portfolio';
import { CloudinaryImage } from '@/components/img/MediaImage';

function MissingMediaInline({ type, label }: { type: Project['type']; label: string }) {
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
  summary,
}: ProjectCardProps) {
  const t = copy[language];
  const creative = project.category === 'Creative Works';
  return (
    <article
      className={`project-card scroll-reveal polaroid ${creative ? 'creative-card' : ''}`}
    >
      {project.id.endsWith('1') ? (
        <Pin />
      ) : (
        <Tape tone={creative ? 'denim' : 'green'} />
      )}
      <div className="project-preview">
        {project.imagePublicId ? (
          <CloudinaryImage
            publicId={project.imagePublicId}
            alt={project.title}
            width={640}
            className="portfolio-shot"
          />
        ) : creative ? (
          <div className="photo-strip">
            {project.previewLabels.map(label => (
              <span key={label}>
                {project.type === 'video' ? (
                  <Play size={27} aria-hidden="true" />
                ) : (
                  <ImageIcon size={27} aria-hidden="true" />
                )}
                {label}
              </span>
            ))}
          </div>
        ) : (
          <MissingMediaInline type={project.type} label={project.previewLabels[0] || t.missing} />
        )}
        <button
          className="frame-open"
          aria-label={`${t.open}: ${project.title}`}
          onClick={() => onOpen(project)}
        >
          <span className="open-badge">
            <ArrowUpRight size={13} />
            {t.open}
          </span>
        </button>
      </div>
      <div className="card-meta">
        <Sticker>{project.role}</Sticker>
        <span className="page-number">&nearr;</span>
      </div>
      <h3>{summary?.title || project.title}</h3>
      {(summary?.description || project.description) && (
        <p className="card-description">{summary?.description || project.description}</p>
      )}
      <div className="card-bottom">
        <div className="stack-list">
          {project.stack.map(s => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <button
          className="ghost-icon-btn"
          aria-label={`${t.open}: ${project.title}`}
          title={t.open}
          onClick={() => onOpen(project)}
        >
          <ExternalLink />
        </button>
      </div>
    </article>
  );
}
