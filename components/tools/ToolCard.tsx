import Link from "next/link";
import type { Tool } from "@/types/tool";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between gap-6 rounded-lg border border-line bg-paper p-5 transition-colors hover:border-primary hover:bg-tint"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-soft">
            {tool.code}
          </span>
          <span className="rounded-full bg-tint px-2.5 py-0.5 font-mono text-xs text-primary-dark group-hover:bg-paper">
            {tool.category}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">
          {tool.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-soft">{tool.description}</p>
      </div>

      <span className="font-mono text-sm text-primary">
        открыть →
      </span>
    </Link>
  );
}
