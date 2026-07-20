export type ConversionUnit = {
  id: string;
  label: string;
  /** Переводит значение в базовую единицу категории */
  toBase: (value: number) => number;
  /** Переводит значение из базовой единицы категории в эту единицу */
  fromBase: (value: number) => number;
};

/**
 * Хелпер для единиц, связанных с базовой линейной зависимостью
 * (умножение/деление на коэффициент) — подходит для всего, кроме температуры.
 */
export function linearUnit(
  id: string,
  label: string,
  factor: number,
): ConversionUnit {
  return {
    id,
    label,
    toBase: (value) => value * factor,
    fromBase: (value) => value / factor,
  };
}
