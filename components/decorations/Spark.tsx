import { Star } from 'lucide-react';

export interface SparkProps {
  className?: string;
  size?: number;
}

export function Spark({ className = '', size }: SparkProps) {
  return <Star className={className} size={size} aria-hidden="true" strokeWidth={1.3} />;
}
