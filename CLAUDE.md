@AGENTS.md

# Domine Parfumes — landing

Fargʻonadagi koʻchib yuruvchi atirlar doʻkoni uchun bir sahifali landing.
Sahifaning yagona vazifasi — tashrifchini Telegram adminiga yuborish.

**Qisqa boʻlishi ataylab.** Uchta boʻlim: Hero → Qadamlar → Aloqa.
Yangi boʻlim qoʻshishdan oldin oʻylang: u haridorni Telegramga yaqinlashtiradimi
yoki shunchaki sahifani uzaytiradimi?

Olib tashlangan va **qaytarilmasligi kerak** boʻlgan narsalar: katalog gridi,
vektor flakon chizmalari, harakatlanuvchi lenta (marquee), "ishonch" ustunlari
va boʻlim ustidagi kichik yorliqlar (eyebrow). Bular sahifani uzaytirardi.

## Buyruqlar

```bash
npm run dev     # http://localhost:3000
npm run build   # produksiya buildi
npm run lint    # eslint
npm run images  # rasmlarni qayta generatsiya qilish (Gemini kaliti kerak)
```

## Struktura

| Yoʻl | Vazifasi |
|---|---|
| `app/layout.tsx` | Shriftlar, metadata, boot-skript, doimiy qatlamlar |
| `app/globals.css` | **Butun dizayn tizimi** — tokenlar, komponentlar, responsive |
| `app/page.tsx` | Uch boʻlimni ketma-ket yigʻadi |
| `components/Motion.tsx` | **Sahifadagi barcha GSAP harakati** |
| `lib/site.ts` | Telefon, Telegram, Instagram, shahar |
| `lib/content.ts` | Qadamlar matni |
| `public/icons/*.svg` | Qoʻlda chizilgan chiziqli ikonkalar |

## Tez-tez kerak boʻladigan tahrirlar

- **Telefon / havola / shahar** → `lib/site.ts`
- **Boʻlim matni** → `lib/content.ts`
- **Rang yoki oʻlcham** → `app/globals.css` → `:root`

## Dizayn qoidalari

- **Palitra** atirning materialidan: oud-qora `--noir`, amber shisha `--amber` /
  `--amber-lite`, oltin qopqoq `--champagne`. Yangi rang qoʻshmang.
  `rgba(...)` emas, `color-mix(in srgb, var(--token) N%, transparent)`.
- **Shrift roli qatʼiy:** `--display` (Bodoni Moda) sarlavhalarda,
  `--body` (Manrope) matnda, `--mono` faqat raqam va yorliqlarda.
- **Signature — orqa fondagi DOMINE.** Hero'da quyuq (0.16), pastda xira
  (0.06) — buni `Motion.tsx` dagi `fadeWordmarkOnScroll` boshqaradi.
- **Gradient matn ishlatmang.** Harflar ichida notekislik hosil qiladi va
  Impeccable detektori uni belgilaydi. Matn har doim tekis rangda.
- `ch` birligini sarlavha kengligiga ishlatmang: u ota elementning matn
  shriftidan hisoblanadi va sarlavhani uch barobar tor qilib qoʻyadi.
  `rem` ishlating.

### Mahsulot vizuali

**Vektor flakon chizmalari ishlatilmaydi** — ular arzon va ishonchsiz
koʻrinardi. Mahsulot faqat **fotografiya** bilan koʻrsatiladi.
SVG faqat chiziqli ikonkalar uchun (`public/icons/`).

## Harakat arxitekturasi

**Barcha harakat `components/Motion.tsx` da.** Boshqa komponentlar faqat
belgi qoʻyadi:

| Belgi | Nima boʻladi |
|---|---|
| `data-reveal` | skrollda pastdan ochiladi (`ScrollTrigger.batch`) |
| `data-hero` | ochilish sahnasidan keyin chiqadi |
| `data-split` | sarlavha harflarga boʻlinib koʻtariladi (`SplitText`) |
| `data-magnet` | kursorga tortiladi — sahifada **1–2 tadan koʻp emas** |
| `data-parallax="0.14"` | skroll bilan suriladi |

**Asosiy qoida: sahifaning odatiy CSS holati — toʻliq koʻringan holat.**
Yashirish har doim qoʻshimcha shart bilan qoʻshiladi:

- `data-js` — JS bor (`layout.tsx` dagi `BOOT_SCRIPT` birinchi boʻyoqdan
  oldin qoʻyadi). Faqat shunda `[data-reveal]` yashiriladi.
- `data-stage="boot"` — ochilish sahnasi ketyapti. `Motion.tsx` sahna
  tugagach atributni **oʻchiradi**. `"ready"` degan qiymat yoʻq.

### Ehtiyot boʻlish kerak boʻlgan joylar

1. **Bitta xossaga ikki ega boʻlmasin.** `.nav` ning chekinishi faqat CSS
   `--nav-y` orqali boshqariladi — GSAP unga tegmaydi. Avval ikkalasi ham
   `transform` ga yozib, nav ekranda qotib qolgan edi.
2. **`scrub` li ScrollTrigger progress 0 da ham qiymat yozadi.** Shuning
   uchun `fadeWordmarkOnScroll` ochilish sahnasi tugagandan **keyin**
   yaratiladi — aks holda u intro animatsiyasini bosib qoʻyadi.
3. **Qatlam tartibi.** `main` ga `z-index` bermang: u stacking context
   yaratib, DOMINE'ni hero fotosi ostida qoldiradi.
   Tartib: foto (−2) → soya (−1) → DOMINE (0) → matn (auto).
4. **Tugma hoverida toʻldiruvchi qatlam SURILMAYDI.** Avval `::after`
   pastdan yuqoriga sirpanib tugmani toʻldirardi — mijoz uni "bachkana"
   deb baholadi, ustiga matn rangi ham teskari boʻlib ketardi. Hozir:
   rang + chegara + 1px koʻtarilish, oltin tugmada esa faqat yorugʻlik
   `background-position` boʻylab siljiydi. Matn rangi hech qachon
   oʻzgarmaydi — demak oʻqilmay qolish xavfi ham yoʻq.
5. **`prefers-reduced-motion`** — `Motion.tsx` sahnani butunlay
   oʻtkazib yuboradi. `globals.css` oxiridagi blokda `.grain` va
   `.hero__cue-line::after` uchun `animation: none` alohida yozilgan:
   ularning oxirgi kadri boshlangʻich holatdan farq qiladi, davomiylik
   nolga tushsa element sakrab qolardi. Yangi shunday takrorlanuvchi
   animatsiya qoʻshsangiz, uni ham shu roʻyxatga qoʻshing.

## Ikonkalar

`public/icons/*.svg` — qoʻlda chizilgan, bir xil 32×32 toʻr, 1.4 chiziq,
`stroke="currentColor"`. `components/Icon.tsx` ularni build paytida sahifaga
singdiradi, shuning uchun rang meros boʻladi va qoʻshimcha soʻrov ketmaydi.
`<img>` ishlatmang — u `currentColor` ni koʻrmaydi.

## Rasmlar

```bash
npm run images            # generatsiya + siqish
npm run images:optimize   # faqat qayta siqish
```

- `scripts/generate-images.mjs` → `assets/generated/*.png` (xom, git'da yoʻq)
- `scripts/optimize-images.mjs` → `public/images/*` (15–90 KB)
- Kalit: `.env.local` dagi `GEMINI_API_KEY`

| Fayl | Qayerda |
|---|---|
| `hero-still.webp` | hero fotosi |
| `hero-atmosphere.webp` | `.backdrop__haze` tutuni |
| `og-cover.jpg` | Telegram/Instagram ulashuvi |

**Qatʼiy qoida:** promptlarda real brend nomi boʻlmasin. Flakonlar yorliqsiz
generatsiya qilinadi — aks holda bu tovar belgisi buzilishi boʻladi.

## Yakuniy tekshiruv

UI oʻzgargandan keyin Impeccable detektorini bir marta yuriting:

```bash
sh "$IMPECCABLE/scripts/impeccable" detect --json app components
```

`$IMPECCABLE` — `~/.claude/plugins/cache/impeccable/impeccable/<versiya>/skills/impeccable`.
Boʻsh massiv (`[]`) qaytsa — toza.

## SEO

Domen: **domine.uz** (Vercel). Barcha SEO matni `lib/seo.ts` da.

| Fayl | Nima beradi |
|---|---|
| `lib/seo.ts` | sarlavha, tavsif, kalit soʻzlar, `Store` struktura maʼlumoti |
| `app/layout.tsx` | metadata, canonical, OG/Twitter, JSON-LD |
| `app/sitemap.ts` | `/sitemap.xml` |
| `app/robots.ts` | `/robots.txt` |

Qoidalar:

- **Sarlavha ≤ 60 belgi, tavsif ≤ 160 belgi.** Uzunrogʻini Google kesadi.
  Oʻzgartirgandan keyin uzunlikni tekshiring.
- Kalit soʻzlar sahifa **matniga tabiiy singdiriladi**, roʻyxatga tiqilmaydi.
  `keywords` meta tegini Google umuman oʻqimaydi — u faqat Yandex uchun.
- Apostrof ikki xil yoziladi: `Fargʻona` va `Fargona`. Kalit soʻzlarda
  **ikkalasi ham** boʻlishi kerak — odamlar ikki xil yozadi.
- Doʻkon koʻchma, koʻcha manzili yoʻq. Struktura maʼlumotida shuning uchun
  faqat shahar va `areaServed` bor — koʻcha manzilini **oʻylab topmang**.
- Hero surati `alt` siz qolmasin: u sahifadagi yagona mahsulot rasmi.

### Hali qilinmagan (kod bilan hal boʻlmaydi)

1. **Google Business Profile** — mahalliy qidiruvda eng katta taʼsir.
2. **Google Search Console + Yandex Webmaster** — tasdiqlash kodlari
   `layout.tsx` dagi `verification` bloki uchun.
3. Instagram va Telegram profillariga `domine.uz` havolasini qoʻyish.
4. Sahifada ~170 soʻz bor — bu kam. Kontent qoʻshilsa reyting oshadi.

## Tekshirilmagan maʼlumot

- Narxlar yoʻq — barcha CTA Telegramga olib boradi.
- Instagram bio "Premium erkaklar atirlari" deydi, sahifa esa jinsni
  ajratmaydi. Agar doʻkon faqat erkaklar atiriga ixtisoslashgan boʻlsa,
  matnlar shunga moslanishi kerak.
