export type Language = 'id' | 'en';
export type Category = 'All' | 'Web Development' | 'UI/UX Design' | 'Creative Works';
export interface ProjectMedia {
  type: 'image' | 'video';
  publicId: string; // Gunakan publicId alih-alih URL utuh
  posterPublicId?: string;
  title?: { id: string; en: string } | string;
  description?: { id: string; en: string } | string;
  features?: { id: string[]; en: string[] } | string[];
  techFlow?: { id: string; en: string } | string;
}

export type MediaItem = ProjectMedia;

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: Exclude<Category, 'All'>;
  role: string;
  type: 'website' | 'video' | 'image';
  src: string;
  links: { demo?: string; repo?: string };
  imagePublicId?: string; // Menyimpan publicId gambar utama
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
    hello: "Hi, I'm Nada!",
    annotation: 'a little logic, a lot of creativity \u2661',
    collection: 'a little collection of my work',
    loading: 'Loading preview',
  },
};
const originalProjects: Project[] = [
  {
    id: 'fullstack-1',
    title: 'Interactive Notebook Portfolio Website',
    description: 'Platform web portofolio bertema notebookbinder interaktif yang dikembangkan menggunakan Next.js App Router, Tailwind CSS v4, GSAP Animations, dan Supabase backend. Dilengkapi fitur switcher multi-bahasa (ID/EN) dan animasi stiker interaktif.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Supabase'],
    category: 'Web Development',
    role: 'Web Developer',
    type: 'website',
    src: 'https://tumbuhberbagi.duckdns.org/',
    links: { demo: 'https://google.com', repo: 'https://github.com' },
    imagePublicId: 'Screenshot_2026-10-18_211137',
    previewLabels: ['Web Application Interface', 'Backend API & Database Flow'],
    media: [
      {
        type: 'image',
        publicId: 'Screenshot_2026-10-18_211137',
        title: {
          id: 'Tampilan Utama & Antarmuka Notebook',
          en: 'Main Interface & Notebook UI',
        },
        description: {
          id: 'Halaman beranda bergaya binder notebook interaktif dengan tata letak scrapbook yang responsif dan navigasi bagian yang mulus.',
          en: 'Interactive notebook binder homepage featuring a responsive scrapbook layout and smooth section navigation.',
        },
        features: {
          id: [
            'Antarmuka scrapbook interaktif & responsif',
            'Sistem tab navigasi proyek intuitif',
            'Desain bersih dengan tipografi bergaya diary',
          ],
          en: [
            'Interactive & responsive scrapbook interface',
            'Intuitive project tab navigation system',
            'Clean diary-styled typography and layout',
          ],
        },
        techFlow: {
          id: 'Next.js App Router & Tailwind CSS menangani rendering komponen dinamis dan styling responsif.',
          en: 'Next.js App Router & Tailwind CSS handle dynamic component rendering and responsive styling.',
        },
      },
      {
        type: 'video',
        publicId: 'dog',
        title: {
          id: 'Animasi Stiker & Interaktivitas Halus',
          en: 'Sticker Animation & Smooth Interactivity',
        },
        description: {
          id: 'Demonstrasi interaksi elemen visual seperti stiker dekoratif dan animasi transisi halaman yang berjalan pada 60 FPS.',
          en: 'Visual interaction showcase featuring decorative stickers and page transition animations running at 60 FPS.',
        },
        features: {
          id: [
            'Interaktivitas visual dan micro-animations',
            'Video pratinjau alur kerja aplikasi',
            'Transisi ringan tanpa beban performa',
          ],
          en: [
            'Visual interactivity and micro-animations',
            'Application workflow video preview',
            'Lightweight transitions with zero lag',
          ],
        },
        techFlow: {
          id: 'Animasi GPU-accelerated diatur dengan hook interaksi browser dan Cloudinary video streaming.',
          en: 'GPU-accelerated animations orchestrated via browser interaction hooks and Cloudinary video streaming.',
        },
      },
      {
        type: 'image',
        publicId: 'FotoProfil',
        title: {
          id: 'Integrasi Multi-Bahasa & Sistem Data',
          en: 'Multi-Language & Data Integration',
        },
        description: {
          id: 'Dukungan dwibahasa ID/EN terintegrasi yang dapat beralih secara instan tanpa reload, tersimpan di preferensi lokal.',
          en: 'Integrated bilingual ID/EN support switching instantly without page reloads, persisted via local storage.',
        },
        features: {
          id: [
            'Peralihan bahasa ID/EN real-time',
            'Penyimpanan preferensi pengguna otomatis',
            'Struktur data modular untuk kemudahan update konten',
          ],
          en: [
            'Real-time ID/EN language switcher',
            'Automatic user preference persistence',
            'Modular data structure for easy content updates',
          ],
        },
        techFlow: {
          id: 'State React sinkron dengan local storage dan kamus data portfolio terpusat.',
          en: 'React state synchronized with local storage and centralized portfolio data dictionary.',
        },
      },
    ],
  },
  {
    id: 'fullstack-2',
    title: 'E-Commerce Management & Analytics Dashboard',
    description: 'Aplikasi manajemen inventaris dan analitik penjualan real-time dengan visualisasi grafik interaktif, otentikasi peran pengguna, dan ekspor laporan PDF/Excel secara otomatis.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Chart.js'],
    category: 'Web Development',
    role: 'Web Developer',
    type: 'website',
    src: '',
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
    title: 'Design Website Games For Kids Called Mentari',
    description: 'Perancangan UI/UX game interaktif untuk anak-anak dengan pendekatan elemen visual bertema ramah anak, warna-warna lembut yang riang, serta pengujian kemudahan navigasi bagi usia dini.',
    stack: ['Figma', 'Canva', 'Adobe XD'],
    category: 'UI/UX Design',
    role: 'UI/UX Designer',
    type: 'image',
    src: '',
    links: { demo: 'https://figma.com' },
    previewLabels: ['Desktop UI Wireframe & Prototype', 'Mobile UI Screens Showcase'],
  },
  {
    id: 'uiux-2',
    title: 'Design Mobile App E-Commerce Aesthetic',
    description: 'Perancangan pengalaman pengguna (UX) dan antarmuka (UI) aplikasi seluler belanja online bertema estetika minimalis dengan alur pemesanan produk yang sangat cepat dan intuitif.',
    stack: ['Figma', 'Protopie', 'Illustrator'],
    category: 'UI/UX Design',
    role: 'UI/UX Designer',
    type: 'image',
    src: '',
    links: { demo: 'https://figma.com' },
    previewLabels: ['Desktop UI Wireframe & Prototype', 'Mobile UI Screens Showcase'],
  },
  {
    id: 'creative-0',
    title: 'Cover Novel',
    group: 'Design Graphic',
    description: '',
    stack: ['Photoshop', 'Canva', 'Illustrator'],
    category: 'Creative Works',
    role: 'Graphic Designer',
    type: 'image',
    src: '',
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
    type: 'image',
    src: '',
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
    type: 'image',
    src: '',
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
    type: 'video',
    src: '',
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
    type: 'video',
    src: '',
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
    type: 'video',
    src: '',
    links: {},
    previewLabels: ['Reels 1', 'Reels 2', 'Reels 3'],
  },
];
export const projects: Project[] = originalProjects;
export function filterProjects(category: Category) {
  return projects.filter(p => category === 'All' || p.category === category);
}
export const achievements = [
  { id: 1, title: 'Juara 3 Lomba Startup Innovation Pendikar 2025', category: 'Competition', year: '2025' },
  { id: 2, title: 'Juara 1 UI/UX Design Challenge', category: 'Design Award', year: '2025' },
  { id: 3, title: 'Silver Button Youtube tahun 2025', category: 'Creator Milestone', year: '2025' },
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
};
