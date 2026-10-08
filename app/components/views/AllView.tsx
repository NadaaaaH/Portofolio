"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SparkleStar, DaisyFlower } from "../../stickers";

interface AllViewProps {
  onSelectCategory: (tab: string) => void;
}

export default function AllView({ onSelectCategory }: AllViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-20">

      {/* ========================================================================= */}
      {/* 1. FULLSTACK DEVELOPER HIGHLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <h3 className="text-3xl font-bold text-[#5A4637] text-center">
          FullStack Developer
        </h3>

        {/* Carousel of 2 Top Project Mockup Cards */}
        <div className="relative flex items-center gap-3">
          <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <div className="bg-gray-200 rounded-2xl h-56 border-2 border-dashed border-[#BCCAB4] shadow-md flex items-center justify-center relative overflow-hidden group">
              <div className="text-center p-4">
                <span className="text-4xl mb-2 block">💻</span>
                <span className="font-bold text-[#5A4637]">Web App Dashboard Preview</span>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl h-56 border-2 border-dashed border-[#BCCAB4] shadow-md flex items-center justify-center relative overflow-hidden group">
              <div className="text-center p-4">
                <span className="text-4xl mb-2 block">🚀</span>
                <span className="font-bold text-[#5A4637]">FullStack E-Commerce Preview</span>
              </div>
            </div>
          </div>

          <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
            <FaChevronRight />
          </button>
        </div>

        {/* Featured Wide Project Showcase Card */}
        <div className="bg-[#FAF4DD] rounded-2xl p-6 border-2 border-dashed border-[#BCCAB4] shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-5/12 h-44 bg-gray-300 rounded-xl border border-amber-300 flex items-center justify-center shadow-inner">
            <span className="text-3xl">🌐</span>
          </div>
          <div className="w-full md:w-7/12 space-y-3 text-left">
            <h4 className="text-2xl font-bold text-[#4A3E37]">Website Portofolio</h4>
            <p className="text-sm text-[#6B5A4E] leading-relaxed">
              Platform portofolio interaktif berbasis Next.js dan Tailwind CSS dengan desain bertema notebookbinder yang ceria dan penuh animasi stiker interaktif.
            </p>
            <button
              onClick={() => onSelectCategory("Fullstack Developer")}
              className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer inline-block"
            >
              Lihat Lainnya...
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. UI/UX DESIGN HIGHLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <h3 className="text-3xl font-bold text-[#5A4637] text-center">
          UI/UX Design
        </h3>

        {/* Carousel of 2 Top Design Prototype Mockups */}
        <div className="relative flex items-center gap-3">
          <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <div className="bg-gray-200 rounded-2xl h-56 border-2 border-dashed border-[#BCCAB4] shadow-md flex items-center justify-center">
              <div className="text-center p-4">
                <span className="text-4xl mb-2 block">📱</span>
                <span className="font-bold text-[#5A4637]">Mobile App UI Prototype</span>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl h-56 border-2 border-dashed border-[#BCCAB4] shadow-md flex items-center justify-center">
              <div className="text-center p-4">
                <span className="text-4xl mb-2 block">🎨</span>
                <span className="font-bold text-[#5A4637]">Kids Game UI Mentari</span>
              </div>
            </div>
          </div>

          <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
            <FaChevronRight />
          </button>
        </div>

        {/* Featured Wide Project Showcase Card */}
        <div className="bg-[#FAF4DD] rounded-2xl p-6 border-2 border-dashed border-[#BCCAB4] shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-5/12 h-44 bg-gray-300 rounded-xl border border-amber-300 flex items-center justify-center shadow-inner">
            <span className="text-3xl">✨</span>
          </div>
          <div className="w-full md:w-7/12 space-y-3 text-left">
            <h4 className="text-2xl font-bold text-[#4A3E37]">Design Website Games For Kids</h4>
            <p className="text-sm text-[#6B5A4E] leading-relaxed">
              Desain antarmuka interaktif dan edukatif untuk anak-anak dengan warna-warna pastel yang menyenangkan dan alur navigasi yang ramah pengguna.
            </p>
            <button
              onClick={() => onSelectCategory("UI/UX Design")}
              className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer inline-block"
            >
              Lihat Lainnya...
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OTHER PROJECTS SECTION (CREATIVE WORKS & WRITING GRID) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <h3 className="text-3xl font-bold text-[#5A4637] text-center">
          Other Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Creative Works Column */}
          <div className="bg-[#FAF4DD]/80 rounded-2xl p-6 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-[#4A3E37] text-center mb-4">Creative Works</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-400 rounded-xl h-36 flex items-center justify-center text-white font-bold text-sm shadow-inner">Design Graphic 1</div>
                <div className="bg-gray-400 rounded-xl h-36 flex items-center justify-center text-white font-bold text-sm shadow-inner">Design Graphic 2</div>
                <div className="bg-gray-400 rounded-xl h-36 flex items-center justify-center text-white font-bold text-sm shadow-inner">Motion Video 1</div>
                <div className="bg-gray-400 rounded-xl h-36 flex items-center justify-center text-white font-bold text-sm shadow-inner">Motion Video 2</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => onSelectCategory("Creative Works")}
                className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer"
              >
                Lihat Lainnya...
              </button>
            </div>
          </div>

          {/* RIGHT: Writing Column */}
          <div className="bg-[#FAF4DD]/80 rounded-2xl p-6 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-[#4A3E37] text-center mb-4">Writing</h4>
              <div className="space-y-4">
                <div className="bg-gray-300 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-16 h-20 bg-gray-400 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">📖</div>
                  <div>
                    <h5 className="font-bold text-[#4A3E37] text-sm">Novel - Moonlit Full</h5>
                    <p className="text-xs text-[#6B5A4E] line-clamp-2 mt-1">Kisah fiksi romantis tentang pencarian jati diri di bawah sinar bulan purnama.</p>
                  </div>
                </div>
                <div className="bg-gray-300 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-16 h-20 bg-gray-400 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">🎬</div>
                  <div>
                    <h5 className="font-bold text-[#4A3E37] text-sm">Skrip Drama / Film</h5>
                    <p className="text-xs text-[#6B5A4E] line-clamp-2 mt-1">Naskah skenario drama berdurasi pendek untuk produksi konten video YouTube.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => onSelectCategory("Writing")}
                className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer"
              >
                Lihat Lainnya...
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
