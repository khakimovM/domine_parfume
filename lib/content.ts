import { SITE } from "./site";

/**
 * Sahifadagi boʻlim matnlari. Yangi qadam qoʻshish uchun massivga element
 * qoʻshish kifoya — komponent oʻzgarmaydi.
 */

export type Step = {
  n: string;
  /** public/icons/ dagi fayl nomi (kengaytmasiz) */
  icon: string;
  title: string;
  text: string;
};

/** Haqiqiy ketma-ketlik — shuning uchun raqamlangan. */
export const STEPS: Step[] = [
  {
    n: "01",
    icon: "step-choose",
    title: "Atirni ayting",
    text: "Qidirayotgan atiringiz nomini yozing yoki qanday atir yoqishini ayting — biz tanlab beramiz.",
  },
  {
    n: "02",
    icon: "step-write",
    title: "Narxni bilib oling",
    text: "Admin darhol narx va mavjudligini aytadi. Manzilingizni yuborsangiz kifoya.",
  },
  {
    n: "03",
    icon: "step-receive",
    title: "Qabul qilib oling",
    text: `${SITE.city} ichida oʻzimiz olib boramiz. Boshqa shaharga pochta bilan joʻnatamiz.`,
  },
];
