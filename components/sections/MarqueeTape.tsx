export interface MarqueeTapeProps {
  text: string;
  count?: number;
}

export function MarqueeTape({ text, count = 16 }: MarqueeTapeProps) {
  return (
    <div className="washi-marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: count }, (_, i) => (
          <span key={i}>
            {text} <span style={{ marginLeft: '28px' }}>{'\u2726'}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
