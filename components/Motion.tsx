"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SEEN_KEY = "domine:intro-seen";

/**
 * Sahifadagi BARCHA harakat shu yerda. Boshqa komponentlar faqat
 * belgi qoʻyadi:
 *
 *   data-reveal   — skrollda ochiladi
 *   data-hero     — ochilish sahnasidan keyin chiqadi
 *   data-magnet   — kursorga tortiladi (sahifada 1–2 tadan koʻp emas)
 *   data-parallax — skroll bilan sekin suriladi
 *
 * Harakat kamaytirilgan boʻlsa hamma narsa darhol koʻrinadi.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let split: SplitText | undefined;

    const endStage = () => {
      delete root.dataset.stage;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* private rejimda yopiq boʻlishi mumkin */
      }
    };

    // ── Harakatsiz rejim: hech narsa yashirin qolmasin ──────────────
    if (reduced) {
      endStage();
      gsap.set("[data-reveal], [data-hero]", { opacity: 1, y: 0, clearProps: "all" });
      document
        .querySelectorAll<SVGSVGElement>("svg")
        .forEach((svg) => svg.pauseAnimations?.());
      return;
    }

    const ctx = gsap.context(() => {
      // Sarlavhani qatorlarga boʻlish shrift yuklangach toʻgʻri ishlaydi
      const title = document.querySelector<HTMLElement>("[data-split]");

      // ── Skrollda ochilish ────────────────────────────────────────
      gsap.set("[data-reveal]", { y: 24 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      // ── Skroll bilan suriluvchi qatlamlar ────────────────────────
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const depth = Number(el.dataset.parallax) || 0.1;
        gsap.to(el, {
          y: () => window.innerHeight * depth,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.6, invalidateOnRefresh: true },
        });
      });

      // ── DOMINE hero'da kuchli, pastda esa xiraroq ────────────────
      // Foto ustida koʻrinishi uchun quyuqroq; boʻlimlar matni ostida esa
      // oʻqishga xalaqit bermasligi kerak.
      //
      // Sahna tugagandan KEYIN yaratiladi: scrub'li tween progress 0 da ham
      // qiymat yozadi va ochilish animatsiyasining opacity'sini bosib qolardi.
      const fadeWordmarkOnScroll = () => {
        const hero = document.querySelector(".hero");
        if (!hero) return;
        gsap.to(".wordmark__inner", {
          opacity: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      };

      // ── Kursorga tortiluvchi tugma ───────────────────────────────
      document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          // 0.3 — element oʻz maydonidan chiqib ketmasligi uchun cheklov
          xTo((e.clientX - r.left - r.width / 2) * 0.3);
          yTo((e.clientY - r.top - r.height / 2) * 0.3);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("blur", onLeave);
      });

      // ── Ochilish sahnasi ─────────────────────────────────────────
      if (root.dataset.stage !== "boot") {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        fadeWordmarkOnScroll();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          endStage();
          fadeWordmarkOnScroll();
        },
      });

      tl.set(".wordmark__inner", { scale: 0.4, opacity: 1 })
        .to(".curtain__rule", { scaleX: 1, duration: 1.1, ease: "power2.out" }, 0)
        .from(".wm-l", {
          yPercent: 118,
          duration: 1.05,
          stagger: 0.07,
          ease: "expo.out",
        }, 0.18)
        .from(".wordmark__sub", { opacity: 0, y: 14, duration: 0.5 }, 0.85)
        // soʻz kattalashib orqa fonga oʻtadi
        .to(".wordmark__sub", { opacity: 0, duration: 0.35 }, 1.75)
        .to(".curtain__rule", { opacity: 0, duration: 0.4 }, 1.75)
        // 0.16 — CSS'dagi odatiy holat bilan bir xil boʻlishi shart
        .to(".wordmark__inner", {
          scale: 1,
          opacity: 0.16,
          duration: 1.5,
          ease: "expo.inOut",
        }, 1.8)
        .to(".curtain", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 1.95)
        .from(".hero__photo", { opacity: 0, scale: 1.14, duration: 1.7, ease: "power2.out" }, 2.05);
      // `.nav` atayin bu yerda yoʻq — uni CSS `--nav-y` boshqaradi.

      if (title) {
        split = SplitText.create(title, { type: "chars,words,lines", mask: "lines" });
        tl.from(split.chars, {
          yPercent: 60,
          opacity: 0,
          duration: 0.75,
          stagger: 0.014,
          ease: "expo.out",
        }, 2.4);
      }

      tl.to("[data-hero]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      }, 2.5);

      // Kutib turishni xohlamaganlar uchun
      const skip = () => tl.progress(1);
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      events.forEach((e) => window.addEventListener(e, skip, { passive: true, once: true }));
    });

    // Rasmlar yuklangach ScrollTrigger oʻlchovlari yangilanadi
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("load", onLoad);
      split?.revert();
      ctx.revert();
    };
  }, []);

  return null;
}
