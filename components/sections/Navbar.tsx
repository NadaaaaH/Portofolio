"use client";

import { BookOpen, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverButton } from '../ui/HoverButton/HoverButton';
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
        <BookOpen size={35} strokeWidth={1.5} />
        {language === 'id' ? "Nada's portofolio" : "Nada's portfolio"}
      </a>
      <div className="nav-actions">
        <HoverButton
          className="nav-cv"
          icon={<FileText size={16} />}
          trailingIcon={<ArrowUpRight size={16} />}
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.cv}
        </HoverButton>
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
