import { EXTERNAL, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__row">
        <span className="foot__mark">
          {SITE.brand.toUpperCase()} <em>parfumes</em>
        </span>

        <nav className="foot__links" aria-label="Pastki menyu">
          <a href={SITE.telegram.url} {...EXTERNAL}>
            Telegram
          </a>
          <a href={SITE.instagram.url} {...EXTERNAL}>
            Instagram
          </a>
          {SITE.admins.map((admin) => (
            <a className="mono" href={admin.tel} key={admin.tel}>
              {admin.phone}
            </a>
          ))}
        </nav>
      </div>

      {/* Xizmat hududi — haridor uchun ham, mahalliy qidiruv uchun ham kerak */}
      <p className="foot__area">
        {SITE.city} shahri boʻylab tekin yetkazib berish. Toshkent, Andijon,
        Namangan, Qoʻqon, Margʻilon va Oʻzbekistonning boshqa shaharlariga
        pochta orqali joʻnatamiz.
      </p>

      <p className="foot__note">
        {SITE.brandFull} · {SITE.tagline.toLowerCase()} ·{" "}
        <span className="mono">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}
