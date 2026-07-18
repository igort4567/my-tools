"use client";

import { useId } from "react";

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const inputId = useId();

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <label htmlFor={inputId} className="text-sm text-ink">
        {label}
      </label>

      {/* Сам нативный color-picker — видимый прямоугольник, по которому кликают
          напрямую. Раньше он был скрыт (opacity-0 + aria-hidden) и открывался
          программным .click() по отдельной кнопке поверх — из-за aria-hidden на
          фокусируемом элементе браузер (Chrome/Edge) принудительно снимал с него
          фокус в момент открытия палитры, из-за чего она мгновенно закрывалась.
          Прямой клик по настоящему input убирает этот конфликт. */}
      <input
        id={inputId}
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onMouseDown={(event) => event.stopPropagation()}
        aria-label={`Выбрать цвет: ${label}, сейчас ${value}`}
        className="h-8 w-11 cursor-pointer appearance-none rounded border border-line bg-transparent p-0
          [&::-webkit-color-swatch]:rounded-[3px]
          [&::-webkit-color-swatch]:border-none
          [&::-webkit-color-swatch-wrapper]:rounded-[3px]
          [&::-webkit-color-swatch-wrapper]:p-0
          [&::-moz-color-swatch]:rounded-[3px]
          [&::-moz-color-swatch]:border-none"
      />
    </div>
  );
}
