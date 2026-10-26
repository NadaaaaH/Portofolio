"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — mounts an IntersectionObserver once for the whole page.
 * Adds `is-visible` to every `.scroll-reveal` element as it enters viewport.
 * Pure CSS transitions handle the actual animation (no GSAP needed).
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targets = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
