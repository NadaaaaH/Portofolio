"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

// Sophisticated, muted aesthetic pastel palette (mature, soft & cohesive)
export const COLOR_PALETTE = [
  "#E47F98", // Soft Muted Dusty Rose
  "#E09B67", // Warm Muted Apricot
  "#D9B458", // Soft Vintage Honey
  "#6BB392", // Muted Soft Sage
  "#6A9EC0", // Soft Dusty Blue
  "#9B82BD", // Soft Muted Lavender
  "#C87D8F", // Soft Mauve
];

// Helper component for title with 2-section pure CSS Hi-Liter marker animation
// and macOS Dock magnification wave hover effect adapted from Blake Bowen
export function ColorfulTitle({ text }: { text: string }) {
  const [markerState, setMarkerState] = useState<"idle" | "marked" | "gone">("idle");

  useEffect(() => {
    // 1. Initial load: muncul tuh marknya sampai full
    const timer = setTimeout(() => {
      setMarkerState("marked");
    }, 300);

    // 2. Scroll detection: ketika user geser ke bawah, marknya pergi
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 90) {
        setMarkerState("gone");
      } else {
        setMarkerState("marked");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const words = text ? text.split(" ") : ["Nada", "Haifa", "Nurfadhilah"];
  const line1Words = words.slice(0, 2); // "Nada", "Haifa"
  const line2Words = words.slice(2);    // "Nurfadhilah"

  const stateClass =
    markerState === "marked"
      ? "is-marked"
      : markerState === "gone"
      ? "is-gone"
      : "";

  // macOS Dock magnification wave effect on mousemove
  const handleDockMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const chars = container.querySelectorAll<HTMLElement>(".dock-char");
    if (!chars.length) return;

    const mouseX = e.clientX;
    const bound = 70; // Influence radius in px around pointer
    const maxScale = 1.32; // Max magnification scale

    chars.forEach((charEl) => {
      const rect = charEl.getBoundingClientRect();
      const charCenter = rect.left + rect.width / 2;
      const distance = charCenter - mouseX;

      let scale = 1;
      let x = 0;
      let y = 0;

      if (Math.abs(distance) < bound) {
        const rad = (distance / bound) * (Math.PI / 2);
        const cosVal = Math.cos(rad);
        scale = 1 + (maxScale - 1) * cosVal;
        x = 5 * Math.sin(rad);
        y = -10 * cosVal;
      }

      gsap.to(charEl, {
        duration: 0.22,
        scale: scale,
        x: x,
        y: y,
        transformOrigin: "50% 85%",
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  const handleDockMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const chars = container.querySelectorAll<HTMLElement>(".dock-char");
    gsap.to(chars, {
      duration: 0.35,
      scale: 1,
      x: 0,
      y: 0,
      ease: "back.out(1.5)",
      overwrite: "auto",
    });
  };

  let globalCharIdx = 0;

  return (
    <div className="font-galada leading-[0.95] select-none py-1">
      {/* Line 1: Nada Haifa with natural, close spacing, dock hover wave & idle wave */}
      <div
        onMouseMove={handleDockMouseMove}
        onMouseLeave={handleDockMouseLeave}
        className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3.5 cursor-pointer"
      >
        {line1Words.map((w, i) => (
          <div
            key={`w1-${i}`}
            className={`fx-marker ${stateClass}`}
            style={{
              animationDelay:
                markerState === "marked"
                  ? `${i * 0.12}s`
                  : `${i * 0.08}s`,
            }}
          >
            {w.split("").map((c, cIdx) => {
              const charDelay = (globalCharIdx++) * 0.1;
              return (
                <span
                  key={cIdx}
                  className="dock-char inline-block will-change-transform"
                >
                  <span
                    className="wave-char inline-block"
                    style={{ animationDelay: `${charDelay}s` }}
                  >
                    {c}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Line 2: Nurfadhilah - tighter vertical spacing, dock hover wave & idle wave */}
      {line2Words.length > 0 && (
        <div
          onMouseMove={handleDockMouseMove}
          onMouseLeave={handleDockMouseLeave}
          className="-mt-1.5 sm:-mt-3 flex flex-wrap items-baseline cursor-pointer"
        >
          {line2Words.map((w, i) => (
            <div
              key={`w2-${i}`}
              className={`fx-marker ${stateClass}`}
              style={{
                animationDelay:
                  markerState === "marked"
                    ? `${(line1Words.length + i) * 0.12}s`
                    : `${(line1Words.length + i) * 0.08}s`,
              }}
            >
              {w.split("").map((c, cIdx) => {
                const charDelay = (globalCharIdx++) * 0.1;
                return (
                  <span
                    key={cIdx}
                    className="dock-char inline-block will-change-transform"
                  >
                    <span
                      className="wave-char inline-block"
                      style={{ animationDelay: `${charDelay}s` }}
                    >
                      {c}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Decorative Daisy Flower SVG
export function DaisyFlower({ className = "", size = 38 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`transform transition-transform duration-300 hover:scale-125 hover:rotate-12 cursor-pointer ${className}`}>
      <g fill="#FFFFFF" stroke="#F3E5D8" strokeWidth="1">
        <ellipse cx="50" cy="18" rx="10" ry="17" />
        <ellipse cx="50" cy="82" rx="10" ry="17" />
        <ellipse cx="18" cy="50" rx="17" ry="10" />
        <ellipse cx="82" cy="50" rx="17" ry="10" />
        <ellipse cx="27" cy="27" rx="11" ry="16" transform="rotate(-45 27 27)" />
        <ellipse cx="73" cy="73" rx="11" ry="16" transform="rotate(-45 73 73)" />
        <ellipse cx="73" cy="27" rx="11" ry="16" transform="rotate(45 73 27)" />
        <ellipse cx="27" cy="73" rx="11" ry="16" transform="rotate(45 29 73)" />
      </g>
      <circle cx="50" cy="50" r="16" fill="#FFCC00" stroke="#FF9900" strokeWidth="2" />
    </svg>
  );
}

// Sparkle Star 4-point SVG
export function SparkleStar({ className = "", size = 30, fill = "#FFD166" }: { className?: string; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`transform transition-transform duration-300 hover:scale-130 hover:rotate-12 cursor-pointer ${className}`}>
      <path
        d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z"
        fill={fill}
      />
    </svg>
  );
}

// Sparkle Star 6-point SVG
export function SparkleStar6({ className = "", size = 32, fill = "#39D39F" }: { className?: string; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`transform transition-transform duration-300 hover:scale-130 hover:rotate-12 cursor-pointer ${className}`}>
      <path
        d="M50 0 L58 35 L93 21 L68 50 L93 79 L58 65 L50 100 L42 65 L7 79 L32 50 L7 21 L42 35 Z"
        fill={fill}
      />
    </svg>
  );
}

// Cute 5-point Star SVG
export function CuteStar({ className = "", size = 26, fill = "#FF85A1" }: { className?: string; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`transform transition-transform duration-300 hover:scale-130 hover:rotate-12 cursor-pointer ${className}`}>
      <polygon
        points="50,5 64,36 98,39 72,61 80,95 50,76 20,95 28,61 2,39 36,36"
        fill={fill}
      />
    </svg>
  );
}

// Cute Heart Doodle SVG
export function HeartDoodle({ className = "", size = 28, fill = "#FF7096" }: { className?: string; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={`transform transition-transform duration-300 hover:scale-130 hover:rotate-12 cursor-pointer ${className}`}>
      <path
        d="M50 88 C20 70 5 50 5 30 C5 15 18 5 32 5 C41 5 47 10 50 16 C53 10 59 5 68 5 C82 5 95 15 95 30 C95 50 80 70 50 88 Z"
        fill={fill}
      />
    </svg>
  );
}

// Clean 1-Color Metal / Gold Paperclip SVG
export function Paperclip({
  className = "",
  size = 32,
  color = "#D4AF37",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.8}
      viewBox="0 0 80 160"
      fill="none"
      className={`drop-shadow-xs transform transition-transform duration-300 hover:scale-125 hover:rotate-12 cursor-pointer ${className}`}
    >
      <path
        d="M 26 110 V 42 A 16 16 0 0 1 58 42 V 118 A 22 22 0 0 1 14 118 V 32 A 18 18 0 0 1 50 32 V 96"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Aesthetic Stamp / Badge
export function CuteBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`w-18 h-18 rounded-full border-2 border-dashed border-rose-400/80 bg-rose-50/90 flex flex-col items-center justify-center text-[9px] font-bold text-rose-500 transform -rotate-12 shadow-xs select-none cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-0 ${className}`}>
      <span>✨ CREATIVE ✨</span>
      <span className="text-[7px]">PORTFOLIO</span>
    </div>
  );
}

// Cute Hand-Drawn "Hai!" Speech Bubble Sticker (appears on photo hover)
export function HaiSpeechBubble({ className = "" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        width="130"
        height="100"
        viewBox="0 0 220 165"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
      >
        {/* Mirrored hand-drawn style speech bubble contour with tail on bottom-left */}
        <path
          d="M 178 14 C 202 14 212 30 212 60 C 212 90 202 106 178 106 L 72 106 L 36 152 C 32 157 25 154 28 147 L 46 106 C 22 103 8 86 8 60 C 8 30 22 14 72 14 Z"
          fill="#FFFFFF"
          stroke="#1A1A1A"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bold "Hai!" text centered in mirrored bubble */}
        <text
          x="116"
          y="62"
          fill="#1A1A1A"
          fontSize="52"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Poppins', sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          Hai!
        </text>
      </svg>
      {/* Cute sparkling star popping alongside bubble */}
      <div className="absolute -top-2 -right-1 animate-bounce">
        <SparkleStar size={24} fill="#FFD166" />
      </div>
    </div>
  );
}

// Decorative Washi Tape
export function WashiTape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-28 h-7 bg-amber-100/80 border-t border-b border-dashed border-amber-300/70 shadow-xs backdrop-blur-[1px] ${className}`}
      style={{
        backgroundImage: "radial-gradient(#F59E0B 1.5px, transparent 1.5px)",
        backgroundSize: "9px 9px"
      }}
    />
  );
}
