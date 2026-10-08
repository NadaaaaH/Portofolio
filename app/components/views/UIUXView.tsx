"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SparkleStar } from "../../stickers";

const UIUX_PROJECTS = [
  {
    id: 1,
    title: "Design Website Games For Kids Called Mentari",
    description: "Perancangan UI/UX game interaktif untuk anak-anak dengan pendekatan elemen visual bertema ramah anak, warna-warna lembut yang riang, serta pengujian kemudahan navigasi bagi usia dini.",
    tools: ["Figma", "Canva", "Adobe XD"],
    prototypeLink: "https://figma.com",
  },
  {
    id: 2,
    title: "Design Mobile App E-Commerce Aesthetic",
    description: "Perancangan pengalaman pengguna (UX) dan antarmuka (UI) aplikasi seluler belanja online bertema estetika minimalis dengan alur pemesanan produk yang sangat cepat dan intuitif.",
    tools: ["Figma", "Protopie", "Illustrator"],
    prototypeLink: "https://figma.com",
  },
];

export default function UIUXView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-20">
      <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] text-center">
        UI/UX Design
      </h3>

      {UIUX_PROJECTS.map((project) => (
        <div
          key={project.id}
          className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-10 border-2 border-dashed border-[#BCCAB4] shadow-xl space-y-6"
        >
          <h4 className="text-xl sm:text-2xl font-bold text-[#4A3E37]">
            {project.title}
          </h4>

          {/* 2 Mockup Cards Carousel */}
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <div className="bg-gray-200 rounded-2xl h-64 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2">🎨</span>
                <span className="font-bold text-[#5A4637] text-sm text-center">Desktop UI Wireframe & Prototype</span>
              </div>
              <div className="bg-gray-200 rounded-2xl h-64 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2">📱</span>
                <span className="font-bold text-[#5A4637] text-sm text-center">Mobile UI Screens Showcase</span>
              </div>
            </div>

            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>

          {/* Detailed Paragraph Text & Thumbnail */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-1/3 h-32 bg-gray-300 rounded-xl flex items-center justify-center text-[#5A4637] font-bold text-sm shadow-inner">
              Preview Thumbnail
            </div>
            <p className="w-full sm:w-2/3 text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom Tools & Prototype Button Row */}
          <div className="pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-[#4A3E37]">Tools:</span>
              <div className="flex gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4] shadow-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => window.open(project.prototypeLink, "_blank")}
              className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer"
            >
              Lihat Prototype
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
