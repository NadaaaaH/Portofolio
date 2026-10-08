"use client";

import { useLanguage } from "./context/Language";
import { useEffect, useRef } from "react";
import RansomTitle from "./components/ui/RansomTitle";

interface NavProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Nav({ activeTab = "All", setActiveTab }: NavProps) { 
  const { t } = useLanguage();  

  const tabs = [
    "Creative Works",
    "UI/UX Design",
    "All",
    "Fullstack Developer",
    "Writing",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    if (container && indicator && activeIndex !== -1) {
      const activeTabEl = container.children[activeIndex + 1] as HTMLElement;
      if (activeTabEl) {
        indicator.style.width = activeTabEl.offsetWidth + "px";
        indicator.style.left = activeTabEl.offsetLeft + "px";
      }
    }
  }, [activeTab]);

  return (
    <>
      {/* 25 Ransom-Note Typography Title (Animated 1-by-1 on scroll from header) */}
      <RansomTitle text={t.header.my_work || "Karyaku ..."} />
      <nav className="sticky top-4 z-40 my-8">
        <div className="w-full flex justify-center px-2">
          <div
            ref={containerRef}
            className="relative flex flex-wrap justify-center gap-1.5 sm:gap-3 px-3 sm:px-6 py-2.5 bg-[#D4DEC8]/95 backdrop-blur-md rounded-full text-[#5A4637] font-medium border-2 border-dashed border-[#BCCAB4] shadow-md outline-offset-[-5px] outline-2 outline-dashed outline-[#BCCAB4]"
          >
            {/* Sliding Indicator with Cream Paper Tone & Dashed Trim */}
            <div
              ref={indicatorRef}
              className="absolute top-1.5 bottom-1.5 bg-[#FAF4DD] rounded-full transition-all duration-300 ease-out border border-[#BCCAB4] shadow-xs pointer-events-none"
            ></div>

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab && setActiveTab(tab)}
                className={`relative z-10 px-3.5 sm:px-5 py-1.5 rounded-full transition-colors duration-200 font-bold text-xs sm:text-base cursor-pointer ${
                  activeTab === tab ? "text-[#2C3E35]" : "text-[#5A4637] hover:text-[#2C3E35]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}