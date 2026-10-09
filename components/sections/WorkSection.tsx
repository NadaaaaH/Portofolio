"use client";

import { ArrowUpRight, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/diary/ProjectCard';
import { SectionTitle } from '@/components/diary/SectionTitle';
import {
  categories,
  copy,
  filterProjects,
  projects,
  summaries,
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
  const t = copy[language];

  const full = projects.filter(p => p.category === 'Fullstack Developer');
  const ux = projects.filter(p => p.category === 'UI/UX Design');
  const creative = projects.filter(p => p.category === 'Creative Works');
  const writing = projects.filter(p => p.category === 'Writing');

  const renderCard = (p: Project, summary?: { title: string; description: string }) => (
    <ProjectCard key={p.id} project={p} language={language} onOpen={onOpenProject} summary={summary} />
  );

  const filtered = filterProjects(category);
  const groups =
    category === 'Writing' || category === 'Creative Works'
      ? [...new Set(filtered.map(p => p.group || category))]
      : [category];

  return (
    <section id="work" className="work-band">
      <div className="page-inner">
        <SectionTitle text={t.work} page="01" note={t.collection} />
        <div className="filters" role="group" aria-label={language === 'id' ? 'Filter kategori project' : 'Project category filter'}>
          {categories.map(c => (
            <Button
              key={c}
              variant="index"
              aria-pressed={category === c}
              onClick={() => onCategoryChange(c)}
            >
              {c === 'Fullstack Developer' ? 'Fullstack' : c === 'UI/UX Design' ? 'UI/UX' : c}
            </Button>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {category}: {filtered.length} projects
        </div>
        {category === 'All' ? (
          <>
            <div className="category-group">
              <h3 className="category-subtitle">
                FullStack Developer{' '}
                <Paperclip size={22} className="inline-block" style={{ marginLeft: '8px' }} aria-hidden="true" />
              </h3>
              <div className="project-grid">
                {full.map((p, i) => renderCard(p, i === 0 ? summaries.portfolio : undefined))}
              </div>
              <div className="more-row">
                <Button variant="link" onClick={() => onCategoryChange('Fullstack Developer')}>
                  {t.more}<ArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="category-group">
              <h3 className="category-subtitle">UI/UX Design</h3>
              <div className="project-grid">
                {ux.map((p, i) => renderCard(p, i === 0 ? summaries.mentari : undefined))}
              </div>
              <div className="more-row">
                <Button variant="link" onClick={() => onCategoryChange('UI/UX Design')}>
                  {t.more}<ArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="category-group">
              <h3 className="category-subtitle">Other Projects</h3>
              <div className="other-project-columns">
                <div>
                  <h4 className="category-subtitle">Creative Works</h4>
                  <div className="project-grid other-project-grid">
                    {creative.filter(p => p.id === 'creative-0' || p.id === 'creative-3').map(p => renderCard(p))}
                  </div>
                  <div className="more-row">
                    <Button variant="link" onClick={() => onCategoryChange('Creative Works')}>
                      {t.more}<ArrowUpRight />
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="category-subtitle">Writing</h4>
                  <div className="project-grid other-project-grid">
                    {writing.slice(0, 2).map((p, i) => renderCard(p, i === 0 ? summaries.novel : summaries.script))}
                  </div>
                  <div className="more-row">
                    <Button variant="link" onClick={() => onCategoryChange('Writing')}>
                      {t.more}<ArrowUpRight />
                    </Button>
                  </div>
                </div>
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
  );
}
