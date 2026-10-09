import { Star } from 'lucide-react';
import type { ReactNode } from 'react';
export function Tape({ tone = 'green' }: { tone?: 'green' | 'denim' | 'peach' }) { return <span aria-hidden="true" className={`tape tape-${tone}`} />; }
export function Pin() { return <span className="pin" aria-hidden="true" />; }
export function Sticker({ children, decorative = false }: { children: ReactNode; decorative?: boolean }) { return <span className="sticker" aria-hidden={decorative || undefined}>{children}</span>; }
export function TornPaperEdge() { return <div className="torn-edge" aria-hidden="true" />; }
export function Stamp({ children }: { children: ReactNode }) { return <span className="stamp">{children}</span>; }
export function Flower({ className = '' }: { className?: string }) {
 return <svg className={`flower ${className}`} viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor" stroke="var(--foreground)" strokeWidth="1.2">{Array.from({length:8},(_,i)=><ellipse key={i} cx="50" cy="26" rx="12" ry="23" transform={`rotate(${i*45} 50 50)`}/>)}<circle cx="50" cy="50" r="15" fill="var(--primary)"/><circle cx="46" cy="47" r="1.5" fill="var(--foreground)"/><circle cx="55" cy="47" r="1.5" fill="var(--foreground)"/><path d="M45 54q5 5 10 0" fill="none"/></g></svg>;
}
export function Spark({ className = '' }: { className?: string }) { return <Star className={className} aria-hidden="true" strokeWidth={1.3} />; }
