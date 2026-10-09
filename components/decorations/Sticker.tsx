import type { ReactNode } from 'react';

export interface StickerProps {
  children: ReactNode;
  decorative?: boolean;
  className?: string;
}

export function Sticker({ children, decorative = false, className = '' }: StickerProps) {
  return <span className={`sticker ${className}`.trim()} aria-hidden={decorative || undefined}>{children}</span>;
}
