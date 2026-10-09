export interface TapeProps {
  tone?: 'green' | 'denim' | 'peach';
  className?: string;
}

export function Tape({ tone = 'green', className = '' }: TapeProps) {
  return <span aria-hidden="true" className={`tape tape-${tone} ${className}`.trim()} />;
}
