"use client";

import { useId, useMemo, useState } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { UnitSelect } from "@/components/tools/UnitSelect";
import { ResultReadout } from "@/components/tools/ResultReadout";
import { SwapIcon } from "@/components/tools/SwapIcon";
import { formatConversionResult } from "@/lib/converters/format";
import type { ConversionUnit } from "@/lib/converters/types";

export function UnitConverter({
  units,
  defaultFromId,
  defaultToId,
  valueLabel = "значение",
  defaultValue = "1",
}: {
  units: ConversionUnit[];
  defaultFromId: string;
  defaultToId: string;
  valueLabel?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [fromId, setFromId] = useState(defaultFromId);
  const [toId, setToId] = useState(defaultToId);

  const valueId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();

  const fromUnit = units.find((u) => u.id === fromId) ?? units[0];
  const toUnit = units.find((u) => u.id === toId) ?? units[0];

  const numericValue = parseFloat(value.replace(",", "."));
  const result = useMemo(() => {
    if (Number.isNaN(numericValue)) return null;
    return toUnit.fromBase(fromUnit.toBase(numericValue));
  }, [numericValue, fromUnit, toUnit]);

  function swap() {
    setFromId(toId);
    setToId(fromId);
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CalcInput
          id={valueId}
          label={valueLabel}
          value={value}
          onChange={setValue}
        />
        <UnitSelect
          id={fromSelectId}
          label="из"
          value={fromId}
          onChange={setFromId}
          units={units}
        />
      </div>

      <div className="my-3 flex justify-center">
        <button
          type="button"
          onClick={swap}
          aria-label="Поменять единицы местами"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
        >
          <SwapIcon />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultReadout
          label="результат"
          value={result === null ? "—" : formatConversionResult(result)}
        />
        <UnitSelect
          id={toSelectId}
          label="в"
          value={toId}
          onChange={setToId}
          units={units}
        />
      </div>
    </div>
  );
}
