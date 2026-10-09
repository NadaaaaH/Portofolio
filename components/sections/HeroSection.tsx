"use client";

import { ArrowDownRight, ArrowUpRight, FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RansomText } from '@/components/diary/RansomText';
import { Flower, Spark, Tape } from '@/components/decorations';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { copy, cvUrl, type Language } from '@/data/portfolio';

export interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language];

  return (
    <header className="hero page-inner">
      <div className="hero-copy reveal">
        <span className="hello-label">
          {t.hello}
          <Star size={17} strokeWidth={1.3} aria-hidden="true" />
        </span>
        <h1><RansomText text={t.name} className="hero-name" /></h1>
        <div className="bio-note">
          <Tape tone="denim" />
          <h2>{t.tagline}</h2>
          <p>{t.bio}</p>
        </div>
        <div className="hero-links">
          <Button variant="bookmark" asChild>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer">
              <FileText />{t.cv}<ArrowUpRight />
            </a>
          </Button>
          <SocialLinks />
        </div>
      </div>
      <div className="hero-photo-area reveal">
        <div className="photo-back" aria-hidden="true" />
        <div className="hero-polaroid polaroid">
          <Tape />
          <span className="paper-clip" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/FotoProfil.png" alt="Nada Haifa Nurfadhilah" width={310} height={340} />
          <p className="photo-caption">Nada Haifa Nurfadhilah {'\u2661'}</p>
        </div>
        <Spark className="hero-spark" />
        <Flower className="hero-flower" />
        <span className="photo-annotation small-annotation">
          {t.annotation} <ArrowDownRight size={24} className="inline-block" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}
