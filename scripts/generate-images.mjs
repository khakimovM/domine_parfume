/**
 * Sahifa uchun rasmlarni Gemini orqali generatsiya qiladi.
 *
 *   node scripts/generate-images.mjs            # yoʻqlarini generatsiya qiladi
 *   node scripts/generate-images.mjs hero og    # faqat shu id'larni
 *   node scripts/generate-images.mjs --force    # borlarini ham qayta chizadi
 *
 * Kalit `.env.local` dagi GEMINI_API_KEY dan olinadi (fayl gitignore'da).
 * Natija: assets/generated/<id>.png — bu xom manba, git'ga tushmaydi.
 * Keyin `node scripts/optimize-images.mjs` uni public/images/ ga siqadi.
 *
 * MUHIM: bu yerda hech qanday real brend nomi yoʻq va boʻlmasligi kerak.
 * Flakonlar — yorliqsiz, brendsiz, faqat shakl va rang.
 */

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "assets/generated";
const MODEL = "gemini-3-pro-image";
const ENDPOINT = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/** Har bir promptga qoʻshiladigan umumiy uslub. */
const STYLE = [
  "Cinematic product photography for a luxury perfume boutique.",
  "Palette strictly limited to: warm near-black (#0E0A07), dark oud brown (#1A1209),",
  "amber glass (#C6862F to #F0B458), champagne gold (#E7D7B4).",
  "Deep shadows, warm single-source rim light, subtle film grain, no harsh highlights.",
  "Absolutely no text, no letters, no logos, no watermarks, no brand names, no labels.",
].join(" ");

const JOBS = [
  {
    id: "hero-atmosphere",
    aspect: "16:9",
    prompt: `${STYLE} PURE ABSTRACT TEXTURE. Photograph of incense smoke drifting in a
      completely empty pitch-dark room. There is NO bottle, NO container, NO vessel, NO
      furniture, NO surface, NO table, NO horizon, NO product — the frame contains ONLY
      wisps of warm amber-lit smoke and a few suspended dust particles against black.
      Think of a long-exposure photograph of smoke alone. The upper-left and centre are
      almost entirely black; a faint amber glow blooms in from the far lower-right corner
      only. Very low contrast, very dark, barely-there. This is a background layer that
      other content will sit on top of.`,
  },
  {
    id: "og-cover",
    aspect: "16:9",
    prompt: `${STYLE} A dark luxury still life, shot slightly from above: three unbranded
      perfume flacons of clear amber and smoky glass with polished gold caps, clustered on
      the RIGHT third of the frame on a matte dark stone surface. The LEFT two thirds is
      almost empty negative space in deep shadow, reserved for a title. Scattered dried oud
      resin chips and a single dried rose petal near the bottles. Warm rim light from the
      right, long soft shadows falling to the left. The stone surface and the darkness form
      ONE seamless continuous scene: no visible vertical edge, no panel, no split, no border
      anywhere in the frame — the shadow must fade smoothly and gradually into the darkness.`,
  },
  {
    id: "texture-resin",
    aspect: "16:9",
    prompt: `${STYLE} Extreme macro of dark oud resin and aged sandalwood chips with faint
      gold mineral flecks, almost abstract, very dark and low contrast, filling the whole
      frame. Reads as a subtle background texture rather than a subject.`,
  },
  // Katalog kartalari uchun sinov: brendsiz flakon renderlari
  {
    id: "bottle-rect",
    aspect: "3:4",
    prompt: `${STYLE} A single unbranded rectangular perfume flacon, clear glass filled with
      deep amber liquid, thick heavy base, brushed gold cylindrical cap, centred and isolated
      on a pure black seamless background. Studio lighting with two soft rim lights on the
      glass edges. Full bottle visible with generous margin. No label of any kind.`,
  },
  {
    id: "bottle-oval",
    aspect: "3:4",
    prompt: `${STYLE} A single unbranded oval teardrop perfume flacon, smoky rose-tinted glass,
      small spherical gold cap, centred and isolated on a pure black seamless background.
      Studio lighting with two soft rim lights on the glass edges. Full bottle visible with
      generous margin. No label of any kind.`,
  },
];

async function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const env = await readFile(".env.local", "utf8");
  const match = env.match(/^GEMINI_API_KEY=(.*)$/m);
  if (!match) throw new Error(".env.local ichida GEMINI_API_KEY topilmadi");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(job, key) {
  const res = await fetch(`${ENDPOINT(MODEL)}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: job.prompt.replace(/\s+/g, " ").trim() }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: job.aspect, imageSize: "2K" },
      },
    }),
  });

  const body = await res.json();
  if (body.error) throw new Error(`${body.error.status}: ${body.error.message}`);

  const parts = body.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((p) => p.inlineData?.data);
  if (!image) {
    const reason = body.candidates?.[0]?.finishReason ?? "sabab nomaʼlum";
    throw new Error(`rasm qaytmadi (${reason})`);
  }

  const buffer = Buffer.from(image.inlineData.data, "base64");
  const path = join(OUT_DIR, `${job.id}.png`);
  await writeFile(path, buffer);
  return { path, bytes: buffer.length };
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const key = await loadKey();
await mkdir(OUT_DIR, { recursive: true });

const queue = JOBS.filter((j) => (only.length ? only.includes(j.id) : true));
console.log(`${queue.length} ta rasm navbatda (model: ${MODEL})\n`);

for (const job of queue) {
  const path = join(OUT_DIR, `${job.id}.png`);
  if (!force && (await exists(path))) {
    console.log(`⏭  ${job.id} — mavjud, oʻtkazib yuborildi`);
    continue;
  }
  process.stdout.write(`⏳ ${job.id} (${job.aspect}) … `);
  try {
    const { bytes } = await generate(job, key);
    console.log(`✓ ${(bytes / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.log(`✗ ${err.message}`);
  }
}
