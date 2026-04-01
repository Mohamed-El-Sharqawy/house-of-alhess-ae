import type { Metadata, Viewport } from "next";
import { Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "دار الحصّ | أناقة استثنائية",
  description: "حيث تلتقي الأناقة بالرقي. اكتشفي مجموعتنا الحصرية من العبايات الفاخرة المصممة خصيصاً لج.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${playfair.variable} ${ibmPlexArabic.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-[100dvh] flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-gold-400)] selection:text-[var(--color-warm-950)] relative">
        <a href="#main-content" className="skip-link">
          انتقلي إلى المحتوى الرئيسي
        </a>
        <CustomCursor />
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
