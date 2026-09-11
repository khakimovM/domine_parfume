import { EXTERNAL, SITE } from "@/lib/site";
import { InstagramIcon, PhoneIcon, TelegramIcon } from "./icons";

const CHANNELS = [
  {
    icon: <TelegramIcon className="ccard__ic" />,
    k: "Telegram kanal",
    v: SITE.telegram.handle,
    href: SITE.telegram.url,
    external: true,
  },
  {
    icon: <InstagramIcon className="ccard__ic" />,
    k: "Instagram",
    v: SITE.instagram.handle,
    href: SITE.instagram.url,
    external: true,
  },
  ...SITE.admins.map((admin) => ({
    icon: <PhoneIcon className="ccard__ic" />,
    k: admin.label,
    v: admin.phone,
    href: admin.tel,
    external: false,
  })),
];

export default function Contact() {
  return (
    <section className="section section--contact" id="aloqa">
      <div className="section__head section__head--center">
        <h2 className="h2" data-reveal>
          Hid nomini yozing —<br />
          <em>narxini darhol aytamiz.</em>
        </h2>
      </div>

      <div className="cta" data-reveal>
        <a
          className="btn btn--gold btn--lg"
          href={SITE.telegram.url}
          {...EXTERNAL}
          data-magnet
        >
          <TelegramIcon className="ic" />
          <span>Telegramda yozish</span>
        </a>
      </div>

      <div className="ccards">
        {CHANNELS.map((c) => (
          <a
            className="ccard"
            key={c.href + c.k}
            href={c.href}
            data-reveal
            {...(c.external ? EXTERNAL : {})}
          >
            {c.icon}
            <span className="ccard__k">{c.k}</span>
            <span className="ccard__v mono">{c.v}</span>
            <span className="ccard__go" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
