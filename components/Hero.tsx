import Image from "next/image";
import { SITE } from "@/lib/site";
import { TelegramIcon } from "./icons";

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Mahsulot fotosi — chizma emas, shuning uchun ishonarli */}
      <div className="hero__photo">
        {/* Sahifadagi yagona mahsulot surati — rasm qidiruvida chiqishi
            uchun alt boʻsh qoldirilmaydi. */}
        <Image
          src="/images/hero-still.webp"
          alt={`Atir flakonlari — ${SITE.brandFull}, ${SITE.city}`}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero__copy">
        <h1 className="hero__title" data-split>
          Koʻchib yuruvchi
          <br />
          <em>atirlar doʻkoni</em>
        </h1>

        <p className="hero__lead" data-hero>
          Original atirlar va sifatli lux analoglar. {SITE.city} boʻylab tekin
          yetkazamiz, boshqa shaharlarga pochta bilan joʻnatamiz.
        </p>

        <div className="hero__actions" data-hero>
          <a
            className="btn btn--gold"
            href={SITE.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-magnet
          >
            <TelegramIcon className="ic" />
            <span>Telegramda yozish</span>
          </a>
          <a className="btn" href={SITE.admins[0].tel}>
            <span>{SITE.admins[0].phone}</span>
          </a>
        </div>
      </div>

      <a className="hero__cue" href="#ishonch" data-hero aria-label="Pastga oʻtish">
        <span className="hero__cue-line" />
        <span>pastga</span>
      </a>
    </section>
  );
}
