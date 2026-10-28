"use client";

import { Mail } from 'lucide-react';
import { socialLinks } from '@/data/portfolio';
import { SocialIconLink } from '@/components/ui/SocialIconLink/SocialIconLink';

export function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export type SocialPlatform = 'linkedin' | 'instagram' | 'email' | 'github';
export type SocialHoverStyle = 'blue' | 'white-green';

/**
 * Pemetaan warna hover per ikon khusus ketika berada di atas background hijau (onGreen / Footer):
 * - linkedin & email: 'blue' (latar biru tua, ikon putih — sama persis dengan hero)
 * - instagram & github: 'white-green' (latar putih/krem, ikon hijau tua #2e5214)
 */
export const SOCIAL_HOVER_MAP_ON_GREEN: Record<SocialPlatform, SocialHoverStyle> = {
  linkedin: 'blue',
  email: 'blue',
  instagram: 'white-green',
  github: 'white-green',
};

export interface SocialLinksProps {
  footer?: boolean;
  /** 'default' (gaya hero) atau 'onGreen' (khusus background hijau footer) */
  variant?: 'default' | 'onGreen';
  className?: string;
}

export function SocialLinks({ variant = 'default', footer = false, className = '' }: SocialLinksProps) {
  const isOnGreen = variant === 'onGreen';

  return (
    <div className={`social-links ${className}`.trim()}>
      <SocialIconLink
        href={socialLinks.linkedin}
        label="LinkedIn"
        icon={<LinkedInIcon />}
        variant="a"
        hoverStyle={isOnGreen ? SOCIAL_HOVER_MAP_ON_GREEN.linkedin : undefined}
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIconLink
        href={socialLinks.instagram}
        label="Instagram"
        icon={<InstagramIcon />}
        variant="b"
        hoverStyle={isOnGreen ? SOCIAL_HOVER_MAP_ON_GREEN.instagram : undefined}
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIconLink
        href={socialLinks.email}
        label="Email (Gmail)"
        icon={<Mail size={16} />}
        variant="a"
        hoverStyle={isOnGreen ? SOCIAL_HOVER_MAP_ON_GREEN.email : undefined}
        target="_blank"
        rel="noopener noreferrer"
      />
      <SocialIconLink
        href={socialLinks.github}
        label="GitHub"
        icon={<GitHubIcon size={16} />}
        variant="b"
        hoverStyle={isOnGreen ? SOCIAL_HOVER_MAP_ON_GREEN.github : undefined}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}
