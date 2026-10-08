
"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "./context/Language";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import {
  ColorfulTitle,
  DaisyFlower,
  SparkleStar,
  CuteStar,
  HeartDoodle,
  HaiSpeechBubble,
  WashiTape,
} from "./stickers";

// Continuous Interactive Marquee for background watermark
function PortoMarqueeRow({
  direction = "left",
  speed = 36,
  className = "",
}: {
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    const fromX = direction === "left" ? 0 : -50;
    const toX = direction === "left" ? -50 : 0;

    const tween = gsap.fromTo(
      track,
      { xPercent: fromX },
      {
        xPercent: toX,
        duration: speed,
        ease: "none",
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, [direction, speed]);

  const handleCharEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.35,
      y: -8,
      color: "#5A4637",
      textShadow: "0 8px 24px rgba(90, 70, 55, 0.3)",
      duration: 0.25,
      ease: "back.out(2.5)",
      overwrite: "auto",
    });
  };

  const handleCharLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      color: "rgba(90, 70, 55, 0.22)",
      textShadow: "none",
      duration: 0.55,
      ease: "elastic.out(1.2, 0.4)",
      overwrite: "auto",
    });
  };

  // Repeated text array for continuous seamless marquee with tightened gaps
  const words = ["PORTOFOLIO", "•", "PORTOFOLIO", "•", "PORTOFOLIO", "•", "PORTOFOLIO", "•"];

  const renderHalf = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {words.map((w, wIdx) => (
        <span key={`${keyPrefix}-w-${wIdx}`} className="inline-flex items-center mx-2 sm:mx-3">
          {w.split("").map((char, cIdx) => (
            <span
              key={`${keyPrefix}-c-${wIdx}-${cIdx}`}
              onMouseEnter={handleCharEnter}
              onMouseLeave={handleCharLeave}
              className="inline-block cursor-pointer select-none transition-colors duration-150 transform origin-center px-[0.02em] will-change-transform"
              style={{
                color: "rgba(90, 70, 55, 0.18)",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`w-full select-none pointer-events-none overflow-visible py-8 -my-8 ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform pointer-events-auto text-[5.5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] font-bold leading-none tracking-normal"
        style={{ fontFamily: "'Jacques Francois', serif" }}
      >
        {renderHalf("a")}
        {renderHalf("b")}
      </div>
    </div>
  );
}

export default function Header() {
  const { t, bahasa, setBahasa } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(SplitText);
    }

    let split1: any = null;
    let split2: any = null;

    const ctx = gsap.context(() => {
      const fontsPromise =
        typeof document !== "undefined" && document.fonts
          ? document.fonts.ready
          : Promise.resolve();

      fontsPromise.then(() => {
        if (!heroRef.current) return;

        gsap.set(["#hero-desc-1", "#hero-desc-2"], { opacity: 1 });

        split1 = SplitText.create("#hero-desc-1", {
          type: "words,lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
        });

        const desc2El = document.querySelector("#hero-desc-2");
        if (desc2El) {
          split2 = SplitText.create("#hero-desc-2", {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
          });
        }

        const tl = gsap.timeline();

        // STEP 1: Foto profil (Pertama)
        tl.fromTo(
          "#hero-photo-frame",
          { scale: 0.3, opacity: 0, rotation: -14 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.75, ease: "back.out(1.8)" }
        )
          // STEP 2: Namaku (Kedua)
          .fromTo(
            "#hero-title",
            { scale: 0.92, opacity: 0, y: 25 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "back.out(1.8)",
            },
            "-=0.35"
          );

        // STEP 3: Deskripsi 1 & Deskripsi 2 dengan animasi masked line reveal
        if (split1?.lines?.length) {
          tl.from(
            split1.lines,
            {
              duration: 0.6,
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: "expo.out",
            },
            "-=0.25"
          );
        }

        if (split2?.lines?.length) {
          tl.from(
            split2.lines,
            {
              duration: 0.6,
              yPercent: 100,
              opacity: 0,
              stagger: 0.08,
              ease: "expo.out",
            },
            "-=0.35"
          );
        }

        // STEP 4: Tombol-tombol (Terus: Tombol CV & Sosmed)
        tl.fromTo(
          ["#hero-cv-btn", "#hero-social-icons"],
          { y: 25, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.8)" },
          "-=0.2"
        );
      });
    }, heroRef);

    return () => {
      split1?.revert();
      split2?.revert();
      ctx.revert();
    };
  }, [t.header.nama, t.header.deskripsi_1, t.header.deskripsi_2]);

  return (
    <header ref={heroRef} className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-4 py-12 z-0">

      {/* 1. LANGUAGE SWITCHER (TOP RIGHT) WITH LIHAT CV SAGE GREEN DASHED STYLE */}
      <div className="top-5 right-6 md:right-12 z-50 flex gap-2.5 fixed">
        <button
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${bahasa === "id"
            ? "bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#2C3E35]"
            : "bg-white/90 text-[#5A4637] hover:bg-[#D4DEC8] hover:text-[#2C3E35] border border-amber-200/60 outline-offset-[-4px] outline-2 outline-dashed outline-transparent hover:outline-[#BCCAB4]"
            }`}
          onClick={() => setBahasa("id")}
        >
          {t.header.alih_bahasa_id}
        </button>
        <button
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${bahasa === "en"
            ? "bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#2C3E35]"
            : "bg-white/90 text-[#5A4637] hover:bg-[#D4DEC8] hover:text-[#2C3E35] border border-amber-200/60 outline-offset-[-4px] outline-2 outline-dashed outline-transparent hover:outline-[#BCCAB4]"
            }`}
          onClick={() => setBahasa("en")}
        >
          {t.header.alih_bahasa_en}
        </button>
      </div>

      {/* 2. BACKGROUND CONTINUOUS WATERMARK MARQUEE (Z-0: NOTEBOOK PAPER & WRITING STAY ON TOP AS PRIORITY #1) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <PortoMarqueeRow direction="left" speed={38} className="absolute top-2 sm:top-4 md:top-6 left-0 right-0 opacity-80" />
        <PortoMarqueeRow direction="right" speed={46} className="absolute top-1/2 -translate-y-1/2 left-0 right-0 opacity-70" />
        <PortoMarqueeRow direction="left" speed={34} className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 opacity-80" />
      </div>

      {/* FLOATING SPARKLES & FLOWERS AROUND BACKGROUND */}
      <div className="absolute top-16 left-[8%] animate-float pointer-events-auto z-10 hidden md:block">
        <SparkleStar size={46} fill="#FFD166" />
      </div>
      <div className="absolute top-24 right-[10%] animate-float-delayed pointer-events-auto z-10 hidden md:block">
        <DaisyFlower size={56} />
      </div>
      <div className="absolute bottom-16 left-[6%] animate-float-delayed pointer-events-auto z-10 hidden md:block">
        <CuteStar size={40} fill="#70D6FF" />
      </div>
      <div className="absolute bottom-20 right-[8%] animate-float pointer-events-auto z-10 hidden md:block">
        <SparkleStar size={40} fill="#FF85A1" />
      </div>      {/* 3. HERO STACKED PAPER CONTAINER (ENLARGED & VERTICAL OPPOSITE HOVER) */}
      <div className="group relative max-w-6xl w-full my-auto z-20 mt-10 md:mt-12 px-2">

        {/* UNDERLYING PAPER: BLUE GRAPH GRID PAPER CARD (SHIFTS DOWNWARD ON HOVER) */}
        <div
          className="absolute inset-0 bg-grid-blue rounded-3xl shadow-xl transform -rotate-3 transition-transform duration-500 ease-out group-hover:translate-y-3 group-hover:-rotate-4.5 group-hover:scale-[1.01] border border-blue-200/60 pointer-events-none"
          style={{
            boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.09), 0 8px 20px -6px rgba(0, 0, 0, 0.04)"
          }}
        />

        {/* TOP MAIN PAPER: BEIGE BINDER NOTEBOOK CARD (SHIFTS UPWARD ON HOVER) */}
        <div className="relative bg-[#FAF4DD] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl transform rotate-1.5 transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-0.5 border border-amber-200/50">

          {/* Decorative Washi Tape on Paper Corners */}
          <WashiTape className="-top-3.5 left-14 absolute -rotate-12 z-30" />
          <WashiTape className="-bottom-3.5 right-16 absolute rotate-6 z-30" />

          {/* NOTEBOOK BINDER HOLES (LEFT MARGIN) */}
          <div className="absolute left-4 top-12 bottom-12 flex flex-col justify-between z-20 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E4E9ED] border border-black/10 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
              />
            ))}
          </div>

          {/* DECORATIVE FLOWERS, STARS, HEARTS & STAMPS ON PAPER */}
          <div className="absolute top-10 right-8 animate-spin-slow pointer-events-auto z-20">
            <DaisyFlower size={48} />
          </div>
          <div className="absolute -top-5 right-36 animate-float pointer-events-auto z-20">
            <SparkleStar size={38} fill="#FF85B3" />
          </div>
          <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 animate-float-delayed pointer-events-auto z-20 hidden sm:block">
            <CuteStar size={34} fill="#FFAA33" />
          </div>
          <div className="absolute bottom-8 left-20 animate-float pointer-events-auto z-20">
            <SparkleStar size={30} fill="#4CC9F0" />
          </div>

          {/* MAIN CONTENT GRID: PHOTO LEFT, TEXT & ACTIONS RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pl-6 sm:pl-12">

            {/* LEFT COLUMN: PROFILE PHOTO FRAME (STEP 1 IN GSAP TIMELINE) */}
            <div id="hero-photo-frame" className="md:col-span-5 flex justify-center relative group/photo cursor-pointer">

              {/* Cute Animated "Hai!" Speech Bubble Sticker on Hover (Lowered position) */}
              <div className="absolute top-2 right-0 sm:-top-2 sm:right-4 z-50 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-bottom-left opacity-0 scale-0 rotate-12 group-hover/photo:opacity-100 group-hover/photo:scale-110 group-hover/photo:-rotate-6 group-hover/photo:translate-y-0 pointer-events-none">
                <HaiSpeechBubble />
              </div>

              {/* Cute Flower & Heart decoration on photo frame */}
              <div className="absolute top-10 -left-1 z-30 animate-float-delayed pointer-events-auto">
                <DaisyFlower size={75} />
              </div>
              <div className="absolute -bottom-3 -right-3 z-30 animate-pulse-glow pointer-events-auto">
                <SparkleStar size={36} fill="#FFDD33" />
              </div>
              {/* Heart Doodle on Frame Bottom Left */}
              <HeartDoodle size={24} fill="#FF7096" className="absolute -bottom-2 left-6 z-30 animate-float pointer-events-auto" />

              {/* Bingkai Foto Hero SVG (Gingham Polaroid Frame, sedikit miring ke kiri -rotate-3) */}
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] transform -rotate-3 hover:scale-102 hover:-rotate-2 transition-transform duration-300 drop-shadow-md">
                {/* SVG Bingkai Polaroid dari /public */}
                <Image
                  src="/bingkai-hero.svg"
                  alt="Bingkai Foto Profil"
                  fill
                  priority
                  className="object-contain pointer-events-none select-none"
                  sizes="(max-width: 768px) 288px, 320px"
                />

                {/* Foto Profil Kotak Menyesuaikan Area Frame SVG */}
                <div className="absolute top-[10.625%] left-[14.167%] w-[71.667%] h-[68.75%] overflow-hidden rounded-[3px] bg-[#FAF4DD] shadow-inner">
                  <Image
                    src="/FotoProfil.png"
                    alt="Foto Profil Nada Haifa"
                    fill
                    priority
                    className="object-cover object-center scale-125 hover:scale-130 transition-transform duration-500"
                    sizes="(max-width: 768px) 260px, 300px"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TYPOGRAPHY, SHORT DESCRIPTION & ACTIONS */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left relative z-10">

              {/* STEP 2: Colorful Title with Galada Font & pure CSS Hi-Liter animation */}
              <div id="hero-title" className="text-4xl sm:text-6xl lg:text-7xl pt-2">
                <ColorfulTitle text={t.header.nama || "Nada Haifa Nurfadhilah"} />
              </div>

              {/* STEP 3: Description (Tagline deskripsi_1 & Bio deskripsi_2) with SplitText masked reveal */}
              <div id="hero-description" className="max-w-xl space-y-2">
                <p
                  id="hero-desc-1"
                  className="split text-[#4A3E37] text-base sm:text-lg font-semibold leading-snug tracking-wide text-left opacity-0"
                >
                  {t.header.deskripsi_1}
                </p>
                {t.header.deskripsi_2 && (
                  <p
                    id="hero-desc-2"
                    className="split text-[#5A4637] text-sm sm:text-base font-normal leading-relaxed opacity-90 text-justify opacity-0"
                  >
                    {t.header.deskripsi_2}
                  </p>
                )}
              </div>

              {/* STEP 4: ACTION BAR: ALL BUTTONS UNIFIED WITH FRAME SAGE GREEN (#D4DEC8) & DASHED OUTLINE (#BCCAB4) */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">

                {/* 1. CV Button */}
                <button
                  id="hero-cv-btn"
                  onClick={() => window.open("https://google.com", "_blank")}
                  className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-base sm:text-lg font-bold px-7 py-3 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-5px] outline-2 outline-dashed outline-[#BCCAB4] hover:outline-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
                >
                  {t.header.tombol_cv}
                </button>

                {/* 2. Social Media & Email Buttons (Clean Circular Icon Buttons) */}
                <div id="hero-social-icons" className="flex items-center gap-3.5">
                  {/* LinkedIn */}
                  <button
                    onClick={() => window.open('https://www.linkedin.com/in/nada-haifa-nurfadhilah-448759280', "_blank")}
                    title="LinkedIn"
                    className="p-3 bg-[#D4DEC8] hover:bg-[#0A66C2] text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-3px] outline-1 outline-dashed outline-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
                  >
                    <FaLinkedin className="text-xl sm:text-2xl" />
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={() => window.open('https://www.instagram.com/nadaanf/', "_blank")}
                    title="Instagram"
                    className="p-3 bg-[#D4DEC8] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-3px] outline-1 outline-dashed outline-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
                  >
                    <FaInstagram className="text-xl sm:text-2xl" />
                  </button>

                  {/* Email (Gmail direct link) */}
                  <button
                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nadahaifanurfadhilah@gmail.com', "_blank")}
                    title="Email (Gmail: nadahaifanurfadhilah@gmail.com)"
                    className="p-3 bg-[#D4DEC8] hover:bg-[#EA4335] text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] hover:border-[#EA4335] outline-offset-[-3px] outline-1 outline-dashed outline-[#BCCAB4] hover:outline-white/70 transition-all transform hover:scale-110 cursor-pointer"
                  >
                    <MdEmail className="text-xl sm:text-2xl" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}
