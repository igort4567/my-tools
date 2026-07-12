import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-paper">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7.5L5.2 10.5L12 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Верстак
            </span>
          </Link>

          <nav className="flex items-center gap-6 font-mono text-sm text-ink-soft">
            <Link href="/" className="transition-colors hover:text-primary">
              главная
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-primary"
            >
              инструменты
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
