import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const styles = {
  primary:
    "bg-primary text-paper hover:bg-primary-dark",
  ghost:
    "border border-line text-ink hover:border-primary hover:text-primary",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors";

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, styles[variant], className)}
    >
      {children}
    </Link>
  );
}
