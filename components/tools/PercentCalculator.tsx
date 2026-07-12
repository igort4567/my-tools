"use client";

import { useId, useState } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { ResultReadout } from "@/components/tools/ResultReadout";

export function PercentCalculator() {
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
        <CalcInput id={valueId} label="число" value={value} onChange={setValue} />
        <CalcInput
          id={percentId}
          label="процент"
          value={percent}
          onChange={setPercent}
          suffix="%"
        />
      </div>

      <div className="mt-3">
        <ResultReadout
          label="результат"
          value={
            result === null
              ? "—"
              : result.toLocaleString("ru-RU", { maximumFractionDigits: 4 })
          }
        />
      </div>
    </div>
  );
}
