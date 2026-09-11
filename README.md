# Domine Parfumes

Fargʻonadagi koʻchib yuruvchi atirlar doʻkoni uchun landing sahifa.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · GSAP · qoʻlda
yozilgan CSS.

Sahifa qisqa — uchta boʻlim: Hero → Qadamlar → Aloqa.
Maqsad bitta: tashrifchini Telegram adminiga yuborish.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:3000

## Produksiya

```bash
npm run build
npm run start
```

Vercel'ga joylash uchun repozitoriyni ulash kifoya.

## Nimani qayerdan oʻzgartirish kerak

| Nima | Fayl |
|---|---|
| Telefon raqamlari, Telegram, Instagram, shahar | `lib/site.ts` |
| Qadamlar matni | `lib/content.ts` |
| Rang, shrift, oʻlchamlar | `app/globals.css` → `:root` |
| Animatsiyalar | `components/Motion.tsx` |
| Ikonkalar | `public/icons/*.svg` |

## Animatsiyalar

Barcha harakat GSAP bilan, bitta faylda — `components/Motion.tsx`.
Komponentlar faqat belgi qoʻyadi:

```tsx
<p data-reveal>skrollda ochiladi</p>
<h1 data-split>harflarga boʻlinib koʻtariladi</h1>
<a data-magnet>kursorga tortiladi</a>
```

## Rasmlar

Hero fotosi va ulashuv muqovasi Gemini orqali generatsiya qilingan.
Qayta chizish uchun `.env.local` ga kalit qoʻying:

```
GEMINI_API_KEY=...
```

keyin:

```bash
npm run images
```

Xom PNG'lar `assets/generated/` ga tushadi (git'ga kirmaydi), siqilgan
variantlari `public/images/` ga.

## Domen

Telegram va Instagram'da havola ulashilganda muqova rasmi koʻrinishi uchun
`.env.local` ga qoʻshing:

```
NEXT_PUBLIC_SITE_URL=https://sizning-domeningiz.uz
```

## Nimalar hisobga olingan

- Telefon, planshet va kompyuterga moslashgan
- Klaviatura bilan yurish va koʻrinadigan fokus
- `prefers-reduced-motion` — animatsiyalar oʻchiriladi
- JavaScript oʻchiq boʻlsa ham sahifa toʻliq oʻqiladi
- Ochilish sahnasi sessiyada bir marta va bosish/skroll bilan oʻtkaziladi
