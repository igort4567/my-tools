"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { dataUnits } from "@/lib/converters/units";

export function DataConverter() {
  return (
    <UnitConverter
      units={dataUnits}
      defaultFromId="mb"
      defaultToId="kb"
      valueLabel="объём данных"
    />
  );
}
