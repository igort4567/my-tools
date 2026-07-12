# Верстак — архитектура и код проекта

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Каждый инструмент —
папка в `app/tools/`, список инструментов ведётся в одном файле
`lib/tools-config.ts`.

```
verstak/
├── app/
│   ├── layout.tsx                          общий каркас, шрифты, метаданные
│   ├── page.tsx                            главная страница
│   ├── globals.css                         дизайн-токены, стили
│   ├── icon.svg                            favicon
│   └── tools/
│       ├── page.tsx                        каталог /tools
│       └── percent-calculator/page.tsx     пример инструмента
├── components/
│   ├── layout/ (Header, Footer)
│   ├── ui/ (Button, Container)
│   └── tools/ (ToolCard, PercentCalculator)
├── lib/ (tools-config.ts — реестр инструментов, utils.ts)
├── types/tool.ts
└── package.json, tsconfig.json, next.config.mjs, postcss.config.mjs, eslint.config.mjs
```

---

## `package.json`

```json
{
  "name": "verstak",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "^16.2.10",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^16.2.10",
    "tailwindcss": "^4",
    "typescript": "^5.7.0"
  }
}
```

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

## `postcss.config.mjs`

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## `eslint.config.mjs`

```js
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
```

## `app/globals.css`

```css
@import "tailwindcss";

:root {
  --color-paper: #fafbf8;
  --color-paper-alt: #f2f7f3;
  --color-ink: #12271d;
  --color-ink-soft: #4c6156;
  --color-primary: #1f8a4c;
  --color-primary-dark: #146638;
  --color-primary-light: #2fa85f;
  --color-tint: #e8f3ea;
  --color-line: #cfe3d4;
  --color-accent: #a8e063;
}

@theme inline {
  --color-paper: var(--color-paper);
  --color-paper-alt: var(--color-paper-alt);
  --color-ink: var(--color-ink);
  --color-ink-soft: var(--color-ink-soft);
  --color-primary: var(--color-primary);
  --color-primary-dark: var(--color-primary-dark);
  --color-primary-light: var(--color-primary-light);
  --color-tint: var(--color-tint);
  --color-line: var(--color-line);
  --color-accent: var(--color-accent);

  --font-display: var(--font-space-grotesk), "Arial", sans-serif;
  --font-body: var(--font-inter), "Arial", sans-serif;
  --font-mono: var(--font-plex-mono), "Courier New", monospace;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
}

/* Лёгкая "миллиметровка" — фон в клетку, отсылка к чертежам и расчётам */
.bg-graph {
  background-color: var(--color-paper);
  background-image:
    linear-gradient(to right, var(--color-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
  background-size: 36px 36px;
}

.fade-bottom {
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
  mask-image: linear-gradient(to bottom, black, transparent);
}

/* Табло инструмента — используется в PercentCalculator для вывода результата */
.readout {
  background: var(--color-tint);
  border: 1px solid var(--color-line);
  color: var(--color-primary-dark);
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

::selection {
  background: var(--color-accent);
  color: var(--color-ink);
}
```

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Верстак — онлайн-инструменты",
  description:
    "Верстак: калькуляторы и другие онлайн-инструменты для повседневных задач. Без регистрации и рекламы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## `app/page.tsx`

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { PercentCalculator } from "@/components/tools/PercentCalculator";
import { tools } from "@/lib/tools-config";

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

      {/* CATALOG PREVIEW */}
      <section className="border-t border-line">
        <Container className="py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Каталог инструментов
            </h2>
            <span className="font-mono text-xs text-ink-soft">
              {tools.length.toString().padStart(2, "0")} доступно
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}

            <div className="flex flex-col items-start justify-center rounded-lg border border-dashed border-line p-5 text-sm text-ink-soft">
              <span className="font-mono text-xs text-ink-soft">T-02…</span>
              <p className="mt-2">
                Новые инструменты добавляются сюда по мере готовности.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SPECS */}
      <section className="border-t border-line bg-paper-alt">
        <Container className="py-16">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
            Характеристики
          </h2>
          <dl className="divide-y divide-line border-y border-line">
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
```

## `app/tools/page.tsx`

```tsx
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
```

## `app/tools/percent-calculator/page.tsx`

```tsx
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
```

## `components/layout/Header.tsx`

```tsx
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
```

## `components/layout/Footer.tsx`

```tsx
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-ink-soft sm:flex-row">
          <p className="font-mono">
            Верстак © {new Date().getFullYear()}
          </p>
          <p>Инструменты работают прямо в браузере, без сбора данных.</p>
        </div>
      </Container>
    </footer>
  );
}
```

## `components/ui/Container.tsx`

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}
```

## `components/ui/Button.tsx`

```tsx
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
```

## `components/tools/ToolCard.tsx`

```tsx
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
```

## `components/tools/PercentCalculator.tsx`

```tsx
"use client";

import { useId, useState } from "react";

export function PercentCalculator({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState("500");
  const [percent, setPercent] = useState("15");
  const valueId = useId();
  const percentId = useId();

  const numericValue = parseFloat(value.replace(",", "."));
  const numericPercent = parseFloat(percent.replace(",", "."));
  const hasResult = !Number.isNaN(numericValue) && !Number.isNaN(numericPercent);
  const result = hasResult ? (numericValue * numericPercent) / 100 : null;

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={valueId}
            className="mb-1.5 block font-mono text-xs text-ink-soft"
          >
            число
          </label>
          <input
            id={valueId}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-ink outline-none focus:border-primary"
          />
        </div>
        <div>
          <label
            htmlFor={percentId}
            className="mb-1.5 block font-mono text-xs text-ink-soft"
          >
            процент, %
          </label>
          <input
            id={percentId}
            type="text"
            inputMode="decimal"
            value={percent}
            onChange={(event) => setPercent(event.target.value)}
            className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-ink outline-none focus:border-primary"
          />
        </div>
      </div>

      <div
        className={`readout mt-3 flex items-center justify-between rounded-md px-4 ${
          compact ? "py-3" : "py-4"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-wide opacity-70">
          результат
        </span>
        <span className="font-mono text-2xl font-medium">
          {result === null ? "—" : result.toLocaleString("ru-RU", { maximumFractionDigits: 4 })}
        </span>
      </div>
    </div>
  );
}
```

## `lib/tools-config.ts`

```ts
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
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
```

## `lib/utils.ts`

```ts
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
```

## `types/tool.ts`

```ts
export interface Tool {
  /** Уникальный слаг — используется в URL: /tools/{slug} и должен совпадать
   *  с именем папки внутри app/tools/ */
  slug: string;
  /** Каталожный номер инструмента, например "T-01". Придумывается один раз
   *  и не меняется — на него могут ссылаться извне. */
  code: string;
  /** Название инструмента, отображается в карточке и на странице */
  title: string;
  /** Короткое описание для карточки в каталоге (1 предложение) */
  description: string;
  /** Категория для группировки/фильтрации в будущем */
  category: string;
}
```

