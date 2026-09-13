import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, JetBrains_Mono, Manrope } from "next/font/google";
import BrandStage from "@/components/BrandStage";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import { DESCRIPTION, KEYWORDS, OG_DESCRIPTION, TITLE, storeJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Didone — atir qadoqlarining oʻz tipografiyasi. */
const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

/* Raqamlar uchun: telefon, hajm, qadamlar. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const ogImage = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.brandFull} — ${SITE.city}dagi atir doʻkoni`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.brandFull}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE.brandFull,
  authors: [{ name: SITE.brandFull, url: SITE.url }],
  creator: SITE.brandFull,
  publisher: SITE.brandFull,
  alternates: {
    canonical: "/",
  },
  category: "shopping",
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.brandFull,
    title: TITLE,
    description: OG_DESCRIPTION,
    locale: "uz_UZ",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console va Yandex Webmaster tasdiqlash kodlari shu yerga:
  // verification: { google: "...", yandex: "..." },
};

export const viewport: Viewport = {
  themeColor: "#0e0a07",
};

/**
 * Birinchi boʻyoqdan oldin ishlaydi va ikki narsani hal qiladi:
 *
 *  — `data-js`: JavaScript bor. Faqat shu boʻlgandagina skroll bilan
 *    ochiladigan elementlar yashiriladi, aks holda ular koʻrinib turadi.
 *  — `data-stage="boot"`: ochilish sahnasi kerak. Harakat kamaytirilgan
 *    boʻlsa yoki sahna shu sessiyada koʻrilgan boʻlsa — qoʻyilmaydi.
 *
 * Shu sababli sahifaning **odatiy holati — toʻliq koʻringan holat**: JS
 * ishlamasa ham hamma narsa oʻqiladi va qaytgan tashrifchi qora pardani
 * bir lahzaga ham koʻrmaydi.
 */
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{d.dataset.js="1";if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&sessionStorage.getItem("domine:intro-seen")!=="1"){d.dataset.stage="boot"}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* Qidiruv tizimlari uchun: doʻkon nomi, telefonlar, xizmat hududi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd()) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#top">
          Asosiy qismga oʻtish
        </a>

        <BrandStage />
        <Nav />

        {children}

        <Motion />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
