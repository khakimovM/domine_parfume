/**
 * Doʻkon haqidagi barcha oʻzgaruvchan maʼlumot shu yerda.
 * Raqam, havola yoki matn oʻzgarsa — faqat shu faylni tahrirlang.
 */

export const SITE = {
  brand: "Domine",
  brandFull: "Domine Parfumes",
  city: "Fargʻona",
  tagline: "Koʻchib yuruvchi atirlar doʻkoni",

  telegram: {
    handle: "@domine_parfumes",
    url: "https://t.me/domine_parfumes",
  },

  // Instagram sahifa nomi Telegram bilan bir xil deb olindi.
  // Boshqacha boʻlsa, shu ikki qatorni oʻzgartiring.
  instagram: {
    handle: "@domine_parfumes",
    url: "https://instagram.com/domine_parfumes",
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
