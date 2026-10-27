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
  preview?: ProjectPreview;
  links: { demo?: string; repo?: string };
  imagePublicId?: string; // Menyimpan publicId gambar utama (opsional fallback)
  group?: string;
  label?: string;
  previewLabels: string[];
  media?: MediaItem[];
}
export const categories: Category[] = ['All', 'Web Development', 'UI/UX Design', 'Creative Works'];
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
      id: 'Platform web portofolio bertema notebook binder interaktif yang dikembangkan menggunakan Next.js App Router, Tailwind CSS v4, GSAP Animations, dan Supabase backend.\n\nDilengkapi fitur switcher multi-bahasa (ID/EN) dan animasi stiker interaktif yang responsif.',
      en: 'Developed as an academic project in partnership with Tumbuh Berbagi, this web platform streamlines the organization’s operations for UTBK exam preparation. Built as a Modern Monolithic SPA using Inertia.js, it integrates an organizational landing page with an interactive real-time mock test (TO) system, self-paced practice modules, and an Item Response Theory (IRT) scoring mechanism. Additionally, the system features centralized content management for organizing question banks, exam schedules, and organizational updates.\n\nIn this project, I independently designed the system architecture and developed both the frontend and backend using React, Laravel, and Inertia.js. I implemented role-based authentication, automated email verification via Brevo SMTP Relay, IRT scoring integration for scheduled mock exams, PostgreSQL database schema design hosted on NeonDB, and media storage integration via Cloudflare R2 (S3-Compatible). On the administrative end, I built analytical dashboards using Recharts, integrated rich text editors (Tiptap/Quill), and configured automated PDF performance reporting (DomPDF). Finally, I containerized the application using Docker (multi-stage build) and managed deployment on AWS with custom domain configurations.',
    },
    stack: ['Laravel', 'React', 'Tailwind CSS', 'PHP', 'TypeScript', 'PostgreSQL'],
    architecture: ['AWS EC2', 'NeonDB', 'Cloudflare R2', 'Brevo'],
    category: 'Web Development',
    role: ['Fullstack Developer', 'System Analyst'],
    preview: {
      type: 'image',
      publicId: 'Screenshot_2026-10-18_211137',
    },
    links: { demo: 'https://tumbuhberbagi.duckdns.org/', repo: 'https://github.com' },
    imagePublicId: 'Screenshot_2026-10-18_211137',
    previewLabels: ['Web Application Interface', 'Backend API & Database Flow'],
    media: [
      {
        type: 'image',
        publicId: 'Screenshot_2026-10-18_211137',
        caption: {
          id: 'Halaman beranda bergaya binder notebook interaktif dengan tata letak scrapbook yang responsif dan navigasi bagian yang mulus.Menampilkan antarmuka siswa berbasis peran (role-based auth) yang dilengkapi alur verifikasi email otomatis saat pendaftaran awal untuk memastikan keamanan akun dan akses modul pembelajaran.',
          en: 'Demonstrates the student interface featuring role-based authentication and automated email verification during onboarding for secure access to practice modules.',
        },
      },
      {
        type: 'video',
        publicId: 'tumbuhberbagi-admin',
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
    id: 'fullstack-2',
    title: {
      id: 'E-Commerce Management & Analytics Dashboard',
      en: 'E-Commerce Management & Analytics Dashboard',
    },
    description: {
      id: 'Aplikasi manajemen inventaris dan analitik penjualan real-time dengan visualisasi grafik interaktif, otentikasi peran pengguna, dan ekspor laporan PDF/Excel secara otomatis.',
      en: 'Real-time inventory management and sales analytics application with interactive chart visualizations, user role authentication, and automated PDF/Excel report exports.',
    },
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Chart.js'],
    category: 'Web Development',
    role: 'Web Developer',
    preview: {
      type: 'image',
      publicId: 'FotoProfil',
    },
    links: { demo: 'https://google.com', repo: 'https://github.com' },
    imagePublicId: 'FotoProfil', // ganti dengan publicId asli di Cloudinary
    previewLabels: ['Web Application Interface', 'Backend API & Database Flow'],
    media: [
      { type: 'image', publicId: 'FotoProfil' }, // ganti dengan publicId asli
      { type: 'image', publicId: 'FotoProfil' },
      { type: 'image', publicId: 'FotoProfil' },
      { type: 'video', publicId: 'dog' },         // ganti dengan publicId asli
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
export const projects: Project[] = originalProjects;
export function filterProjects(category: Category) {
  return projects.filter(p => category === 'All' || p.category === category);
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
export const skills = [
  { name: 'HTML & CSS', level: 'Advanced', icon: '\ud83c\udf10' },
  { name: 'JavaScript / TypeScript', level: 'Advanced', icon: '\u26a1' },
  { name: 'React & Next.js', level: 'Advanced', icon: '\u269b\ufe0f' },
  { name: 'Tailwind CSS', level: 'Advanced', icon: '\ud83c\udfa8' },
  { name: 'UI/UX Design', level: 'Proficient', icon: '\u270f\ufe0f' },
  { name: 'Figma', level: 'Master', icon: '\ud83c\udfaf' },
  { name: 'Node.js & Supabase', level: 'Intermediate', icon: '\ud83d\ude80' },
  { name: 'Copywriting & Content', level: 'Proficient', icon: '\ud83d\udcdd' },
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
