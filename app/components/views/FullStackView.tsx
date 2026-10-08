"use client";

import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const FULLSTACK_PROJECTS = [
  {
    id: 1,
    title: "Interactive Notebook Portfolio Website",
    description: "Platform web portofolio bertema notebookbinder interaktif yang dikembangkan menggunakan Next.js App Router, Tailwind CSS v4, GSAP Animations, dan Supabase backend. Dilengkapi fitur switcher multi-bahasa (ID/EN) dan animasi stiker interaktif.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Supabase"],
    demoLink: "https://google.com",
    githubLink: "https://github.com",
  },
  {
    id: 2,
    title: "E-Commerce Management & Analytics Dashboard",
    description: "Aplikasi manajemen inventaris dan analitik penjualan real-time dengan visualisasi grafik interaktif, otentikasi peran pengguna, dan ekspor laporan PDF/Excel secara otomatis.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Chart.js"],
    demoLink: "https://google.com",
    githubLink: "https://github.com",
  },
];

export default function FullStackView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-20">
      <h3 className="text-3xl sm:text-4xl font-bold text-[#5A4637] text-center">
        Fullstack Developer
      </h3>

      {FULLSTACK_PROJECTS.map((project) => (
        <div
          key={project.id}
          className="bg-[#FAF4DD] rounded-3xl p-6 sm:p-10 border-2 border-dashed border-[#BCCAB4] shadow-xl space-y-6"
        >
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#4A3E37]">
              {project.title}
            </h4>

            <div className="flex gap-2">
              <button
                onClick={() => window.open(project.githubLink, "_blank")}
                className="p-2.5 bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white rounded-full border border-[#BCCAB4] shadow-md transition-all cursor-pointer"
                title="GitHub Repo"
              >
                <FaGithub className="text-lg" />
              </button>
              <button
                onClick={() => window.open(project.demoLink, "_blank")}
                className="p-2.5 bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white rounded-full border border-[#BCCAB4] shadow-md transition-all cursor-pointer"
                title="Live Demo"
              >
                <FaExternalLinkAlt className="text-sm" />
              </button>
            </div>
          </div>

          {/* 2 Carousel Mockups */}
          <div className="relative flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronLeft />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <div className="bg-gray-200 rounded-2xl h-64 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2">💻</span>
                <span className="font-bold text-[#5A4637] text-sm text-center">Web Application Interface</span>
              </div>
              <div className="bg-gray-200 rounded-2xl h-64 border-2 border-dashed border-[#BCCAB4] shadow-md flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2">⚡</span>
                <span className="font-bold text-[#5A4637] text-sm text-center">Backend API & Database Flow</span>
              </div>
            </div>

            <button className="p-2.5 rounded-full bg-[#D4DEC8] text-[#2C3E35] border border-[#BCCAB4] shadow-md hover:scale-110 transition-transform cursor-pointer">
              <FaChevronRight />
            </button>
          </div>

          {/* Description & Tech Stack */}
          <p className="text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
            {project.description}
          </p>

          <div className="pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-[#4A3E37]">Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#D4DEC8] text-[#2C3E35] text-xs font-bold rounded-full border border-[#BCCAB4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => window.open(project.demoLink, "_blank")}
              className="bg-[#D4DEC8] hover:bg-[#2C3E35] text-[#2C3E35] hover:text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md border border-[#BCCAB4] outline-offset-[-4px] outline-2 outline-dashed outline-[#BCCAB4] transition-all cursor-pointer"
            >
              Lihat Project Live
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
