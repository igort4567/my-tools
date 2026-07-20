"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { volumeUnits } from "@/lib/converters/units";

export function VolumeConverter() {
  return (
    <UnitConverter
      units={volumeUnits}
      defaultFromId="l"
      defaultToId="ml"
      valueLabel="объём"
    />
  );
}
