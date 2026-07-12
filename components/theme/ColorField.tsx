"use client";

import { useId, useRef } from "react";

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <label htmlFor={inputId} className="text-sm text-ink">
        {label}
      </label>

      <div className="relative h-8 w-11">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-8 w-11 rounded border border-line"
          style={{ backgroundColor: value }}
          aria-label={`Выбрать цвет: ${label}, сейчас ${value}`}
        />
        {/* Настоящий color-picker: визуально скрыт, но остаётся в DOM
            и открывается программно по клику на видимый прямоугольник выше.
            Так надёжнее, чем полагаться на клик по самому нативному input —
            в некоторых браузерах он может не срабатывать из-за стилизации. */}
        <input
          ref={inputRef}
          id={inputId}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
      </div>
    </div>
  );
}
