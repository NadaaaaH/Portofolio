"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { id } from "../data/kamusheaderid.js"; // Pastikan path benar
import { en } from "../data/kamusheaderen.js"; // Pastikan path benar

// 1. Bikin Wadah Data
const LanguageContext = createContext<any>(null);

// 2. Bikin Provider (Penyedia Data)
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [bahasa, setBahasa] = useState("id");

  // Biar kalau di-refresh gak reset, kita simpan di LocalStorage browser
  useEffect(() => {
    const simpanan = localStorage.getItem("bahasa");
    if (simpanan) setBahasa(simpanan);
  }, []);

  const gantiBahasa = (bhs: string) => {
    setBahasa(bhs);
    localStorage.setItem("bahasa", bhs); // Simpan ke browser
  };

  // Tentukan kamus mana yang dipakai
  const t = bahasa === "id" ? id : en;

  // 3. Bagikan data ini ke semua anak-anaknya
  return (
    <LanguageContext.Provider value={{ bahasa, setBahasa: gantiBahasa, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Hook biar gampang dipanggil di mana aja
export function useLanguage() {
  return useContext(LanguageContext);
}