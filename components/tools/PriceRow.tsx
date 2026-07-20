"use client";

import { useId } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { ToggleGroup } from "@/components/tools/ToggleGroup";

export type PriceRowData = {
  id: string;
  kind: "discount" | "markup";
  mode: "percent" | "amount";
  value: string;
};

export function PriceRow({
  row,
  runningValue,
  onChange,
  onRemove,
}: {
  row: PriceRowData;
  /** Цена после применения этой строки, null — если исходная цена некорректна */
  runningValue: number | null;
  onChange: (row: PriceRowData) => void;
  onRemove: () => void;
}) {
  const valueId = useId();

  return (
    <div className="rounded-md border border-line p-2.5">
      <div className="flex items-center justify-between gap-2">
        <ToggleGroup
          ariaLabel="Скидка или наценка"
          value={row.kind}
          onChange={(kind) => onChange({ ...row, kind })}
          options={[
            { value: "discount", label: "скидка" },
            { value: "markup", label: "наценка" },
          ]}
        />

        <button
          type="button"
          onClick={onRemove}
          aria-label="Удалить строку"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
        >
          ×
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <div className="w-24">
          <CalcInput
            id={valueId}
            ariaLabel="Величина корректировки"
            value={row.value}
            onChange={(value) => onChange({ ...row, value })}
          />
        </div>

        <ToggleGroup
          ariaLabel="Проценты или число"
          value={row.mode}
          onChange={(mode) => onChange({ ...row, mode })}
          options={[
            { value: "percent", label: "%" },
            { value: "amount", label: "₽" },
          ]}
        />

        <span className="ml-auto whitespace-nowrap font-mono text-xs text-ink-soft">
          {runningValue === null
            ? "—"
            : `→ ${runningValue.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽`}
        </span>
      </div>
    </div>
  );
}
