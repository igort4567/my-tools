import type { Category, Tool } from "@/types/tool";

/**
 * Категории инструментов. Заголовок совпадает с полем `category` у Tool —
 * по нему на странице /tools инструменты группируются в секции с id={slug}.
 */
export const categories: Category[] = [
  {
    slug: "kalkulyatory",
    title: "Калькуляторы",
    description: "Расчёты с деньгами: проценты, кредиты, вклады.",
  },
  {
    slug: "konvertory",
    title: "Конверторы",
    description: "Перевод величин между единицами измерения.",
  },
];

/**
 * Реестр инструментов сайта.
 *
 * Чтобы добавить новый инструмент:
 *   1. Создайте папку app/tools/<slug>/page.tsx с реализацией инструмента
 *      (проще всего скопировать app/tools/percent-calculator как образец).
 *   2. Добавьте объект в массив ниже — карточка в каталоге появится
 *      автоматически, ничего больше менять не нужно. Поле `category`
 *      должно совпадать с title одной из категорий выше.
 */
export const tools: Tool[] = [
  {
    slug: "percent-calculator",
    code: "T-01",
    title: "Калькулятор процентов",
    description: "Считает, сколько составляет число X процентов от числа Y.",
    category: "Калькуляторы",
  },
  {
    slug: "loan-calculator",
    code: "T-02",
    title: "Калькулятор кредита",
    description: "Считает ежемесячный платёж, переплату и итоговую сумму по кредиту.",
    category: "Калькуляторы",
  },
  {
    slug: "deposit-calculator",
    code: "T-03",
    title: "Калькулятор вклада",
    description: "Считает доход по вкладу с ежемесячной капитализацией процентов.",
    category: "Калькуляторы",
  },
  {
    slug: "price-calculator",
    code: "T-13",
    title: "Калькулятор цены",
    description: "Считает итоговую цену после последовательных скидок и наценок.",
    category: "Калькуляторы",
  },
  {
    slug: "length-converter",
    code: "T-04",
    title: "Конвертер длины",
    description: "Переводит между миллиметрами, метрами, милями, дюймами и другими единицами длины.",
    category: "Конверторы",
  },
  {
    slug: "weight-converter",
    code: "T-05",
    title: "Конвертер веса",
    description: "Переводит между граммами, килограммами, тоннами, фунтами и унциями.",
    category: "Конверторы",
  },
  {
    slug: "currency-converter",
    code: "T-06",
    title: "Конвертер валют",
    description: "Пересчёт между рублём, долларом, евро и другими валютами по текущему курсу.",
    category: "Конверторы",
  },
  {
    slug: "temperature-converter",
    code: "T-07",
    title: "Конвертер температуры",
    description: "Переводит между градусами Цельсия, Фаренгейта и Кельвина.",
    category: "Конверторы",
  },
  {
    slug: "speed-converter",
    code: "T-08",
    title: "Конвертер скорости",
    description: "Переводит между км/ч, м/с, милями в час и узлами.",
    category: "Конверторы",
  },
  {
    slug: "time-converter",
    code: "T-09",
    title: "Конвертер времени",
    description: "Переводит между секундами, минутами, часами, сутками, неделями, месяцами и годами.",
    category: "Конверторы",
  },
  {
    slug: "area-converter",
    code: "T-10",
    title: "Конвертер площади",
    description: "Переводит между квадратными метрами, сотками, гектарами и акрами.",
    category: "Конверторы",
  },
  {
    slug: "volume-converter",
    code: "T-11",
    title: "Конвертер объёма",
    description: "Переводит между миллилитрами, литрами, кубометрами и галлонами.",
    category: "Конверторы",
  },
  {
    slug: "data-converter",
    code: "T-12",
    title: "Конвертер цифровых данных",
    description: "Переводит между битами, байтами, килобайтами, мегабайтами, гигабайтами и терабайтами.",
    category: "Конверторы",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categoryTitle: string): Tool[] {
  return tools.filter((tool) => tool.category === categoryTitle);
}
