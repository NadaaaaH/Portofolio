"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import heroStyles from '@/components/sections/HeroSection.module.css';
import { copy, type Category, type Language, type Project } from '@/data/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const [language, setLanguage] = useState<Language>('id');
  const [category, setCategory] = useState<Category>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktopOrTablet: '(min-width: 641px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktopOrTablet, reduceMotion } = context.conditions as {
            isDesktopOrTablet: boolean;
            reduceMotion: boolean;
          };

          if (isDesktopOrTablet && !reduceMotion && heroRef.current) {
            ScrollTrigger.create({
              trigger: heroRef.current,
              start: 'top top',
              endTrigger: '#work',
              end: 'top top',
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
          }
        }
      );
    });

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [category, language]);

  return (
    <div className="book">
      <div ref={heroRef} className={heroStyles.heroPinnedWrapper}>
        <Navbar language={language} onLanguageChange={changeLanguage} />
        <div className="hero-zone">
          <MarqueeTape text={t.portfolio} />
          <HeroSection language={language} />
        </div>
      </div>
      <main>
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