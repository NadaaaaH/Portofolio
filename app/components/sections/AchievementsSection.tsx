"use client";

import { SparkleStar, DaisyFlower } from "../../stickers";

const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "Juara 3 Lomba Startup Innovation Pendikar 2025",
    category: "Competition",
    year: "2025",
    color: "from-amber-100 to-amber-200",
  },
  {
    id: 2,
    title: "Juara 1 UI/UX Design Challenge",
    category: "Design Award",
    year: "2025",
    color: "from-rose-100 to-rose-200",
  },
  {
    id: 3,
    title: "Silver Button Youtube tahun 2025",
    category: "Creator Milestone",
    year: "2025",
    color: "from-emerald-100 to-emerald-200",
  },
];

export default function AchievementsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative z-20">
      <div className="text-center mb-8 relative">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] inline-block relative">
          Achievements
          <div className="absolute -top-4 -right-8 animate-bounce">
            <SparkleStar size={26} fill="#FFD166" />
          </div>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS_DATA.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#FAF4DD] rounded-2xl p-6 border-2 border-dashed border-[#BCCAB4] shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:rotate-1"
          >
            {/* Card Mockup Frame */}
            <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${item.color} border border-amber-200/60 flex items-center justify-center relative overflow-hidden mb-4 shadow-inner`}>
              {/* Decorative SVG pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5A4637_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <DaisyFlower size={48} />
              </div>
              <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 bg-white/80 rounded-full border border-amber-300 text-[#5A4637]">
                {item.year}
              </span>
            </div>

            {/* Achievement Title */}
            <h4 className="text-base sm:text-lg font-bold text-[#4A3E37] leading-snug group-hover:text-[#2C3E35] transition-colors">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
