import type { Tool } from "@/types/tool";

/**
 * Реестр инструментов сайта.
 *
 * Чтобы добавить новый инструмент:
 *   1. Создайте папку app/tools/<slug>/page.tsx с реализацией инструмента
 *      (проще всего скопировать app/tools/percent-calculator как образец).
 *   2. Добавьте объект в массив ниже — карточка на главной и в каталоге
 *      появится автоматически, ничего больше менять не нужно.
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
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
