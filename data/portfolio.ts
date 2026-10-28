export type Language = 'id' | 'en';
export type Category = 'All' | 'Web Development' | 'UI/UX Design' | 'Creative Works';

export type MultilingualText = { id: string; en: string } | string;

export function getTranslation(
  text: MultilingualText | undefined | null,
  lang: Language = 'id'
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.id || text.en || '';
}

export interface ProjectMedia {
  type: 'image' | 'video';
  publicId?: string; // ID media di Cloudinary
  src?: string; // Alternatif URL langsung atau publicId
  posterPublicId?: string;
  /**
   * Mode pemutaran video:
   * - `autoplay: true`: Otomatis berputar (loop, muted, playsInline, tanpa kontrol & tanpa ikon play).
   *   Hemat performa: otomatis play saat terlihat di viewport (IntersectionObserver) dan pause saat keluar layar.
   * - `autoplay: false` (atau tidak diisi / default): Mode manual — menampilkan thumbnail/poster + ikon play modern,
   *   video diputar setelah diklik.
   */
  autoplay?: boolean;
  /** Keterangan singkat (1-2 kalimat) yang tampil di samping foto galeri */
  caption?: { id: string; en: string } | string;
}

export type MediaItem = ProjectMedia;

export interface ProjectPreview {
  type: 'image' | 'video';
  publicId: string;
  posterPublicId?: string;
  autoplay?: boolean;
}

export interface Project {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  stack: string[];
  architecture?: string[]; // Opsional: baris "Arsitektur" di modal hanya tampil jika diisi
  category: Exclude<Category, 'All'>;
  role: MultilingualText | string[];
  /** Urutan prioritas tampilan (angka kecil = tampil lebih dulu; kosong/undefined = ditaruh setelah yang punya order, mengikuti urutan data asli) */
  order?: number;
  preview?: ProjectPreview;
  links: { demo?: string; repo?: string };
  imagePublicId?: string; // Menyimpan publicId gambar utama (opsional fallback)
  group?: string;
  label?: string;
  previewLabels: string[];
  media?: MediaItem[];
}

/** Batas maksimal card per kategori yang ditampilkan di tab "All" */
export const ALL_TAB_LIMIT: Partial<Record<Category, number>> = {
  'Web Development': 4,
  'UI/UX Design': 2,
  'Creative Works': 2,
};

export const DEFAULT_ALL_TAB_LIMIT = 2;

/**
 * Mengurutkan array project berdasarkan field `order` secara menaik (angka kecil lebih dulu).
 * Project tanpa `order` (undefined) diletakkan di belakang dengan mempertahankan urutan data asli (stable sort).
 * Menghasilkan salinan array baru tanpa memutasi array asli.
 */
export function sortProjects(items: Project[]): Project[] {
  return [...items].sort((a, b) => {
    const hasA = typeof a.order === 'number';
    const hasB = typeof b.order === 'number';

    if (hasA && hasB) {
      return (a.order as number) - (b.order as number);
    }
    if (hasA && !hasB) return -1;
    if (!hasA && hasB) return 1;
    return 0;
  });
}

// Toggle untuk menyembunyikan 'Creative Works' sementara selama dikembangkan di branch lain
export const SHOW_CREATIVE_WORKS = false;

export const categories: Category[] = SHOW_CREATIVE_WORKS
  ? ['All', 'Web Development', 'UI/UX Design', 'Creative Works']
  : ['All', 'Web Development', 'UI/UX Design'];
export const cvUrl = 'https://google.com';
export const copy = {
  foto: 'IMG_2219',
  id: {
    portfolio: 'PORTOFOLIO',
    name: 'Nada Haifa Nurfadhilah',
    tagline: 'Aspiring Full-Stack Developer | Software Engineering Student',
    bio: 'Suka membuat website, dari tampilan sampai sistem di belakangnya, termasuk fitur berbasis AI. Saya senang mencoba teknologi baru dan terus belajar lewat proyek kuliah, lomba, dan komunitas. Saat ini saya mencari kesempatan magang di bidang web development.',
    cv: 'Lihat CV',
    work: 'Karyaku ...',
    open: 'Buka halaman diary',
    close: 'Tutup',
    newTab: 'Buka di tab baru',
    screenshot: 'Lihat screenshot',
    live: 'Coba website',
    missing: 'Pratinjau belum tersedia',
    more: 'Lihat Lainnya...',
    role: 'Role',
    techStack: 'Tech Stack',
    architecture: 'Arsitektur',
    hello: 'Hai, aku Nada!',
    annotation: 'sedikit logika, banyak kreativitas \u2661',
    collection: 'a little collection of my work',
    loading: 'Memuat pratinjau',
  },
  en: {
    portfolio: 'PORTFOLIO',
    name: 'Nada Haifa Nurfadhilah',
    tagline: 'Aspiring Full-Stack Developer | Software Engineering Student',
    bio: 'Enjoys building digital solutions, from interfaces that are comfortable to use to the systems behind them, including AI-powered features. Likes trying new technologies and keep learning through course projects, competitions, and community work. Currently looking for an internship in software development.',
    cv: 'View CV',
    work: 'My Work ...',
    open: 'Open diary page',
    close: 'Close',
    newTab: 'Open in new tab',
    screenshot: 'View screenshot',
    live: 'Try website',
    missing: 'Preview not available yet',
    more: 'Lihat Lainnya...',
    role: 'Role',
    techStack: 'Tech Stack',
    architecture: 'Architecture',
    hello: "Hi, I'm Nada!",
    annotation: 'a little logic, a lot of creativity \u2661',
    collection: 'a little collection of my work',
    loading: 'Loading preview',
  },
};
const originalProjects: Project[] = [
  {
    id: 'fullstack-1',
    title: {
      id: 'Tumbuh Berbagi: Platform Pembelajaran & Simulasi UTBK',
      en: 'Tumbuh Berbagi: Learning Platform & UTBK Simulation',
    },
    description: {
      id: 'Proyek akademik ini dikembangkan bersama mitra nyata, Tumbuh Berbagi, untuk mendukung efisiensi operasional pelaksanaan bimbingan dan persiapan ujian UTBK. Platform pembelajaran berbasis web ini menggabungkan landing page organisasi dengan sistem Tryout (TO) interaktif secara real-time, modul latihan soal mandiri, serta integrasi metode penilaian Item Response Theory (IRT). Selain itu, platform ini dilengkapi fitur manajemen konten untuk mempublikasikan berita, bank soal, dan jadwal ujian secara terstruktur.\n\nDalam proyek ini, aku merancang arsitektur sistem secara mandiri serta menguji dan membangun seluruh lini frontend dan backend menggunakan React dan Laravel/PHP. Aku mengimplementasikan otentikasi berbasis peran (role-based auth), verifikasi email otomatis via Brevo, integrasi metode IRT pada ujian simulasi terjadwal, dan perancangan skema database PostgreSQL pada NeonDB. Aku juga membangun dashboard admin untuk pengelolaan bank soal, analitik statistik per soal, serta otomatisasi laporan hasil ujian siswa yang dapat diunduh. Keseluruhan sistem diuji, diperbaiki, dan di-deploy di AWS dengan konfigurasi domain kustom.',
      en: 'Developed as an academic project in partnership with Tumbuh Berbagi, this web platform streamlines the organization’s operations for UTBK exam preparation. Built as a Modern Monolithic SPA using Inertia.js, it integrates an organizational landing page with an interactive real-time mock test (TO) system, self-paced practice modules, and an Item Response Theory (IRT) scoring mechanism. Additionally, the system features centralized content management for organizing question banks, exam schedules, and organizational updates.\n\nIn this project, I independently designed the system architecture and developed both the frontend and backend using React, Laravel, and Inertia.js. I implemented role-based authentication, automated email verification via Brevo SMTP Relay, IRT scoring integration for scheduled mock exams, PostgreSQL database schema design hosted on NeonDB, and media storage integration via Cloudflare R2 (S3-Compatible). On the administrative end, I built analytical dashboards using Recharts, integrated rich text editors (Tiptap/Quill), and configured automated PDF performance reporting (DomPDF). Finally, I containerized the application using Docker (multi-stage build) and managed deployment on AWS with custom domain configurations.',
    },
    stack: ['Laravel', 'React', 'Tailwind CSS', 'PHP', 'TypeScript', 'PostgreSQL'],
    architecture: ['AWS EC2', 'NeonDB', 'Cloudflare R2', 'Brevo'],
    category: 'Web Development',
    role: ['Fullstack Developer', 'System Analyst'],
    order: 1,
    preview: {
      type: 'video',
      publicId: 'tumbuhberbagi-main',
      autoplay: true,
    },
    links: { demo: 'https://tumbuhberbagi.duckdns.org/', repo: 'https://github.com' },
    imagePublicId: 'Screenshot_2026-10-18_211137',
    previewLabels: ['Web Application Interface', 'Backend API & Database Flow'],
    media: [
      {
        type: 'video',
        publicId: 'tumbuhberbagi-siswanew',
        autoplay: true,
        caption: {
          id: 'Halaman beranda bergaya binder notebook interaktif dengan tata letak scrapbook yang responsif dan navigasi bagian yang mulus.Menampilkan antarmuka siswa berbasis peran (role-based auth) yang dilengkapi alur verifikasi email otomatis saat pendaftaran awal untuk memastikan keamanan akun dan akses modul pembelajaran.',
          en: 'Demonstrates the student interface featuring role-based authentication and automated email verification during onboarding for secure access to practice modules.',
        },

      },
      {
        type: 'video',
        publicId: 'tumbuhberbagi-adminnew',
        autoplay: true,
        caption: {
          id: 'Demonstrasi dashboard admin untuk mengelola bank soal, membuat jadwal ujian, dan menganalisis statistik tingkat kesulitan soal dengan visualisasi data Recharts. Dilengkapi WYSIWYG Rich Text Editor (Tiptap/Quill) serta fitur cetak/unduh laporan PDF hasil analisis secara otomatis.',
          en: 'Highlights the admin dashboard for managing question banks, scheduling exams, and visualizing item statistics using Recharts. Features WYSIWYG rich text editing (Tiptap/Quill) and automated PDF report generation for student performance.',
        },
      },
      {
        type: 'image',
        publicId: 'Screenshot_2026-10-23_223511',
        caption: {
          id: 'Tampilan sistem Tryout interaktif dengan penghitung waktu real-time, navigasi penanda ragu-ragu, serta fitur pause ujian yang dapat dikonfigurasi langsung oleh admin.',
          en: 'Showcases the live UTBK exam simulator featuring real-time countdown timers, interactive bookmarking ("doubt" flag), and admin-configurable section pause functionality.',
        },
      },
    ],
  },
  {
    id: 'webdev-2',
    title: {
      id: 'ADIL: Platform Analisis & Deteksi Kemiripan Ide Lomba',
      en: 'ADIL: Competition Idea Analysis & Similarity Detection Platform',
    },
    description: {
      id: 'Proyek ini dirancang untuk menganalisis ide kompetisi dan mengidentifikasi tingkat kemiripan dengan entri yang ada melalui perbandingan teks dan visual. Dalam proyek tim hackathon SIFest 2026 ini (Juara 4), aku bertanggung jawab merancang arsitektur sistem, menyiapkan sampel dataset ide dalam format JSON, serta mengimplementasikan logika utama deteksi kemiripan langsung di sisi browser berbasis React.\n\nSistem mendukung analisis ide berbasis teks, dokumen PDF, hingga poster kompetisi. Pipeline analisis teks menggabungkan metode TF-IDF, cosine similarity, keyphrase matching, dan semantic text embeddings. Sementara untuk poster visual, sistem memanfaatkan perceptual hashing, analisis tata letak spasial, warna, serta OCR. Aku juga mengintegrasikan Gemini API untuk mengekstrak konten ide secara otomatis dari dokumen PDF dengan format yang tidak konsisten, kemudian menghasilkan skor kemiripan dan kategori risiko secara instan.',
      en: 'ADIL is a web platform designed to analyze competition ideas and identify similarities with existing entries through text and visual comparison. As part of a hackathon team at SIFest 2026 (4th Place), I was responsible for designing the system architecture, preparing a sample JSON dataset, and implementing the core browser-based similarity detection logic using React.\n\nThe system supports idea analysis from text inputs, PDF documents, and competition posters. Its text-analysis pipeline combines TF-IDF, cosine similarity, keyphrase matching, and semantic text embeddings, while poster analysis leverages perceptual hashing, spatial-layout analysis, color matching, and OCR. I also integrated the Gemini API to extract structured content from inconsistently formatted PDF files, generating automated similarity scores and risk categories.',
    },
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Gemini API', 'Tesseract OCR'],
    architecture: ['Vercel'],
    category: 'Web Development',
    role: ['System Analyst', 'Frontend Developer', 'Data Processing'],
    order: 2,
    preview: {
      type: 'image',
      publicId: 'adil-preview',
    },
    links: { demo: 'https://adil-cyan.vercel.app/', repo: 'https://github.com' },
    imagePublicId: 'adil-preview',
    previewLabels: ['Similarity Analysis Engine', 'Text & Poster OCR Pipeline'],
    media: [
      {
        type: 'image',
        publicId: 'adil-media-1',
        caption: {
          id: 'Antarmuka pengujian ide berbasis teks dan PDF dengan integrasi Gemini API untuk ekstraksi data terstruktur.',
          en: 'Text and PDF analysis interface integrated with Gemini API for automated structured data extraction.',
        },
      },
      {
        type: 'image',
        publicId: 'adil-media-2',
        caption: {
          id: 'Modul pemrosesan gambar poster menggunakan perceptual hashing dan OCR untuk mendeteksi kemiripan visual.',
          en: 'Poster image processing module leveraging perceptual hashing and OCR to detect visual similarities.',
        },
      },
      {
        type: 'image',
        publicId: 'adil-media-3',
        caption: {
          id: 'Hasil komparasi skor kemiripan dan pengkategorian risiko duplikasi karya secara real-time.',
          en: 'Real-time similarity score breakdown and duplication risk categorization dashboard.',
        },
      },
    ],
  },
  {
    id: 'webdev-3',
    title: {
      id: 'ProkerKita: Platform Eksplorasi Ide Program Kerja KKN',
      en: 'ProkerKita: KKN Work Program Idea Platform',
    },
    description: {
      id: 'Proyek kompetisi web design ini dikembangkan untuk membantu mahasiswa mengevaluasi, merencanakan, dan mengembangkan ide Program Kerja KKN berdasarkan kebutuhan lokal, anggaran, dan rekam jejak inisiatif sebelumnya. Pada proyek ini, aku berfokus pada pengembangan frontend berbasis React dengan menekankan antarmuka interaktif dan pengalaman visual yang intuitif.\n\nAku mengimplementasikan React dan GSAP untuk membangun antarmuka interaktif serta animasi halus yang mendukung visual storytelling. Sistem menerima input berupa ide program kerja, lokasi desa, estimasi anggaran, dan permasalahan utama daerah, lalu menampilkan preseden proyek relevan dan proyeksi dampaknya secara visual. Proyek ini dibangun sebagai prototipe frontend yang berfokus pada pengalaman pengguna yang responsif.',
      en: 'Developed for a web design competition, ProkerKita enables students to evaluate and develop community service (KKN) program ideas based on local needs, budgets, and previous precedents. In this project, I focused on frontend development using React, emphasizing interactive user interfaces and engaging visual experiences.\n\nI integrated GSAP with React to create smooth animated interactions supporting visual storytelling. The platform processes user inputs—such as proposed work plans, village locations, budgets, and primary local issues—to surface relevant precedent programs and projected outcomes. Built as a high-fidelity frontend prototype, it prioritizes intuitive user interaction and responsive design.',
    },
    stack: ['React', 'JavaScript', 'GSAP', 'Tailwind CSS'],
    architecture: ['Vercel'],
    category: 'Web Development',
    role: ['Frontend Developer', 'UI/UX Designer'],
    preview: {
      type: 'image',
      publicId: 'prokerkita-preview',
    },
    links: { demo: 'https://prokerkita.vercel.app/', repo: 'https://github.com' },
    imagePublicId: 'prokerkita-preview',
    previewLabels: ['Interactive Program Matcher', 'GSAP Animated Interface'],
    media: [
      {
        type: 'image',
        publicId: 'prokerkita-media-1',
        caption: {
          id: 'Halaman eksplorasi program KKN berbasis peta interaktif dan filter kriteria kebutuhan desa.',
          en: 'Interactive KKN program exploration page featuring location mapping and village requirement filters.',
        },
      },
      {
        type: 'image',
        publicId: 'prokerkita-media-2',
        caption: {
          id: 'Formulir pengajuan ide program kerja dengan estimasi anggaran dan kalkulasi dampak dinamis.',
          en: 'Work program proposal form with interactive budget estimation and dynamic impact calculation.',
        },
      },
      {
        type: 'image',
        publicId: 'prokerkita-media-3',
        caption: {
          id: 'Antarmuka visualisasi rekam jejak program KKN terdahulu sebagai materi pertimbangan ide.',
          en: 'Visual archive interface showcasing past KKN initiatives for program evaluation and precedent analysis.',
        },
      },
    ],
  },
  {
    id: 'webdev-4',
    title: {
      id: 'KerjaAsyik: Platform Pendeteksi Loker Palsu & Estimasi Gaji',
      en: 'KerjaAsyik: Job Scam Checker & Salary Estimation Platform',
    },
    description: {
      id: 'Proyek kompetisi web design Techsoft (Juara 2) ini dirancang sebagai platform terpadu untuk membantu pencari kerja mengidentifikasi potensi penipuan lowongan kerja (job scam) dan mengeksplorasi estimasi gaji secara transparan. Aku berkontribusi pada pengembangan frontend berbasis React, berfokus pada perancangan antarmuka serta pengalaman interaktif pengguna.\n\nMelalui platform ini, pengguna dapat memeriksa keabsahan suatu lowongan pekerjaan serta mengeksplorasi data estimasi gaji sesuai industri dan posisi untuk mengambil keputusan karir yang lebih aman. Proyek ini dibangun sebagai prototipe frontend interaktif yang berorientasi pada kepraktisan akses informasi dan kejelasan user flow.',
      en: 'Developed for the Techsoft Web Design Competition (2nd Place Winner), KerjaAsyik is a unified frontend platform designed to help job seekers detect fraudulent job postings and explore salary estimates. I contributed as a React frontend developer, focusing on crafting clean user interfaces and interactive user flows.\n\nThe platform enables users to evaluate job vacancy authenticity and cross-reference salary benchmarks across roles and industries, empowering safer career decision-making. It was engineered as a high-fidelity frontend prototype emphasizing clarity, speed, and intuitive navigation.',
    },
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    architecture: ['Vercel'],
    category: 'Web Development',
    role: ['Frontend Developer'],
    preview: {
      type: 'image',
      publicId: 'kerjaasyik-preview',
    },
    links: { demo: 'https://kerjaasyikks.vercel.app/', repo: 'https://github.com' },
    imagePublicId: 'kerjaasyik-preview',
    previewLabels: ['Job Scam Checker UI', 'Salary Estimation Dashboard'],
    media: [
      {
        type: 'image',
        publicId: 'kerjaasyik-media-1',
        caption: {
          id: 'Modul pengecekan keaslian lowongan kerja berbasis indikator risiko penipuan.',
          en: 'Job vacancy validation module designed to evaluate risk indicators for potential employment scams.',
        },
      },
      {
        type: 'image',
        publicId: 'kerjaasyik-media-2',
        caption: {
          id: 'Fitur kalkulator dan pembanding estimasi rerata gaji berdasarkan posisi dan industri.',
          en: 'Interactive salary benchmark calculator and comparison tool across job roles and industry sectors.',
        },
      },
      {
        type: 'image',
        publicId: 'kerjaasyik-media-3',
        caption: {
          id: 'Tampilan panduan panduan keamanan melamar kerja dan pelaporan indikasi loker bodong.',
          en: 'Job safety guide and reporting workflow interface for suspicious job postings.',
        },
      },
    ],
  },
  {
    id: 'fullstack-2',
    title: {
      id: 'ReCircle: Marketplace Barang Bekas Mahasiswa Indekos',
      en: 'ReCircle: Preloved Marketplace for Boarding House Students',
    },
    description: {
      id: 'Proyek akademik perkuliahan ini dikembangkan untuk memfasilitasi transaksi jual-beli barang bekas layak pakai antar mahasiswa indekos secara praktis dan aman. Dalam tim beranggota 4 orang (divisi web & mobile), aku menjadi bagian dari tim web 2 orang yang bertanggung jawab membangun frontend dan backend menggunakan React dan Laravel.\n\nFokus kontribusiku terletak pada pengembangan panel admin, pengujian kualitas sistem (quality assurance), perancangan alur integrasi API, serta deployment web. Aku mengelola database MySQL, integrasi penyimpanan media via Cloudinary, serta mempublikasikan aplikasi web berbasis React di Vercel. Platform mencakup fitur marketplace penjual/pembeli, transaksi pembayaran, fitur live, serta obrolan antar pengguna (user chat).',
      en: 'Developed as a campus group project, ReCircle is a web and mobile marketplace platform designed for boarding house students to buy and sell preloved items. As part of a two-member web team within a four-person group, I contributed to both frontend and backend development using React and Laravel.\n\nMy primary responsibilities included building the administrative suite, conducting quality assurance, integrating APIs, and managing cloud web deployment. I designed MySQL database operations, configured Cloudinary media storage, and hosted the React frontend on Vercel. Features include buyer/seller marketplace flows, payment processing, live updates, and direct user messaging.',
    },
    stack: ['Laravel', 'React', 'PHP', 'JavaScript', 'MySQL', 'Tailwind CSS'],
    architecture: ['Vercel', 'Cloudinary', 'MySQL Host'],
    category: 'Web Development',
    role: ['Fullstack Developer', 'Backend Developer', 'QA & Deployment'],
    preview: {
      type: 'image',
      publicId: 'recircle-preview',
    },
    links: { demo: 'https://github.com', repo: 'https://github.com' },
    imagePublicId: 'recircle-preview',
    previewLabels: ['Marketplace & Chat Flow', 'Admin Management Panel'],
    media: [
      {
        type: 'image',
        publicId: 'recircle-media-1',
        caption: {
          id: 'Katalog marketplace produk bekas mahasiswa dilengkapi filter harga dan opsi komunikasi penjual.',
          en: 'Student preloved product catalog featuring price filters and direct seller contact options.',
        },
      },
      {
        type: 'image',
        publicId: 'recircle-media-2',
        caption: {
          id: 'Dashboard admin untuk pengawasan transaksi, verifikasi barang, dan manajemen pengguna.',
          en: 'Admin dashboard for transaction oversight, item verification, and platform user management.',
        },
      },
      {
        type: 'image',
        publicId: 'recircle-media-3',
        caption: {
          id: 'Fitur percakapan langsung (live chat) dan alur alur alur checkout pembayaran interaktif.',
          en: 'Live user messaging interface and integrated checkout payment flow.',
        },
      },
    ],
  },
  {
    id: 'uiux-1',
    title: {
      id: 'Design Website Games For Kids Called Mentari',
      en: 'Design Website Games For Kids Called Mentari',
    },
    description: {
      id: 'Perancangan UI/UX game interaktif untuk anak-anak dengan pendekatan elemen visual bertema ramah anak, warna-warna lembut yang riang, serta pengujian kemudahan navigasi bagi usia dini.',
      en: 'Interactive UI/UX design for kids educational games featuring child-friendly visuals, soft cheerful colors, and early-age usability navigation testing.',
    },
    stack: ['Figma', 'Canva', 'Adobe XD'],
    category: 'UI/UX Design',
    role: 'UI/UX Designer',
    links: { demo: 'https://figma.com' },
    previewLabels: ['Desktop UI Wireframe & Prototype', 'Mobile UI Screens Showcase'],
  },
  {
    id: 'uiux-2',
    title: {
      id: 'Design Mobile App E-Commerce Aesthetic',
      en: 'Design Mobile App E-Commerce Aesthetic',
    },
    description: {
      id: 'Perancangan pengalaman pengguna (UX) dan antarmuka (UI) aplikasi seluler belanja online bertema estetika minimalis dengan alur pemesanan produk yang sangat cepat dan intuitif.',
      en: 'UI/UX design for a minimalist aesthetic online shopping mobile application with an intuitive and swift product ordering flow.',
    },
    stack: ['Figma', 'Protopie', 'Illustrator'],
    category: 'UI/UX Design',
    role: 'UI/UX Designer',
    links: { demo: 'https://figma.com' },
    previewLabels: ['Desktop UI Wireframe & Prototype', 'Mobile UI Screens Showcase'],
  },
  /*
  '''
  {
    id: 'writing-0',
    title: 'Moonlit Full',
    group: 'Fiction Writing',
    label: 'Novel',
    description: 'Sebuah novel fiksi naratif yang mengisahkan alur perjalanan karakter utama menemukan tempat terbaiknya di dunia. Penulisan berfokus pada emosi mendalam dan pembangunan suasana.\n\nNaskah ini telah dibaca ribuan pembaca dan mendapatkan respon hangat berkat konflik emosional yang relatable serta pemilihan diksi yang puitis.',
    stack: [],
    category: 'Writing',
    role: 'Writer',
    type: 'image',
    src: '',
    links: {},
    previewLabels: ['Novel'],
  },
  {
    id: 'writing-1',
    title: 'You Changed Me (Skrip Drama Youtube)',
    group: 'Fiction Writing',
    label: 'Skrip Drama/film',
    description: 'Naskah skenario serial web drama YouTube dengan dialog yang natural, ritme alur adegan yang dinamis, serta instruksi aksi kamera yang terstruktur rapi untuk tim produksi.',
    stack: [],
    category: 'Writing',
    role: 'Writer',
    type: 'image',
    src: '',
    links: {},
    previewLabels: ['Skrip Drama/film'],
  },
  {
    id: 'writing-2',
    title: 'You Changed Me (Skrip Drama Youtube)',
    group: 'Non-Fiction Writing',
    label: 'Karya Tulis Ilmiah',
    description: 'Penulisan makalah dan karya ilmiah berbasis metodologi penelitian empiris dengan tinjauan pustaka sistematis, analisis data presisi, serta penyusunan sitasi standar akademik.',
    stack: [],
    category: 'Writing',
    role: 'Writer',
    type: 'image',
    src: '',
    links: {},
    previewLabels: ['Karya Tulis Ilmiah'],
  },
  {
    id: 'writing-3',
    title: 'Promotion',
    group: 'Copy Writing - Social Media',
    label: 'Promotion',
    description: '',
    stack: ['Notion', 'Google Docs'],
    category: 'Writing',
    role: 'Writer',
    type: 'image',
    src: '',
    links: {},
    previewLabels: ['Copy Ad 1', 'Copy Ad 2', 'Copy Ad 3'],
  },
  */
  {
    id: 'creative-0',
    title: 'Cover Novel',
    group: 'Design Graphic',
    description: '',
    stack: ['Photoshop', 'Canva', 'Illustrator'],
    category: 'Creative Works',
    role: 'Graphic Designer',
    links: {},
    previewLabels: ['Cover 1', 'Cover 2', 'Cover 3'],
  },
  {
    id: 'creative-1',
    title: 'Promotion/ Branding',
    group: 'Design Graphic',
    description: '',
    stack: ['Photoshop', 'Canva', 'Illustrator'],
    category: 'Creative Works',
    role: 'Graphic Designer',
    links: {},
    previewLabels: ['Branding 1', 'Branding 2', 'Branding 3'],
  },
  {
    id: 'creative-2',
    title: 'Thumbnail Youtube',
    group: 'Design Graphic',
    description: '',
    stack: ['Photoshop', 'Canva', 'Illustrator'],
    category: 'Creative Works',
    role: 'Graphic Designer',
    links: {},
    previewLabels: ['Thumbnail 1', 'Thumbnail 2', 'Thumbnail 3'],
  },
  {
    id: 'creative-3',
    title: 'Youtube',
    group: 'Video & Motion Works',
    description: '',
    stack: ['Premiere Pro', 'CapCut', 'After Effects'],
    category: 'Creative Works',
    role: 'Video & Motion',
    links: {},
    previewLabels: ['Video 1', 'Video 2', 'Video 3'],
  },
  {
    id: 'creative-4',
    title: 'Promotion',
    group: 'Video & Motion Works',
    description: '',
    stack: ['Premiere Pro', 'CapCut', 'After Effects'],
    category: 'Creative Works',
    role: 'Video & Motion',
    links: {},
    previewLabels: ['Promo Video 1', 'Promo Video 2', 'Promo Video 3'],
  },
  {
    id: 'creative-5',
    title: 'Affiliate',
    group: 'Video & Motion Works',
    description: '',
    stack: ['Premiere Pro', 'CapCut', 'After Effects'],
    category: 'Creative Works',
    role: 'Video & Motion',
    links: {},
    previewLabels: ['Reels 1', 'Reels 2', 'Reels 3'],
  },
];
export const projects: Project[] = SHOW_CREATIVE_WORKS
  ? originalProjects
  : originalProjects.filter(p => p.category !== 'Creative Works');
export function filterProjects(category: Category) {
  const list = projects.filter(p => category === 'All' || p.category === category);
  return sortProjects(list);
}
export interface Achievement {
  id: number;
  publicId: string;
  title: string;
  category: string;
  year: string;
  width?: number;
  height?: number;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    publicId: 'Juara_3_3',
    title: 'Juara 3 Lomba Startup Innovation Pendikar',
    category: 'Competition',
    year: '2025',
    width: 2000,
    height: 1414,
  },
  {
    id: 2,
    publicId: 'WhatsApp_Image_2026-10-12_at_1.05.53_PM',
    title: 'Juara 2 Lomba Web Design Competition',// TODO: Gambar di Cloudinary bertuliskan 'Juara 2 Web Design Competition 2026'
    category: 'Competition',
    year: '2026', // TODO: Di sertifikat tertulis 2026
    width: 1600,
    height: 1200,
  },
  {
    id: 3,
    publicId: 's_portal_0b21ec6468cb438192238a96870f1527',
    title: 'Finalis TOP 4 Business Plan Competition IIO', // TODO: Gambar di Cloudinary bertuliskan 'Finalis Lomba Bussines Plan Competition Indonesian Industrial Outlook 2026'
    category: 'Competition',
    year: '2026', // TODO: Di sertifikat tertulis 2026/2025
    width: 1754,
    height: 1240,
  },
];
export type SkillCategory = 'technology' | 'design' | 'writing' | 'soft skill' | string;

export interface SkillItem {
  name: string;
  level: string;
  icon?: string;
  category: SkillCategory;
}

export const skills: SkillItem[] = [
  { name: 'HTML & CSS', level: 'Advanced', icon: '\ud83c\udf10', category: 'technology' },
  { name: 'JavaScript / TypeScript', level: 'Advanced', icon: '\u26a1', category: 'technology' },
  { name: 'React & Next.js', level: 'Advanced', icon: '\u269b\ufe0f', category: 'technology' },
  { name: 'Tailwind CSS', level: 'Advanced', icon: '\ud83c\udfa8', category: 'technology' },
  { name: 'UI/UX Design', level: 'Proficient', icon: '\u270f\ufe0f', category: 'design' },
  { name: 'Figma', level: 'Master', icon: '\ud83c\udfaf', category: 'design' },
  { name: 'Node.js & Supabase', level: 'Intermediate', icon: '\ud83d\ude80', category: 'technology' },
  { name: 'Copywriting & Content', level: 'Proficient', icon: '\ud83d\udcdd', category: 'writing' },
];
export interface Certificate {
  id: number;
  publicId: string;
  title: string;
  issuer: string;
  year: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    publicId: 'c98222e6-4bfc-45da-b7ec-322caf4a1646',
    title: 'Gemini Certified Student', // TODO: Isi judul sertifikat untuk publicId hash ini
    issuer: 'Google for Student', // TODO: Isi penerbit sertifikat untuk publicId hash ini
    year: '2025', // TODO: Sesuaikan tahun perolehan
  },
  {
    id: 2,
    publicId: 'Nada_H_Nurfadhilah-_Certificate_Attendance_Sefc_-_REVOU',
    title: 'Certificate of Attendance - SEFC', // TODO: Sesuaikan judul bila perlu
    issuer: 'RevoU', // TODO: Sesuaikan penerbit bila perlu
    year: '2024', // TODO: Sesuaikan tahun perolehan
  },
  {
    id: 3,
    publicId: 'Nada_Haifa_Nurfadhilah_-_Certificate_of_BelajarCodingWebsiteUntukPemula_by_Mounev_Academy',
    title: 'Belajar Coding Website Untuk Pemula', // TODO: Sesuaikan judul bila perlu
    issuer: 'Mounev Academy', // TODO: Sesuaikan penerbit bila perlu
    year: '2024', // TODO: Sesuaikan tahun perolehan
  },
  {
    id: 4,
    publicId: 'Sertifikat_AI_Engineer_Nada_Haifa_Nurfadhilah',
    title: 'Sertifikat AI Engineer', // TODO: Sesuaikan judul bila perlu
    issuer: 'AI Training Program', // TODO: Sesuaikan penerbit bila perlu
    year: '2025', // TODO: Sesuaikan tahun perolehan
  },
  {
    id: 5,
    publicId: 'Completion_Certificate_for_Intro_to_UI_UX_2',
    title: 'Completion Certificate for Intro to UI/UX', // TODO: Sesuaikan judul bila perlu
    issuer: 'UI/UX Course', // TODO: Sesuaikan penerbit bila perlu
    year: '2024', // TODO: Sesuaikan tahun perolehan
  },
];
export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/nada-haifa-nurfadhilah-448759280',
  instagram: 'https://www.instagram.com/nadaanf/',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=nadahaifanurfadhilah@gmail.com',
  github: 'https://github.com/NadaaaaH'
};
export const summaries = {
  portfolio: { title: 'Website Portofolio', description: 'Platform portofolio interaktif berbasis Next.js dan Tailwind CSS dengan desain bertema notebookbinder yang ceria dan penuh animasi stiker interaktif.' },
  mentari: { title: 'Design Website Games For Kids', description: 'Desain antarmuka interaktif dan edukatif untuk anak-anak dengan warna-warna pastel yang menyenangkan dan alur navigasi yang ramah pengguna.' },
  novel: { title: 'Novel - Moonlit Full', description: 'Kisah fiksi romantis tentang pencarian jati diri di bawah sinar bulan purnama.' },
  script: { title: 'Skrip Drama / Film', description: 'Naskah skenario drama berdurasi pendek untuk produksi konten video YouTube.' },
};
