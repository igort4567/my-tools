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
