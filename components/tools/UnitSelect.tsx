import type { ConversionUnit } from "@/lib/converters/types";

export function UnitSelect({
  id,
  label,
  value,
  onChange,
  units,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  units: ConversionUnit[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs text-ink-soft"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-sm text-ink outline-none focus:border-primary"
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label}
          </option>
        ))}
      </select>
    </div>
  );
}
