export function ransomVariant(char: string, index: number, text: string): number {
  return (char.charCodeAt(0) * 31 + index * 17 + text.length * 7) % 5;
}

export function RansomText({ text, className = '' }: { text: string; className?: string }) {
  let offset = 0;
  return (
    <span className={`ransom ${className}`} aria-label={text}>
      {text.trim().split(/\s+/).map((word, wi) => {
        const start = offset;
        offset += word.length + 1;
        return (
          <span className="ransom-word" aria-hidden="true" key={wi}>
            {Array.from(word).map((char, i) => (
              <span
                className={`ransom-tile tile-${ransomVariant(char, start + i, text)}`}
                key={i}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
