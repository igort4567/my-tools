import { linearUnit, type ConversionUnit } from "@/lib/converters/types";

/** База: метр */
export const lengthUnits: ConversionUnit[] = [
  linearUnit("mm", "миллиметры, мм", 0.001),
  linearUnit("cm", "сантиметры, см", 0.01),
  linearUnit("m", "метры, м", 1),
  linearUnit("km", "километры, км", 1000),
  linearUnit("in", "дюймы, in", 0.0254),
  linearUnit("ft", "футы, ft", 0.3048),
  linearUnit("yd", "ярды, yd", 0.9144),
  linearUnit("mi", "мили, mi", 1609.344),
];

/** База: килограмм */
export const weightUnits: ConversionUnit[] = [
  linearUnit("mg", "миллиграммы, мг", 0.000001),
  linearUnit("g", "граммы, г", 0.001),
  linearUnit("kg", "килограммы, кг", 1),
  linearUnit("t", "тонны, т", 1000),
  linearUnit("lb", "фунты, lb", 0.45359237),
  linearUnit("oz", "унции, oz", 0.028349523125),
];

/** База: градус Цельсия. Формулы не линейны от нуля, поэтому заданы напрямую */
export const temperatureUnits: ConversionUnit[] = [
  { id: "c", label: "Цельсий, °C", toBase: (v) => v, fromBase: (v) => v },
  {
    id: "f",
    label: "Фаренгейт, °F",
    toBase: (v) => ((v - 32) * 5) / 9,
    fromBase: (v) => (v * 9) / 5 + 32,
  },
  {
    id: "k",
    label: "Кельвин, K",
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15,
  },
];

/** База: метр в секунду */
export const speedUnits: ConversionUnit[] = [
  linearUnit("ms", "метры в секунду, м/с", 1),
  linearUnit("kmh", "километры в час, км/ч", 1000 / 3600),
  linearUnit("mph", "мили в час, mph", 0.44704),
  linearUnit("kn", "узлы, kn", 0.5144444444444445),
  linearUnit("fts", "футы в секунду, ft/s", 0.3048),
];

/** База: секунда. Месяц и год — усреднённые значения (365,2425 дня в году) */
export const timeUnits: ConversionUnit[] = [
  linearUnit("s", "секунды", 1),
  linearUnit("min", "минуты", 60),
  linearUnit("h", "часы", 3600),
  linearUnit("d", "сутки", 86400),
  linearUnit("w", "недели", 604800),
  linearUnit("mo", "месяцы, ср.", 2629746),
  linearUnit("y", "годы, ср.", 31556952),
];

/** База: квадратный метр */
export const areaUnits: ConversionUnit[] = [
  linearUnit("mm2", "мм²", 0.000001),
  linearUnit("cm2", "см²", 0.0001),
  linearUnit("m2", "м²", 1),
  linearUnit("sotka", "сотки", 100),
  linearUnit("ha", "гектары, га", 10000),
  linearUnit("km2", "км²", 1000000),
  linearUnit("acre", "акры", 4046.8564224),
];

/** База: литр */
export const volumeUnits: ConversionUnit[] = [
  linearUnit("ml", "миллилитры, мл", 0.001),
  linearUnit("cm3", "см³", 0.001),
  linearUnit("l", "литры, л", 1),
  linearUnit("m3", "м³", 1000),
  linearUnit("usgal", "галлоны США", 3.785411784),
  linearUnit("uspt", "пинты США", 0.473176473),
];

/** База: байт. Используется двоичная система (1 КБ = 1024 байт) */
export const dataUnits: ConversionUnit[] = [
  linearUnit("bit", "биты", 0.125),
  linearUnit("byte", "байты", 1),
  linearUnit("kb", "килобайты, КБ", 1024),
  linearUnit("mb", "мегабайты, МБ", 1024 ** 2),
  linearUnit("gb", "гигабайты, ГБ", 1024 ** 3),
  linearUnit("tb", "терабайты, ТБ", 1024 ** 4),
];
