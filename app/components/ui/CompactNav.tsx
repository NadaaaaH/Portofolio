"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../context/Language";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SparkleStar, WashiTape, Paperclip } from "../../stickers";

export default function CompactNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muncul saat user mulai scroll menutup hero header (~300px)
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Sticky Memo Navigation"
      className="fixed top-3.5 sm:top-5 left-3 sm:left-6 md:left-10 z-40 pointer-events-none flex flex-wrap items-center gap-2.5 sm:gap-3.5"
    >
      {/* ========================================================================= */}
      {/* TEMPELAN 1: NAMAKU (Post-it Memo dengan Washi Tape & Galada Font)       */}
      {/* ========================================================================= */}
      <div
        className={`pointer-events-auto relative bg-[#FAF4DD] rounded-2xl px-3.5 sm:px-5 py-2 sm:py-2.5 border-2 border-dashed border-[#BCCAB4] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] outline-offset-[-3px] outline-1 outline-dashed outline-[#BCCAB4]/60 transition-all duration-500 ease-out transform ${
          scrolled
            ? "opacity-100 translate-y-0 scale-100 -rotate-1.5 hover:rotate-0"
            : "opacity-0 -translate-y-12 scale-90 -rotate-6 pointer-events-none"
        }`}
      >
        {/* Selotip Washi Tape Penempel di atas memo nama */}
        <WashiTape className="-top-3 left-4 sm:left-6 absolute -rotate-3 scale-65 origin-center pointer-events-none z-30 opacity-90" />

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 sm:gap-2 group text-left cursor-pointer select-none"
          title="Kembali ke atas"
        >
          <span className="font-galada text-lg sm:text-2xl text-[#5A4637] group-hover:text-[#2C3E35] transition-colors leading-none pt-0.5">
            {t.header.nama || "Nada Haifa Nurfadhilah"}
          </span>
          <span className="hidden sm:inline-block animate-float">
            <SparkleStar size={18} fill="#FFD166" />
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TEMPELAN 2: TOMBOL CV & SOSMED (Post-it Memo Terpisah dengan Klip Kertas)  */}
      {/* ========================================================================= */}
      <div
        className={`pointer-events-auto relative bg-[#FAF4DD] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-dashed border-[#BCCAB4] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] outline-offset-[-3px] outline-1 outline-dashed outline-[#BCCAB4]/60 transition-all duration-500 delay-100 ease-out transform flex items-center gap-2 sm:gap-3 ${
          scrolled
            ? "opacity-100 translate-y-0 scale-100 rotate-1 hover:rotate-0"
            : "opacity-0 -translate-y-12 scale-90 rotate-6 pointer-events-none"
        }`}
      >
        {/* Klip Kertas Emas di sudut tempelan aksi */}
        <div className="-top-3.5 right-3 absolute -rotate-12 pointer-events-none z-30 hidden xs:block">
          <Paperclip size={22} color="#D4AF37" />
        </div>

        {/* Tombol Lihat CV */}
        <button
          onClick={() => window.open("https://google.com", "_blank")}
          className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-xs border border-[#BCCAB4] outline-offset-[-2px] outline-1 outline-dashed outline-[#BCCAB4] hover:outline-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          {t.header.tombol_cv || "Lihat CV"}
        </button>

        {/* Garis Jahitan Pemisah */}
        <div className="w-[1px] h-5 border-r border-dashed border-[#BCCAB4]" />

        {/* Tombol Sosmed: LinkedIn, Instagram, Email */}
        <div className="flex items-center gap-1.5">
          {/* LinkedIn */}
          <button
            onClick={() => window.open("https://www.linkedin.com/in/nada-haifa-nurfadhilah-448759280", "_blank")}
            title="LinkedIn"
            className="p-1.5 sm:p-2 bg-[#D4DEC8] hover:bg-[#0A66C2] text-[#2C3E35] hover:text-white rounded-full shadow-xs border border-[#BCCAB4] outline-offset-[-2px] outline-1 outline-dashed outline-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
          >
            <FaLinkedin className="text-xs sm:text-sm" />
          </button>

          {/* Instagram */}
          <button
            onClick={() => window.open("https://www.instagram.com/nadaanf/", "_blank")}
            title="Instagram"
            className="p-1.5 sm:p-2 bg-[#D4DEC8] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-[#2C3E35] hover:text-white rounded-full shadow-xs border border-[#BCCAB4] outline-offset-[-2px] outline-1 outline-dashed outline-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
          >
            <FaInstagram className="text-xs sm:text-sm" />
          </button>

          {/* Email (Gmail direct link) */}
          <button
            onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nadahaifanurfadhilah@gmail.com", "_blank")}
            title="Email (Gmail)"
            className="p-1.5 sm:p-2 bg-[#D4DEC8] hover:bg-[#EA4335] text-[#2C3E35] hover:text-white rounded-full shadow-xs border border-[#BCCAB4] hover:border-[#EA4335] outline-offset-[-2px] outline-1 outline-dashed outline-[#BCCAB4] hover:outline-white/70 transition-all transform hover:scale-110 cursor-pointer"
          >
            <MdEmail className="text-xs sm:text-sm" />
          </button>
        </div>
      </div>
    </aside>
  );
}
