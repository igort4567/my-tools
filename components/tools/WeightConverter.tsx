"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { weightUnits } from "@/lib/converters/units";

export function WeightConverter() {
  return (
    <UnitConverter
      units={weightUnits}
      defaultFromId="kg"
      defaultToId="lb"
      valueLabel="вес"
    />
  );
}
