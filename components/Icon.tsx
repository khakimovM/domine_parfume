import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * `public/icons/` dagi SVG faylni build paytida sahifaga singdiradi.
 *
 * Nega `<img>` emas: ikonkalar `stroke="currentColor"` ishlatadi — shunda
 * ular boʻlim rangini meros qilib oladi va hoverda oʻzgaradi. `<img>`
 * ichidagi SVG tashqi rangni koʻrmaydi. Singdirilganda qoʻshimcha soʻrov
 * ham ketmaydi, fayllar esa alohida va tahrirlash oson boʻlib qoladi.
 */
export default async function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const svg = await readFile(
    join(process.cwd(), "public", "icons", `${name}.svg`),
    "utf8"
  );

  return (
    <span
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
