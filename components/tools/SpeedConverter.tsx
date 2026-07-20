"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { speedUnits } from "@/lib/converters/units";

export function SpeedConverter() {
  return (
    <UnitConverter
      units={speedUnits}
      defaultFromId="kmh"
      defaultToId="mph"
      valueLabel="скорость"
    />
  );
}
