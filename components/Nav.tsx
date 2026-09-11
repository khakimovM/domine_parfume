"use client";

import { useEffect, useRef, useState } from "react";
import { rafThrottle } from "@/lib/browser";
import { EXTERNAL, NAV_LINKS, SITE } from "@/lib/site";
import { TelegramIcon } from "./icons";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  // Pastga skroll qilganda menyu chekinadi, yuqoriga qaytganda qaytadi.
  // Bu holat React'ga kirmaydi: har bir yoʻnalish oʻzgarishida butun menyuni
  // qayta chizish shart emas, sinf almashtirish kifoya.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = rafThrottle(() => {
      const y = window.scrollY;
      header.classList.toggle("is-stuck", y > 24);
      header.classList.toggle("is-hidden", y > 320 && y > lastY.current);
      lastY.current = y;
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, []);

  // Ekran kengaysa, mobil menyu ochiq qolib ketmasin — burger yoʻqoladi,
  // menyu esa sahifani bekitib turaveradi.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 861px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  // Menyu ochiq boʻlganda sahifa qimirlamaydi, Escape yopadi.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Menyu ochilganda chekinib qolgan sarlavhani qaytaramiz.
  useEffect(() => {
    if (open) headerRef.current?.classList.remove("is-hidden");
  }, [open]);

  return (
    <>
      <header className="nav" ref={headerRef}>
        <a className="nav__logo" href="#top" aria-label={`${SITE.brandFull}, sahifa boshi`}>
          <span className="nav__logo-word">{SITE.brand.toUpperCase()}</span>
          <span className="nav__logo-sub">parfumes</span>
        </a>

        <nav className="nav__links" aria-label="Asosiy menyu">
          {NAV_LINKS.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--sm nav__cta"
          href={SITE.telegram.url}
          {...EXTERNAL}
        >
          <TelegramIcon className="ic" />
          <span>Telegram</span>
        </a>

        <button
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </header>

      <div
        className={open ? "menu is-open" : "menu"}
        id="mobile-menu"
        inert={!open}
      >
        <nav className="menu__links" aria-label="Mobil menyu">
          {NAV_LINKS.map((link, i) => (
            <a
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
              style={{ "--i": i }}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="menu__foot">
          {SITE.admins.map((admin) => (
            <a href={admin.tel} key={admin.tel} className="mono">
              {admin.phone}
            </a>
          ))}
          <a href={SITE.telegram.url} {...EXTERNAL}>
            {SITE.telegram.handle}
          </a>
        </div>
      </div>
    </>
  );
}
