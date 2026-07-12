import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PercentCalculator } from "@/components/tools/PercentCalculator";
import { getToolBySlug } from "@/lib/tools-config";

const tool = getToolBySlug("percent-calculator")!;

export const metadata: Metadata = {
  title: `${tool.title} — Верстак`,
  description: tool.description,
};

export default function PercentCalculatorPage() {
  return (
    <Container className="py-16">
      <Link
        href="/tools"
        className="font-mono text-xs text-ink-soft transition-colors hover:text-primary"
      >
        ← ко всем инструментам
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-xs text-primary-dark">
          {tool.code}
        </span>
        <span className="rounded-full bg-tint px-2.5 py-0.5 font-mono text-xs text-primary-dark">
          {tool.category}
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        {tool.title}
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">{tool.description}</p>

      <div className="mt-8 max-w-md">
        <PercentCalculator />
      </div>
    </Container>
  );
}
