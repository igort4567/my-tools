import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { CalculatorIcon, ConverterIcon } from "@/components/tools/icons";
import { PercentCalculator } from "@/components/tools/PercentCalculator";
import { categories, tools } from "@/lib/tools-config";

const categoryIcons: Record<string, React.ReactNode> = {
  kalkulyatory: <CalculatorIcon />,
  konvertory: <ConverterIcon />,
};

const specs: Array<[string, string]> = [
  ["Стоимость", "Бесплатно"],
  ["Регистрация", "Не требуется"],
  ["Данные", "Не сохраняются на сервере"],
  ["Запуск", "Мгновенно, прямо в браузере"],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-graph fade-bottom absolute inset-0 -z-10" />

        <Container className="py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary-dark">
                онлайн-инструменты
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Инструменты, которые
                <br /> под рукой в любой момент
              </h1>
              <p className="mt-5 max-w-md text-ink-soft">
                Верстак — набор простых калькуляторов и конвертеров.
                Без регистрации, без рекламы: открыли инструмент, получили
                результат, закрыли вкладку.
              </p>
              <div className="mt-8 flex gap-3">
                <Button href="/tools">Открыть каталог</Button>
                <Button href="/tools/percent-calculator" variant="ghost">
                  Калькулятор процентов
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-xs text-ink-soft">
                попробуйте прямо сейчас →
              </p>
              <PercentCalculator />
            </div>
          </div>
        </Container>
      </section>

      {/* КАТЕГОРИИ */}
      <section className="border-t-2 border-line-strong">
        <Container className="py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Категории
            </h2>
            <span className="font-mono text-xs text-ink-soft">
              {categories.length.toString().padStart(2, "0")} доступно
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={tools.filter((tool) => tool.category === category.title).length}
                icon={categoryIcons[category.slug]}
              />
            ))}

            <div className="flex flex-col items-start justify-center rounded-lg border border-dashed border-line p-6 text-sm text-ink-soft">
              <span className="font-mono text-xs text-ink-soft">···</span>
              <p className="mt-2">
                Новые категории и инструменты добавляются по мере готовности.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SPECS */}
      <section className="border-t-2 border-line-strong bg-paper-alt">
        <Container className="py-16">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
            Характеристики
          </h2>
          <dl className="divide-y-2 divide-line-strong border-y-2 border-line-strong">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between py-3.5"
              >
                <dt className="font-mono text-sm text-ink-soft">{label}</dt>
                <dd className="font-mono text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
