import type { ReactNode } from 'react';

export interface StampProps {
  children: ReactNode;
  className?: string;
}

export function Stamp({ children, className = '' }: StampProps) {
  return <span className={`stamp ${className}`.trim()}>{children}</span>;
}
