"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { areaUnits } from "@/lib/converters/units";

export function AreaConverter() {
  return (
    <UnitConverter
      units={areaUnits}
      defaultFromId="m2"
      defaultToId="sotka"
      valueLabel="площадь"
    />
  );
}
