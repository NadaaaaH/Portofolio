"use client";

import { useState } from "react";
import { SparkleStar, HeartDoodle } from "../../stickers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: "Sertifikat Competency FullStack Web Developer",
    issuer: "Kemendikbudristek",
    year: "2025",
    color: "from-blue-100 to-indigo-100",
  },
  {
    id: 2,
    title: "UI/UX Specialization Certificate",
    issuer: "Google Coursera",
    year: "2024",
    color: "from-rose-100 to-pink-100",
  },
  {
    id: 3,
    title: "Motion Graphics & Digital Writing Masterclass",
    issuer: "Adobe Academy",
    year: "2024",
    color: "from-emerald-100 to-teal-100",
  },
  {
    id: 4,
    title: "Frontend Engineering Excellence Certification",
    issuer: "Meta Frontend Cert",
    year: "2025",
    color: "from-amber-100 to-yellow-100",
  },
];

export default function CertificatesSection() {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? CERTIFICATES_DATA.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= CERTIFICATES_DATA.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative z-20">
      <div className="text-center mb-8 relative">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] inline-block relative">
          Sertifikat
          <div className="absolute -top-3 -right-6 animate-pulse-glow">
            <HeartDoodle size={22} fill="#FF7096" />
          </div>
        </h3>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center gap-2 sm:gap-4">
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer z-30"
          title="Previous"
        >
          <FaChevronLeft className="text-lg sm:text-xl" />
        </button>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">
          {CERTIFICATES_DATA.slice(startIndex, startIndex + 3).map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF4DD] rounded-2xl p-5 border-2 border-dashed border-[#BCCAB4] shadow-md transform transition-all duration-300 hover:scale-103 hover:shadow-xl"
            >
              <div className={`w-full h-40 rounded-xl bg-gradient-to-tr ${item.color} border border-amber-200/60 flex flex-col justify-center items-center p-4 relative mb-3 shadow-inner`}>
                <SparkleStar size={36} fill="#FFD166" className="mb-2" />
                <span className="text-xs font-bold text-[#5A4637] bg-white/90 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                  {item.issuer}
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[#4A3E37] text-center leading-snug">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer z-30"
          title="Next"
        >
          <FaChevronRight className="text-lg sm:text-xl" />
        </button>
      </div>
    </section>
  );
}
