"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function WritingView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-20">
      <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] text-center">
        Writing
      </h3>

      {/* ========================================================================= */}
      {/* 1. FICTION WRITING */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <h4 className="text-2xl font-bold text-[#4A3E37] border-b-2 border-dashed border-[#BCCAB4] pb-2">
          Fiction Writing
        </h4>

        {/* Novel Item */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-lg font-bold text-[#4A3E37]">Novel</span>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-44 h-60 bg-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl shadow-md border border-amber-300">
              📖
            </div>
            <div className="space-y-3 text-left">
              <h5 className="text-xl font-bold text-[#4A3E37]">Moonlit Full</h5>
              <p className="text-sm text-[#6B5A4E] leading-relaxed">
                Sebuah novel fiksi naratif yang mengisahkan alur perjalanan karakter utama menemukan tempat terbaiknya di dunia. Penulisan berfokus pada emosi mendalam dan pembangunan suasana.
              </p>
              <p className="text-sm text-[#6B5A4E] leading-relaxed hidden sm:block">
                Naskah ini telah dibaca ribuan pembaca dan mendapatkan respon hangat berkat konflik emosional yang relatable serta pemilihan diksi yang puitis.
              </p>
              <a href="#" className="inline-block text-xs font-bold text-[#2C3E35] underline underline-offset-4 hover:text-black">
                Lihat Selengkapnya
              </a>
            </div>
          </div>
        </div>

        {/* Drama Script Item */}
        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-lg font-bold text-[#4A3E37]">Skrip Drama/film</span>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-44 h-60 bg-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl shadow-md border border-amber-300">
              🎬
            </div>
            <div className="space-y-3 text-left">
              <h5 className="text-xl font-bold text-[#4A3E37]">You Changed Me (Skrip Drama Youtube)</h5>
              <p className="text-sm text-[#6B5A4E] leading-relaxed">
                Naskah skenario serial web drama YouTube dengan dialog yang natural, ritme alur adegan yang dinamis, serta instruksi aksi kamera yang terstruktur rapi untuk tim produksi.
              </p>
              <a href="#" className="inline-block text-xs font-bold text-[#2C3E35] underline underline-offset-4 hover:text-black">
                Lihat Selengkapnya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. NON-FICTION WRITING */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <h4 className="text-2xl font-bold text-[#4A3E37] border-b-2 border-dashed border-[#BCCAB4] pb-2">
          Non-Fiction Writing
        </h4>

        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-lg font-bold text-[#4A3E37]">Karya Tulis Ilmiah</span>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-44 h-60 bg-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl shadow-md border border-amber-300">
              📄
            </div>
            <div className="space-y-3 text-left">
              <h5 className="text-xl font-bold text-[#4A3E37]">You Changed Me (Skrip Drama Youtube)</h5>
              <p className="text-sm text-[#6B5A4E] leading-relaxed">
                Penulisan makalah dan karya ilmiah berbasis metodologi penelitian empiris dengan tinjauan pustaka sistematis, analisis data presisi, serta penyusunan sitasi standar akademik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COPY WRITING - SOCIAL MEDIA */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <h4 className="text-2xl font-bold text-[#4A3E37] border-b-2 border-dashed border-[#BCCAB4] pb-2">
          Copy Writing - Social Media
        </h4>

        <div className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#BCCAB4] shadow-lg space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-lg font-bold text-[#4A3E37]">Promotion</span>
            <button className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#BCCAB4] outline-offset-[-3px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer">
              Lihat Lebih Jauh
            </button>
          </div>

          {/* 3 Card Carousel */}
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">
                Copy Ad 1
              </div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">
                Copy Ad 2
              </div>
              <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center font-bold text-[#5A4637] shadow-inner">
                Copy Ad 3
              </div>
            </div>

            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="font-bold text-sm text-[#4A3E37]">Tools:</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Notion</span>
              <span className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]">Google Docs</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
