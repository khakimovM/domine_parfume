import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, JetBrains_Mono, Manrope } from "next/font/google";
import BrandStage from "@/components/BrandStage";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
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

/**
 * Telegram va Instagram'da havola ulashilganda toʻgʻri rasm chiqishi uchun
 * absolyut manzil kerak. Domen maʼlum boʻlgach NEXT_PUBLIC_SITE_URL ni
 * `.env.local` ga yozing; Vercel'da avtomatik topiladi.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

const ogImage = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.brandFull} — ${SITE.city}dagi atirlar doʻkoni`,
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: `${SITE.brandFull} — ${SITE.tagline.toLowerCase()} | ${SITE.city}`,
  description: `${SITE.brandFull} — ${SITE.city}dagi koʻchib yuruvchi atirlar doʻkoni. Original va lux analog atirlar. ${SITE.city} shahri boʻylab tekin yetkazib berish, boshqa shaharlarga pochta orqali.`,
  keywords: [
    "atir",
    "parfum",
    "Fargʻona atir",
    "original atir",
    "lux analog atir",
    "Domine Parfumes",
  ],
  openGraph: {
    title: `${SITE.brandFull} — ${SITE.tagline.toLowerCase()}`,
    description: `Original va lux analog atirlar. ${SITE.city} boʻylab tekin yetkazib berish, boshqa shaharlarga pochta orqali.`,
    locale: "uz_UZ",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandFull} — ${SITE.tagline.toLowerCase()}`,
    description: `Original va lux analog atirlar. ${SITE.city} boʻylab tekin yetkazib berish.`,
    images: [ogImage.url],
  },
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
