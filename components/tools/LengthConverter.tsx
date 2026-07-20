"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { lengthUnits } from "@/lib/converters/units";

export function LengthConverter() {
  return (
    <UnitConverter
      units={lengthUnits}
      defaultFromId="m"
      defaultToId="km"
      valueLabel="длина"
    />
  );
}
