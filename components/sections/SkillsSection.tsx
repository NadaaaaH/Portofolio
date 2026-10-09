"use client";

import { Code2, Database, Feather, PenTool, Globe, Palette, Star } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { TornPaperEdge } from '@/components/decorations';

export function SkillsSection() {
  const icons = [Globe, Code2, Code2, Palette, Feather, PenTool, Database, Feather];
  return (
    <section className="skills-band">
      <TornPaperEdge />
      <div className="page-inner">
        <SectionTitle text="Skill" page="03" />
        <div className="skills-grid">
          {skills.map((s, i) => {
            const Icon = icons[i] || Code2;
            const count = s.level === 'Master' ? 5 : s.level === 'Advanced' ? 4 : s.level === 'Proficient' ? 3 : 2;
            return (
              <article className="skill-note scroll-reveal" key={s.name}>
                <Icon className="skill-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3>{s.name}</h3>
                <p>{s.level}</p>
                <div className="skill-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} fill={j < count ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
