/**
 * Форматирует результат конвертации для читаемого вывода.
 * Значащие цифры (а не фиксированное число знаков после запятой) —
 * чтобы одинаково прилично выглядели и большие, и очень маленькие числа
 * (например, миллиграммы в тоннах).
 */
export function formatConversionResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  return new Intl.NumberFormat("ru-RU", { maximumSignificantDigits: 8 }).format(
    n,
  );
}
