export interface PinProps {
  className?: string;
}

export function Pin({ className = '' }: PinProps) {
  return <span className={`pin ${className}`.trim()} aria-hidden="true" />;
}
