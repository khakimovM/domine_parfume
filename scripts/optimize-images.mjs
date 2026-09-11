/**
 * Generatsiya qilingan PNG'larni web uchun tayyorlaydi.
 *
 *   node scripts/optimize-images.mjs
 *
 * Manba : assets/generated/<id>.png   (git'ga tushmaydi, skriptdan qayta olinadi)
 * Natija: public/images/<id>.<ext>    (sahifa aynan shularni yuklaydi)
 *
 * OG rasm atayin JPEG: baʼzi ijtimoiy tarmoq skraperlari WebP'ni oʻqimaydi.
 */

import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "assets/generated";
const OUT = "public/images";

/**
 * Manba id → chiqish fayllari. Bitta manbadan bir nechta variant olinadi
 * (masalan og-cover.png dan ham ulashuv rasmi, ham hero foni).
 * Roʻyxatda yoʻq manba tashlab ketiladi.
 */
const RECIPES = {
  "og-cover": [
    { as: "og-cover", width: 1200, height: 630, format: "jpeg", quality: 84 },
    { as: "hero-still", width: 2200, format: "webp", quality: 72 },
  ],
  "hero-atmosphere": [{ as: "hero-atmosphere", width: 1920, format: "webp", quality: 70 }],
};

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png"));
if (!files.length) {
  console.log(`${SRC} boʻsh — avval: node scripts/generate-images.mjs`);
  process.exit(0);
}

for (const file of files) {
  const id = parse(file).name;
  const recipes = RECIPES[id];
  if (!recipes) {
    console.log(`⏭  ${id} — retsept yoʻq, oʻtkazib yuborildi`);
    continue;
  }

  const from = join(SRC, file);
  const before = (await stat(from)).size;

  for (const recipe of recipes) {
    const ext = recipe.format === "jpeg" ? "jpg" : recipe.format;
    const to = join(OUT, `${recipe.as}.${ext}`);

    const pipeline = sharp(from).resize({
      width: recipe.width,
      height: recipe.height,
      fit: recipe.height ? "cover" : "inside",
      withoutEnlargement: true,
    });

    if (recipe.format === "jpeg") {
      await pipeline.jpeg({ quality: recipe.quality, mozjpeg: true }).toFile(to);
    } else {
      await pipeline.webp({ quality: recipe.quality }).toFile(to);
    }

    const after = (await stat(to)).size;
    console.log(
      `✓ ${recipe.as.padEnd(18)} ${(before / 1024 / 1024).toFixed(1)} MB → ${(
        after / 1024
      ).toFixed(0)} KB`
    );
  }
}
