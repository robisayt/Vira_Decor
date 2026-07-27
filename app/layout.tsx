import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Thread from "@/components/layout/Thread";
import { site } from "@/content/site";
import "./globals.css";

/** Дисплейний шрифт — високий контраст, як у логотипі. */
const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/** Геометричний гротеск — для тексту, лейблів і кнопок. */
const sans = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — студія дизайну інтер'єру`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — студія дизайну інтер'єру`,
    description: site.description,
    type: "website",
    locale: "uk_UA",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#FEFEFE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans font-light antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-wine focus:px-5 focus:py-3 focus:label focus:text-porcelain"
        >
          Перейти до вмісту
        </a>
        <Thread />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
