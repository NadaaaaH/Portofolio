"use client";

import { useEffect, useId, useRef } from "react";

/**
 * MarqueeTape — pita washi tape bergelombang, flat & natural.
 *
 * Fix distorsi teks:
 *   → Tidak pakai preserveAspectRatio="none".
 *   → CSS aspect-ratio menyamakan skala X dan Y → teks proporsional.
 *
 * Animasi via requestAnimationFrame (CSS tidak bisa animasi SVG startOffset
 * secara cross-browser). Teks bergerak kanan → kiri mengikuti lekuk pita.
 */

import styles from "./MarqueeTape.module.css";

export interface MarqueeTapeProps {
  text: string;
  count?: number;
}

export function MarqueeTape({ text, count = 55 }: MarqueeTapeProps) {
  const uid = useId().replace(/:/g, "");
  const pathId = `wm-path-${uid}`;
  const noiseId = `wm-noise-${uid}`;
  const textPathRef = useRef<SVGTextPathElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const singleSegRef = useRef<SVGTSpanElement>(null);

  /* ─── Konstanta geometri ───────────────────────────────────────────
     ViewBox W=4200, H=210.
     W diperlebar dari 2000 → 4200 supaya saat SVG di-scale proporsional
     untuk mengisi CSS height (default preserveAspectRatio="xMidYMid meet"),
     lebar konten yang ter-render selalu melampaui 110vw di semua layar
     dan semua nilai clamp height (48px–130px).
     Rumus: rendered_w = W × (css_height / H). Pada css_height=48px:
       4200 × (48/210) = 960px > 110vw@375px=412px ✓
     Pada css_height=130px:
       4200 × (130/210) = 2600px > 110vw@1920px=2112px ✓
     TAPE_H, AMP, CYCLES, kemiringan -1.6° tidak berubah → bentuk sama persis.
  ───────────────────────────────────────────────────────────────── */
  const W = 2900;
  const H = 210;
  const TAPE_H = 90;     // ketebalan pita flat, konstan
  const BASELINE = H / 2;  // 105
  const AMP = 24;
  const CYCLES = 1.75;
  const OVR = W * 0.06; // overshoot tiap sisi (~252px SVG units)
  const TOTAL_W = W + OVR * 2;
  const STEPS = 140;

  /* ─── Bangun titik-titik jalur sinus ─── */
  const midPoints: [number, number][] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const x = -OVR + TOTAL_W * t;
    const baseSlant = (x - W / 2) * Math.tan((-1.6 * Math.PI) / 180);
    const wave = AMP * Math.sin(2 * Math.PI * CYCLES * t);
    midPoints.push([x, BASELINE + baseSlant + wave]);
  }

  /** Konversi array titik → SVG path string (cubic bezier halus) */
  function pts2path(pts: [number, number][]): string {
    if (!pts.length) return "";
    let d = `M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      const cx = (x1 + x2) / 2;
      d += ` C ${cx.toFixed(2)},${y1.toFixed(2)} ${cx.toFixed(2)},${y2.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`;
    }
    return d;
  }

  function offsetPts(pts: [number, number][], dy: number): [number, number][] {
    return pts.map(([x, y]) => [x, y + dy]);
  }

  const half = TAPE_H / 2;
  const topPts = offsetPts(midPoints, -half);
  const botPts = offsetPts(midPoints, half);
  const botRev = [...botPts].reverse();

  const midPath = pts2path(midPoints);
  const topPath = pts2path(topPts);
  const botPath = pts2path(botPts);

  // Closed filled shape — badan pita
  const pitaPath =
    pts2path(topPts) +
    ` L ${botPts.at(-1)![0].toFixed(2)},${botPts.at(-1)![1].toFixed(2)}` +
    botRev.slice(1).map(([x, y]) => ` L ${x.toFixed(2)},${y.toFixed(2)}`).join("") +
    " Z";

  /* ─── Teks: separator rapat (1 spasi tiap sisi) ─── */
  const sep = "\u00A0\u2726\u00A0";
  const singleText = `${text}${sep}`;
  const restText = Array.from({ length: count - 1 }, () => singleText).join("");

  /* ─── Animasi: kanan → kiri, loop seamless mengikuti lengkung pita ── */
  useEffect(() => {
    const el = textPathRef.current;
    const wrapper = wrapperRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      el.setAttribute("startOffset", "0");
      return;
    }

    // Baca durasi per lintasan dari CSS variable (--marquee-duration)
    let durationSec = 25;
    if (wrapper) {
      const cssDur = getComputedStyle(wrapper).getPropertyValue("--marquee-duration").trim();
      if (cssDur) {
        const parsed = parseFloat(cssDur);
        if (!isNaN(parsed) && parsed > 0) {
          durationSec = cssDur.endsWith("ms") ? parsed / 1000 : parsed;
        }
      }
    }

    // Kecepatan dalam pixel SVG per milidetik: panjang W (2900px) ditempuh dalam durationSec
    const speedPxPerMs = W / (durationSec * 1000);

    offsetRef.current = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min(now - last, 100);
      last = now;

      const segLen = singleSegRef.current?.getComputedTextLength() || 215;

      offsetRef.current -= speedPxPerMs * dt;
      // Loop mulus tanpa patah-patah: saat 1 kata penuh terlewati, reset persis sepanjang 1 kata
      while (offsetRef.current <= -segLen) {
        offsetRef.current += segLen;
      }
      el!.setAttribute("startOffset", offsetRef.current.toFixed(2));
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(rafRef.current);
        el.setAttribute("startOffset", "0");
      } else {
        last = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [text, count, W]);

  return (
    <div ref={wrapperRef} className={`washi-marquee-wave ${styles.washiMarqueeWave}`} aria-hidden="true">
      {/*
        PENTING: TIDAK ada preserveAspectRatio="none".
        CSS aspect-ratio: 2000/210 memastikan skala X = skala Y
        → teks tidak gepeng/melebar.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        className="wave-svg"
      >
        <defs>
          {/* Tekstur kertas tipis — washi tape feel, opacity 6% */}
          <filter
            id={noiseId}
            x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72 0.68"
              numOctaves="4"
              seed="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="dimNoise">
              <feFuncA type="linear" slope="0.06" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="dimNoise" mode="multiply" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Path untuk textPath */}
          <path id={pathId} d={midPath} fill="none" />
        </defs>

        {/* ── Badan pita: flat, satu warna + noise tekstur tipis ── */}
        <path d={pitaPath} fill="var(--primary)" filter={`url(#${noiseId})`} />

        {/* Tepi dashed — simpel, seperti washi tape asli */}
        <path
          d={topPath}
          fill="none"
          stroke="color-mix(in oklab, var(--foreground) 20%, transparent)"
          strokeWidth="1.3"
          strokeDasharray="5 4"
        />
        <path
          d={botPath}
          fill="none"
          stroke="color-mix(in oklab, var(--foreground) 20%, transparent)"
          strokeWidth="1.3"
          strokeDasharray="5 4"
        />

        {/* ── Teks menyusuri jalur gelombang ── */}
        <text
          className={styles.marqueeText}
          fontFamily="var(--font-sans, ui-sans-serif, system-ui, sans-serif)"
          fontWeight="900"
          fontSize="28"
          fill="var(--foreground)"
          letterSpacing="0.04em"
          dominantBaseline="middle"
        >
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0"
          >
            <tspan ref={singleSegRef}>{singleText}</tspan>
            {restText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
