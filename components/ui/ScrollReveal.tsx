"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — mounts an IntersectionObserver once for the whole page.
 * Adds `is-visible` to every `.scroll-reveal` element as it enters viewport.
 * Pure CSS transitions handle the actual animation (no GSAP needed).
 *
 * Elemen `.scroll-reveal` yang baru dirender SETELAH mount (misal project card
 * saat tab filter "Karyaku" diganti) ikut didaftarkan lewat MutationObserver,
 * sehingga tidak tertahan di state awal (opacity: 0).
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveal = (el: Element) => el.classList.add("is-visible");

    // Fallback: browser tanpa IntersectionObserver → langsung tampilkan semua
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".scroll-reveal").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    const observeWithin = (root: ParentNode) => {
      if (root instanceof Element && root.matches(".scroll-reveal:not(.is-visible)")) {
        observer.observe(root);
      }
      root
        .querySelectorAll?.(".scroll-reveal:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };

    observeWithin(document);

    // Daftarkan elemen `.scroll-reveal` yang ditambahkan belakangan (re-render filter, dsb.)
    // Batasi scope ke main/body langsung — hindari subtree lebar di seluruh document
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) observeWithin(node);
        });
      });
    });
    const observeRoot = document.querySelector('main') ?? document.body;
    mutationObserver.observe(observeRoot, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
