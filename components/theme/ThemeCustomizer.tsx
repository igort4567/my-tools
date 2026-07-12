"use client";

import { useEffect, useRef, useState } from "react";
import { ColorField } from "@/components/theme/ColorField";
import {
  DEFAULT_BACKGROUND,
  DEFAULT_LINE,
  applyThemeVars,
  buildBackgroundVars,
  buildLineVars,
  loadStoredTheme,
  resetTheme,
  saveTheme,
} from "@/lib/theme";

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND);
  const [line, setLine] = useState(DEFAULT_LINE);
  const panelRef = useRef<HTMLDivElement>(null);

  // Подхватываем ранее сохранённый выбор (значения самих переменных
  // применяет THEME_INIT_SCRIPT ещё до отрисовки — здесь только синхронизируем
  // значения для инпутов).
  useEffect(() => {
    const stored = loadStoredTheme();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBackground(stored.background);
      setLine(stored.line);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function handleBackgroundChange(hex: string) {
    setBackground(hex);
    applyThemeVars(buildBackgroundVars(hex));
    saveTheme(hex, line);
  }

  function handleLineChange(hex: string) {
    setLine(hex);
    applyThemeVars(buildLineVars(hex));
    saveTheme(background, hex);
  }

  function handleReset() {
    setBackground(DEFAULT_BACKGROUND);
    setLine(DEFAULT_LINE);
    resetTheme();
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-1.5 font-mono text-sm text-ink-soft transition-colors hover:text-primary"
      >
        <span
          className="h-3 w-3 rounded-full border border-line"
          style={{
            background: `linear-gradient(135deg, ${background} 50%, ${line} 50%)`,
          }}
        />
        тема
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-20 mt-2 w-60 rounded-lg border border-line bg-paper p-4 shadow-lg"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
            палитра
          </p>

          <ColorField
            label="Фон"
            value={background}
            onChange={handleBackgroundChange}
          />

          <ColorField label="Линии" value={line} onChange={handleLineChange} />

          <button
            type="button"
            onClick={handleReset}
            className="mt-3 w-full rounded-md border border-line py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-primary hover:text-primary"
          >
            сбросить по умолчанию
          </button>
        </div>
      )}
    </div>
  );
}
