import Link from "next/link";
import type { ReactNode } from "react";
import type { Category } from "@/types/tool";
import { pluralizeRu } from "@/lib/utils";

export function CategoryCard({
  category,
  count,
  icon,
}: {
  category: Category;
  count: number;
  icon: ReactNode;
}) {
  return (
    <Link
      href={`/tools#${category.slug}`}
      className="group flex flex-col justify-between gap-8 rounded-lg border border-line bg-paper p-6 transition-colors hover:border-primary hover:bg-tint"
    >
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-tint text-primary-dark transition-colors group-hover:bg-paper">
          {icon}
        </div>
        <h3 className="font-display text-xl font-semibold text-ink">
          {category.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-soft">{category.description}</p>
      </div>

      <div className="flex items-center justify-between font-mono text-sm">
        <span className="text-ink-soft">
          {count} {pluralizeRu(count, ["инструмент", "инструмента", "инструментов"])}
        </span>
        <span className="text-primary">открыть →</span>
      </div>
    </Link>
  );
}
