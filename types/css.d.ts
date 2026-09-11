import "react";

/**
 * React'ning `CSSProperties` tipi `--foo` kalitlarini bilmaydi, shuning uchun
 * har bir `style={{ "--i": i }}` uchun `as React.CSSProperties` yozishga toʻgʻri
 * kelardi. Shu qoʻshimcha bilan cast'lar kerak emas, oddiy CSS xossalari esa
 * tekshirilishda qoladi.
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
