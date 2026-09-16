/**
 * Doʻkon haqidagi barcha oʻzgaruvchan maʼlumot shu yerda.
 * Raqam, havola yoki matn oʻzgarsa — faqat shu faylni tahrirlang.
 */

export const SITE = {
  // Logotipdagi yozilishi — urgʻu belgisi bilan.
  brand: "Dominé",
  brandFull: "Dominé Parfumes",
  /** Urgʻusiz shakl: odamlar shunday yozib qidiradi va domen ham shunday. */
  brandPlain: "Domine Parfumes",
  city: "Fargʻona",
  /** Kalit soʻzlarda apostrofsiz shakl ham kerak. */
  cityPlain: "Fargona",
  tagline: "Online atirlar doʻkoni",

  /** Kanonik manzil. Vercel'da NEXT_PUBLIC_SITE_URL bilan almashtiriladi. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://domine.uz",

  telegram: {
    handle: "@domine_parfumes",
    url: "https://t.me/domine_parfumes",
  },

  // Diqqat: Instagram va Telegram nomlari HAR XIL —
  // Instagram nuqta bilan, Telegram pastki chiziq bilan.
  instagram: {
    handle: "@domine.parfumes",
    url: "https://instagram.com/domine.parfumes",
  },

  admins: [
    { label: "Admin · 1", phone: "+998 33 000 01 27", tel: "tel:+998330000127" },
    { label: "Admin · 2", phone: "+998 77 199 05 41", tel: "tel:+998771990541" },
  ],
} as const;

/** Tashqi havolalar uchun — yangi oynada va referrer yubormasdan. */
export const EXTERNAL = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const NAV_LINKS = [
  { href: "#qadamlar", label: "Qanday olaman" },
  { href: "#aloqa", label: "Aloqa" },
] as const;
