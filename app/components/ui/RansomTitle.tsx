"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RansomTitleProps {
  text: string;
  className?: string;
}

export default function RansomTitle({ text, className = "" }: RansomTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const letters = el.querySelectorAll(".ransom-char");
            if (letters.length > 0) {
              gsap.fromTo(
                letters,
                {
                  opacity: 0,
                  y: 28,
                  scale: 0.4,
                  rotate: (i) => (i % 2 === 0 ? -16 : 16),
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: (i) => (i % 2 === 0 ? -4 : 4),
                  duration: 0.45,
                  stagger: 0.08, // Muncul dari kiri ke kanan 1 per 1
                  ease: "back.out(2)",
                  onComplete: () => {
                    letters.forEach((l) => l.classList.add("ransom-floating"));
                  },
                }
              );
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, hasAnimated]);

  // Reset agar animasi dapat berjalan kembali ketika bahasa diubah
  useEffect(() => {
    setHasAnimated(false);
  }, [text]);

  const words = text ? text.split(" ") : ["Karyaku", "..."];
  let globalCharIndex = 0;

  return (
    <h2
      ref={containerRef}
      role="img"
      aria-label={text}
      className={`text-center flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-14 sm:my-20 md:my-24 select-none relative z-20 ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="fx-ransom inline-flex items-center gap-1 sm:gap-1.5">
          {word.split("").map((char, cIdx) => {
            const charIdx = globalCharIndex++;
            return (
              <b
                key={cIdx}
                aria-hidden="true"
                className="ransom-char opacity-0 inline-block font-mono font-bold shadow-xs cursor-default"
                style={
                  {
                    "--i": charIdx,
                  } as React.CSSProperties
                }
              >
                {char}
              </b>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
