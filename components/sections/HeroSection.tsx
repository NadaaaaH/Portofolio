"use client";

import { ArrowDownRight, ArrowUpRight, FileText, Star } from 'lucide-react';
import { RansomText } from '@/components/diary/RansomText';
import { Flower, Spark, Tape } from '@/components/decorations';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { HoverButton } from '@/components/ui/HoverButton/HoverButton';
import { CloudinaryImage } from '@/components/img/MediaImage';
import { copy, cvUrl, type Language } from '@/data/portfolio';

export interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language];
  const f = copy

  return (
    <header className="hero page-inner">
      <div className="hero-copy reveal">
        <span className="hello-label">
          {t.hello}
          <Star size={17} strokeWidth={1.3} aria-hidden="true" />
        </span>
        <h1>
          <RansomText
            lines={['Nada Haifa', 'Nurfadhilah']}
            className="hero-name"
            ariaLabel={t.name}
          />
        </h1>
        <div className="bio-note">
          <Tape tone="denim" />
          <h2>{t.tagline}</h2>
          <p>{t.bio}</p>
        </div>
        <div className="hero-links">
          <HoverButton
            icon={<FileText size={16} />}
            trailingIcon={<ArrowUpRight size={16} />}
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cv}
          </HoverButton>
          <SocialLinks />
        </div>
      </div>
      <div className="hero-photo-area reveal">
        <div className="photo-back" aria-hidden="true" />
        <div className="hero-polaroid polaroid relative">
          <Tape />
          <span className="paper-clip" aria-hidden="true" />
          <CloudinaryImage
            publicId={copy.foto}
            alt="Nada Haifa Nurfadhilah"
            width={640}
            onError={e => {
              e.currentTarget.src = 'f.foto';
            }}
          />
          <p className="photo-caption">Let's Get In Touch {'\u2661'}</p>
          <Spark className="hero-spark absolute left-63 top-10" />
          <Flower className="hero-flower" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="photo-annotation small-annotation">
          {t.annotation} <ArrowDownRight size={24} className="inline-block" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}
