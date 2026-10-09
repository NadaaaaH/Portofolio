# Scrapbook Portfolio Redesign

Kamu adalah senior front-end engineer + UI designer. Redesign TAMPILAN portofolio Next.js (App Router) + Tailwind saya (repo: github.com/NadaaaaH/Portofolio, live: portofolio-psi-amber.vercel.app). JANGAN ubah alur halaman, urutan section, isi teks, dan fitur yang sudah ada (toggle bahasa ID/EN, filter kategori, tombol Lihat CV). Yang diganti: gaya visual, bentuk card, palet warna, tipografi header, dan komponen tampilan project.

## 1. Konsep
Pengunjung harus merasa MASUK ke dalam sebuah scrapbook/diary. Seluruh halaman adalah halaman buku: kertas bertekstur, elemen tempelan (foto polaroid, sticky note, tiket, tape, pin, stiker, stempel pos, klip, kancing, pita), sedikit rotasi acak, dan bayangan lembut seperti benda yang ditempel di kertas. Playful, hangat, rapi, bukan berantakan.

## 2. Palet warna (pakai sebagai CSS variables / Tailwind theme)
- Primary Pistachio: #B9C255
- Frost: #E6F1FA
- Faded Denim: #5798D7
- Netral tambahan (kamu tentukan, selaras dengan palet): krem kertas hangat (~#FBF7EC) untuk halaman, tinta gelap kebiruan (~#1F2A37) untuk teks, dan satu aksen hangat kecil (pink/peach lembut) hanya untuk detail kecil seperti bintang, pita, stempel.
- Pembagian: background halaman = krem + Frost; elemen utama/aksen = Pistachio; judul, link, border, dan elemen interaktif = Denim. Pastikan kontras teks terhadap background memenuhi WCAG AA.

## 3. Tipografi
- Header utama (nama "Nada Haifa Nurfadhilah" dan judul section seperti "Karyaku...", My Work) memakai gaya RANSOM NOTE: tiap huruf/kata berada di kotak berwarna sendiri (warna dari palet), ukuran, rotasi (-4° s/d 4°), dan jenis huruf sedikit berbeda, ada tekstur halftone/grain halus seperti kertas potongan majalah.
- Implementasi: buat komponen reusable `<RansomText text="..." />` yang memecah teks per huruf, memberi warna kotak, rotasi, dan variasi font secara deterministik (seeded, bukan Math.random saat render, supaya tidak hydration mismatch). Opsi A: pakai font "The Ransom Notes" via next/font/local jika file font tersedia di /public/fonts. Opsi B (default jika tidak ada file): campur 3–4 font Google (serif tebal, serif display, slab, rounded) lewat next/font/google.
- Teks isi: satu font sans/serif humanis yang mudah dibaca. Aksen tulisan tangan (script) hanya untuk label kecil dan anotasi. Ransom style HANYA untuk judul, bukan paragraf.

## 4. Pola card (ganti semua card yang ada)
Buat satu set komponen card bertema diary, dipilih sesuai jenis konten:
- Project card = polaroid / foto dengan tape/pin, sedikit miring, hover: lurus + naik + bayangan membesar.
- Writing = lembar notes bergaris/kotak-kotak dengan tepi bergerigi (scalloped) atau sticky note.
- Achievements = tiket/label bertepi lengkung, dengan tahun sebagai stempel.
- Skill = stiker atau sticky note kecil, level ditandai bintang/pita.
- Sertifikat = kartu pos dengan perangko dan cap pos (nama penerbit di bagian perangko/cap).
- Creative Works (desain & motion) = photo strip atau grid foto yang ditempel di papan.
Tambahkan komponen dekorasi reusable: `<Tape/>`, `<Pin/>`, `<Sticker/>`, `<TornPaperEdge/>`, `<Stamp/>`. Antar-section dipisah dengan tepi kertas sobek (torn edge), bukan garis lurus. Dekorasi bersifat aria-hidden dan tidak menghalangi klik.

## 5. Layout per section (urutan sama seperti sekarang)
1. Navbar: seperti label/tab buku (bookmark), berisi nama, Lihat CV, toggle ID/EN.
2. Hero: pita marquee "PORTOFOLIO •" dibuat seperti washi tape/pita yang melintang. Nama dengan RansomText, foto profil di frame polaroid, tagline & deskripsi di sticky note/halaman kertas.
3. Karyaku: judul RansomText, filter (All, Fullstack, UI/UX, Creative Works, Writing) berbentuk tab/index divider buku; grid project card sesuai Bagian 4 + Bagian 6.
4. Achievements, Skill, Sertifikat: gunakan pola card Bagian 4.
5. Footer: halaman belakang buku, tulisan tangan, tepi sobek di atas.

## 6. Project showcase interaktif (fitur utama)
Di bagian foto ber-frame, isi frame TIDAK hanya gambar statis. Buat komponen `<ProjectFrame />` yang menerima props:
{ type: "website" | "video" | "image", src, title, role, description, stack[], links }
- type "website": render `<iframe>` website project tersebut di dalam frame polaroid/laptop/ponsel bertema diary; bisa di-scroll dan dicoba langsung. Gunakan lazy loading (muat setelah masuk viewport), skeleton saat loading, tombol "Buka di tab baru", dan fallback gambar jika iframe diblokir (X-Frame-Options).
- type "video": `<video>` dengan poster, controls, muted+playsInline, tidak autoplay bersuara; atau embed YouTube jika src berupa link YouTube.
- type "image": gambar dengan next/image.
- Di samping/bawah frame: penjelasan project dan ROLE saya (mis. "Fullstack Developer", "UI/UX Designer") ditampilkan sebagai tag/sticker, plus stack dan link (demo, repo).
- Klik card membuka modal "buka halaman diary": frame diperbesar, ada penjelasan lengkap, tombol tutup (ESC juga bisa), focus trap, dan scroll lock pada body.
- Data semua project dipusatkan di satu file (mis. `app/data/projects.ts`) agar mudah saya edit.

## 7. Animasi
Halus dan ringan: elemen "ditempel" masuk dengan scale/rotate kecil saat scroll masuk viewport, hover pada card, parallax tipis pada dekorasi. Gunakan Framer Motion atau CSS. Hormati `prefers-reduced-motion` (matikan animasi non-esensial).

## 8. Aturan teknis
- Pertahankan Next.js App Router + Tailwind. Pecah menjadi komponen di `app/components/`. Jangan tambah dependency selain framer-motion (jika perlu).
- Responsif mobile-first (cek 375px, 768px, 1280px). Di mobile, rotasi dikurangi dan card jadi satu kolom; iframe tetap bisa di-scroll.
- Semua tekstur/dekorasi pakai SVG atau CSS (tanpa gambar berat). Gambar pakai next/image. Target Lighthouse Performance ≥ 85.
- Aksesibel: alt text, urutan fokus keyboard logis, elemen dekorasi aria-hidden.
- Pertahankan teks dan data yang ada; hanya ganti teks jika perlu untuk label baru dan beri tahu saya.

## 9. Referensi visual (4 gambar terlampir)
- Gambar 1: papan pink dengan kartu pos dan foto yang di-pin, bintang, perangko, tape bertulisan tangan.
- Gambar 2: website scrapbook, sticky note bertepi scalloped di atas grid board, polaroid, clipboard, pita, torn paper edge, tekstur kertas.
- Gambar 3: photo strip, tiket, segel lilin, kancing, klip, pita gingham, tekstur kertas.
- Gambar 4: font ransom note dengan kotak warna-warni dan tekstur halftone (untuk header).
Ambil VIBE dan jenis elemennya, bukan meniru persis. Warna tetap memakai palet di Bagian 2, bukan warna pink/hijau dari referensi.

## 10. Cara kerja
1. Sebelum menulis kode, rangkum rencana komponen dan file yang akan diubah (singkat).
2. Kerjakan bertahap: (a) theme + tipografi + RansomText, (b) komponen dekorasi, (c) card per section, (d) ProjectFrame + modal, (e) animasi + responsif.
3. Setelah tiap tahap pastikan build tidak error. Di akhir, daftar apa yang diubah dan apa yang perlu saya sediakan (font, gambar project, URL demo, video).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e6a6e6b1-e1f2-4675-b8f8-bf2fa215d293).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
