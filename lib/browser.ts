/**
 * Hodisani kadrga bogʻlaydi: kadr ichida nechta hodisa kelsa ham, callback
 * bir marta va eng oxirgi argumentlar bilan chaqiriladi.
 *
 * Sahifadagi harakatlar GSAP zimmasida — bu faqat `Nav` ning skroll
 * kuzatuvchisi uchun kerak.
 */
export function rafThrottle<T extends unknown[]>(fn: (...args: T) => void) {
  let frame = 0;
  let latest: T;

  const run = (...args: T) => {
    latest = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...latest);
    });
  };

  run.cancel = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  return run;
}
