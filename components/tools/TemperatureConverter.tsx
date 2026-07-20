"use client";

import { UnitConverter } from "@/components/tools/UnitConverter";
import { temperatureUnits } from "@/lib/converters/units";

export function TemperatureConverter() {
  return (
    <UnitConverter
      units={temperatureUnits}
      defaultFromId="c"
      defaultToId="f"
      valueLabel="температура"
      defaultValue="20"
    />
  );
}
