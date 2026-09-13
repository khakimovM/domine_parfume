import { SITE } from "./site";

/**
 * SEO matnlari va kalit soʻzlar.
 *
 * Muhim: `keywords` meta tegini Google umuman hisobga olmaydi. Uni bu yerda
 * saqlashimizning sababi — Yandex Oʻzbekistonda hali ham sezilarli ulushga
 * ega va roʻyxat reklama kampaniyalari uchun ham tayyor turadi.
 *
 * Haqiqiy reyting sarlavha, matn, struktura maʼlumoti va tashqi havolalardan
 * keladi — shuning uchun kalit soʻzlar sahifa matniga tabiiy singdirilgan,
 * roʻyxatga tiqilmagan.
 */

export const TITLE = `${SITE.brandFull} — ${SITE.city}da atir doʻkoni | Original atirlar`;

/** ~155 belgi: Google undan uzogʻini kesib tashlaydi. */
export const DESCRIPTION =
  `${SITE.brandFull} — ${SITE.city}dagi koʻchib yuruvchi atir doʻkoni. ` +
  `Original atirlar va lux analoglar. ${SITE.city} boʻylab tekin yetkazish, ` +
  `boshqa shaharlarga pochta.`;

export const OG_DESCRIPTION =
  `Original atirlar va lux analoglar. ${SITE.city} boʻylab tekin yetkazib ` +
  `berish, boshqa shaharlarga pochta orqali.`;

/** Guruhlangan toʻliq roʻyxat — reklama va kontent uchun. */
export const KEYWORD_GROUPS = {
  brend: [
    "domine",
    "domine parfumes",
    "domine parfume",
    "dominé parfumes",
    "domine atir",
    "domine uz",
    "domine parfumes fargona",
  ],
  kategoriya: [
    "atir",
    "atirlar",
    "parfum",
    "parfyum",
    "parfyumeriya",
    "original atir",
    "lux atir",
    "analog atir",
    "lux analog atir",
    "erkaklar atiri",
    "ayollar atiri",
  ],
  hudud: [
    "fargona atir",
    "fargʻona atir",
    "atir fargona",
    "atir fargʻona",
    "fargona atir doʻkoni",
    "fargʻona atir dokoni",
    "fargona parfum",
    "fargonada atir sotib olish",
  ],
  shaharlar: [
    "toshkent atir",
    "andijon atir",
    "namangan atir",
    "qoʻqon atir",
    "margʻilon atir",
    "oʻzbekiston atir",
  ],
  niyat: [
    "atir sotib olish",
    "atir narxi",
    "atir yetkazib berish",
    "atir buyurtma",
    "original atir buyurtma",
    "arzon atir",
    "sovgʻa uchun atir",
  ],
  rus: [
    "парфюм фергана",
    "духи фергана",
    "купить духи фергана",
    "парфюмерия фергана",
    "оригинальные духи узбекистан",
    "доставка духов фергана",
    "domine парфюм",
  ],
} as const;

/**
 * Meta tegi uchun qisqartirilgan roʻyxat. Yuzlab soʻzni tiqish foyda
 * bermaydi — eng qiymatli 24 tasi olingan.
 */
export const KEYWORDS: string[] = [
  ...KEYWORD_GROUPS.brend,
  "atir",
  "atirlar",
  "parfum",
  "original atir",
  "lux analog atir",
  "erkaklar atiri",
  "fargona atir",
  "fargʻona atir",
  "atir fargona",
  "fargona atir doʻkoni",
  "atir sotib olish",
  "atir yetkazib berish",
  "oʻzbekiston atir",
  "парфюм фергана",
  "духи фергана",
  "парфюмерия фергана",
];

/** Google/Yandex uchun struktura maʼlumoti. */
export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE.url}/#store`,
    name: SITE.brandFull,
    // Urgʻusiz shakl ham yoziladi — qidiruvda ikkalasi ham topilsin.
    alternateName: [SITE.brandPlain, SITE.brandFull.toUpperCase(), SITE.brand],
    url: SITE.url,
    image: `${SITE.url}/images/og-cover.jpg`,
    logo: `${SITE.url}/icon.svg`,
    description: DESCRIPTION,
    telephone: SITE.admins.map((a) => a.tel.replace("tel:", "")),
    currenciesAccepted: "UZS",
    // Koʻchma doʻkon — koʻcha manzili yoʻq, shuning uchun faqat shahar
    // koʻrsatilgan va xizmat hududi alohida berilgan.
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: `${SITE.city} viloyati`,
      addressCountry: "UZ",
    },
    areaServed: [
      { "@type": "City", name: SITE.city },
      { "@type": "Country", name: "Oʻzbekiston" },
    ],
    sameAs: [SITE.instagram.url, SITE.telegram.url],
    contactPoint: SITE.admins.map((a) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: a.tel.replace("tel:", ""),
      availableLanguage: ["uz", "ru"],
    })),
  };
}
