export interface TornPaperEdgeProps {
  className?: string;
}

export function TornPaperEdge({ className = '' }: TornPaperEdgeProps) {
  return <div className={`torn-edge ${className}`.trim()} aria-hidden="true" />;
}
