"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/diary/ProjectCard';
import { SectionTitle } from '@/components/diary/SectionTitle';
import styles from './WorkSection.module.css';
import {
  categories,
  copy,
  filterProjects,
  projects,
  type Category,
  type Language,
  type Project,
} from '@/data/portfolio';

export interface WorkSectionProps {
  language: Language;
  category: Category;
  onCategoryChange: (category: Category) => void;
  onOpenProject: (project: Project) => void;
}

export function WorkSection({
  language,
  category,
  onCategoryChange,
  onOpenProject,
}: WorkSectionProps) {
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = copy[language];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const webDev = projects.filter(p => p.category === 'Web Development');
  const ux = projects.filter(p => p.category === 'UI/UX Design');
  const creative = projects.filter(p => p.category === 'Creative Works');

  const renderCard = (p: Project) => (
    <ProjectCard key={p.id} project={p} language={language} onOpen={onOpenProject} />
  );

  const filtered = filterProjects(category);
  const groups =
    category === 'Creative Works'
      ? [...new Set(filtered.map(p => p.group || category))]
      : [category];

  return (
    <div id="work-wrapper" className={styles.workWrapper}>
      <section id="work" className={`work-band ${styles.workBand}`}>
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
        <div className={`${styles.stickyHeader} ${isStuck ? styles.isStuck : ''}`}>
          <div className={`page-inner ${styles.stickyHeaderInner}`}>
            <SectionTitle text={t.work} page="01" note={t.collection} />
            <div
              className={`filters ${styles.stickyHeaderFilters}`}
              role="group"
              aria-label={language === 'id' ? 'Filter kategori project' : 'Project category filter'}
            >
              {categories.map(c => (
                <Button
                  key={c}
                  variant="index"
                  aria-pressed={category === c}
                  onClick={() => onCategoryChange(c)}
                >
                  {c === 'UI/UX Design' ? 'UI/UX' : c}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={`page-inner ${styles.cardsContainer}`}>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {category}: {filtered.length} projects
          </div>
        {category === 'All' ? (
          <>
            <div className="category-group">
              <h3 className="category-subtitle">
                Web Development{' '}
                <Paperclip size={22} className="inline-block" style={{ marginLeft: '8px' }} aria-hidden="true" />
              </h3>
              <div className="project-grid">
                {webDev.map((p) => renderCard(p))}
              </div>
              <div className="more-row">
                <Button variant="link" onClick={() => onCategoryChange('Web Development')}>
                  {t.more}<ArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="category-group">
              <h3 className="category-subtitle">UI/UX Design</h3>
              <div className="project-grid">
                {ux.map((p) => renderCard(p))}
              </div>
              <div className="more-row">
                <Button variant="link" onClick={() => onCategoryChange('UI/UX Design')}>
                  {t.more}<ArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="category-group">
              <h3 className="category-subtitle">Creative Works</h3>
              <div className="project-grid">
                {creative.filter(p => p.id === 'creative-0' || p.id === 'creative-3').map(p => renderCard(p))}
              </div>
              <div className="more-row">
                <Button variant="link" onClick={() => onCategoryChange('Creative Works')}>
                  {t.more}<ArrowUpRight />
                </Button>
              </div>
            </div>
          </>
        ) : (
          groups.map(group => (
            <div className="category-group" key={group}>
              <h3 className="category-subtitle">{group}</h3>
              <div className="project-grid">
                {filtered.filter(p => !p.group || p.group === group).map(p => renderCard(p))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  </div>
  );
}
