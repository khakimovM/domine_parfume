import { SITE } from "@/lib/site";

const LETTERS = SITE.brand.toUpperCase().split("");

/**
 * Ochilish pardasi va orqa fondagi DOMINE yozuvi — faqat belgilash.
 * Harakatni `components/Motion.tsx` boshqaradi, shuning uchun bu
 * komponent serverda render boʻladi va mijozga JS yubormaydi.
 */
export default function BrandStage() {
  return (
    <>
      <div className="curtain" aria-hidden="true">
        <span className="curtain__rule" />
      </div>

      <div className="backdrop" aria-hidden="true">
        <div className="backdrop__haze" />
        <div className="wordmark">
          <div className="wordmark__drift" data-parallax="0.14">
            <div className="wordmark__inner">
              <div className="wordmark__word">
                {LETTERS.map((letter, i) => (
                  <span className="wm-mask" key={i}>
                    <span className="wm-l">{letter}</span>
                  </span>
                ))}
              </div>
              <div className="wordmark__sub">Parfumes · {SITE.city}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
