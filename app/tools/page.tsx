import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ToolCard } from "@/components/tools/ToolCard";
import { categories, tools } from "@/lib/tools-config";

export const metadata: Metadata = {
  title: "Каталог инструментов — Верстак",
  description: "Все онлайн-инструменты Верстака в одном месте.",
};

export default function ToolsPage() {
  return (
    <Container className="py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-primary-dark">
        каталог
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Все инструменты
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        Полный список того, что уже можно посчитать или сконвертировать на
        Верстаке.
      </p>

      <div className="mt-12 space-y-14">
        {categories.map((category) => {
          const categoryTools = tools.filter(
            (tool) => tool.category === category.title,
          );
          if (categoryTools.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug} className="scroll-mt-24">
              <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-line-strong pb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {category.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {category.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-ink-soft">
                  {categoryTools.length.toString().padStart(2, "0")} доступно
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
