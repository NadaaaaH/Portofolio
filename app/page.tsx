"use client";

import { useEffect, useRef, useState } from 'react';
import { TornPaperEdge } from '@/components/decorations';
import { ProjectModal } from '@/components/diary/ProjectModal';
import {
  Navbar,
  MarqueeTape,
  HeroSection,
  WorkSection,
  AchievementsSection,
  SkillsSection,
  CertificatesSection,
  Footer,
} from '@/components/sections';
import { copy, type Category, type Language, type Project } from '@/data/portfolio';

export default function Page() {
  const [language, setLanguage] = useState<Language>('id');
  const [category, setCategory] = useState<Category>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const t = copy[language];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bahasa');
      if (saved === 'id' || saved === 'en') setLanguage(saved);
    } catch {
      /* Storage may be unavailable. */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    try {
      localStorage.setItem('bahasa', next);
    } catch {
      /* Keep toggle working when storage is unavailable. */
    }
  }

  function openProject(p: Project) {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    opener.current?.setAttribute('data-last-project', p.id);
    setSelected(p);
  }

  return (
    <div className="book">
      <Navbar language={language} onLanguageChange={changeLanguage} />
      <main>
        <MarqueeTape text={t.portfolio} />
        <HeroSection language={language} />
        <TornPaperEdge />
        <WorkSection
          language={language}
          category={category}
          onCategoryChange={setCategory}
          onOpenProject={openProject}
        />
        <AchievementsSection />
        <SkillsSection />
        <CertificatesSection language={language} />
      </main>
      <Footer />
      <ProjectModal project={selected} language={language} onClose={() => setSelected(null)} />
    </div>
  );
}