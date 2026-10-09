"use client";

import { BookOpen, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cvUrl, copy, type Language } from '@/data/portfolio';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Navbar({ language, onLanguageChange }: NavbarProps) {
  const t = copy[language];

  return (
    <nav className="navbar" aria-label={language === 'id' ? 'Navigasi utama' : 'Main navigation'}>
      <a href="#" className="brand-label">
        <BookOpen size={24} strokeWidth={1.5} />
        {"Nada's diary"}
        <span className="text-denim" aria-hidden="true">
          {'\u2727'}
        </span>
      </a>
      <div className="nav-actions">
        <Button variant="bookmark" asChild className="nav-cv">
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">
            <FileText />
            {t.cv}
            <ArrowUpRight />
          </a>
        </Button>
        <div className="language-switch" role="group" aria-label="Language">
          <Button
            variant="language"
            size="sm"
            aria-pressed={language === 'id'}
            onClick={() => onLanguageChange('id')}
          >
            ID
          </Button>
          <Button
            variant="language"
            size="sm"
            aria-pressed={language === 'en'}
            onClick={() => onLanguageChange('en')}
          >
            EN
          </Button>
        </div>
      </div>
    </nav>
  );
}
