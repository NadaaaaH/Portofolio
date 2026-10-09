import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nada Haifa Nurfadhilah — Scrapbook Portfolio",
  description: "Portofolio Nada Haifa Nurfadhilah: software engineering, UI/UX, creative works, dan writing. Merging Logic with Creativity.",
  openGraph: {
    title: "Nada Haifa Nurfadhilah — Scrapbook Portfolio",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
