# Redesign portofolio scrapbook

## Hasil
Mempertahankan teks, data, urutan bagian, toggle ID/EN, filter kategori, dan tombol **Lihat CV** dari portofolio asli. Mengganti tampilan menjadi halaman diary dengan palet Pistachio, Frost, Denim, kertas hangat, dan detail peach kecil.

## Batasan proyek ini
Workspace Lovable ini memakai **TanStack Start + Tailwind**, bukan repository Next.js kamu, dan framework-nya tidak dapat diganti. Redesign akan dibuat sebagai adaptasi yang berjalan di preview ini; repository GitHub dan situs Vercel asli **tidak diubah**. `next/font` dan `next/image` diganti pemuatan font serta gambar yang sesuai framework ini, tanpa dependency tambahan.

## Tahapan
1. **Theme & tipografi** — token warna, tekstur kertas, font humanis dan ransom-note heading deterministik.
2. **Dekorasi** — Tape, Pin, Sticker, TornPaperEdge, Stamp, dengan aksesibilitas dan rotasi ringan.
3. **Section & card** — navbar bookmark, pita portfolio, foto polaroid; project, writing, achievement, skill, certificate dan footer sesuai isi asli.
4. **ProjectFrame & modal** — data project terpusat; website/video/gambar, pemuatan saat terlihat, fallback, link tab baru, role dan stack; modal dengan Escape, fokus terkunci dan scroll lock. Pemblokiran iframe lintas domain tidak selalu bisa dideteksi browser; tombol melihat screenshot tetap tersedia.
5. **Animasi & pemeriksaan** — animasi CSS ringan, reduced motion; uji toggle, filter, modal, CV dan tampilan 375/768/1280px. Periksa error tiap tahap; target Lighthouse ≥85 belum dianggap tercapai tanpa pengukuran.

## Komponen & file
- `src/styles.css`: semua token, tekstur, bentuk card, tipografi, dan animasi.
- `src/components/diary/`: RansomText, dekorasi, card, ProjectFrame dan modal.
- `src/data/portfolio.ts`: teks dan data asli dalam ID/EN, project dan link.
- `src/routes/index.tsx`: halaman lengkap dengan urutan asli.
- `src/routes/__root.tsx`: pemuatan font dan metadata.
- `src/assets/`: pointer foto, screenshot dan CV yang disalin dari sumber asli.
- `src/test/`: pengujian aturan interaksi; `AGENTS.md`: aturan struktur.

## Konten yang perlu disediakan
Gunakan foto, screenshot, CV dan URL yang sudah tersedia di repo terlebih dahulu. Di akhir, sebutkan hanya asset atau URL yang benar-benar belum tersedia; tidak mengganti teks atau mengarang project.