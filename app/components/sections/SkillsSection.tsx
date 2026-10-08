"use client";

import { CuteStar } from "../../stickers";

const SKILLS_DATA = [
  { name: "HTML & CSS", level: "Advanced", icon: "🌐" },
  { name: "JavaScript / TypeScript", level: "Advanced", icon: "⚡" },
  { name: "React & Next.js", level: "Advanced", icon: "⚛️" },
  { name: "Tailwind CSS", level: "Advanced", icon: "🎨" },
  { name: "UI/UX Design", level: "Proficient", icon: "✏️" },
  { name: "Figma", level: "Master", icon: "🎯" },
  { name: "Node.js & Supabase", level: "Intermediate", icon: "🚀" },
  { name: "Copywriting & Content", level: "Proficient", icon: "📝" },
];

export default function SkillsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative z-20">
      <div className="text-center mb-8 relative">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] inline-block relative">
          Skill
          <div className="absolute -top-3 -left-7 animate-float">
            <CuteStar size={24} fill="#70D6FF" />
          </div>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {SKILLS_DATA.map((skill, i) => (
          <div
            key={i}
            className="bg-[#FAF4DD] rounded-xl p-4 sm:p-5 border-2 border-dashed border-[#BCCAB4] shadow-md flex items-center gap-3.5 transform transition-all duration-300 hover:scale-105 hover:bg-[#D4DEC8]/50 hover:shadow-lg cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl">{skill.icon}</span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#4A3E37]">
                {skill.name}
              </h4>
              <p className="text-xs text-[#6B5A4E] font-medium">{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
