"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CreativeWorksView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-20">
      
      {/* ========================================================================= */}
      {/* 1. DESIGN GRAPHIC */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] text-center">
          Design Graphic
        </h3>

        {/* Cover Novel */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <h4 className="text-lg font-bold text-[#4A3E37]">Cover Novel</h4>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Cover 1</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Cover 2</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Cover 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Promotion / Branding */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <h4 className="text-lg font-bold text-[#4A3E37]">Promotion/ Branding</h4>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Branding 1</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Branding 2</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Branding 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Thumbnail Youtube */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <h4 className="text-lg font-bold text-[#4A3E37]">Thumbnail Youtube</h4>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Thumbnail 1</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Thumbnail 2</div>
              <div className="bg-gray-300 rounded-2xl h-52 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Thumbnail 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="font-bold text-sm text-[#4A3E37]">Tools:</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Photoshop</span>
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Canva</span>
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Illustrator</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VIDEO & MOTION WORKS */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] text-center">
          Video & Motion Works
        </h3>

        {/* Youtube */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h4 className="text-lg font-bold text-[#4A3E37]">Youtube</h4>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Video 1</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Video 2</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Video 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Promotion */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h4 className="text-lg font-bold text-[#4A3E37]">Promotion</h4>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Promo Video 1</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Promo Video 2</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Promo Video 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Affiliate */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h4 className="text-lg font-bold text-[#4A3E37]">Affiliate</h4>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Reels 1</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Reels 2</div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">Reels 3</div>
            </div>
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="font-bold text-sm text-[#4A3E37]">Tools:</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Premiere Pro</span>
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">CapCut</span>
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">After Effects</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
