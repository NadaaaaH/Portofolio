"use client";

import { WashiTape } from "../../stickers";

export default function BinderHolesTop() {
  return (
    <div className="w-full pt-8 sm:pt-10 pb-6 sm:pb-8 relative z-30 pointer-events-none select-none">
      {/* Decorative Washi Tape on top left & right edges for authentic scrapbook feel */}
      <div className="w-full px-6 sm:px-14 relative flex justify-between pointer-events-none">
        <WashiTape className="-top-4 left-4 sm:left-12 absolute -rotate-6 z-20 opacity-85" />
        <WashiTape className="-top-4 right-4 sm:right-12 absolute rotate-6 z-20 opacity-85" />
      </div>

      {/* Row of Loose-Leaf Notebook Binder Holes: FULL WIDTH edge-to-edge, pure punched holes */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-4 overflow-hidden select-none -mx-2 px-2">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-transparent border border-black/20 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.15)] ring-1 ring-white/60"
          />
        ))}
      </div>

      {/* Perforated / Dashed Tear-Off Guide Line: FULL WIDTH */}
      <div className="w-full px-3 sm:px-8 mt-5 sm:mt-6">
        <div className="w-full border-b-2 border-dashed border-blue-200/70" />
      </div>
    </div>
  );
}
