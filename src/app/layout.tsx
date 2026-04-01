import type { Metadata, Viewport } from "next";
import { Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
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
  icons: {
    icon: "/favicon",
    shortcut: "/favicon",
    apple: "/favicon",
  },
  openGraph: {
    title: "دار الحصّ | أناقة استثنائية",
    description: "حيث تلتقي الأناقة بالرقي. اكتشفي مجموعتنا الحصرية من العبايات الفاخرة المصممة خصيصاً لج.",
    url: "https://house-of-alhess-ae.vercel.app/",
    siteName: "Dar Al-Hess",
    images: [
      {
        url: "/opengraphimage.png",
        width: 1200,
        height: 630,
        alt: "Dar Al-Hess Exclusive Abayas",
      },
    ],
    locale: "ar_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دار الحصّ | أناقة استثنائية",
    description: "حيث تلتقي الأناقة بالرقي. اكتشفي مجموعتنا الحصرية من العبايات الفاخرة المصممة خصيصاً لج.",
    images: ["/opengraphimage.png"],
  },
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
      <body className="min-h-dvh flex flex-col font-sans bg-(--background) text-(--foreground) selection:bg-gold-400 selection:text-warm-950 relative film-grain">
        <a href="#main-content" className="skip-link">
          انتقلي إلى المحتوى الرئيسي
        </a>
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
