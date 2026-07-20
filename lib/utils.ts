export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Склонение существительного после числительного по правилам русского языка.
 * pluralizeRu(1, ["инструмент", "инструмента", "инструментов"]) -> "инструмент"
 * pluralizeRu(3, [...]) -> "инструмента"
 * pluralizeRu(5, [...]) -> "инструментов"
 */
export function pluralizeRu(
  n: number,
  forms: [one: string, few: string, many: string],
): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
