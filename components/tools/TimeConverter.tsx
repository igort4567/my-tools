"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { timeUnits } from "@/lib/converters/units";

export function TimeConverter() {
  return (
    <UnitConverter
      units={timeUnits}
      defaultFromId="h"
      defaultToId="min"
      valueLabel="время"
    />
  );
}
