"use client";

import { useId, useRef, useState } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { ResultReadout } from "@/components/tools/ResultReadout";
import { PriceRow, type PriceRowData } from "@/components/tools/PriceRow";

function parseNumber(input: string): number {
  return parseFloat(input.replace(",", "."));
}

function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: 2 });
}

/** Применяет одну строку к текущей цене. Пустое/некорректное значение — строка не влияет на цену */
function applyRow(current: number, row: PriceRowData): number {
  const value = parseNumber(row.value);
  if (Number.isNaN(value)) return current;

  const delta = row.mode === "percent" ? (current * value) / 100 : value;
  return row.kind === "discount" ? current - delta : current + delta;
}

export function PriceCalculator() {
  const [basePrice, setBasePrice] = useState("1000");
  const [rows, setRows] = useState<PriceRowData[]>([
    { id: "row-1", kind: "discount", mode: "percent", value: "10" },
  ]);
  const rowCounter = useRef(1);

  const basePriceId = useId();

  const base = parseNumber(basePrice);
  const baseValid = !Number.isNaN(base) && base >= 0;

  // Считаем цену пошагово, чтобы показать промежуточный результат после каждой строки
  const runningValues: Array<number | null> = [];
  let current: number | null = baseValid ? base : null;
  for (const row of rows) {
    if (current !== null) {
      current = applyRow(current, row);
    }
    runningValues.push(current);
  }
  const finalValue = current;

  function updateRow(updated: PriceRowData) {
    setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)));
  }

  function addRow() {
    rowCounter.current += 1;
    setRows((prev) => [
      ...prev,
      { id: `row-${rowCounter.current}`, kind: "discount", mode: "percent", value: "" },
    ]);
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <CalcInput
        id={basePriceId}
        label="исходная цена"
        value={basePrice}
        onChange={setBasePrice}
        suffix="₽"
      />

      <div className="mt-4 space-y-2">
        {rows.map((row, index) => (
          <PriceRow
            key={row.id}
            row={row}
            runningValue={runningValues[index]}
            onChange={updateRow}
            onRemove={() => removeRow(row.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 font-mono text-xs text-primary transition-colors hover:text-primary-dark"
      >
        + добавить строку
      </button>

      <div className="mt-4">
        <ResultReadout
          label="итоговая цена"
          value={finalValue === null ? "—" : `${formatMoney(finalValue)} ₽`}
        />
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        Строки применяются по порядку сверху вниз: каждый процент считается от
        цены, получившейся после предыдущих строк.
      </p>
    </div>
  );
}
