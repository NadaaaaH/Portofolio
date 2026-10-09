"use client";

import { Mail, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/data/portfolio';

export function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export interface SocialLinksProps {
  footer?: boolean;
  className?: string;
}

export function SocialLinks({ footer = false, className = '' }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      <Button variant="ghost" size="icon" title="LinkedIn" aria-label="LinkedIn" asChild>
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      </Button>
      <Button variant="ghost" size="icon" title="Instagram" aria-label="Instagram" asChild>
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>
      </Button>
      <Button variant="ghost" size="icon" title="Email (Gmail)" aria-label="Email (Gmail)" asChild>
        <a href={socialLinks.email} target="_blank" rel="noopener noreferrer">
          <Mail />
        </a>
      </Button>
      {!footer && (
        <Button variant="ghost" size="icon" title="GitHub" aria-label="GitHub" asChild>
          <a href="https://github.com/nadahaifa1" target="_blank" rel="noopener noreferrer">
            <GitBranch />
          </a>
        </Button>
      )}
    </div>
  );
}
