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
  const inputId = useId();

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <label htmlFor={inputId} className="text-sm text-ink">
        {label}
      </label>

      <div className="relative h-8 w-11">
        <input
          id={inputId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
        />

        <div
          className="h-8 w-11 rounded border border-line"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}
