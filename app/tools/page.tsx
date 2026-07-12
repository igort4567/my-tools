import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools-config";

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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </Container>
  );
}
