"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SparkleStar, DaisyFlower } from "../../stickers";

export default function FooterSection() {
  return (
    <footer className="mt-16 bg-[#FAF4DD] border-t-2 border-dashed border-[#BCCAB4] py-12 relative overflow-hidden z-20">
      {/* Decorative Accents */}
      <div className="absolute top-4 left-8 animate-float pointer-events-none opacity-40">
        <DaisyFlower size={50} />
      </div>
      <div className="absolute bottom-4 right-10 animate-float-delayed pointer-events-none opacity-50">
        <SparkleStar size={42} fill="#FFD166" />
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h4 className="text-2xl font-bold text-[#4A3E37]">
            Nada Haifa Nurfadhilah ✨
          </h4>
          <p className="text-sm text-[#6B5A4E] mt-1 font-medium">
            Creative Portfolio & Project Showcase • Designed with Love & Notebook Aesthetic
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open('https://www.linkedin.com/in/nada-haifa-nurfadhilah-448759280', "_blank")}
            className="p-3 bg-[#D4DEC8] hover:bg-[#0A66C2] text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
            title="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </button>

          <button
            onClick={() => window.open('https://www.instagram.com/nadaanf/', "_blank")}
            className="p-3 bg-[#D4DEC8] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] transition-all transform hover:scale-110 cursor-pointer"
            title="Instagram"
          >
            <FaInstagram className="text-xl" />
          </button>

          <button
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nadahaifanurfadhilah@gmail.com', "_blank")}
            className="p-3 bg-[#D4DEC8] hover:bg-[#EA4335] text-[#2C3E35] hover:text-white rounded-full shadow-md border border-[#BCCAB4] hover:border-[#EA4335] transition-all transform hover:scale-110 cursor-pointer"
            title="Email (Gmail)"
          >
            <MdEmail className="text-xl" />
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-[#8A7566] mt-8 pt-4 border-t border-amber-200/60 font-medium">
        © 2025 Nada Haifa Nurfadhilah. All rights reserved.
      </div>
    </footer>
  );
}
