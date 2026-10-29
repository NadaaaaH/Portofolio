import type { Metadata } from "next";
import "../styles/variables.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nada Haifa Nurfadhilah",
  description: "Portofolio Nada Haifa Nurfadhilah: software engineering, UI/UX, dan creative works. Merging Logic with Creativity.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon.png',
  },
  openGraph: {
    title: "Nada Haifa Nurfadhilah",
    description: "Kumpulan karya, pencapaian, dan cerita kreatif Nada Haifa Nurfadhilah. Software Engineering Enthusiast.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect untuk percepat handshake ke Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load font lewat <link> bukan @import — tidak blocking render */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=DM+Serif+Display&family=Fraunces:opsz,wght@9..144,400..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Roboto+Slab:wght@100..900&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
